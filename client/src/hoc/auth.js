import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
	// null -> 누구든지 출입가능
	// true -> 로그인 한 유저
	// false -> 로그인 한 유저는 출입 불가

	function AuthenticationCheck(props) {
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(auth()).then((response) => {
				console.log(response);

				if (!response.payload.isAuth) {
					if (option) {
						props.history.push("/");
					}
				} else {
					if (adminRoute && !response.payload.isAdmin) {
						props.history.push("/");
					} else {
						if (option === false) {
							props.history.push("/");
						}
					}
				}
			});
		}, []);

		return <SpecificComponent />;
	}
	return withRouter(AuthenticationCheck);
}
