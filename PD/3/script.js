let cells = document.querySelectorAll(".cell");

let currentOpenedBlocksIds = [];
let correctlyOpenedIds = [];

const generateBoard = () => {
  let imagesIds = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

  const shuffledImagesIds = imagesIds.sort((a, b) => 0.5 - Math.random());

  return shuffledImagesIds;
};

const setImages = (shuffledImagesIds) => {
  for (let i = 0; i < shuffledImagesIds.length; i++) {
    cells[i].classList.add(`image${shuffledImagesIds[i]}`);
  }
};

const hideBlocks = (correctCellIds = []) => {
  for (let i = 0; i < cells.length; i++) {
    if (!correctCellIds.includes(i)) cells[i].classList.add("hidden");
  }
};

const handleClick = (e) => {
  id = e.target.id.substring(4);

  if (currentOpenedBlocksIds.includes(id)) return;

  if (currentOpenedBlocksIds.length > 2) return;

  if (currentOpenedBlocksIds.length < 2) {
    cells[id].classList.remove("hidden");
    currentOpenedBlocksIds.push(id);
  }

  if (currentOpenedBlocksIds.length === 2) {
    if (
      shuffledImagesIds[currentOpenedBlocksIds[0]] ===
      shuffledImagesIds[currentOpenedBlocksIds[1]]
    ) {
      correctlyOpenedIds.push(parseFloat(currentOpenedBlocksIds[0]));
      correctlyOpenedIds.push(parseFloat(currentOpenedBlocksIds[1]));

      cells[currentOpenedBlocksIds[0]].classList.add("good");
      cells[currentOpenedBlocksIds[1]].classList.add("good");
    }

    setTimeout(() => {
      hideBlocks(correctlyOpenedIds);
      currentOpenedBlocksIds = [];
    }, 700);
  }
};

const shuffledImagesIds = generateBoard();

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

setImages(shuffledImagesIds);
hideBlocks();
generateBoard();
