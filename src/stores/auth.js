import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const auth = getAuth();
  const $q = useQuasar();
  const { t } = useI18n();

  function setUser(data) {
    user.value = data;
  }

  function setUserName(name) {
    if (!user.value) return;

    user.value.displayName = name;
  }

  const register = async ({ name, email, password }) => {
    $q.loading.show({
      message: t("RegTitle"),
    });

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch(() => null);

    if (response) {
      updateProfile(response.user, { displayName: name });
      setUserName(name);
      $q.notify(t("RegSuccess"));
    } else {
      $q.notify(t("RegFail"));
    }
    $q.loading.hide();
    return response;
  };

  const login = async ({ email, password }) => {
    $q.loading.show();

    const response = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch(() => null);

    if (response) {
      $q.notify(t("LoginSuccess"));
    } else {
      $q.notify(t("LoginFail"));
    }
    $q.loading.hide();
    return response;
  };

  const logout = async () => {
    $q.loading.show();
    await signOut(auth);
    $q.loading.hide();
  };

  onAuthStateChanged(auth, (user) => setUser(user));

  return {
    user,
    register,
    login,
    logout,
  };
});
