import axios from "axios";

const BASE_URL = "https://api.coincap.io/v2";

class API {
	static get = (path) => {
		return axios.get(`${BASE_URL}${path}`);
	};
}

export default API;
