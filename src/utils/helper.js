import { API_URL } from "./globalVariable";
import store from "store";

export const fetchAPI = (uri, body, method) => {
    return new Promise(async (resolve, reject) => {
        const access_token = store.getState().account.accessToken;
        const token_type = store.getState().account.tokenType;
        const auth = `${token_type} ${access_token}`;
        const headers = {
            "Content-Type": "application/json",
            Authorization: auth,
        };

        try {
            const response = await fetch(`${API_URL}${uri}`, {
                headers,
                method: method || "GET",
                body: body ? JSON.stringify(body) : undefined,
            });
            const data = await response.json();
            resolve(data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
