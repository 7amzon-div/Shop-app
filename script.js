
let switch_btn=document.getElementById("switch_btn");

localStorage.clear();
let curr_receipt_id;
class Modes {

    static ADD = "add";
    static EDIT = "edit";
    static DELETE = "delete";

    constructor(currentMode) {
        this.type = currentMode;
    }
}

// Usage
const mode = new Modes(Modes.ADD);
console.log(mode.type); // "add"



let delvary_btn =document.getElementById("delvary_btn")

let coustmer=document.getElementById("coustmer")

let order_table=document.getElementById("order_table");
let receipt_table=document.getElementById("receipt_table");

// array

let switch_btn_arr=[switch_btn.textContent,"طلب جديد"];

const mainContainer = document.querySelector("main");
function createCard(product) {
   
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

function clear_product(){
    // Clean all dataPro
    localStorage.setItem('product', JSON.stringify([]));
  
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


function create_receipt(pro){
   


    receipt.push();
}

init_cards(items);

function toBase(n, base = 62) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    while (n > 0) {
        result = chars[n % base] + result;
        n = Math.floor(n / base);
    }
    return result || "0"; // Return "0" if input is 0
}

function generateReceiptId() {
    // Get the current timestamp in seconds
    const timestamp = Math.floor(Date.now() / 1000);

    // Convert timestamp to Base 62
    const base62Timestamp = toBase(timestamp, 62);

    // Generate a 6-character random alphanumeric string
    const randomString = Array.from({ length: 6 }, () =>
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
            Math.floor(Math.random() * 62)
        ]
    ).join("");

    // Combine timestamp and random string
    return `${base62Timestamp}${randomString}`;
}

// Example usage
console.log(generateReceiptId());




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

    

console.log("modes "+mode.type)

if(mode.type===Modes.ADD){
        // إضافة فاتورة الجديد
       const id1=generateReceiptId().toString()
        let new_receipt = {
            id:id1,
            cashier:cashier,
            date: date.toISOString(),
           product:dataPro,
           coustmer:coustmer.value,
            total:total
            
       };
     
        console.log("\nnew_receipt.id_: "+new_receipt.id)
        console.log(coustmer.value)
        console.log(total)
        receipt.push(new_receipt);
   }
    else if(mode.type===Modes.EDIT)
    {
        
    receipt[curr_receipt_id].product = dataPro;
    receipt[curr_receipt_id].date = date;        
    receipt[curr_receipt_id].total = total;   
    receipt[curr_receipt_id].coustmer = coustmer.value;  

mode.type=Modes.ADD;
for(pro of receipt[curr_receipt_id].product){
   console.log(pro+"\n")
  }
    }
    // حفظ البيانات في LocalStorage
    localStorage.setItem('receipt', JSON.stringify(receipt));

    
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


function switch_to_product(){
    
    order_table.style.display="flex"
    receipt_table.style.display="none"
    switch_btn.textContent= btn=switch_btn_arr[0];
        mainContainer.style="display:flex;"
        showData()
            
}

function switch_to_receipt(){
    order_table.style.display="none"
    receipt_table.style.display="flex" 
    switch_btn.textContent= btn=switch_btn_arr[1];
    showReceipt()
        
        mainContainer.style="display:none;"
}


// event listner
switch_btn.addEventListener("click",function(){
    let btn=this.textContent;
  

    //جميع الفواتير
    if(btn===switch_btn_arr[0]){
        switch_to_receipt()}
    else{
    clear_product();

    switch_to_product()
    coustmer.value=""
    }
       

  
});
  
  

  
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
switch_to_receipt();
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
    class="delete_receipt" onClick="delete_receipt('${receipt.id}')">Delete</button> 
    <button id="edit_receipt"
    class="edit_receipt" onClick="edit_receipt('${receipt.id}')">edit</button>`;
});

// Inject the generated HTML
document.getElementById("receiptTbody").innerHTML = productsHTML;
} 
 


// حذف بيانات من الجدول
function deleteData(i) {
    let dataPro = JSON.parse(localStorage.product);
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


function delete_receipt(id) {
    // Retrieve the receipts from localStorage
    let receipts = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];

    // Find the index of the receipt with the given id
    const index = receipts.findIndex((receipt) => receipt.id === id);

    // If receipt is found, delete it
    if (index !== -1) {
        receipts.splice(index, 1);
        console.log(`Receipt with id ${id} deleted successfully.`);
    } else {
        console.error(`Receipt with id ${id} not found.`);
        return;
    }

    // Save the updated receipts back to localStorage
    localStorage.setItem('receipt', JSON.stringify(receipts));

    // Optionally, refresh the UI
    showReceipt(); // Call the function to refresh the receipt table
}

function edit_receipt(id_) {

    clear_product();
    console.log("id_: edit "+id_)
  // Retrieve receipts from localStorage
  let receipt = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];

  // Find the receipt with the given id
   const receipt_to_edit = receipt.find((rec) => rec.id === id_);
   
 const index = receipt.findIndex((rec) => rec.id === id_);
if (index === -1) {
    console.error(`Receipt with id ${id_} not found.`);
    return;
}


  if (!receipt_to_edit) {
      console.error(`Receipt with id ${id_} not found.`);
      return;
  }

  // Retrieve the product list from the found receipt
  let dataPro = receipt_to_edit.product.map((rec) => ({
      product_name: rec.product_name,
      special_price: rec.special_price || 0, // Ensure property exists
      quantity: rec.quantity,
      id: rec.id,
      total: rec.total,
  }));

  // Update localStorage with the new dataPro
  localStorage.setItem('product', JSON.stringify(dataPro));

  //move to product page
  switch_to_product(); 
 mode.type=Modes.EDIT;
console.log(mode.type); // "edit"
curr_receipt_id=index;
//تحديث اسم المشتري على حسب الفاتورة
  coustmer.value=receipt_to_edit.coustmer;
  
  showData();
}



showData();