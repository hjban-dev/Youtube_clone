import Axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

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
			<form onSubmit={onSubmitHandler}>
				<label>E-MAIL :</label>
				<input type="email" value={Eamil} onChange={onEmailHandler} />
				<label>Password :</label>
				<input type="password" value={Password} onChange={onPasswordHandler} />
				<br />
				<button>로그인</button>
			</form>
		</LoginDiv>
	);
}

const LoginDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	font-size: 2rem;
	form {
		display: flex;
		flex-direction: column;
		* {
			font-size: 2rem;
		}
	}
`;

export default LoginPage;
