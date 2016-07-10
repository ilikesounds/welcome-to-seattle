var userInputArray = [];
var ques = [];

function Question(questionObj) {
  this.question = questionObj.question;
  this.name = questionObj.name;
}

var questionObj = [{
  question: 'Is it important for you to have good nightlife in your neighborhood?',
  name: 'nightLifeQuestion'
}, {
  question: 'Do you need public transit?',
  name: 'transitQuestion'
}, {
  question: 'Do you need to be close to a park?',
  name: 'parksQuestion'
}, {
  question: 'Is it important to have single family housing in your neighborhood?',
  name: 'singleFamilyHousingQuestion'
}, {
  question: 'Do you want to be in a neighborhood with mostly apartments?',
  name: 'rentableAptQuestion'
}, {
  question: 'Do you need to be able to walk to a main shopping district?',
  name: 'walkabilityQuestion'
}, {
  question: 'Do you want to live in a more crowded urban environment?',
  name: 'urbanQuestion'
}, {
  question: 'Is it important for you to have good restaurants in the neighborhood?',
  name: 'restaurantQuestion'
}, {
  question: 'Do you enjoy having a lively arts scene in your neighborhood?',
  name: 'artsQuestion'
}, {
  question: 'Do you like hipsters?',
  name: 'hipsterQuestion'
}]

questionObj.toHtml = function(ques) {
  var template = Handlebars.compile($('#question-template').html());
  var store = template(ques);
  return store;
}

questionObj.forEach(function(el) {
  ques.push(new Question(el));
})

ques.forEach(function(el) {
  $('#question-space').append(questionObj.toHtml(el));
})

function scoreAssignment(neighborhood) {
  for (var i = 0; i < userInputArray.length; i++) {
    if (userInputArray[i].value === neighborhood.characteristics[i].value) {
      neighborhood.score++;
    }
  }
}

function removeForm() {
  document.getElementById('form-selection').style.display = 'none';
}

function assignNeighborhoodScores() {
  for (var i = 0; i < neighborhoodArray.length; i++) {
    console.log(neighborhoodArray[i]);
    scoreAssignment(neighborhoodArray[i]);
  }
}

function sortResults() {
  neighborhoodArray.sort(function(a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (b.score > a.score) {
      return 1;
    }
    return 0;
  });
}

function processUserAnswers(event) {
  event.preventDefault();
  console.log(event.target);

  for (var i = 0; i < ques.length; i++) {
    var questionName = ques[i].name;
    var userAnswer = event.target[questionName].value;
    console.log(userAnswer);
    createUserArray(questionName, userAnswer);
  }
  assignNeighborhoodScores();
  sortResults();
  removeForm();
  appendResultList();
}
//CREATE RANKED LIST AFTER FORM RESULTS
function appendResultList() {
  var $h2 = $('<h2>').text('Here are the neighborhoods that meet your needs in order from best to worst:');
  $($h2).appendTo('#form-results');
  $("<ol></ol>").appendTo('#form-results');
  for (i = 0; i < neighborhoodArray.length; i++) {
    var $a = $("<a>", {
      "href": 'neighborhood.html?id=' + neighborhoodArray[i].pageLink
    }).text(neighborhoodArray[i].name);
    $('#form-results > ol').append('<li>');
    $('ol > li').last().append($a);
  }
}

//EVENT LISTENER FOR FORM PAGE
var getUserAnswers = document.getElementById('help-me-choose-form');
getUserAnswers.addEventListener('submit', processUserAnswers);

questionObj.toHtml(questionObj);
