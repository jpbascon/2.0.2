// Select all elements with the class "title"
const titles = document.querySelectorAll('.title');

// Fetch the JSON data from data.json
fetch('./data.json')
  .then((response) => {
    // If the response is not OK, log an error and stop
    if (!response.ok) return console.log('Oops! Something went wrong.');
    // Otherwise, parse the response body as JSON
    return response.json();
  })
  .then((data) => {
    // Once the data is parsed, call populateDOM and pass the data to it
    populateDOM(data);
  });

// Function to populate the DOM with data
const populateDOM = (data) => {
  // Loop through each item in the data array
  data.forEach((item, index) => {
    // Call appendItem for each item, passing in the item and its index
    appendItem(item, index);
  });
};

// Function to append a new <p> element into the corresponding .title element
const appendItem = (item, index) => {
  // Create a new <p> element
  const titleDOM = document.createElement('p');

  // Set the text content of the <p> to the item's title
  titleDOM.textContent = item.title;

  // Check if there is a corresponding .title element at this index
  if (titles[index]) {
    // Append the new <p> element to the .title element
    titles[index].append(titleDOM);
  }
};
