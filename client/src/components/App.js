import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";

import NavBar from "./views/NavBar/NavBar";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";

import Auth from "../hoc/auth";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Auth(LandingPage, null)} />
				<Route exact path="/login" component={Auth(LoginPage, false)} />
				<Route exact path="/register" component={Auth(RegisterPage, false)} />
				<Route exact path="/upload" component={Auth(VideoUploadPage, true)} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
