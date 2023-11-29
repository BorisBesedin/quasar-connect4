import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref as fbRef,
  set,
  onValue,
  update,
} from "firebase/database";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  function getUid() {
    const { currentUser } = getAuth();

    return currentUser?.uid || null;
  }

  function setUser(data) {
    user.value = data;
  }

  const initUser = async (name) => {
    const db = getDatabase();
    await set(fbRef(db, `users/${getUid()}`), {
      name,
      wins: 0,
      loses: 0,
    });
  };

  const updateUser = async (isWin) => {
    if (!user.value) return;

    const db = getDatabase();
    const field = isWin ? "wins" : "loses";
    const data = {};

    data[field] = user.value[field] + 1;

    await update(fbRef(db, `users/${getUid()}`), { ...data });
  };

  const getInfo = async () => {
    const db = getDatabase();
    const starCountRef = fbRef(db, `users/${getUid()}`);
    await onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUser(data);
    });
  };

  return {
    user,
    initUser,
    setUser,
    getInfo,
    updateUser,
  };
});
