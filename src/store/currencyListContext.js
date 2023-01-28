import { useState, createContext } from "react";
import API from "../API";

const currencyListContext = createContext({});

export const CurrencyListProvider = (props) => {
	const [currencyList, setCurrencyList] =
		useState([]);
	const [exchanges, setExchanges] = useState(
		[]
	);

	const getCurrencyList = () => {
		API.get("/assets")
			.then((res) => {
				setCurrencyList(res.data.data);
			})
			.catch((error) => {
				setCurrencyList([]);
				console.log(error);
			});
	};

	const getExchanges = () => {
		API.get("/exchanges")
			.then((res) => {
				setExchanges(res.data.data);
			})
			.catch((error) => {
				setExchanges([]);
				console.log(error);
			});
	};

	const values = {
		currencyList: currencyList,
		exchanges: exchanges,
		getCurrencyList: getCurrencyList,
		getExchanges: getExchanges,
	};

	return (
		<currencyListContext.Provider
			value={values}>
			{props.children}
		</currencyListContext.Provider>
	);
};

export default currencyListContext;
