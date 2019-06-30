function initMap() {


  var initialPoint = {lat: 40.661, lng: -73.944};


  //'Perth, WA', 'Adelaide, SA'

  var originPoint //= 'Perth, WA';
  var destinationPoint //= 'Adelaide, SA';

  var numPassengers=2;
  const pricePerKm=1;
  var totalDistance;

  var markers = [];
  var labels = ['A','B']

  var checkTolls = false;

//here we keep points in array
  var origDestPoints = [];

  var infowindow0 = new google.maps.InfoWindow();
  var infowindow1 = new google.maps.InfoWindow();

  var infowindows = [infowindow0, infowindow1];

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

//set click event to input forms
  var place0=document.getElementById('input0');
  place0.addEventListener('click', function(e){
    e.preventDefault();
    setMarker(map, 'A', initialPoint, 0);
    checkThePointsAndShowTheRoute(directionsDisplay, directionsService);
    markers[0].addListener('dragend', function(){
      reverceGeocode(0, infowindow0);
      })
  }, {once:true}
  );

  var place1=document.getElementById('input1');
  place1.addEventListener('click', function(e){
    e.preventDefault();
    setMarker(map, 'B', initialPoint, 1);
      checkThePointsAndShowTheRoute(directionsDisplay, directionsService);
    markers[1].addListener('dragend', function(){
      reverceGeocode(1, infowindow1);
      })
  }, {once:true});

  var autocomplete0 = new google.maps.places.Autocomplete(
    document.getElementById('input0')
  );
  var autocomplete1 = new google.maps.places.Autocomplete(
    document.getElementById('input1')
  );

  autocomplete0.addListener('place_changed', function(){
    origDestPoints[0] = autocomplete0.getPlace().formatted_address;
    markers[0].setMap(null);
    geocodeAddress(0);

    checkThePointsAndShowTheRoute(directionsDisplay, directionsService);
  })

  autocomplete1.addListener('place_changed', function(){
    origDestPoints[1] = autocomplete1.getPlace().formatted_address;
    markers[1].setMap(null);
    geocodeAddress(1);
    checkThePointsAndShowTheRoute(directionsDisplay, directionsService);
  })
  //functions
  function reverceGeocode(id, infowindow){
    var infowindow = infowindows[id];
    var marker = markers[id];
    infowindow.close();

    var latlng = {
      lat: markers[id].getPosition().lat(),
      lng: markers[id].getPosition().lng( )
    };

    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': latlng}, function(results, status){
      var currentMarkerPosition;
      if (status === 'OK'){
        if (results[0]){
          currentMarkerPosition = results[0].formatted_address;
          infowindow.open(map, marker);
          infowindow.setContent(currentMarkerPosition);
          document.getElementById(place2html[id]).value=currentMarkerPosition;
          origDestPoints[id]=currentMarkerPosition;
          checkThePointsAndShowTheRoute(directionsDisplay, directionsService);
        }
        else{
          window.alert('No results found')
        }
      }
    })
    }
  function geocodeAddress(id){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': origDestPoints[id]}, function(results, status){
      if(status === 'OK'){
        var geocodedCoordsLat = results[0].geometry.location.lat();
        var geocodedCoordsLng = results[0].geometry.location.lng();
        var geocodedCoords = {lat: geocodedCoordsLat, lng: geocodedCoordsLng};

        setMarker(map, labels[id], geocodedCoords, id);

      }
    })
  }




  function checkThePointsAndShowTheRoute(directionsDisplay, directionsService){

    if (typeof(origDestPoints[0] && origDestPoints[1]) != 'undefined'){
      markers[0].setMap(null);
      markers[1].setMap(null);

      directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
      });
      displayRoute(directionsService, directionsDisplay);
    }
    else console.log('no points');
  }

  function displayRoute(service, display) {
    service.route({
      origin: origDestPoints[0],
      destination: origDestPoints[1],
      //waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
      travelMode: 'DRIVING',
      avoidTolls: checkTolls
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
      origDestPoints[0] = myroute.legs[0].start_address;
      origDestPoints[1] = myroute.legs[i].end_address;
    }
    totalDistance = total / 1000;
    calculateAndShowPrice()

    document.getElementById('showInput0').innerHTML = origDestPoints[0];
    document.getElementById('showInput1').innerHTML = origDestPoints[1];

    document.getElementById('sendOrigin').value = origDestPoints[0];
    document.getElementById('sendDestination').value = origDestPoints[1];

    document.getElementById('total').innerHTML = totalDistance.toFixed(2) + ' km';
    document.getElementById('sendDistance').value = totalDistance.toFixed(2) + ' km';


    document.getElementById('input0').value = origDestPoints[0];
    document.getElementById('input1').value = origDestPoints[1];
  }

  function calculateAndShowPrice(){
    currentPrice = totalDistance*numPassengers*pricePerKm;
    $("#price").html(currentPrice.toFixed(2) + ' EUR');
    $("#sendPrice").val(currentPrice.toFixed(2) + ' EUR')
  }

  function setMarker(map, label, position, id){
    var marker = new google.maps.Marker({
      position: position,
      label: label,
      draggable: true,
      map: map
    });
    markers[id] = marker;
    reverceGeocode(id, infowindows);

  }




  $('#clearInput0').click(function(){
    $('#input0').val('');
  })

  $('#clearInput1').click(function(){
    $('#input1').val('');
  })

  //set datetimepicker
  $('#datetimepicker').datetimepicker({
    step:15,
    minDate:0,
    format: 'd.m.Y H:i'
  });

  //checkTollRoads
  $('#checkTollRoads').change(function(){
    checkTolls = $(this).prop('checked');
    checkThePointsAndShowTheRoute(directionsDisplay, directionsService);
    $("#tollRoadAlert").toggle("fold", 2000);
    if(checkTolls){
      $("#sendTollAlert").val('No road toll expected');
      $("#sendCheckTolls").val(checkTolls)
    }
    else{
      $("#tollRoadAlert").show();
      $("#sendTollAlert").val('Additional charges coud be');
      $("#sendCheckTolls").val(checkTolls)
    }
  })

  $('#countPassangers').change(function(){
    numPassengers = $(this).val();
    calculateAndShowPrice();
    $("#sendCountPass").val(numPassengers);
  })

  $('#datetimepicker').change(function(){
    var currentValue = $(this).val();
    $("#sendDatetimepicker").val(currentValue);
  })

  $('#names').keyup(function(){
    var currentValue = $(this).val();
    $("#sendName").val(currentValue);
  })

  $('#comments').keyup(function(){
    var currentValue = $(this).val();
    $("#sendComments").val(currentValue);
  })

  $('#email').keyup(function(){
    var currentValue = $(this).val();
    $("#sendEmail").val(currentValue);
  })

  $('#mobile').keyup(function(){
    var currentValue = $(this).val();
    $("#sendMobile").val(currentValue);
  })

//send request to insert.php

  $("#sendRequest").submit(function(event){
    event.preventDefault();

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: new FormData(this),
      contentType: false,
      processData: false,
      success: function(data, status){
        $('#makePurchase').modal('hide');
        $('#showResult').modal('show');
        $('#purchaseNumber').html(data);
      }
    })
  })














}
