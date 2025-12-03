        // Efecto de aparición al hacer scroll
        document.addEventListener('DOMContentLoaded', function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Si es una lista, animar cada elemento individualmente
                        if (entry.target.classList.contains('lista-animada')) {
                            const listItems = entry.target.querySelectorAll('li');
                            listItems.forEach((item, index) => {
                                setTimeout(() => {
                                    item.classList.add('visible');
                                }, index * 150); // Retardo escalonado
                            });
                        }
                    }
                });
            }, observerOptions);

            // Aplicar animación a las secciones principales
            const sections = document.querySelectorAll('.seccion');
            sections.forEach(section => {
                observer.observe(section);
            });

            // Aplicar animación a las imágenes
            const images = document.querySelectorAll('.procedure-image');
            images.forEach(image => {
                observer.observe(image);
            });

            // Aplicar animación a las listas
            const lists = document.querySelectorAll('.lista-animada');
            lists.forEach(list => {
                observer.observe(list);
            });

            // Aplicar animación a la nota destacada
            const notaDestacada = document.querySelector('.nota-destacada');
            if (notaDestacada) {
                observer.observe(notaDestacada);
            }
        });