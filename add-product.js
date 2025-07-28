const addProductForm = document.getElementById('addProductForm');
const formMessage = document.getElementById('formMessage');

function showMessage(message, type = 'info') {
    formMessage.textContent = message;

    formMessage.classList.remove('text-green-600', 'text-red-600', 'text-gray-700');
    if (type === 'success') {
        formMessage.classList.add('text-green-600');
    } else if (type === 'error') {
        formMessage.classList.add('text-red-600');
    } else { 
        formMessage.classList.add('text-gray-700');
    }
    formMessage.classList.add('show'); 
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 3000);
}


addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();


    const newProduct = {
        title: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        category: document.getElementById('productCategory').value,
    };


    showMessage('جاري إضافة المنتج...', 'info');

    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('تمت إضافة المنتج بنجاح:', result);
        showMessage('تمت إضافة المنتج بنجاح!', 'success');
        addProductForm.reset();
    } catch (error) {
        console.error('حدث خطأ أثناء إضافة المنتج:', error);
        showMessage('فشل إضافة المنتج. الرجاء المحاولة مرة أخرى.', 'error');
    }
});


window.addEventListener('load', () => {
    formMessage.classList.remove('show');
});
