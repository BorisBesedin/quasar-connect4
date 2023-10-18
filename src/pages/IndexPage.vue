<template>
  <q-page class="flex flex-center">
    <div class="column">
      <q-btn
        v-for="item in menu"
        :key="item.id"
        class="q-ma-sm"
        size="xl"
        color="white"
        text-color="black"
        :label="$t(item.label)"
      />
    </div>
  </q-page>
</template>

<script setup>
const menu = [
  { id: 1, label: "IndexMenuBtn1", action: () => {} },
  { id: 2, label: "IndexMenuBtn2", action: () => {} },
  { id: 3, label: "IndexMenuBtn3", action: () => {} },
];
</script>
