import React, { useState } from "react";
import styled from "styled-components";

function ReplyComment(props) {
	const [Open, setOpen] = useState(false);

	const onClickOpen = () => {
		setOpen(!Open);
	};

	const renderReplyCommnet = () => {
		// props.map((comment, idx) => {
		// 	console.log(comment);
		// });
	};

	return (
		<ExpanderDiv>
			<button type="button" className="expand-btn" onClick={onClickOpen}>
				<span></span>
				{Open ? "답글 숨기기" : "답글 보기"}
			</button>
			<ul className="expend-list">
				{Open && (
					<li className="comments">
						<span className="icon"></span>
						<div className="txt-wrap">
							<p className="comment-writer">
								<span className="date">1일 전</span>
							</p>
							<p className="comment-desc">진짜 해봤는데 나오네요 ㅋㅋㅋㅋㅋㅋㅋ</p>
							<div className="btn-box">
								<button type="button">
									<img src="/images/comment-icon2.jpg" alt="" />
								</button>
								<button type="button">
									<img src="/images/comment-icon3.jpg" alt="" />
								</button>
								<button type="button" onClick={onClickOpen}>
									답글
								</button>
							</div>
						</div>
					</li>
				)}
			</ul>
		</ExpanderDiv>
	);
}

export default ReplyComment;

const ExpanderDiv = styled.div`
	margin-left: 56px;
	.expand-btn {
		margin: 2px 0 10px;
		color: #065fd4;
		span {
			display: inline-block;
			width: 0px;
			height: 0px;
			margin: 0 8px 0 8px;
			border-top: 4px solid transparent;
			border-bottom: 4px solid transparent;
			border-right: 4px solid blue;
			transform: rotate(-90deg);
		}
	}
	.expend-list {
		li.comments {
			display: flex;
			.icon {
				width: 24px;
				height: 24px;
			}
			.txt-wrap .btn-box {
				margin-top: 0;
			}
		}
	}
`;
