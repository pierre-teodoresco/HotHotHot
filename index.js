import AppNavigation from "./lib/AppNavigation.js";
import NavBar from "./lib/NavBar.js";

const navBar = new NavBar();
const navigation = new AppNavigation();

navBar.attach(navigation);