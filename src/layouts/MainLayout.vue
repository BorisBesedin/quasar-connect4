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
      <TheIndexUserInfo @logout="logout" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import IndexLangChange from "src/components/IndexLangChange.vue";
import TheIndexUserInfo from "src/components/TheIndexUserInfo.vue";
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";

const leftDrawerOpen = ref(false);
const { logout, init } = useAuthStore();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

init();
</script>
