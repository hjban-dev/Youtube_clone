import React, { useState, useEffect } from "react";
import Axios from "axios";

function ViewCount(props) {
	const [Views, setViews] = useState(props.video.views + 1);

	const variable = {
		videoId: props.video._id,
		views: Views + 1,
	};

	useEffect(() => {
		Axios.post("/api/video/views", variable).then((response) => {
			if (response.data.success) {
				// console.log(response.data.viewsResult);
				setViews(response.data.viewsResult.views + 1);
			} else {
				alert("비디오 정보 가져오기 실패");
			}
		});
	}, []);

	return <>{Views}</>;
}

export default ViewCount;
