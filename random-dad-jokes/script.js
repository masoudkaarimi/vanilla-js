const base_url = 'https://icanhazdadjoke.com';

const btn = document.querySelector('.btn');
const result = document.querySelector('.result');

btn.addEventListener('click', () => {
  fetchRandomDadJoke();
});

const fetchRandomDadJoke = async () => {
  result.textContent = 'Loading...';

  try {
    const response = await fetch(base_url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'learning app',
      },
    });

    if (!response.ok) {
      throw new Error('There was an error...');
    }

    const data = await response.json();
    result.textContent = data.joke;
  } catch (error) {
    console.log(error.message);
    result.textContent = error.message;
  }
};

fetchRandomDadJoke();
