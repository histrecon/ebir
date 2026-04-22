// Функция для инициализации модального окна с описанием тегов
function initTagsInfoModal() {
    // Модальное окно расшифровки тегов
    const tagsInfoButton = document.getElementById('tagsInfoButton');
    const tagsModal = document.getElementById('tagsModal');
    const closeTagsModal = document.getElementById('closeTagsModal');
    
    // Проверяем, существует ли кнопка на странице
    if (!tagsInfoButton) {
        console.warn('Кнопка "Расшифровка тегов" не найдена на странице');
        return;
    }
    
    // Проверяем, существует ли модальное окно
    if (!tagsModal) {
        console.error('Модальное окно для расшифровки тегов не найдено на странице');
        return;
    }
    
    // Открыть модальное окно расшифровки тегов
    tagsInfoButton.addEventListener('click', () => {
        tagsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Закрыть модальное окно расшифровки тегов
    function closeTagsModalFunc() {
        tagsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeTagsModal) {
        closeTagsModal.addEventListener('click', closeTagsModalFunc);
    }
    
    // Закрыть по клику вне окна
    tagsModal.addEventListener('click', (e) => {
        if (e.target === tagsModal) {
            closeTagsModalFunc();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && tagsModal.classList.contains('active')) {
            closeTagsModalFunc();
        }
    });
    
    console.log('Модальное окно "Расшифровка тегов" инициализировано');
}

// Функция для динамической загрузки HTML модального окна
function loadTagsModal() {
    // Проверяем, есть ли уже модальное окно на странице
    if (document.getElementById('tagsModal')) {
        console.log('Модальное окно тегов уже загружено на странице');
        initTagsInfoModal();
        return;
    }
    
    // Загружаем HTML модального окна
    fetch('tags-info.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Вставляем HTML в конец body
            document.body.insertAdjacentHTML('beforeend', html);
            console.log('Модальное окно тегов успешно загружено');
            
            // Инициализируем функционал после загрузки
            setTimeout(initTagsInfoModal, 100);
        })
        .catch(error => {
            console.error('Ошибка загрузки модального окна тегов:', error);
            // Создаем простую версию модального окна при ошибке загрузки
            createFallbackTagsModal();
        });
}

// Функция для создания запасного модального окна при ошибке загрузки
function createFallbackTagsModal() {
    const fallbackHTML = `
    <div class="modal-overlay" id="tagsModal">
        <div class="modal-content tags-modal">
            <button class="close-button" id="closeTagsModal">&times;</button>
            
            <div class="modal-header">
                <h2 class="modal-title">Расшифровка тегов и эпох</h2>
                <p class="modal-subtitle">Подробное описание основных исторических эпох и тегов</p>
            </div>
            
            <div class="tags-content">
                <p>К сожалению, полный список тегов временно недоступен. Основные теги:</p>
                <ul>
                    <li><strong>Века</strong> - реконструкция конкретных веков (IX в., X в., и т.д.)</li>
                    <li><strong>Древний Рим</strong> - реконструкция римской истории и легионов</li>
                    <li><strong>Средневековье</strong> - реконструкция европейского средневековья</li>
                    <li><strong>ИСБ</strong> - Исторический Средневековый Бой</li>
                    <li><strong>СМБ</strong> - Современный Мечевой Бой</li>
                    <li><strong>ВОВ</strong> - Великая Отечественная война</li>
                </ul>
                <p>Пожалуйста, обратитесь к администратору для получения полной информации.</p>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', fallbackHTML);
    initTagsInfoModal();
}

// Функция для проверки и добавления кнопки на страницу, если её нет
function ensureTagsButtonExists() {
    const tagsInfoButton = document.getElementById('tagsInfoButton');
    
    if (!tagsInfoButton) {
        console.warn('Кнопка "Расшифровка тегов" не найдена, создаем...');
        
        // Находим контейнер с фильтрами
        const filtersContainer = document.querySelector('.filters');
        
        if (filtersContainer) {
            const buttonHTML = `
                <button class="tags-info-button" id="tagsInfoButton">
                    <span>📖</span>
                    <span>Расшифровка тегов</span>
                </button>
            `;
            
            // Вставляем кнопку перед кнопкой сброса
            const resetButton = document.querySelector('.reset-button');
            if (resetButton) {
                resetButton.insertAdjacentHTML('beforebegin', buttonHTML);
            } else {
                filtersContainer.insertAdjacentHTML('beforeend', buttonHTML);
            }
            
            console.log('Кнопка "Расшифровка тегов" создана');
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие кнопки
    ensureTagsButtonExists();
    
    // Загружаем модальное окно
    loadTagsModal();
});

// Экспорт функций для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTagsInfoModal,
        loadTagsModal,
        ensureTagsButtonExists
    };
}