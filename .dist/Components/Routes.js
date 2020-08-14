import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import history from './history';



export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/" exact component={SignUp} />
                    
                    
                </Switch>
            </Router>
        )
    }
}