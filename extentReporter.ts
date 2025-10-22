import { Reporter, FullConfig, Suite, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
// @ts-ignore
import { ExtentReports, Status } from 'extent-reports';

const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
const reportDir = path.join('D:\Reports', timestamp);
const reportFile = path.join(reportDir, 'extent-report.html');
let extent: any;
let tests: any = {};

function ensureDirSync(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

class ExtentReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    ensureDirSync(reportDir);
    extent = new ExtentReports(reportFile);
  }
  onTestBegin(test: TestCase) {
    const testName = test.titlePath().join(' ');
    tests[test.id] = extent.createTest(testName);
  }
  async onTestEnd(test: TestCase, result: TestResult) {
    const testName = test.titlePath().join(' ');
    const status =
      result.status === 'passed'
        ? Status.PASS
        : result.status === 'skipped'
        ? Status.SKIP
        : Status.FAIL;
    tests[test.id].log(status, result.error ? result.error.message : 'Test finished');
    if (result.status !== 'passed') {
      for (const att of result.attachments) {
        if (att.name === 'screenshot' && att.path) {
          const screenshotPath = path.join(reportDir, `${testName.replace(/[^a-zA-Z0-9-_ ]/g, '')}.png`);
          fs.copyFileSync(att.path, screenshotPath);
          tests[test.id].addScreenCaptureFromPath(screenshotPath);
        }
      }
    }
  }
  async onEnd(result: FullResult) {
    extent.flush();
    console.log(`Extent Report: ${reportFile}`);
  }
}

export default ExtentReporter;
