
let switch_btn=document.getElementById("switch_btn");

localStorage.clear();
let delvary_btn =document.getElementById("delvary_btn")

let coustmer=document.getElementById("coustmer")

let order_table=document.getElementById("order_table");
let receipt_table=document.getElementById("receipt_table");

// array

let switch_btn_arr=[switch_btn.textContent,"طلب جديد"];


function createCard(product) {
    const mainContainer = document.querySelector("main");
    const cardHTML = `
        <div class="card" id="${product.id}">
            <div class="container">
                <img src="${product.image}" alt="">
                <div class="order_btn">
                    <p type="text" id="product_name">${product.name}</p>
                    <input type="number" id="special_price" class="special_price" value="${product.price}">
                    <p id="quantity">1</p>
                </div>
            </div>
            <div class="quantity_container">
                <button id="increase">+</button>
                <hr>
                <button id="decrease">-</button>
           
        </div>`;
    mainContainer.insertAdjacentHTML("beforeend", cardHTML);
}


class Product {
    constructor(image, name, id, price) {
        this.image = image;
        this.name = name;
        this.id = id;
        this.price = price;
    }
}

class Receipt{
    constructor(id,coustmer, cashier, date,product=[],total) {
        this.id= id;
        this.coustmer = coustmer;
        this.cashier = cashier;
        this.date = date;
      
        this.product=product
        this.total=total;
    }

    add_product(pro){
        this.product.push(pro)
    }
    
}

const items = [
    new Product("/product_image/dishwashing_liquid_image.jpeg", "فيري", 1, 20),
    new Product("/product_image/nescafe.webp", "نسكفيه", 2, 25),
    new Product("/product_image/head&sholders.webp", "هيد اند شولدر", 3, 23)
];


function init_cards(item){

for(let i=0;i<item.length;i++){
    createCard(item[i])
    }

}

receipt =[];
let r_count=0;

function create_receipt(pro){
   


    receipt.push();
}

init_cards(items);



function add_new_receipt(){
    
    // id,coustmer, cashier, date,_clock,product=[],total
   
    
    let total=0 ;
    const cashier = "ahmed"; // Or get cashier name dynamically
    const date = new Date(); // Or get date from user input if needed
  
    // جلب البيانات المخزنة
    let receipt = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];

    let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

  for(pro of dataPro){
   total+= parseFloat(pro.total);
  }

        // إضافة المنتج الجديد
        let new_receipt = {
            id:r_count,
            cashier:cashier,
            date: date.toISOString(),
           product:dataPro,
           coustmer:coustmer.value,
            total:total
            
        };
        
        console.log(coustmer.value)
        console.log(total)
        receipt.push(new_receipt);
   

    // حفظ البيانات في LocalStorage
    localStorage.setItem('receipt', JSON.stringify(receipt));

    r_count+=1;
}





// التعامل مع أزرار + و -
document.querySelectorAll('.quantity_container button').forEach((button) => {
    button.addEventListener('click', function () {
        // تحديد نوع الزر (+ أو -)
        const isIncrease = button.id === 'increase';
        const card = button.closest('.card');


     const cardId = card ? card.id : null;

        // Log the ID
        console.log('Card ID:', cardId);
        // الوصول إلى الكمية الحالية
        const quantityElement = card.querySelector('#quantity');
        let currentQuantity = parseInt(quantityElement.textContent);

        // تعديل الكمية بناءً على نوع الزر
        if (isIncrease) {
            currentQuantity += 1;
       
        // تحديث الكمية في البطاقة
        quantityElement.textContent = currentQuantity;     apply_changes_to_table(card,currentQuantity)
        } else if (currentQuantity > 0) {
            currentQuantity -= 1;
      
        // تحديث الكمية في البطاقة
        quantityElement.textContent = currentQuantity;      apply_changes_to_table(card,currentQuantity)
        }

    });
});

function apply_changes_to_table(card){
    
    
        const productName = card.querySelector('#product_name').textContent;
        const specialPrice = card.querySelector('#special_price').value;
        const quantity = card.querySelector('#quantity').textContent;
        
        
        let total = specialPrice * quantity;

        // جلب البيانات المخزنة
        let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

        // البحث عن المنتج في LocalStorage
        const existingIndex = dataPro.findIndex((item) => item.product_name === productName);

        if (existingIndex !== -1) {
            // تحديث بيانات المنتج الموجود
            dataPro[existingIndex].special_price = specialPrice;
            dataPro[existingIndex].quantity = quantity;
            dataPro[existingIndex].total = total;
            dataPro[existingIndex].id=card.id
        } else {
            // إضافة المنتج الجديد
            const newPro = {
                product_name: productName,
                special_price: specialPrice,
                quantity: quantity,
                id:card.id,
                total: total,
            };
            dataPro.push(newPro);
        }

        // حفظ البيانات في LocalStorage
        localStorage.setItem('product', JSON.stringify(dataPro));

        // تحديث الجدول
        showData();
    
}



document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', function () {
   
    apply_changes_to_table(card)
    
        console.log("added to table")
    });
});



document.getElementById("switch_btn").addEventListener("click",function(){
    let btn=this.textContent;
  
    if(btn===switch_btn_arr[0]){
        btn=switch_btn_arr[1]
        order_table.style.display="none"
        receipt_table.style.display="flex"   
        
        showReceipt()
    }else{
        btn=switch_btn_arr[0]
        order_table.style.display="flex"
        receipt_table.style.display="none"
        
    }
   
    
    switch_btn.textContent=btn;
});
  
  
// Receipt 
  
// delvary_btn.addEventListener("click",function(){
//  Receip   
// }) ;
  
  
// عرض البيانات في الجدول
function showData() {
    const dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];
    let table = "";
    dataPro.forEach((item, i) => {
        table += `
        <tr>
            <td>${item.id}</td>
            <td>${item.product_name}</td>
            <td>${item.special_price}</td>
            <td>${item.quantity}</td>
            <td>${item.total}</td>
            <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
    });
    document.getElementById("tbody").innerHTML = table;
}


delvary_btn.addEventListener("click",
    function(){
add_new_receipt();
console.log("receipt added");
    }
);

function showReceipt() {
    const receiptData = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];
    let table = "";
    
let productsHTML = "";

receiptData.forEach((receipt, i) => {
    // Start a new details section for each receipt
    productsHTML += `<details>
        <summary>${receipt.coustmer}  - Total: $${receipt.total} - id #${receipt.id}</summary>
        <ul>`;
    
    // Add product items inside the details
    if (Array.isArray(receipt.product)) {
        productsHTML += receipt.product.map((p, j) => `
            <li>${j + 1}. ${p.product_name} (x${p.quantity}) - $${p.special_price}</li>
        `).join("");
    } else {
        productsHTML += `<li>No products found</li>`;
    }
    
    // Close the list and the details section
    productsHTML += `</ul>
    </details><button id="delete_receipt"
    class="delete_receipt" onClick="delete_receipt(${i})">Delete</button>`;
});

// Inject the generated HTML
document.getElementById("receiptTbody").innerHTML = productsHTML;
} 
 



 /* 
 function showReceipt() {
    // Retrieve receipts from local storage
    const receiptData = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];
    let detailsHTML = "";

    // Loop through each receipt
    receiptData.forEach((receipt) => {
        // Ensure `receipt.product` exists and is an array
        let productsHTML = Array.isArray(receipt.product)
            ? receipt.product.map(
                (p, j) => `
                
                <tr>
                    <td>${j + 1}</td>
                    <td>${p.product_name}</td>
                    <td>${p.special_price}</td>
                    <td>${p.quantity}</td>
                    <td>${p.total}</td>
                </tr>
                
                `
              ).join("")
            : `<tr><td colspan="5">No products found</td></tr>`;

        // Build the receipt section
        detailsHTML += `
        <details>
          <summary>Receipt #${receipt.id} - Total: $${receipt.total}</summary>
          <div class="details_content">
            <p><strong>Customer:</strong> ${receipt.coustmer || "N/A"}</p>
            <p><strong>Cashier:</strong> ${receipt.cashier}</p>
            <p><strong>Date:</strong> ${new Date(receipt.date).toLocaleString()}</p>
 
   <tr>
          
            <td>
                <ul>${productsHTML}</ul>
            </td>
            <td>${receipt.total}</td>
            <td><button id="delete_receipt"onClick="deleteReceipt(${receipt.id})" >Delete</button></td>
        </tr>
        
        </details>`;
    }); 

    // Inject the generated content into the `receiptTbody` or a container
    document.getElementById("receiptTbody").innerHTML = detailsHTML;
}
    */
// حذف بيانات من الجدول
function deleteData(i) {
    let dataPro = JSON.parse(localStorage.product);
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


function delete_receipt(i) {
    let receipt = JSON.parse(localStorage.receipt);
    receipt.splice(i, 1);
    localStorage.receipt = JSON.stringify(receipt);
    showReceipt();
}

function edit_receipt(i) {


  //  add_new_receipt();
    showReceipt();
}

showData();