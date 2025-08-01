// Seznam států (můžeš rozšířit)
const countries = [
  { name: "Francie", population: 67000000, flag: "fr" },
  { name: "Japonsko", population: 126000000, flag: "jp" },
  { name: "Brazílie", population: 213000000, flag: "br" },
  { name: "Německo", population: 83000000, flag: "de" },
  { name: "Kanada", population: 38000000, flag: "ca" },
  { name: "Indie", population: 1390000000, flag: "in" },
  { name: "Nigerie", population: 216000000, flag: "ng" },
  { name: "Rusko", population: 145000000, flag: "ru" },
  { name: "Mexiko", population: 126000000, flag: "mx" },
  { name: "USA", population: 331000000, flag: "us" },
  { name: "Keňa", population: 56000000, flag: "ke"},
  { name: "Čína", population: 1409000000, flag: "cn"},
  { name: "Česko", population: 10880000, flag: "cz"},
  { name: "Jižní Korea", population: 51750000, flag: "kr"},
  { name: "Slovensko", population: 5400000, flag: "sk"},
  { name: "Severní Korea", population: 26500000, flag: "kp"},
  { name: "Tanzánie", population: 68560000, flag: "tz"},
  { name: "Austrálie", population: 27200000, flag: "au"},
  { name: "Egypt", population: 116500000, flag: "eg"},
  { name: "Turecko", population: 85500000, flag: "tr"},
  { name: "UK", population: 69200000, flag: "gb"}
];

let left, right;
let score = 0;

function getRandomCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

function nextRound() {
  const leftCard = document.getElementById("leftCard");
  const rightCard = document.getElementById("rightCard");
  const leftOverlay = document.getElementById("leftOverlay");
  const rightOverlay = document.getElementById("rightOverlay");

  left = getRandomCountry();
  do {
    right = getRandomCountry();
  } while (left.name === right.name);

  leftCard.style.backgroundImage = `url('https://flagcdn.com/w320/${left.flag}.png')`;
  rightCard.style.backgroundImage = `url('https://flagcdn.com/w320/${right.flag}.png')`;

  leftOverlay.innerHTML = `
    <h2>${left.name}</h2>
    <p class="population">${left.population.toLocaleString()} obyvatel</p>
  `;

  rightOverlay.innerHTML = `
    <h2>${right.name}</h2>
    <p class="population">??? obyvatel</p>
  `;

  document.getElementById("result").textContent = "";
}
function guess(choice) {
  const result = document.getElementById("result");
  const scoreText = document.getElementById("scoreText");
  const rightOverlay = document.getElementById("rightOverlay");
  const higherBtn = document.getElementById("higherBtn");
  const lowerBtn = document.getElementById("lowerBtn");
  const restartBtn = document.getElementById("restartBtn");

  const isCorrect =
  right.population === left.population || // stejný počet = vždy správně
  (choice === "higher" && right.population > left.population) ||
  (choice === "lower" && right.population < left.population);

  animatePopulation(rightOverlay, right.name, right.population).then(() => {
    if (isCorrect) {
      score++;
      result.textContent = "Skvěle! 🎉";
      result.style.color = "lime";
      scoreText.textContent = `Skóre: ${score}`;
      setTimeout(nextRound, 1200);
    } else {
      result.textContent = `Konec hry! ${right.name} má ${right.population.toLocaleString()} obyvatel.`;
      result.style.color = "red";
      scoreText.textContent = `Konečné skóre: ${score}`;
      score = 0;

      // Disable buttons
      higherBtn.disabled = true;
      lowerBtn.disabled = true;

      // Show Restart button
      restartBtn.style.display = "inline-block";
    }
  });
}
document.getElementById("restartBtn").onclick = () => {
  document.getElementById("result").textContent = "";
  document.getElementById("scoreText").textContent = "Skóre: 0";
  document.getElementById("higherBtn").disabled = false;
  document.getElementById("lowerBtn").disabled = false;
  document.getElementById("restartBtn").style.display = "none";
  score = 0;
  nextRound();
};

function animatePopulation(container, countryName, finalNumber) {
  return new Promise((resolve) => {
    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentPopulation = Math.floor(progress * finalNumber);

      container.innerHTML = `
        <h2>${countryName}</h2>
        <p class="population">${currentPopulation.toLocaleString()} obyvatel</p>
      `;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(update);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("higherBtn").onclick = () => guess("higher");
  document.getElementById("lowerBtn").onclick = () => guess("lower");
  nextRound();
});

