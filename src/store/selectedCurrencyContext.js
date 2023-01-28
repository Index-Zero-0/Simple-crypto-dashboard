import { useState, createContext } from "react";
import API from "../API";

const DEFAULT_INTERVAL = "1D";
export const INTERVALS = {
	"1D": 1,
	"1W": 7,
	"1M": 30,
	"6M": 180,
	"1Y": 365,
};

const selectedCurrencyContext = createContext({});

export const SelectedCurrencyProvider = (
	props
) => {
	const [history, setHistory] = useState([]);
	const [selectedInterval, setInterval] =
		useState(DEFAULT_INTERVAL);
	const [id, setId] = useState(null);

	const getCurrencyHistory = async (
		id,
		interval = selectedInterval
	) => {
		const interval_ =
			interval === DEFAULT_INTERVAL
				? "h2"
				: "d1";
		const start = new Date();
		start.setDate(
			start.getDate() - INTERVALS[interval]
		);
		const end = new Date();
		const url = `/assets/${id}/history?interval=${interval_}&start=${start.getTime()}&end=${end.getTime()}`;
		const response = await API.get(url);
		setHistory(response.data.data);
		setId(id);
		setInterval(interval);
	};

	const values = {
		history: history,
		getHistory: getCurrencyHistory,
		selected_id: id,
		interval: selectedInterval,
	};

	return (
		<selectedCurrencyContext.Provider
			value={values}>
			{props.children}
		</selectedCurrencyContext.Provider>
	);
};

export default selectedCurrencyContext;
