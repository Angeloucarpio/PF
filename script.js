let currentAudio = null;

// Play background music after the first click event
document.addEventListener(
  "click",
  () => {
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic && bgMusic.paused) {
      bgMusic.play();
    }
  },
  { once: true }
);

// Function to create profile
function createProfile() {
  // Save profile data to localStorage
  ["name", "birthday", "bio", "quote"].forEach((id) =>
    localStorage.setItem(id, document.getElementById(id).value)
  );

  let reader = new FileReader();

  // On loading profile and background images, save them to localStorage and redirect to the feed page
  reader.onload = (e) => {
    localStorage.setItem("profileImage", e.target.result);
    localStorage.setItem("backgroundImage", e.target.result); // Save background image
    playSound("NEFFEX.mp3"); // Play sound after profile creation

    // Ensure redirection happens after profile creation
    window.location.replace("feed.html"); // Force the redirect to feed page
  };

  // Read the profile picture if selected
  const profilePic = document.getElementById("profilePic").files[0];
  if (profilePic) {
    reader.readAsDataURL(profilePic);
  }

  // Read the background picture if selected
  const backgroundPic = document.getElementById("backgroundPic").files[0];
  if (backgroundPic) {
    reader.readAsDataURL(backgroundPic);
  }
}

// Listen for the end of the intro video and show the main content
document.getElementById("introVideo").addEventListener("ended", function () {
  document.getElementById("splashScreen").style.display = "none"; // Hide splash screen
  document.getElementById("mainContent").style.display = "block"; // Show the form
});

// Function to load profile data
function loadProfile() {
  // Load profile data from localStorage and display it
  ["name", "birthday", "bio", "quote"].forEach((id) => {
    const value = localStorage.getItem(id);
    if (value) {
      document.getElementById(
        `display${id.charAt(0).toUpperCase() + id.slice(1)}`
      ).textContent = value;
    }
  });

  // Load profile image if available
  const profileImage = localStorage.getItem("profileImage");
  if (profileImage) {
    document.getElementById("profileImage").src = profileImage;
  }

  // Load background image if available
  const backgroundImage = localStorage.getItem("backgroundImage");
  if (backgroundImage) {
    document.getElementById("backgroundImage").src = backgroundImage;
  }
}

// Function to post a tweet
function postTweet() {
  const tweetText = document.getElementById("tweetInput").value.trim();
  if (tweetText) {
    let tweetDiv = document.createElement("div");
    tweetDiv.classList.add("tweet");
    tweetDiv.innerHTML = `
            <p>${tweetText}</p>
            <button class="like-btn" data-liked="false">❤️</button>
            <span class="like-count">0</span>
        `;
    document.getElementById("tweetFeed").appendChild(tweetDiv);
    document.getElementById("tweetInput").value = ""; // Clear input field after posting
    playSound("MARS.mp3"); // Play sound after posting a tweet
  }
}

// Toggle like button state when clicked and play sound
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("like-btn")) {
    const btn = event.target;
    const likeCount = btn.nextElementSibling;
    const isLiked = btn.dataset.liked === "true";
    btn.dataset.liked = isLiked ? "false" : "true";
    likeCount.textContent = isLiked ? "0" : "1"; // Toggle like count between 0 and 1
    playSound("NEFFEX.mp3"); // Play sound when liking/unliking
  }
});

// Play sound function (pauses any previously playing sound)
const playSound = (soundFile) => {
  if (currentAudio) {
    currentAudio.pause(); // Pause any previously playing audio
  }
  currentAudio = new Audio(soundFile); // Load new audio file
  currentAudio.play(); // Play the sound
};

// Load profile data when the page is loaded
loadProfile();
