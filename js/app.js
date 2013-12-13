
var localizacoes = [
    ["D'luck", "Av. Duarte de Silveira, 497 - Centro/Torre, João Pessoa - PB", "(83) 3222-3333", -7.121682, -34.873694],
    ["Aliança Center", "R. Osíris de Belli, nº 255, Cabo Branco, João Pessoa - PB", "(83) 3247-5105", -7.127908, -34.825691],
    ["Telma Noivas", "Av. Alm. Barroso, 566 - João Pessoa", "(83) 3221-0306", -7.120609, -34.873466],
    ["ELEGANCE ALUGUEL DE ROUPAS", "Av. Maranhão, 150 - Bairro dos Estados - João Pessoa", "(83) 3243-1532",-7.118547, -34.855236],
    ["Salve Simpatia", "Av. Pres. Epitácio Pessoa, 4940 - Cabo Branco - João Pessoa", "(83) 3226-4347",-7.119653, -34.826306]
];

var map = null;


function initialize() {
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(-7.1494772, -34.8821035)
    };

    map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

    lerLocalizacoes();
}

function lerLocalizacoes(){
    for (var i = 0; i < localizacoes.length; i++) {

        var titulo = localizacoes[i][0],
            endereco = localizacoes[i][1],
            telefone = localizacoes[i][2],
            lat = localizacoes[i][3],
            lng = localizacoes[i][4];

        var posicao = new google.maps.LatLng(lat,lng);

        // Adiciona um novo Marcador passando como parâmetros:
        // Posição (Objeto LatLong), Título, Endereco, Telefone
        adicionarMarcador(posicao, titulo, endereco, telefone);
    }
}


function adicionarMarcador(localizacao, titulo, endereco, telefone){
    var marker = new google.maps.Marker({
        position: localizacao,
        map: map,
        title: titulo
    });

    // Adiciona uma nova caixa de mensagem passando como parâmetros:
    // Marcador (Objeto Marker), Título, Endereço, Telefone
    adicionarCaixaMensagem(marker, titulo, endereco, telefone);
}


function adicionarCaixaMensagem(marcador, titulo, endereco, telefone) {
    var infowindow = new google.maps.InfoWindow({
        content:'<div>'+
                    '<h6>'+titulo+'</h6>'+
                    '<address>'+
                        '<strong>Endereço:</strong> '+endereco+'<br>'+
                        '<strong>Telefone:</strong> '+telefone+
                    '</address>'+
                '</div>'
    });

    google.maps.event.addListener(marcador, 'click', function() {
        infowindow.open(map, marcador);
    });
}


function adicionarMarkerGeolocalizacao(){
    var titulo = document.forms["addMarker"]["titulo"].value,
        endereco = document.forms["addMarker"]["endereco"].value,
        telefone = document.forms["addMarker"]["telefone"].value;

    encontrarPosicaoGeolocalizacao(titulo, endereco, telefone);
}


function encontrarPosicaoGeolocalizacao(titulo, endereco, telefone){
    var geocoder = new google.maps.Geocoder(),
        address = endereco;

    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // Centraliza o mapa com a posição resultante da Geolocalização
            map.setCenter(results[0].geometry.location);

            // Adiciona um novo Marcador passando como parâmetros:
            // Posição (Objeto LatLong), Título, Endereco, Telefone
            adicionarMarcador(results[0].geometry.location, titulo, endereco, telefone);

        } else {
            alert("Não conseguimos encontrar sua localização, : " + status);
        }
    });
}


google.maps.event.addDomListener(window, 'load', initialize);


function carregouPagina(){
    document.getElementById("mapa").style.height = (document.body.clientHeight-30)+"px";
}
