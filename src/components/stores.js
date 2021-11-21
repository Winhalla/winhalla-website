import { writable } from "svelte/store";

let counter = writable({ content:/* getUser()*/null, refresh: false });
/*counter.subscribe((value) => {
    if (value.refresh === true) {
        counter.set({ content: getUser(), refresh: false });
    }
});*/


export { counter };