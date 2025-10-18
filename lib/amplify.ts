import { Amplify } from 'aws-amplify';

// Only configure Amplify if outputs file exists (production/deployed environment)
if (typeof window !== 'undefined') {
  try {
    const outputs = require('../amplify_outputs.json');
    Amplify.configure(outputs);
    console.log('Amplify configured with production outputs');
  } catch (error) {
    // In development or when amplify_outputs.json doesn't exist yet
    console.log('Amplify outputs not found - using development configuration');
    // Don't configure anything in development
  }
}