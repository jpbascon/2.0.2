const titles = document.querySelectorAll('.title');
const currentWork = document.querySelectorAll('.current-work');
const previousWork = document.querySelectorAll('.previous-work');
const dailyFilter = document.getElementById('daily');
const weeklyFilter = document.getElementById('weekly');
const monthlyFilter = document.getElementById('monthly');
const filterButtons = document.querySelectorAll('.btn');

let timeframe = 'daily';

fetch('./data.json').then((response) => {
  if (!response.ok) return console.log('Oops! Something went wrong.');
  return response.json();
}).then((data) => {
  populateDOM(data);
});

// Function to populate the DOM with data
const populateDOM = (data) => {
  const filters = {
    daily: dailyFilter,
    weekly: weeklyFilter,
    monthly: monthlyFilter,
  };

  // Converts filters into an array of key, value pairs
  // i.e, key = 'daily', button = 'dailyFilter'
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
    filterButtons.forEach((b) => b.classList.remove('active')
    );
    btn.classList.add('active');
  })
})