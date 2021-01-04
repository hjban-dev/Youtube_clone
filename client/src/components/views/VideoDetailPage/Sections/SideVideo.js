import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function SideVideo() {
	const [SideVideos, setSideVideos] = useState([]);

	useEffect(() => {
		axios.get("/api/video/getVideos").then((response) => {
			if (response.data.success) {
				setSideVideos(response.data.videos);
			} else {
				alert("비디오 가져오기 실패");
			}
		});
	}, []);

	const SideVideoList = SideVideos.map((video, idx) => {
		let minutes = Math.floor(video.duration / 60);
		let seconds = Math.floor(video.duration - minutes * 60);

		return (
			<li key={idx}>
				<Link to={`/video/${video._id}`} title="">
					<div className="img-wrap">
						<img src={`http://localhost:5000/${video.thumbnail}`} alt="" />
						<div className="duration">
							{minutes} : {seconds}
						</div>
					</div>
					<div className="details">
						<div className="txt-wrap">
							<p className="video-tit">{video.title}</p>
							<p className="video-writer">{video.writer.name}</p>
							<p className="video-views">
								조회수 {video.views}회 • {video.createdAt.slice(0, 10)}
							</p>
						</div>
					</div>
				</Link>
			</li>
		);
	});

	return <SideVideoUl>{SideVideoList}</SideVideoUl>;
}

export default withRouter(SideVideo);

const SideVideoUl = styled.ul`
	li {
		padding-bottom: 8px;
		a {
			display: flex;
			width: 100%;
			height: 94px;
			.img-wrap {
				position: relative;
				width: 41%;
				margin-right: 8px;
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
					letter-spacing: -0.7px;
					color: #fff;
				}
			}
			.details {
				width: 59%;
				.txt-wrap {
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
