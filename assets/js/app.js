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

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve the search query from the input field
  const searchQuery = document.getElementById('search-input').value;

  if (!searchQuery) {
    return;
  }

  const trial = document.getElementById('jokes-container');
  trial.innerHTML = null;

  // Call the search function with the search query
  fetchJokes(searchQuery)
});

async function fetchJokes(input) {
  let term = input;

  if(term === '[object Event]') {
    term = 'dad';
  }

  const url = `https://icanhazdadjoke.com/search?limit=30&term=${term}`;

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
    const jokesContainer = document.getElementById('jokes-container');
    jokesContainer.innerHTML = null;

    if(data.results.length === 0) {
      const div = document.createElement('div');
      div.className = 'joke-not-found';
      div.innerHTML = 'We are sorry, we could not find any joke containing the word you searched for. Please try another word, or maybe the singular version of the word. Have a nice day, and remember to laugh! :)))';
      jokesContainer.appendChild(div);
    } else {
      data.results.forEach((joke) => {
        const div = document.createElement('div');
        div.className = 'joke-div';
        div.textContent = joke.joke;
        jokesContainer.appendChild(div);
      });
    }
  } catch (error) {
    throw error;
  }
}