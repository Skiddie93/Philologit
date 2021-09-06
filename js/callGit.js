const display = document.getElementById('display')
const inputName = document.getElementById('inputName')
const inputSubmit = document.getElementById('inputSubmit')
const errors = document.getElementById('errors')




function altRenders(error, loading){
  errors.innerHTML = error;
  display.innerHTML = loading;
}
async function fetchRepo(userName) {
  let get =await fetch("https://api.github.com/users/"+userName+"/repos")
  let data = await get.json();
  return data
}

async function fetchLangs(repos) {
  let langData = []
  for (item in repos) {

    fetchStr = repos[item].languages_url
    let get = await fetch(fetchStr, fetchHead)
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
    for (let atr in obj) {
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
      renderStr += "<div class='item'><p>" + atr + "</p><p>" + Math.round((100 * allLangs[atr] / allLangs.sum) * 100) / 100 + "%</p></div>"
    }
  }
  display.innerHTML = renderStr
}


async function processData(userName) {

  let data = await fetchRepo(userName)
  if (data.length==0) {
    altRenders("<p>User has no repos</p>","")
  }else{
  let langsData = await fetchLangs(data).catch(err=> altRenders("<p>User does not exist</p>",""))
  render(langsData).catch(err=> err)
}
}
inputName.addEventListener('keyup', function(e){
  if (e.code === "Enter") {
altRenders("","loading")
  let nameValue = inputName.value
  processData(nameValue)
 }
})
