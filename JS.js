let attemptsLeft = 3;

function generateRows() {
    if (attemptsLeft === 0) {
        showMessage('Ви використали всі спроби. Спробуйте знову.', 'error');
        return;
    }

    const username = document.getElementById('username').value;
    const slotMachine = document.getElementById('slotMachine');
    const messageDiv = document.getElementById('message');

    slotMachine.innerHTML = '';
    messageDiv.innerHTML = '';

    // Зображення для однорукого бандита
    const images = ['image1.png', 'image2.jpg', 'image3.jpg', 'image4.jpg'];

    // Генерація рядів картинок
    const winningRow = [];
    for (let i = 0; i < 3; i++) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        winningRow.push(randomImage);
    }

    for (let row = 0; row < 3; row++) {
        const randomRow = [];
        for (let i = 0; i < 3; i++) {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            randomRow.push(randomImage);
        }

        // Виведення картинок на екран
        randomRow.forEach((image, index) => {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Slot ${index + 1}`;
            slot.appendChild(img);
            slotMachine.appendChild(slot);
        });
    }

    // Перевірка на перемогу (якщо всі картинки однакові в хоча б одному ряду)
    const slots = document.querySelectorAll('.slot');
    for (let i = 0; i < 3; i++) {
        const startIndex = i * 3;
        const endIndex = startIndex + 3;
        const rowImages = Array.from(slots).slice(startIndex, endIndex).map(slot => slot.firstChild.src);
        if (rowImages.every(image => image === rowImages[0])) {
            showMessage(`Вітаємо, ${username}! Ви виграли!`, 'success');
            showWinningAnimation();
            resetGame();
            return;
        }
    }

    attemptsLeft--;
    if (attemptsLeft === 0) {
        showMessage('Ви програли. Ви використали всі спроби. Спробуйте знову.', 'error');
        showLosingAnimation();
    } else {
        showMessage(`Спробуйте ще раз, ${username}. Залишилося спроб: ${attemptsLeft}`, 'info');
    }
}

function resetGame() {
    attemptsLeft = 3;
}

function showMessage(message, messageType) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class="${messageType}">${message}</div>`;
}

function showWinningAnimation() {
    const slotMachine = document.getElementById('slotMachine');
    const animationContainer = document.createElement('div');
    animationContainer.classList.add('animation-container');
    animationContainer.innerHTML = '<img src="xv.gif" alt="Winning Animation">';
    slotMachine.innerHTML = '';
    slotMachine.appendChild(animationContainer);
}

function showLosingAnimation() {
    const slotMachine = document.getElementById('slotMachine');
    const animationContainer = document.createElement('div');
    animationContainer.classList.add('animation-container');
    animationContainer.innerHTML = '<img src="76cI.gif" alt="Losing Animation">';
    slotMachine.innerHTML = '';
    slotMachine.appendChild(animationContainer);
}