//VARIABLES
const apiKey = `sM6zCvKpKEYEwaAwAebDOvn0bblj6wUR`;
const dropdown = document.getElementById("dropdown");
const dropdownList = document.getElementById("dropdown-list");
const dayBtn = document.getElementById("sd");
const nightBtn = document.getElementById("sn");
const changeTheme = document.getElementById("change-theme");
const logoGifos = document.getElementById("logo-gifos");
const arrow = document.getElementById("arrow");
const counterVisitor = document.getElementById("counter-visitor");
const cameraImg = document.getElementById("camera-img");
const clock = document.getElementById("clock");
const closeBtn = document.getElementById("close");
const closeBtn2 = document.getElementById("close1");
const startRecording = document.getElementById("btn-start");
const outerContainer = document.getElementById("outer-container");
const captureGif = document.getElementById("capture-gif");
const progressbarContainer = document.getElementById("progressbar-container");
const cameraBtn = document.getElementById("camera");
const captureBtn = document.getElementById("capture");
const recording = document.getElementById("recording");
const listo = document.getElementById("listo");
const forward = document.getElementById("forward");
const progressbar = document.getElementById("progressbar-btn");
const repeat = document.getElementById("repeat");
const upload = document.getElementById("upload");
const cancel = document.getElementById("cancel");
const gifDone = document.getElementById("gif-done");
const btnCancel = document.getElementById("btn-cancel");
const finished = document.getElementById("finished");
const video = document.getElementById("video");
const preview = document.getElementById("preview");
const linkGif = document.getElementById("linkGif");
const copy = document.getElementById("copy");
const download = document.getElementById("download");
const guifoFinishPreview = document.getElementById("guifo");
const titleBanner = document.getElementById("titleBanner");
const collection = document.getElementById("collection");

(window.onload = localTheme()), loadGif();

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

btnCancel.addEventListener("click", () => {
  location.href = "/index.html";
});

closeBtn.addEventListener("click", () => {
  location.href = "/index.html";
});

closeBtn2.addEventListener("click", () => {
  location.href = "/index.html";
});

cancel.addEventListener("click", () => {
  location.href = "/index.html";
});

finished.addEventListener("click", () => {
  location.href = "/pages/guifos.html";
});

startRecording.addEventListener("click", () => {
  outerContainer.setAttribute("style", "display: none;");
  captureGif.setAttribute("style", "display: flex;");
  captureBtn.setAttribute("style", "display: block;");
  cameraBtn.setAttribute("style", "display: block;");
  getAccess();
});

captureBtn.addEventListener("click", () => {
  timer();
  cameraBtn.setAttribute("style", "display: none;");
  captureBtn.setAttribute("style", "display: none;");
  clock.setAttribute("style", "display: block;");
  recording.setAttribute("style", "display: block;");
  listo.setAttribute("style", "display: block;");
  record();
  titleBanner.innerHTML = "Capturando Tu Guifo";
});

listo.addEventListener("click", () => {
  clearTimeout(chronometer);
  recording.setAttribute("style", "display: none;");
  listo.setAttribute("style", "display: none;");
  forward.setAttribute("style", "display: block;");
  progressbar.setAttribute("style", "display: flex;");
  repeat.setAttribute("style", "display: block;");
  upload.setAttribute("style", "display: block;");
  stopRecord(recorder);
  video.style.display = "none";
  preview.style.display = "block";
  titleBanner.innerHTML = "Vista Previa";
});

repeat.addEventListener("click", () => {
  s = 0;
  m = 0;
  h = 0;
  preview.setAttribute("style", "display: none;");
  video.setAttribute("style", "display: block;");
  clock.setAttribute("style", "display: none;");
  forward.setAttribute("style", "display: none;");
  progressbar.setAttribute("style", "display: none;");
  repeat.setAttribute("style", "display: none;");
  upload.setAttribute("style", "display: none;");
  outerContainer.setAttribute("style", "display: none;");
  captureGif.setAttribute("style", "display: flex;");
  captureBtn.setAttribute("style", "display: block;");
  cameraBtn.setAttribute("style", "display: block;");
  record();
});

upload.addEventListener("click", () => {
  video.setAttribute("style", "display: none;");
  preview.setAttribute("style", "display: none;");
  clock.setAttribute("style", "display: none;");
  forward.setAttribute("style", "display: none;");
  progressbar.setAttribute("style", "display: none;");
  repeat.setAttribute("style", "display: none;");
  upload.setAttribute("style", "display: none;");
  cancel.setAttribute("style", "display: block;");
  progressbarContainer.setAttribute("style", "display: flex;");
  titleBanner.innerHTML = "Subiendo Guifo";
  uploadToApi(blob);
  hideUpload();
});

download.addEventListener("click", () => {
  downLoadGif(blob);
});

copy.addEventListener("click", () => {
  let someInput = document.createElement("input");
  someInput.setAttribute("value", linkGif.src);
  document.body.appendChild(someInput);
  someInput.select();
  document.execCommand("copy");
  document.body.removeChild(someInput);
});

//TIMER
let s = 0;
let m = 0;
let h = 0;
let chronometer;

function add() {
  s++;
  if (s >= 60) {
    s = 0;
    m++;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }
  clock.innerHTML =
    (h ? (h > 9 ? h : "0" + h) : "00") +
    ":" +
    (m ? (m > 9 ? m : "0" + m) : "00") +
    ":" +
    (s > 9 ? s : "0" + s);
  timer();
}

function timer() {
  chronometer = setTimeout(add, 1000);
}

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
  cameraImg.src = "/images/camera_light.svg";
}

function dayTheme(changeTheme) {
  logoGifos.src = "/images/gifOF_logo.png";
  changeTheme.classList.add("sailor-day");
  changeTheme.classList.remove("sailor-night");
  arrow.style.filter = "invert(0)";
  window.localStorage.setItem("theme", "light");
  cameraImg.src = "/images/camera.svg";
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

//HAVE ACCESS TO CAMERA
let recorder;

const config = {
  audio: false,
  video: { height: { max: 480 }, facingMode: "user" },
};
const getMedia = () => navigator.mediaDevices.getUserMedia(config);

const videoRecording = (stream) => {
  video.srcObject = stream;
  video.play();
};

const getAccess = () => {
  getMedia()
    .then((stream) => {
      videoRecording(stream);
    })
    .catch((error) => alert("No se obtuvo acceso a la cámara" + error));
};

//RECORDING GIF
const record = () => {
  getMedia().then((stream) => {
    recorder = RecordRTC(stream, {
      type: "gif",
    });
    recorder.startRecording();
  });
};

//STOP RECORDING AND VIDEO PREVIEW
const videoPreview = (blob, id) => {
  let prev = URL.createObjectURL(blob);
  id.src = prev;
};

const stopRecord = (recorder) => {
  recorder.stopRecording(() => {
    blob = recorder.getBlob();
  });
  videoPreview(blob, preview);
};

//UPLOAD GIF
const uploadToApi = (blob) => {
  const formData = new FormData();
  formData.append("file", blob, "miGuifo.gif");

  const config = { method: "POST", body: formData, json: true };

  fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, config)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      saveGif(res.data.id);
      loadGif();
      videoPreview(blob, guifo);
    })
    .catch((error) => {
      console.error(error);
    });
};

//HIDE LOADING SCREEN
const hideUpload = () => {
  setInterval(hide, 20000);
  function hide() {
    captureGif.setAttribute("style", "display: none;");
    gifDone.setAttribute("style", "display: flex;");
  }
};

//SAVE GIF TO LOCALSTORAGE
function saveGif(item) {
  let itemsCreated = JSON.parse(localStorage.getItem("misGuifos")) || [];
  itemsCreated.push(item);
  localStorage.setItem("misGuifos", JSON.stringify(itemsCreated));
}

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
    noGif.style.margin = 'auto';
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

//DOWNLOAD GIF
const downLoadGif = (blob) => {
  invokeSaveAsDialog(blob, "miGuifo");
};
