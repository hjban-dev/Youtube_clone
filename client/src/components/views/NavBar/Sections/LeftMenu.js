import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LeftMenu() {
	return (
		<LeftMenuDiv>
			<div className="start">
				<button>
					<img src="/images/header-start-icon1.jpg" alt="" />
				</button>
				<Link to="/" title="YouTube 홈">
					<img src="/images/header-start-icon2.jpg" alt="" />
				</Link>
			</div>
			<div className="center">
				<form>
					<input type="text" />
					<button>
						<img src="/images/header-center-icon1.jpg" alt="" />
					</button>
				</form>
			</div>
		</LeftMenuDiv>
	);
}

const LeftMenuDiv = styled.div`
	width: 100%;
	> div {
		display: flex;
		align-items: center;
		&.start {
			flex-direction: row;
			button {
				margin: 0 16px 0 0;
			}
		}
		&.center {
			flex: 0 1 728px;
			form {
				margin: 0 0 0 40px;
				input {
					height: 30px;
					box-sizing: border-box;
					border: 1px solid #d3d3d3;
					border-right: 0;
				}
				button {
					width: 65px;
					height: 30px;
					background: #f4f4f4;
					border: 1px solid #d3d3d3;
					vertical-align: middle;
				}
			}
		}
	}
`;

export default LeftMenu;
