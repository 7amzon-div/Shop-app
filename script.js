
// let product_name = document.getElementById("product_name");

// let special_price = document.getElementById("special_price");

// let quantity = document.getElementById("quantity");

// let table_quantity = document.getElementById("table_quantity");

// let increase = document.querySelector("#increase"); // +

// let decrease = document.querySelector("#decrease"); // -

// let delvary_btn = document.querySelector("#delvary_btn");

// let Delete = document.querySelector("#delete");


// function return_quan(){

// return qun_number = parseInt(quantity.textContent);

// }


// // console.log(special_price.textContent * return_quan());
// function increase_quantity(){

//     let current_quan = return_quan();

//     current_quan += 1;

//     quantity.textContent = current_quan;

//     table_quantity.textContent = quantity.textContent;

//     total_price.textContent = Number(special_price.value) * Number(return_quan());
// }

// function decrease_quantity(){

//     let current_quan = return_quan();

//     if(current_quan != 0){
        
//         current_quan -= 1;
//     };


//     quantity.textContent = current_quan;

//     table_quantity.textContent = quantity.textContent;

//     total_price.textContent = Number(special_price.value) * Number(return_quan());
// }







// // create product

// let dataPro;

// if (localStorage.product != null) {
//     dataPro = JSON.parse(localStorage.product);
// }else {
//     dataPro = [];
// };

// delvary_btn.onclick = function (g) {
    
//     var newPro = {
//         product_name: product_name.innerHTML,
//         special_price: special_price.value,
//         quantity: quantity.innerHTML,
//     };

//     dataPro.push(newPro);
//     localStorage.setItem('product', JSON.stringify(dataPro));

//     showData()
// };



// // read

// function showData() {
//     var table = "";
//     for (let i = 0; i < dataPro.length; i++) {
//         table += `
//         <tr>
//             <td>${i}</td>
//             <td>${dataPro[i].product_name}</td>
//             <td>${dataPro[i].special_price}</td>
//             <td>${dataPro[i].quantity}</td>
//             <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
//         </tr>
//         `
//     };
//     document.getElementById("tbody").innerHTML = table;
// };
// showData()


// // delete product

// function deleteData(i){
//     dataPro.splice(i,1);
//     localStorage.product = JSON.stringify(dataPro);
//     showData()
// };
// بيانات المنتجات
const products = [
    { image: "dishwashing_liquid_image.jpeg", name: "فيري", price: 20 },
    { image: "nescafe.webp", name: "نسكفيه", price: 2 },
    // يمكن إضافة منتجات أخرى هنا
];

// إنشاء الكروت ديناميكياً
function renderCards() {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; // تفريغ المحتوى السابق
    products.forEach((product) => {
        const cardHTML = `
        <div class="card">
            <div class="container">
                <img src="${product.image}" alt="">
                <div class="order_btn">
                    <p type="text" id="product_name">${product.name}</p>
                    <input type="number" id="special_price" value="${product.price}">
                    <p id="quantity">0</p>
                </div>
            </div>
            <div class="quantity_container">
                <button onclick="increase_quantity(this)" id="increase">+</button>
                <hr>
                <button onclick="decrease_quantity(this)" id="decrease">-</button>
            </div>
            <div class="delvary_btn_container">
                <button id="delvary_btn"><i class="fa-solid fa-share-from-square"></i></button>
            </div>
        </div>`;
        cardContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
}

// التعامل مع أزرار + و -
function increase_quantity(button) {
    const card = button.closest(".card");
    const quantityElement = card.querySelector("#quantity");
    let currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
}

function decrease_quantity(button) {
    const card = button.closest(".card");
    const quantityElement = card.querySelector("#quantity");
    let currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 0) quantityElement.textContent = currentQuantity - 1;
}

// التعامل مع زر الإضافة (delvary_btn)
document.addEventListener("click", (event) => {
    if (event.target.closest("#delvary_btn")) {
        const button = event.target.closest("#delvary_btn");
        const card = button.closest(".card");
        const productName = card.querySelector("#product_name").textContent;
        const specialPrice = card.querySelector("#special_price").value;
        const quantity = card.querySelector("#quantity").textContent;

        // إضافة البيانات إلى LocalStorage
        const newPro = {
            product_name: productName,
            special_price: specialPrice,
            quantity: quantity,
        };

        let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];
        dataPro.push(newPro);
        localStorage.setItem("product", JSON.stringify(dataPro));

        // تحديث الجدول
        showData();
    }
});

// عرض البيانات في الجدول
function showData() {
    const dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];
    let table = "";
    dataPro.forEach((item, i) => {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${item.product_name}</td>
            <td>شيكل ${item.special_price}</td>
            <td>${item.quantity}</td>
            <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
    });
    document.getElementById("tbody").innerHTML = table;
}

// حذف بيانات من الجدول
function deleteData(i) {
    let dataPro = JSON.parse(localStorage.product);
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// عرض البيانات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    renderCards();
    showData();
});
