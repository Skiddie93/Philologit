const display = document.getElementById('display')

async function fetchRepo() {
  let get = await fetch("https://api.github.com/users/skiddie93/repos")
  let data = await get.json();

  return data
}

async function fetchLangs(repos) {
  let langData = []
  for (item in repos) {

    fetchStr = repos[item].languages_url
    let get = await fetch(fetchStr)
    let data = await get.json();
    langData.push(data)

  }
  return langData
}

async function render(lang) {
  let renderStr = ""
  let allLangs = {
    sum: 0
  }
  lang.forEach(obj => {
    for (atr in obj) {
      allLangs.sum += obj[atr]
      if (atr in allLangs) {
        allLangs[atr] += obj[atr]
      } else {
        allLangs[atr] = obj[atr]
      }
    }
  })
  for (atr in allLangs) {
    if (atr != "sum") {
      renderStr += "<div class='item'><p>" + atr + "</p><p>" + Math.round((100 * allLangs[atr] / allLangs.sum) * 10) / 10 + "%</p></div>"
    }
  }
  display.innerHTML = renderStr
}


async function processData() {
  let data = await fetchRepo()
  let langsData = await fetchLangs(data)
  render(langsData)
}

processData()
