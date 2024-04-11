const quantityInput = document.getElementById('quantity');
const addButton = document.getElementById('addButton');
const subtractButton = document.getElementById('subtractButton');

addButton.addEventListener('click', () => {
    increaseQuantity();
});

subtractButton.addEventListener('click', () => {
    decreaseQuantity();
});

function increaseQuantity() {
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
}

function decreaseQuantity() {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
}
// Fonction pour afficher ou cacher le popup
function togglePopup() {
    let popup = document.getElementById('popup');
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'block';
    }
}

// Fermer le popup lorsque l'utilisateur clique en dehors de celui-ci
window.onclick = function(event) {
    let popup = document.getElementById('popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}


// onglets
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}


document.addEventListener('click', function(event) {
    var button = document.querySelector('.button');
    if (!button.contains(event.target)) {
        button.classList.remove('active');
    }
});

document.querySelector('.button').addEventListener('click', function() {
    this.classList.toggle('active');
});


// valeur de la commande 
function copierValeur() {
    const quantity= document.getElementById('quantity');
    const prix = document.querySelector('.prixInit');
    const pan = document.getElementById('totalPrice').innerHTML=quantity.value*prix.value;
    // const prixtot = document.getElementById('totalbuy').innerHTML = quantity.value ;
}

copierValeur()