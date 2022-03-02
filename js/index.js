// fetch data by default;
const fetchData = async () => {
  const phoneBrand = ['oppo', 'iphone', 'samsung']
  const selectBrand = Math.floor(Math.random() * phoneBrand.length)

  const url = `https://openapi.programming-hero.com/api/phones?search=${phoneBrand[selectBrand]}`

  const data = await fetch(url)
  const realData = await data.json()

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
            <a class="btn btn-success w-50 ms-3 mb-4" href="">Details</a>
        </div>`

    card.appendChild(div)
    // console.log(card)
  })
}

// Search Data By user searching Key Word

const searchData = async () => {
  const searchInput = document.getElementById('search-input')
  let searchValue = searchInput.value
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
  const data = await fetch(url)
  const individualData = await data.json()
  console.log(individualData)
  const preSearchData = document.getElementById('search-result')
  while (preSearchData.hasChildNodes()) {
    preSearchData.removeChild(preSearchData.firstChild)
  }
  displayData(individualData)
  searchInput.value = ''
}
