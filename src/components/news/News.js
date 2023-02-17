import axios from "axios";
import "./News.css";
import React, { useEffect, useState } from "react";
import {
	NEWS_API_URL,
	NEWS_API_KEY,
	NEWS1_API_URL,
	NEWS1_API_KEY,
	NEWS2_API_URL,
	NEWS2_API_KEY,
} from "../../Api";

export default function News() {
	const [news, setNews] = useState([]);
	const [news1, setNews1] = useState([]);
	const [news2, setNews2] = useState([]);

	useEffect(() => {
		const getNews = async () => {
			const response = await axios.get(
				`${NEWS_API_URL}${NEWS_API_KEY}&language=en&categories=science,business,tech,politics,travel&exclude_source_ids=thehindu.com-2`
			);
			console.log(response);
			setNews(response.data.data);
		};
		getNews();
	}, []);

	useEffect(() => {
		const getNews1 = async () => {
			const response = await axios.get(
				`${NEWS1_API_URL}${NEWS1_API_KEY}&lang=en&topic=breaking-news,world,nation,business,technology,science`
			);
			console.log(response);
			setNews1(response.data.articles);
		};
		getNews1();
	}, []);

	useEffect(() => {
		const getNews2 = async () => {
			const response = await axios.get(
				`${NEWS2_API_URL}${NEWS2_API_KEY}&language=en&category=business,politics,technology,world`
			);
			console.log(response);
			setNews2(response.data.results);
		};
		getNews2();
	}, []);

	// if (!news.length) return <h3>Loading...</h3>;

	return (
		<div className="box news">
			<div className="box-title">
				<h3>Latest headlines</h3>
			</div>
			<span>
				{news.map((data) => {
					return (
						<div>
							<a className="article" target="_blank" href={data.url}>
								{data.title}
							</a>
						</div>
					);
				})}
			</span>
			<span>
				{news1.map((article) => {
					return (
						<div>
							<a className="article" target="_blank" href={article.url}>
								{article.title}
							</a>
						</div>
					);
				})}
			</span>
			<span>
				{news2.map((result) => {
					return (
						<div>
							<a className="article" target="_blank" href={result.link}>
								{result.title}
							</a>
						</div>
					);
				})}
			</span>
		</div>
	);
}
