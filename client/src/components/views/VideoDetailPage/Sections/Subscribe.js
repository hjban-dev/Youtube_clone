import Axios from "axios";
import React, { useState, useEffect } from "react";

function Subscribe(props) {
	const onClickHandler = () => {};
	const [Subscriber, setSubscriber] = useState(0);

	useEffect(() => {
		let variable = {
			userTo: props.userTo,
		};

		Axios.post("/api/subscribe/subscriberNumber", variable).then((response) => {
			if (response.data.success) {
				setSubscriber(response.data.subscrberNumber);
			} else {
				alert("구독자 데이터 가져오기 실패");
			}
		});

		Axios.post("/api/subscribe/subscribed");
	}, []);

	return (
		<div>
			<button type="button">구독</button>
		</div>
	);
}

export default Subscribe;
