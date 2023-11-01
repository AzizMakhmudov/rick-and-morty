const template = document.querySelector("template")
const cards = document.querySelector("[data-cards]")
const prevBtn = document.querySelector("[data-prev]")
const nextBtn = document.querySelector("[data-next]")
let page = 1;

function renderCards() {
  cards.innerHTML = "";
  
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://rickandmortyapi.com/api/character?page=${page}`);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = xhr.response;

      data.results.forEach((items) => {
          const elCard = template.content.cloneNode(true)
          elCard.querySelector("img").src = items.image
          elCard.querySelector("img").alt = items.name
          elCard.querySelector("h5").textContent = items.name
          elCard.querySelector("[data-status]").textContent = items.status
          elCard.querySelector("[data-species]").textContent = items.species
          elCard.querySelector("[data-gender]").textContent = items.gender
          cards.append(elCard)
      });
    }
    else {
      const errorMsg = `Error: ${xhr.statusText}`
      alert(errorMsg)
    }
  };
}

prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    renderCards();
  }
});

nextBtn.addEventListener("click", () => {
  page++;
  renderCards();
});

renderCards();