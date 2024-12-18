
let switch_btn=document.getElementById("switch_btn");

let delvary_btn =document.getElementById("delvary_btn")

let coustmer=document.getElementById("coustmer")

let order_table=document.getElementById("order_table");
let receipt_table=document.getElementById("receipt_table");

// array

let switch_btn_arr=[switch_btn.textContent,"طلب جديد"];


function createCard(product) {
    const mainContainer = document.querySelector("main");
    const cardHTML = `
        <div class="card" id="card_${product.id}">
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
   
    
    let total ;
    const cashier = "ahmed"; // Or get cashier name dynamically
    const date = new Date(); // Or get date from user input if needed
  
    // جلب البيانات المخزنة
    let receipt = localStorage.product ? JSON.parse(localStorage.product) : [];

    let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

  for(pro of dataPro){
   total+= pro.total;
  }

        // إضافة المنتج الجديد
        const new_receipt = {
            id:r_count,
            cashier:cashier,
            date: date,
           product: dataPro,
            total:total
            
        };
        receipt.push(new_receipt);
   

    // حفظ البيانات في LocalStorage
    localStorage.setItem('receipt', JSON.stringify(receipt));

    r_count+=1;
}



delvary_btn.addEventListener("click",
    function(){
add_new_receipt();

    }
);

// التعامل مع أزرار + و -
document.querySelectorAll('.quantity_container button').forEach((button) => {
    button.addEventListener('click', function () {
        // تحديد نوع الزر (+ أو -)
        const isIncrease = button.id === 'increase';
        const card = button.closest('.card');

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
        } else {
            // إضافة المنتج الجديد
            const newPro = {
                product_name: productName,
                special_price: specialPrice,
                quantity: quantity,
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
            <td>${i + 1}</td>
            <td>${item.product_name}</td>
            <td>${item.special_price}</td>
            <td>${item.quantity}</td>
            <td>${item.total}</td>
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


showData();