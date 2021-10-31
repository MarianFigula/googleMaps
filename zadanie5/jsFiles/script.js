
function initialize() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    fakultaCoords = {lat: 48.151858204539316, lng: 17.073345116223027};

    var mapOptions = {
        center: fakultaCoords,
        zoom: 15,
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
    }


    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);



/*

PRIDANIE STREETVIEW DO DRUHEHO OKNA AK BY ZA ULOHU NEBOL LEN OBRAZOK

    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
            position: fakultaCoords,
            pov: {
                heading: 0,
                pitch: 0,
            },
        }
    );

    map.setStreetView(panorama);
*/

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h4 class="text-center">Súradnice</h4>' +
        '<p><b>48.151858204539316, 17.073345116223027</b></p>' +
        '<div id="bodyContent">' +
        "</div>" +
        "</div>";

    const infowindow1 = new google.maps.InfoWindow({
        content: contentString,
    });

    // HLAVNY MARKER FEIKY

    const icon = {
        url: "./img/marker.png",
        size: new google.maps.Size(30, 100),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 35),
    };

    var feiMarker = new google.maps.Marker({
        position: { lat: 48.151858204539316, lng:  17.073345116223027 },
        map,icon,
        title: "STUBA-FEI",
        center: fakultaCoords,

        label: {
            text: "STU-FEI",
            background: "black",
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "bottom",
        }

    });



    feiMarker.addListener("click", () => {
        infowindow1.open({
            anchor: feiMarker,
            map,
            shouldFocus: false,
        });
    });


    // display MHD
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);




/*
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtautocomplete'));
    google.maps.event.addListener(autocomplete, 'place_changed', function (){
        var place = autocomplete.getPlace();
        var location22 = "<b>Location</b>" + place.formatted_addres + "<br>";
        location22 += "<b>Latitude:</b>" + place.geometry.location.lat + "<br>";
        location22 += "<b>Longitude:</b>" + place.geometry.location.F + "<br>";
        document.getElementById('lblResult').innerHTML = location22;
    })*/

    // MARKER SO SEARCHBOXOM

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
   // map.addListener("bounds_changed", () => {
   //     searchBox.setBounds(map.getBounds());
   // });

   // let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
   /*
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        //const bounds = new google.maps.LatLngBounds();


        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
/*
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
*/

}


function calcRoute(){
    var start = document.getElementById('pac-input').value;

    var end = fakultaCoords // fakulta - coords

    var auto = document.getElementById('auto');
    var peso = document.getElementById('peso');
    var typDopravy;
    var output = document.getElementById("output");

    if (auto.checked){
        typDopravy = 'DRIVING';
    }else if (peso.checked){
        typDopravy = 'WALKING';
    }else {
        output.innerHTML = "Zadajte miesto a typ dopravy!";
        output.style.color = "red";
    }
    var request = {
        origin: start,
        destination: end,
        travelMode: typDopravy,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    directionsService.route(request, function (result, status){
        if (status == 'OK'){
            directionsRenderer.setDirections(result);
            output.innerHTML = "Vzdialenosť medzi " + document.getElementById('pac-input').value + " a FEI-STU je " + result.routes[0].legs[0].distance.text + "."

        }
        else{
            map.setCenter(fakultaCoords);
            output.innerHTML = "Nepodarilo sa nájsť cestu medzi " + document.getElementById('pac-input').value + " a FEI-STU."

        }
        output.style.color = "black"
    })




}


