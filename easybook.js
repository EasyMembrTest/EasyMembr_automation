

const { execSync } = require("child_process");

// Define your test order here (using actual existing spec names)
const orderedTests = [
  "tests/BussinessInfoValidations.spec.ts",
  "tests/ClassValidations.spec.ts",
  "tests/ClassCategoryValidations.spec.ts",
  "tests/CancellationPolicyValidations.spec.ts",
  "tests/ScheduleValidations.spec.ts",
  "tests/EasyBook_ManageAccountValidations.spec.ts",
  "tests/TrainerValidations.spec.ts",
  
];

// Join test files into one command
const testFiles = orderedTests.join(" ");

// Run them all in one Playwright process (sequentially with --workers=1)
const command = `npx playwright test ${testFiles} --workers=1`;

// Run the command
console.log("Running Playwright tests in designed order...");

let failedSpecs = [];
try {
  execSync(command, { stdio: "inherit" });
} catch (err) {
  // Parse failed specs from error output if possible
  // Playwright does not output failed spec filenames directly, so we print a message
  console.error("Some specs failed. Check the HTML report for details.");
  failedSpecs = orderedTests; // As a fallback, list all specs (custom parsing can be added)
}

// Open the consolidated report
execSync("npx playwright show-report", { stdio: "inherit" });

if (failedSpecs.length > 0) {
  console.log("The following specs may have failed (see report for details):");
  failedSpecs.forEach(s => console.log(`  - ${s}`));
}
