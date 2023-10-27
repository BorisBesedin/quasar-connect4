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
        {{ user.displayName }}
        <q-btn @click="store.logout" :label="'Logout'" color="primary" />
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
import { computed, ref } from "vue";

const leftDrawerOpen = ref(false);
const store = useAuthStore();

const user = computed(() => store.user);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
