document.addEventListener("DOMContentLoaded", function () {
    let keys = ['o', 'd', 'f', 'q', 'w', 'e', 'r', 'Escape', 'Tab'];
    let currentKeyIndex = 8; 
    let isGameActive = true; 
    const keyButton = document.getElementById("key");
    const startText = document.getElementById("start-text");
    const stopText = document.getElementById("stop-text");
    stopText.style.display = "none"; 
    function updateKey() {
        keyButton.textContent = `Натисніть: ${keys[currentKeyIndex]}`;
    }
    document.addEventListener('keydown', function (event) {
        if (!isGameActive) return; 
        let currentKey = keys[currentKeyIndex];
        if (event.key === currentKey) {
            currentKeyIndex = (currentKeyIndex + 1) % keys.length;
            updateKey();
            if (currentKeyIndex === 0) {
                isGameActive = false;
                stopText.style.display = "block";
                startText.style.display = "none";
                PNotify.success({
                    title: "🎉 Гра завершена!",
                    text: "Ви правильно натиснули всі клавіші!",
                });
            }
        } else {
            PNotify.error({
                title: " Помилка",
                text: `Очікувалась клавіша "${currentKey}", а ви натиснули "${event.key}".`,
            });
        }
    });
    document.addEventListener('keydown', function (event) {
        const blockedKeys = [ 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'a', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        if (blockedKeys.includes(event.key)) {
            event.preventDefault();
        }
    });
    if (!document.getElementById("new-game")) {
        let newGameButton = document.createElement("button");
        newGameButton.id = "new-game";
        newGameButton.textContent = " Нова гра";
        newGameButton.style.marginTop = "20px"; 
        document.querySelector(".game").appendChild(newGameButton);
        newGameButton.addEventListener('click', function () {
            currentKeyIndex = Math.floor(Math.random() * keys.length);
            isGameActive = true;
            updateKey();
            startText.style.display = "block";
            stopText.style.display = "none";
            PNotify.success({
                title: " Нова гра",
                text: `Гра оновлена! Натисніть "${keys[currentKeyIndex]}".`,
            });
        });
    }
    updateKey();
});

const chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    datasets: [
      {
        label: "Продажі за останній місяць",
        data: [150, 220, 180, 200, 250, 300, 280, 350, 400, 380, 420, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
        backgroundColor: "#2196f3",
        borderColor: "#2196f3",
        borderWidth: 1,
      },
    ],
  };
  
  const salesChart = new Chart(document.getElementById("sales-chart"), {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Дні місяця',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Продажі',
          },
        },
      },
    },
  });
  