import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">P5.js Scratchpad</Navbar.Brand>
    </Navbar>
  );
}