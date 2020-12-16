import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
	useEffect(() => {
		axios.get("/api/hello").then((response) => console.log(response));
	}, []);

	const onClickHandler = () => {
		axios.get("/api/users/logout").then((response) => {
			if (response.data.success) {
				props.history.push("/login");
			} else {
				alert("로그아웃 실패");
			}
		});
	};

	return (
		<LandingDiv>
			시작페이지
			<button onClick={onClickHandler}>로그아웃</button>
		</LandingDiv>
	);
}

const LandingDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	font-size: 2rem;
`;

export default withRouter(LandingPage);
