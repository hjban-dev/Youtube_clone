import React, { useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const PrivateOption = [
	{ value: 0, label: "비공개" },
	{ value: 1, label: "공개" },
];

function VideoUploadPage(props) {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
	const user = useSelector((state) => state.user);

	const [Title, setTitle] = useState("");
	const [Desc, setDesc] = useState("");
	const [Private, setPrivate] = useState(0);
	const [FilePath, setFilePath] = useState("");
	const [Dauration, setDauration] = useState("");
	const [ThumbPath, setThumbPath] = useState("");

	const onDrop = (acceptedFiles) => {
		acceptedFiles.map((file) => setTitle(file.path));

		let formData = new FormData();

		const config = {
			header: { "content-type": "mutipart/form-data" },
		};

		formData.append("file", acceptedFiles[0]);

		Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
			if (response.data.success) {
				console.log(response.data);

				let variable = {
					url: response.data.url,
					fileName: response.data.fileName,
				};

				setFilePath(response.data.url);

				Axios.post("/api/video/thumbnail", variable).then((response) => {
					if (response.data.success) {
						console.log(response.data);

						setDauration(response.data.fileDuration);
						setThumbPath(response.data.url);
					} else {
						alert("썸네일 생성 실패");
					}
				});
			} else {
				alert("비디오 업로드 실패");
			}
		});
	};

	const onTitleHandler = (event) => {
		setTitle(event.currentTarget.value);
	};

	const onDescHandler = (event) => {
		let textValue = event.currentTarget.value.replace(/(?:\r\n|\r|\n)/g, "\n");
		setDesc(textValue);
	};

	const onPrivateChange = (event) => {
		setPrivate(event.currentTarget.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const variable = {
			writer: user.userData._id,
			title: Title,
			description: Desc,
			privacy: Private,
			filePath: FilePath,
			duration: Dauration,
			thumbnail: ThumbPath,
		};

		Axios.post("/api/video/uploadVideo", variable).then((response) => {
			if (response.data.success) {
				alert("업로드 성공");

				props.history.push("/");
			} else {
				alert("비디오 업로드 실패");
			}
		});
	};

	return (
		<VideoUploadPageDiv>
			<div className="video-modal">
				<h1>동영상 업로드</h1>
				<form onSubmit={onSubmit}>
					{FilePath ? (
						<>
							<div className="video-info">
								<div className="thumbnail-container">
									<video controls>
										<source src={`http://localhost:5000/${FilePath}`} type="video/mp4" />
									</video>
									<div className="thumbnail-wrap">
										<p>
											미리보기 이미지
											<span>동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요. 시청자의 시선을 사로잡을만한 이미지를 사용해 보세요</span>
										</p>
										<div className="thumbnail-list">
											<img src={`http://localhost:5000/${ThumbPath}`} alt="thumbnail" />
											<img src={`http://localhost:5000/${ThumbPath.replace(/\w(.png)/g, "2.png")}`} alt="thumbnail" />
											<img src={`http://localhost:5000/${ThumbPath.replace(/\w(.png)/g, "3.png")}`} alt="thumbnail" />
										</div>
									</div>
								</div>
								<h2>세부정보</h2>
								<div className="info-container">
									<div className="info-title">
										<label htmlFor="input-title">제목 (필수 항목)</label>
										<input id="input-title" type="text" value={Title} onChange={onTitleHandler} />
									</div>
									<div className="info-desc">
										<label htmlFor="input-desc">설명</label>
										<textarea id="input-desc" rows="4" placeholder="시청자에게 동영상에 대해 알려주세요." onChange={onDescHandler} />
									</div>
									<div className="info-private">
										<label htmlFor="input-private">
											공개 상태
											<span>
												동영상을 <strong>공개</strong> 또는 <strong>비공개</strong>로 설정합니다.
											</span>
										</label>
										<select id="input-private" onChange={onPrivateChange}>
											{PrivateOption.map((data, idx) => (
												<option key={idx} value={data.value}>
													{data.label}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
							<button onClick={onSubmit}>저장</button>
						</>
					) : (
						<div className="drop-container">
							<Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000000}>
								{({ getRootProps, getInputProps }) => (
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<img src="/images/upload-icon.jpg" alt="" />
										<p className="desc">동영상 파일을 드래그 앤 드롭하여 업로드</p>
										<p className="sub-desc">동영상을 게시하기 전에는 비공개로 설정됩니다.</p>
										<button type="button">파일 선택</button>
									</div>
								)}
							</Dropzone>
						</div>
					)}
				</form>
			</div>
		</VideoUploadPageDiv>
	);
}

export default withRouter(VideoUploadPage);

const VideoUploadPageDiv = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 80px;
	letter-spacing: -0.35px;
	height: 100%;
	box-sizing: border-box;
	&::before {
		content: "";
		display: block;
		position: absolute;
		z-index: 0;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.video-modal {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 960px;
		height: 90%;
		max-height: 780px;
		border-radius: 6px;
		background-color: #fff;
		> h1 {
			padding: 22px 24px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.12);
			font-size: 20px;
			font-weight: 500;
			text-align: left;
		}
		> form {
			flex-direction: column;
			height: calc(100% - 65px);
			padding: 32px;
			box-sizing: border-box;
			overflow-y: auto;
			.drop-container {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				height: 100%;
				> div {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					width: 100%;
					height: 100%;
					p {
						&.desc {
							margin-top: 24px;
							font-size: 15px;
							line-height: 24px;
							color: #333;
						}
						&.sub-desc {
							margin-top: 4px;
							font-size: 13px;
							color: rgba(0, 0, 0, 0.5);
						}
					}
					button {
						margin-top: 26px;
						padding: 8px 16px;
						background-color: #065fd4;
						color: #fff;
						border-radius: 2px;
					}
				}
			}

			.video-info {
				.thumbnail-container {
					display: flex;
					justify-content: space-between;
					video {
						width: 40%;
						margin-right: 2%;
					}
					.thumbnail-wrap {
						display: flex;
						flex-direction: column;
						width: 60%;
						> p {
							span {
								display: block;
								padding: 4px 0 6px;
								font-size: 13px;
								line-height: 18px;
								color: #666;
							}
						}
						.thumbnail-list {
							display: flex;
							justify-content: start;
							img {
								width: 127px;
								margin-right: 2%;
								border-radius: 4px;
							}
						}
					}
				}
				> h2 {
					margin: 32px 0 8px;
					font-size: 24px;
					font-weight: 500;
				}

				.info-container {
					display: flex;
					flex-direction: column;
					> div {
						display: flex;
						flex-direction: column;
						label {
							margin: 16px 0 8px;
							span {
								display: block;
								padding-top: 2px;
								font-size: 13px;
								line-height: 24px;
								color: #666;
							}
						}
					}
				}
			}

			> button {
				float: right;
				min-width: 36px;
				height: 36px;
				margin-top: 26px;
				padding: 0 16px;
				font-size: 14px;
				line-height: 20px;
				color: white;
				border-radius: 2px;
				background-color: rgb(6, 95, 212);
			}
		}
		input,
		textarea,
		select {
			padding: 8px;
			font-size: 15px;
			border: 1px solid rgba(0, 0, 0, 0.23);
			border-radius: 4px;
			resize: none;
		}
	}
`;
