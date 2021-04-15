import {getPathComponents} from "./routes";

describe('getPathComponents()', function () {
  const doTest = (path, expectedLabels) => {
    expect(getPathComponents(path).map(comp => comp.label)).toEqual(expectedLabels);
  };

  it('empty / blank / null / undefined', function () {
    doTest(null, []);
    doTest(undefined, []);
    doTest('', []);
    doTest(' ', []);
    doTest(' \t\n ', []);
  });

  it('/', function () {
    doTest('/', ['Homepage']);
  });

  it('simple paths', function () {
    doTest('/about', ['About']);
  });

  it('nested paths', function () {
    doTest('/sketches/creative', ['Sketches', 'Creative']);
  });
});