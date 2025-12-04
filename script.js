const levels = [
  {
    title: "Level 1",
    pond: ["pos-right-center"],
    hint: "Move Flexbara to the right middle.",
    description: "Use <b>justify-content</b> to align horizontally. Use <b>align-items</b> to align vertically.",
    answer: ["justify-content:flex-end", "align-items:center"],
    capyCount: 1
  },
  {
    title: "Level 2",
    pond: ["pos-center"],
    hint: "Move Flexbara in the center.",
    description: "Use <b>justify-content:center</b> and <b>align-items:center</b>.",
    answer: ["justify-content:center", "align-items:center"],
    capyCount: 1
  },
  {
    title: "Level 3",
    pond: ["pos-bottom-right"],
    hint: "Move Flexbara to bottom-right.",
    description: "Use <b>justify-content:flex-end</b> and <b>align-items:flex-end</b>.",
    answer: ["justify-content:flex-end", "align-items:flex-end"],
    capyCount: 1
  },
  {
    title: "Level 4",
    pond: ["pos-top-center"],
    hint: "Move Flexbara to top-center.",
    description: "Use <b>justify-content:center</b> and <b>align-items:flex-start</b>.",
    answer: ["justify-content:center", "align-items:flex-start"],
    capyCount: 1
  },
  {
    title: "Level 5",
    pond: ["pos-bottom-left"],
    hint: "Move Flexbara to bottom-left.",
    description: "Use <b>justify-content:flex-start</b> and <b>align-items:flex-end</b>.",
    answer: ["justify-content:flex-start", "align-items:flex-end"],
    capyCount: 1
  },
  {
    title: "Level 6",
    pond: ["pos-left-center", "pos-right-center"],
    hint: "Two Flexbaras left and right.",
    description: "Use <b>justify-content:space-around</b> and <b>align-items:center</b>.",
    answer: ["justify-content:space-around", "align-items:center"],
    capyCount: 2
  },
  {
    title: "Level 7",
    pond: ["pos-left-center", "pos-center", "pos-right-center"],
    hint: "Three Flexbaras spaced.",
    description: "Use <b>justify-content:space-around</b> with <b>align-items:center</b>.",
    answer: ["justify-content:space-around", "align-items:center"],
    capyCount: 3
  },
  {
    title: "Level 8",
    pond: ["pos-top-center", "pos-bottom-center"],
    hint: "Two Flexbaras top to bottom.",
    description: "Use <b>flex-direction:column</b> and <b>justify-content:space-between</b>.",
    answer: ["flex-direction:column", "justify-content:space-between", "align-items:center"],
    capyCount: 2
  },
  {
    title: "Level 9",
    pond: ["pos-top-center", "pos-center", "pos-bottom-center"],
    hint: "Stack Flexbaras vertically.",
    description: "Use column layout with space-around.",
    answer: ["flex-direction:column", "justify-content:space-around", "align-items:center"],
    capyCount: 3
  },
  {
    title: "Level 10",
    pond: ["pos-top-center", "pos-center", "pos-bottom-center"],
    hint: "Space evenly vertically.",
    description: "Use <b>flex-direction:column</b> and <b>justify-content:space-between</b>.",
    answer: ["flex-direction:column", "justify-content:space-between", "align-items:center"],
    capyCount: 3
  }
];

let level = 0;

const arena = document.getElementById("arena");
const title = document.getElementById("levelTitle");
const hint = document.getElementById("hint");
const desc = document.getElementById("description");
const feedback = document.getElementById("feedback");
const input = document.getElementById("codeInput");

function loadLevel(i) {
  const data = levels[i];
  title.textContent = data.title;
  hint.textContent = data.hint;
  desc.innerHTML = data.description;
  feedback.textContent = "";
  input.value = "";

  arena.innerHTML = "";

  for (let j = 0; j < data.capyCount; j++) {
    let cap = document.createElement("img");
    cap.src = "cute-capybara-character-exotic-rodent-in-sunglasses-hand-drawn-illustration-vector-removebg-preview.png";
    cap.className = "capybara";
    cap.dataset.index = j;
    arena.appendChild(cap);
  }

  data.pond.forEach((p) => {
    let pond = document.createElement("img");
    pond.src = "istockphoto-1249854606-612x612-removebg-preview.png";
    pond.className = "pond " + p;
    arena.appendChild(pond);
  });

  arena.style.display = "flex";
  arena.style.flexDirection = "row";
  arena.style.justifyContent = "flex-start";
  arena.style.alignItems = "flex-start";
}

function checkAnswer() {
  const user = input.value.replace(/\s+/g, "").toLowerCase().split(";");
  const answer = levels[level].answer;

  let correct = true;
  for (let i = 0; i < answer.length; i++) {
    if (!user.includes(answer[i])) {
      correct = false;
      break;
    }
  }

  if (correct) {
    feedback.textContent = "✅ Correct!";
    moveCapys();
  } else {
    feedback.textContent = "❌ Try again!";
  }
}

function moveCapys() {
  const capys = arena.querySelectorAll(".capybara");
  const ponds = arena.querySelectorAll(".pond");

  capys.forEach((capy, i) => {
    const arenaRect = arena.getBoundingClientRect();
    const pondRect = ponds[i].getBoundingClientRect();
    const capRect = capy.getBoundingClientRect();

    const capX = capRect.left - arenaRect.left + capRect.width / 2;
    const capY = capRect.top - arenaRect.top + capRect.height / 2;

    const pondX = pondRect.left - arenaRect.left + pondRect.width / 2;
    const pondY = pondRect.top - arenaRect.top + pondRect.height / 2;

    const dx = pondX - capX;
    const dy = pondY - capY;

    capy.style.transition = "transform 0.9s ease-in-out";
    capy.style.transform = `translate(${dx}px, ${dy}px)`;

    capy.addEventListener("transitionend", () => {
      capy.classList.add("arrived");
      setTimeout(() => capy.classList.remove("arrived"), 400);
      capy.style.transition = "none";
      capy.style.transform = "none"; // IMPORTANT FIX
    }, { once: true });
  });
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);
document.getElementById("nextBtn").addEventListener("click", () => {
  if (level < levels.length - 1) {
    level++;
    loadLevel(level);
  }
});
document.getElementById("prevBtn").addEventListener("click", () => {
  if (level > 0) {
    level--;
    loadLevel(level);
  }
});

loadLevel(level);


