async function loginUser(email, password) {
  try {
    const response = await fetch('http://<YOUR_GCP_SERVER_IP>:3000/api/login', { //change for IP
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('Login successful', data);
    } else {
      console.error('Login failed', data.message);
    }
  } catch (error) {
    console.error('Error connecting to server:', error);
  }
}
