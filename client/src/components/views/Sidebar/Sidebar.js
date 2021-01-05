import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

function Sidebar() {
	const path = window.location.pathname;
	return (
		<SidebarDiv>
			<ul>
				<li>
					<Link to="/" title="홈" className="sidebar-link">
						{path === "/" ? <img src="./images/sidebar-icon1-on.jpg" alt="" /> : <img src="./images/sidebar-icon1.jpg" alt="" />}
						<span>홈</span>
					</Link>
				</li>
				<li>
					<div className="sidebar-link">
						<img src="./images/sidebar-icon2.jpg" alt="" />
						<span>인기</span>
					</div>
				</li>
				<li>
					<Link to="/subscription" title="구독" className="sidebar-link">
						{path === "/subscription" ? <img src="./images/sidebar-icon3-on.jpg" alt="" /> : <img src="./images/sidebar-icon3.jpg" alt="" />}
						<span>구독</span>
					</Link>
				</li>
				<li>
					<div className="sidebar-link">
						<img src="./images/sidebar-icon4.jpg" alt="" />
						<span>보관함</span>
					</div>
				</li>
			</ul>
		</SidebarDiv>
	);
}

export default withRouter(Sidebar);

const SidebarDiv = styled.div`
	ul {
		li {
			width: 72px;
			padding: 16px 0 14px;
			.sidebar-link {
				display: block;
				font-size: 10px;
				text-align: center;
				color: #606060;
				img {
					margin-bottom: 6px;
				}
				span {
					display: block;
				}
			}
		}
	}
`;
