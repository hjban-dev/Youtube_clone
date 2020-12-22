import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

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
				console.log(response.data);
				setVideo(response.data.videos);
			} else {
				alert("비디오 가져오기 실패");
			}
		});
	}, []);

	const renderPost = Video.map((video, idx) => {
		// console.log(video);

		let minutes = Math.floor(video.duration / 60);
		let seconds = Math.floor(video.duration - minutes * 60);

		return (
			<div key={idx} className="video-post">
				<Link to={`/video/${video._id}`} title={video.title}>
					<div className="img-wrap">
						<img src={`http://localhost:5000/${video.thumbnail}`} alt="썸네일" />
						<div className="duration">
							{minutes} : {seconds}
						</div>
					</div>
					<div className="details-wrap">
						<span className="icon">{video.writer.name.slice(0, 1)}</span>
						<div className="txt-wrap">
							<p className="video-tit">{video.title}</p>
							<p className="video-writer">{video.writer.name}</p>
							<p className="video-views">
								조회수 {video.views}회 • {video.createdAt.slice(0, 10)}
							</p>
						</div>
					</div>
				</Link>
			</div>
		);
	});

	return (
		<LandingDiv>
			<VideoPostWrap>{renderPost}</VideoPostWrap>
		</LandingDiv>
	);
}

export default withRouter(LandingPage);

const LandingDiv = styled.div`
	width: 100%;
	height: calc(100% - 56px);
	padding: 24px 16px;
	background-color: #f9f9f9;
	box-sizing: border-box;
`;

const VideoPostWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	.video-post {
		width: 25%;
		padding: 0 8px;
		box-sizing: border-box;
		a {
			display: inline-block;
			width: 100%;
			height: 100%;
			margin-bottom: 40px;
			.img-wrap {
				position: relative;
				img {
					width: 100%;
					height: 100%;
				}
				.duration {
					position: absolute;
					bottom: 4px;
					right: 4px;
					padding: 3px 4px;
					background: rgba(0, 0, 0, 0.8);
					border-radius: 4px;
					font-size: 12px;
					font-family: Roboto, Arial, sans-serif;
					letter-spacing: -0.3px;
					color: #fff;
				}
			}
			.details-wrap {
				display: flex;
				margin-top: 12px;
				.icon {
					display: inline-block;
					width: 36px;
					height: 36px;
					margin: 0 12px 0 0;
					background: #78909c;
					border-radius: 100%;
					color: #fff;
					text-align: center;
					line-height: 36px;
				}
				.txt-wrap {
					width: calc(99% - 48px);
					margin-top: -2px;
					font-size: 13px;
					line-height: 18px;
					color: rgb(96, 96, 96);
					.video-tit {
						margin-bottom: 4px;
						font-size: 14px;
						color: #000;
						line-height: 20px;
					}
				}
			}
		}
	}
`;
