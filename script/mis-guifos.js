const counterVisitor = document.getElementById("counter-visitor");
const changeTheme = document.getElementById("change-theme");
const logoGifos = document.getElementById("logo-gifos");
const dayBtn = document.getElementById("sd");
const nightBtn = document.getElementById("sn");
const dropdownList = document.getElementById("dropdown-list");
const linkGif = document.getElementById("linkGif");

window.onload = localTheme(), loadGif(), linkGif.setAttribute('style', 'display: none;');

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
  arrow.style.filter = "invert(100%)";
  window.localStorage.setItem("theme", "night");
}

function dayTheme(changeTheme) {
  logoGifos.src = "/images/gifOF_logo.png";
  changeTheme.classList.add("sailor-day");
  changeTheme.classList.remove("sailor-night");
  arrow.style.filter = "invert(0)";
  window.localStorage.setItem("theme", "light");
}


//DROPDOWN THEME
function visible(a, b) {
  a.style.maxHeight = "100%";
  b.style.visibility = "visible";
}

function hide(a, b) {
  a.style.maxHeight = "0";
  b.style.visibility = "hidden";
}


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

//UPLOAD GIFS CREATED
  function loadGif() {
    let itemsCreated = JSON.parse(localStorage.getItem("misGuifos")) || [];
  
    if (!JSON.parse(localStorage.getItem("misGuifos"))){
      let noGif = document.createElement('p');
      noGif.innerHTML = "`Aún no hay gifs creados`";
      noGif.style.width = 'auto';
      noGif.style.fontFamily = 'Chakra Petch';
      noGif.style.color = '#E6BBE2';
      noGif.style.fontSize = '30px';
      noGif.style.fontWeight = '700';
      noGif.style.marginTop = '40px';
      noGif.style.padding = '10px';
  
      collection.appendChild(noGif);
  
    } else{
      itemsCreated.forEach((e) => {
        fetch(
          `https://api.giphy.com/v1/gifs/${e}?api_key=sM6zCvKpKEYEwaAwAebDOvn0bblj6wUR`
        )
          .then((response) => {
            return response.json();
          })
          .then((item) => {
            linkGif.setAttribute("src", item.data.images.original.url);
    
            const gif = document.createElement("div");
            gif.classList.add("gif-container");
    
            const img = document.createElement("img");
            img.setAttribute("src", item.data.images.original.url);
    
            gif.appendChild(img);
            collection.appendChild(gif);
          }).catch((error) => {
            console.log(error);
          });
      });
    }
  }