const btnSearch = document.querySelector(".btn-search");
const resultField = document.querySelector(".result");
const character = document.querySelector("#character");
const btnLoading = document.querySelector(".btn-loading");

function searchQuote() {
  const characterName = character.value;
  character.value = "";
  resultField.innerHTML = "";

  btnSearch.classList.toggle("d-none");
  btnLoading.classList.toggle("d-none");
  let result = "";
  fetch(`https://animechan.vercel.app/api/quotes/character?name=${characterName}`)
    .then((res) => res.json())
    .then((quotes) => {
      btnSearch.classList.toggle("d-none");
      btnLoading.classList.toggle("d-none");

      if (quotes.error) {
        return (resultField.innerHTML = `<h3 class="text-center">${quotes.error}</h3>`);
      }

      quotes.forEach((quote) => {
        result += ` <div class="row justify-content-center">
                <div class="col-md-8">
                <figure class="text-center">
                <blockquote class="blockquote">
                <p>
                ${quote.quote}
                </p>
                </blockquote>
                <figcaption class="blockquote-footer">${quote.character} in <cite title="Source Title">${quote.anime}</cite></figcaption>
                </figure>
                </div>
                </div>
                <hr>`;
      });

      resultField.innerHTML = result;
    });
}

btnSearch.addEventListener("click", function () {
  searchQuote();
});

character.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchQuote();
  }
});
