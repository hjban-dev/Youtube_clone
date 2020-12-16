import { LOGIN_USER } from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSucces: action.payload };
		default:
			return state;
	}
}
