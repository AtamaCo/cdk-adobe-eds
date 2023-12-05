# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AdobeEDS <a name="AdobeEDS" id="cdk-adobe-eds.AdobeEDS"></a>

Infrastructure for Adobe Edge Delivery Service.

#### Initializers <a name="Initializers" id="cdk-adobe-eds.AdobeEDS.Initializer"></a>

```typescript
import { AdobeEDS } from 'cdk-adobe-eds'

new AdobeEDS(scope: Construct, id: string, props: AdobeEDSConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-adobe-eds.AdobeEDS.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-adobe-eds.AdobeEDS.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-adobe-eds.AdobeEDS.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-adobe-eds.AdobeEDSConstructProps">AdobeEDSConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-adobe-eds.AdobeEDS.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-adobe-eds.AdobeEDS.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-adobe-eds.AdobeEDS.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-adobe-eds.AdobeEDSConstructProps">AdobeEDSConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-adobe-eds.AdobeEDS.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-adobe-eds.AdobeEDS.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-adobe-eds.AdobeEDS.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-adobe-eds.AdobeEDS.isConstruct"></a>

```typescript
import { AdobeEDS } from 'cdk-adobe-eds'

AdobeEDS.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-adobe-eds.AdobeEDS.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-adobe-eds.AdobeEDS.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-adobe-eds.AdobeEDS.property.edsDistribution">edsDistribution</a></code> | <code><a href="#cdk-adobe-eds.EDSDistribution">EDSDistribution</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-adobe-eds.AdobeEDS.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `edsDistribution`<sup>Required</sup> <a name="edsDistribution" id="cdk-adobe-eds.AdobeEDS.property.edsDistribution"></a>

```typescript
public readonly edsDistribution: EDSDistribution;
```

- *Type:* <a href="#cdk-adobe-eds.EDSDistribution">EDSDistribution</a>

---


### EDSDistribution <a name="EDSDistribution" id="cdk-adobe-eds.EDSDistribution"></a>

A high level Construct for creating infrastructure required to support Adobe AEM Edge Delivery Service.

This stands for
"Edge Delivery Service Content Delivery Construct."

> [{@link https://www.aem.live/docs/byo-cdn-cloudfront-setup#configure-the-origin}]({@link https://www.aem.live/docs/byo-cdn-cloudfront-setup#configure-the-origin})

#### Initializers <a name="Initializers" id="cdk-adobe-eds.EDSDistribution.Initializer"></a>

```typescript
import { EDSDistribution } from 'cdk-adobe-eds'

new EDSDistribution(scope: Construct, id: string, props: EDSDistributionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-adobe-eds.EDSDistribution.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-adobe-eds.EDSDistribution.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-adobe-eds.EDSDistribution.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-adobe-eds.EDSDistributionProps">EDSDistributionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-adobe-eds.EDSDistribution.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-adobe-eds.EDSDistribution.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-adobe-eds.EDSDistribution.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-adobe-eds.EDSDistributionProps">EDSDistributionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-adobe-eds.EDSDistribution.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-adobe-eds.EDSDistribution.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-adobe-eds.EDSDistribution.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-adobe-eds.EDSDistribution.isConstruct"></a>

```typescript
import { EDSDistribution } from 'cdk-adobe-eds'

EDSDistribution.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-adobe-eds.EDSDistribution.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-adobe-eds.EDSDistribution.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-adobe-eds.EDSDistribution.property.xBYOHeaderName">xBYOHeaderName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-adobe-eds.EDSDistribution.property.xBYOHeaderValue">xBYOHeaderValue</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-adobe-eds.EDSDistribution.property.xForwardedHostHeaderName">xForwardedHostHeaderName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-adobe-eds.EDSDistribution.property.distribution">distribution</a></code> | <code>aws-cdk-lib.aws_cloudfront.Distribution</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-adobe-eds.EDSDistribution.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `xBYOHeaderName`<sup>Required</sup> <a name="xBYOHeaderName" id="cdk-adobe-eds.EDSDistribution.property.xBYOHeaderName"></a>

```typescript
public readonly xBYOHeaderName: string;
```

- *Type:* string

---

##### `xBYOHeaderValue`<sup>Required</sup> <a name="xBYOHeaderValue" id="cdk-adobe-eds.EDSDistribution.property.xBYOHeaderValue"></a>

```typescript
public readonly xBYOHeaderValue: string;
```

- *Type:* string

---

##### `xForwardedHostHeaderName`<sup>Required</sup> <a name="xForwardedHostHeaderName" id="cdk-adobe-eds.EDSDistribution.property.xForwardedHostHeaderName"></a>

```typescript
public readonly xForwardedHostHeaderName: string;
```

- *Type:* string

---

##### `distribution`<sup>Required</sup> <a name="distribution" id="cdk-adobe-eds.EDSDistribution.property.distribution"></a>

```typescript
public readonly distribution: Distribution;
```

- *Type:* aws-cdk-lib.aws_cloudfront.Distribution

---


## Structs <a name="Structs" id="Structs"></a>

### AdobeEDSConstructProps <a name="AdobeEDSConstructProps" id="cdk-adobe-eds.AdobeEDSConstructProps"></a>

All configuration options for the Adobe EDS CDN deployment.

#### Initializer <a name="Initializer" id="cdk-adobe-eds.AdobeEDSConstructProps.Initializer"></a>

```typescript
import { AdobeEDSConstructProps } from 'cdk-adobe-eds'

const adobeEDSConstructProps: AdobeEDSConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-adobe-eds.AdobeEDSConstructProps.property.distributionConfig">distributionConfig</a></code> | <code><a href="#cdk-adobe-eds.EDSDistributionProps">EDSDistributionProps</a></code> | Configuration for the CloudFront Distribution for the CDN. |
| <code><a href="#cdk-adobe-eds.AdobeEDSConstructProps.property.prefix">prefix</a></code> | <code>string</code> | The environment prefix. |
| <code><a href="#cdk-adobe-eds.AdobeEDSConstructProps.property.invalidateAllOnDeploy">invalidateAllOnDeploy</a></code> | <code>boolean</code> | If set to true, a new invalidation will be created on each deployment for /* - be careful as this is aggressive. |

---

##### `distributionConfig`<sup>Required</sup> <a name="distributionConfig" id="cdk-adobe-eds.AdobeEDSConstructProps.property.distributionConfig"></a>

```typescript
public readonly distributionConfig: EDSDistributionProps;
```

- *Type:* <a href="#cdk-adobe-eds.EDSDistributionProps">EDSDistributionProps</a>

Configuration for the CloudFront Distribution for the CDN.

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="cdk-adobe-eds.AdobeEDSConstructProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

The environment prefix.

This is a non-functional prefix that is added to IDs and names to make it easy
to visually recognize which environment you're looking at. This could be a team name, "prod" / "dev" / "stage",
or whatever else you want. It should conform to the CDK Construct naming policy.

> [{@link https://docs.aws.amazon.com/cdk/v2/guide/identifiers.html}]({@link https://docs.aws.amazon.com/cdk/v2/guide/identifiers.html})

---

##### `invalidateAllOnDeploy`<sup>Optional</sup> <a name="invalidateAllOnDeploy" id="cdk-adobe-eds.AdobeEDSConstructProps.property.invalidateAllOnDeploy"></a>

```typescript
public readonly invalidateAllOnDeploy: boolean;
```

- *Type:* boolean

If set to true, a new invalidation will be created on each deployment for /* - be careful as this is aggressive.

---

### EDSDistributionProps <a name="EDSDistributionProps" id="cdk-adobe-eds.EDSDistributionProps"></a>

Creates a {@link Distribution} based on configuration recommended by Adobe.

The Distribution can be modified to allow
custom domain names as well as additional Origin configurations.

#### Initializer <a name="Initializer" id="cdk-adobe-eds.EDSDistributionProps.Initializer"></a>

```typescript
import { EDSDistributionProps } from 'cdk-adobe-eds'

const eDSDistributionProps: EDSDistributionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.edsURL">edsURL</a></code> | <code>string</code> | The URL for the Adobe EDS site deployment. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.prefix">prefix</a></code> | <code>string</code> | The environment prefix. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.sendPushInvalidationHeader">sendPushInvalidationHeader</a></code> | <code>boolean</code> | Push invalidation can be enabled for CloudFront using a very aggressive wildcard, i.e. `/*`. If you've setup this up OR IF YOU PLAN TO SET THIS UP, setting this value to true will append the required headers as specified in the docs by Adobe. Note that this property will NOT automatically setup the invalidator IAM roles / policies, at this point that will need to be manual. Ideally this would be something handled using OpenID Connect if possible. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.additionalBehaviors">additionalBehaviors</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_cloudfront.BehaviorOptions}</code> | If you'd like other behviors including in the CloudFront Distribution they can be added here. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | If you'd like to associate a certificate with this Distribution it can be provided here. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.cloudFrontEDSFunction">cloudFrontEDSFunction</a></code> | <code>aws-cdk-lib.aws_cloudfront.Function</code> | If you prefer to supply your own EDS Origin CF Function you can, but beware that Adobe requires certain actions be performed by this function, e.g. removing the `age` header. If you override this Function you should be sure that it is handling any behavior required by EDS downstream. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.defaultBehaviorEdgeLambdas">defaultBehaviorEdgeLambdas</a></code> | <code>aws-cdk-lib.aws_cloudfront.EdgeLambda[]</code> | Any Lambda@Edge configurations you'd like to supply with the default origin. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.domain">domain</a></code> | <code>string</code> | The domain (e.g. www.amazingwebsite.com) for the final website. This is past to EDS for handling URL mappings and such as the X-Forwarded-Host header. If not specified, this header is NOT sent. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.domainNames">domainNames</a></code> | <code>string[]</code> | A list of domain names that should be associated with the Distribution. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.enableLogging">enableLogging</a></code> | <code>boolean</code> | Enable logging for the distribution? If set to true a bucket will be created for logs. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.enableOriginShield">enableOriginShield</a></code> | <code>boolean</code> | Origin Shield is recommended by Adobe but there are extra costs associated with it so is set to false by default to avoid unexpected costs. |
| <code><a href="#cdk-adobe-eds.EDSDistributionProps.property.originShieldRegion">originShieldRegion</a></code> | <code>string</code> | The region config for the default EDS region. |

---

##### `edsURL`<sup>Required</sup> <a name="edsURL" id="cdk-adobe-eds.EDSDistributionProps.property.edsURL"></a>

```typescript
public readonly edsURL: string;
```

- *Type:* string

The URL for the Adobe EDS site deployment.

This most likely will have a format similar to
<main>--<project>--<github user>.hlx.live - note it is without the https:// and no trailing slash.
Also note that most likely this should be the `.live` version of the domain, not `.page` (preview).

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="cdk-adobe-eds.EDSDistributionProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

The environment prefix.

This is a non-functional prefix that is added to IDs and names to make it easy
to visually recognize which environment you're looking at. This could be a team name, "prod" / "dev" / "stage",
or whatever else you want. It should conform to the CDK Construct naming policy.

> [{@link https://docs.aws.amazon.com/cdk/v2/guide/identifiers.html}]({@link https://docs.aws.amazon.com/cdk/v2/guide/identifiers.html})

---

##### `sendPushInvalidationHeader`<sup>Required</sup> <a name="sendPushInvalidationHeader" id="cdk-adobe-eds.EDSDistributionProps.property.sendPushInvalidationHeader"></a>

```typescript
public readonly sendPushInvalidationHeader: boolean;
```

- *Type:* boolean

Push invalidation can be enabled for CloudFront using a very aggressive wildcard, i.e. `/*`. If you've setup this up OR IF YOU PLAN TO SET THIS UP, setting this value to true will append the required headers as specified in the docs by Adobe. Note that this property will NOT automatically setup the invalidator IAM roles / policies, at this point that will need to be manual. Ideally this would be something handled using OpenID Connect if possible.

> [{@link https://circleci.com/blog/openid-connect-identity-tokens/}]({@link https://circleci.com/blog/openid-connect-identity-tokens/})

---

##### `additionalBehaviors`<sup>Optional</sup> <a name="additionalBehaviors" id="cdk-adobe-eds.EDSDistributionProps.property.additionalBehaviors"></a>

```typescript
public readonly additionalBehaviors: {[ key: string ]: BehaviorOptions};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_cloudfront.BehaviorOptions}

If you'd like other behviors including in the CloudFront Distribution they can be added here.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="cdk-adobe-eds.EDSDistributionProps.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

If you'd like to associate a certificate with this Distribution it can be provided here.

This is likely
the case if you want to setup a domain with the Distribution.

---

##### `cloudFrontEDSFunction`<sup>Optional</sup> <a name="cloudFrontEDSFunction" id="cdk-adobe-eds.EDSDistributionProps.property.cloudFrontEDSFunction"></a>

```typescript
public readonly cloudFrontEDSFunction: Function;
```

- *Type:* aws-cdk-lib.aws_cloudfront.Function

If you prefer to supply your own EDS Origin CF Function you can, but beware that Adobe requires certain actions be performed by this function, e.g. removing the `age` header. If you override this Function you should be sure that it is handling any behavior required by EDS downstream.

---

##### `defaultBehaviorEdgeLambdas`<sup>Optional</sup> <a name="defaultBehaviorEdgeLambdas" id="cdk-adobe-eds.EDSDistributionProps.property.defaultBehaviorEdgeLambdas"></a>

```typescript
public readonly defaultBehaviorEdgeLambdas: EdgeLambda[];
```

- *Type:* aws-cdk-lib.aws_cloudfront.EdgeLambda[]

Any Lambda@Edge configurations you'd like to supply with the default origin.

By default there are
no edge functions specified (only a CloudFront Function).

---

##### `domain`<sup>Optional</sup> <a name="domain" id="cdk-adobe-eds.EDSDistributionProps.property.domain"></a>

```typescript
public readonly domain: string;
```

- *Type:* string

The domain (e.g. www.amazingwebsite.com) for the final website. This is past to EDS for handling URL mappings and such as the X-Forwarded-Host header. If not specified, this header is NOT sent.

---

##### `domainNames`<sup>Optional</sup> <a name="domainNames" id="cdk-adobe-eds.EDSDistributionProps.property.domainNames"></a>

```typescript
public readonly domainNames: string[];
```

- *Type:* string[]

A list of domain names that should be associated with the Distribution.

You'll likely want to provide these if
you are using a custom domain(s) as without them CloudFront will reject the incoming request form your domain
even if you have the appropriate A/AAAA name records setup in Route53.

---

##### `enableLogging`<sup>Optional</sup> <a name="enableLogging" id="cdk-adobe-eds.EDSDistributionProps.property.enableLogging"></a>

```typescript
public readonly enableLogging: boolean;
```

- *Type:* boolean

Enable logging for the distribution? If set to true a bucket will be created for logs.

NOTE THIS CAN RESULT IN SIGNIFICANT EXPENSE, and should only be enabled for debug purposes.

---

##### `enableOriginShield`<sup>Optional</sup> <a name="enableOriginShield" id="cdk-adobe-eds.EDSDistributionProps.property.enableOriginShield"></a>

```typescript
public readonly enableOriginShield: boolean;
```

- *Type:* boolean

Origin Shield is recommended by Adobe but there are extra costs associated with it so is set to false by default to avoid unexpected costs.

> [{@link https://aws.amazon.com/cloudfront/pricing/}]({@link https://aws.amazon.com/cloudfront/pricing/})

---

##### `originShieldRegion`<sup>Optional</sup> <a name="originShieldRegion" id="cdk-adobe-eds.EDSDistributionProps.property.originShieldRegion"></a>

```typescript
public readonly originShieldRegion: string;
```

- *Type:* string

The region config for the default EDS region.

This propertly is only used if Origin Shield is enabled.
Note no enum is provided here because there is no enum, so take care!

> [{@link https://github.com/aws/aws-sdk-java-v2/issues/3345}.]({@link https://github.com/aws/aws-sdk-java-v2/issues/3345}.)

---



