//for creating accounts
document.getElementById('create-account-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('Email').value;
  const password = document.getElementById('Password').value;
  const name = document.getElementById('Name').value;
  const age = document.getElementById('Age').value;
  const height = document.getElementById('Height').value;
  const weight = document.getElementById('Weight').value;

  try {
    const response = await fetch('http://35.229.74.255:3001/api/create-account', { //replace with server IP
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, name, age, height, weight}),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Account created successfully', data);
      //redirect to another page
    } else {
      console.error('Failed to create account', data.message);
    }
  } catch (error) {
    console.error('Error connecting to server:', error);
  }
});

//for logging in 
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const email = document.getElementById('Email').value;
  const password = document.getElementById('Password').value;

  await loginUser(Email, Password);
});

async function loginUser(Email, Password) {
  try {
    const response = await fetch('http://35.229.74.255:3001/api/login', { //change to server IP
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('Login successful', data);
      //redirect here
    } else {
      console.error('Login failed', data.message);
    }
  } catch (error) {
    console.error('Error connecting to server:', error);
  }
}
