import { writable } from "svelte/store";

let config = writable({ refresh:true });

export { config };