import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import path from 'path';
import { pathToFileURL } from 'url';

type ComponentFixture = {
  name: string;
  file: string;
};

const ROOT = path.resolve(__dirname, '..');

const components: ComponentFixture[] = [
  { name: 'homepage-hero', file: 'components/homepage-hero.html' },
  { name: 'featured-services', file: 'components/featured-services.html' },
  { name: 'benefits-grid', file: 'components/benefits-grid.html' },
  { name: 'formation-timeline', file: 'components/formation-timeline.html' },
  { name: 'site-footer', file: 'components/site-footer.html' }
];

const toFileUrl = (relativePath: string): string =>
  pathToFileURL(path.join(ROOT, relativePath)).href;

test.describe('Component smoke checks', () => {
  for (const { name, file } of components) {
    test(`${name} renders without errors`, async ({ page }) => {
      await page.goto(toFileUrl(file));
      await page.waitForLoadState('load');
      await expect(page).toHaveTitle(/Plantissima|Homepage|Demo/);
    });

    test(`${name} has stable visual`, async ({ page }) => {
      await page.goto(toFileUrl(file));
      await page.waitForLoadState('load');
      await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
    });

    test(`${name} passes axe smoke audit`, async ({ page }) => {
      await page.goto(toFileUrl(file));
      await page.waitForLoadState('load');
      await injectAxe(page);
      await checkA11y(page, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: true }
      });
    });
  }
});
