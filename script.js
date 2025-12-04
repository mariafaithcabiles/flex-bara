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
const desc  = document.getElementById("description");
const feedback = document.getElementById("feedback");
const input = document.getElementById("codeInput");

// -------------------- helpers --------------------
function clearArena() {
  arena.innerHTML = "";
}

// create capybaras and ponds inside arena based on level data
function populateArena(data) {
  // create capybaras
  for (let j = 0; j < data.capyCount; j++) {
    const cap = document.createElement("img");
    cap.src = "cute-capybara-character-exotic-rodent-in-sunglasses-hand-drawn-illustration-vector-removebg-preview.png";
    cap.className = "capybara";
    cap.dataset.index = j;
    // ensure starting position is top-left
    cap.style.left = "0px";
    cap.style.top  = "0px";
    cap.style.transform = "translate(0,0)";
    arena.appendChild(cap);
  }

  // create ponds (use the exact order provided)
  data.pond.forEach((p) => {
    const pond = document.createElement("img");
    pond.src = "istockphoto-1249854606-612x612-removebg-preview.png";
    pond.className = "pond " + p;
    arena.appendChild(pond);
  });
}

// sanitize and normalize user CSS input into an array of "property:value" strings (lowercased)
function parseUserInput(raw) {
  if (!raw) return [];
  return raw
    .split(";")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean) // remove empty
    .map(s => s.replace(/\s*:\s*/,'::')) // temporarily mark colon to avoid extra spaces
    .map(s => s.replace(/\s+/g, " "))     // normalize spaces
    .map(s => s.replace(/::/,':'));       // restore colon
}

// simple checker: ensure every required token appears in the provided rules
function userMatchesAnswer(userRules, requiredRules) {
  return requiredRules.every(req => {
    // require exact substring match (normalized)
    return userRules.some(r => r === req);
  });
}

// -------------------- core functions --------------------
function loadLevel(i) {
  const data = levels[i];
  title.textContent = data.title;
  hint.textContent = data.hint;
  desc.innerHTML = data.description || "";
  feedback.textContent = "";
  input.value = "";

  // clear & populate
  clearArena();
  populateArena(data);

  // reset arena flexbox properties (so students start from same baseline)
  arena.style.display = "flex";
  arena.style.flexDirection = "row";
  arena.style.justifyContent = "flex-start";
  arena.style.alignItems = "flex-start";
}

function checkAnswer() {
  const userRaw = input.value || "";
  const userRules = parseUserInput(userRaw);
  const required = levels[level].answer;

  if (userMatchesAnswer(userRules, required)) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "lime";
    moveCapys();
  } else {
    feedback.textContent = "❌ Try again!";
    feedback.style.color = "red";
  }
}

function moveCapys() {
  // get visible capybaras and visible ponds
  const capys = Array.from(arena.querySelectorAll(".capybara"));
  const ponds = Array.from(arena.querySelectorAll(".pond"));

  if (capys.length === 0 || ponds.length === 0) {
    console.warn("No capybaras or ponds available to move.");
    return;
  }

  // wait one frame so layout settles (important if images just injected)
  requestAnimationFrame(() => {
    capys.forEach((capy, i) => {
      try {
        // choose pond index: if fewer ponds than capys, reuse last pond for extras
        const pondIndex = i < ponds.length ? i : (ponds.length - 1);
        const pond = ponds[pondIndex];
        if (!pond) {
          console.warn("Missing pond for capy index", i);
          return;
        }

        const arenaRect = arena.getBoundingClientRect();
        const capRect   = capy.getBoundingClientRect();
        const pondRect  = pond.getBoundingClientRect();

        // centers relative to arena
        const capCenterX  = (capRect.left - arenaRect.left) + capRect.width / 2;
        const capCenterY  = (capRect.top  - arenaRect.top)  + capRect.height / 2;
        const pondCenterX = (pondRect.left - arenaRect.left) + pondRect.width / 2;
        const pondCenterY = (pondRect.top  - arenaRect.top)  + pondRect.height / 2;

        const dx = Math.round(pondCenterX - capCenterX);
        const dy = Math.round(pondCenterY - capCenterY);

    
        capy.style.transition = "transform 0.9s ease-in-out";
        capy.style.transform = translate(${dx}px, ${dy}px);

        
        capy.addEventListener("transitionend", function onEnd() {
          capy.classList.add("arrived");
          setTimeout(() => capy.classList.remove("arrived"), 400);
          capy.style.transition = "none";
          capy.removeEventListener("transitionend", onEnd);
        }, { once: true });
      } catch (err) {
        console.error("Error moving capy:", err);
      }
    });
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

