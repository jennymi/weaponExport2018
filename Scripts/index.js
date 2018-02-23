var countries;
var weapons = {"AF" : 50, "DZ" : 150};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    countries = JSON.parse(xhttp.response);

    for (var i = 0; i < countries.length; i++) {  
      Object.defineProperty(weapons, countries[i].code, {
         value: JSON.parse(countries[i].weapons),
         writable: true
    });
} console.log(weapons); }}
xhttp.open('GET', 'http://localhost:1137/map', true);
xhttp.send();

 var guns = {
   "AF": 50,
   "NO": 100,
   "DZ": 150,
   "US": 200,
};

console.log(guns);

var map = $(function(){
  $('#world-map').vectorMap({
      map: 'world_mill',
      series: {
        regions: [{
          // values: guns,
          values: weapons,
          scale: ['#64ff64', '#ff6464'],
          normalizeFunction: 'polynomial',
          legend: {
            title: 'Weapons',
            vertical: false,
      }}]},
      onRegionOver(e, code) {
        if (!(code in weapons))
          e.preventDefault();
      },
      onRegionTipShow: function(e, el, code){
        if (!(code in weapons))
          e.preventDefault();
      },
      onRegionClick(e, code) {
        if (code in weapons)
          alert(weapons[code] + 'k weapons to ' + code);
      },
  });
});