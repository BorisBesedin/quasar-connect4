<template>
  <q-select
    v-model="selected"
    :options="locales"
    :label="$t('IndexLangChangeLabel')"
    :option-label="(l) => $t(l.title)"
    emit-value
    map-options
  />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";

const { locale } = useI18n({ useScope: "global" });

const locales = ref([
  { id: 1, title: "IndexLangChangeRu", value: "ru-RU" },
  { id: 2, title: "IndexLangChangeEn", value: "en-US" },
]);

const selected = useStorage("locale", "en-US");

watch(selected, (val) => {
  locale.value = val;
});

onMounted(() => {
  locale.value = selected.value;
});
</script>
