
        var map;
        var infoWindow;        
        var request;
        var service;
        var markers = [];

        function initialize(){
            var center = new google.maps.LatLng(47.6062095, -122.3320708);
          
            map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 13
            });

            request = {
                location: center,
                radius: 8047,
                types: ['store']
            };

            infoWindow = new google.maps.infoWindow();
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
            google.maps.event.addListener(map, 'rightclick', function(event){
                map.setCenter(event.LatLng)
                clearResults(markers)

                request = {
                    location: center,
                    radius: 8047,
                    types: ['store']
                };
                service.nearbySearch(request, callback);
            })
        }

        function callback(result, status){
            if (status == google.maps.places.PlacesServiceStatus.OK){
                for (var i = 0; i < results.length; i++){
                    markers.push(createMarker(result[i]));

                }
            
            }
        
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function(){
                
                infoWindow.setContent(place.name);
                infoWindow.open(map, this);

            });
            return marker;

        }

        function clearResults(markers){
            for (var m in markers){
                markers [m].setMap(null)
            }
            markers = [];
        }

        google.maps.event.addDomListener(window, 'load', initialize);