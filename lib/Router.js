class Router {
    constructor(app) {
        this.app = app;
        this.routes = [];
        window.addEventListener('hashchange', this.hashChange);
    }

    addRoute(name, path) {
        this.routes.push({
            name,
            path
        })
    }

    hashChange() {
        console.log(window.location.hash);
    }
}

export default Router;