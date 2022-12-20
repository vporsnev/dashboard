import axios from "axios";
import "./News.css";
import React, { useEffect, useState } from "react";
import { NEWS_API_URL, NEWS_API_KEY } from "../../Api";

export default function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const getNews = async () => {
			const response = await axios.get(`${NEWS_API_URL}lang=en&page_size=10`, {
				headers: { "x-api-key": `${NEWS_API_KEY}` },
			});
			console.log(response);
			setNews(response.data.articles);
		};
		getNews();
	}, []);

	if (!news.length) return <h3>Loading...</h3>;

	return (
		<div className="news">
			<h3>Latest headlines</h3>
			{news.map((article) => {
				return (
					<div>
						<a className="article" href={article.link}>
							<img className="news-img" src={article.media}></img>
							{article.title}
						</a>
					</div>
				);
			})}
		</div>
	);
}
