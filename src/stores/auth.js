import { defineStore } from "pinia";
import { reactive } from "vue";
import Firebase from "src/firebaseConfig";

export const useAuthStore = defineStore("auth", () => {
  const user = reactive({
    loggined: false,
    data: null,
  });
});
