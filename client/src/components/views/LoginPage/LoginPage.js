import Axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { Link, withRouter } from "react-router-dom";

function LoginPage(props) {
	const dispatch = useDispatch();

	const [Eamil, setEamil] = useState("");
	const [Password, setPassword] = useState("");

	const onEmailHandler = (event) => {
		setEamil(event.currentTarget.value);
	};

	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		let body = {
			email: Eamil,
			password: Password,
		};

		dispatch(loginUser(body)).then((response) => {
			if (response.payload.loginSuccess) {
				props.history.push("/");
			} else {
				alert("error");
			}
		});

		Axios.post("/api/users/login", body).then((res) => {});
	};

	return (
		<LoginDiv>
			<div className="login-form">
				<h1>LOGIN</h1>
				<form onSubmit={onSubmitHandler}>
					<div className="form-group">
						<label>E-MAIL </label>
						<input type="email" value={Eamil} onChange={onEmailHandler} />
					</div>
					<div className="form-group">
						<label>PASSWORD </label>
						<input type="password" value={Password} onChange={onPasswordHandler} />
					</div>
					<button className="btn">LOGIN</button>
				</form>
				<div className="register">
					<strong>계정이 없으신가요? </strong>
					<Link to="/register">회원가입!</Link>
				</div>
			</div>
		</LoginDiv>
	);
}

const LoginDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	* {
		box-sizing: border-box;
	}
	.login-form {
		width: 350px;
		background-color: #f9f9f9;
		text-align: center;
		border-radius: 0.3rem;
		padding: 0.5rem 2.5rem 2rem;
		-webkit-box-shadow: 6px 9px 7px 0px rgba(0, 0, 0, 0.29);
		-moz-box-shadow: 6px 9px 7px 0px rgba(0, 0, 0, 0.29);
		box-shadow: 6px 9px 7px 0px rgba(0, 0, 0, 0.29);
		h1 {
			font-size: 2.5rem;
			margin: 2.3rem;
		}
		form {
			display: flex;
			flex-direction: column;
			.form-group {
				input {
					border: none;
					border-bottom: 0.2rem #fd0000 solid;
					height: 2.5rem;
					margin-bottom: 2rem;
					width: 100%;
					font-family: inherit;
					font-size: 1rem;
					border-radius: 0.2rem;
					padding: 1rem 0.5rem;
					&:focus,
					&:valid {
						outline: 0;
						border-bottom: 0.2rem #fd0000 solid;
					}
				}
				label {
					display: block;
					padding-bottom: 0.5rem;
					font-size: 1rem;
					text-align: left;
					span {
						display: inline-block;
						font-size: 1.5rem;
						min-width: 0.5rem;
						transition: 300ms cubic-bezier(0.26, -0.55, 0.256, 1.55);
					}
				}
			}
			button {
				height: 2.5rem;
				width: 100%;
				margin-bottom: 2rem;
				font-family: inherit;
				font-size: 1.3rem;
				border-radius: 0.2rem;
				background-color: #fff;
				&:hover {
					cursor: pointer;
					background-color: #d90429;
					color: #fff;
				}
				&:active {
					transform: scale(0.97);
					background-color: #ef233c;
				}
			}
		}
		.register {
			a {
				font-weight: bold;
				text-decoration: none;
				color: #d90429;
			}
		}
	}
`;

export default withRouter(LoginPage);
