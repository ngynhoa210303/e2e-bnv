// Generated from: tests\features\login.feature
import { test } from "../../../tests/fixtures/fixtures.ts";

test.describe('Login functionality', () => {

  test('Login thành công với user/pass đúng và chọn đúng CQDP', { tag: ['@serial', '@login', '@smoke', '@positive'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user enters correct username', null, { app, page }); 
    await And('user enters correct password', null, { app, page }); 
    await And('user searches and selects the CQDP database', null, { app, page }); 
    await And('user clicks the Login button', null, { app, page }); 
    await Then('user should be redirected to the dashboard', null, { app, page }); 
  });

  test('Sai password, đúng username', { tag: ['@serial', '@login', '@smoke', '@negative'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user enters correct username', null, { app, page }); 
    await And('user enters incorrect password', null, { app, page }); 
    await And('user searches and selects the CQDP database', null, { app, page }); 
    await And('user clicks the Login button', null, { app, page }); 
    await Then('user should see an toast message "Thông tin đăng nhập chưa chính xác!"', null, { app, page }); 
    await And('user should remain on the login page', null, { app, page }); 
  });

  test('Sai username, đúng password', { tag: ['@serial', '@login', '@smoke', '@negative'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user enters incorrect username', null, { app, page }); 
    await And('user enters correct password', null, { app, page }); 
    await And('user searches and selects the CQDP database', null, { app, page }); 
    await And('user clicks the Login button', null, { app, page }); 
    await Then('user should see an toast message "Thông tin đăng nhập chưa chính xác!"', null, { app, page }); 
    await And('user should remain on the login page', null, { app, page }); 
  });

  test('Username để trống', { tag: ['@serial', '@login', '@negative', '@validation'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user leaves the username field empty', null, { app, page }); 
    await And('user enters correct password', null, { app, page }); 
    await And('user searches and selects the CQDP database', null, { app, page }); 
    await And('user clicks the Login button', null, { app, page }); 
    await Then('user should see a required field validation error', null, { app, page }); 
    await And('user should remain on the login page', null, { app, page }); 
  });

  test('Password để trống', { tag: ['@serial', '@login', '@negative', '@validation'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user enters correct username', null, { app, page }); 
    await And('user leaves the password field empty', null, { app, page }); 
    await And('user searches and selects the CQDP database', null, { app, page }); 
    await And('user clicks the Login button', null, { app, page }); 
    await Then('user should see a required field validation error', null, { app, page }); 
    await And('user should remain on the login page', null, { app, page }); 
  });

  test('Cả username và password để trống', { tag: ['@serial', '@login', '@negative', '@validation'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user leaves the username field empty', null, { app, page }); 
    await And('user leaves the password field empty', null, { app, page }); 
    await And('user clicks the Login button', null, { app, page }); 
    await Then('user should see a required field validation error', null, { app, page }); 
    await And('user should remain on the login page', null, { app, page }); 
  });

  test('Không chọn database, bấm Login', { tag: ['@serial', '@login', '@smoke', '@negative'] }, async ({ Given, When, Then, And, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user enters correct username', null, { app, page }); 
    await And('user enters correct password', null, { app, page }); 
    await And('user does not select any database', null, { app, page }); 
    await And('user clicks the Login button', null, { app, page }); 
    await Then('user should see an error message indicating a database must be selected', null, { app, page }); 
    await And('user should remain on the login page', null, { app, page }); 
  });

  test('Search database không có kết quả', { tag: ['@serial', '@login', '@negative'] }, async ({ Given, When, Then, app, page }) => { 
    await Given('user is on the login page', null, { app, page }); 
    await When('user searches database with keyword "xyz123notfound"', null, { app, page }); 
    await Then('user should see "Không có tùy chọn có sẵn" in database dropdown', null, { app, page }); 
  });

  test.describe('Khoảng trắng đầu/cuối username hoặc password', () => {

    test('Example #1', { tag: ['@serial', '@login', '@edge-case'] }, async ({ Given, When, Then, And, app, page }) => { 
      await Given('user is on the login page', null, { app, page }); 
      await When('user enters username from env "USERNAME_ADMIN" with surrounding spaces', null, { app }); 
      await And('user enters password from env "PASSWORD_ADMIN" with surrounding spaces', null, { app }); 
      await And('user searches and selects the CQDP database', null, { app, page }); 
      await And('user clicks the Login button', null, { app, page }); 
      await Then('user should see "user redirected to dashboard"', null, { app, page }); 
    });

    test('Example #2', { tag: ['@serial', '@login', '@edge-case'] }, async ({ Given, When, Then, And, app, page }) => { 
      await Given('user is on the login page', null, { app, page }); 
      await When('user enters username from env "USERNAME_UBND_BN" with surrounding spaces', null, { app }); 
      await And('user enters password from env "PASSWORD_UBND_BN" with surrounding spaces', null, { app }); 
      await And('user searches and selects the CQDP database', null, { app, page }); 
      await And('user clicks the Login button', null, { app, page }); 
      await Then('user should see "user redirected to dashboard"', null, { app, page }); 
    });

    test('Example #3', { tag: ['@serial', '@login', '@edge-case'] }, async ({ Given, When, Then, And, app, page }) => { 
      await Given('user is on the login page', null, { app, page }); 
      await When('user enters username from env "USERNAME_HDND_BN" with surrounding spaces', null, { app }); 
      await And('user enters password from env "PASSWORD_HDND_BN" with surrounding spaces', null, { app }); 
      await And('user searches and selects the CQDP database', null, { app, page }); 
      await And('user clicks the Login button', null, { app, page }); 
      await Then('user should see "user redirected to dashboard"', null, { app, page }); 
    });

  });

  test.describe('SQL Injection cơ bản trong username', () => {

    test('Example #1', { tag: ['@serial', '@login', '@security'] }, async ({ Given, When, Then, And, app, page }) => { 
      await Given('user is on the login page', null, { app, page }); 
      await When('user enters username "\' OR \'1\'=\'1"', null, { app, page }); 
      await And('user enters correct password', null, { app, page }); 
      await And('user searches and selects the CQDP database', null, { app, page }); 
      await And('user clicks the Login button', null, { app, page }); 
      await Then('user should see an toast message "Thông tin đăng nhập chưa chính xác!"', null, { app, page }); 
      await And('user should not be redirected to the dashboard', null, { app, page }); 
      await And('no unexpected system error should occur', null, { app, page }); 
    });

    test('Example #2', { tag: ['@serial', '@login', '@security'] }, async ({ Given, When, Then, And, app, page }) => { 
      await Given('user is on the login page', null, { app, page }); 
      await When('user enters username "admin\'--"', null, { app, page }); 
      await And('user enters correct password', null, { app, page }); 
      await And('user searches and selects the CQDP database', null, { app, page }); 
      await And('user clicks the Login button', null, { app, page }); 
      await Then('user should see an toast message "Thông tin đăng nhập chưa chính xác!"', null, { app, page }); 
      await And('user should not be redirected to the dashboard', null, { app, page }); 
      await And('no unexpected system error should occur', null, { app, page }); 
    });

    test('Example #3', { tag: ['@serial', '@login', '@security'] }, async ({ Given, When, Then, And, app, page }) => { 
      await Given('user is on the login page', null, { app, page }); 
      await When('user enters username "\' OR 1=1--"', null, { app, page }); 
      await And('user enters correct password', null, { app, page }); 
      await And('user searches and selects the CQDP database', null, { app, page }); 
      await And('user clicks the Login button', null, { app, page }); 
      await Then('user should see an toast message "Thông tin đăng nhập chưa chính xác!"', null, { app, page }); 
      await And('user should not be redirected to the dashboard', null, { app, page }); 
      await And('no unexpected system error should occur', null, { app, page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@serial","@login","@smoke","@positive"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When user enters correct username","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And user enters correct password","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then user should be redirected to the dashboard","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":14,"tags":["@serial","@login","@smoke","@negative"],"steps":[{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When user enters correct username","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And user enters incorrect password","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then user should see an toast message \"Thông tin đăng nhập chưa chính xác!\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Thông tin đăng nhập chưa chính xác!\"","children":[{"start":34,"value":"Thông tin đăng nhập chưa chính xác!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And user should remain on the login page","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":24,"tags":["@serial","@login","@smoke","@negative"],"steps":[{"pwStepLine":26,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When user enters incorrect username","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And user enters correct password","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then user should see an toast message \"Thông tin đăng nhập chưa chính xác!\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Thông tin đăng nhập chưa chính xác!\"","children":[{"start":34,"value":"Thông tin đăng nhập chưa chính xác!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And user should remain on the login page","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":34,"tags":["@serial","@login","@negative","@validation"],"steps":[{"pwStepLine":36,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When user leaves the username field empty","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And user enters correct password","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then user should see a required field validation error","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And user should remain on the login page","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":44,"tags":["@serial","@login","@negative","@validation"],"steps":[{"pwStepLine":46,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When user enters correct username","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"And user leaves the password field empty","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then user should see a required field validation error","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"And user should remain on the login page","stepMatchArguments":[]}]},
  {"pwTestLine":55,"pickleLine":54,"tags":["@serial","@login","@negative","@validation"],"steps":[{"pwStepLine":56,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When user leaves the username field empty","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"And user leaves the password field empty","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"Then user should see a required field validation error","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"And user should remain on the login page","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":63,"tags":["@serial","@login","@smoke","@negative"],"steps":[{"pwStepLine":65,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When user enters correct username","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And user enters correct password","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And user does not select any database","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then user should see an error message indicating a database must be selected","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And user should remain on the login page","stepMatchArguments":[]}]},
  {"pwTestLine":74,"pickleLine":73,"tags":["@serial","@login","@negative"],"steps":[{"pwStepLine":75,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When user searches database with keyword \"xyz123notfound\"","stepMatchArguments":[{"group":{"start":36,"value":"\"xyz123notfound\"","children":[{"start":37,"value":"xyz123notfound","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then user should see \"Không có tùy chọn có sẵn\" in database dropdown","stepMatchArguments":[{"group":{"start":16,"value":"\"Không có tùy chọn có sẵn\"","children":[{"start":17,"value":"Không có tùy chọn có sẵn","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":82,"pickleLine":89,"tags":["@serial","@login","@edge-case"],"steps":[{"pwStepLine":83,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When user enters username from env \"USERNAME_ADMIN\" with surrounding spaces","stepMatchArguments":[{"group":{"start":30,"value":"\"USERNAME_ADMIN\"","children":[{"start":31,"value":"USERNAME_ADMIN","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":85,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"And user enters password from env \"PASSWORD_ADMIN\" with surrounding spaces","stepMatchArguments":[{"group":{"start":30,"value":"\"PASSWORD_ADMIN\"","children":[{"start":31,"value":"PASSWORD_ADMIN","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":86,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then user should see \"user redirected to dashboard\"","stepMatchArguments":[{"group":{"start":16,"value":"\"user redirected to dashboard\"","children":[{"start":17,"value":"user redirected to dashboard","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":91,"pickleLine":90,"tags":["@serial","@login","@edge-case"],"steps":[{"pwStepLine":92,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When user enters username from env \"USERNAME_UBND_BN\" with surrounding spaces","stepMatchArguments":[{"group":{"start":30,"value":"\"USERNAME_UBND_BN\"","children":[{"start":31,"value":"USERNAME_UBND_BN","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":94,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"And user enters password from env \"PASSWORD_UBND_BN\" with surrounding spaces","stepMatchArguments":[{"group":{"start":30,"value":"\"PASSWORD_UBND_BN\"","children":[{"start":31,"value":"PASSWORD_UBND_BN","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":95,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then user should see \"user redirected to dashboard\"","stepMatchArguments":[{"group":{"start":16,"value":"\"user redirected to dashboard\"","children":[{"start":17,"value":"user redirected to dashboard","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":100,"pickleLine":91,"tags":["@serial","@login","@edge-case"],"steps":[{"pwStepLine":101,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When user enters username from env \"USERNAME_HDND_BN\" with surrounding spaces","stepMatchArguments":[{"group":{"start":30,"value":"\"USERNAME_HDND_BN\"","children":[{"start":31,"value":"USERNAME_HDND_BN","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":103,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"And user enters password from env \"PASSWORD_HDND_BN\" with surrounding spaces","stepMatchArguments":[{"group":{"start":30,"value":"\"PASSWORD_HDND_BN\"","children":[{"start":31,"value":"PASSWORD_HDND_BN","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then user should see \"user redirected to dashboard\"","stepMatchArguments":[{"group":{"start":16,"value":"\"user redirected to dashboard\"","children":[{"start":17,"value":"user redirected to dashboard","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":113,"pickleLine":106,"tags":["@serial","@login","@security"],"steps":[{"pwStepLine":114,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When user enters username \"' OR '1'='1\"","stepMatchArguments":[{"group":{"start":21,"value":"\"' OR '1'='1\"","children":[{"start":22,"value":"' OR '1'='1","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":116,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"And user enters correct password","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then user should see an toast message \"Thông tin đăng nhập chưa chính xác!\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Thông tin đăng nhập chưa chính xác!\"","children":[{"start":34,"value":"Thông tin đăng nhập chưa chính xác!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":120,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"And user should not be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":102,"keywordType":"Outcome","textWithKeyword":"And no unexpected system error should occur","stepMatchArguments":[]}]},
  {"pwTestLine":124,"pickleLine":107,"tags":["@serial","@login","@security"],"steps":[{"pwStepLine":125,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When user enters username \"admin'--\"","stepMatchArguments":[{"group":{"start":21,"value":"\"admin'--\"","children":[{"start":22,"value":"admin'--","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":127,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"And user enters correct password","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then user should see an toast message \"Thông tin đăng nhập chưa chính xác!\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Thông tin đăng nhập chưa chính xác!\"","children":[{"start":34,"value":"Thông tin đăng nhập chưa chính xác!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":131,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"And user should not be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":102,"keywordType":"Outcome","textWithKeyword":"And no unexpected system error should occur","stepMatchArguments":[]}]},
  {"pwTestLine":135,"pickleLine":108,"tags":["@serial","@login","@security"],"steps":[{"pwStepLine":136,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"Given user is on the login page","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When user enters username \"' OR 1=1--\"","stepMatchArguments":[{"group":{"start":21,"value":"\"' OR 1=1--\"","children":[{"start":22,"value":"' OR 1=1--","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":138,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"And user enters correct password","stepMatchArguments":[]},{"pwStepLine":139,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And user searches and selects the CQDP database","stepMatchArguments":[]},{"pwStepLine":140,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"And user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then user should see an toast message \"Thông tin đăng nhập chưa chính xác!\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Thông tin đăng nhập chưa chính xác!\"","children":[{"start":34,"value":"Thông tin đăng nhập chưa chính xác!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":142,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"And user should not be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":143,"gherkinStepLine":102,"keywordType":"Outcome","textWithKeyword":"And no unexpected system error should occur","stepMatchArguments":[]}]},
]; // bdd-data-end