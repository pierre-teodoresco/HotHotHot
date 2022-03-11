import App from './src/App.js';

import Router from './src/Router.js';

import API from './src/API.js';

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

router.addRoute('dogs', '^#/dogs$');
router.addRoute('dog', '^#/dogs/([0-9]+)$')