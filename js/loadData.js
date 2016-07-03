$(document).ready(function(){
      if(localStorage.getItem('neighborhoods')){
      var data = localStorage.getItem('neighborhoods');
      console.log(JSON.parse(data));
    }
    else{
      $.getJSON('./data/data.json',function(data){
        localStorage.setItem('neighborhoods',JSON.stringify(data));
        });
      }
})
