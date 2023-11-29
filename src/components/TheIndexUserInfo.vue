<template>
  <q-card class="my-card q-mt-md" flat bordered v-if="user">
    <q-item>
      <q-item-section avatar>
        <q-icon name="account_circle" size="1.4rem" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user.name }}</q-item-label>
      </q-item-section>

      <q-btn @click="$emit('logout')" round color="secondary" icon="logout" />
    </q-item>

    <q-separator />

    <q-card-section>
      <p>{{ $t("IndexUserWins") }}: {{ user.wins }}</p>
      <p>{{ $t("IndexUserLoses") }}: {{ user.loses }}</p>
      <p>{{ $t("IndexUserTotal") }}: {{ total }}</p>
      <p>{{ $t("IndexUserPercent") }}: {{ percent }}</p>
    </q-card-section>
  </q-card>

  <LoginForm v-else />
</template>

<script setup>
import { useUserStore } from "src/stores/user";
import LoginForm from "./LoginForm.vue";
import { computed } from "vue";

const store = useUserStore();
const user = computed(() => store.user);
const total = computed(() => user.value.wins + user.value.loses);

const percent = computed(() => {
  const percent = (user.value.wins / total.value) * 100 || 0;

  return Math.floor(percent) + "%";
});
</script>
