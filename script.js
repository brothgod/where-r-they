// Variables to store the current selection state
let currentGenderFilter = "all"; // Default to showing all genders
let currentDepartmentFilter = "all"; // Default to showing all departments
toggleSelected("all");

// Function to fetch the JSON file
function fetchImagesFromJson(jsonUrl) {
  fetch(jsonUrl)
    .then((response) => response.json())
    .then((data) => displayImages(data))
    .catch((error) => console.error("Error fetching JSON:", error));
}

// Function to display images from the JSON data
function displayImages(imageData) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = ""; // Clear existing images before displaying new ones

  // Iterate over each object in the JSON data
  for (const name in imageData) {
    if (Object.hasOwnProperty.call(imageData, name)) {
      const person = imageData[name];

      // Create an image element
      const image = document.createElement("img");
      image.src = person.image_path;
      image.className = person.gender; // Add a class based on gender
      image.department = person.department;
      image.height = 50;
      image.width = 50;

      // Set the onload event to position the image randomly
      image.onload = () => {
        const personDiv = document.createElement("div");
        personDiv.className = "person";
        personDiv.style.position = "absolute"; // Ensure proper positioning
        personDiv.style.left = `${getRandomNumber(
          10,
          window.innerWidth - 50
        )}px`;
        personDiv.style.top = `${getRandomNumber(
          10,
          window.innerHeight - 250
        )}px`;
        personDiv.appendChild(image);
        imageContainer.appendChild(personDiv);
      };
    }
  }
}

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to update the current selection state for gender
function updateGenderFilter(gender) {
  currentGenderFilter = gender;
}

// Function to update the current selection state for department
function updateDepartmentFilter(department) {
  currentDepartmentFilter = department;
}

// Function to filter and display images based on the current selection
function filterAndDisplayImages() {
  const images = document.querySelectorAll(".person img");
  images.forEach((image) => {
    const imageGender = image.className;
    const imageDepartment = image.department;
    if (
      (currentGenderFilter === "all" || imageGender === currentGenderFilter) &&
      (currentDepartmentFilter === "all" ||
        imageDepartment === currentDepartmentFilter)
    ) {
      image.parentNode.style.display = "block"; // Show images that match both criteria
    } else {
      image.parentNode.style.display = "none"; // Hide images that do not match both criteria
    }
  });
}

function toggleSelected(element_id) {
  if (currentDepartmentFilter === currentGenderFilter) {
    document.getElementById(element_id).classList.toggle("selected");
  } else if (element_id !== "all") {
    document.getElementById(element_id).classList.toggle("selected");
  }
}

// Event listener for the "women" button
var women = document.getElementById("female");
women.addEventListener("click", function () {
  toggleSelected(currentGenderFilter);
  //document.getElementById(currentGenderFilter).classList.toggle("selected");
  updateGenderFilter("female");
  women.classList.toggle("selected");
  filterAndDisplayImages();
});

// Event listener for the "men" button
var men = document.getElementById("male");
men.addEventListener("click", function () {
  toggleSelected(currentGenderFilter);
  //document.getElementById(currentGenderFilter).classList.toggle("selected");
  updateGenderFilter("male");
  men.classList.toggle("selected");
  filterAndDisplayImages();
});

// Event listener for the "senate" button
var senate = document.getElementById("sen");
senate.addEventListener("click", function () {
  toggleSelected(currentDepartmentFilter);
  //document.getElementById(currentDepartmentFilter).classList.toggle("selected");
  updateDepartmentFilter("sen");
  senate.classList.toggle("selected");
  filterAndDisplayImages();
});

// Event listener for the "house" button
var house = document.getElementById("rep");
house.addEventListener("click", function () {
  toggleSelected(currentDepartmentFilter);
  //document.getElementById(currentDepartmentFilter).classList.toggle("selected");
  updateDepartmentFilter("rep");
  house.classList.toggle("selected");
  filterAndDisplayImages();
});

// Event listener for the "court" button
var court = document.getElementById("court");
court.addEventListener("click", function () {
  toggleSelected(currentDepartmentFilter);
  //document.getElementById(currentDepartmentFilter).classList.toggle("selected");
  updateDepartmentFilter("court");
  court.classList.toggle("selected");
  filterAndDisplayImages();
});

// Event listener for the "cabinet" button
var cabinet = document.getElementById("cab");
cabinet.addEventListener("click", function () {
  toggleSelected(currentDepartmentFilter);
  //document.getElementById(currentDepartmentFilter).classList.toggle("selected");
  updateDepartmentFilter("cab");
  cabinet.classList.toggle("selected");
  filterAndDisplayImages();
});

// Event listener for the "allImages" button
var all = document.getElementById("all");
all.addEventListener("click", function () {
  if (currentDepartmentFilter !== currentGenderFilter) {
    toggleSelected(currentDepartmentFilter);
  }
  toggleSelected(currentGenderFilter);

  //document.getElementById(currentDepartmentFilter).classList.toggle("selected");
  //document.getElementById(currentGenderFilter).classList.toggle("selected");
  currentGenderFilter = "all";
  currentDepartmentFilter = "all";
  all.classList.toggle("selected");
  filterAndDisplayImages();
});

// URL of the JSON file containing image paths
const jsonUrl = "congress_data.json";

// Fetch images from JSON and display them
fetchImagesFromJson(jsonUrl);
