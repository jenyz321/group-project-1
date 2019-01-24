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
            console.log(`${artist}: No events`)
        else
            console.log(`${artist}: ${response.length} Events`)
    });
}
