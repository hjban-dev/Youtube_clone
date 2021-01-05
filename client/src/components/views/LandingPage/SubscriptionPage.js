import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import VideoPost from "./Sections/VideoPost";

function LandingPage(props) {
	const [SubscriptionVideo, setSubscriptionVideo] = useState([]);

	useEffect(() => {
		const subscriptionVariable = {
			userFrom: localStorage.getItem("userId"),
		};

		axios.post("/api/video/getSubscriptionVideos", subscriptionVariable).then((response) => {
			if (response.data.success) {
				// console.log(response.data);
				setSubscriptionVideo(response.data.videos);
			} else {
				alert("비디오 가져오기 실패");
			}
		});
	}, []);

	const renderPost = SubscriptionVideo.map((video, idx) => {
		return <VideoPost key={idx} prop={video} />;
	});

	return (
		<LandingDiv>
			<Sidebar />
			<VideoPostWrap>{renderPost}</VideoPostWrap>
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
`;

const VideoPostWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	padding: 24px 16px;
	background-color: #f9f9f9;
`;
