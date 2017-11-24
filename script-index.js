
document.addEventListener("DOMContentLoaded", function () {
  var currentLocation = window.location.pathname;
  if (currentLocation === "/" ||
      currentLocation === "/svn5/vefforritun/stort-verkefni-2/" ||
      currentLocation === "/svn5/vefforritun/stort-verkefni-2/index.html" ||
      currentLocation === "/ths220/vefforritun/stort-verkefni-2/" ||
      currentLocation === "/ths220/vefforritun/stort-verkefni-2/index.html") {
    var API_URL = "/videos.json";
    if (currentLocation === "/svn5/vefforritun/stort-verkefni-2/" ||
        currentLocation === "/svn5/vefforritun/stort-verkefni-2/index.html") {
      API_URL = "/svn5/vefforritun/stort-verkefni-2/videos.json";
    } else if (currentLocation === "/ths220/vefforritun/stort-verkefni-2/" ||
               currentLocation === "/ths220/vefforritun/stort-verkefni-2/index.html") {
      API_URL = "/ths220/vefforritun/stort-verkefni-2/videos.json";
    }
    writeHTML.fetchData(API_URL);
  }

  if (currentLocation === "/video.html") {
    const videoplayer = new Videoplayer();
    videoplayer.load();
  }
});

/**
* Forrit sem skrifar html síðu eftir .json skrá,
*/
var writeHTML = (function() {
  var allData;
  var main = document.querySelector("main");
  var row;

  // Nær í gögnin og kallar á write() til að skrifa html.
  function fetchData(API_URL) {
    var fetch = new XMLHttpRequest();

    showLoading();

    fetch.open("GET", API_URL, true);
    fetch.onload = function() {
      var data = JSON.parse(fetch.response);
      if (fetch.status >= 200 && fetch.status < 400) {
        allData = data;
        write();
      } else {
        showError("Villa kom upp: " + data.error);
      }
      window.setTimeout(stopLoading, 350);
    }
    fetch.send();
  }

  // Kallar á writeCategory() til að búa til flokk, og kallar á writeVideo()
  // fyrir hvert myndband sem á að vera inni í flokknum.
  function write() {
    var cLength = allData.categories.length;

    for (var i = 0; i < cLength; i++) {
      var vLength = allData.categories[i].videos.length;
      var categoryTitle = allData.categories[i].title;
      writeCategory(categoryTitle);
      for (var j = 0; j < vLength; j++) {
        var videoID = allData.categories[i].videos[j];
        writeVideo(videoID);
      }
    }
  }

  // Skrifar titil á videoflokk og bætir við línu fyrir neðan.
  function writeCategory(categoryTitle) {
    var section = document.createElement("section");
    var hr = document.createElement("hr");

    var h1 = document.createElement("h1");
    h1.setAttribute("class", "categoryTitle");
    h1.appendChild(document.createTextNode(categoryTitle));

    var div = document.createElement("div");
    div.setAttribute("class", "row");

    section.appendChild(h1);
    section.appendChild(div);
    main.appendChild(section);
    main.appendChild(hr);

    row = div;
  }

  // Bætir myndbandi við videoflokk.
  function writeVideo(videoID) {
    var title = allData.videos[videoID-1].title;
    var created = timeSince(allData.videos[videoID-1].created);
    var duration = secToDuration(allData.videos[videoID-1].duration);
    var poster = allData.videos[videoID-1].poster;
    var video = "video.html?id=" + videoID;

    var outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "videoListing col col-6 col-sm-12");

    var innerDiv1 = document.createElement("a");
    innerDiv1.setAttribute("href", video);
    innerDiv1.setAttribute("class", "thumbnail");

    var innerDiv2 = document.createElement("div");
    innerDiv2.setAttribute("class", "description");

    var x2InnerDiv1 = document.createElement("img");
    x2InnerDiv1.setAttribute("src", poster);
    x2InnerDiv1.setAttribute("class", "image");

    var x2InnerDiv2 = document.createElement("div");
    x2InnerDiv2.setAttribute("class", "videoTime");
    x2InnerDiv2.appendChild(document.createTextNode(duration));

    var x2InnerDiv3 = document.createElement("a");
    x2InnerDiv3.setAttribute("href", video);
    x2InnerDiv3.appendChild(document.createTextNode(title));

    var x2InnerDiv4 = document.createElement("p");
    x2InnerDiv4.appendChild(document.createTextNode(created));

    row.appendChild(outerDiv);
    outerDiv.appendChild(innerDiv1);
    outerDiv.appendChild(innerDiv2);
    innerDiv1.appendChild(x2InnerDiv1);
    innerDiv1.appendChild(x2InnerDiv2);
    innerDiv2.appendChild(x2InnerDiv3);
    innerDiv2.appendChild(x2InnerDiv4);
  }

  // Breytir int sekúndum í tíma á forminu 00:00.
  function secToDuration(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    var result = date.toISOString().substr(14, 5);
    return result;
  }

  // Breytir date í texta sem segir hversu langur tími hefur liðið.
  function timeSince(date) {
    var now = Date.now();
    var timePassed = now - date;
    var totalSecs = timePassed / 1000;

    var hours = Math.floor(totalSecs / 3600);
    var days = Math.floor(totalSecs / (60 * 60 * 24));
    var weeks = Math.floor(totalSecs / (60 * 60 * 24 * 7));
    var months = Math.floor(totalSecs / (60 * 60 * 24 * 30));
    var years = Math.floor(totalSecs / (60 * 60 * 24 * 365));

    if (years === 1) {
      return ("Fyrir " + years + " ári síðan");
    } else if (years > 1) {
      return ("Fyrir " + years + " árum síðan");
    } else if (months === 1) {
      return ("Fyrir " + months + " mánuði síðan");
    } else if (months > 1) {
      return ("Fyrir " + months + " mánuðum síðan");
    } else if (weeks === 1) {
      return ("Fyrir " + weeks + " viku síðan");
    } else if (weeks > 1) {
      return ("Fyrir " + weeks + " vikum síðan");
    } else if (days === 1) {
      return ("Fyrir " + days + " degi síðan");
    } else if (days > 1) {
      return ("Fyrir " + days + " dögum síðan");
    } else if (hours === 1) {
      return ("Fyrir " + hours + " klukkustund síðan");
    } else if (hours > 1) {
      return ("Fyrir " + hours + " klukkustundum síðan");
    } else {
      return ("Vantar upphlöðunardagsetningu");
    }
  }

  function showLoading() {
    var loading = document.createElement("div");
    loading.setAttribute("class", "loading");

    var img = document.createElement("img");
    img.setAttribute("src", "loading.gif");
    img.setAttribute("class", "gif");

    loading.appendChild(img);
    main.appendChild(loading);
  }

  function stopLoading() {
    var loading = document.querySelector(".loading");
    loading.remove();
  }

  function showError(error) {
    main.appendChild(element("p", error));
  }

  return {
    fetchData: fetchData
  }
})();
