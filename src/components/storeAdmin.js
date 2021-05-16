import { writable } from "svelte/store";

let config = writable({test:"lol" });

export { config };