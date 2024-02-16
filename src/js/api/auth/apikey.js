import { BASE_URL, API_KEY_ENDPOINT } from '../apibase.js';
export async function fetchApiKey() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const api_key = 'api_key';

    // Check if the accessToken is available
    if (!accessToken) {
      console.error('Access token not available. User may not be authenticated.');
      return;
    }

    // Set up headers
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    };

    // Make the fetch request
    const response = await fetch(BASE_URL + API_KEY_ENDPOINT, options);

    if (response.ok) {
      const data = await response.json();
      console.log('API Key:', data);
      localStorage.setItem(api_key, data.data.apiKey);
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}
