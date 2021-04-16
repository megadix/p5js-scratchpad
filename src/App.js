import {BrowserRouter as Router} from 'react-router-dom';
import MyNavbar from "./common/MyNavbar";
import React from "react";
import MainContentRouter from "./common/MainContentRouter";
import MyBreadcrumb from "./common/MyBreadcrumb";
import {Container} from "react-bootstrap";

export default function App() {
  return (
    <>
      <Router>
        <Container>
          <header>
            <MyNavbar/>
          </header>
          <MyBreadcrumb />
          <MainContentRouter/>
        </Container>
      </Router>
      {process.env.NODE_ENV === 'production' ?
        <>
          <script src="/__/firebase/7.10.0/firebase-app.js"></script>
          <script src="/__/firebase/7.10.0/firebase-analytics.js"></script>
          <script src="/__/firebase/init.js"></script>
        </>: null
      }
    </>
  );
}
