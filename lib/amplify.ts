import { Amplify } from 'aws-amplify';

// Development configuration for local development
const devConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_dev',
      userPoolClientId: 'dev_client_id',
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: 'http://localhost:20002/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
    },
  },
};

// Only configure Amplify if outputs file exists (production/deployed environment)
try {
  const outputs = require('../amplify_outputs.json');
  Amplify.configure(outputs);
  console.log('Amplify configured with production outputs');
} catch (error) {
  // In development or when amplify_outputs.json doesn't exist yet
  console.log('Amplify outputs not found - using development configuration');
  Amplify.configure(devConfig);
}