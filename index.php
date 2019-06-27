<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Draggable Directions</title>

    <link rel="stylesheet" href="/style.css">

    <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    crossorigin="anonymous">
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">



  </head>
  <body>
    <div class="container-fluid border border-success">
      <div class="row">
        <div class="col-8">
          <div id="map"></div>
          <div id="inputs" class="col-3">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" id="checkTollRoads" class="custom-control-input">
              <label class='custom-control-label' for="checkTollRoads">Avoid toll roads</label>

            </div>
            <div>
              <input type="text" class="form-control mb-2" id="input0" placeholder="Type Origin">
            </div>
            <div>
              <input type="text" class="form-control mb-2" id="input1" placeholder="Type Destination">
            </div>


          </div>
       </div>
       <div class="col-4">
         <div id="right-panel">
           <p><h5>Route Info</h5></p>
           <div class="form-control mb-2 border border-success">
             <span id="showInput0">Origin Point</span>
           </div>
           <div class="form-control mb-2 border border-success">
             <span id="showInput1">Destination Point</span>
           </div>
           <div class="form-row mb-2">
             <div class="col-md">
               <span class="form-control border border-success" id="total">0 km</span>
             </div>
             <div class="col-md">
               <span class="form-control border border-success" id="price">0 EUR</span>
             </div>
           </div>
           <div class="input-group mb-2">
             <div class="input-group-prepend">
               <div class="input-group-text"><span class="fas fa-calendar-alt"></span></div>
             </div>
             <input type="text" id="datetimepicker" class="form-control border border-success" placeholder="Choose pickup date and time">
           </div>

           <div class="form-row">
             <div class="form-group col-3">
               <select class="custom-select border border-success" id="countPassangers">
                 <option value="1">1</option>
                 <option selected value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
              </select>
             </div>
             <div class="col-md">
               <input type="text" id="names" value="" class="form-control border border-success">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-5">
              <textarea id="comments" rows="5" cols="80" class="form-control border border-success"></textarea>
           </div>
           <div class="form-group col-7">
             <input type="email" id="email" placeholder="type your e-mail" class="form-control border border-success mb-2">
             <input type="text" id="mobile" placeholder="type your mobile" class="form-control border border-success mb-2">
             <button type="button" class="btn btn-primary btn-block" data-toggle='modal' data-target='#makePurchase'>Purchase</button>
           </div>
          </div>
         </div>
         <div class="alert alert-danger" role="alert" id="tollRoadAlert">
           <b>WARNING</b><br>There's a toll roads could be at the route.
         </div>
       </div>
      </div>
    </div>

    <!-- modal page-->

    <div class="modal fade" id="makePurchase" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">Purchase details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-bus fa-fw"></span></div>
              </div>
              <input type="text" id="sendOrigin" class="form-control border border-success"readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-bus fa-fw"></span></div>
              </div>
              <input type="text" id="sendDestination" class="form-control border border-success" value="123" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-ruler fa-fw"></span></div>
              </div>
              <input type="text" id="sendDistance" class="form-control border border-success" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-calendar-alt fa-fw"></span></div>
              </div>
              <input type="text" id="sendDatetimepicker" class="form-control border border-success" value="not filled" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-users fa-fw"></span></div>
              </div>
              <input type="text" id="sendCountPass" class="form-control border border-success" value="2" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-calendar-alt fa-fw"></span></div>
              </div>
              <input type="text" id="sendName" class="form-control border border-success" value="not filled" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-id-card fa-fw"></span></div>
              </div>
              <input type="text" id="sendComments" class="form-control border border-success" value="not filled" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-at fa-fw"></span></div>
              </div>
              <input type="text" id="sendEmail" class="form-control border border-success" value="not filled" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-phone-alt fa-fw"></span></div>
              </div>
              <input type="text" id="sendMobile" class="form-control border border-success" value="not filled" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-money-bill-alt fa-fw"></span></div>
              </div>
              <input type="text" id="sendTollAlert" class="form-control border border-success" value="not filled" readonly>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><span id="icon" class="fas fa-money-bill-alt fa-fw"></span></div>
              </div>
              <input type="text" id="sendPrice" class="form-control bg-warning" value="not filled" readonly>
            </div>

            <input type="hidden" id="sendCheckTolls" name="" value="false">





          </div>
          <div class="modal-footer">
            <div class="form-row">
              <div class="col-md">
                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="agreePersonal" required>
                  <label class="form-check-label" for="agreePersonal">I agree to perform personal data</label>
                </div>
                <div class="invalid-feedback">
                  Please accept the agreement<br>to perform personal data.
                </div>
             </div>


              <div class="col-md">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success" id="sendPurchase">Purchase</button>
              </div>
            </div>

        </div>
      </div>
    </div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/5078e3a3fb.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

    <script src="/javascript/js.js"></script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDIw602Ru-X0Z3cgayM4iwofbSmOSrObU&libraries=places&callback=initMap">
    </script>
  </body>
</html>
