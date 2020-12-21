import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftMenu from "./Sections/LeftMenu";

function NavBar(props) {
	const user = useSelector((state) => state.user);

	if (user.userData && user.userData.isAuth) {
		return (
			<NavBarDiv>
				<LeftMenu />
				<div className="end">
					<ul>
						<li>
							<Link to="/video/upload" title="동영상 업로드">
								<img src="/images/header-end-icon1.jpg" alt="" />
							</Link>
						</li>
						<li>
							<a href="/" title="YouTube 앱">
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
								<span>{user.userData.name.slice(0, 1)}</span>
							</a>
						</li>
					</ul>
				</div>
			</NavBarDiv>
		);
	} else {
		return (
			<NavBarDiv>
				<LeftMenu />
				<div className="end no-member">
					<ul>
						<li>
							<Link to="/login" title="동영상 업로드">
								<img src="/images/header-end-icon1.jpg" alt="" />
							</Link>
						</li>
						<li>
							<a href="/">
								<img src="/images/header-end-icon2.jpg" alt="" />
							</a>
						</li>
						<li>
							<a href="/">
								<img src="/images/header-end-icon4.jpg" alt="" />
							</a>
						</li>
						<li>
							<Link to="/login" title="로그인">
								<img src="/images/header-end-icon5.jpg" alt="" />
								로그인
							</Link>
						</li>
					</ul>
				</div>
			</NavBarDiv>
		);
	}
}

const NavBarDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	padding: 8px 16px;
	> div {
		display: flex;
		align-items: center;

		&.end {
			justify-content: flex-end;
			ul {
				display: flex;
				justify-content: space-between;
				li {
					margin-right: 8px;
					a {
						display: inline-block;
						padding: 8px;
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
			&.no-member {
				color: #065fd4;
				ul {
					li {
						&:last-child {
							margin-right: 0;
							width: 98px;
							a {
								border: 1px solid #065fd4;
								font-size: 14px;
								line-height: 24px;
								color: #065fd4;
								img {
									margin-right: 8px;
									vertical-align: top;
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default NavBar;
