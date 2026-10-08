// --- Завдання 1. Конвертер температур ---
function task1() {
    const fInput = document.getElementById('fahrenheit');
    const cInput = document.getElementById('celsius');

    fInput.addEventListener('input', function() {
        if (fInput.value === '') { cInput.value = ''; return; }
        const f = parseFloat(fInput.value);
        cInput.value = (5 / 9 * (f - 32)).toFixed(2);
    });

    cInput.addEventListener('input', function() {
        if (cInput.value === '') { fInput.value = ''; return; }
        const c = parseFloat(cInput.value);
        fInput.value = (c * 9 / 5 + 32).toFixed(2);
    });
}

// --- Завдання 2. Таблиця множення (Ввід) ---
function task2() {
    let correct = 0, total = 0, expected = 0;
    const scoreText = document.getElementById('task2-score');
    const nextBtn = document.getElementById('task2-next');
    const questionText = document.getElementById('task2-question');
    const answerInput = document.getElementById('task2-answer');
    const checkBtn = document.getElementById('task2-check');
    const resultText = document.getElementById('task2-result');

    function generate() {
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        expected = a * b;
        questionText.textContent = `${a} × ${b} = `;
        answerInput.value = '';
        resultText.textContent = '';
        answerInput.disabled = false;
        checkBtn.disabled = false;
    }

    function updateScore() {
        let percent = total === 0 ? 0 : Math.round((correct / total) * 100);
        scoreText.textContent = `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
    }

    checkBtn.addEventListener('click', function() {
        if (answerInput.value === '') return;
        total++;
        if (parseInt(answerInput.value) === expected) {
            correct++;
            resultText.textContent = 'Правильно!';
            resultText.style.color = 'green';
        } else {
            resultText.textContent = `Помилка, правильна відповідь «${expected}»`;
            resultText.style.color = 'red';
        }
        updateScore();
        answerInput.disabled = true;
        checkBtn.disabled = true;
    });

    nextBtn.addEventListener('click', generate);
    generate();
}

// --- Завдання 3. Таблиця множення (Вибір варіанту) ---
function task3() {
    let correct = 0, total = 0, expected = 0;
    const scoreText = document.getElementById('task3-score');
    const nextBtn = document.getElementById('task3-next');
    const questionText = document.getElementById('task3-question');
    const optionsDiv = document.getElementById('task3-options');
    const resultText = document.getElementById('task3-result');

    function generate() {
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        expected = a * b;
        questionText.textContent = `${a} × ${b} = `;
        resultText.textContent = '';
        
        let answers = [expected];
        while (answers.length < 4) {
            let wrong = Math.floor(Math.random() * 81) + 1;
            if (!answers.includes(wrong)) answers.push(wrong);
        }
        answers.sort(() => Math.random() - 0.5); // перемішування

        optionsDiv.innerHTML = '';
        answers.forEach(ans => {
            const label = document.createElement('label');
            label.style.display = 'block';
            label.style.margin = '8px 0';
            label.style.cursor = 'pointer';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'task3-radio';
            radio.value = ans;
            
            radio.addEventListener('change', function() {
                document.querySelectorAll('input[name="task3-radio"]').forEach(r => r.disabled = true);
                total++;
                if (parseInt(radio.value) === expected) {
                    correct++;
                    resultText.textContent = 'Правильно!';
                    resultText.style.color = 'green';
                } else {
                    resultText.textContent = `Помилка, правильна відповідь «${expected}»`;
                    resultText.style.color = 'red';
                }
                updateScore();
            });

            label.appendChild(radio);
            label.appendChild(document.createTextNode(' ' + ans));
            optionsDiv.appendChild(label);
        });
    }

    function updateScore() {
        let percent = total === 0 ? 0 : Math.round((correct / total) * 100);
        scoreText.textContent = `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
    }

    nextBtn.addEventListener('click', generate);
    generate();
}

// --- Завдання 4. Ротатор фотографій ---
function initPhotoRotator(containerId, imagesArray) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Контейнер ротатора не знайдено!");
        return;
    }
    container.innerHTML = ''; 

    let currentIndex = 0;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.border = '1px solid #ccc';
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '800px';
    wrapper.style.margin = '10px 0';
    wrapper.style.backgroundColor = '#fff';

    const leftSide = document.createElement('div');
    leftSide.style.width = '15%';
    leftSide.style.borderRight = '1px solid #ccc';
    leftSide.style.display = 'flex';
    leftSide.style.alignItems = 'center';
    leftSide.style.justifyContent = 'center';
    
    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.textContent = 'Назад';
    prevLink.style.textDecoration = 'none';
    prevLink.style.color = '#724f8d'; 
    leftSide.appendChild(prevLink);

    const centerSection = document.createElement('div');
    centerSection.style.flexGrow = '1';
    centerSection.style.display = 'flex';
    centerSection.style.flexDirection = 'column';

    const infoTop = document.createElement('div');
    infoTop.style.borderBottom = '1px solid #ccc';
    infoTop.style.padding = '8px';
    infoTop.style.textAlign = 'center';
    infoTop.style.fontSize = '14px';

    const imgContainer = document.createElement('div');
    imgContainer.style.padding = '15px';
    imgContainer.style.textAlign = 'center';
    
    const imgEl = document.createElement('img');
    imgEl.style.maxWidth = '100%';
    imgEl.style.maxHeight = '400px';
    imgEl.style.objectFit = 'contain';
    imgContainer.appendChild(imgEl);

    const infoBottom = document.createElement('div');
    infoBottom.style.borderTop = '1px solid #ccc';
    infoBottom.style.padding = '8px';
    infoBottom.style.textAlign = 'center';
    infoBottom.style.fontSize = '14px';
    
    const titleEl = document.createElement('div');
    titleEl.style.fontWeight = 'bold';
    const descEl = document.createElement('div');
    
    infoBottom.appendChild(titleEl);
    infoBottom.appendChild(descEl);

    centerSection.appendChild(infoTop);
    centerSection.appendChild(imgContainer);
    centerSection.appendChild(infoBottom);

    const rightSide = document.createElement('div');
    rightSide.style.width = '15%';
    rightSide.style.borderLeft = '1px solid #ccc';
    rightSide.style.display = 'flex';
    rightSide.style.alignItems = 'center';
    rightSide.style.justifyContent = 'center';

    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.textContent = 'Вперед';
    nextLink.style.textDecoration = 'none';
    nextLink.style.color = '#724f8d'; 
    rightSide.appendChild(nextLink);

    wrapper.appendChild(leftSide);
    wrapper.appendChild(centerSection);
    wrapper.appendChild(rightSide);
    container.appendChild(wrapper);

    function updateView() {
        const currentImg = imagesArray[currentIndex];
        infoTop.textContent = `Фотографія ${currentIndex + 1} з ${imagesArray.length}`;
        imgEl.src = currentImg.path;
        titleEl.textContent = currentImg.title;
        descEl.textContent = currentImg.description;

        prevLink.style.visibility = (currentIndex === 0) ? 'hidden' : 'visible';
        nextLink.style.visibility = (currentIndex === imagesArray.length - 1) ? 'hidden' : 'visible';
    }

    prevLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex > 0) { currentIndex--; updateView(); }
    });

    nextLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex < imagesArray.length - 1) { currentIndex++; updateView(); }
    });

    updateView();
}

function task4() {
    const imagesArray = [
        { path: 'apple.jpg', title: 'Яблуко', description: 'Стигле червоне яблуко' },
        { path: 'banana.jpg', title: 'Банани', description: 'Зв\'язка свіжих бананів' },
        { path: 'orange.jpg', title: 'Апельсин', description: 'Соковитий апельсин' }
    ];

    initPhotoRotator('rotator', imagesArray);
}

// --- Завдання 5. Captcha ---
function task5() {
    const digitMatrix = {
        '0': [1,1,1, 1,0,1, 1,0,1, 1,0,1, 1,1,1],
        '1': [0,1,0, 1,1,0, 0,1,0, 0,1,0, 1,1,1],
        '2': [1,1,1, 0,0,1, 1,1,1, 1,0,0, 1,1,1],
        '3': [1,1,1, 0,0,1, 1,1,1, 0,0,1, 1,1,1],
        '4': [1,0,1, 1,0,1, 1,1,1, 0,0,1, 0,0,1],
        '5': [1,1,1, 1,0,0, 1,1,1, 0,0,1, 1,1,1],
        '6': [1,1,1, 1,0,0, 1,1,1, 1,0,1, 1,1,1],
        '7': [1,1,1, 0,0,1, 0,1,0, 1,0,0, 1,0,0],
        '8': [1,1,1, 1,0,1, 1,1,1, 1,0,1, 1,1,1],
        '9': [1,1,1, 1,0,1, 1,1,1, 0,0,1, 1,1,1]
    };

    const displayDiv = document.getElementById('captcha-display');
    const checkBtn = document.getElementById('captcha-check');
    const inputField = document.getElementById('captcha-input');
    const resultText = document.getElementById('captcha-result');
    const digitsCount = 2; 
    let secretCode = '';

    function generateCaptcha() {
        secretCode = '';
        displayDiv.innerHTML = '';
        for (let i = 0; i < digitsCount; i++) {
            const randomDigit = Math.floor(Math.random() * 10).toString();
            secretCode += randomDigit;
            
            const digitBox = document.createElement('div');
            digitBox.className = 'captcha-digit';
            
            digitMatrix[randomDigit].forEach(pixelVal => {
                const span = document.createElement('span');
                span.className = pixelVal ? 'captcha-pixel active' : 'captcha-pixel';
                digitBox.appendChild(span);
            });
            displayDiv.appendChild(digitBox);
        }
    }

    checkBtn.addEventListener('click', function() {
        if (inputField.value.trim() === secretCode) {
            resultText.textContent = 'Правильно!';
            resultText.style.color = 'green';
            setTimeout(() => {
                inputField.value = '';
                resultText.textContent = '';
                generateCaptcha();
            }, 1500);
        } else {
            resultText.textContent = 'Помилка';
            resultText.style.color = 'red';
        }
    });

    generateCaptcha();
}

// Виклик усіх функцій
task1();
task2();
task3();
task4();
task5();