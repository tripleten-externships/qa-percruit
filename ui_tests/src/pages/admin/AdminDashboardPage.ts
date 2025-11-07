import { Page } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';

// <h4 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom css-4pkx8y">Profile Settings</h4>

export class AdminDashboardPage extends BasePage {
  readonly labels = {
PROFILE_SETTINGS: 'Profile Settings',

};
 
  readonly tabs = {
    PROFILE: 'Profile',
    PROFESSIONAL: 'Professional',
    SOCIAL_LINKS: 'Social Links',
    NOTIFICATION: 'Notification',
    PRIVACY_AI: "Privacy & AI"
  }

  constructor(page: Page) {
     super(page);

  }

  async isOnAdminDashBoardPage(): Promise<boolean> {
    let isTrue = false; 

    isTrue = await this.isHeadingVisible('Profile Settings')
    if (!isTrue) {
      return false;
  };

  return true; 
};

}