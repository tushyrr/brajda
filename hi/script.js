let attemptCount = 0;

// Check if a name is already stored in local storage
const storedName = localStorage.getItem('userName');
if (storedName) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    greetUser (storedName);
    startClock();
}

document.getElementById('login-button').addEventListener('click', function() {
    const nameInput = document.getElementById('name-input').value.trim();

    // Check if the input is not empty
    if (nameInput) {
        localStorage.setItem('userName', nameInput); // Store the name in local storage
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        greetUser (nameInput);
        startClock();
    } else {
        attemptCount++;
        document.getElementById('error-message').innerText = `Fool me ${attemptCount} time(s)`;
    }
});

function greetUser (name) {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 17) {
        greeting = "Good Afternoon";
    } else if (hours < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    document.getElementById('greeting').innerText = `${greeting}`; // Set the greeting without additional text
}

function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString();
    }, 1000);
}

document.getElementById('add-reminder-button').addEventListener('click', function() {
    const reminderInput = document.getElementById('reminder-input').value;
    if (reminderInput) {
        const li = document.createElement('li');
        li.innerText = reminderInput;
        document.getElementById('reminder-list').appendChild(li);
        document.getElementById('reminder-input').value = ''; // Clear the input field
    }
});

document.getElementById('calculate-button').addEventListener('click', function() {
    const cycleLength = parseInt(document.getElementById('cycle-length').value);
    const lastPeriodDate = new Date(document.getElementById('last-period').value);
    
    if (!isNaN(cycleLength) && lastPeriodDate) {
        const nextPeriodDate = new Date(lastPeriodDate);
        nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
        document.getElementById('next-period-date').innerText = `Your next period is expected on: ${nextPeriodDate.toLocaleDateString()}`;
    } else {
        document.getElementById('next-period-date').innerText = 'Please enter valid inputs.';
    }
});