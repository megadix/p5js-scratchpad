import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from "./common/Navbar";
import {Breadcrumb} from "react-bootstrap";
import Sketch from "./common/Sketch";
import React from "react";
import WobbleCircles from "./sketches/creative/wobble-circles";

export default function App() {
  return (
    <Router>
      <header>
        <Navbar/>
      </header>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Sketches</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Chaos</Breadcrumb.Item>
        <Breadcrumb.Item active>Mandelbrot Set Orbits Explorer</Breadcrumb.Item>
      </Breadcrumb>
      <Sketch title="Mandelbrot Set Orbits Explorer" sketch={WobbleCircles}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut delectus, dolorem eos est ex inventore ipsa magnam nesciunt nostrum odit quam quas quasi quia rem repellat reprehenderit veniam voluptate?
        </p>
      </Sketch>
    </Router>
  );
}
