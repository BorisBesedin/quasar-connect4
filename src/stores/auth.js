import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useQuasar } from "quasar";

export const useAuthStore = defineStore("auth", () => {
  const user = reactive({
    loggined: false,
    data: null,
  });

  const $q = useQuasar();

  const register = async ({ name, email, password }) => {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response) {
      updateProfile(response.user, { displayName: name });
      $q.notify("Success");
    } else {
      throw new Error("Unable to register user");
    }
  };

  return {
    user,
    register,
  };
});
