// Wait for Cordova to load
    //
    function mostrar() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }    
   

    // Cordova is ready
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;

        var ubicacion = new google.maps.LatLng(latitud, longitud);

        var mapOptions = {

        center: new google.maps.LatLng(latitud, longitud),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var ubi = new google.maps.Map(document.getElementById("map_canvas2"),
        mapOptions);

        var marker = new google.maps.Marker({
            position: ubicacion,
            map: ubi
        });

    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }
