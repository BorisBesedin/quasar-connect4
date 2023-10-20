<template>
  <q-page class="connect4-game">
    <div class="connect4-game__info">
      <div class="connect4-game__player" :class="{ red: player1.isRed }">
        <img
          v-if="player1.avatar"
          :src="player1.avatar"
          :alt="player1.first_name"
        />
        <img v-else src="../assets/img/user.png" :alt="player1.first_name" />
        <p>{{ player1.first_name }}</p>
      </div>

      <TheGameStatus @exit="exit" :game="connect4" :user="user" />

      <div class="connect4-game__player" :class="{ red: player2.isRed }">
        <img
          v-if="player2.avatar"
          :src="player2.avatar"
          :alt="player2.first_name"
        />
        <img v-else src="../assets/img/user.png" :alt="player2.first_name" />
        <p>{{ player2.first_name }}</p>
      </div>
    </div>

    <div class="connect4-game__boby">
      <div class="connect4-game__board board" v-if="connect4">
        <div class="board__game">
          <div
            v-for="m in 7"
            :key="m"
            class="board__column"
            @click="
              connect4.currentPlayer.id === user.id
                ? connect4.dropItem(m - 1)
                : null
            "
          >
            <div
              :data-column="m - 1"
              v-for="n in 6"
              :key="n"
              class="board__circle"
              :class="{
                player1Color: connect4.board[m - 1][n - 1] === 1,
                player2Color: connect4.board[m - 1][n - 1] === 5,
                shine: isLastTurn(m, n),
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import useConnect4Game from "src/composables/useConnect4Game.js";
import TheGameStatus from "src/components/TheGameStatus.vue";

const props = defineProps({
  game: Object,
});

const user = ref({
  id: 1,
  name: "User",
});
const router = useRouter();

const connect4 = reactive(useConnect4Game(props.game));

const player1 = computed(() => connect4.players[0]);
const player2 = computed(() => connect4.players[1]);

const isLastTurn = (col, row) => {
  const bool =
    connect4.lastTurn?.col === col - 1 && connect4.lastTurn?.row === row - 1
      ? true
      : false;

  return bool;
};

const start = () => {
  connect4.start();
};

const exit = () => {
  router.push({ name: "IndexPage" });
};

start();
</script>
