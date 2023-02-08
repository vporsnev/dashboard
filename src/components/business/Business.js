import { useEffect, useState } from "react";
import axios from "axios";
import { STOCKS_API_URL, STOCKS_API_KEY } from "../../Api";
import "./Business.css";

export default function Business() {
	const [stocks, setStocks] = useState([]);

	useEffect(() => {
		const getStocks = async () => {
			const response = await axios.get(`${STOCKS_API_URL}${STOCKS_API_KEY}`);
			console.log(response.data);
			setStocks(response.data);
		};
		getStocks();
	}, []);

	return (
		<div className="business">
			<h3>Most active stocks</h3>
			<span>
				{stocks.map((data) => {
					return (
						<div>
							<div>{data.symbol}</div>
							<div>{data.company_name}</div>
							<div>{data.price}</div>
							<div
								style={{
									color:
										parseFloat(data.change_percentage) < 0 ? "red" : "green",
								}}
							>
								{parseFloat(data.change_percentage).toFixed(2)}%
							</div>
						</div>
					);
				})}
			</span>
		</div>
	);
}
