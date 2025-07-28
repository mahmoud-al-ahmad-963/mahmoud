const productsContainer = document.getElementById('productsContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');


async function fetchProducts() {
    loadingIndicator.classList.remove('hidden');
    errorMessage.classList.add('hidden');       
    productsContainer.innerHTML = '';           

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('حدث خطأ في جلب المنتجات:', error);
        productsContainer.innerHTML = ''; 
        errorMessage.classList.remove('hidden');
    } finally {
        loadingIndicator.classList.add('hidden'); 
    }
}


function displayProducts(products) {
    productsContainer.innerHTML = '';
    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="col-span-full text-center text-gray-500 py-10">لا توجد منتجات لعرضها.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = `
            bg-white rounded-lg shadow-lg overflow-hidden flex flex-col
            transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
        `;

        productCard.innerHTML = `
            <div class="h-48 flex items-center justify-center p-4">
                <img src="${product.image}" alt="${product.title}"
                     onerror="this.onerror=null;this.src='https://placehold.co/150x150/e2e8f0/0f172a?text=صورة+غير+متاحة';"
                     class="max-h-full max-w-full object-contain rounded-md">
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.title}</h3>
                    <p class="text-gray-600 text-sm mb-3">${product.description.substring(0, 100)}...</p>
                    <p class="text-gray-500 text-xs mb-3">الفئة: ${product.category}</p>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-2xl font-bold text-blue-600">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-full
                                   shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
                        أضف إلى السلة
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);

        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            alert(`تمت إضافة "${product.title}" إلى السلة!)`);
        });
    });
}

window.addEventListener('load', fetchProducts);