import { writable } from "svelte/store";
import { getUser } from "../utils/api.js";

let counter = writable({content: {  },refresh:false});

counter.subscribe(async (value)=>{
    if (value.refresh === true){
        counter.set({content:await getUser(),refresh:false})
    }
})
export { counter };