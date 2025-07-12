
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.modal = document.getElementById('cartModal');
        this.cartItems = document.querySelector('.cart-items');
        this.cartCount = document.querySelector('.cart-count');
        this.totalAmount = document.querySelector('.total-amount');
        this.init();
    }

    init() {
        document.querySelector('.cart-icon').addEventListener('click', () => this.toggleCart());
        document.querySelector('.close-cart').addEventListener('click', () => this.toggleCart());
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => this.addItem(e.target));
        });
        document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.toggleCart();
        });
        this.updateCart();
    }

    toggleCart() {
        this.modal.classList.toggle('active');
        document.body.style.overflow = this.modal.classList.contains('active') ? 'hidden' : '';
    }

    addItem(button) {
        const item = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            quantity: 1
        };
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(item);
        }
        this.updateCart();
        this.showNotification('Producto añadido al carrito');
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(id);
            }
        }
        this.updateCart();
    }

    updateCart() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;
        this.cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="cart.removeItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.totalAmount.textContent = `$${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    checkout() {
        if (this.items.length === 0) {
            this.showNotification('El carrito está vacío');
            return;
        }
        // Simula un proceso de pago exitoso
        this.showNotification('¡Pago realizado con éxito! Gracias por tu compra.');
        this.items = [];
        this.updateCart();
        this.toggleCart();
    }
}

const cart = new ShoppingCart();

// Corrige el modo oscuro y asegura que el botón funcione
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Funcionalidad del formulario de contacto
const contactForm = document.querySelector('.contact-form');
const messagePopup = document.getElementById('messagePopup');
const overlay = document.getElementById('overlay');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showMessagePopup();
    this.reset();
});

function showMessagePopup() {
    messagePopup.classList.add('active');
    overlay.classList.add('active');
}

function closeMessagePopup() {
    messagePopup.classList.remove('active');
    overlay.classList.remove('active');
}
window.closeMessagePopup = closeMessagePopup;
overlay.addEventListener('click', closeMessagePopup);

// Funcionalidad del formulario de newsletter
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showMessagePopup();
    this.reset();
});

// Funcionalidad para mostrar más texto al hacer clic en 'Leer más'
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-outline-primary.mt-2').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const cardText = btn.parentElement.querySelector('.card-text');
            if (!btn.dataset.expanded) {
                let extraText = '';
                if (btn.parentElement.querySelector('.card-title').textContent.includes('Tendencias')) {
                    extraText = ' Además, los diseñadores apuestan por la personalización y la sostenibilidad, creando piezas únicas que reflejan la personalidad de quien las lleva.';
                } else if (btn.parentElement.querySelector('.card-title').textContent.includes('cuidar tus joyas')) {
                    extraText = ' Utiliza paños suaves, evita el contacto con productos químicos y guarda cada pieza por separado para evitar rayaduras.';
                } else if (btn.parentElement.querySelector('.card-title').textContent.includes('Historia')) {
                    extraText = ' La joyería artesanal ha sido símbolo de estatus, cultura y creatividad a lo largo de la historia, adaptándose a los gustos y tecnologías de cada época.';
                }
                cardText.textContent += extraText;
                btn.textContent = 'Leer menos';
                btn.dataset.expanded = 'true';
            } else {
                // Restaurar el texto original
                if (btn.parentElement.querySelector('.card-title').textContent.includes('Tendencias')) {
                    cardText.textContent = 'Descubre las últimas tendencias en joyería artesanal para este año: piezas minimalistas, combinaciones de metales y gemas de colores vibrantes.';
                } else if (btn.parentElement.querySelector('.card-title').textContent.includes('cuidar tus joyas')) {
                    cardText.textContent = 'Aprende los mejores consejos para mantener tus joyas como nuevas: limpieza, almacenamiento y cuidados diarios para prolongar su brillo.';
                } else if (btn.parentElement.querySelector('.card-title').textContent.includes('Historia')) {
                    cardText.textContent = 'Un recorrido por la evolución de la joyería hecha a mano, desde las civilizaciones antiguas hasta las tendencias modernas.';
                }
                btn.textContent = 'Leer más';
                btn.removeAttribute('data-expanded');
            }
        });
    });

   
    const mailBtn = document.querySelector('a[href^="mailto:"]');
    if (mailBtn) {
        mailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Mostrar mensaje de éxito
            const successMsg = document.createElement('div');
            successMsg.textContent = 'Correo enviado con éxito';
            successMsg.className = 'alert alert-success mt-3 text-center';
            mailBtn.parentElement.appendChild(successMsg);
            setTimeout(() => {
                successMsg.remove();
                window.location.href = mailBtn.href;
            }, 1200);
        });
    }
});

