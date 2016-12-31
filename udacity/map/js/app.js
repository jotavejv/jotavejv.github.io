function init() {

    document.querySelector('.loading').classList.add('hide');

    var settings = {
        iconMapDefault: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=.75|0|FFFFFF|20|_|%E2%80%A2',
        iconMapActive: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=.75|0|20b2aa|20|_|%E2%80%A2',
        styles: [{
            featureType: 'water',
            stylers: [{
                color: '#19a0d8'
            }]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#ffffff'
            }, {
                weight: 6
            }]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#e85113'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#efe9e4'
            }, {
                lightness: -40
            }]
        }, {
            featureType: 'transit.station',
            stylers: [{
                weight: 9
            }, {
                hue: '#e85113'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
                lightness: 100
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                lightness: -100
            }]
        }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{
                visibility: 'on'
            }, {
                color: '#f0e4d3'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{
                color: '#efe9e4'
            }, {
                lightness: -25
            }]
        }],
        places: [{
            name: 'Bazar da Cerveja',
            lat: -31.766379,
            lng: -52.336546,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'O Bazar da Cerveja chegou em Pelotas para apresentar a você cervejas especiais. Abrimos de segunda à quinta das 19 às 1h, e sexta à sábado das 19 às 1h.'
        }, {
            name: 'Bierlager',
            lat: -31.760124,
            lng: -52.339059,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'Loja especializada em cervejas artesanais e importadas, e tudo que envolve a Cultura Cervejeira. Rua General Osorio, 1246 / Fone: (53) 3305-9193'
        }, {
            name: 'Empório Gelei',
            lat: -31.760777,
            lng: -52.317916,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'Uma nova experiência. Aprecie.'
        }, {
            name: 'Madre Mia',
            lat: -31.767852,
            lng: -52.337067,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'Somos uma fusão de bar, restaurante, galeria de arte e espaço cultural. Resumimos isso em resto arte.'
        }, {
            name: 'Café 35',
            lat: -31.742716,
            lng: -52.331752,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'Nossos cafés são de alto nível provenientes das mais nobres regiões produtoras do Brasil. Os grão são selecionados de forma artesanal com um alto padrão de qualidade para que o seu momento de vivenciar um café, seja perfeito. Nosso mestre de torra escolherá o melhor ponto para cada safra, enaltecendo ainda mais os atributos do grão.'
        }, {
            name: 'Casa Bender',
            lat: -31.753594,
            lng: -52.337154,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'Produtos gastronômicos / Volta ao passado/ Cerveja Artesanal.'
        }, {
            name: 'Bud Bar',
            lat: -31.758024,
            lng: -52.335448,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'Bar, Restaurante, Choperia, HappyHour, Petisqueira e Parrilla'
        }, {
            name: 'Johnnie Jack',
            lat: -31.771526,
            lng: -52.340815,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'American bar e hamburgueria artesanal, culinária tex mex e cervejas e drinks artesanais. O rock\'n\'blues fecha a experiência com apresentações ao vivo.'
        }, {
            name: 'Gelei',
            lat: -31.759845,
            lng: -52.342334,
            imgSrc: "http://maps.googleapis.com/maps/api/streetview?size=200x125&heading=100&location=",
            description: 'Se a sua comemoração não tem hora para acontecer, você pode contar com a Gelei que dispõe de uma loja aberta 24h, onde estão disponíveis as principais marcas de bebidas, na temperatura certa para o consumo, todos os dias da semana.'
        }]
    }

    // Constructor for Places
    var Place = function(data) {
        this.name = data.name;
        this.lat = data.lat;
        this.lng = data.lng;
        this.imgSrc = data.imgSrc + data.lat + ',' + data.lng;
        this.description = data.description;
    };

    // Initialize ViewModel Knockout
    var ViewModel = function() {
        var that = this;

        // Set location list observable array from places
        this.placeList = ko.observableArray([]);
        // Get value from search field.
        this.search = ko.observable('');

        // Make place object from each item in location list then push to observable array.
        settings.places.forEach(function(item) {
            this.placeList.push(new Place(item));
        }, this);

        // Initial current location to be the first one.
        this.currentPlace = ko.observable(this.placeList()[0]);

        // Functions invoked when user clicked an item in the list.
        this.setPlace = function(clickedPlace) {

            // Set current location to which user clicked.
            that.currentPlace(clickedPlace);

            // Find target of the clicked location and store for use in activation of marker.
            var target = that.filteredItems().indexOf(clickedPlace);

            // Prepare content for Google Maps infowindow
            that.updateContent(clickedPlace);

            // Activate the selected marker to change icon.
            // function(marker, context, infowindow, target)
            that.activateMarker(that.markers[target], that, that.infowindow)();

        };

        // Filter location name with value from search field.
        this.filteredItems = ko.computed(function() {
            var searchTerm = that.search().toLowerCase();
            if (!searchTerm) {
                return that.placeList();
            } else {
                return ko.utils.arrayFilter(that.placeList(), function(item) {
                    // return true if found the typed keyword, false if not found.
                    return item.name.toLowerCase().indexOf(searchTerm) !== -1;
                });
            }
        });

        // Initialize Google Maps
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { // first place of array
                lat: settings.places[0].lat,
                lng: settings.places[0].lng
            },
            zoom: 15,
            styles: settings.styles,
            mapTypeControl: false,
            streetViewControl: false
        });

        // Initialize markers
        this.markers = [];

        // Initialize infowindow
        this.infowindow = new google.maps.InfoWindow({
            maxWidth: 320
        });

        // Render all markers with data from the data model.
        this.renderMarkers(that.placeList());

        // Subscribe to changed in search field. If have change, render again with the filtered locations.
        this.filteredItems.subscribe(function() {
            that.renderMarkers(that.filteredItems());
        });

        // Add event listener for map click event (when user click on other areas of the map beside of markers)
        google.maps.event.addListener(that.map, 'click', function(event) {

            // Every click change all markers icon back to defaults.
            that.deactivateAllMarkers();

            // Every click close all indowindows.
            that.infowindow.close();
        });

        // reset marker
        google.maps.event.addListener(that.infowindow, 'closeclick', function() {
            that.deactivateAllMarkers();
        });
    };

    // Method for render all markers.
    ViewModel.prototype.renderMarkers = function(arrayInput) {

        var infowindow = this.infowindow;
        var context = this;
        var placeToShow = arrayInput;

        // Create new marker for each place in array and push to markers array
        for (var i = 0, len = placeToShow.length; i < len; i++) {
            var location = {
                lat: placeToShow[i].lat,
                lng: placeToShow[i].lng
            };
            var marker = new google.maps.Marker({
                position: location,
                map: this.map,
                icon: settings.iconMapDefault,
                animation: google.maps.Animation.DROP
            });

            this.markers.push(marker);

            //render in the map
            this.markers[i].setMap(this.map);

            // add event listener for click event to the newly created marker
            marker.addListener('click', this.activateMarker(marker, context, infowindow, i));
        }
    };

    // Set all marker icons back to default icons.
    ViewModel.prototype.deactivateAllMarkers = function() {
        var markers = this.markers;
        for (var i = 0; i < markers.length; i++) {
            markers[i].setIcon(settings.iconMapDefault);
            markers[i].setAnimation(null); // disable animation

        }
    };

    // Set the target marker to change icon and open infowindow
    // Call from user click on the menu list or click on the marker
    ViewModel.prototype.activateMarker = function(marker, context, infowindow, target) {
        return function() {

            // check if have an target. If have an target mean request come from click on the marker event
            if (!isNaN(target)) {
                var place = context.filteredItems()[target];
                context.updateContent(place);
            }
            // closed opened infowindow
            infowindow.close();

            // deactivate all markers
            context.deactivateAllMarkers();
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }

            // Open targeted infowindow and change its icon.
            infowindow.open(context.map, marker);
            marker.setIcon(settings.iconMapActive);
        };
    };

    // Change the content of infowindow
    ViewModel.prototype.updateContent = function(place) {
        var html = '<div class="info-content">' +
            '<h3>' + place.name + '</h3>' +
            '<img src="' + place.imgSrc + '">' +
            '<p>' + place.description + '</p>' + '</div>';

        this.infowindow.setContent(html);
    };


    // Initialize Knockout View Model
    ko.applyBindings(new ViewModel());

};
