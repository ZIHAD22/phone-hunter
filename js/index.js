// common function
const fetching = async (keyWord, details) => {
  const url = details
    ? `https://openapi.programming-hero.com/api/phone/${keyWord}`
    : `https://openapi.programming-hero.com/api/phones?search=${keyWord}`

  const data = await fetch(url)
  const fetchedData = await data.json()
  return fetchedData
}

// fetch data by default;
const fetchData = async () => {
  const phoneBrand = ['oppo', 'iphone', 'samsung']
  const selectBrand = Math.floor(Math.random() * phoneBrand.length)

  //   fetching data
  const realData = await fetching(phoneBrand[selectBrand], false)
  displayData(realData)
  console.log(realData)
}

fetchData()

// display Data By Default
const displayData = (realData) => {
  const card = document.getElementById('search-result')
  const phoneData = realData.data.map((phone) => {
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
        <div class="card">
            <img class="m-2" src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h3 class="card-title">Name: ${phone.phone_name}</h3>
                <h4>Brand:${phone.brand}</h4>
            </div>
            <a onclick="expanDetails('${phone.slug}')" class="btn btn-success w-50 ms-3 mb-4" href="#phone-details">Details</a>
        </div>`

    card.appendChild(div)
    // console.log(card)
  })
}

// Search Data By user searching Key Word

const searchData = async () => {
  const searchInput = document.getElementById('search-input')
  let searchValue = searchInput.value
  const individualData = await fetching(searchValue, false)
  console.log(individualData)
  const preSearchData = document.getElementById('search-result')
  while (preSearchData.hasChildNodes()) {
    preSearchData.removeChild(preSearchData.firstChild)
  }
  displayData(individualData)
  searchInput.value = ''
}

// Phone Details function
const expanDetails = async (id) => {
  const pD = await fetching(id, true)
  displayDetails(pD.data)
}

// display Detailes
const displayDetails = (phoneDetails) => {
  const detailsSection = document.getElementById('details')
  detailsSection.classList.remove('d-none')
  const imgDatails = document.getElementById('img-details')
  const imgDiv = document.createElement('div')
  while (imgDatails.hasChildNodes()) {
    imgDatails.removeChild(imgDatails.firstChild)
  }
  imgDiv.innerHTML = `
    <img
    src="${phoneDetails.image}"
    class="w-100"
    alt="..."
    />
  
  `
  //   distractring
  const { name, brand, releaseDate } = phoneDetails
  const { storage, displaySize, chipSet, memory } = phoneDetails.mainFeatures
  const sensors = phoneDetails.mainFeatures.sensors
  const tableBody = document.getElementById('phone-detailes')
  let tableDiv = document.createElement('div')
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild)
  }
  tableDiv.innerHTML = `
  <hr/>
    <h4>Name: ${name}</h4>
    <h4>Brand: ${brand}</h4>
    <i class="fa-solid fa-xmark"></i>
    <h4>Release Date: ${releaseDate ? releaseDate : 'No Result Found'}</h4>
    <h4>Storage: ${storage}</h4>
    <h4>Display Size: ${displaySize}</h4>
    <h4>Chip Set: ${chipSet}</h4>
    <h4>Memory: ${memory}</h4>
    <h4>Sensors: ${sensors}</h4>
    <div class="${phoneDetails.others ? 'd-block' : 'd-none'}">
      <h4>WLAN: ${phoneDetails.others?.WLAN}</h4>
      <h4>Bluetooth: ${phoneDetails.others?.Bluetooth}</h4>
      <h4>GPS: ${phoneDetails.others?.GPS}</h4>
      <h4>NFC: ${phoneDetails.others?.NFC}</h4>
      <h4>Radio: ${phoneDetails.others?.Radio}</h4>
      <h4>USB: ${phoneDetails.others?.USB}</h4>
    </div>
    `
  console.log(tableDiv)
  tableBody.appendChild(tableDiv)
  imgDatails.appendChild(imgDiv)
}

// details modal close function
const closeDetailsModal = () => {
  const detailsSection = document.getElementById('details')
  detailsSection.classList.add('d-none')
}
