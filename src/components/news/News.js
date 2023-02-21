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
	const [news, setNews] = useState({});

	useEffect(() => {
		const getNews = async () => {
			const [newsResponse, news1Response, news2Response] = await Promise.all([
				axios.get(
					`${NEWS_API_URL}${NEWS_API_KEY}&language=en&categories=science,business,tech,politics,travel&exclude_source_ids=thehindu.com-2`
				),
				axios.get(
					`${NEWS1_API_URL}${NEWS1_API_KEY}&lang=en&topic=breaking-news,world,nation,business,technology,science`
				),
				axios.get(
					`${NEWS2_API_URL}${NEWS2_API_KEY}&language=en&category=business,politics,technology,world`
				),
			]);
			console.log("newsResponse:", newsResponse);
			console.log("news1Response:", news1Response);
			console.log("news2Response:", news2Response);

			setNews({
				news: newsResponse.data.data,
				news1: news1Response.data.articles,
				news2: news2Response.data.results,
			});
		};

		getNews();
	}, []);

	return (
		<div className="box news">
			<div className="box-title">
				<h3>Latest headlines</h3>
			</div>
			<span>
				{news.news &&
					news.news.map((data) => (
						<div key={data.url}>
							<a className="article" target="_blank" href={data.url}>
								<div className="art">
									<p className="art-title">{data.title}</p>
									<p className="art-source">{data.source}</p>
								</div>
							</a>
						</div>
					))}
			</span>
			<span>
				{news.news1 &&
					news.news1.map((article) => (
						<div key={article.url}>
							<a className="article" target="_blank" href={article.url}>
								<div className="art">
									<p className="art-title">{article.title}</p>
									<p className="art-source">{article.source.name}</p>
								</div>
							</a>
						</div>
					))}
			</span>
			<span>
				{news.news2 &&
					news.news2.map((result) => (
						<div key={result.link}>
							<a className="article" target="_blank" href={result.link}>
								<div className="art">
									<p className="art-title">{result.title}</p>
									<p className="art-source">{result.source_id}</p>
								</div>
							</a>
						</div>
					))}
			</span>
		</div>
	);
}
