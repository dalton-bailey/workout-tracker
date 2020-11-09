const api = "https://gentle-spire-21312.herokuapp.com/workouts";
let workouts = [];


//fetch workouts
async function fetchWorkouts() {
  let response = await fetch(api);
  let fetchedWorkouts = await response.json();

  console.log(fetchedWorkouts)

  return fetchedWorkouts;
}

//post fetch
async function postWorkout(data) {
  let response = await fetch(api, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
}

//delete fetch
async function deleteWorkout(id) {
  let response = await fetch(api + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// push new workout to workouts array
function addWorkoutToArray(t, d, s) {
  const workoutData = {
    sport: s,
    time: t,
    distance: d,
    pace: (t / d).toFixed(2),
  };

  postWorkout(workoutData);

  workouts.push(workoutData);

  displayWorkouts();

  console.log("all workouts", workouts[0]._id);
}

//splice workout for user interface
function spliceWorkout(id) {
  const index = workouts.findIndex((workout) => workout.id == id)
  deleteWorkout(id)
  workouts.splice(index, 1)
  displayWorkouts()
}

//delete workouts
function setupDeleteButtons() {
  const close = document.getElementsByClassName("close");
  for (let t = 0; t < close.length; t++) {
    close[t].addEventListener("click", (event) => {
      spliceWorkout(event.target.dataset.id)
    })
  }
}

//add workout
function displayWorkouts() {
  const runList = document.querySelector(".run");
  runList.innerHTML = "";

  const swimList = document.querySelector(".swim")
  swimList.innerHTML = "";

  const bikeList = document.querySelector(".bike")
  bikeList.innerHTML = ""

  let runWorkoutList = workouts.filter((workout) => workout.sport === "Run");
  let swimWorkoutList = workouts.filter((workout) => workout.sport === "Swim");
  let bikeWorkoutList = workouts.filter((workout) => workout.sport === "Bike");

  runWorkoutList.forEach((workout) => createWorkoutContent(workout));
  swimWorkoutList.forEach((workout) => createWorkoutContent(workout));
  bikeWorkoutList.forEach((workout) => createWorkoutContent(workout));

  setupDeleteButtons()
}

//display workouts
function createWorkoutContent(workout) {
  const runList = document.querySelector(".run");
  const swimList = document.querySelector(".swim");
  const bikeList = document.querySelector(".bike");

  const workoutItem = document.createElement("div");
  workoutItem.className = "listItem";

  const check = document.createElement("input")
  check.type = "checkbox"
  check.dataset.id = workout._id
  check.className = "check"
  check.id = "check"
  check.check = workout.complete

  workoutItem.innerHTML = `<div> <p> Distance </p> <p> ${workout.distance} miles </p> </div> 
  <div> <p>Time </p> <p> ${workout.time} minutes </p> </div> 
  <div> <p> Pace </p> <p> ${workout.pace} minutes per mile</p> </div>
  <button data-id="${workout._id}" class="close"> X </button>`;

  if (workout.sport === "Run") {
    runList.appendChild(workoutItem);
  } else if (workout.sport === "Swim") {
    swimList.appendChild(workoutItem);
  } else if (workout.sport === "Bike") {
    bikeList.appendChild(workoutItem);
  }
}

async function main() {
  const fetchedWorkouts = await fetchWorkouts();
  workouts = fetchedWorkouts;
  displayWorkouts();

  console.log(workouts)

  const form = document.querySelector("#form");

  //event listener to get new workout data
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let time = document.getElementById("workoutTime").value;

    let distance = document.getElementById("workoutDistance").value;

    let sportDropdown = document.getElementById("sports");
    let sport = sportDropdown.options[sportDropdown.selectedIndex].text;

    if (time === "") {
      alert("Please input a time");
    } else if (distance === "") {
      alert("Please input a distance");
    } else {
      addWorkoutToArray(time, distance, sport);
    }
  });
}

main();

//   window.addEventListener("load", (event) => {
//       userName()
//   });

//   const userName = () => {
//   var person = prompt("Please enter your name");
//   if (person != null) {
//     document.getElementById("user-name").innerHTML =
//       "Hello " + person ;
//   }
//   }
