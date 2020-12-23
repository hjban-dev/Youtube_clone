import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

function Sidebar() {
	return (
		<SidebarDiv>
			<ul>
				<li>
					<a href="/" title="">
						<img src="./images/sidebar-icon1-on.jpg" alt="" />
						<span>홈</span>
					</a>
				</li>
				<li>
					<a href="/" title="">
						<img src="./images/sidebar-icon2.jpg" alt="" />
						<span>인기</span>
					</a>
				</li>
				<li>
					<Link to="/subscription" title="">
						<img src="./images/sidebar-icon3.jpg" alt="" />
						<span>구독</span>
					</Link>
				</li>
				<li>
					<a href="/" title="">
						<img src="./images/sidebar-icon4.jpg" alt="" />
						<span>보관함</span>
					</a>
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
			a {
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
