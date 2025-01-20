async function fetchRandomWords(num) {

  const response = await fetch('https://random-word-api.herokuapp.com/word?number=' + num, {
    headers: {
    }
  });

  return await response.json();
}

export {
 fetchRandomWords,
}