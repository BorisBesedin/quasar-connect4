import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as fbRef, set, onValue } from "firebase/database";

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
      scores: 0,
    });
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
  };
});
