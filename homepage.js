document.addEventListener("DOMContentLoaded", function () {
    const signinbtn = document.querySelector("#sign-in-btn");
    const signupbtn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    const loginForm = document.querySelector("#login-form");
    const loadingScreen = document.querySelector(".loading-screen");
  
    signupbtn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
  
    signinbtn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  
    function showLoadingScreen() {
      loadingScreen.classList.add("active");
    }
  
    function hideLoadingScreen() {
      loadingScreen.classList.remove("active");
    }
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Simulate login or implement server-side communication (replace with your actual logic)
      // ...
  
      // Show loading screen
      showLoadingScreen();
  
      // Wait for the animation to complete before navigating
      setTimeout(() => {
        window.location.href = "/index.html"; // Use the correct URL for your project
      }, 500); // Duration should match the CSS transition duration
    });
  
    // Hide the loading screen when the page loads
    window.addEventListener("load", function () {
      hideLoadingScreen();
    });
  });
  



