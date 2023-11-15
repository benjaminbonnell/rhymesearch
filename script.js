const searchInput = document.getElementById('searchInput');
const rhymeList = document.getElementById('rhymeList');

let timeout;

searchInput.addEventListener('keydown', function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchRhymes(searchTerm);
        }
    }, 1000);
});


function searchRhymes(word) {
    const apiUrl = `https://rhymebrain.com/talk?function=getRhymes&word=${word}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayRhymes(data);
        })
        .catch(error => {
            console.error('Error fetching rhymes:', error);
        });
}


function displayRhymes(rhymes) {
            
    rhymeList.innerHTML = '';

            
    rhymes.forEach(rhyme => {
        const wordElement = document.createElement('div');
        wordElement.textContent = rhyme.word;
        wordElement.style.fontSize = `${rhyme.score-100}px`; 
        wordElement.style.marginRight = '40px'; 
        rhymeList.appendChild(wordElement);
    });
}