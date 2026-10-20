// Generated from: tests\features\task-flows\test-data-daibieuhdnd.feature
import { test } from "../../../../tests/fixtures/fixtures.ts";

test.describe('Đếm số lượng đại biểu HĐND các cấp theo đơn vị hành chính', () => {

  test.beforeEach('Background', async ({ Given, app, page }, testInfo) => { if (testInfo.error) return;
    await Given('user is logged in as admin', null, { app, page }); 
  });
  
  test.describe('Đếm theo yêu cầu', () => {

    test('Example #1', { tag: ['@daibieuhdnd', '@checkbox'] }, async ({ When, Then, And, app, page }) => { 
      await When('user is on the "Danh sách chính quyền địa phương" page', null, { app, page }); 
      await And('user searches for local government "HĐND Tỉnh Bắc Ninh"', null, { app }); 
      await And('user clicks view detail icon for local government "HĐND Tỉnh Bắc Ninh"', null, { app }); 
      await Then('user should see the local government detail information', null, { page }); 
      await When('user clicks category "Đại biểu HDND" in detail page', null, { app }); 
      await Then('user counts delegates with checkbox "MTTQ và đoàn thể" on "Đại biểu HDND" for local government "HĐND Tỉnh Bắc Ninh"', null, { app }); 
    });

  });

  test.describe('View details and count delegates by gender', () => {

    test('Example #1', { tag: ['@daibieuhdnd', '@gender'] }, async ({ When, Then, And, app, page }) => { 
      await When('user is on the "Danh sách chính quyền địa phương" page', null, { app, page }); 
      await And('user searches for local government "HĐND Xã Việt Lâm"', null, { app }); 
      await And('user clicks view detail icon for local government "HĐND Xã Việt Lâm"', null, { app }); 
      await Then('user should see the local government detail information', null, { page }); 
      await When('user clicks category "Đại biểu HDND" in detail page', null, { app }); 
      await Then('user counts delegates with gender "Nữ" for local government "HĐND Xã Việt Lâm"', null, { app }); 
    });

  });

  test.describe('Thống kê số lượng đại biểu theo Trình độ chuyên môn', () => {

    test('Example #1', { tag: ['@daibieuhdnd', '@trinhdocm'] }, async ({ When, Then, And, app, page }) => { 
      await When('user is on the "Danh sách chính quyền địa phương" page', null, { app, page }); 
      await And('user searches for local government "HĐND Tỉnh Lai Châu"', null, { app }); 
      await And('user clicks view detail icon for local government "HĐND Tỉnh Lai Châu"', null, { app }); 
      await Then('user should see the local government detail information', null, { page }); 
      await When('user clicks category "Đại biểu HDND" in detail page', null, { app }); 
      await Then('user counts delegates by dropdown "Trình độ lý luận chính trị" without percentage for local government "HĐND Tỉnh Lai Châu"', null, { app }); 
    });

  });

  test.describe('Thống kê số lượng đại biểu theo nhóm độ tuổi', () => {

    test('Example #1', { tag: ['@daibieuhdnd', '@age'] }, async ({ When, Then, And, app, page }) => { 
      await When('user is on the "Danh sách chính quyền địa phương" page', null, { app, page }); 
      await And('user searches for local government "HĐND Thành phố Hải Phòng"', null, { app }); 
      await And('user clicks view detail icon for local government "HĐND Thành phố Hải Phòng"', null, { app }); 
      await Then('user should see the local government detail information', null, { page }); 
      await When('user clicks category "Đại biểu HDND" in detail page', null, { app }); 
      await Then('user counts delegates by age group for local government "HĐND Thành phố Hải Phòng"', null, { app }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\task-flows\\test-data-daibieuhdnd.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":18,"tags":["@daibieuhdnd","@checkbox"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is logged in as admin","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When user is on the \"Danh sách chính quyền địa phương\" page","stepMatchArguments":[{"group":{"start":15,"value":"\"Danh sách chính quyền địa phương\"","children":[{"start":16,"value":"Danh sách chính quyền địa phương","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And user searches for local government \"HĐND Tỉnh Bắc Ninh\"","stepMatchArguments":[{"group":{"start":35,"value":"\"HĐND Tỉnh Bắc Ninh\"","children":[{"start":36,"value":"HĐND Tỉnh Bắc Ninh","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And user clicks view detail icon for local government \"HĐND Tỉnh Bắc Ninh\"","stepMatchArguments":[{"group":{"start":50,"value":"\"HĐND Tỉnh Bắc Ninh\"","children":[{"start":51,"value":"HĐND Tỉnh Bắc Ninh","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then user should see the local government detail information","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When user clicks category \"Đại biểu HDND\" in detail page","stepMatchArguments":[{"group":{"start":21,"value":"\"Đại biểu HDND\"","children":[{"start":22,"value":"Đại biểu HDND","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then user counts delegates with checkbox \"MTTQ và đoàn thể\" on \"Đại biểu HDND\" for local government \"HĐND Tỉnh Bắc Ninh\"","stepMatchArguments":[{"group":{"start":36,"value":"\"MTTQ và đoàn thể\"","children":[{"start":37,"value":"MTTQ và đoàn thể","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":58,"value":"\"Đại biểu HDND\"","children":[{"start":59,"value":"Đại biểu HDND","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":95,"value":"\"HĐND Tỉnh Bắc Ninh\"","children":[{"start":96,"value":"HĐND Tỉnh Bắc Ninh","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":25,"pickleLine":42,"tags":["@daibieuhdnd","@gender"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is logged in as admin","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When user is on the \"Danh sách chính quyền địa phương\" page","stepMatchArguments":[{"group":{"start":15,"value":"\"Danh sách chính quyền địa phương\"","children":[{"start":16,"value":"Danh sách chính quyền địa phương","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And user searches for local government \"HĐND Xã Việt Lâm\"","stepMatchArguments":[{"group":{"start":35,"value":"\"HĐND Xã Việt Lâm\"","children":[{"start":36,"value":"HĐND Xã Việt Lâm","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And user clicks view detail icon for local government \"HĐND Xã Việt Lâm\"","stepMatchArguments":[{"group":{"start":50,"value":"\"HĐND Xã Việt Lâm\"","children":[{"start":51,"value":"HĐND Xã Việt Lâm","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then user should see the local government detail information","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When user clicks category \"Đại biểu HDND\" in detail page","stepMatchArguments":[{"group":{"start":21,"value":"\"Đại biểu HDND\"","children":[{"start":22,"value":"Đại biểu HDND","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then user counts delegates with gender \"Nữ\" for local government \"HĐND Xã Việt Lâm\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Nữ\"","children":[{"start":35,"value":"Nữ","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"HĐND Xã Việt Lâm\"","children":[{"start":61,"value":"HĐND Xã Việt Lâm","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":38,"pickleLine":55,"tags":["@daibieuhdnd","@trinhdocm"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is logged in as admin","isBg":true,"stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When user is on the \"Danh sách chính quyền địa phương\" page","stepMatchArguments":[{"group":{"start":15,"value":"\"Danh sách chính quyền địa phương\"","children":[{"start":16,"value":"Danh sách chính quyền địa phương","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"And user searches for local government \"HĐND Tỉnh Lai Châu\"","stepMatchArguments":[{"group":{"start":35,"value":"\"HĐND Tỉnh Lai Châu\"","children":[{"start":36,"value":"HĐND Tỉnh Lai Châu","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"And user clicks view detail icon for local government \"HĐND Tỉnh Lai Châu\"","stepMatchArguments":[{"group":{"start":50,"value":"\"HĐND Tỉnh Lai Châu\"","children":[{"start":51,"value":"HĐND Tỉnh Lai Châu","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then user should see the local government detail information","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When user clicks category \"Đại biểu HDND\" in detail page","stepMatchArguments":[{"group":{"start":21,"value":"\"Đại biểu HDND\"","children":[{"start":22,"value":"Đại biểu HDND","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then user counts delegates by dropdown \"Trình độ lý luận chính trị\" without percentage for local government \"HĐND Tỉnh Lai Châu\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Trình độ lý luận chính trị\"","children":[{"start":35,"value":"Trình độ lý luận chính trị","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":103,"value":"\"HĐND Tỉnh Lai Châu\"","children":[{"start":104,"value":"HĐND Tỉnh Lai Châu","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":51,"pickleLine":69,"tags":["@daibieuhdnd","@age"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is logged in as admin","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When user is on the \"Danh sách chính quyền địa phương\" page","stepMatchArguments":[{"group":{"start":15,"value":"\"Danh sách chính quyền địa phương\"","children":[{"start":16,"value":"Danh sách chính quyền địa phương","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"And user searches for local government \"HĐND Thành phố Hải Phòng\"","stepMatchArguments":[{"group":{"start":35,"value":"\"HĐND Thành phố Hải Phòng\"","children":[{"start":36,"value":"HĐND Thành phố Hải Phòng","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"And user clicks view detail icon for local government \"HĐND Thành phố Hải Phòng\"","stepMatchArguments":[{"group":{"start":50,"value":"\"HĐND Thành phố Hải Phòng\"","children":[{"start":51,"value":"HĐND Thành phố Hải Phòng","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then user should see the local government detail information","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"When user clicks category \"Đại biểu HDND\" in detail page","stepMatchArguments":[{"group":{"start":21,"value":"\"Đại biểu HDND\"","children":[{"start":22,"value":"Đại biểu HDND","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"Then user counts delegates by age group for local government \"HĐND Thành phố Hải Phòng\"","stepMatchArguments":[{"group":{"start":56,"value":"\"HĐND Thành phố Hải Phòng\"","children":[{"start":57,"value":"HĐND Thành phố Hải Phòng","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end