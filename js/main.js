

let wow = new WOW(
        {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    }  
    ) 


$('.explain-row').hover(function() {
    $('.explain-row').toggleClass('active');
});
$('.explain-row-2').hover(function() {
    $('.explain-row-2').toggleClass('active');
});
$('.explain-row-3').hover(function() {
    $('.explain-row-3').toggleClass('active');
});


new WOW().init();

(function($) {
    //Global variables
    var markersCluster = {};
    var map;
    var icons = {};
    var gLocalSearch;
    var currentLocalSearchStr;
    var serviceIcons = {};
    var serviceIcons_map = {};
    //var serviceIconPath = '/modules/gmapSearch2/icons_small';
    var serviceIconPath = '/modules/pre_construction_condo/icons'; 
    var panorama;
    //queue for searches
    var searchQueue =[];
    var map2;
    var markersStorage_map = {};
    var markersStorage = {};
    var icons2 = {};
    var currentLocalSearchStr2;
    var panorama2;
    var myPano;
    //var infowindow = new google.maps.InfoWindow({content: '',maxWidth: 275});
    var marker;
    var condo_landing = {};
    var currentMarker = null;
    var markers = [];
    
    function CustomMarker(latlng, map, args) {
      this.latlng = latlng; 
      this.args = args; 
      this.setMap(map);
      this.title = args.title;
      //this.setTitle(args.title);  
    }
    
    //CustomMarker.prototype = new google.maps.OverlayView();
    
    CustomMarker.prototype.draw = function() {
      
      var self = this;
      
      var div = this.div;
      
      if (!div) {
      
        div = this.div = document.createElement('div');
        
        div.className = 'marker property';
        div.setAttribute("title", self.args.title);
        
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        div.style.width = '20px';
        div.style.height = '20px';
        
        if (typeof(self.args.marker_id) !== 'undefined') {
          div.dataset.marker_id = self.args.marker_id;
        }
        google.maps.event.addDomListener(div, "click", function(event) {
          google.maps.event.trigger(self, "click");
        });
        
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
      }
      
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      
      if (point) {
        div.style.left = (point.x - 10) + 'px';
        div.style.top = (point.y - 20) + 'px';
      }
    };
    
    CustomMarker.prototype.remove = function() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      } 
    };
    
    CustomMarker.prototype.getPosition = function() {
      return this.latlng; 
    };
    
    $.fn.isOnScreen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
    
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
    
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };
    
    function howDoesAnimation(){
      $('.hw-explain.reasons-animation').each(function(){
        $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
            function(e) {
            $(this).addClass('animation-done');
              if($(this).hasClass('first')){
                $("<style type='text/css'> .how-work .hw-number.animate.second:before{ opacity:1;} </style>").appendTo("head");
              }
              if($(this).hasClass('fourth')){
                $("<style type='text/css'> .how-work .hw-number.third:after{ opacity:1;}  </style>").appendTo("head");
              }
          });
      });
        $('.hw-number.reasons-animation p').each(function(){
        $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
            function(e) {
            $(this).closest('.hw-number').addClass('animation-done');
              if($(this).closest('.hw-number').hasClass('second')){
                $("<style type='text/css'> .how-work .hw-number.second:after{ opacity:1;} </style>").appendTo("head");
              }
              if($(this).closest('.hw-number').hasClass('third')){
                $("<style type='text/css'> .how-work .hw-number.third:before{ opacity:1;} </style>").appendTo("head");
              }
              if($(this).closest('.hw-number').hasClass('fifth')){
                $("<style type='text/css'> .how-work .hw-number.fifth:before{ opacity:1;} </style>").appendTo("head");
              }
          });
      });
      $('.reasons-animation').addClass('animate'); 
    }
    
    $(document).ready(function() {
      $('.back-to-map a').click(function(e){e.preventDefault();$('.form-wrapper').hide();});
      $(".disclaimer-floating").hover(
          function () {
            $('.disclaimer-content').addClass("show");
          },
          function () {
            $('.disclaimer-content').removeClass("show");
          }
      );
        $('.how-work .explain-row > div').hover(function(){
          $('.how-work .explain-row.active').removeClass('active');
          $($(this)).closest('.explain-row').addClass('active');
        });
        $(window).scroll(function(){
                if ($('.features-columns').isOnScreen() && $('.features-columns .count-done').length < 1) { 
                        $('.counter').each(function() {
                                var $this = $(this);
                                var countTo = $this.attr('data-total');
                                $({ countNum: $this.text()}).animate({
                                            countNum: countTo
                                        },
                                        {
                                            duration: 1000,
                                            easing:'linear',
                                            step: function() {
                                                    $this.text(Math.floor(this.countNum));
                                            },
                                            complete: function() {
                                                    $this.text(this.countNum);
                                                    $this.addClass('count-done');
                                            }
                                        });  
                        });
                };
                if ($('.why-use > .container .content-row').isOnScreen() && $('.why-use > .container .content-row .reason-item.show-reason').length < 1){
                         $('.why-use > .container .content-row .reason-item').each(function(index){
                               var that = this;
                               var t = setTimeout(function() { 
                                    $(that).addClass("show-reason"); 
                               }, 500 * index);   
                         });
                }
                if ($('.how-work .container .row:nth-child(2)').isOnScreen() && $('.how-work.animated').length < 1) {
                         howDoesAnimation();
                }
        });
        $('.results-popup-closer').click(function(e){
          e.preventDefault();
          $('.message-number-found').slideUp('300');
        });
        
        //Transfering from pre-con page
        $('.open_amenities,.open_controls').each(function(){
        $(this).click(function(){
          $(this).parent().toggleClass('expand');     
          if($(this).parent().hasClass('map_tools') && $(this).parent().hasClass('expand')) {
            $('.map_controls').removeClass('expand');
          }else if($(this).parent().hasClass('map_controls') && $(this).parent().hasClass('expand')) {
            $('.map_tools').removeClass('expand');
          }
        });
      });
        var drip_group_option_selected = $(".drip-group-container input[name='edit[drip_group]']:checked").val();
        var typingTimer;                //timer identifier
        var doneTypingInterval = 1000;  //time in ms, 1 second for example
        var $input = $('#edit-email, #edit-fname');
        $("#edit-email").allchange(function () {//$input.on('keyup', function () {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        });
        var map;
        var circle;
        var marker;
        if ($('.customimageUser').length !== 0) {
                var imgPath= $('.customimageUser img').attr("src");
                $('.customimageUser img').remove();
                $('.customimageUser').css("background","url('"+imgPath+"') center center / cover no-repeat");
        }
        // Call resize function above to resize input dynamically based on user input.
        $('.dh.step-2 .chosen-container-multi .chosen-choices li.search-field input[type=text]').keyup(resizeInput).each(resizeInput);
        //End of jQuery UI-specific functions

    });
    
    function recaptchaCallback() {
          if($('#hiddenRecaptcha').valid()){
                $('#hiddenRecaptcha').removeClass('required error');
          }
    };
    
    
    //Load Property Details lists
    
    var LoadPropertiesList = function (addrenss_var_str,map){
        var curBounds = map.getBounds();
        var township = (addrenss_var_str['township'] != undefined) ? addrenss_var_str['township'] : ''; 
        var params = "latNE=" + curBounds.getNorthEast().lat()+ "&latSW=" +curBounds.getSouthWest().lat()+ "&lngNE=" + curBounds.getNorthEast().lng() + "&lngSW="+curBounds.getSouthWest().lng();
        params=params+'&zoom_level='+map.getZoom()+'&latitude='+map.getCenter().lat()+'&longitude='+map.getCenter().lng();
        params=params+'&city='+addrenss_var_str['city']+'&township='+township;
        $.ajax ({
                dataType:"json",
                type:"POST",
                data:params,
                url:"/list/preconstructions",
                success: function(msg){
                        if(msg.markers.length > 0){
                                document.getElementById("prop-count-id").innerHTML = msg.markers.length;
                                document.getElementById("city-name-id").innerHTML = (addrenss_var_str['township'] != undefined) ? addrenss_var_str['township'] : addrenss_var_str['city'];
                                filterAddMarkers(msg.markers,map);
                                $('.message-number-found').addClass('show');
                                
                                $("#markerLayer div").click(function () {
                                  console.log($(this).attr("style"));
                                });
                        }
                }
        });
    };
    condo_landing.LoadPropertiesList = LoadPropertiesList;
    
    /* create markers for filter results*/
    function filterAddMarkers(newmarkers,map){
        var j,nids=[],marker,markerOptions;
        for (var i in newmarkers){
                if(marker = filterCreateMarker(newmarkers[i],map)){
                        markers.push(marker);
                }
        }
    
       var map_div = document.getElementById('map-div');
    
       setTimeout(function(){
          $(map_div).find(".gmnoprint").each(function() {
            try{
              var t = $(this).attr("title");
              var isMarker = t.match(/Address:/g);
              if (t != "" && isMarker != "" && !$(this).hasClass("gm-style-cc")) {
                $(this).addClass("property");
              }
            }
            catch(e) {}
          });
        }, 1000);
    
       google.maps.event.addDomListener(map_div, 'click', function(event) {
          // stop click reaction on another layers
            event.stopPropagation();
            if ($(event.target).hasClass("property")) {
            if (!$(event.target).hasClass("animate")) {
              $(event.target).addClass("animate");
            }
            currentMarker = $(event.target);
          }
          else {
            infowindow.close();
            $(currentMarker).removeClass("animate");
            $(currentMarker).addClass("viewed");
          }
          //console.log($(event.target).attr("class"));
          //console.log(event);
            // add also event to 3rd parameter for catching
            google.maps.event.trigger(self, 'click', event); 
        });
     
     var mcStyle =[
      {
        url: '',
        height: 18,
        width: 18
      },
      {
        url: '',
        height: 18,
        width: 18
      },
      {
        url: '',
        height: 18,
        width: 18
      }];
     
     var mcOptions = { gridSize: 35, maxZoom: 16,styles: mcStyle };
     markerCluster = new MarkerClusterer(map, markers,mcOptions);
    }
    
    /* create marker for Property Filter results */
    function filterCreateMarker(m,map) {
        var lat= m.latitude;
        var long= m.longitude;
        
        if(markersStorage[lat] === undefined) {
        markersStorage[lat] = [];
      }
      if(markersStorage[lat][long] === undefined) {
          var latlng = new google.maps.LatLng(m.latitude, m.longitude);
          var image = {
              url : '/modules/pre_construction_condo/icons/home.svg',
              size : new google.maps.Size(18, 18),
              origin : new google.maps.Point(0, 0),
              shadow : '/modules/property/images/icon-shadow.png',
              shadowSize : new google.maps.Size(42, 35),
              anchor : new google.maps.Point(16, 37)
          };
          var title = (m.address != "") ? m.address : "N/A";
         /* var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              icon : image,
              optimized:false,
              title: "Address: "+title,
          }); */
           var marker = new CustomMarker(latlng, map, {title: "Address: "+title, });
          
           google.maps.event.addListener(marker, "click", function(e) {
             if($( window ).width()< 768){
               $('.precon .precon-form-wrapper .col-md-6.form-wrapper').show();
             }
             else{  
               infowindow.setContent ('<div class="bubbletopleft"></div><div class="bubbletop"></div><div id="BubbleInfo"><div class="bubble-vip"><span><strong>Free</strong>VIP Account Required</span></div><div class="UploadingNow ajaxLoadingWaitMessage"><span style:"display:none;">loading...</span></div></div><div class="bubblebottomleft"></div><div class="bubblebottom"></div><div class="bubblebottomright"></div><div class="bubblebeak"></div>');
               infowindow.open( map,marker);
               filterLoadPropertyInfo(m, map, marker, infowindow); 
             }
             if (currentMarker != null) {
                if ($(currentMarker).hasClass("animate") && !$(currentMarker).hasClass("viewed")) {
                    $(currentMarker).removeClass("animate");
                $(currentMarker).addClass("viewed");
            }
             }
          });
          markersStorage[lat][long] = marker;
          return marker;
       }
       return false;
    }
    
    /* Load Property(ies) information from server */
    function filterLoadPropertyInfo(m, map, marker, infowindow){
        var params;
        params = "nid=" + m.nid;
        $.ajax ({
                dataType:"json",
                type:"POST",
                data:params,
                url:"/precondo/detail",
                success: function(msg){
                       infowindow.close();
                       var info_win_content = document.createElement('div');
                       //info_win_content.innerHTML = '<div class="bubbletopleft"></div><div class="bubbletop"></div><div id="BubbleInfo">'+msg.html+'</div></div><div class="bubblebottomleft"></div><div class="bubblebottom"></div><div class="bubblebottomright"></div><div class="bubblebeak"></div>';
                       infowindow.setContent(msg.html);
                       infowindow.open(map,marker);
                       //$(".gm-style-iw").next("div").hide();
                       //$(".gm-style-iw").parent().css({"max-width":"305px"});
                       //$(".gm-style-iw").parent().children("div:nth-child(1)").children().css({"max-width":"305px", "border-right":"1px solid #c4c4c3"});
                },
                error:function (xhr, ajaxOptions, thrownError){
                       //alert(xhr.status);
                       //alert(thrownError);
                } 
        });
    };
    
    function set_address_form_fields_values(address_vars) {
        $("#edit-address_values").val(JSON.stringify(address_vars));
    }
    
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }
    
    function deleteCookie(name) {
        setCookie(name,"",-1);
    }
    
    function  create_lead_request(email,name_field,last_name,time,form_id,ajax_done){
        var url = encodeURIComponent(window.location.href);
        var location = JSON.parse($("#edit-address_values").val());
        var search_location = location.city+', '+location.province+', '+location.country;
        $.ajax({
                dataType:"html",
                type:"POST",
                url: '/create-lead/backend',
                data: 'lastnamefieldh='+last_name+'&email='+email+'&time='+time+'&form_id='+form_id+'&lead_id='+ajax_done+'&name='+name_field+'&url='+url+'&location='+search_location,
                success: function(msg){
                        if(msg){
                                $( "#edit-lead_creation_ajax_done" ).val(msg);
                        }
                },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                } 
        });
    }
    
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    
    function doneTyping () {
        var last_name = $.trim($( "#edit-lname" ).val());
        var name_field = $.trim($( "#edit-fname" ).val());
        var email_field = $.trim($( "#edit-email" ).val());
        if(email_field.length>0 && isEmail(email_field)) {
                var time=$( "#edit-lead_creation_backend" ).val();
                var form_id=$( "#edit-lead_creation_form_id" ).val();
                var ajax_done=$( "#edit-lead_creation_ajax_done" ).val();
                create_lead_request(email_field,name_field,last_name,time,form_id,ajax_done); 
        }
    }
    
    function resizeInput() {
        //If user has no input or choices
        if ( $(this).val().length <1 && $('.chosen-choices .search-choice').length < 1){
                $(this).removeAttr('size');
                $(this).removeAttr('style');
        }
        else if( $(this).val().length<1 ) { 
                //If user has a choice but no new input
                $(this).attr('size', 1); 
        }
        else if( $(this).attr("mw") > 0 ){
                var max_width = $(this).attr("mw");
                if( $(this).val().length < max_width ){
                        $(this).attr('size', $(this).val().length);
                }
                else{
                        $(this).attr('size', max_width);
                }
        }
        else{
                $(this).attr('size', $(this).val().length);
        }
    }
    
    $.fn.allchange = function (callback) {
        var me = this;
        var last = "";
        var infunc = function () {
                var text = $(me).val();
                if (text != last) {
                        last = text;
                        callback();
                }
                setTimeout(infunc, 100);
        };
        setTimeout(infunc, 100);
    };
    
    function validateEmail() {
        var email = $('#edit-email').val();
        if(!email.match(/\S+@\S+\.\S+/)){
              // Yay! valid
              return 0;
        }
        else{
              return 1;
        }      
    }      
    
    function validPhone() {
      var pattern = /^\(\d{3}\)\s*\d{3}(?:-|\s*)\d{4}$/;
      var phoneNo = $('#edit-phone').val();
      if (pattern.test(phoneNo)) {
          return true;
      }
      else {
        return false;
      }
    }
    
    var enableEnterKey = function (input) {
        /* Store original event listener */
        const _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;
        const addEventListenerWrapper = function(type, listener){
              if (type === "keydown") {
                    /* Store existing listener function */
                    const _listener = listener;
                    listener = function(event){
                          /* Simulate a 'down arrow' keypress if no address has been selected */
                          const suggestion_selected = document.getElementsByClassName('pac-item-selected').length > 0;
                          if (event.which === 13 && !suggestion_selected) {
                                event.preventDefault();
                                const e = JSON.parse(JSON.stringify(event));
                                e.which = 40;
                                e.keyCode = 40;
                                _listener.apply(input, [e]);
                          }
                          _listener.apply(input, [event]);
                    };
              }
              _addEventListener.apply(input, [type, listener]);
        };
        input.addEventListener = addEventListenerWrapper;
        input.attachEvent      = addEventListenerWrapper;
    };
    
    })(jQuery);
    