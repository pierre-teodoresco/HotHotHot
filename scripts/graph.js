/* Graphic usign Chart.js */

let abscisse = [];
let scaleNeeded = true;

function createGraph(){
    let ctx = document.getElementById("graph").getContext("2d");
    let options = {
        scales: {
            yAxes:
                {
                    suggestedMin: 10,
                    suggestedMax: 20
                }
        }
    }
    let config = {
        type: 'line',
        options: options
    }
    return new Chart(ctx, config);
}

function removeDataGraph(Graph){
    Graph.data.datasets.forEach((Data) => {
        Data.data.pop();
    });
    Graph.update();
}

function graphHistory(Graph){
    let TableHistory = getTempArray();
    sortByDate(TableHistory);

    let DataInt = [];
    let DataExt = [];

    TableHistory.forEach((Temp) => {
        if (Temp._sensor === "Intérieur"){
            DataInt.push(Temp._val);
        } else {
            DataExt.push(Temp._val);
        }
    });
    if (!scaleNeeded){
        abscisse.push(abscisse.length);
    }
    scaleNeeded = !scaleNeeded;
    Graph.options.scales.xAxes = {
        labels: abscisse
    }

    Graph.data = {
        datasets: [
            {
                label: 'Extérieur',
                backgroundColor: '#ff0000',
                data: DataExt
            },
            {
                label: 'Intérieur',
                backgroundColor: '#0033ff',
                data: DataInt
            }
        ]
    };
    Graph.update();
}
