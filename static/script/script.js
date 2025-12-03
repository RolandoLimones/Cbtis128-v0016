document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const searchIcon = document.querySelector('#searchIcon');
    const searchBar = document.querySelector('#searchBar');
    const closeSearch = document.querySelector('#closeSearch');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('#searchInput');
    const searchResults = document.querySelector('#searchResults');
    const submenuParents = document.querySelectorAll('.menu li:has(ul)');
    
    // Datos de búsqueda
    let sitePages = [];
    
    // ===== FUNCIONES DE BÚSQUEDA =====
    
    // Cargar datos de búsqueda
    async function loadSearchData() {
        try {
            console.log('Cargando datos de búsqueda...');
            const response = await fetch('/static/script/busqueda.json');
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json();
            sitePages = data.pages || [];
            console.log('✅ Datos de búsqueda cargados:', sitePages.length, 'páginas');
        } catch (error) {
            console.error('❌ Error cargando datos de búsqueda:', error);
            // Datos de respaldo en caso de error
            sitePages = [
                {
                    title: "Inicio",
                    url: "/",
                    content: "Página principal del CBTis 128"
                },
                {
                    title: "Transparencia",
                    url: "/transparencia/",
                    content: "Información sobre transparencia"
                },
                {
                    title: "Contacto",
                    url: "/contacto/",
                    content: "Información de contacto"
                }
            ];
            console.log('✅ Usando datos de respaldo:', sitePages.length, 'páginas');
        }
    }

    // Función de búsqueda principal
    function performSearch(query) {
        console.log('Buscando:', query);
        
        if (!query.trim()) {
            hideResults();
            return;
        }
        
        const normalizedQuery = query.toLowerCase().trim();
        const results = sitePages.filter(page => {
            const titleMatch = page.title && page.title.toLowerCase().includes(normalizedQuery);
            const contentMatch = page.content && page.content.toLowerCase().includes(normalizedQuery);
            const urlMatch = page.url && page.url.toLowerCase().includes(normalizedQuery);
            
            return titleMatch || contentMatch || urlMatch;
        }).slice(0, 8); // Limitar a 8 resultados
        
        console.log('Resultados encontrados:', results.length);
        displayResults(results, query);
    }
    
    // Mostrar resultados en la interfaz
    function displayResults(results, query) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="bi bi-search"></i>
                    <p>No se encontraron resultados para "<strong>${escapeHtml(query)}</strong>"</p>
                    <small>Intenta con otros términos de búsqueda</small>
                </div>
            `;
        } else {
            results.forEach((result) => {
                const resultElement = document.createElement('a');
                resultElement.className = 'search-result-item';
                resultElement.href = result.url;
                
                // Crear el contenido del resultado
                let resultHTML = `
                    <div class="result-title">
                        <i class="bi bi-arrow-right-short"></i>
                        ${escapeHtml(result.title)}
                    </div>
                `;
                
                // Agregar snippet si existe contenido
                if (result.content) {
                    const snippet = result.content.substring(0, 120);
                    resultHTML += `<div class="result-snippet">${escapeHtml(snippet)}...</div>`;
                }
                
                resultElement.innerHTML = resultHTML;
                
                // Cerrar búsqueda al hacer clic en un resultado
                resultElement.addEventListener('click', function() {
                    closeSearchBar();
                });
                
                searchResults.appendChild(resultElement);
            });
            
            // Agregar contador de resultados
            const resultsCount = document.createElement('div');
            resultsCount.className = 'results-count';
            resultsCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;
            searchResults.appendChild(resultsCount);
        }
        
        searchResults.style.display = 'block';
        searchResults.classList.add('show');
    }
    
    // Ocultar resultados
    function hideResults() {
        if (searchResults) {
            searchResults.style.display = 'none';
            searchResults.classList.remove('show');
        }
    }
    
    // Cerrar barra de búsqueda completamente
    function closeSearchBar() {
        if (searchBar) searchBar.classList.remove('active');
        if (menu) menu.classList.remove('hidden');
        if (searchContainer) searchContainer.classList.remove('expanded');
        hideResults();
        if (searchInput) searchInput.value = '';
    }
    
    // Escapar HTML para seguridad (prevenir XSS)
    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return String(unsafe)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // ===== EVENT LISTENERS =====
    
    // Menú hamburguesa móvil
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            menu.classList.toggle('active');
            closeSearchBar();
        });
    }
    
    // Abrir barra de búsqueda
    if (searchIcon && searchBar && searchInput) {
        searchIcon.addEventListener('click', function() {
            searchBar.classList.add('active');
            if (menu) menu.classList.add('hidden');
            if (searchContainer) searchContainer.classList.add('expanded');
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        });
    }
    
    // Cerrar barra de búsqueda
    if (closeSearch) {
        closeSearch.addEventListener('click', function() {
            closeSearchBar();
        });
    }
    
    // Búsqueda en tiempo real
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            performSearch(e.target.value);
        });
        
        // Buscar al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    performSearch(query);
                    e.preventDefault();
                }
            }
        });
    }
    
    // Cerrar búsqueda con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (searchBar && searchBar.classList.contains('active')) {
                closeSearchBar();
            }
        }
    });
    
    // Submenús en móvil
    submenuParents.forEach(parent => {
        const link = parent.querySelector('a');
        const submenu = parent.querySelector('ul');
        
        if (link && submenu) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    submenu.classList.toggle('active');
                    
                    // Cerrar otros submenús abiertos
                    submenuParents.forEach(otherParent => {
                        if (otherParent !== parent) {
                            const otherSubmenu = otherParent.querySelector('ul');
                            if (otherSubmenu) otherSubmenu.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.search-container')) {
            if (menu) menu.classList.remove('active');
            closeSearchBar();
            
            // Cerrar todos los submenús en móvil
            if (window.innerWidth <= 768) {
                submenuParents.forEach(parent => {
                    const submenu = parent.querySelector('ul');
                    if (submenu) submenu.classList.remove('active');
                });
            }
        }
    });
    
    // Cerrar resultados al hacer clic fuera de la búsqueda
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container') && !e.target.closest('.search-results')) {
            hideResults();
        }
    });
    
    // ===== INICIALIZACIÓN =====
    
    // Cargar datos de búsqueda al iniciar
    loadSearchData();
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', function() {
        // Cerrar menú móvil si se cambia a desktop
        if (window.innerWidth > 768 && menu) {
            menu.classList.remove('active');
        }
    });
    
    console.log('✅ Script de búsqueda inicializado correctamente');
});

// ===== FUNCIONES GLOBALES ADICIONALES =====

// Función para abrir búsqueda programáticamente
function openSearch() {
    const searchBar = document.querySelector('#searchBar');
    const menu = document.querySelector('.menu');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('#searchInput');
    
    if (searchBar && searchInput) {
        searchBar.classList.add('active');
        if (menu) menu.classList.add('hidden');
        if (searchContainer) searchContainer.classList.add('expanded');
        searchInput.focus();
    }
}

// Función para buscar directamente desde otro código
function searchQuery(query) {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        searchInput.value = query;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        openSearch();
    }
}

///UBICACION script
// Funcionalidad para el modal del croquis
function openModal(imageSrc) {
    const modal = document.getElementById('croquisModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('croquisModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Cerrar modal haciendo click fuera de la imagen
document.getElementById('croquisModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Simular carga del tour (puedes reemplazar con tu lógica real)
document.querySelector('.tour-link').addEventListener('click', function(e) {
    const loadingIndicator = this.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'inline-block';
    
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
        // Aquí iría la redirección real al tour
        // window.location.href = 'url-del-tour';
    }, 2000);
});

