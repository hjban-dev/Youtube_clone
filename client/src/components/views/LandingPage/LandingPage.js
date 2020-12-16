import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function LandingPage() {
	useEffect(() => {
		axios.get("/api/hello").then((response) => console.log(response));
	}, []);
	return <LandingDiv>랜딩 페이지</LandingDiv>;
}

const LandingDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	font-size: 2rem;
`;

export default LandingPage;
