const keyTastedive = '&k=328834-ArtistFi-A1N9U9RR&type=music'
const keyBIT = '?app_id=codingbootcamp'
const eventsBIT = '/events'

$('#submit-button').on('click', function(){
    var nameReg = /^[A-Za-z1-9 ]+$/;
    event.preventDefault()
    $('#output').empty()

    let input = $('#artist').val().trim()

    if(input == ''){
        $('#artist-name-output').text(`Please enter an artist.`)
    }
    
    else if((nameReg).test(input)){
        console.log('success')
        $('#artist-name-output').text(`bandSearch similar results for ${input}`)
        tastedivePull(input)
    }

    else{
        $('#artist-name-output').text(`Band names may not include special characters.`)
    }
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
        
        let eventsInfo = response

        queryURL = "https://rest.bandsintown.com/artists/" + artist + keyBIT

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

        console.log(response)

        let artistInfo = response

        if(eventsInfo.length == 0)
            $('#output').prepend(
                `<div class="col-sm-3">
                    <div class="card">
                    <img class="card-img-top" src="${artistInfo.image_url}">
                    <a href="${artistInfo.facebook_page_url}"><h5 class="card-title">${artist}</h5></a>
                    <p class="card-text">No events</p>
                    </div>
                </div>`)
        else
            $('#output').prepend(
                `<div class="col-sm-3">
                    <div class="card">
                    <img class="card-img-top" src="${artistInfo.image_url}">
                    <a href="${artistInfo.facebook_page_url}"><h5 class="card-title">${artist}</h5></a>
                    <p class="card-text">${eventsInfo.length} Events</p>
                    <button class="btn btn-outline-light my-2 my-sm-0" id="ticket-button" type="submit"><a href="${eventsInfo[0].offers[0].url}">Tickets</a></button>
                    </div>
                </div>`)
        });
    });
}

