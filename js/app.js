const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
  
  const formDOM = document.querySelector('.form');
  const InputDOM = document.querySelector('.form-input');
  const resultsDOM = document.querySelector('.results');

  formDOM.addEventListener('submit', (eventObj) => 
  {
    eventObj.preventDefault();
    const value = InputDOM.value;
    if(!value){
      resultsDOM.innerHTML = '<div class="error">please enter valid search term</div>';
      return;
    }
    fetchPages(value);
  });
const fetchPages = async (searchValue) => 
{
  resultsDOM.innerHTML =
    '<div class="loading"></div>';
  try 
  {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if(results.length < 1){
      resultsDOM.innerHTML = '<div class="error">no matching results. Please try again</div>';
      return;
    }
    renderResutls(results);
  } 
  catch (error) 
  {
    resultsDOM.innerHTML =
      '<div class="error">there was an error</div>';
  }
} 

const renderResutls = (list) => 
{
  // pull out title, snippet, pageid
  const cardsList = list.map((item)=> {
    console.log(item.pageid);
    const {pageid, snippet, title} = item;
    return `
    <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
    <h4>${title}</h4>
    <p>${snippet}</p>
    </a>`;
  }).join('');
  resultsDOM.innerHTML = `<div class="articles">
        ${cardsList}
      </div>`;
}
