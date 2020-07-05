
import createOption from '../src/option/create-option.js';
import suite        from './suite-generator.js';

const coverage = require('../reports/coverage/coverage-summary.json');

suite(['Version 1.0.0', 'Test Coverage'], () => {

  test('100% line coverage', () => {
    expect(coverage.total.lines.pct).toBe(100);
  });

  test('100% statement coverage', () => {
    expect(coverage.total.statements.pct).toBe(100);
  });

  test('100% function coverage', () => {
    expect(coverage.total.functions.pct).toBe(100);
  });

  test('100% branch coverage', () => {
    expect(coverage.total.branches.pct).toBe(100);
  });

});
