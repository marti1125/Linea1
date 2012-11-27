// Wait for Cordova to load
    //
    var map;
    var infowindow;

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

        //var element = document.getElementById('geolocation');
        //element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                           // 'Longitude: '          + position.coords.longitude             + '<br />' +
                            //'Altitude: '           + position.coords.altitude              + '<br />' +
                            //'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            //'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            //'Heading: '            + position.coords.heading               + '<br />' +
                            //'Speed: '              + position.coords.speed                 + '<br />' +
                            //'Timestamp: '          + position.timestamp                    + '<br />';
        
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude; 

        

        var pyrmont = new google.maps.LatLng(latitud, longitud);

        map = new google.maps.Map(document.getElementById('miestacion'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: pyrmont,
          zoom: 14
        });

        var yo = new google.maps.LatLng(latitud, longitud);
        var msgyo = 'Mi ubicación';

        var marker = new google.maps.Marker({
            position: yo,
            map: map
        }); 

        var infowindowyo = new google.maps.InfoWindow({
            content: msgyo
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindowyo.open(map, marker);
        });
        

        var request = {
          location: pyrmont,
          radius: 3000,
          //types: ['train_station'] Linea1
          types: ['subway_station']
          //types: ['political']
        };
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);     

        /*var ubicacion = new google.maps.LatLng(latitud, longitud);

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
        });*/

    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

    //// mi ubicación...

    

    function initialize() { 

        
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

      google.maps.event.addDomListener(window, 'load', onSuccess);
