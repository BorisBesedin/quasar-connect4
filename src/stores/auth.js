import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAuthStore = defineStore("auth", () => {
  const $q = useQuasar();
  const { t } = useI18n();
  const router = useRouter();

  const { setUser, initUser, getInfo } = useUserStore();

  const register = async ({ name, email, password }) => {
    try {
      const auth = getAuth();
      $q.loading.show({
        message: t("RegTitle"),
      });
      await createUserWithEmailAndPassword(auth, email, password);
      await initUser(name);
      $q.loading.hide();
      $q.notify(t("RegSuccess"));

      router.push({ name: "IndexPage" });
    } catch (e) {
      $q.loading.hide();
      $q.notify(t("RegFail"));
    }
  };

  const login = async ({ email, password }) => {
    try {
      const auth = getAuth();
      $q.loading.show();
      await signInWithEmailAndPassword(auth, email, password);
      $q.notify(t("LoginSuccess"));
      $q.loading.hide();
    } catch (e) {
      $q.notify(t("LoginFail"));
      $q.loading.hide();
    }
  };

  const logout = async () => {
    const auth = getAuth();

    $q.loading.show();
    await signOut(auth);
    setUser(null);
    $q.loading.hide();
  };

  const init = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) return;

      getInfo();
    });
  };

  return {
    register,
    login,
    logout,
    init,
  };
});
