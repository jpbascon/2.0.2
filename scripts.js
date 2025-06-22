const titles = document.querySelectorAll('.title');
const currentWork = document.querySelectorAll('.current-work');
const previousWork = document.querySelectorAll('.previous-work');
const filterButtons = document.querySelectorAll('.btn');
const dailyFilter = document.getElementById('daily');
const weeklyFilter = document.getElementById('weekly');
const monthlyFilter = document.getElementById('monthly');

let timeframe = 'daily';

// Define an asynchronous function to load the data
async function loadData() {
  try {
    // Attempt to fetch the data.json file
    const response = await fetch('./data.json');
    // Check if the HTTP response status is NOT OK (e.g., 404, 500, etc.)
    if (!response.ok) {
      // Throw a custom error message to be caught by the catch block
      throw new Error('Oops! Something went wrong.');
    }
    // Parse the response body as JSON (this also returns a Promise)
    const data = await response.json();
    populateDOM(data);
  } catch (error) {
    // Catch and handle any errors that occur during fetch or JSON parsing
    console.error('Fetch error:', error.message);
  }
}

// Call the async function to begin the data fetching process
loadData();

// Function to populate the DOM with data
const populateDOM = (data) => {
  const filters = {
    daily: dailyFilter,
    weekly: weeklyFilter,
    monthly: monthlyFilter,
  };

  // Converts filters into an array of key, value pairs
  // i.e, [['daily', dailyFilter], ['weekly', weeklyFilter]]
  // NOTE: Object properties that contains variable will return
  // the value of said variable. However, If it's pointing
  // on a variable that contains DOM, it returns the
  // exact reference.
  Object.entries(filters).forEach(([key, button]) => {
    button.addEventListener('click', () => {
      timeframe = key;
      // loops until data is empty
      data.forEach((item, index) => {
        appendItem(item, index);
      });
    });
  });

  data.forEach((item, index) => {
    appendItem(item, index);
  });
};

const appendItem = (item, index) => {
  // current = 5, previous = 7 if timeframe = 'daily'
  const { current, previous } = item.timeframes[timeframe];

  const titleDOM = document.createElement('p');
  const currentWorkDOM = document.createElement('h1');
  const previousWorkDOM = document.createElement('p');

  titleDOM.textContent = item.title;
  currentWorkDOM.textContent = `${current}hrs`;
  previousWorkDOM.textContent = `Last Week - ${previous}hrs`;

  if (titles[index]) {
    titles[index].replaceChildren(titleDOM);
  }
  if (currentWork[index]) {
    currentWork[index].replaceChildren(currentWorkDOM);
  }
  if (previousWork[index]) {
    previousWork[index].replaceChildren(previousWorkDOM);
  }
};

/* Filter Styles */
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  })
})