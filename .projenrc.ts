import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  name: 'cdk-adobe-eds',
  description:
    'A higher level Construct for generating a CloudFront Distribution and related resources following Adobe EDS best practices.',
  author: 'Atama',
  authorOrganization: true,
  authorAddress: 'kevin@atama.co',
  cdkVersion: '2.110.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/atamaco/cdk-adobe-eds.git',
  gitignore: ['.nvmrc'],
  // deps: [],                /* Runtime dependencies of this module. */
  devDeps: ['cdk-nag'] /* Build dependencies for this module. */,
  keywords: [
    'awscdk',
    'AWS',
    'CDK',
    'CDN',
    'Adobe',
    'AEM',
    'EDS',
    'AEM.live',
    'Franklin',
    'Helix',
  ],
  releaseToNpm: true,
});
project.synth();
