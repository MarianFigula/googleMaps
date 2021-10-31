function initialize() {
    const fakultaCoords = { lat: 48.151965, lng: 17.072995 };
    const map = new google.maps.Map(document.getElementById("map"), {
        center: fakultaCoords,
        zoom: 15,
    });
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
            //position: fakultaCoords,
            pov: {
                heading: 0,
                pitch: 0,
            },
        }
    );

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h4 class="text-center">Súradnice</h4>'+
        '<p><b>48.151858204539316, 17.073345116223027</b></p>'+
        '<div id="bodyContent">' +
        "</div>" +
        "</div>";

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    /*const feiMarker = new google.maps.Marker({
        position: { lat: 48.151858204539316, lng:  17.073345116223027 },
        map,
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
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });
    map.setStreetView(panorama);*/

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

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
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

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

}