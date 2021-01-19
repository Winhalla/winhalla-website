import axios from "axios";
import {writable} from "svelte/store";
let eventEmitter = writable({ error:undefined });

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://api.winhalla.app"
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
        if(!url.includes("createAccount")&&!url.includes("changeEmail")&&!url.includes("exitMatch")&&!url.includes("feltrom/login")) {
            eventEmitter.set({error: e})
        }
        return e
    }
};

const getUser = async () => {
    return callApi("get", "/account");
};


export { callApi, getUser, eventEmitter};