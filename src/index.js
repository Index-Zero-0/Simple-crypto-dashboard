import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Store>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Store>
);
