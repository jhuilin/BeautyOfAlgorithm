import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navigator.css";

class Navigator extends Component {
  hello = () => {
    console.log("xyz");
  };
  render() {
    return (
      <Navbar bg="secondary" expand="lg">
        <Navbar.Brand variant="secondary">Sorting-Algorithms</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button class="btn" variant="btn secondary">
              Bubble Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Selection Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Selection Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Insertion Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Merge Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Binary insertion Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Heap Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Shell Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Tim Sort
            </Button>
            <Button class="btn" variant="btn secondary">
              Counting Sort
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigator;
