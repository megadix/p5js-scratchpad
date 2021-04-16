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
import AlienBrushPage from "../sketches/creative/AlienBrushPage";
import StarfieldPage from "../sketches/games/StarfieldPage";
import ThrustPage from "../sketches/games/ThrustPage";
import GravityPage from "../sketches/physics/GravityPage";
import HangingBodiesPage from "../sketches/physics/HangingBodiesPage";
import NormalFrictionPage from "../sketches/physics/NormalFrictionPage";
import SpringPage from "../sketches/physics/SpringPage";
import NewtonGravitationPage from "../sketches/physics/NewtonGravitationPage";

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
  '/sketches/creative/alien-brush': {
    path: '/sketches/creative/alien-brush',
    exact: true,
    label: 'Alien Brush',
    component: AlienBrushPage
  },
  '/sketches/games': {
    path: '/sketches/games',
    exact: true,
    label: 'Games',
    component: SketchesGamesPage
  },
  '/sketches/games/starfield': {
    path: '/sketches/games/starfield',
    exact: true,
    label: 'Starfield',
    component: StarfieldPage
  },
  '/sketches/games/thrust': {
    path: '/sketches/games/thrust',
    exact: true,
    label: 'Thrust',
    component: ThrustPage
  },
  '/sketches/physics': {
    path: '/sketches/physics',
    exact: true,
    label: 'Physics',
    component: SketchesPhysicsPage
  },
  '/sketches/physics/gravity': {
    path: '/sketches/physics/gravity',
    exact: true,
    label: 'Gravity',
    component: GravityPage
  },
  '/sketches/physics/gravity_ropes': {
    path: '/sketches/physics/gravity_ropes',
    exact: true,
    label: 'Hanging Bodies',
    component: HangingBodiesPage
  },
  '/sketches/physics/normal_friction': {
    path: '/sketches/physics/normal_friction',
    exact: true,
    label: 'Normal and Friction Forces',
    component: NormalFrictionPage
  },
  '/sketches/physics/spring': {
    path: '/sketches/physics/spring',
    exact: true,
    label: 'Spring',
    component: SpringPage
  },
  '/sketches/physics/newton-gravitation': {
    path: '/sketches/physics/newton-gravitation',
    exact: true,
    label: 'Newton Gravitation',
    component: NewtonGravitationPage
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