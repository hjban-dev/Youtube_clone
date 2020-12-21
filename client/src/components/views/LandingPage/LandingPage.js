import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
	const [Video, setVideo] = useState([]);

	const onClickHandler = () => {
		axios.get("/api/users/logout").then((response) => {
			if (response.data.success) {
				props.history.push("/login");
			} else {
				alert("로그아웃 실패");
			}
		});
	};

	const renderPost = Video.map((video, idx) => {
		return;
	});

	useEffect(() => {
		axios.get("/api/video/getVideos").then((response) => {
			if (response.data.success) {
				console.log(response.data);
				setVideo(response.data.videos);
			} else {
				alert("비디오 가져오기 실패");
			}
		});
	}, []);

	return (
		<LandingDiv>
			{renderPost}
			{/* <button onClick={onClickHandler}>로그아웃</button> */}
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
