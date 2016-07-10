var neighborhoodArray;

$(document).ready(function(data) {
  if (localStorage.getItem('neighborhoods')) {
    var data = localStorage.getItem('neighborhoods');
    neighborhoodArray = JSON.parse(data);
    console.log(neighborhoodArray);

  } else {
    $.getJSON('./data/data.json', function(data) {
      localStorage.setItem('neighborhoods', JSON.stringify(data));
      neighborhoodArray = JSON.parse(data);
      console.log(neighborhoodArray);
    });
  }
})
