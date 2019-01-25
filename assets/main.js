const keyTastedive = '&k=328834-ArtistFi-A1N9U9RR&type=music'
const keyBIT = '?app_id=codingbootcamp'
const eventsBIT = '/events'


$('#submit-button').on('click', function(){
    event.preventDefault()
    tastedivePull($('#artist').val().trim())
    console.log($('#artist').val().trim())
})

function tastedivePull(artist){

    var queryURL = "https://tastedive.com/api/similar?" + 'q=' + artist + keyTastedive
    
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
    }).then(function(response) {
        response = response.Similar.Results
        response.forEach(function(e){
            bandsInTownPull(e.Name)
        })
    });
}

function bandsInTownPull(artist){
    
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + eventsBIT + keyBIT

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        if(response.length == 0)
            $('#output').prepend(
                `<div class="col-sm-3">
                    <div class="card">
                    <img class="card-img-top" src="https://placekitten.com/300/300">
                    <h5 class="card-title">${artist}</h5>
                    <p class="card-text">No events</p>
                    </div>
                </div>`)
        else
            $('#output').prepend(
                `<div class="col-sm-3">
                    <div class="card">
                    <img class="card-img-top" src="https://placekitten.com/300/300">
                    <h5 class="card-title">${artist}</h5>
                    <p class="card-text">${response.length} Events</p>
                    <button class="btn btn-outline-light my-2 my-sm-0" id="ticket-button" type="submit">Tickets</button>
                    </div>
                </div>`)
    });
}