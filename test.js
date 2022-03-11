const temps = {
    "HotHotHot": "Api v1.0",
    "capteurs": [
        {
            "type": "Thermique",
            "Nom": "interieur",
            "Valeur": "16.4",
            "Timestamp": 1647027314
        },
        {
            "type": "Thermique",
            "Nom": "exterieur",
            "Valeur": "100.3",
            "Timestamp": 1647027314
        },
        {
            "type": "Thermique",
            "Nom": "interieur",
            "Valeur": "100.4",
            "Timestamp": 1647027314
        },
        {
            "type": "Thermique",
            "Nom": "exterieur",
            "Valeur": "10.3",
            "Timestamp": 1647027314
        }
    ]
}



const sortedTemps = temps.capteurs.sort(function (a, b) {
    return a.Valeur - b.Valeur;
})

const intTemps = sortedTemps.filter(temp => temp.Nom === 'interieur');

const extTemps = sortedTemps.filter(temp => temp.Nom === 'exterieur');

const highestExtTemp = extTemps[extTemps.length - 1];
const lowestExtTemp = extTemps[0];

const highestIntTemp = intTemps[intTemps.length - 1];
const lowestIntTemp = intTemps[0];