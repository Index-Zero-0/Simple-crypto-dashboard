import { useState, useContext } from "react";
import selectedCurrencyContext, {
	INTERVALS,
} from "../store/selectedCurrencyContext";
import currencyListContext from "../store/currencyListContext";
import LineChart from "../components/LineChart";
import CurrencyTable from "../components/CurrencyTable";

const OPTION_HOUR_MINUT = {
	hour: "2-digit",
	minute: "2-digit",
};

const OPTION_MONTH_DAY = {
	day: "numeric",
	month: "long",
};

const OPTION_MONTH_YEAR = {
	year: "numeric",
	month: "short",
	day: "numeric",
};

const Dashboard = () => {
	const ctx = useContext(
		selectedCurrencyContext
	);
	const currencies = useContext(
		currencyListContext
	).currencyList;
	const [searchPhrase, setSearch] =
		useState("");
	const [suggestions, setSuggestions] =
		useState([]);

	const onSearchChange = (event) => {
		setSearch(event.target.value);
		let matched = currencies.filter(
			(currency) =>
				currency.name
					.toLowerCase()
					.includes(
						event.target.value.toLowerCase()
					)
		);

		if (
			matched.length > 5 &&
			event.target.value !== ""
		) {
			matched = matched.slice(0, 5);
		} else if (event.target.value === "") {
			matched = [];
		}

		setSuggestions(matched);
	};

	const selectedSearchedCurrency = (
		currencyId
	) => {
		ctx.getHistory(currencyId);
		setSearch("");
		setSuggestions([]);
	};

	const generateLabels = () => {
		console.log(ctx.interval);
		let options =
			ctx.interval === "1D"
				? OPTION_HOUR_MINUT
				: OPTION_MONTH_DAY;
		options = ["6M", "1Y"].includes(
			ctx.interval
		)
			? OPTION_MONTH_YEAR
			: options;
		return ctx.history.map((item) => {
			const date = new Date(item.date);
			return date.toLocaleString(
				"en-US",
				options
			);
		});
	};

	return (
		<main className="main">
			<section>
				<div className="search-box">
					<input
						type="text"
						placeholder="search..."
						value={searchPhrase}
						onChange={onSearchChange}
					/>
					{suggestions.length > 0 && (
						<ul className="suggestion-box">
							{suggestions.map(
								(currency) => (
									<li
										key={
											currency.id
										}
										onClick={() =>
											selectedSearchedCurrency(
												currency.id
											)
										}>
										{
											currency.name
										}
									</li>
								)
							)}
						</ul>
					)}
				</div>
			</section>
			<section>
				<div className="intervals">
					{Object.keys(INTERVALS).map(
						(interval) => (
							<button
								className={`interval-btn ${
									interval ===
										ctx.interval &&
									"active"
								}`}
								onClick={() => {
									ctx.getHistory(
										ctx.selected_id,
										interval
									);
								}}
								key={interval}>
								{interval}
							</button>
						)
					)}
				</div>
				<LineChart
					data={ctx.history.map(
						(item) => item.priceUsd
					)}
					labels={generateLabels()}
					selectedCurrency={currencies.find(
						(currency) =>
							currency.id ===
							ctx.selected_id
					)}
				/>
			</section>
			<section>
				<div className="title">
					<h4>Top assets</h4>
				</div>
				<CurrencyTable />
			</section>
		</main>
	);
};

export default Dashboard;
