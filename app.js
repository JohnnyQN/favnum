const baseURL = "http://numbersapi.com";
const body = document.querySelector('body');
const favoriteNumber = 8;

// Utility function to display errors
function displayError(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<p style="color: red;">${message}</p>`;
  }
}

// 1. Get a fact about your favorite number
function getSingleFact() {
  fetch(`${baseURL}/${favoriteNumber}?json`)
    .then(response => response.json())
    .then(data => {
      console.log(data.text);
      const factDiv = document.getElementById('number-facts');
      factDiv.innerHTML = `<p>Fact about ${favoriteNumber}: ${data.text}</p>`;
    })
    .catch(() => {
      displayError("number-facts", "Error fetching single number fact. Please check your connection.");
    });
}

// 2. Get facts about multiple numbers
function getMultipleFacts() {
  fetch(`${baseURL}/7,11,22?json`)
    .then(response => response.json())
    .then(data => {
      const factsDiv = document.getElementById('multiple-facts');
      factsDiv.innerHTML = "";
      Object.values(data).forEach(fact => {
        console.log(fact);
        const p = document.createElement('p');
        p.textContent = fact;
        factsDiv.appendChild(p);
      });
    })
    .catch(() => {
      displayError("multiple-facts", "Error fetching multiple number facts. Please check your connection.");
    });
}

// 3. Get four facts about your favorite number
function getFourFacts() {
  const promises = Array.from({ length: 4 }, () => 
    fetch(`${baseURL}/${favoriteNumber}?json`).then(res => res.json())
  );

  Promise.all(promises)
    .then(results => {
      const factsDiv = document.getElementById('four-facts');
      factsDiv.innerHTML = "";
      results.forEach(fact => {
        const p = document.createElement('p');
        p.textContent = fact.text;
        factsDiv.appendChild(p);
      });
    })
    .catch(() => {
      displayError("four-facts", "Error fetching four facts. Please check your connection.");
    });
}

// Call the functions
getSingleFact();
getMultipleFacts();
getFourFacts();
