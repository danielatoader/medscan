import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import routes from "../../configs/routesConfig";

const Routes = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </Switch>
        </Router>
    );
};

export default Routes;
