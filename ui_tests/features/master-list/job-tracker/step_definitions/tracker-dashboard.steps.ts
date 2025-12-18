import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';


