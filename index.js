import App from './mvc/App.js';

import Router from './mvc/Router.js';

import API from './mvc/API.js';

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

const sensorsView = () => `
    <p>Capteurs</p>
`;

const historicView = () => `
    <p>Historique</p>
`;

app.addComponent({
    name: 'sensors',
    model: {
        tab: ''
    },
    view(model) {
        return sensorsView();
    },
    async controller(model) {

    }
});

app.addComponent({
    name: 'sensors',
    model: {
        tab: ''
    },
    view(model) {
        return historicView();
    },
    async controller(model) {

    }
});

router.addRoute('sensors', '^#/sensors$');
router.addRoute('historic', '^#/historic$')