import { expect, Page } from '@playwright/test';
import * as env from '../../config/world';
import { LoginPage } from '..common/LoginPage';

// Page Object Model (POM) class for the Login page
export class MentorListPage extends LoginPage {