const form = document.querySelector(".card");
const input = document.querySelector("input");
const button = document.querySelector("button");
const resultName = document.querySelector(".result");
const resultHex = document.querySelector(".hex");

//Main function 
function nameToColor(name) {
  const normalized = name
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();

  let hash = 0;

  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}


//button click
button.addEventListener("click", function () {
  const name = input.value.trim();

  if (name === "") {
    resultName.textContent = "اكتب اسم الأول 😅";
    resultName.style.color = "red";
    resultName.classList.add("error-shadow")
    copyIcon.classList.add("hidden");
    resultHex.textContent = "";
    return;
  }

  copyIcon.classList.remove("hidden");
  resultName.classList.remove("error-shadow");
  const color = nameToColor(name);

  // Show Name
  resultName.textContent = name;
  resultName.style.color = color;

  // Show hexa
  resultHex.textContent = color;

  // Simple Effect
  resultName.style.transition = "0.3s";
  resultName.style.transform = "scale(1.1)";
  setTimeout(() => {
    resultName.style.transform = "scale(1)";
  }, 200);
});

// Enter click 
input.addEventListener("keydown",(e) => {
  if(e.key === "Enter"){
    button.click();
  }
});


// copy icon
const copyIcon = document.querySelector(".copy-icon");

copyIcon.addEventListener("click", function () {
  const hexValue = resultHex.textContent;
  if (!hexValue) return;

  navigator.clipboard.writeText(hexValue);

  copyIcon.style.color = "#00ff88"; // فلاش أخضر بسيط

  setTimeout(() => {
    copyIcon.style.color = "";
  }, 800);
});

