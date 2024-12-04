const baseURL = "http://numbersapi.com";
const body = document.querySelector('body');
const favoriteNumber = 8;

// 1. Get fact about your favorite number
async function part1() {
  try {
    const res = await fetch(`${baseURL}/${favoriteNumber}?json`);
    const data = await res.json();
    console.log(data.text);

    // Display the fact on the page
    const p = document.createElement('p');
    p.textContent = `Fact about ${favoriteNumber}: ${data.text}`;
    body.appendChild(p);
  } catch (err) {
    console.error("Error fetching single number fact:", err);
    displayError("Error fetching fact about your favorite number.");
  }
}

// 2. Get facts about multiple numbers
async function part2() {
  try {
    const res = await fetch(`${baseURL}/7,11,22?json`);
    const data = await res.json();
    Object.values(data).forEach(fact => {
      console.log(fact);
      const p = document.createElement('p');
      p.textContent = fact;
      body.appendChild(p);
    });
  } catch (err) {
    console.error("Error fetching multiple number facts:", err);
    displayError("Error fetching facts about multiple numbers.");
  }
}

// 3. Get four facts about your favorite number
async function part3() {
  try {
    const promises = Array.from({ length: 4 }, () =>
      fetch(`${baseURL}/${favoriteNumber}?json`).then(res => res.json())
    );
    const facts = await Promise.all(promises);
    facts.forEach(fact => {
      const p = document.createElement('p');
      p.textContent = fact.text;
      body.appendChild(p);
    });
  } catch (err) {
    console.error("Error fetching multiple facts:", err);
    displayError("Error fetching multiple facts about your favorite number.");
  }
}

// Handle user input for favorite number
document.getElementById('get-number-fact').addEventListener('click', async () => {
  const userNumber = document.getElementById('favorite-number-input').value || favoriteNumber;
  try {
    const res = await fetch(`${baseURL}/${userNumber}?json`);
    const data = await res.json();

    const factDiv = document.getElementById('number-facts');
    factDiv.innerHTML = `<p>Fact about ${userNumber}: ${data.text}</p>`;
  } catch (err) {
    console.error("Error fetching fact for user number:", err);
    displayError("Error fetching fact for the entered number.");
  }
});

// Utility function to display errors
function displayError(message) {
  const errorMsg = document.createElement('p');
  errorMsg.textContent = message;
  errorMsg.style.color = "red";å
  body.appendChild(errorMsg);
}

// Call the main functions
part1();
part2();
part3();
