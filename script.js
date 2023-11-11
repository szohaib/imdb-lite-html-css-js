const apiEndPoint = "http://www.omdbapi.com/?apikey=9f912670";

const apiCollection = {
  getMovies: function (movieName, type, plot) {
    return apiEndPoint + "&s=" + movieName + "&type=" + type;
  }
}

let currentPage = 1
const moviesPerPage = 4

let begin = (currentPage - 1) * moviesPerPage
let end = begin + moviesPerPage

let actualData = []
let filteredData = []


async function getData(movieName, type) {
  // Fetch data from the API
  const apiResponse = await fetch(apiCollection.getMovies(movieName, type))

  const data = await apiResponse.json()

  actualData = data.Search

  filteredData = paginateMovies(actualData, begin, end)
  removeOldMovies()

  // data is an array, you can iterate through it
  filteredData.forEach(item => {
    createMovieElement(item.Poster)
  })

}

function paginateMovies(data, beginIndex, endIndex) {
  return data.slice(beginIndex, endIndex)
}

function nextPage() {
  currentPage = currentPage + 1

  let begin = (currentPage - 1) * moviesPerPage
  let end = begin + moviesPerPage

  filteredData = paginateMovies(actualData, begin, end)

  removeOldMovies()
  filteredData.forEach(item => {
    createMovieElement(item.Poster)
  })
}

function previousPage() {
  currentPage = currentPage - 1

  let begin = (currentPage - 1) * moviesPerPage
  let end = begin + moviesPerPage

  filteredData = paginateMovies(actualData, begin, end)

  removeOldMovies()
  filteredData.forEach(item => {
    createMovieElement(item.Poster)
  })
}

function removeOldMovies() {
  const parentDiv = document.getElementById('movies-wrapper-row');

  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
}

function createMovieElement(imgSource) {
  const div = document.createElement('div')
  div.classList.add('col-md-3', 'd-flex', 'justify-content-center', 'white-font-color')

  const movieBox = document.createElement('div')
  movieBox.classList.add('movies-box')

  const img = document.createElement('img')
  img.src = imgSource
  img.classList.add('img-fluid')

  const movieLayerTop = document.createElement('div')
  movieLayerTop.classList.add('movies-layer-top')

  const p = document.createElement('p')
  p.innerText = 'View Details'
  p.classList.add('white-font-color', 'position-absolute', 'top-50', 'start-50', 'translate-middle')

  movieLayerTop.appendChild(p)

  movieBox.appendChild(img)
  movieBox.appendChild(movieLayerTop)

  div.appendChild(movieBox)

  document.getElementById('movies-wrapper-row').appendChild(div)
}

function search() {
  const movieName = document.getElementById('search-movie').value

  const type = document.getElementById('movie-type').value ?? null

  getData(movieName, type)
}

getData('Harry Potter', null, null)