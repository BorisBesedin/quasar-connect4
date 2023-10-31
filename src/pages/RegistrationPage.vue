<template>
  <q-page class="flex column flex-center">
    <h3 class="text-subtitle1">{{ $t("RegTitle") }}</h3>
    <q-form @submit="onSubmit" class="q-gutter-md form">
      <q-input
        v-model="name"
        filled
        type="text"
        :hint="$t('RegName')"
        lazy-rules
        :rules="[(val) => !!val || $t('RegNameWarn')]"
      />

      <q-input
        v-model="email"
        filled
        type="email"
        :hint="$t('LoginEmail')"
        lazy-rules
        :rules="[(val) => isValidEmail(val) || $t('LoginEmailWarn')]"
      />

      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        :hint="$t('LoginPass')"
        :rules="[(val) => !!val || $t('LoginPassWarn')]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn :label="$t('RegSubmit')" type="submit" color="primary" />
        <q-btn
          :label="$t('RegBack')"
          type="button"
          color="primary"
          flat
          class="q-ml-sm"
          :to="{ name: 'IndexPage' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

const isPwd = ref(true);

const name = ref(null);
const email = ref(null);
const password = ref(null);

const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(email);
};

const onSubmit = async () => {
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  await store.register(data);
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 400px;
}
</style>
