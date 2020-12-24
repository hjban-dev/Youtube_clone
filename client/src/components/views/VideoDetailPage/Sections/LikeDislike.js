import Axios from "axios";
import React, { useEffect, useState } from "react";

function LikeDislike(props) {
	let likeVariable = {};

	if (props.video) {
		likeVariable = { ideoId: props.videoId, userId: props.userId };
	} else {
		likeVariable = { commentId: props.commentId, userId: props.userId };
	}

	useEffect(() => {
		Axios.post("/api/like/getLikes", likeVariable).then((response) => {
			if (response.data.success) {
			} else {
				alert("좋아요 정보 가져오기 실패");
			}
		});
	}, []);

	return (
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
	);
}

export default LikeDislike;
