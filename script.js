document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.opacity = 0;
    container.style.transition = 'opacity 1s ease-in-out';

    setTimeout(() => {
        container.style.opacity = 1;
    }, 100);

    // Логика для кнопок копирования
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling; // Получаем поле ввода перед кнопкой
            const textToCopy = input.value;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                // Используем Clipboard API, если доступно
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopySuccess(button);
                }).catch(() => {
                    console.error('Ошибка копирования через Clipboard API');
                });
            } else {
                // Альтернативный метод для HTTP и старых браузеров
                fallbackCopyText(textToCopy, button);
            }
        });
    });

    // Функция показа успешного копирования
    function showCopySuccess(button) {
        const icon = button.querySelector('i');
        icon.className = 'fa-solid fa-check'; // Галочка
        button.classList.add('success');

        setTimeout(() => {
            icon.className = 'fa-solid fa-copy'; // Возврат к копированию
            button.classList.remove('success');
        }, 2000);
    }

    // Альтернативный метод копирования
    function fallbackCopyText(text, button) {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showCopySuccess(button);
        } catch (err) {
            console.error('Ошибка копирования через execCommand', err);
        }
        document.body.removeChild(tempInput);
    }
});
