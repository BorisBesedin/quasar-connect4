<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ $t("MainHeaderTitle") }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer class="q-pa-md" v-model="leftDrawerOpen" show-if-above bordered>
      <IndexLangChange />

      <div v-if="user">
        {{ user.name }}
        {{ user.scores }}
        <q-btn @click="logout" :label="'Logout'" color="primary" />
      </div>
      <LoginForm v-else />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import IndexLangChange from "src/components/IndexLangChange.vue";
import LoginForm from "src/components/LoginForm.vue";
import { useAuthStore } from "src/stores/auth";
import { useUserStore } from "src/stores/user";
import { computed, ref } from "vue";

const leftDrawerOpen = ref(false);
const userStore = useUserStore();
const { logout, init } = useAuthStore();

const user = computed(() => userStore.user);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

init();
</script>
