import {Redirect} from "react-router-dom";

import {DashboardPageConfig} from "../pages/dashboard/DashboardPageConfig";

const routeConfigs = [
    ...DashboardPageConfig.routes,
];

const routes = [
    ...routeConfigs,
    {
        component: () => <Redirect to="/"/>
    }
];

export default routes;