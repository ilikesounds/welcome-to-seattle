var currentNeighborhood;
var commentsArray = [];

function createUserArray(characteristic, value) {
  var userChar = {
    characteristic: characteristic,
    value: value
  };
  userInputArray.push(userChar);
}

function displayNeighborhood(neighborhood) {

  var template = Handlebars.compile($('#neighborhood-template').html());
  var html = template(neighborhoodArray);

  fetchCommentsFromLocal();

  for (var i = 0; i < commentsArray.length; i++) {
    var userComment = document.createElement('p');
    var inputName = document.createElement('p');
    if (commentsArray[i].neighborhood === currentNeighborhood) {
      userComment.textContent = commentsArray[i].comment;
      inputName.textContent = commentsArray[i].username;
      document.getElementById('comments').appendChild(inputName);
      document.getElementById('comments').appendChild(userComment);
    }
  }

  for (var i = 0; i < neighborhood.factsList.length; i++) {
    var facts = document.createElement('li');
    facts.textContent = neighborhood.factsList[i];
    factsContent.appendChild(facts);
  }
}

function displayPlaces() {
  var neighborhoodArr = JSON.parse(localStorage.getItem('neighborhoods'));
  $('#places-list').append('<ul/>');
  neighborhoodArr.forEach(function(elem) {
    var neighorhoodElement = $('<li/>', {
      text: elem.name
    })
    $('#places-list ul').append(neighorhoodElement);
  })
}

//display page content for places.html - navigation backup page
var placesCheck = document.getElementById('places-list');
if (placesCheck) {
  displayPlaces();
}

//EVENT LISTENER FOR COMMENTS
// var commentForm = document.getElementById('neighborhood-comment-form');
// commentForm.addEventListener('submit', processComment);

function processComment(event) {
  event.preventDefault();
  var userComment = document.createElement('p');
  userComment.setAttribute('class', currentNeighborhood);
  userComment.textContent = 'Comment: ' + event.target.comment.value;
  console.log(userComment);
  var inputName = document.createElement('p');
  inputName.setAttribute('class', currentNeighborhood);
  inputName.textContent = 'Name: ' + event.target.nameofuser.value;
  console.log(inputName);
  document.getElementById('comments').appendChild(inputName);
  document.getElementById('comments').appendChild(userComment);
  var commentObject = {
    neighborhood: currentNeighborhood,
    username: inputName.textContent,
    comment: userComment.textContent
  };
  commentsArray.push(commentObject);
  saveCommentsToLocal();
  commentForm.reset();
}

function saveCommentsToLocal() {
  localStorage.setItem('savedComments', JSON.stringify(commentsArray));
}

function fetchCommentsFromLocal() {
  var savedComments = JSON.parse(localStorage.getItem('savedComments'));
  if (savedComments) {
    console.log('User has comments from last time.');
    commentsArray = savedComments;
  }
}

function processUserAnswers(event) {
  event.preventDefault();
  console.log(event.target);

  for (var i = 0; i < ques.length; i++) {
    var questionName = ques[i].name;
    var userAnswer = event.target[questionName].value;
    createUserArray(questionName, userAnswer);
  }
}
//EVENT LISTENER FOR FORM PAGE
var getUserAnswers = document.getElementById('help-me-choose-form');
getUserAnswers.addEventListener('submit', processUserAnswers);

//EVENT LISTENER FOR COMMENTS
var commentForm = document.getElementById('neighborhood-comment-form');
commentForm.addEventListener('submit', processComment);
