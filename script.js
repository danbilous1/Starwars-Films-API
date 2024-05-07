let baseUrl = 'https://swapi.dev/api';
const container = document.querySelector('.container');

//first get list of movies
fetch(baseUrl + '/films/')
	.then(respond => respond.json())
	.then(data => {
		data.results.forEach(renderMovie)
	})

// fetch(baseUrl+'/planets/')
// .then(respond => respond.json())
// .then(data=>{
//   data.results.forEach(renderPlanets)
// })

//render every movie's title
function renderMovie(movie) {
	let movieDom = document.createElement('details');
	let summary = document.createElement('summary');
	summary.innerText = movie.title;
	let content = document.createElement('ul');
	movieDom.append(summary, content)

	container.append(movieDom);

	movieDom.addEventListener('click', function() {
		// console.log(movie.planets);
		if (movie.planets.length > content.childNodes.length) {
			movie.planets.forEach(async planet => {
				// fetch(planet)
				// 	.then(respond => respond.json())
				// 	.then(data => {
				// 		renderPlanet(data, content);
				// 	})

        let data = await memorizePlanetRequest(planet);
						renderPlanet(data, content);
			})
		}
	})
}

let planetsCache = {
	
}
// async function memorizePlanetRequest(planet){
// 	if (planet in planetsCache){
// 		return planetsCache[planet]
// 	}else{
// 		return await fetch(planet)
// 		.then(respond => respond.json())
// 		.then(data => {
// 			planetsCache[planet] = data;
// 			return planetsCache[planet]
// 		})
// 	}
// }

function memorizePlanetRequest(planet) {
    return new Promise((resolve, reject) => {
        if (planet in planetsCache) {
            resolve(planetsCache[planet]);
        } else {
            fetch(planet)
                .then(respond => respond.json())
                .then(data => {
                    planetsCache[planet] = data;
                    resolve(planetsCache[planet]);
                })
            .catch(error => {
              reject(error);
          });
        }
    });
}

//once click on movie, get every planet 
function renderPlanet(planet, container) {
	//container??
	let planetDom = document.createElement('li');
	planetDom.innerText = planet.name;
	container.append(planetDom);
}
