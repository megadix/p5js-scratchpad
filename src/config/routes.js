import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import SketchesHomePage from "../sketches/SketchesHomePage";
import SketchesCreativePage from "../sketches/creative/SketchesCreativePage";
import MazePage from "../sketches/creative/MazePage";
import SketchesGamesPage from "../sketches/games/SketchesGamesPage";
import SketchesChaosPage from "../sketches/chaos/SketchesChaosPage";
import SketchesPhysicsPage from "../sketches/physics/SketchesPhysicsPage";
import LogisticMapPage from "../sketches/chaos/LogisticMapPage";
import MandelbrotSetPage from "../sketches/chaos/MandelbrotSetPage";
import MandelbrotSetShaderPage from "../sketches/chaos/MandelbrotSetShaderPage";
import MandelbrotOrbitsExplorerPage from "../sketches/chaos/MandelbrotOrbitsExplorerPage";

export class Route {
  constructor(label, exact, component, render) {
    this.label = label;
    this.exact = exact;
    this.component = component;
    this.render = render;
  }
}

const _routes = {
  '/': {
    path: '/',
    exact: true,
    label: 'Homepage',
    component: HomePage
  },
  '/about': {
    path: '/about',
    exact: true,
    label: 'About',
    component: AboutPage
  },
  '/sketches': {
    path: '/sketches',
    exact: true,
    label: 'Sketches',
    component: SketchesHomePage
  },
  '/sketches/chaos': {
    path: '/sketches/chaos',
    exact: true,
    label: 'Chaos',
    component: SketchesChaosPage
  },
  '/sketches/chaos/logistic-map': {
    path: '/sketches/chaos/logistic-map',
    exact: true,
    label: 'Logistic Map',
    component: LogisticMapPage
  },
  '/sketches/chaos/mandelbrot': {
    path: '/sketches/chaos/mandelbrot',
    exact: true,
    label: 'Mandelbrot Set',
    component: MandelbrotSetPage
  },
  '/sketches/chaos/mandelbrot-shader': {
    path: '/sketches/chaos/mandelbrot-shader',
    exact: true,
    label: 'Mandelbrot Set - Shader',
    component: MandelbrotSetShaderPage
  },
  '/sketches/chaos/mandelbrot-orbits-explorer': {
    path: '/sketches/chaos/mandelbrot-orbits-explorer',
    exact: true,
    label: 'Mandelbrot Set - Shader',
    component: MandelbrotOrbitsExplorerPage
  },
  '/sketches/creative': {
    path: '/sketches/creative',
    exact: true,
    label: 'Creative',
    component: SketchesCreativePage
  },
  '/sketches/creative/maze': {
    path: '/sketches/creative/maze',
    exact: true,
    label: 'Maze',
    component: MazePage
  },
  '/sketches/games': {
    path: '/sketches/games',
    exact: true,
    label: 'Games',
    component: SketchesGamesPage
  },
  '/sketches/physics': {
    path: '/sketches/physics',
    exact: true,
    label: 'Physics',
    component: SketchesPhysicsPage
  },
};

export const routes = _routes;

export function getPathComponents(path) {
  if (!path || path.trim().length === 0) {
    return [];
  }
  const current = _routes[path];
  const parentPath = path.substr(0, path.lastIndexOf('/'));
  return getPathComponents(parentPath).concat(current);
}