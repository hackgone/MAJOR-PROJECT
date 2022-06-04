var x=[];


var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');

  alert(`Latitude : ${crd.latitude}`);
  console.log(crd.latitude);
  x.push(crd.latitude);
  x.push(crd.longitude);
  //lat=${crd.latitude};
  alert(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  // document.getElementByID('long').value = ${crd.longitude};
  // document.getElementByID('lat').value = ${crd.latitude};
  // document.input.lati.value=${crd.latitude};
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
// var x;
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const pos = {
//         lat: position.coords.latitude,
//         x=lat;
//         lng: position.coords.longitude,
//       };
//
//       infoWindow.setPosition(pos);
//       infoWindow.setContent("YOU are HERE");
//       infoWindow.open(map);
//       map.setCenter(pos);
//     },
//     () => {
//       handleLocationError(true, infoWindow, map.getCenter());
//     }
//   );
// } else {
//   // Browser doesn't support Geolocation
//   handleLocationError(false, infoWindow, map.getCenter());
// }
// });
// }
// console.log(x);
console.log(x);
document.getElementById("n1").input = x[0];
document.getElementById("n1").input = 12345;
