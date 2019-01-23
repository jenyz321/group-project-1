const keyTastedive = 'k=328834-ArtistFi-A1N9U9RR&type=music'
const keyBIT = '?app_id=codingbootcamp'
const eventsBIT = '/events'

tastedivePull('Pulp')
bandsInTownPull('Wet Nurse')

function tastedivePull(artist){

    var queryURL = "https://tastedive.com/api/similar?" + keyTastedive + '&q=' + artist
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    });
}

function bandsInTownPull(artist){
    
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + eventsBIT + keyBIT

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    });
}
