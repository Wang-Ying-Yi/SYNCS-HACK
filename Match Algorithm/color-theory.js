const addCartButtons = document.querySelectorAll('.add-cart');
const colorOutput = document.getElementById('colorOutput');
const resetButton = document.getElementById('resetButton');
const calculateButton = document.getElementById('calculateButton'); // Button to calculate best match

const selectedItems = []; // Array to store selected items
const cartItems = []; // Array to store cart items

resetButton.addEventListener('click', resetCart);

addCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

calculateButton.addEventListener('click', calculateBestMatch); // Add event listener to the calculate button

// Define the addToLocalStorage function
function addToCart(event) {
    const label = event.target.getAttribute('label');
    const name = event.target.getAttribute('name');
    const imageSrc = event.target.previousElementSibling.getAttribute('src');

    readImageFromLocalStorage(imageSrc, (averageValue) => {
        // Add the item to the cartItems array
        addToCartArray(label, name, averageValue);

        // Display the RGB value and average
        colorOutput.textContent = `Label: ${label}, Name: ${name}, RGB: ${averageValue}`;
    });

    // Push the selected item to the array
    selectedItems.push({ label, name });
}

function addToCartArray(label, name, averageValue) {
    cartItems.push({ label, name, averageValue });
}

function resetCart() {
    cartItems.length = 0; // Clear the cartItems array
    colorOutput.textContent = 'Data reset.';
    selectedItems.length = 0; // Clear the selected items array
    colorOutput.textContent = 'Data Clean.';
}

function readImageFromLocalStorage(imageSrc, callback) {
    // Simulating the image loading process
    setTimeout(() => {
        const averageValue = Math.random(); // Simulated average value
        callback(averageValue);
    }, 1000);
}

// Calculate Cosine Similarity
function calculateCosineSimilarity(vec1, vec2) {
    // Calculate dot product of vec1 and vec2
    let dotProduct = 0;
    for (let i = 0; i < vec1.length; i++) {
        dotProduct += vec1[i] * vec2[i];
    }

    // Calculate magnitudes of both vectors
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

    // Calculate cosine similarity
    if (mag1 !== 0 && mag2 !== 0) {
        return dotProduct / (mag1 * mag2);
    } else {
        return 0; // Handle zero vectors or divide by zero
    }
}

function calculateBestMatch() {
    // Create an object to store the best matches for each label
    const bestMatchesObject = {
        shirt: null,
        pants: null,
        jacket: null
    };

    // Calculate the cosine similarity for each pair of items
    for (let i = 0; i < cartItems.length; i++) {
        const item1 = cartItems[i];

        for (let j = i + 1; j < cartItems.length; j++) {
            const item2 = cartItems[j];

            if (item1.label !== item2.label) {
                // Calculate cosine similarity between two items
                const similarity = calculateCosineSimilarity(
                    [item1.averageValue],
                    [item2.averageValue]
                );

                // Compare and update the best match for each label
                if (!bestMatchesObject[item1.label] || similarity > bestMatchesObject[item1.label].similarity) {
                    bestMatchesObject[item1.label] = { name: item1.name, similarity };
                }

                if (!bestMatchesObject[item2.label] || similarity > bestMatchesObject[item2.label].similarity) {
                    bestMatchesObject[item2.label] = { name: item2.name, similarity };
                }
            }
        }
    }

    // Create an array of best matches based on conditions
    const bestMatches = [];

    // Check if "pants" and "shirt" have the best match
    if (bestMatchesObject['pants'] && bestMatchesObject['shirt']) {
        bestMatches.push(bestMatchesObject['pants'].name);
        bestMatches.push(bestMatchesObject['shirt'].name);

        // Check if "jacket" is available as a best match
        if (bestMatchesObject['jacket']) {
            bestMatches.push(bestMatchesObject['jacket'].name);
        }
    } else {
        colorOutput.textContent = "Invalid selection, please select again.";
    }

    // Print or handle the best matches
    console.log(bestMatches);
}

