const keyTastedive = '&k=328834-ArtistFi-A1N9U9RR'
const keyBIT = '?app_id=codingbootcamp'
const eventsBIT = '/events'

tastedivePull('Pulp')
bandsInTownPull('Wet Nurse')

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
    });
}
