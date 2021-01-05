import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

function VideoPost({ children, ...info }) {
	// console.log({ ...info.prop });
	const video = { ...info.prop };

	let minutes = Math.floor(video.duration / 60);
	let seconds = Math.floor(video.duration - minutes * 60);

	return (
		<VideoPostDiv>
			<Link to={`/video/${video._id}`} title={video.title}>
				<div className="img-wrap">
					<img src={`http://localhost:5000/${video.thumbnail}`} alt="썸네일" />
					<div className="duration">
						{minutes} : {seconds}
					</div>
				</div>
				<div className="details-wrap">
					{video.writer.image ? <img src={video.writer.image} alt="아이콘" /> : <span className="icon">{video.writer.name.slice(0, 1)}</span>}
					<div className="txt-wrap">
						<p className="video-tit">{video.title}</p>
						<p className="video-writer">{video.writer.name}</p>
						<p className="video-views">
							조회수 {video.views}회 • {video.createdAt.slice(0, 10)}
						</p>
					</div>
				</div>
			</Link>
		</VideoPostDiv>
	);
}

export default VideoPost;

const VideoPostDiv = styled.div`
	display: inline-block;
	width: 16.5%;
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
			> img {
				width: 36px;
				height: 36px;
				margin: 0 12px 0 0;
				border-radius: 100%;
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
					max-height: 40px;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}

	@media all and (max-width: 1920px) {
		width: 20%;
	}
	@media all and (max-width: 1440px) {
		width: 25%;
	}
	@media all and (max-width: 1024px) {
		width: 33.33%;
	}
`;
