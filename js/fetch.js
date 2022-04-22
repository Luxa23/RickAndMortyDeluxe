fetch('https://rickandmortyapi.com/api')
  .then(response => response.json())
  .then(data => {
    //code execute
    console.log(data);
  });
