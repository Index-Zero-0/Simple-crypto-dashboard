import { SelectedCurrencyProvider } from "./selectedCurrencyContext";
import { CurrencyListProvider } from "./currencyListContext";

export default function Store(props) {
	return (
		<CurrencyListProvider>
			<SelectedCurrencyProvider>
				{props.children}
			</SelectedCurrencyProvider>
		</CurrencyListProvider>
	)
}