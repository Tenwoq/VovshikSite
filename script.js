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
            const input = button.previousElementSibling;
            input.select();
            input.setSelectionRange(0, 99999); // Для мобильных устройств

            navigator.clipboard.writeText(input.value).then(() => {
                // Меняем иконку на галочку
                const icon = button.querySelector('i');
                icon.className = 'fa-solid fa-check'; // Галочка
                button.classList.add('success');

                // Через 2 секунды возвращаем иконку копирования
                setTimeout(() => {
                    icon.className = 'fa-solid fa-copy'; // Иконка копирования
                    button.classList.remove('success');
                }, 2000);
            });
        });
    });
});
