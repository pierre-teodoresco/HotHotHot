/* ************************************************* */
async function fetchTemperatures(url) {
    let response = await fetch(url);

    return await response.json();
}

let interval = setInterval(function () {
    fetchTemperatures("https://hothothot.dog/api/capteurs/exterieur").then(function (data) {
        let temperatures = JSON.parse(localStorage.getItem('temperatures'));

        !temperatures ? temperatures = data : temperatures.push(data);

        if (! localStorage)
            localStorage.setItem('temperatures', '[]');

        localStorage.setItem('temperatures', JSON.stringify(temperatures));
    });

}, 10000)


