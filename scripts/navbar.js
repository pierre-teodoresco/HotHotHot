document.querySelectorAll('.nav-content a').forEach(function(element) {
    element.addEventListener('click', function(event) {
        document.querySelectorAll('.nav-content .active').forEach(function (element) {
            element.removeAttribute('class');
        });

        document.querySelectorAll('section').forEach(function(element) {
            element.removeAttribute('class');
        });

        element.setAttribute('class', 'active');

        let S_sectionToDisplay = event.target.attributes.href.value.replace('#', '');
        document.getElementById(S_sectionToDisplay).setAttribute('class', 'active');
    })
})