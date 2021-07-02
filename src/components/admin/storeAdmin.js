import { writable } from "svelte/store";

let config = writable({ users:true });

export { config };