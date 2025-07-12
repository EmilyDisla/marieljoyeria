// main.js para articulos.html

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
});
