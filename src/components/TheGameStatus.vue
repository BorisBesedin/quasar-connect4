<template>
  <div class="info">
    <div class="info__status">
      <div
        class="board__circle"
        :class="{
          player1Color: game.currentPlayer.isRed,
          player2Color: !game.currentPlayer.isRed,
        }"
      ></div>

      <p v-if="!game.isOver" class="info__message">
        <span :class="{ yellow: !game.currentPlayer.isRed }">
          {{ game.currentPlayer.first_name }}
        </span>
      </p>

      <p v-else-if="game.winner" class="info__message">
        <span :class="{ yellow: !game.currentPlayer.isRed }">
          {{ game.currentPlayer.first_name }}
        </span>
        {{ $t("GameStatusField1") }}
      </p>

      <p v-else class="info__message">{{ $t("GameStatusField2") }}</p>
    </div>

    <div class="info__buttons">
      <q-btn
        v-show="game.isOver"
        @click="game.start"
        color="white"
        text-color="black"
        :label="$t('GameStatusBtn1')"
      />

      <q-btn
        @click="$emit('exit')"
        color="primary"
        :label="$t('GameStatusBtn2')"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  game: Object,
  user: Object,
});
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info__message {
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
  margin-left: 0.5rem;
}

.info__status {
  display: flex;
  align-items: center;
}

.board__circle {
  width: 1.5rem;
  height: 1.5rem;
}

.info__buttons {
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;
}
</style>
