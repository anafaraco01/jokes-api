// Loads the intructions and the meme on the page load
window.addEventListener('load', function() {
  const instructions = document.getElementById('jokes-container');
  const img = document.createElement('img');
  img.src = './assets/img/meme.png';
  img.className = 'meme-img';
  instructions.appendChild(img);
  const div = document.createElement('div');
  div.className = 'instructions';
  div.innerHTML = `Laughing is as easy, as typing 1 word<br>in the search bar!<br>Which type of joke, or word<br>do you want to see in a joke? :)))`;
  instructions.appendChild(div);
});

// Handles the search form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const input = document.getElementById('search-input').value;

  if (!input) {
    return;
  } else {
    fetchJokes(input);
  }
});

// Fetches the jokes from the API
async function fetchJokes(input) {
  let termValue = input;
  const url = `https://icanhazdadjoke.com/search?limit=30&term=${termValue}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }

    const data = await response.json();

    checkAPIResponse(data.results);
  } catch (error) {
    throw error;
  }
}

// Checks if the API response is not empty and clears the jokes container
function checkAPIResponse(results) {
    const jokesContainer = document.getElementById('jokes-container');
    jokesContainer.innerHTML = null;

    if(results.length === 0) {
      displayError(jokesContainer);
    } else {
      displayJokes(results, jokesContainer)
    }
}

// Displays the jokes from the API that contain the user input
function displayJokes(results, jokesContainer){
  results.forEach((result) => {
    const div = document.createElement('div');
    div.className = 'joke-div';
    div.textContent = result.joke;
    jokesContainer.appendChild(div);
  });
}

// Displays the error message when no jokes are found
function displayError(jokesContainer) {
  const div = document.createElement('div');
  div.className = 'joke-not-found';
  div.innerHTML = 'We are sorry, we could not find any joke containing the word you searched for. Please try another word, or maybe the singular version of the word. Have a nice day, and remember to laugh! :)))';
  jokesContainer.appendChild(div);
}