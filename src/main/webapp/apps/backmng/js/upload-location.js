$(function(){
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpcGFuIiwiYSI6ImQxYThhYjBjM2YwM2Q5NTcxYTU2OWU0M2VkZThiMDFiIn0.i1hln_x7R3N_qCNkE9v2IA';
  var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
  center: [120, 30], // starting position
  zoom: 9 // starting zoom

  });

  map.on('click',function(e){
    var lngLat=e.lngLat;
    $.post('eers/location',{latitude:lngLat.lat,longitude:lngLat.lng,address:'杭州市西湖区'});

  })
})
