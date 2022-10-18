const TotalProductos = [
    { id: 1, nombre: "Runfalcon", precio: 233000, cantidad: 5, descripcion: "Chimba de pisos 1", img: "./img/pisos1.png" },
    { id: 2, nombre: "Forum Low", precio: 422000, cantidad: 3, descripcion: "Chimba de pisos 2", img: "./img/pisos2.png" },
    { id: 3, nombre: "Fluidstreet", precio: 305000, cantidad: 4, descripcion: "Chimba de pisos 3", img: "./img/pisos3.png" },
    { id: 4, nombre: "Hoops 2.0 Mid", precio: 233000, cantidad: 2, descripcion: "Chimba de pisos 4", img: "./img/pisos4.png" },
    { id: 5, nombre: "Terrex AX3", precio: 359000, cantidad: 6, descripcion: "Chimba de pisos 5", img: "./img/pisos5.png" },
    { id: 6, nombre: "Duramo SL", precio: 269000, cantidad: 3, descripcion: "Chimba de pisos 6", img: "./img/pisos6.png" },
    { id: 7, nombre: "Advantage Base", precio: 191000, cantidad: 4, descripcion: "Chimba de pisos 7", img: "./img/pisos7.png" },
    { id: 8, nombre: "Galaxar Run", precio: 332000, cantidad: 2, descripcion: "Chimba de pisos 8", img: "./img/pisos8.png" },
];

let shoppingCartArray = [];
let total = 0;
let productContainer = document.querySelector('.shop-items');
let totalElement = document.querySelector('.cart-total-title');

TotalProductos.forEach(product => {
    productContainer.innerHTML += `
    <div class="shop-item" id="${product.id}">
        <span class="shop-item-title">${product.nombre}</span>
        <img class="shop-item-image" src="${product.img}">
            <div class="shop-item-details">
                <span class="shop-item-price">$${product.precio}</span>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
    </div>`
});

let addBtns = document.querySelectorAll('.shop-item-button');
addBtns = [...addBtns];

let cartContainer = document.querySelector('.cart-items');

addBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{

        let actualID = parseInt(event.target.parentNode.parentNode.id);

        let actualProduct = TotalProductos.find(item => item.id == actualID);
        
        if(actualProduct.quantity === undefined){
            actualProduct.quantity = 1;
        }

        let existe = false
        shoppingCartArray.forEach(pisos => {
            if (actualID == pisos.id){
                existe = true
            }
        })

        if(existe){
            actualProduct.quantity++
        }else{
            shoppingCartArray.push(actualProduct)
        }

        drawItems()
        getTotal()
        updateNumberofItems()
        quitarItem()

    });
});

function getTotal(){
    let sumaTotal
    let total = shoppingCartArray.reduce( (sum, item)=>{
        sumaTotal = sum + item.quantity*item.precio
        return sumaTotal
    } , 0);
    
    totalElement.innerText = `TOTAL = $${total}`
}

function drawItems(){
    cartContainer.innerHTML = '';
    shoppingCartArray.forEach(item => {

    cartContainer.innerHTML += `
    <div class="cart-row">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.img}" width="100" height="100">
            <span class="cart-item-title">${item.nombre}</span>
        </div>
        <span class="cart-price cart-column">$${item.precio}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}" max="${item.cantidad}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    </div>`
    });
    quitarItem()
}

function updateNumberofItems(){
let inputNumber = document.querySelectorAll('.cart-quantity-input');
inputNumber = [...inputNumber];

inputNumber.forEach(item => {
    item.addEventListener('click', event=>{

        let actualZapatoNombre = event.target.parentElement.parentElement.childNodes[1].innerText;
        let actualZapatoQuantity = parseInt(event.target.value);
        let actualZapatoObject = shoppingCartArray.find(item => item.nombre == actualZapatoNombre)
        actualZapatoObject.quantity = actualZapatoQuantity;
        getTotal()
    });
});

}

function quitarItem(){
    let removeBtns = document.querySelectorAll('.btn-danger');
    removeBtns = [...removeBtns];
    removeBtns.forEach(btn => {
        btn.addEventListener('click', event=>{
            let actualZapatoNombre = event.target.parentElement.parentElement.childNodes[1].innerText;
            let actualZapatoObject = shoppingCartArray.find(item => item.nombre == actualZapatoNombre);
            shoppingCartArray = shoppingCartArray.filter(item => item != actualZapatoObject)
            drawItems();
            getTotal();
            updateNumberofItems();
        });
    });
}