import AppNavigation from "./lib/Observers/AppNavigation.js";
import NavBar from "./lib/Subjects/NavBar.js";

const navBar = new NavBar();
const navigation = new AppNavigation();

navBar.attach(navigation);