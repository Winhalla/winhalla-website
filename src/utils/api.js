import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://34.68.191.216"
});

const callApi = async (method, url, data) => {
    try {
        const res = await axiosInstance({
            method: method,
            url: url,
            data: data
        });
        return res.data;
    }catch (e) {
        return e
    }
};

const getUser = async () => {
    return callApi("get", "/account");
};


export { callApi, getUser };