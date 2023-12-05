import { App, Aspects, Stack } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { AdobeEDS } from '../src/adobe-eds';

describe('AdobeEDS', () => {
  let stack: Stack;
  let app: App;
  test('No unknown nag issues with Construct', () => {

    app = new App();
    stack = new Stack(app);

    new AdobeEDS(stack, 'test-adobe-eds-sandbox', {
      prefix: 'testing',
      distributionConfig: {
        prefix: 'testing',
        edsURL: 'testing.url.com',
        sendPushInvalidationHeader: false,
      },
    });
    NagSuppressions.addStackSuppressions(stack, [
      { id: 'AwsSolutions-CFR1', reason: 'Geo specific config will be deployment specific and not handled here.' },
    ]);
    NagSuppressions.addStackSuppressions(stack, [
      { id: 'AwsSolutions-CFR2', reason: 'WAF, API Gateway, and other considerations are out of scope.' },
    ]);
    NagSuppressions.addStackSuppressions(stack, [
      { id: 'AwsSolutions-CFR3', reason: 'CloudFront distribution logging can get expensive and can be enabled with flag.' },
    ]);
    NagSuppressions.addStackSuppressions(stack, [
      { id: 'AwsSolutions-CFR4', reason: 'Certificate is provided optionally as input, can not be controlled directly' },
    ]);

    Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));

    const warnings = Annotations.fromStack(stack).findWarning(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(warnings).toHaveLength(0);
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(errors).toHaveLength(0);

    Annotations.fromStack(stack).hasNoError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );

  });
});
