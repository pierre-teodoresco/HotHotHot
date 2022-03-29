import AppNavigation from "./lib/Observers/AppNavigation.js";
import NavBar from "./lib/Subjects/NavBar.js";
import Sensors from "./lib/Subjects/Sensors.js";
import SensorsDisplay from "./lib/Observers/SensorsDisplay.js"
import HistoricDisplay from "./lib/Observers/HistoricDisplay.js"
import Pagination from "./lib/Observers/Pagination.js"
import HistoricPageButtons from "./lib/Subjects/HistoricPageButtons.js";

/*
    Subjects
 */
const navBar = new NavBar();
const sensors = new Sensors();
const historicPageButtons = new HistoricPageButtons();
/*
    Observers
 */
const navigation = new AppNavigation();
const sensorsDisplay = new SensorsDisplay();
const historicDisplay = new HistoricDisplay();
const pagination = new Pagination(historicPageButtons);
/*
 * Binding stuff
 */
navBar.attach(navigation);
historicPageButtons.attach(pagination);
sensors.attach(sensorsDisplay);
sensors.attach(historicDisplay);
sensors.attach(pagination);