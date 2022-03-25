import AppNavigation from "./lib/Observers/AppNavigation.js";
import NavBar from "./lib/Subjects/NavBar.js";
import Sensors from "./lib/Subjects/Sensors.js";
import SensorsDisplay from "./lib/Observers/SensorsDisplay.js"
import HistoricDisplay from "./lib/Observers/HistoricDisplay.js"
import Pagination from "./lib/Observers/Pagination.js"

/*
    Subjects
 */
const navBar = new NavBar();
const sensors = new Sensors();

/*
    Observers
 */
const navigation = new AppNavigation();
const sensorsDisplay = new SensorsDisplay();
const historicDisplay = new HistoricDisplay();
const pagination = new Pagination();
/*
 * Binding stuff
 */
navBar.attach(navigation);
sensors.attach(sensorsDisplay);
sensors.attach(historicDisplay);
sensors.attach(pagination);