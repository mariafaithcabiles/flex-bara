const levels = [
  {
    title: "Level 1",
    hint: "Use justify-content to move the capybara horizontally.",
    description: "",
    correct: "justify-content: center;",
    pondPos: { justify: "center", align: "center" }
  },
  {
    title: "Level 2",
    hint: "Left side alignment.",
    description: "",
    correct: "justify-content: flex-start;",
    pondPos: { justify: "flex-start", align: "center" }
  },
  {
    title: "Level 3",
    hint: "Right side alignment.",
    description: "",
    correct: "justify-content: flex-end;",
    pondPos: { justify: "flex-end", align: "center" }
  },
  {
    title: "Level 4",
    hint: "Move vertically using align-items.",
    description: "",
    correct: "align-items: flex-end;",
    pondPos: { justify: "center", align: "flex-end" }
  },
  {
    title: "Level 5",
    hint: "Center vertically.",
    description: "",
    correct: "align-items: center;",
    pondPos: { justify: "center", align: "center" }
  },
  {
    title: "Level 6",
    hint: "Align top-left.",
    description: "",
    correct: "justify-content: flex-start; align-items: flex-start;",
    pondPos: { justify: "flex-start", align: "flex-start" }
  },
  {
    title: "Level 7",
    hint: "Use space-around.",
    description: "",
    correct: "justify-content: space-around;",
    pondPos: { justify: "space-around", align: "center" }
  },
  {
    title: "Level 8",
    hint: "Move to bottom center.",
    description: "",
    correct: "align-items: flex-end;",
    pondPos: { justify: "center", align: "flex-end" }
  },
  {
    title: "Level 9",
    hint: "Use center both ways.",
    description: "",
    correct: "justify-content: center; align-items: center;",
    pondPos: { justify: "center", align: "center" }
  }
];

let currentLevel = 0;
let score = 0;

let levelCompleted = Array(levels.length).fill(false);


const capybara = document.getElementById("capybara");
const pond = document.getElementById("pond");
const arena = document.getElementById("arena");
const levelTitle = document.getElementById("levelTitle");
const hint = document.getElementById("hint");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("scoreDisplay");

const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");


function loadLevel() {
  const lvl = levels[currentLevel];
  levelTitle.innerHTML = lvl.title;
  hint.innerText = lvl.hint;


  document.getElementById("codeInput").value = "";
  feedback.innerText = "";


  capybara.style.transition = "none";
  capybara.style.transform = "translate(0px, 0px)";
  setTimeout(() => {
    capybara.style.transition = "all 0.8s ease";
  }, 50);


  arena.style.display = "flex";
  arena.style.justifyContent = lvl.pondPos.justify;
  arena.style.alignItems = lvl.pondPos.align;
}

loadLevel();


function moveCapybaraToPond() {
  const pondRect = pond.getBoundingClientRect();
  const arenaRect = arena.getBoundingClientRect();
  const capyRect = capybara.getBoundingClientRect();

  const x = pondRect.left - arenaRect.left;
  const y = pondRect.top - arenaRect.top;

  capybara.style.transform = `translate(${x}px, ${y}px)`;
}


submitBtn.addEventListener("click", () => {
  const code = document.getElementById("codeInput").value.trim();
  const lvl = levels[currentLevel];

  if (code === lvl.correct) {
    feedback.style.color = "green";
    feedback.innerText = "Correct!";

    moveCapybaraToPond();

    if (!levelCompleted[currentLevel]) {
      score++;
      levelCompleted[currentLevel] = true;
      scoreDisplay.innerText = `Score: ${score}`;
    }

  } else {
    feedback.style.color = "red";
    feedback.innerText = "Incorrect. Try again!";
  }
});


nextBtn.addEventListener("click", () => {
  if (currentLevel < levels.length - 1) {
    currentLevel++;
    loadLevel();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentLevel > 0) {
    currentLevel--;
    loadLevel();
  }
});

