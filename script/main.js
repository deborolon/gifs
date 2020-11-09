const dropdown = document.getElementById("dropdown");
const dropdownList = document.getElementById("dropdown-list");
const searchbarInput = document.getElementById("searchbar-input");
const searchbarDropdown = document.getElementById("searchbar-dropdown");
const searchbarList = document.getElementById("searchbar-list");
const searchbarBtn = document.getElementById("searchbar-btn");
const loupeImg = document.getElementById("loupeImg");
const dayBtn = document.getElementById("sd");
const nightBtn = document.getElementById("sn");
const changeTheme = document.getElementById("change-theme");
const logoGifos = document.getElementById("logoGifos");
const trends = document.getElementById("trends");
const suggestions = document.getElementById("suggestions");
const autocomplete = document.getElementById("autocomplete");
const autocomplete1 = document.getElementById("autocomplete1");
const autocomplete2 = document.getElementById("autocomplete2");
const arrow = document.getElementById("arrow");
const itemList = document.getElementsByClassName("li-item");
const trendsTitle = document.getElementById("trends-title");
const suggestionsTitle = document.getElementById("suggestions-title");
const errorMsj = document.getElementById("none");
const result1 = document.getElementById("btn-result-1");
const result2 = document.getElementById("btn-result-2");
const result3 = document.getElementById("btn-result-3");
const anyResult = document.getElementsByClassName("btn-result");
const btnResults = document.getElementById("search-result");
const counterVisitor = document.getElementById("counter-visitor");

(window.onload = getTrends()), getSuggestions(), loupeAnimation(), localTheme();

//EVENTS
nightBtn.addEventListener("click", () => {
  nightTheme(changeTheme);
});

dayBtn.addEventListener("click", () => {
  dayTheme(changeTheme);
});

dropdown.addEventListener("mouseover", () => {
  visible(dropdown, dropdownList);
});

dropdown.addEventListener("mouseout", () => {
  hide(dropdown, dropdownList);
});

searchbarList.addEventListener("click", () => {
  checkValues();
  hide(searchbarDropdown, searchbarList);
});

searchbarBtn.addEventListener("click", () => {
  checkValues();
  searchbarAnimation(searchbarBtn);
  hide(searchbarDropdown, searchbarList);
});

searchbarInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    checkValues();
    hide(searchbarDropdown, searchbarList);
    hideAnimation(searchbarBtn);
  }
});

searchbarDropdown.addEventListener("mouseleave", () => {
  hide(searchbarDropdown, searchbarList);
  hideAnimation(searchbarBtn);
});

searchbarInput.addEventListener("input", () => {
  visible(searchbarDropdown, searchbarList);
  searchbarAnimation(searchbarBtn);
  getAutocomplete();
});

searchbarBtn.addEventListener("mouseleave", () => {
  hideAnimation(searchbarBtn);
});

//VISIT COUNTER
let n = localStorage.getItem("counter");

if (n === null) {
  n = 0;
}
n++;
localStorage.setItem("counter", n);
counterVisitor.innerHTML = n;

//THEME
function localTheme() {
  let getTheme = localStorage.getItem("theme");
  if (getTheme === "night") {
    nightTheme(changeTheme);
  } else if (getTheme === "light") {
    dayTheme(changeTheme);
  } else {
    dayTheme(changeTheme);
  }
}

function nightTheme(changeTheme) {
  logoGifos.src = "/images/gifOF_logo_dark.png";
  changeTheme.classList.add("sailor-night");
  changeTheme.classList.remove("sailor-day");
  loupeAnimation(changeTheme);
  arrow.style.filter = "invert(100%)";
  window.localStorage.setItem("theme", "night");
}

function dayTheme(changeTheme) {
  logoGifos.src = "/images/gifOF_logo.png";
  changeTheme.classList.add("sailor-day");
  changeTheme.classList.remove("sailor-night");
  loupeAnimation(changeTheme);
  arrow.style.filter = "invert(0)";
  window.localStorage.setItem("theme", "light");
}

//DROPDOWN
function visible(a, b) {
  a.style.maxHeight = "100%";
  b.style.visibility = "visible";
}

function hide(a, b) {
  a.style.maxHeight = "0";
  b.style.visibility = "hidden";
}

//ANIMATION
function loupeAnimation() {
  if (changeTheme.classList.contains("sailor-night") === true) {
    loupeImg.src = "/images/Combined Shape.svg";

    searchbarBtn.addEventListener("mousedown", () => {
      loupeImg.src = "/images/lupa_light.svg";
    });
    searchbarBtn.addEventListener("mouseleave", () => {
      loupeImg.src = "/images/Combined Shape.svg";
    });
    searchbarInput.addEventListener("keydown", () => {
      loupeImg.src = "/images/lupa_light.svg";
    });
    searchbarDropdown.addEventListener("mouseleave", () => {
      loupeImg.src = "/images/Combined Shape.svg";
    });
  } else {
    loupeImg.src = "/images/lupa_inactive.svg";

    searchbarBtn.addEventListener("mousedown", () => {
      loupeImg.src = "/images/lupa.svg";
    });
    searchbarBtn.addEventListener("mouseleave", () => {
      loupeImg.src = "/images/lupa_inactive.svg";
    });
    searchbarInput.addEventListener("keydown", () => {
      loupeImg.src = "/images/lupa.svg";
    });
    searchbarDropdown.addEventListener("mouseleave", () => {
      loupeImg.src = "/images/lupa_inactive.svg";
    });
  }
}

//INPUT AND SEARCH
function searchbarAnimation(searchbarBtn) {
  searchbarBtn.classList.add("searchbar-btn-active");
  searchbarBtn.classList.remove("searchbar-btn");
}

function hideAnimation(searchbarBtn) {
  searchbarBtn.classList.add("searchbar-btn");
  searchbarBtn.classList.remove("searchbar-btn-active");
}

//SUGGESTIONS
async function getSuggestions() {
  const randomPath = `https://api.giphy.com/v1/gifs/random?api_key=sM6zCvKpKEYEwaAwAebDOvn0bblj6wUR&tag=popular&rating=g`;

  try {
    for (i = 0; i < 4; i++) {
      const info = await fetch(randomPath).then((Response) => Response.json());

      const gif = document.createElement("div");
      gif.classList.add("suggestions-container");

      const img = document.createElement("img");
      img.setAttribute("src", info.data.images.original.url);
      img.classList.add("imgGif");

      const hashtag = document.createElement("div");
      hashtag.classList.add("hashtag-s");

      const closeImg = document.createElement("img");
      closeImg.setAttribute("src", "/images/close.svg");
      closeImg.classList.add("closeImg");
      closeImg.addEventListener("click", () => {
        gif.setAttribute("style", "display: none;");
      });

      const btn = document.createElement("button");
      btn.classList.add("btn-more");
      btn.addEventListener("click", () => {
        searchbarInput.value = "popular";
        getSearch();
        trendsTitle.innerHTML = "Más aquí:";
        trendsTitle.scrollIntoView();
      });

      const titleArr = info.data.slug.split(/[\d+\W+]/, 1);
      const getTitle = document.createElement("p");
      titleArr.forEach((h) => {
        if (h == "") {
          let title = document.createElement("p");
          title.innerHTML = "#AnimatedGif" + " ";
          getTitle.appendChild(title);
        } else {
          let title = document.createElement("p");
          title.innerHTML = "#" + h.charAt(0).toUpperCase() + h.slice(1);
          getTitle.appendChild(title);
        }
      });

      hashtag.appendChild(closeImg);
      hashtag.appendChild(getTitle);
      gif.appendChild(btn);
      gif.appendChild(hashtag);
      gif.appendChild(img);
      suggestions.appendChild(gif);
    }
  } catch (error) {
    console.log(error.message);
  }
}

//TRENDS
async function getTrends() {
  const trendsPath = `https://api.giphy.com/v1/gifs/trending?api_key=sM6zCvKpKEYEwaAwAebDOvn0bblj6wUR&limit=17&rating=g`;

  try {
    const info = await fetch(trendsPath).then((Response) => Response.json());

    info.data.forEach((e) => {
      const gif = document.createElement("div");
      gif.classList.add("gif-container");

      const img = document.createElement("img");
      img.setAttribute("src", e.images.original.url);

      const hashtagDiv = document.createElement("div");
      hashtagDiv.classList.add("hashtag");

      //Tags relacionados por gif
      let hashtagsArr = e.slug.toLowerCase().split(/[\d+\W+]/, 16);
      const getTitle = document.createElement("p");
      hashtagsArr.forEach((h) => {
        if (h == "") {
          let tag = document.createElement("a");
          tag.innerHTML = "#trending" + " ";
          getTitle.appendChild(tag);
          tag.onclick = function () {
            searchbarInput.value = "trending";
            getSearch();
            trendsTitle.scrollIntoView();
          };
        } else {
          let tag = document.createElement("a");
          tag.innerHTML = "#" + h + " ";
          tag.onclick = function () {
            searchbarInput.value = h;
            getSearch();
            trendsTitle.innerHTML =
              "Resultados de búsqueda para: " +
              h.charAt(0).toUpperCase() +
              h.slice(1);
            trendsTitle.scrollIntoView();
          };
          getTitle.appendChild(tag);
        }
      });

      hashtagDiv.appendChild(getTitle);
      gif.appendChild(hashtagDiv);
      gif.appendChild(img);
      trends.appendChild(gif);
    });
  } catch (error) {
    console.log(error.message);
  }
}

//SEARCH
async function getSearch() {
  try {
    let inputValue = document.getElementById("searchbar-input").value;
    const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=sM6zCvKpKEYEwaAwAebDOvn0bblj6wUR&q=${inputValue}&limit=17&offset=0&rating=g`;

    const info = await fetch(searchPath).then((response) => {
      response.json().then((data) => {
        trends.innerHTML = "";

        data.data.forEach((e) => {
          const gif = document.createElement("div");
          gif.classList.add("gif-container");

          const img = document.createElement("img");
          img.setAttribute("src", e.images.original.url);

          const hashtagDiv = document.createElement("div");
          hashtagDiv.classList.add("hashtag");

          //Tags relacionados por gif
          let hashtagsArr = e.slug.toLowerCase().split(/[\d+\W+]/, 16);
          const getTitle = document.createElement("p");

          hashtagsArr.forEach((h) => {
            if (h == "") {
              let tag = document.createElement("a");
              tag.innerHTML = "#trending" + " ";
              getTitle.appendChild(tag);
              tag.onclick = function () {
                searchbarInput.value = "trending";
                getSearch();
                trendsTitle.innerHTML =
                  "Resultados de búsqueda para: " + "Trending";
                trendsTitle.scrollIntoView();
              };
            } else {
              let tag = document.createElement("a");
              tag.innerHTML = "#" + h + " ";
              tag.onclick = function () {
                searchbarInput.value = h;
                getSearch();
                trendsTitle.innerHTML =
                  "Resultados de búsqueda para: " +
                  h.charAt(0).toUpperCase() +
                  h.slice(1);
                trendsTitle.scrollIntoView();
              };
              getTitle.appendChild(tag);
            }
          });

          hashtagDiv.appendChild(getTitle);
          gif.appendChild(hashtagDiv);

          gif.appendChild(img);
          trends.appendChild(gif);
        });
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

//CHECK INPUT VALUES
function checkValues() {
  let inputValue = document.getElementById("searchbar-input").value;
  let regex = /[\s+\W+]/g;
  if (inputValue.match(regex) || inputValue === "") {
    counterVisitor.scrollIntoView();
  } else {
    getSearch();
    btnResults.setAttribute("style", "display: flex");
    trendsTitle.scrollIntoView();
    trendsTitle.innerHTML =
      "Resultados de búsqueda para: " +
      inputValue.charAt(0).toUpperCase() +
      inputValue.slice(1);
  }
}

//AUTOCOMPLETE
async function getAutocomplete() {
  let inputValue = document.getElementById("searchbar-input").value;

  try {
    const autocompleteSearch = `https://api.giphy.com/v1/gifs/search/tags?api_key=sM6zCvKpKEYEwaAwAebDOvn0bblj6wUR&q=${inputValue}`;
    const info = await fetch(autocompleteSearch).then((Response) =>
      Response.json()
    );

    autocomplete.innerHTML =
      info.data[0].name.charAt(0).toUpperCase() + info.data[0].name.slice(1);
    autocomplete1.innerHTML =
      info.data[1].name.charAt(0).toUpperCase() + info.data[1].name.slice(1);
    autocomplete2.innerHTML =
      info.data[2].name.charAt(0).toUpperCase() + info.data[2].name.slice(1);

    autocomplete.addEventListener("click", () => {
      searchbarInput.value =
        info.data[0].name.charAt(0).toUpperCase() + info.data[0].name.slice(1);
      getSearch();
    });
    autocomplete1.addEventListener("click", () => {
      searchbarInput.value =
        info.data[1].name.charAt(0).toUpperCase() + info.data[1].name.slice(1);
      getSearch();
    });
    autocomplete2.addEventListener("click", () => {
      searchbarInput.value =
        info.data[2].name.charAt(0).toUpperCase() + info.data[2].name.slice(1);
      getSearch();
    });

    result1.innerHTML = "#" + info.data[0].name;
    result2.innerHTML = "#" + info.data[1].name;
    result3.innerHTML = "#" + info.data[2].name;

    result1.addEventListener("click", () => {
      searchbarInput.value = info.data[0].name;
      getSearch();
      trendsTitle.innerHTML =
        "Resultados de búsqueda para: " +
        info.data[0].name.charAt(0).toUpperCase() +
        info.data[0].name.slice(1);
      trendsTitle.scrollIntoView();
    });

    result2.addEventListener("click", () => {
      searchbarInput.value = info.data[1].name;
      getSearch();
      trendsTitle.innerHTML =
        "Resultados de búsqueda para: " +
        info.data[1].name.charAt(0).toUpperCase() +
        info.data[1].name.slice(1);
      trendsTitle.scrollIntoView();
    });

    result3.addEventListener("click", () => {
      searchbarInput.value = info.data[2].name;
      getSearch();
      trendsTitle.innerHTML =
        "Resultados de búsqueda para: " +
        info.data[2].name.charAt(0).toUpperCase() +
        info.data[2].name.slice(1);
      trendsTitle.scrollIntoView();
    });
  } catch (error) {
    console.log(error);
  }
}
