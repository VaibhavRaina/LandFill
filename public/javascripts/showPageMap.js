
// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: campground.geometry.coordinates, // starting position [lng, lat]
//     zoom: 9, // starting zoom
// });

// new mapboxgl.Marker
//     .setLngLat(campground.geometry.coordinates)
//     .addTo(map)


// mapboxgl.accessToken = 'pk.eyJ1IjoidmFpYmhhdnJhaW5hIiwiYSI6ImNscWR1bXAxODBnNDMya21la3Fxam14bTMifQ.PDdQLPJDHDOeis3xWHlUTA';
// const map = new mapboxgl.Map({
// 	container: 'map', // container ID
// 	style: 'mapbox://styles/mapbox/streets-v12', // style URL
// 	center: [-74.5, 40], // starting position [lng, lat]
// 	zoom: 9, // starting zoom
// });

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'cluster-map',
	style: 'mapbox://styles/mapbox/streets-v12',  // stylesheet location
	center: campground.geometry.coordinates, // starting position [lng, lat]
	zoom: 10 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
	.setLngLat(campground.geometry.coordinates)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 })
			.setHTML(
				`<h3>${campground.title}</h3><p>${campground.location}</p>`
			)
	)
	.addTo(map)





// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
// 	container: 'map',
// 	style: 'mapbox://styles/mapbox/streets-v12',  // stylesheet location
// 	center: campground.geometry.coordinates, // starting position [lng, lat]
// 	zoom: 10 // starting zoom
// });

// new mapboxgl.Marker()
// 	.setLngLat(campground.geometry.coordinates)
// 	.setPopup(
// 		new mapboxgl.Popup({ offset: 25 })
// 			.setHTML(
// 				`<h3>${campground.title}</h3><p>${campground.location}</p>`
// 			)
// 	)
// 	.addTo(map)