let quoteBtn = document.querySelector("button");
let quoteText = document.querySelector(".quote");
let quoteAuthor = document.querySelector(".author");
let speakBtn = document.querySelector(".speak");
let copyBtn = document.querySelector(".copy");
let copySuccess = document.querySelector(".copied");

function getQuote() {
  quoteBtn.innerHTML = "Loading...";
  quoteBtn.classList.add("loading");
  fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      "x-rapidapi-key": "af5184fac5msh392dfd022bd6e9fp12a5c8jsnfa7c5e247a68",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      quoteText.innerHTML = response.content;
      quoteAuthor.innerHTML = "--By " + response.originator.name;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerHTML = "New Quote";
    })
    .catch((err) => {
      console.error(err);
    });
}

quoteBtn.addEventListener("click", getQuote);

speakBtn.addEventListener("click", ()=> {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerHTML} ${quoteAuthor.innerHTML}`);
    speechSynthesis.speak(utterance);
})

copyBtn.addEventListener("click", ()=>{
  navigator.clipboard.writeText(quoteText.innerHTML)
  copySuccess.classList.add("copyActive")
  setTimeout(hideCopied, 5000)
})


function hideCopied(){
  copySuccess.classList.remove("copyActive")
}