import { Page, TestInfo } from '@playwright/test';
import path from 'path';

export async function captureAndAttachScreenshot(page: Page, testInfo: TestInfo, name: string) {
  const screenshotPath = path.resolve(__dirname, `../../test-results/${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach(name, { path: screenshotPath, contentType: 'image/png' });
}