import App from '../lib/App.js';

import Router from '../lib/Router.js';

import API from '../lib/API.js';

const app = new App('#app');

const router = new Router(app);

const dogTemplate = (dog) => `
    <section>
        <a href="#/dogs/${dog.id}">
            <h3>${dog.name}</h3>
            <section>
               <figure>
                    <img height="128" src="${dog.url}" alt="${dog.name}"/>
                </figure>
                <p>${dog.description}</p>
            </section>
        </a>
    </section>
`;
/*
app.addComponent({
    name: 'dogs',
    model: {
        dogs: []
    },
    view(model) {
        return `
            <ul>
                ${model.dogs.map(dog => `<li>${dogTemplate(dog)}</li>`).join('')}
            </ul>
        `
    },
    async controller(model) {
        model.dogs = await API.getDogs();
    }
});

app.addComponent({
    name: 'dog',
    model: {
        dog: {}
    },
    view(model) {
        return dogTemplate(model.dog);
    },
    async controller(model) {
        model.dog = await API.getDog(router.params[1]);
    }
});
*/
const sensorsView = function (model) {
    return `
        <section>
            <h2 class="center">Capteurs</h2>
            <div class="row" style="padding-bottom: 20px;">
                <div class="flexbox">
                    <div class="col l6 s12 card no-padding" style="margin: 10px; max-width: 350px">
                        <div class="center-align">
                            <h4>Extérieur</h4>
                            <h1>50°C</h1>
                            <h5>Min: 50 | Max: 50</span></h5>
                        </div>
                    </div>
                    <div class="col l6 s12 card no-padding" style="margin: 10px; max-width: 350px">
                        <div class="center-align">
                            <h4>Intérieur</h4>
                            <h1>50°C</h1>
                            <h5>Min: 50 | Max:50></span></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
};

const historicView = () => `
    <p>Historique</p>
`;

app.addComponent({
    name: 'sensors',
    model: {
        temperature: {},
        temperatures: []
    },
    view(model) {
        return sensorsView();
    },
    async controller(model) {
        model.temperature = await API.getTemperatures(router.params[1]);
        model.temperatures = [];
    }
});

app.addComponent({
    name: 'historic',
    model: {
        temperatures: []
    },
    view(model) {
        return historicView(model.temperatures);
    },
    async controller(model) {
        model.dog = await API.getDog(router.params[1]);
    }
});

/*
router.addRoute('dogs', '^#/dogs$');
router.addRoute('dog', '^#/dogs/([0-9]+)$');
 */

router.addRoute('sensors', '^#/sensors$');
router.addRoute('historic', '^#/historic$')