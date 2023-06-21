import { defineStore } from "pinia"
import lessons from "../apiVideo"

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { 
        videos: lessons
    };
  },
  actions: {
  },
  getters: {
  },
})