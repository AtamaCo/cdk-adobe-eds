import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  BehaviorOptions,
  CacheCookieBehavior,
  CacheHeaderBehavior,
  CachePolicy,
  CacheQueryStringBehavior,
  Distribution,
  EdgeLambda,
  Function,
  FunctionCode,
  FunctionEventType,
  ICachePolicy,
  IFunction,
  IOriginRequestPolicy,
  OriginProtocolPolicy,
  OriginRequestCookieBehavior,
  OriginRequestHeaderBehavior,
  OriginRequestPolicy,
  OriginRequestQueryStringBehavior,
  OriginSslPolicy,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket, BucketAccessControl, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

/**
 * Creates a {@link Distribution} based on configuration recommended by Adobe. The Distribution can be modified to allow
 * custom domain names as well as additional Origin configurations.
 */
export interface EDSDistributionProps {
  /**
   * The environment prefix. This is a non-functional prefix that is added to IDs and names to make it easy
   * to visually recognize which environment you're looking at. This could be a team name, "prod" / "dev" / "stage",
   * or whatever else you want. It should conform to the CDK Construct naming policy.
   * @see {@link https://docs.aws.amazon.com/cdk/v2/guide/identifiers.html}
   */
  readonly prefix: string;
  /**
   * The URL for the Adobe Edge Delivery Services site deployment. This most likely will have a format similar to
   * <main>--<project>--<github user>.hlx.live - note it is without the https:// and no trailing slash.
   * Also note that most likely this should be the `.live` version of the domain, not `.page` (preview).
   */
  readonly edsURL: string;
  /**
   * The domain (e.g. www.amazingwebsite.com) for the final website. This is past to Edge Delivery Services for handling
   * URL mappings and such as the X-Forwarded-Host header. If not specified, this header is NOT sent.
   */
  readonly domain?: string;
  /**
   * If you prefer to supply your own Edge Delivery Services Origin CF Function you can, but beware that Adobe requires
   * certain actions be performed by this function, e.g. removing the `age` header. If you override
   * this Function you should be sure that it is handling any behavior required by Edge Delivery Services downstream.
   */
  readonly cloudFrontEDSFunction?: Function;
  /**
   * Any Lambda@Edge configurations you'd like to supply with the default origin. By default there are
   * no edge functions specified (only a CloudFront Function).
   */
  readonly defaultBehaviorEdgeLambdas?: EdgeLambda[];
  /**
   * If you'd like other behviors including in the CloudFront Distribution they can be added here.
   */
  readonly additionalBehaviors?: Record<string, BehaviorOptions>;
  /**
   * Origin Shield is recommended by Adobe but there are extra costs associated with it so is set to
   * false by default to avoid unexpected costs.
   * @see {@link https://aws.amazon.com/cloudfront/pricing/}
   */
  readonly enableOriginShield?: boolean;
  /**
   * The region config for the default Edge Delivery Services region. This propertly is only used if Origin Shield is enabled.
   * Note no enum is provided here because there is no enum, so take care!
   * @see {@link https://github.com/aws/aws-sdk-java-v2/issues/3345}.
   */
  readonly originShieldRegion?: string;
  /**
   * Push invalidation can be enabled for CloudFront using a very aggressive wildcard, i.e. `/*`. If you've
   * setup this up OR IF YOU PLAN TO SET THIS UP, setting this value to true will append the required headers
   * as specified in the docs by Adobe. Note that this property will NOT automatically setup the invalidator IAM
   * roles / policies, at this point that will need to be manual. Ideally this would be something handled using
   * OpenID Connect if possible.
   * @see {@link https://www.aem.live/docs/byo-cdn-cloudfront-setup#setup-push-invalidation-for-aws-cloudfront}
   * @see {@link https://circleci.com/blog/openid-connect-identity-tokens/}
   */
  readonly sendPushInvalidationHeader: boolean;
  /**
   * If you'd like to associate a certificate with this Distribution it can be provided here. This is likely
   * the case if you want to setup a domain with the Distribution.
   */
  readonly certificate?: ICertificate;
  /**
   * A list of domain names that should be associated with the Distribution. You'll likely want to provide these if
   * you are using a custom domain(s) as without them CloudFront will reject the incoming request form your domain
   * even if you have the appropriate A/AAAA name records setup in Route53.
   */
  readonly domainNames?: string[];
  /**
   * Enable logging for the distribution? If set to true a bucket will be created for logs.
   *
   * NOTE THIS CAN RESULT IN SIGNIFICANT EXPENSE, and should only be enabled for debug purposes.
   */
  readonly enableLogging?: boolean;
}

/**
 * A high level Construct for creating infrastructure required to support Adobe AEM Edge Delivery Services. This stands for
 * "Edge Delivery Service Content Delivery Construct."
 * @see {@link https://www.aem.live/docs/byo-cdn-cloudfront-setup#configure-the-origin}
 */
export class EDSDistribution extends Construct {
  distribution: Distribution;

  // Header for forwarding domain name downstream
  readonly xForwardedHostHeaderName = 'X-Forwarded-Host';
  // Adobe Edge Delivery Services specific header for letting know which cloud provider is acting as the CDN
  readonly xBYOHeaderName = 'X-BYO-CDN-Type';
  // The Adobe Edge Delivery Services value expected for AWS CloudFront
  readonly xBYOHeaderValue = 'cloudfront';

  constructor(scope: Construct, id: string, props: EDSDistributionProps) {
    super(scope, id);

    // FIXME: there is a better way of doing this :shrug:
    let domainHeader = {};
    if (props.domain?.length && props.domain.length > 0) {
      domainHeader = { [this.xForwardedHostHeaderName]: props.domain };
    }

    let originShieldOriginOptions = {};

    if (props.enableOriginShield === true) {
      originShieldOriginOptions = {
        originShieldEnabled: true,
        originShieldRegion: props.originShieldRegion,
      };
    }

    let logBucket: undefined | IBucket = undefined;

    if (props.enableLogging) {
      logBucket = new Bucket(this, `${props.prefix}-distribution-logs`, {
        publicReadAccess: false,
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
        accessControl: BucketAccessControl.LOG_DELIVERY_WRITE,
      });
    }

    this.distribution = new Distribution(
      this,
      `${props.prefix}-eds-distribution`,
      {
        minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_1_2016,
        enableLogging: props.enableLogging,
        logBucket: props.enableLogging ? logBucket : undefined,
        defaultBehavior: {
          viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
          origin: new HttpOrigin(props.edsURL, {
            ...originShieldOriginOptions,
            protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
            // Note that the Adobe doc screenshots actually show TLS_V1, but don't specify it as required
            originSslProtocols: [
              OriginSslPolicy.TLS_V1_1,
              OriginSslPolicy.TLS_V1_2,
            ],
            customHeaders: {
              ...domainHeader,
              [this.xBYOHeaderName]: this.xBYOHeaderValue,
            },
          }),
          edgeLambdas: props.defaultBehaviorEdgeLambdas,
          functionAssociations: [
            {
              function:
                props.cloudFrontEDSFunction ||
                this.createDefaultOriginFunction({
                  prefix: props.prefix,
                }),
              eventType: FunctionEventType.VIEWER_RESPONSE,
            },
          ],
          cachePolicy: this.createCachePolicy({
            prefix: props.prefix,
          }),
          originRequestPolicy: this.createRequestyPolicy({
            prefix: props.prefix,
          }),
          compress: true,
        },
        additionalBehaviors: props.additionalBehaviors,
        certificate: props.certificate,
        domainNames: props.domainNames,
      },
    );
  }

  /**
   * Creates a new {@link CachePolicy} matching the details provided by the Adobe Edge Delivery Services documentation.
   *
   * @param props cache policy configuration flags and options
   * @returns a {@link CachePolicy}
   */
  private createCachePolicy(props: { prefix: string }): ICachePolicy {
    return new CachePolicy(this, `${props.prefix}-eds-cache-policy`, {
      cachePolicyName: `${props.prefix}-eds-cache-policy`,
      defaultTtl: Duration.seconds(300),
      minTtl: Duration.seconds(1),
      maxTtl: Duration.seconds(31536000),
      headerBehavior: CacheHeaderBehavior.none(),
      queryStringBehavior: CacheQueryStringBehavior.all(),
      cookieBehavior: CacheCookieBehavior.none(),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
      comment:
        'Adobe Edge Delivery Services CachePolicy for Edge Delivery Service',
    });
  }

  /**
   * Creates an a policy with configuration provided by Adobe.
   *
   * @param props configuration options
   * @returns a new {@link OriginRequestPolicy}
   */
  private createRequestyPolicy(props: {
    prefix: string;
  }): IOriginRequestPolicy {
    return new OriginRequestPolicy(
      this,
      `${props.prefix}-eds-origin-request-policy`,
      {
        originRequestPolicyName: `${props.prefix}-eds-origin-request-policy`,
        comment: 'Adobe OriginRequestPolicy for Edge Delivery Service',
        headerBehavior: OriginRequestHeaderBehavior.none(),
        queryStringBehavior: OriginRequestQueryStringBehavior.all(),
        cookieBehavior: OriginRequestCookieBehavior.none(),
      },
    );
  }

  /**
   * This function removes the age header from the response. This is currently an inline function because it
   * is very easy to make it so and it seems reasonable to do so in this case. Note this is a CloudFront {@link Function}
   * not a Lambda Function.
   *
   * @param props Function flags and settings
   * @returns a CloudFront {@link Function}
   */
  private createDefaultOriginFunction(props: { prefix: string }): IFunction {
    return new Function(this, `${props.prefix}-eds-default-origin-function`, {
      functionName: `${props.prefix}-eds-default-origin-function`,
      comment: 'Edge Delivery Services CDN CF Function for removing age header',
      code: FunctionCode.fromInline(`
        function handler(event) {
          // remove Age header
          delete event.response.headers['age'];
          // return response
          return event.response;
        }
      `),
    });
  }
}
