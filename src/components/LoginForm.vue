<template>
  <div class="q-pa-md">
    <h3 class="text-subtitle1">{{ $t("LoginTitle") }}</h3>
    <q-form @submit="onSubmit" class="q-gutter-md">
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
        <q-btn :label="$t('LoginSubmit')" type="submit" color="primary" />
        <q-btn
          :label="$t('LoginReg')"
          type="button"
          color="primary"
          flat
          class="q-ml-sm"
          :to="{ name: 'RegistrationPage' }"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isPwd = ref(true);

const email = ref(null);
const password = ref(null);

const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(email);
};

const onSubmit = () => {};
</script>

<style lang="scss" scoped></style>
