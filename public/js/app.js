
  const weatherForm = document.querySelector('form');

  weatherForm.addEventListener('submit', (e) => {
    const errorMessage = document.querySelector('#error');
    const dataMessage = document.querySelector('#data');
    const location = document.querySelector('input').value;
    fetch(`/weather?address=${location}`)
    .then(response => {
      response.json()
        .then((data) => {
          console.log(data);
          if(data.error){
            errorMessage.textContent = data.error;
          } else {
            errorMessage.textContent = '';
            dataMessage.innerHTML = '<span>Loading...</span>';
            dataMessage.innerHTML = `<div><p>Location: &nbsp;${data.forecast.location.name}</p>\n
            <p>Country: &nbsp; ${data.forecast.location.country}</p>
            <p>Weather: &nbsp;${data.forecast.weather_info.description}</p>\n
            <p>Temperature: &nbsp;${data.forecast.weather_info.temperature} degrees F, but feels like ${data.forecast.weather_info.feelslike} degrees F.</p></div>`;
          }
        })
    })
    e.preventDefault();
  })