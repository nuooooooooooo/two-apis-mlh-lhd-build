const body = document.querySelector("body");
const button = document.querySelector(".button");
const word = document.querySelector(".word");
const definition = document.querySelector(".definition");
import { info } from "./env.js";

const randomWord = () => {
  fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      word.textContent = "";
      word.textContent = response;

      randomDefinition(word);
    })
    .catch((err) => {
      console.log(err);
    });
};

const randomDefinition = (word) => {
  fetch(
    `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.textContent}?key=${info.key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response[0].shortdef !== undefined) {
        definition.textContent = "";
        let shortDef = firstLetterCapital(response[0].shortdef[0]);
        definition.textContent = shortDef;
      } else {
        definition.innerHTML = `Sorry, we couldn't find this term, but feel free to <a href='https://www.google.com/search?q=${word.textContent}'>Google</a> or <a href='https://duckduckgo.com/?q=${word.textContent}'>DuckDuckGo</a> it.`;
      }
    })
    .catch((err) => {
      definition.textContent = "No definition";
      console.log(err);
    });
};

button.addEventListener("click", function () {
  randomWord();
});

function firstLetterCapital(str) {
  let capitalizedString = String(str);
  return capitalizedString.charAt(0).toUpperCase() + capitalizedString.slice(1);
}
