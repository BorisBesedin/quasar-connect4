import { ref, computed, watch } from "vue";
import randomInteger from "src/helpers/randomInteger";
import useConnect4Bot from "./useConnect4Bot";
import { useUserStore } from "src/stores/user";

const bots = [
  {
    id: Date.now() + 1,
    first_name: "Jack",
    avatar: "",
    isBot: true,
  },
  {
    id: Date.now() + 2,
    first_name: "John",
    avatar: "",
    isBot: true,
  },
  {
    id: Date.now() + 3,
    first_name: "Ivan",
    avatar: "",
    isBot: true,
  },
];

export default function useConnect4Game() {
  const { user, updateUser } = useUserStore();

  const player = ref({
    id: 1,
    first_name: user?.name || "User",
  });

  const players = ref([]);
  const board = ref([]);

  const isStarted = ref(false);
  const isRedTurn = ref(true);
  const isAnimating = ref(false);
  const isCurrentUser = computed(
    () => currentPlayer.value.id === player.value.id
  );

  const lastTurn = ref(null);
  const count = ref(0);
  const isOver = ref(false);
  const winner = ref(null);
  const bot = ref(null);

  const currentPlayer = computed(() => {
    return players.value.find((p) => p.isRed === isRedTurn.value);
  });

  const makeBoard = () => {
    let b = new Array(7);
    for (let i = 0; i < b.length; i++) {
      b[i] = [];
      for (let j = 0; j < 6; j++) {
        b[i].push(0);
      }
    }
    board.value = b;
  };

  const getPlayers = () => {
    const isRed = randomInteger(0, 1);

    const player1 = {
      id: player.value.id,
      first_name: player.value.first_name,
      isRed: isRed ? true : false,
      num: isRed ? 1 : 5,
      isBot: false,
      avatar: player.value.avatar,
    };

    const player2 = bots[randomInteger(0, bots.length - 1)];
    player2.isRed = !player1.isRed;
    player2.num = player2.isRed ? 1 : 5;

    players.value = [player1, player2];
  };

  const animateColumn = (column) => {
    isAnimating.value = true;
    const circles = document.querySelectorAll(
      `div[data-column="${column}"]:not(.player1Color):not(.player2Color)`
    );

    let index = 0;
    let delay = (20 * circles.length) / 1000;
    document
      .querySelector(".connect4-game")
      .style.setProperty("--delay", `${delay}s`);

    const interval = setInterval(() => {
      const colorSelector = isRedTurn.value
        ? "animation-yellow"
        : "animation-red";
      if (index > 0) {
        circles[index - 1].classList.remove(colorSelector);
      }
      if (index < circles.length - 1) {
        circles[index].classList.add(colorSelector);
        index++;
      } else {
        isAnimating.value = false;
        clearInterval(interval);
      }
    }, 20);
  };

  const dropItem = (column) => {
    let temp = [...board.value];
    if (!isOver.value && !isAnimating.value) {
      animateColumn(column);

      for (let i = temp[column].length - 1; i >= 0; i--) {
        if (temp[column][i] === 0) {
          temp[column][i] = currentPlayer.value.num;
          board.value = temp;
          count.value++;

          const turn = {
            player: currentPlayer.value.num,
            col: column,
            row: i,
          };

          currentPlayer.value.lastTurn = turn;
          lastTurn.value = turn;

          const hasWinner = checkWin();

          if (hasWinner) {
            isOver.value = true;
            winner.value = isRedTurn.value ? 1 : 2;

            updateUser(isCurrentUser.value);
          } else {
            if (count.value === 42) {
              isOver.value = true;
            }
            isRedTurn.value = !isRedTurn.value;
          }
          break;
        }
      }
      checkWin();
    }
  };

  const checkWin = () => {
    let b = board.value;
    let t;
    for (let i = 0; i < 4; i++) {
      for (let j = 5; j >= 0; j--) {
        t = b[i][j] + b[i + 1][j] + b[i + 2][j] + b[i + 3][j];
        if (t === 4 || t === 20) return true;
      }
    }
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 7; i++) {
        t = b[i][j] + b[i][j + 1] + b[i][j + 2] + b[i][j + 3];
        if (t === 4 || t === 20) return true;
      }
    }
    for (let j = 5; j > 1; j--) {
      for (let i = 0; i < 4; i++) {
        t = b[i][j] + b[i + 1][j - 1] + b[i + 2][j - 2] + b[i + 3][j - 3];
        if (t === 4 || t === 20) return true;
        t = b[6 - i][j] + b[5 - i][j - 1] + b[4 - i][j - 2] + b[3 - i][j - 3];
        if (t === 4 || t === 20) return true;
      }
    }
    return false;
  };

  const start = () => {
    isRedTurn.value = true;
    winner.value = null;
    count.value = 0;
    isOver.value = false;
    lastTurn.value = null;
    players.value = [];

    makeBoard();
    getPlayers();
    bot.value = useConnect4Bot({
      board: board.value,
      players: players.value,
      dropItem,
    });
    isStarted.value = true;
  };

  watch(
    currentPlayer,
    (val) => {
      if (val.isBot) bot.value.botTurn();
    },
    { deep: true }
  );

  watch(winner, (val) => {
    if (val) {
      const loserCircleClass = val === 1 ? "player2Color" : "player1Color";

      const circles = document.querySelectorAll(`.${loserCircleClass}`);
      circles.forEach((c) => c.classList.add("loser"));
    }
  });

  return {
    board,
    isStarted,
    isOver,
    winner,
    currentPlayer,
    players,
    lastTurn,
    dropItem,
    start,
    isCurrentUser,
  };
}
