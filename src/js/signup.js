document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const response = await fetch('/users', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Redirect to cart page
      window.location.href = '/cart.html';
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Failed to create user. Please try again.');
  }
});
