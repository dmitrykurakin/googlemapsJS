function initMap() {


  var initialPoint = {lat: -24.345, lng: 134.46};


  //'Perth, WA', 'Adelaide, SA'

  var originPoint = 'Perth, WA';
  var destinationPoint = 'Adelaide, SA';

  var markers = [];
  var infowindow0 = new google.maps.InfoWindow();
  var infowindow1 = new google.maps.InfoWindow();

  var place2html = ['input0', 'input1'];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: initialPoint  // Australia.
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map,
    //panel: document.getElementById('right-panel')
  });
  console.log('hi');

  checkThePointsAndShowTheRoute(directionsDisplay, directionsService);

//set click event to input forms
  var place0=document.getElementById('input0');
  place0.addEventListener('click', function(e){
    e.preventDefault();
    setMarker(map, 'A', initialPoint, 0);
    markers[0].addListener('dragend', function(){
      reverceGeocode(0, infowindow0);
      })
  }, {once:true}
  );

  var place1=document.getElementById('input1');
  place1.addEventListener('click', function(e){
    e.preventDefault();
    setMarker(map, 'B', initialPoint, 1);
    markers[1].addListener('dragend', function(){
      reverceGeocode(1, infowindow1);
      })
  }, {once:true});




  //functions
  function reverceGeocode(id, infowindow){
    var marker = markers[id];
    infowindow.close();

    var latlng = {
      lat: markers[id].getPosition().lat(),
      lng: markers[id].getPosition().lng( )
    };
    console.log(latlng);
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': latlng}, function(results, status){
      var currentMarkerPosition;
      if (status === 'OK'){
        if (results[0]){

          currentMarkerPosition = results[0].formatted_address;
          infowindow.open(map, marker);
          infowindow.setContent(currentMarkerPosition);
          document.getElementById(place2html[id]).value=currentMarkerPosition;



        }
        else{
          window.alert('No results found')
        }
      }

    })
    }


  function checkThePointsAndShowTheRoute(directionsDisplay, directionsService){


    if (typeof(originPoint && destinationPoint) != 'undefined'){
      directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
      });
      displayRoute(directionsService, directionsDisplay);
    }
    else console.log('no points');
  }

  function displayRoute(service, display) {
    service.route({
      origin: originPoint,
      destination: destinationPoint,
      //waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }

  function setMarker(map, label, position, id){
    var marker = new google.maps.Marker({
      position: position,
      label: label,
      draggable: true,
      map: map
    });
    markers[id] = marker;

  }


}
