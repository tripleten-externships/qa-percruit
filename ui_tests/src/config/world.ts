// world.ts
// Utility functions and environment configuration for Cucumber/Playwright tests

// Load environment variables from .env file
import * as dotenv from 'dotenv';
import { CONFIG as DEV } from './dev.env';
import { CONFIG as STAGE } from './stage.env';
import { CONFIG as PROD } from './prod.env';

// Initialize dotenv to load environment variables
dotenv.config();

// Determine which environment config to use (default: 'dev')
const envName = process.env.ENV || 'dev';
export const ENV = getConfig(envName);

// Get the student email from environment variables
// Throws an error if not set, logs the email for debugging
export function getStudentEmail(): string {
  const email = process.env.STUDENT_EMAIL;
  if (!email) {
    throw new Error('STUDENT_EMAIL environment variable is not set.');
  }
  console.log('Using Student for testing:' + email);
  return email;
}

// Get the student password from environment variables
// Throws an error if not set
export function getStudentPassword(): string {
  const password = process.env.STUDENT_PASSWORD;
  if (!password) {
    throw new Error('STUDENT_PASSWORD environment variable is not set.');
  }
  return password;
}

// Get the mentor email from environment variables (returns empty string if not set)
export function getMentorEmail(): string {
  return process.env.MENTOR_EMAIL || '';
}

// Get the mentor password from environment variables (returns empty string if not set)
export function getMentorPassword(): string {
  return process.env.MENTOR_PASSWORD || '';
}

// Get the admin email from environment variables (returns empty string if not set)
export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || '';
}

// Get the admin password from environment variables (returns empty string if not set)
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || '';
}

// Get the base URL for the application under test
// Uses BASE_URL env variable if set, otherwise falls back to config
export function getBaseUrl(): string {
  return process.env.BASE_URL || ENV.baseUrl;
}

// Select the appropriate environment configuration object
// Accepts 'dev', 'stage', or 'prod' (case-insensitive)
export function getConfig(envName?: string) {
  switch ((envName || '').toLowerCase()) {
    case 'stage':
    case 'staging':
      return STAGE;
    case 'prod':
    case 'production':
      return PROD;
    default:
      return DEV;
  }
}