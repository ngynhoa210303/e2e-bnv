// Generated from: tests\features\6_Configuration\unit-features\search-unit.feature
import { test } from "../../../../../tests/fixtures/fixtures.ts";

test.describe('Quản lý đơn vị - Thêm mới đơn vị', () => {

  test.beforeEach('Background', async ({ Given, And, app, page }, testInfo) => { if (testInfo.error) return;
    await Given('user is logged in as admin', null, { app, page }); 
    await And('user is on the "Quản lý đơn vị" page', null, { app, page }); 
    await And('Setup data for search test case', {"dataTable":{"rows":[{"cells":[{"value":"unitCode"},{"value":"unitName"},{"value":"unitLevel"},{"value":"unitType"},{"value":"parentUnit"},{"value":"unitClassifyType"},{"value":"termOfOffice"},{"value":"administrativeBoundaryName"},{"value":"administrativeBoundaryCode"},{"value":"administrativeBoundaryProvinceCity"},{"value":"administrativeBoundaryCommuneWardSpecialZone"}]},{"cells":[{"value":"AT001"},{"value":"Tỉnh Autotest [1]"},{"value":"Tỉnh"},{"value":"Đơn vị hành chính"},{"value":"Chính phủ"},{"value":"Là đơn vị"},{"value":"Nhiệm kỳ 2025 - 2030"},{"value":"DGHC Autotest"},{"value":"DGHC Autotest"},{"value":"Thành phố Hà Nội"},{"value":"Phường Ngọc Hà"}]}]}}, { app }); 
  });
  
  test('Tìm kiếm đơn vị theo tên', { tag: ['@unit', '@search', '@smoke'] }, async ({ Then, And, app }) => { 
    await And('user enters "Tỉnh Autotest [1]" in the search box', null, { app }); 
    await And('user clicks the "Tìm kiếm" button', null, { app }); 
    await Then('the search results should contain the searched unit', null, { app }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\6_Configuration\\unit-features\\search-unit.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":11,"tags":["@unit","@search","@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is logged in as admin","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And user is on the \"Quản lý đơn vị\" page","isBg":true,"stepMatchArguments":[{"group":{"start":15,"value":"\"Quản lý đơn vị\"","children":[{"start":16,"value":"Quản lý đơn vị","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And Setup data for search test case","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"And user enters \"Tỉnh Autotest [1]\" in the search box","stepMatchArguments":[{"group":{"start":12,"value":"\"Tỉnh Autotest [1]\"","children":[{"start":13,"value":"Tỉnh Autotest [1]","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"And user clicks the \"Tìm kiếm\" button","stepMatchArguments":[{"group":{"start":16,"value":"\"Tìm kiếm\"","children":[{"start":17,"value":"Tìm kiếm","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the search results should contain the searched unit","stepMatchArguments":[]}]},
]; // bdd-data-end