fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        const outputDiv = document.getElementById('output');
        const buttons = document.querySelectorAll('#buttons button');
        let currentData = 'daily';

        function getPreviousLabel(timeframe) {
            switch (timeframe) {
                case 'daily':
                    return 'Yesterday - ';
                case 'weekly':
                    return 'Last Week - ';
                case 'monthly':
                    return 'Last Month - ';
            }
        }

        function displayData(timeframe) {
            outputDiv.innerHTML = '';
            jsonData.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                const previousLabel = getPreviousLabel(timeframe); // Obtiene la etiqueta correcta

                itemDiv.innerHTML = `
                    <h1>${item.title}</h1>
                    <p class="current">${item.timeframes[timeframe].current}hrs</p> <p class="current">${previousLabel}${item.timeframes[timeframe].previous}hrs</p>
                `;
                outputDiv.appendChild(itemDiv);
            });
        }

        function setActiveButton(timeframe) {
            buttons.forEach(button => {
                button.classList.remove('active');
                if (button.dataset.timeframe === timeframe) {
                    button.classList.add('active');
                }
            });
        }

        displayData(currentData);
        setActiveButton(currentData);

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const timeframe = button.dataset.timeframe;
                currentData = timeframe;
                displayData(timeframe);
                setActiveButton(timeframe);
            });
        });
    })
    .catch(error => console.error("Error al cargar el JSON:", error));