const fs = require('fs');

function refactorFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace `{ loginPage, page }` with `{ app, page }`
  content = content.replace(/\{ loginPage, page \}/g, '{ app, page }');
  
  // Replace `{ loginPage }` with `{ app }`
  content = content.replace(/\{ loginPage \}/g, '{ app }');
  
  // Replace `loginPage.` with `app.loginPage.`
  content = content.replace(/loginPage\./g, 'app.loginPage.');
  
  fs.writeFileSync(filePath, content);
  console.log(`Refactored ${filePath}`);
}

refactorFile('tests/steps/login.steps.ts');
refactorFile('tests/steps/unit-steps/add-unit.steps.ts');
