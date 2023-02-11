const form = document.querySelector('.js-form');
const queryInput = document.querySelector('.js-query-input');
const numOfImagesInput = document.querySelector('.js-numOfImages');
const errorField = document.querySelector('.js-error');
const gifContainer = document.querySelector('.js-gifs-container');

function renderImages(response) {
  let html = '';
  console.log(response.data);
  for (let gifData of response.data) {
      html += `
          <img 
              src="${gifData.images.downsized.url}" 
              alt="${gifData.title}"
              class="meme-image" />`;
              console.log(gifData);
  }
  gifContainer.innerHTML = html;

}

function getUrl(query, numOfImages) {
  const API_PREFIX = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;
  return `${API_PREFIX}&q=${query}&limit=${numOfImages}&offset=0&rating=g&lang=en`;
}


function getImages(query, numOfImages) {
  fetch(getUrl(query, numOfImages))
    .then(x => x.json(query, numOfImages))
    .then (renderImages);
}

function formSubmitted(event) {
  event.preventDefault();

  let query = queryInput.value.trim();
  let numOfImages = Number.parseInt(numOfImagesInput.value);

  if (query.length === 0) {
      errorField.innerHTML = 'Bad Input.';
  } else {
      errorField.innerHTML = '';
      getImages(query, numOfImages);
  }
}



form.addEventListener('submit', formSubmitted);