import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import VideoPost from "./Sections/VideoPost";

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

	useEffect(() => {
		axios.get("/api/video/getVideos").then((response) => {
			if (response.data.success) {
				// console.log(response.data);
				setVideo(response.data.videos);
			} else {
				alert("비디오 가져오기 실패");
			}
		});
	}, []);

	const renderPost = Video.map((video, idx) => {
		return <VideoPost key={idx} prop={video} />;
	});

	return (
		<LandingDiv>
			<Sidebar />
			<VideoPostWrap>{renderPost}</VideoPostWrap>
			{/* <button onClick={onClickHandler}>로그아웃</button> */}
		</LandingDiv>
	);
}

export default withRouter(LandingPage);

const LandingDiv = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	padding-top: 56px;
	box-sizing: border-box;
	align-items: flex-start;
`;

const VideoPostWrap = styled.div`
	width: 100%;
	height: auto;
	min-height: 100%;
	padding: 24px 16px;
	box-sizing: border-box;
	background-color: #f9f9f9;
`;
