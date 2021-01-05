import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

function Subscribe(props) {
	const [SubscriberNumber, setSubscriberNumber] = useState(0);
	const [Subscribed, setSubscribed] = useState(false);

	useEffect(() => {
		let variable = {
			userTo: props.userTo,
		};

		Axios.post("/api/subscribe/subscriberNumber", variable).then((response) => {
			if (response.data.success) {
				setSubscriberNumber(response.data.subscrberNumber);
			} else {
				alert("구독자 데이터 가져오기 실패");
			}
		});

		let subscrbedVariable = { userTo: props.userTo, userFrom: localStorage.getItem("userId") };

		Axios.post("/api/subscribe/subscribed", subscrbedVariable).then((response) => {
			if (response.data.success) {
				setSubscribed(response.data.subscribed);
			} else {
				alert("정보 가져오기 실패");
			}
		});
	}, []);

	const onSubscribeHandler = (event) => {
		let subscrbedVariable = {
			userTo: props.userTo,
			userFrom: props.userFrom,
		};
		if (Subscribed) {
			Axios.post("/api/subscribe/unsubscribe", subscrbedVariable).then((response) => {
				if (response.data.success) {
					setSubscriberNumber(SubscriberNumber - 1);
					setSubscribed(!Subscribed);
				} else {
					alert("구독 취소 실패");
				}
			});
		} else {
			Axios.post("/api/subscribe/subscribe", subscrbedVariable).then((response) => {
				if (response.data.success) {
					setSubscriberNumber(SubscriberNumber + 1);
					setSubscribed(!Subscribed);
				} else {
					alert("구독 실패");
				}
			});
		}
	};

	return (
		<>
			{/* {SubscriberNumber} */}
			{Subscribed ? (
				<button type="button" onClick={onSubscribeHandler} className="subscribed">
					구독중
				</button>
			) : (
				<button type="button" onClick={onSubscribeHandler}>
					구독
				</button>
			)}
		</>
	);
}

export default withRouter(Subscribe);
