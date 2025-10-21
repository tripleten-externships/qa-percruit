import * as dotenv from 'dotenv';
// import { BeforeAll } from '@cucumber/cucumber';
import { CONFIG as DEV } from './dev.env';
import { CONFIG as STAGE } from './stage.env';
import { CONFIG as PROD } from './prod.env';

dotenv.config();
const envName = process.env.ENV || 'dev';
export const ENV = getConfig(envName);

// Runtime getters — prefer these when reading env values during test execution.
// Using getters avoids issues where values are captured too early (before dotenv runs),
// since these read process.env at call time.
export function getStudentEmail(): string {
	  const email = process.env.STUDENT_EMAIL;
    if (!email) {
        throw new Error('STUDENT_EMAIL environment variable is not set.');
    }
    console.log('Using Student for testing:' + email);
    return email;
}

export function getStudentPassword(): string {
  const password = process.env.STUDENT_PASSWORD;
    if (!password) {
        throw new Error('STUDENT_PASSWORD environment variable is not set.');
    }
	return password;
}

export function getMentorEmail(): string {
	return process.env.MENTOR_EMAIL || '';
}

export function getMentorPassword(): string {
	return process.env.MENTOR_PASSWORD || '';
}

export function getAdminEmail(): string {
	return process.env.ADMIN_EMAIL || '';
}

export function getAdminPassword(): string {
	return process.env.ADMIN_PASSWORD || '';
}

export function getBaseUrl(): string {
	return process.env.BASE_URL || ENV.baseUrl;
}

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

// BeforeAll(async () => {
//   console.log(`Base URL is: ${getBaseUrl()}`);
// });