import Axios from "axios";
import React, { useEffect, useState } from "react";

function LikeDislike(props) {
	const [Likes, setLikes] = useState(0);
	const [LikeAction, setLikeAction] = useState(null);
	const [Dislikes, setDislikes] = useState(0);
	const [DislikeAction, setDislikeAction] = useState(null);

	let likeVariable = {};

	if (props.video) {
		// 비디오 관련 좋아요
		likeVariable = { ideoId: props.videoId, userId: props.userId };
	} else {
		// 댓글 관련 좋아요
		likeVariable = { commentId: props.commentId, userId: props.userId };
	}

	useEffect(() => {
		Axios.post("/api/like/getLikes", likeVariable).then((response) => {
			if (response.data.success) {
				// 좋아요 개수
				setLikes(response.data.likes.length);
				// 나의 좋아요 유무
				response.data.likes.map((like) => {
					if (like.userId === props.userId) {
						setLikeAction("liked");
					}
				});
			} else {
				alert("좋아요 정보 가져오기 실패");
			}
		});

		Axios.post("/api/like/getDislikes", likeVariable).then((response) => {
			if (response.data.success) {
				// 좋아요 개수
				setDislikes(response.data.dislikes.length);
				// 나의 좋아요 유무
				response.data.dislikes.map((dislike) => {
					if (dislike.userId === props.userId) {
						setDislikeAction("disliked");
					}
				});
			} else {
				alert("싫어요 정보 가져오기 실패");
			}
		});
	}, []);

	const onLike = () => {
		if (LikeAction === null) {
			Axios.post("/api/like/uplike", likeVariable).then((response) => {
				if (response.data.success) {
					setLikes(Likes + 1);
					setLikeAction("liked");

					if (DislikeAction !== null) {
						setDislikes(Dislikes - 1);
						setDislikeAction(null);
					}
				} else {
					alert("좋아요 올리기 실패");
				}
			});
		} else {
			Axios.post("/api/like/downlike", likeVariable).then((response) => {
				if (response.data.success) {
					setLikes(Likes - 1);
					setLikeAction(null);
				} else {
					alert("좋아요 지우기 실패");
				}
			});
		}
	};

	const onDislike = () => {
		if (DislikeAction === null) {
			Axios.post("/api/like/upDislike", likeVariable).then((response) => {
				if (response.data.success) {
					setDislikes(Dislikes + 1);
					setDislikeAction("disliked");

					if (LikeAction !== null) {
						setLikes(Likes - 1);
						setLikeAction(null);
					}
				} else {
					alert("싫어요 올리기 실패");
				}
			});
		} else {
			Axios.post("/api/like/downDislike", likeVariable).then((response) => {
				if (response.data.success) {
					setDislikes(Dislikes - 1);
					setDislikeAction(null);
				} else {
					alert("싫어요 지우기 실패");
				}
			});
		}
	};

	return (
		<>
			<button type="button" onClick={onLike} className={LikeAction === "liked" ? "active" : ""}>
				<img src="/images/video-detail-icon1.jpg" alt="" />
				<span>{Likes}</span>
			</button>
			<button type="button" onClick={onDislike} className={DislikeAction === "disliked" ? "active" : ""}>
				<img src="/images/video-detail-icon2.jpg" alt="" />
				<span>{Dislikes}</span>
			</button>
		</>
	);
}

export default LikeDislike;
