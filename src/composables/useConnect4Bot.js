import randomInteger from "src/helpers/randomInteger";
import { computed, ref } from "vue";

const combos = [
  "00++",
  "++00",
  "+++0",
  "0+++",
  "0++0",
  "00+0",
  "0+00",
  "+0++",
  "++0+",
  "+0+0",
];

export default function useConnect4Bot(gameData) {
  const players = ref(gameData.players);
  const board = ref(gameData.board);

  const userLastTurn = computed(
    () => players.value.find((p) => !p.isBot).lastTurn
  );
  const botLastTurn = computed(
    () => players.value.find((p) => p.isBot).lastTurn
  );

  const checkVertical = (isUser) => {
    let variants = [];
    const b = [...board.value];
    const lastTurn = isUser ? userLastTurn.value : botLastTurn.value;
    b.forEach((col) => {
      const colString = col.join("").replaceAll(lastTurn.player, "+");
      if (colString.includes("0+++"))
        variants.push({ col: lastTurn.col, priority: isUser ? 9 : 10 });
      if (colString.includes("00++"))
        variants.push({ col: lastTurn.col, priority: isUser ? 8 : 9 });
      if (colString.includes("000+"))
        variants.push({ col: lastTurn.col, priority: 5 });
    });

    return variants;
  };

  const checkHorizontal = (isUser) => {
    let variants = [];
    const b = [...board.value];
    const lastTurn = isUser ? userLastTurn.value : botLastTurn.value;

    let rows = [];

    for (let row = 0; row < 6; row++) {
      rows.push(b.map((item) => item[row]));
    }

    rows.forEach((row, rowIndex) => {
      const rowString = row.join("").replaceAll(lastTurn.player, "+");

      combos.forEach((c) => {
        if (rowString.includes(c)) {
          let comboIndex = rowString.indexOf(c);
          switch (c) {
            case "+0++":
              if (rowIndex === 5 || b[comboIndex + 1][rowIndex + 1]) {
                variants.push({
                  col: comboIndex + 1,
                  priority: isUser ? 9 : 10,
                });
              }
              break;

            case "++0+":
              if (rowIndex === 5 || b[comboIndex + 2][rowIndex + 1]) {
                variants.push({
                  col: comboIndex + 2,
                  priority: isUser ? 9 : 10,
                });
              }
              break;

            case "+++0":
              if (rowIndex === 5 || b[comboIndex + 3][rowIndex + 1]) {
                variants.push({
                  col: comboIndex + 3,
                  priority: isUser ? 9 : 10,
                });
              }
              break;

            case "0+++":
              if (rowIndex === 5 || b[comboIndex][rowIndex + 1]) {
                variants.push({ col: comboIndex, priority: isUser ? 9 : 10 });
              }
              break;

            case "0++0":
              variants.push({ col: comboIndex, priority: isUser ? 7 : 8 });
              break;

            case "++00":
              if (rowIndex === 5 || b[comboIndex + 2][rowIndex + 1]) {
                variants.push({
                  col: comboIndex + 2,
                  priority: isUser ? 6 : 7,
                });
              }

              break;

            case "00++":
            case "+0+0":
              variants.push({ col: comboIndex + 1, priority: isUser ? 6 : 7 });
              break;
          }
        }
      });
    });

    return variants;
  };

  const checkDiagonal = (isUser) => {
    const b = [...board.value];
    const lastTurn = isUser ? userLastTurn.value : botLastTurn.value;
    let diagonals1 = [];
    let diagonals2 = [];
    let variants = [];

    for (let j = 5; j > 2; j--) {
      for (let i = 0; i < 4; i++) {
        let arr1 = [b[i][j], b[i + 1][j - 1], b[i + 2][j - 2], b[i + 3][j - 3]];
        let arr2 = [
          b[6 - i][j],
          b[5 - i][j - 1],
          b[4 - i][j - 2],
          b[3 - i][j - 3],
        ];

        diagonals1.push(arr1.join("").replaceAll(lastTurn.player, "+"));
        diagonals2.push(arr2.join("").replaceAll(lastTurn.player, "+"));
      }
    }

    diagonals1 = [
      diagonals1.slice(0, 4),
      diagonals1.slice(4, 8),
      diagonals1.slice(8, diagonals1.length),
    ];
    diagonals2 = [
      diagonals2.slice(0, 4),
      diagonals2.slice(4, 8),
      diagonals2.slice(8, diagonals2.length),
    ];

    diagonals1.forEach((group, groupIndex) => {
      group.forEach((diag, diagIndex) => {
        combos.forEach((c) => {
          if (diag.includes(c)) {
            switch (c) {
              case "+++0":
                if (b[diagIndex + 3][5 - groupIndex - 1]) {
                  variants.push({
                    col: diagIndex + 3,
                    priority: isUser ? 9 : 10,
                  });
                }
                break;

              case "0+++":
                if (b[diagIndex][5 - groupIndex - 1]) {
                  variants.push({ col: diagIndex, priority: isUser ? 9 : 10 });
                }
                break;

              case "++0+":
                if (b[diagIndex + 2][5 - groupIndex - 1]) {
                  variants.push({
                    col: diagIndex + 2,
                    priority: isUser ? 9 : 10,
                  });
                }
                break;
              case "+0++":
                if (b[diagIndex + 1][5 - groupIndex - 1]) {
                  variants.push({
                    col: diagIndex + 1,
                    priority: isUser ? 9 : 10,
                  });
                }
                break;
            }
          }
        });
      });
    });

    diagonals2.forEach((group, groupIndex) => {
      group.forEach((diag, diagIndex) => {
        combos.forEach((c) => {
          if (diag.includes(c)) {
            const colIndex = 6 - diagIndex;
            switch (c) {
              case "+++0":
                if (b[colIndex - 3][5 - groupIndex - 1]) {
                  variants.push({ col: colIndex - 3, priority: 9 });
                }
                break;

              case "0+++":
                if (b[diagIndex][5 - groupIndex - 1]) {
                  variants.push({ col: diagIndex, priority: isUser ? 9 : 10 });
                }
                break;

              case "++0+":
                if (b[colIndex - 2][5 - groupIndex - 1]) {
                  variants.push({ col: colIndex - 2, priority: 9 });
                }
                break;
              case "+0++":
                if (b[colIndex - 1][5 - groupIndex - 1]) {
                  variants.push({ col: colIndex - 1, priority: 9 });
                }
                break;
            }
          }
        });
      });
    });

    return variants;
  };

  const getAnotherCol = () => {
    const elems = document.querySelectorAll(
      ".board__circle:not(.player1Color):not(.player2Color)"
    );
    const index = randomInteger(0, elems.length - 1);
    const col = elems[index].getAttribute("data-column");
    return col;
  };

  const checkUserPosition = () => {
    return [
      ...checkVertical(true),
      ...checkHorizontal(true),
      ...checkDiagonal(true),
    ];
  };

  const checkBotPosition = () => {
    return [
      ...checkVertical(false),
      ...checkHorizontal(false),
      ...checkDiagonal(false),
    ];
  };

  const botTurn = () => {
    setTimeout(() => {
      let nextCol = 0;
      let variants = [];

      if (!userLastTurn.value) nextCol = 3;
      else {
        variants.push(...checkUserPosition());
        if (botLastTurn.value) variants.push(...checkBotPosition());

        // сортируем варианты по приоритету и фильтруем по наличию хода
        variants = variants
          .sort((a, b) => b.priority - a.priority)
          .filter((v) => board.value[v.col].some((c) => c === 0));
        if (variants.length) {
          nextCol = variants[0].col;
        } else {
          nextCol = getAnotherCol();
        }
      }

      gameData.dropItem(nextCol);
    }, 300);
  };

  return {
    botTurn,
  };
}
