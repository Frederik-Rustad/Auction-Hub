import { BASE_URL, REGISTER_ENDPOINT } from "../apibase.js";

export function register() {
  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("registerForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const userData = {
          name: document.getElementById("registerName").value,
          email: document.getElementById("registerEmail").value,
          password: document.getElementById("registerPassword").value,
          bio: document.getElementById("registerBio").value,
          avatar: {
            url: document.getElementById("registerAvatar").value,
          },
        };

        console.log("User Data:", userData);

        fetch(BASE_URL + REGISTER_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else {
              return response
                .json()
                .then((data) =>
                  Promise.reject({ data, status: response.status }),
                );
            }
          })
          .then((data) => {
            alert("User registered successfully!");
            console.log("User profile:", data);
          })
          .catch(error => {
            let errorMessage = "An unexpected error occurred. Please try again.";
  
            if (error.body && error.body.errors && error.body.errors.length > 0) {
              errorMessage = error.body.errors[0].message;
            } else if (error.message) {
              errorMessage = error.message;
            }
            const loginErrorDiv = document.getElementById('registerError');
            if (loginErrorDiv) {
              loginErrorDiv.textContent = errorMessage;            
            }
          });
      });
  });
}
