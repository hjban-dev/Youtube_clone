import React from "react";
import styled from "styled-components";

function Comment() {
	return (
		<CommentDiv className="comment-wrap">
			<div className="count-box">
				<div>댓글 0개</div>
				<div className="count-sort">
					<img src="/images/comment-icon1.jpg" alt="" />
					정렬 기준
				</div>
			</div>
			<div className="input-box">
				<span className="icon"></span>
				<div>
					<input type="text" placeholder="공개 댓글 추가..." />
					<button type="button">댓글</button>
				</div>
			</div>
			<ul className="comment-list">
				<li className="comments">
					<span className="icon"></span>
					<div className="txt-wrap">
						<p className="comment-writer">
							김시우<span className="date">1일 전</span>
						</p>
						<p className="comment-desc">생선 엄청커서 심장 좀 클줄알았는데 생각보다 작아ㅋㅋㅋㅋㅋ궈요밍</p>
						<div className="btn-box">
							<button>
								<img src="/images/comment-icon2.jpg" alt="" />
							</button>
							<button>
								<img src="/images/comment-icon3.jpg" alt="" />
							</button>
							<button>답글</button>
						</div>
					</div>
				</li>
				<li className="comments">
					<span className="icon"></span>
					<div className="txt-wrap">
						<p className="comment-writer">
							김시우<span className="date">1일 전</span>
						</p>
						<p className="comment-desc">생선 엄청커서 심장 좀 클줄알았는데 생각보다 작아ㅋㅋㅋㅋㅋ궈요밍</p>
						<div className="btn-box">
							<button>
								<img src="/images/comment-icon2.jpg" alt="" />
							</button>
							<button>
								<img src="/images/comment-icon3.jpg" alt="" />
							</button>
							<button>답글</button>
						</div>
					</div>
				</li>
			</ul>
		</CommentDiv>
	);
}

export default Comment;

const CommentDiv = styled.div`
	padding: 24px 0;
	.count-box {
		display: flex;
		align-items: center;
		padding-bottom: 24px;
		> div {
			margin-right: 32px;
			&.count-sort {
				font-size: 14px;
				color: #606060;
				vertical-align: top;
				img {
					margin-right: 8px;
					vertical-align: middle;
				}
			}
		}
	}
	.input-box {
		display: flex;
		align-items: center;
		.icon {
			display: inline-block;
			width: 40px;
			height: 40px;
			margin-right: 16px;
			background: #78909c;
			border-radius: 100%;
			color: #fff;
			text-align: center;
			line-height: 40px;
		}
		> div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e0e0e0;
			width: calc(100% - 60px);
			padding-bottom: 4px;
			input {
				padding: 8px 2px;
				background: transparent;
				border: 0;
				line-height: 20px;
				width: calc(100% - 70px);
			}
			button {
				width: 70px;
				height: 40px;
				line-height: 40px;
				color: #fff;
				background-color: #ccc;
				border-radius: 2px;
			}
		}
	}
	.comment-list {
		padding: 32px 0;
		li.comments {
			display: flex;
			margin-bottom: 16px;
			.icon {
				display: inline-block;
				width: 40px;
				height: 40px;
				margin: 2px 16px 0 0;
				background: #78909c;
				border-radius: 100%;
				color: #fff;
				text-align: center;
				line-height: 40px;
			}
			.txt-wrap {
				.comment-writer {
					margin-bottom: 4px;
					font-size: 13px;
					line-height: 20px;
					.date {
						margin-left: 4px;
					}
				}
				.comment-desc {
					font-size: 14px;
					line-height: 20px;
				}
				.btn-box {
					margin-top: 4px;
					button {
						padding: 8px;
						img {
							width: 16px;
							vertical-align: bottom;
						}
						&:last-child {
							padding: 8px 16px;
						}
					}
				}
			}
		}
	}
`;
