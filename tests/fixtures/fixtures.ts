import { test as base, createBdd } from 'playwright-bdd';
import { PageManager } from '../pageObjects/pageManager';

type CustomFixtures = {
  app: PageManager;
};

export const test = base.extend<CustomFixtures>({
  app: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export const { Given, When, Then } = createBdd(test);
