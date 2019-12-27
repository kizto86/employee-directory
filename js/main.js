const gallery = document.getElementById("gallery");

const randomUser = "https://randomuser.me/api?results=12&nat=us";

fetch(randomUser)
  .then(response => response.json())
  .then(data => getData(data.results));

function getData(data) {
  displayRandUser(data);
  modalDisplay(data);
}

const displayRandUser = data => {
  data.forEach(user => {
    const html = `
  <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${
            user.picture.medium
          }" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${
      user.name.last
    }</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${
      user.location.state
    }</p>
      </div>
  </div>
  `;
    gallery.innerHTML += html;
  });
};

const modalDisplay = data => {
  let array = [data];

  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(e) {
      const DOB = data[i].dob.date;
      const birthday = DOB.substring(0, 10);

      let re = /-/g;
      const dobFormatted = re[Symbol.replace](birthday, " / ");

      const html = `
  <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn">
          <strong>X</strong>
        </button>
        <div class="modal-info-container">
          <img
            class="modal-img"
            src="${data[i].picture.large}"
            alt="profile picture"
          />
          <h3 id="name" class="modal-name cap">${data[i].name.first} ${
        data[i].name.last
      }</h3>
          <p class="modal-text"> ${data[i].email}</p>
          <p class="modal-text cap">${data[i].location.city}</p>
          <hr />
          <p class="modal-text">(555) 555-5555</p>
          <p class="modal-text">
          ${data[i].location.street.number}
          ${data[i].location.street.name}
          ${data[i].location.country}
          ${data[i].location.postcode}
          <p class="modal-text">Birthday: ${dobFormatted}</p>
        </div>
      </div>
    </div>
  
  `;
      let modalDiv = document.createElement("div");
      modalDiv.className = "modal-container";
      let body = document.querySelector("body");
      body.appendChild(modalDiv);

      modalDiv.innerHTML = html;

      closeButton = document.getElementById("modal-close-btn");
      closeButton.addEventListener("click", e => {
        body.removeChild(modalDiv);
      });
    });
  }
};

/**
 * CSS Styling
 */

$("body").css("background-color", "#008b8b");
$("header h1").css("color", "#ffffff");

/**
 * Search functionality
 */
const searchBar = document.getElementsByClassName("search-container")[0];

let inputValue = document.getElementById("search-input");

const searchSubmit = document.getElementById("search-submit");

inputValue.addEventListener("keyup", search);
searchSubmit.addEventListener("click", search);

const search = event => {
  const html = `
      <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>
    `;
};
