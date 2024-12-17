
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

// </div>
// <div class="delvary_btn_container">
//      <button id="delvary_btn"><i class="fa-solid fa-share-from-square"></i></button>
//  </div>
// Example usage:
class Product {
    constructor(image, name, id, price) {
        this.image = image;
        this.name = name;
        this.id = id;
        this.price = price;
    }
}

const items = [
    new Product("/product_image/dishwashing_liquid_image.jpeg", "فيري", 1, 20),
    new Product("/product_image/nescafe.webp", "نسكفيه", 2, 25),
    new Product("/product_image/head&sholders.webp", "هيد اند شولدر", 3, 23)
];
createCard(items[0])
createCard(items[1])
createCard(items[2])

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