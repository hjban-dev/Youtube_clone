import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage(props) {
	const videoId = props.match.params.videoId;
	const variable = { videoId: videoId };

	const [VideoDetail, setVideoDetail] = useState([]);

	useEffect(() => {
		Axios.post("/api/video/getVideoDetail", variable).then((response) => {
			if (response.data.success) {
				setVideoDetail(response.data.video);
				console.log(response.data.video);
			} else {
				alert("비디오 정보 가져오기 실패");
			}
		});
	}, []);

	if (VideoDetail.writer) {
		return (
			<VideoDetailDiv>
				<div className="video-wrap">
					<div className="player">
						<video controls autoPlay muted>
							<source src={`http://localhost:5000/${VideoDetail.filePath}`} type="video/mp4" />
						</video>
					</div>
					<div className="messages">
						<div className="txt-wrap">
							<p className="video-tit">{VideoDetail.title}</p>
							<div className="video-info">
								<p className="video-views">
									조회수 {VideoDetail.views}회 • {VideoDetail.createdAt.slice(0, 10)}
								</p>
								<div className="btn-wrap">
									<button type="button">
										<img src="/images/video-detail-icon1.jpg" alt="" />
										<span>0</span>
									</button>
									<button type="button">
										<img src="/images/video-detail-icon2.jpg" alt="" />
										<span>0</span>
									</button>
									<button type="button">
										<img src="/images/video-detail-icon3.jpg" alt="" />
										<span>공유</span>
									</button>
									<button type="button">
										<img src="/images/video-detail-icon4.jpg" alt="" />
										<span>저장</span>
									</button>
									<button type="button">
										<img src="/images/video-detail-icon5.jpg" alt="" />
									</button>
								</div>
							</div>
						</div>
						<div className="writer-wrap">
							<div className="video-writer-info">
								<span className="icon">에</span>
								<div>
									<p className="writer">{VideoDetail.writer.name}</p>
									<p>{VideoDetail.description}</p>
								</div>
							</div>
							<Subscribe userTo={VideoDetail.writer._id} />
						</div>
					</div>
					<div className="comment-wrap">
						<div className="count-box">
							<div>댓글 0개</div>
							<div>정렬 기준</div>
						</div>
						<div>
							<input type="text" />
							<button type="button">댓글</button>
						</div>
						<ul>
							<li className="comments">
								<span className="icon"></span>
								<div className="txt-wrap">
									<p className="comment-writer"></p>
									<p className="comment-desc"></p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="recom-wrap">
					<SideVideo />
				</div>
			</VideoDetailDiv>
		);
	} else {
		return <div>Loading...</div>;
	}
}

export default withRouter(VideoDetailPage);

const VideoDetailDiv = styled.div`
	display: flex;
	padding: 24px;
	background-color: #f9f9f9;
	.video-wrap {
		width: calc(100% - 402px);
		padding-right: 24px;
		.player {
			video {
				width: 100%;
			}
		}
		.messages {
			.txt-wrap {
				padding: 20px 0 8px;
				border-bottom: 1px solid #e0e0e0;
				.video-tit {
					font-size: 20px;
					line-height: 22px;
				}
				.video-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 40px;
					.video-views {
						font-size: 14px;
						color: #606060;
					}
					.btn-wrap {
						button {
							line-height: 24px;
							margin-left: 8px;
							padding-right: 6px;
							img {
								padding: 6px;
								vertical-align: middle;
							}
							span {
								display: inline-block;
							}
							&:last-child {
								img {
									padding: 0;
								}
							}
						}
					}
				}
			}
			.writer-wrap {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 16px 0;
				border-bottom: 1px solid #e0e0e0;
				.video-writer-info {
					display: flex;
					font-size: 14px;
					color: rgb(3, 3, 3);
					.icon {
						display: inline-block;
						width: 48px;
						height: 48px;
						margin: 0 12px 0 0;
						background: #78909c;
						border-radius: 100%;
						color: #fff;
						text-align: center;
						line-height: 50px;
					}
					div {
						.writer {
							padding-bottom: 12px;
							line-height: 50px;
							font-weight: bold;
						}
						p {
							line-height: 22px;
						}
					}
				}
				button {
					color: #fff;
					padding: 10px 16px;
					min-width: 70px;
					background-color: rgb(204, 0, 0);
				}
			}
		}
	}
	.comment-wrap {
		padding: 24px 0;
		.count-box {
			display: flex;
			padding-bottom: 24px;
			div {
				margin-right: 32px;
			}
		}
	}
	.recom-wrap {
		width: 402px;
	}
`;
