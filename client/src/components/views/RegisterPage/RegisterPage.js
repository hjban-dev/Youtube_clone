import Axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
	const dispatch = useDispatch();

	const [Eamil, setEamil] = useState("");
	const [Name, setName] = useState("");
	const [Password, setPassword] = useState("");
	const [ConfirmPassword, setConfirmPassword] = useState("");

	const onEmailHandler = (event) => {
		setEamil(event.currentTarget.value);
	};

	const onNameHandler = (event) => {
		setName(event.currentTarget.value);
	};

	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
	};

	const onConfirmPasswordHandler = (event) => {
		setConfirmPassword(event.currentTarget.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (Password !== ConfirmPassword) {
			return alert("비밀번호 확인 필요");
		}

		let body = {
			email: Eamil,
			name: Name,
			password: Password,
		};

		dispatch(registerUser(body)).then((response) => {
			if (response.payload.loginSuccess) {
				props.history.push("/");
			} else {
				alert("error");
			}
		});

		Axios.post("/api/users/register", body).then((res) => {});
	};

	return (
		<RegisterDiv>
			<form onSubmit={onSubmitHandler}>
				<label>E-MAIL :</label>
				<input type="email" value={Eamil} onChange={onEmailHandler} />
				<label>Name :</label>
				<input type="text" value={Name} onChange={onNameHandler} />
				<label>Password :</label>
				<input type="password" value={Password} onChange={onPasswordHandler} />
				<label>Confirm Password :</label>
				<input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
				<br />
				<button>회원가입</button>
			</form>
		</RegisterDiv>
	);
}
const RegisterDiv = styled.div`
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

export default RegisterPage;
