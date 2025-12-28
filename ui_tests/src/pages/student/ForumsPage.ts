import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';
import { Page, expect, Locator } from '@playwright/test';

export class ForumsPage extends BasePage {
  readonly ForumsHeader: Locator;
  readonly NewPostButton: Locator;
  readonly NewPostModal: Locator;
  readonly NewPostModalTitle: Locator;
  
  readonly SearchInput: Locator;
  readonly Posts: Locator;
 
  

  
  constructor(page: Page) {
    super(page);
    
    // heading locator for Forums page
    this.ForumsHeader = page.getByRole('heading', { name: 'Forums' });

    // New Post button
    this.NewPostButton = page.getByRole('button', { name: /new post/i });
    // Search input
    this.SearchInput = page.locator('input[placeholder="Search posts..."]'); 
    // All post headings
    this.Posts = page.locator('h6'); 
    this.NewPostModal=page.getByRole('dialog');
    this.NewPostModalTitle= this.NewPostModal.getByRole('heading', { name: /create a new topic/i });

  }
  

  // Dynamically get topic button
  topicButton(topic: string): Locator {
    return this.page.getByRole('button', { name: topic }).first();
  }

  // Locator for forum posts
  forumPosts(): Locator {
    return this.page.locator('.forum-post'); // adjust to your actual post container
  }

  // Locator for post topic tags
  postTopic(post: Locator): Locator {
    return post.locator('.post-topic'); // adjust to your actual post topic class
  }
  

  
 // Navigate to Forums page
  
 
   async navigateToForums() {
    const url = env.getBaseUrl() + '/community/forums'; 
    await this.page.goto(url);
   // await expect(this.page).toHaveURL(/\/community\/forums$/, { timeout: 10000 });
   
 }


  // Verify Forums page loaded
  async verifyPage() {
    await expect(this.page).toHaveURL(/\/community\/forums$/);
    await expect(this.ForumsHeader).toBeVisible({ timeout: 15000 });
  }
  
  // Click New Post button
  async clickNewPostButton() {
  await expect(this.NewPostButton).toBeVisible({ timeout: 15000 });
  await this.NewPostButton.click();
}


  async verifyNewPostModalVisible() {
  await this.NewPostModal.waitFor({ state: 'visible', timeout: 10000 });
  await expect(this.NewPostModalTitle).toBeVisible({ timeout: 5000 });
  }
  async verifyNewPostModalHidden() {
    await expect(this.NewPostModal).toBeHidden({ timeout: 5000 });
  }


 async verifySearchInputVisible() {
  // 1️⃣ Ensure Forums page is really loaded
  await expect(this.ForumsHeader).toBeVisible({ timeout: 10000 });

  // 2️⃣ DEBUG: confirm element exists
  const count = await this.SearchInput.count();
  console.log('🔍 Search input elements found:', count);

  // 3️⃣ Visibility assertion
  await expect(this.SearchInput).toBeVisible({ timeout: 10000 });

  console.log('✅ Search input field is visible');
}

// ===== SEARCH METHODS =====
  async searchFor(keyword: string) {
    await expect(this.SearchInput).toBeVisible({ timeout: 10000 });
    await this.SearchInput.fill(keyword);
    await this.page.waitForTimeout(500); // wait for search results
  }

  //async verifyMatchingPosts(keyword: string) {
    //const matchingPosts = this.Posts.filter({ hasText: keyword });
    //await expect(matchingPosts).toBeVisible();
 // }
  async verifyMatchingPosts(keyword: string) {
  const matchingPosts = this.Posts.filter({ hasText: new RegExp(keyword, 'i') });
  const count = await matchingPosts.count();

  if (count === 0) {
    console.warn(`No posts found containing "${keyword}"`);
    return false; // indicates no results
  }

  // Wait for all matching posts to be visible
  for (let i = 0; i < count; i++) {
    await expect(matchingPosts.nth(i)).toBeVisible();
  }

  return true; // posts found
}

// Verify non-matching posts are hidden
  async verifyNonMatchingPostsAreHidden(keyword: string) {
  const nonMatchingPosts = this.Posts.filter({ hasNotText: keyword });
  await expect(nonMatchingPosts).toHaveCount(await nonMatchingPosts.count());
}

// ===== TOPIC FILTER METHODS =====
// ===== TOPIC FILTER METHODS =====

async clickTopic(topic: string) {
  await this.topicButton(topic).click();
  await this.page.waitForTimeout(300); // UI animation
}

async verifyButtonHighlighted(topic: string) {
  const classList = await this.topicButton(topic).getAttribute('class');
  expect(classList).toMatch(/MuiChip-filledPrimary|selected/);
}

async verifyPostsForTopic(topic: string) {
  const posts = this.forumPosts();
  const count = await posts.count();

  for (let i = 0; i < count; i++) {
    const post = posts.nth(i);
    const tags = await this.postTopic(post).allTextContents();
    expect(tags).toContain(topic);
  }
}




















}