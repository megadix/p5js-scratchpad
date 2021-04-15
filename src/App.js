import {BrowserRouter as Router} from 'react-router-dom';
import MyNavbar from "./common/MyNavbar";
import React from "react";
import MainContentRouter from "./common/MainContentRouter";
import MyBreadcrumb from "./common/MyBreadcrumb";

export default function App() {
  return (
    <Router>
      <header>
        <MyNavbar/>
      </header>
      <MyBreadcrumb />
      <MainContentRouter/>
    </Router>
  );
}
