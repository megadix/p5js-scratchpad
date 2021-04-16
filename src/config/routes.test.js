import {getPathComponents} from "./routes";

describe('getPathComponents()', function () {
  const doTest = (path, expectedLabels) => {
    const result = getPathComponents(path);
    if (!expectedLabels) {
      expect(result).toBeNull();
      return;
    }
    expect(result.length).toEqual(expectedLabels.length);
    expect(result.map(comp => comp.label)).toEqual(expectedLabels);
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
    doTest('/about/', ['About']);
  });

  it('nested paths', function () {
    doTest('/sketches/creative', ['Sketches', 'Creative']);
    doTest('/sketches/creative/', ['Sketches', 'Creative']);
    doTest('/sketches/creative/wobble-circles', ['Sketches', 'Creative', 'Wobble Circles']);
    doTest('/sketches/creative/wobble-circles/', ['Sketches', 'Creative', 'Wobble Circles']);
  });

  it('404', function () {
    doTest('/doesnotexist', null);
  });
});