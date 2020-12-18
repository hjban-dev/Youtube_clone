import React, { useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import Axios from "axios";

const PrivateOption = [
	{ value: 0, label: "비공개" },
	{ value: 1, label: "공개" },
];

function VideoUploadPage(props) {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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
		setDesc(event.currentTarget.value);
	};

	return (
		<VideoUploadPageDiv>
			<h1>동영상 업로드</h1>
			<form>
				<div className="video-zone">
					<div className="drop-container">
						<Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<img src="/images/upload-icon.jpg" alt="" />
									<p className="desc">동영상 파일을 드래그 앤 드롭하여 업로드</p>
									<p className="sub-desc">동영상을 게시하기 전에는 비공개로 설정됩니다.</p>
								</div>
							)}
						</Dropzone>
					</div>
					<div className="thumbnail">
						<p>
							미리보기 이미지
							<span>동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요. 시청자의 시선을 사로잡을만한 이미지를 사용해 보세요</span>
						</p>
						{ThumbPath && <img src={`http://localhost:3000/${ThumbPath}`} alt="thumbnail" />}
					</div>
				</div>
				<div className="video-info">
					<h2>세부정보</h2>
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
							공개 상태{" "}
							<span>
								동영상을 <strong>공개</strong> 또는 <strong>비공개</strong>로 설정합니다.
							</span>
						</label>
						<select id="input-private">
							{PrivateOption.map((data, idx) => (
								<option key={idx} value={data.value}>
									{data.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<button></button>
			</form>
		</VideoUploadPageDiv>
	);
}

const VideoUploadPageDiv = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	letter-spacing: -0.35px;
	> h1 {
		margin: 24px 0;
		font-size: 24px;
		font-weight: 500;
		text-align: left;
	}
	> form {
		width: 80%;
		.video-zone {
			.drop-container {
				width: 100%;
				height: 320px;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
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
							margin-top: 2px;
							font-size: 13px;
							color: rgba(0, 0, 0, 0.5);
						}
					}
				}
			}
			.thumbnail {
				display: flex;
				justify-content: space-between;
				> p {
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
		.video-info {
			> h2 {
				margin: 16px 0;
				font-size: 24px;
				font-weight: 500;
			}
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
	input,
	textarea,
	select {
		padding: 8px;
		font-size: 15px;
		border: 1px solid rgba(0, 0, 0, 0.23);
		border-radius: 4px;
		resize: none;
	}
`;

export default VideoUploadPage;
