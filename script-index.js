/**
* Forrit sem skrifar html síðu eftir .json skrá,
*/
const writeHTML = (function writeHTML() {
  let allData;
  const main = document.querySelector('main');
  let row;

  // Skrifar titil á videoflokk og bætir við línu fyrir neðan.
  function writeCategory(categoryTitle) {
    const section = document.createElement('section');
    const hr = document.createElement('hr');

    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'categoryTitle');
    h1.appendChild(document.createTextNode(categoryTitle));

    const div = document.createElement('div');
    div.setAttribute('class', 'row');

    section.appendChild(h1);
    section.appendChild(div);
    main.appendChild(section);
    main.appendChild(hr);

    row = div;
  }

  // Breytir int sekúndum í tíma á forminu 00:00.
  function secToDuration(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    const result = date.toISOString().substr(14, 5);
    return result;
  }

  // Breytir date í texta sem segir hversu langur tími hefur liðið.
  function timeSince(date) {
    const now = Date.now();
    const timePassed = now - date;
    const totalSecs = timePassed / 1000;

    const hours = Math.floor(totalSecs / 3600);
    const days = Math.floor(totalSecs / (60 * 60 * 24));
    const weeks = Math.floor(totalSecs / (60 * 60 * 24 * 7));
    const months = Math.floor(totalSecs / (60 * 60 * 24 * 30));
    const years = Math.floor(totalSecs / (60 * 60 * 24 * 365));

    if (years === 1) {
      return (`Fyrir ${years} ári síðan`);
    } else if (years > 1) {
      return (`Fyrir ${years} árum síðan`);
    } else if (months === 1) {
      return (`Fyrir ${months} mánuði síðan`);
    } else if (months > 1) {
      return (`Fyrir ${months} mánuðum síðan`);
    } else if (weeks === 1) {
      return (`Fyrir ${weeks} viku síðan`);
    } else if (weeks > 1) {
      return (`Fyrir ${weeks} vikum síðan`);
    } else if (days === 1) {
      return (`Fyrir ${days} degi síðan`);
    } else if (days > 1) {
      return (`Fyrir ${days} dögum síðan`);
    } else if (hours === 1) {
      return (`Fyrir ${hours} klukkustund síðan`);
    } else if (hours > 1) {
      return (`Fyrir ${hours} klukkustundum síðan`);
    }
    return ('Vantar upphlöðunardagsetningu');
  }

  function showLoading() {
    const loading = document.createElement('div');
    loading.setAttribute('class', 'loading');

    const img = document.createElement('img');
    img.setAttribute('src', 'loading.gif');
    img.setAttribute('class', 'gif');

    loading.appendChild(img);
    main.appendChild(loading);
  }

  function stopLoading() {
    const loading = document.querySelector('.loading');
    loading.remove();
  }

  function showError(error) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(error));
    main.appendChild(p);
  }

  // Bætir myndbandi við videoflokk.
  function writeVideo(videoID) {
    const title1 = allData.videos[videoID - 1].title;
    const created = timeSince(allData.videos[videoID - 1].created);
    const duration = secToDuration(allData.videos[videoID - 1].duration);
    const poster1 = allData.videos[videoID - 1].poster;
    const video = `video.html?id=${videoID}`;

    const outerDiv = document.createElement('div');
    outerDiv.setAttribute('class', 'videoListing col col-6 col-sm-12');

    const innerDiv1 = document.createElement('a');
    innerDiv1.setAttribute('href', video);
    innerDiv1.setAttribute('class', 'thumbnail');

    const innerDiv2 = document.createElement('div');
    innerDiv2.setAttribute('class', 'description');

    const x2InnerDiv1 = document.createElement('img');
    x2InnerDiv1.setAttribute('src', poster1);
    x2InnerDiv1.setAttribute('class', 'image');

    const x2InnerDiv2 = document.createElement('div');
    x2InnerDiv2.setAttribute('class', 'videoTime');
    x2InnerDiv2.appendChild(document.createTextNode(duration));

    const x2InnerDiv3 = document.createElement('a');
    x2InnerDiv3.setAttribute('href', video);
    x2InnerDiv3.appendChild(document.createTextNode(title1));

    const x2InnerDiv4 = document.createElement('p');
    x2InnerDiv4.appendChild(document.createTextNode(created));

    row.appendChild(outerDiv);
    outerDiv.appendChild(innerDiv1);
    outerDiv.appendChild(innerDiv2);
    innerDiv1.appendChild(x2InnerDiv1);
    innerDiv1.appendChild(x2InnerDiv2);
    innerDiv2.appendChild(x2InnerDiv3);
    innerDiv2.appendChild(x2InnerDiv4);
  }

  // Kallar á writeCategory() til að búa til flokk, og kallar á writeVideo()
  // fyrir hvert myndband sem á að vera inni í flokknum.
  function write() {
    const cLength = allData.categories.length;

    for (let i = 0; i < cLength; i += 1) {
      const vLength = allData.categories[i].videos.length;
      const categoryTitle = allData.categories[i].title;
      writeCategory(categoryTitle);
      for (let j = 0; j < vLength; j += 1) {
        const videoID = allData.categories[i].videos[j];
        writeVideo(videoID);
      }
    }
  }

  // Nær í gögnin og kallar á write() til að skrifa html.
  function fetchData(API_URL) {
    const fetch = new XMLHttpRequest();

    showLoading();

    fetch.open('GET', API_URL, true);
    fetch.onload = function fetchOnload() {
      const data = JSON.parse(fetch.response);
      if (fetch.status >= 200 && fetch.status < 400) {
        allData = data;
        write();
      } else {
        showError(`Villa kom upp: ${data.error}`);
      }
      window.setTimeout(stopLoading, 350);
    };
    fetch.send();
  }

  return {
    fetchData,
  };
}());

document.addEventListener('DOMContentLoaded', () => {
  const currentUrlLastEntry = window.location.pathname.split('/').pop();
  let API_URL;
  if (currentUrlLastEntry === '' || currentUrlLastEntry === 'index.html') {
    API_URL = './videos.json';
    writeHTML.fetchData(API_URL);
  }
});
