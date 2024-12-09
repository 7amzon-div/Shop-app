
let product_name = document.getElementById("product_name");

let special_price = document.getElementById("special_price");

let quantity = document.getElementById("quantity");

let table_quantity = document.getElementById("table_quantity");

let increase = document.querySelector("#increase"); // +

let decrease = document.querySelector("#decrease"); // -

let delvary_btn = document.querySelector("#delvary_btn");

let Delete = document.querySelector("#delete");


function return_quan(){

return qun_number = parseInt(quantity.textContent);

}


// console.log(special_price.textContent * return_quan());
function increase_quantity(){

    let current_quan = return_quan();

    current_quan += 1;

    quantity.textContent = current_quan;

    table_quantity.textContent = quantity.textContent;

    total_price.textContent = Number(special_price.value) * Number(return_quan());
}

function decrease_quantity(){

    let current_quan = return_quan();

    if(current_quan != 0){
        
        current_quan -= 1;
    };


    quantity.textContent = current_quan;

    table_quantity.textContent = quantity.textContent;

    total_price.textContent = Number(special_price.value) * Number(return_quan());
}







// create product

let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
};

delvary_btn.onclick = function () {
    
    var newPro = {
        product_name: product_name.innerHTML,
        special_price: special_price.value,
        quantity: quantity.innerHTML,
    };

    dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro));

    showData()
};





// read

function showData() {
    var table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].product_name}</td>
            <td>${dataPro[i].special_price}</td>
            <td>${dataPro[i].quantity}</td>
            <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `
    };
    document.getElementById("tbody").innerHTML = table;
};
showData()


// delete product

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
};