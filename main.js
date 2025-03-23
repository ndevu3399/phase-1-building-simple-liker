// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Ensure the error modal is hidden initially
document.getElementById("modal").classList.add("hidden");

// Select all heart elements
const hearts = document.querySelectorAll(".like-glyph");

// Add click event listener to each heart
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    handleHeartClick(heart);
  });
});

function handleHeartClick(heart) {
  mimicServerCall()
    .then(() => {
      // If successful, toggle heart appearance
      if (heart.textContent === EMPTY_HEART) {
        heart.textContent = FULL_HEART; // Change to full heart
        heart.classList.add("activated-heart");
      } else {
        heart.textContent = EMPTY_HEART; // Change back to empty heart
        heart.classList.remove("activated-heart");
      }
    })
    .catch(error => {
      // If the request fails, show error modal
      const modal = document.getElementById("modal");
      const modalMessage = document.getElementById("modal-message");
      modalMessage.textContent = error;
      modal.classList.remove("hidden");

      // Hide the error modal after 3 seconds
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 3000);
    });
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

