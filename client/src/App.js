import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/register" component={RegisterPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
