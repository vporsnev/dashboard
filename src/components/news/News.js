import axios from "axios";
import "./News.css";
import React, { useEffect, useState } from "react";
import { NEWS_API_URL, NEWS_API_KEY } from "../../Api";

export default function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const getNews = async () => {
			const response = await axios.get(
				`${NEWS_API_URL}?api-key=${NEWS_API_KEY}&page-size=10`
			);
			console.log(response);
			setNews(response.data.response.results);
		};
		getNews();
	}, []);

	// if (!news.length) return <h3>Loading...</h3>;

	return (
		<div className="news">
			<h3>Latest headlines</h3>
			<span>
				{news.map((result) => {
					return (
						<div>
							<a className="article" target="_blank" href={result.webUrl}>
								{result.webTitle}
							</a>
						</div>
					);
				})}
			</span>
		</div>
	);
}
