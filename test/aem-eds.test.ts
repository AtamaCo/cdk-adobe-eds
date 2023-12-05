import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AdobeEDS } from '../src/adobe-eds';

describe('AdobeEDS', () => {
  test('synthesizes the way we expect', () => {
    const app = new cdk.App();

    const adobeEDSStack = new cdk.Stack(app, 'AdobeEDS');

    // Create the AdobeEDS Construct.
    new AdobeEDS(adobeEDSStack, 'AdobeEDSConstruct', {
      prefix: 'testing',
      distributionConfig: {
        prefix: 'testing',
        edsURL: 'testing.url.com',
        sendPushInvalidationHeader: false,
      },
    });

    // Prepare the stack for assertions.
    const template = Template.fromStack(adobeEDSStack);

    // Assert it creates the function with the correct properties...
    template.hasResourceProperties('AWS::CloudFront::Function', {
      AutoPublish: true,
    });
  });
});
