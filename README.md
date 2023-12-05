# Adobe / AEM Edge Delivery Services Construct

## What is this?

CDK Construct should provide a starting point for deploying a CDN in front of Edge Delivery Services (Franklin, Helix, AEM) with AWS CloudFront. After deploying the `AdobeEDS` Construct in your stack you should be able to access Edge Delivery Services through the Distribution's default CloudFront domain.

**[The configuration in this project is based on these recommendations in Adobe's BYO CDN documentation](https://www.aem.live/docs/byo-cdn-cloudfront-setup)**. _Note that via configuration you can match the Adobe recomendation configuration but the default configuration slightly deviates as noted below_.


## Installation

Assumption is this project will be used in an existing CDK project (or `cdk init --language typescript`).

```
npm install --save-dev cdk-adobe-eds
```

## Usage

This basic example will result in a CloudFront Distribution being made with the default origin being backed by Edge Delivery Services.

```
// my-adobe-eds-stack.ts

// Create CDN for Edge Delivery Services on CloudFront
new AdobeEDS(this, `sandbox-adobe-eds`, {
  // A friendly prefix for quickly glancing resources in your environment
  prefix: "sandbox",
  // During development we will invalidate everything, i.e. /*
  invalidateAllOnDeploy: true,
  distributionConfig: {
    prefix: "sandbox",
    // The Edge Delivery Services URL you'd like to use for the default origin
    edsURL: "https://<branch>--<repo>--<account>.hlx.live",
    // We won't send the push invalidation header to Edge Delivery Services.
    // Note this means we'll have to wait for the cache policy TTL to expire
    sendPushInvalidationHeader: false,
    // ...
    // See API docs for additional options, e.g. supplying additional behaviors
  },
});
```

## Known deviations from Adobe Documentation

There are a number of known deviations that can result in deployed infrastructure not being a 1:1 match for Adobe's documented configurations. **In testing these deviating configuraitons still work, however it is entirely up to you to confirm that you understand how these deviations might impact your performance, costs, etc**.


### X-Forwarded-Host not set by default

If you do not specify a domain in the `domain` property for the `EDSDistributionConstruct` the `X-Forwarded-Host` header is NOT sent. Note that in some testing it seems that Edge Delivery Services is smart enough to automatically swap out base domains for the CDN value even if this is not sent, but still this is a deviation. For those simply testing AWS with this set of Constructs (I suspect many may use this as a place to do some basic testing or may borrow from but not use as-is) the issue may be you want to test with the CloudFront domain, e.g. `dsomethingsomethingj.cloudfront.net` and in that case I'm not aware of a way to get the CloudFront domain name set on the default origin.

**[It may be possible to do this as the Distribution does expose `distributionDomainName`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront.IDistribution.html#distributiondomainname)**, and I certainly welcome any improvements here. 

### Origin Shield not enabled by default

Adobe specifies Origin Shield should be enabled. If you do not enable origin shield it would seem the CDN works well enough but in theory both performance and your relationship with Adobe may suffer as this could result in more requests to the Edge Delivery Services origin in a less optimial way. Because [Origin Shield adds additional cost beyond the free-tier (to the best of my understanding)](https://aws.amazon.com/cloudfront/pricing/) I prefer to disable it by default to avoid surprises to an individual who simply wants to experiement with AWS and Adobe Edge Delivery Services.

### TLS Version not pegged at TLSv1

In the instructions under "[Configure the Origin](https://www.aem.live/docs/byo-cdn-cloudfront-setup#configure-the-origin)", although not highlighted as a mandatory setting the minimum TLS version selected by Adobe is TLSv1. The default is TLSv1.2 if not specified in CF and Fastly / Adobe Edge Delivery Services seems to handle this just fine. I would be surprised if this was an issue, but it's a black box to me so I wanted to call it out.


## Note on Free Tier

In general it is nice to have default configurations fall within the Free Tier, or as near to free as possible. This to prevent any catastrophic surprises (e.g. an AWS bill for thousands of dollars when you weren't expecting it). That said, **it's impossible to gaurentee this construct will cleanly fall under the free tier** - take note of the AWS services being deployed in the console and understand that you will likely want to add additional optimizations for your organization's specific requirements at any sort of scale.


## cdk-nag suppressions

If you take a look at `test/nag.test.ts`, you'll see the following suppressions:

```
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

```

Ideally you will have your own policies in place for detecting potential gaps in security / best practice misses, but be aware that these are _potential issues_ depending on how you use the `AdobeEDS` Construct.

## Contributing

This project uses [`projen`](https://github.com/projen/projen) so please check here for additional detail. Although I actually prefer to use `npm` wherever I can, **this project uses `yarn`**.

In general the steps to contribute to this project are:

1. [Open an issue in github](https://github.com/atamaco/cdk-adobe-eds/issues/new) and explain the feature / bug
2. Clone this repository
3. Use `yarn` to `install`, `build`, etc.
4. Make code changes
5. Push to your fork / branch
6. Open a PR

**Note that changes to CDK versions, gitignore, etc, are done through `.projenrc.ts`**

### Development

There are multiple ways to develop with this package locally, but one straight forward process is as follows:

1. Clone the project and `yarn install` and `yarn build` - this should result in a build artifact similar to `dist/js/cdk-adobe-eds@0.0.0.jsii.tgz`
2. In your own CDK project where you'd like to develop or otherwise experiment with changes to this project you can add a directly dependency to this file, e.g. `"cdk-adobe-eds": "file:<path where you cloned cdk-adobe-eds>/dist/js/cdk-adobe-eds@0.0.0.jsii.tgz",`
3. Note that if you make changes you will need to rebuild and likely **force** re-install the package, e.g. `npm install --force <path>/dist/js/cdk-adobe-eds@0.0.0.jsii.tgz`

There are of course other ways to accomplish this, but this is one option that has very little magic. `npm link` might be another option.

