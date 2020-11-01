// *--------------------------------------------------Constants--------------------------------------------
const loading = document.querySelector(".loading");
const searchForm = document.getElementById("searchForm");
const output = document.querySelector(".output");
const search = document.getElementById("search");
const feedback = document.querySelector(".feedback");

// ?---------------------------------------------------Event Listeners---------------------------------------
searchForm.addEventListener('submit', e => {
  e.preventDefault();

  let value = search.value;

  if (value.length === 0) {
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>Invalid Input</p>`;

    setTimeout(() => {
      feedback.classList.remove('showItem');
    }, 3000);
  } else {
    search.value = '';

    ajaxWiki(value);
  }
})

// !----------------------------------------------------Functions---------------------------------------------

function ajaxWiki(query) {
  output.innerHTML = '';
  loading.classList.add('showItem');
  const URL = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${query}`;
  fetch(URL).then(data => data.json()).then(data => showData(data)).catch(err => console.log(err));
};

function showData(data) {
  loading.classList.remove('showItem');

  let {
    query: {
      search: results
    }
  } = data;
  let info = ''

  let link = `https://en.wikipedia.org/?curid=`;

  results.forEach(result => {
    let {
      title,
      snippet,
      pageid
    } = result;
    info += `
    <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
      <div class="card card-body">
      <h1 class="card-title blueText">${title}</h1>
      <p>${snippet}</p>
      <a href="${link}${pageid}" target="_blank" class="my-2 text-capitalize">read
        more...</a>


    </div>
    </div>
      `
  });

  output.innerHTML = info;
}