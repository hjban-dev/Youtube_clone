import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";

import NavBar from "./views/NavBar/NavBar";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";

import Auth from "../hoc/auth";

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Auth(LandingPage, null)} />
				<Route exact path="/login" component={Auth(LoginPage, false)} />
				<Route exact path="/register" component={Auth(RegisterPage, false)} />
				<Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
				<Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
			</Switch>
		</Router>
	);
}

export default App;
