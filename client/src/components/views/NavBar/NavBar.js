import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<NavBarDiv>
			<div className="start">
				<button>
					<img src="/images/header-start-icon1.jpg" alt="" />
				</button>
				<Link to="/">
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
			<div className="end">
				<ul>
					<li>
						<a href="/">
							<img src="/images/header-end-icon1.jpg" alt="" />
						</a>
					</li>
					<li>
						<a href="/">
							<img src="/images/header-end-icon2.jpg" alt="" />
						</a>
					</li>
					<li>
						<a href="/">
							<img src="/images/header-end-icon3.jpg" alt="" />
						</a>
					</li>
					<li>
						<a href="/">
							<span>H</span>
						</a>
					</li>
				</ul>
			</div>
		</NavBarDiv>
	);
}

const NavBarDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 56px;
	padding: 0 16px;
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
		&.end {
			justify-content: flex-end;
			ul {
				display: flex;
				justify-content: space-between;
				li {
					a {
						display: inline-block;
						padding: 14px;
					}
					&:last-child {
						a {
							span {
								display: inline-block;
								width: 32px;
								height: 32px;
								margin: -4px 0 0 0px;
								background: #78909c;
								border-radius: 100%;
								color: #fff;
								text-align: center;
								line-height: 32px;
							}
						}
					}
				}
			}
		}
	}
`;

export default NavBar;
