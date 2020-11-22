import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4000"
});

const callApi = async (method, url, data) => {
    const res = await axiosInstance({
        method: method,
        url: url,
        data: data
    });

    return res.data;
};

const getUser = async () => {
    return callApi("get", "/account");
};


export { callApi, getUser};