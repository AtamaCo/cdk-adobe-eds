import { Construct } from 'constructs';
import { EDSDistributionProps, EDSDistribution } from './eds-distribution';
import { EDSInvalidation } from './eds-invalidation';

/**
 * All configuration options for the Adobe EDS CDN deployment.
 */
export interface AdobeEDSConstructProps {
  /**
   * The environment prefix. This is a non-functional prefix that is added to IDs and names to make it easy
   * to visually recognize which environment you're looking at. This could be a team name, "prod" / "dev" / "stage",
   * or whatever else you want. It should conform to the CDK Construct naming policy.
   * @see {@link https://docs.aws.amazon.com/cdk/v2/guide/identifiers.html}
   */
  readonly prefix: string;
  /**
   * Configuration for the CloudFront Distribution for the CDN.
   */
  readonly distributionConfig: EDSDistributionProps;
  /**
   * If set to true, a new invalidation will be created on each deployment for /* - be careful as this
   * is aggressive.
   */
  readonly invalidateAllOnDeploy?: boolean;
}

/**
 * Infrastructure for Adobe Edge Delivery Service.
 */
export class AdobeEDS extends Construct {
  edsDistribution: EDSDistribution;

  constructor(scope: Construct, id: string, props: AdobeEDSConstructProps) {
    super(scope, id);

    this.edsDistribution = new EDSDistribution(
      this,
      `${props.prefix}-eds-distribution`,
      props.distributionConfig,
    );

    if (props.invalidateAllOnDeploy) {
      new EDSInvalidation(this, `${props.prefix}-invalidate-on-deploy`, {
        distribution: this.edsDistribution.distribution,
      });
    }
  }
}
