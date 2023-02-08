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
		<div className="box business">
			<div className="box-title">
				<h3>Most active stocks</h3>
			</div>
			<div>
				{stocks.map((data) => {
					return (
						<div className="stock-card">
							<div className="stock-name">
								<h3>{data.symbol}</h3>
								<p className="stock-company">{data.company_name}</p>
							</div>
							<div className="stock-price">{data.price}</div>
							<div
								className="stock-change"
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
			</div>
		</div>
	);
}
