const keyTastedive = '&k=328834-ArtistFi-A1N9U9RR&type=music'
const keyBIT = '?app_id=codingbootcamp'
const eventsBIT = '/events'
let count = 0

$('#submit-button').on('click', function(){
    var reg = /^[A-Za-z1-9 ]+$/;
    event.preventDefault()
    $('#output').empty()

    let input = $('#artist').val().trim()

    if(input == ''){
        $('#artist-name-output').text(`Please enter an artist.`)
    }
    
    else if((reg).test(input)){
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

        let eventList = ``
        eventsInfo.forEach(function(e){
            eventList += `<li class="list-group-item dark"><a href="${e.offers[0].url}">${e.venue.name} in ${e.venue.city}, ${e.venue.region} on ${e.datetime}</a></li>`
        })

        console.log(eventList);

        queryURL = "https://rest.bandsintown.com/artists/" + artist + keyBIT

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

        console.log(response)

        let artistInfo = response

        if(eventList == ''){
            $('#output').prepend(
                `<div class="col-sm-3">
                    <div class="card">
                    <img class="card-img-top" src="${artistInfo.image_url}">
                    <a href="${artistInfo.facebook_page_url}"><h5 class="card-title">${artist}</h5></a>
                    <p class="card-text">No events</p>
                    </div>
                </div>`)
            }
        else{
            count++
            $('#output').prepend(
                `<div class="col-sm-3">
                    <div class="card">
                    <img class="card-img-top" src="${artistInfo.image_url}">
                    <a href="${artistInfo.facebook_page_url}"><h5 class="card-title">${artist}</h5></a>
                    <p class="card-text">${eventsInfo.length} Events</p>
                    <ul class="list-group hide" id="list-${count}">${eventList}</ul>
                    <button id="ticket-${count}" class="ticket-button btn btn-outline-light my-2 my-sm-0" data-event=${count} type="submit">See Events</button>
                    </div>
                </div>`)

            $(`#ticket-${count}`).on('click', function(event){
                event.preventDefault()
                let clicked = $(this).data('event')
                console.log(clicked)
                if($(`#list-${clicked}`).hasClass('hide')){
                    $(`#list-${clicked}`).removeClass('hide')
                    $(`#ticket-${clicked}`).text('Close Events')
                }
                else{
                    $(`#list-${clicked}`).addClass('hide')
                    $(`#ticket-${clicked}`).text('See Events')
                }
            })
            }
        });
    });
}

