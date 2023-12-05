import { Stack } from 'aws-cdk-lib';
import { IDistribution } from 'aws-cdk-lib/aws-cloudfront';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import {
  AwsCustomResource,
  AwsSdkCall,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

/**
 * Configuraiton parameters for Invalidation.
 *
 */
export interface EDSInvalidationProps {
  /**
   * The Distribution to invalidate
   */
  readonly distribution: IDistribution;
  /**
   * Constructs that should complete before invalidating CloudFront Distribution.
   */
  readonly dependencies?: Construct[];
  /**
   * Optional list of paths to invalidate
   * @defaultValue ["/*"]
   */
  readonly paths?: string[];
}

/**
 * Invalidation for deployments. The idea here is to provide an easy way to invalidate all
 * caches when you modify the Edge Delivery Services CDN configuration.
 */
export class EDSInvalidation extends Construct {
  constructor(scope: Construct, id: string, props: EDSInvalidationProps) {
    super(scope, id);
    const awsSdkCall: AwsSdkCall = {
      // this needs to be updated on each deploy to make sure a new invalidation resource is created
      physicalResourceId: PhysicalResourceId.of(
        `${props.distribution.distributionId}-${Date.now()}`,
      ),
      action: 'CreateInvalidationCommand',
      service: '@aws-sdk/client-cloudfront',
      parameters: {
        DistributionId: props.distribution.distributionId,
        InvalidationBatch: {
          CallerReference: new Date().toISOString(),
          Paths: {
            Quantity: 1,
            Items: props.paths || ['/*'],
          },
        },
      },
    };
    const awsCustomResource = new AwsCustomResource(
      this,
      'InvalidationCustomResource',
      {
        onCreate: awsSdkCall,
        onUpdate: awsSdkCall,
        policy: AwsCustomResourcePolicy.fromStatements([
          new PolicyStatement({
            actions: ['cloudfront:CreateInvalidation'],
            resources: [
              Stack.of(this).formatArn({
                resource: `distribution/${props.distribution.distributionId}`,
                service: 'cloudfront',
                region: '',
              }),
            ],
          }),
        ]),
      },
    );
    for (const dependency of props.dependencies || []) {
      dependency.node.addDependency(awsCustomResource);
    }
  }
}
