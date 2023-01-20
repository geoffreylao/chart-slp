import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMatch from "./components/add-match.component";
import MatchStats from "./components/match-stats.component";
import GlobalStats from "./components/global-stats.component";
import Secret from "./components/global-stats-secret.component";

import { Navbar, Nav } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar variant="dark" bg="secondary" expand="lg">
          <Navbar.Brand href="/">          
            <img src="slippicharts.png" className="img-fluid" width="48" height="48" alt="slippicharts logo"/>
                  Chart.slp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/charts">GENERATE CHARTS</Nav.Link>
              <Nav.Link href="/add">UPLOAD GAMES</Nav.Link>
              <Nav.Link href="/global">GLOBAL STATS</Nav.Link>
              <Nav.Link 
                href='https://www.paypal.com/donate/?business=WC4HZ4UZXP9LU&no_recurring=0&currency_code=CAD' 
                target="_blank" 
                rel="noreferrer"
              >
                DONATE
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container-fluid">
          <Switch>
            <Route exact path={"/charts"} component={MatchStats} />
            <Route exact path={["/", "/add"]} component={AddMatch} />
            <Route exact path={["/global"]} component={GlobalStats} />
            <Route exact path={["/secret"]} component={Secret}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
