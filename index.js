function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

function searchRepositories(){
	const searchTerms = $("#searchTerms").val()
	$.get( `https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
       const template = Handlebars.compile($('#results-template').html())
       $('#results').html(template(data))
	}).fail(error => {
      displayError()
    })
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, data => {
    const template = Handlebars.compile($('#commits-template').html())
    $('#details').html(template(data))
  }).fail(error => {
    displayError()
  })
}
	
function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


$(document).ready(function (){
  	
  	handlebarsSetup()

});

