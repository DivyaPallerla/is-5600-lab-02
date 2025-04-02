document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Generate user list
    generateUserList(userData, stocksData);
  
    // Register event listeners for delete and save buttons
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');
  
    // Delete button functionality
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent form submission
  
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
      
      // Remove the user from the array
      userData.splice(userIndex, 1);
      
      // Re-render the user list
      generateUserList(userData, stocksData);
      
      // Clear the form fields
      document.querySelector('#userID').value = '';
      document.querySelector('#firstname').value = '';
      document.querySelector('#lastname').value = '';
      document.querySelector('#address').value = '';
      document.querySelector('#city').value = '';
      document.querySelector('#email').value = '';
    });
  
    // Save button functionality
    saveButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent form submission
  
      const id = document.querySelector('#userID').value;
      
      // Find the user in the userData array and update the details
      const user = userData.find(user => user.id == id);
  
      if (user) {
        user.user.firstname = document.querySelector('#firstname').value;
        user.user.lastname = document.querySelector('#lastname').value;
        user.user.address = document.querySelector('#address').value;
        user.user.city = document.querySelector('#city').value;
        user.user.email = document.querySelector('#email').value;
  
        // Re-render the user list
        generateUserList(userData, stocksData);
      }
    });
  });
  
  // Function to generate the user list
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    
    // Clear the list before rendering a new one
    userList.innerHTML = '';
    
    users.map(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = user.lastname + ', ' + user.firstname;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    // Register click event to populate user form and render portfolio
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }
  
  // Function to handle user list click
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
    populateForm(user);
    renderPortfolio(user, stocks);
  }
  
  // Function to populate form with user data
  function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  // Function to render the user's portfolio
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous portfolio
    
    // Add headers back after clearing
    const symbolHeader = document.createElement('h3');
    symbolHeader.innerText = 'Symbol';
    const sharesHeader = document.createElement('h3');
    sharesHeader.innerText = '# Shares';
    const actionsHeader = document.createElement('h3');
    actionsHeader.innerText = 'Actions';
    
    portfolioDetails.appendChild(symbolHeader);
    portfolioDetails.appendChild(sharesHeader);
    portfolioDetails.appendChild(actionsHeader);
    
    // Render portfolio items
    portfolio.map(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
      
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
      
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    // Register the event listener for the "View" button
    portfolioDetails.addEventListener('click', (event) => {
      // Check if the clicked element is a "View" button
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  // Function to render the stock information for the symbol
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
      // Find the stock object for this symbol
      const stock = stocks.find(stock => stock.symbol == symbol);
  
      // Populate the stock form with stock information
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
  
      // Display the stock logo based on the symbol
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }