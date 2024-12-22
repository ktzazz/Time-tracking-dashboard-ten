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
                const bgDiv = document.createElement('div');
                bgDiv.classList.add('bg'+item.title.replace(/\s+/g, '-'));
        
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
        
                const previousLabel = getPreviousLabel(timeframe);
        
                itemDiv.innerHTML = `
                    <div class="squareT"><h1>${item.title}</h1> <div id="dots"> <img src="images/icon-ellipsis.svg" alt="ellipsis" id="ellipsis"></div></div>
                    <div class="text"><p class="current">${item.timeframes[timeframe].current}hrs</p> <p class="previous">${previousLabel}${item.timeframes[timeframe].previous}hrs</p></div>
                `;
        
                bgDiv.appendChild(itemDiv); // Anida itemDiv dentro de bgDiv
                outputDiv.appendChild(bgDiv); // Agrega bgDiv al outputDiv
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
    .catch(error => console.error("Oops! Something went wrong.", error));