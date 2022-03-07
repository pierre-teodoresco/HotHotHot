function pagination(maxPages) {
    let pages = maxPages;

    function init() {

    }
}

var maxPages = 10;
var totalPages = 1;
var currentPage = 0;

function pageSelector(event) {
    currentPage = parseInt(event.target.attributes.value.value);
    console.log('selecting page ', currentPage);
    displayPage();
}

function scanButtons() {
    document.getElementById('page-navbar').querySelectorAll('button')
        .forEach(function (element) {
                element.removeEventListener('click', pageSelector);
                element.addEventListener('click', pageSelector);
            }
        );
}
function displayPage() {
    document.getElementById('historic').querySelectorAll('tbody tr')
        .forEach(function (element) {
            element.setAttribute('class', 'hiddendiv');
        });

    let table = document.getElementById('historic').querySelector('tbody');

    table.children[0].removeAttribute('class');
    let start = 1 + currentPage * 5;
    let end = 1 + (1 + currentPage) * 5;
    for (let i = start; i < table.children.length && i < end; i++) {
        table.children[i].removeAttribute('class');
    }
}

document.getElementById('historic').querySelector('tbody')
    .addEventListener('DOMNodeInserted', function (event) {
        if (this.children.length > 1 + totalPages * 5) {
            ++totalPages;

            let templateButton = document.getElementById('page-button-template');
            let clonedButton = document.importNode(templateButton.content, true).querySelector('button');

            let pageNum = document.getElementById('page-buttons').children.length;

            clonedButton.innerText = pageNum + 1;
            clonedButton.value = pageNum;

            document.getElementById('page-buttons').append(clonedButton);

            scanButtons();
        }
        displayPage();
    });

scanButtons();