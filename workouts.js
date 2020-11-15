const api = "https://gentle-spire-21312.herokuapp.com/workouts";
// const api = "http://localhost:3000/workouts";
let workouts = [];

//fetch workouts
async function fetchWorkouts() {
  let response = await fetch(api);
  let fetchedWorkouts = await response.json();

  console.log(fetchedWorkouts);

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
}

//delete fetch
async function deleteWorkout(id) {
  let response = await fetch(api + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//complete fetch
async function completePut(id) {
  let response = await fetch(api + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// push new workout to workouts array
function addWorkoutToArray(t, d, s) {
  const workoutData = {
    complete: false,
    sport: s,
    time: t,
    distance: d,
    pace: (t / d).toFixed(2),
  };

  postWorkout(workoutData);

  workouts.push(workoutData);

  displayWorkouts();

  console.log("all workouts", workouts);
}

//splice workout for user interface
function spliceWorkout(id) {
  console.log(workouts, id);
  const index = workouts.findIndex((workout) => workout._id == id);
  deleteWorkout(id);
  workouts.splice(index, 1);
  displayWorkouts();

  console.log(index);
}

//delete workouts
function setupDeleteButtons() {
  const close = document.getElementsByClassName("close");
  for (let t = 0; t < close.length; t++) {
    close[t].addEventListener("click", (event) => {
      spliceWorkout(event.target.dataset.id);
      // let id = event.target.dataset.id;
      // console.log(id, workouts);
    });
  }
}

function completeTodo(id) {
  const index = workouts.findIndex((workout) => workout._id == id);
  console.log(index);
  const complete = {
    complete: true,
  };
  completePut(complete);
}

//set up checkmark
function setupCheckmarks() {
  const check = document.getElementsByClassName("check");
  for (let t = 0; t < check.length; t++) {
    check[t].addEventListener("click", (event) => {
      completeTodo(event.target.dataset.id);
    });
  }
}

function distances() {
  const runDistance = document.getElementById("run-distance");
  runDistance.innerHTML = ""

  const swimDistance = document.getElementById("swim-distance");
  swimDistance.innerHTML = ""

  const bikeDistance = document.getElementById("bike-distance");
  bikeDistance.innerHTML = ""

  let runWorkoutList = workouts.filter((workout) => workout.sport === "Run");
  let swimWorkoutList = workouts.filter((workout) => workout.sport === "Swim");
  let bikeWorkoutList = workouts.filter((workout) => workout.sport === "Bike");

  let runTotal = runWorkoutList.reduce((acc, curr) => acc + curr.distance, 0);
  let swimTotal = swimWorkoutList.reduce((acc, curr) => acc + curr.distance, 0);
  let bikeTotal = bikeWorkoutList.reduce((acc, curr) => acc + curr.distance, 0);

  console.log(runTotal, swimTotal, bikeTotal);

  runDistance.innerHTML = runTotal + " total miles"
  swimDistance.innerHTML = swimTotal + " total miles"
  bikeDistance.innerHTML = bikeTotal + " total miles"
}

//add workout
function displayWorkouts() {
  const runList = document.querySelector(".run");
  runList.innerHTML = "";

  const swimList = document.querySelector(".swim");
  swimList.innerHTML = "";

  const bikeList = document.querySelector(".bike");
  bikeList.innerHTML = "";

  let runWorkoutList = workouts.filter((workout) => workout.sport === "Run");
  let swimWorkoutList = workouts.filter((workout) => workout.sport === "Swim");
  let bikeWorkoutList = workouts.filter((workout) => workout.sport === "Bike");

  runWorkoutList.forEach((workout) => createWorkoutContent(workout));
  swimWorkoutList.forEach((workout) => createWorkoutContent(workout));
  bikeWorkoutList.forEach((workout) => createWorkoutContent(workout));

  runWorkoutList.forEach((workout) => distances(workout));

  setupDeleteButtons();
  setupCheckmarks();
  distances()
}

//display workouts
function createWorkoutContent(workout) {
  const runList = document.querySelector(".run");
  const swimList = document.querySelector(".swim");
  const bikeList = document.querySelector(".bike");

  const workoutItem = document.createElement("div");
  workoutItem.className = "listItem";

  const check = document.createElement("input");
  check.type = "checkbox";
  check.dataset.id = workout._id;
  check.className = "check";
  check.id = "check";
  check.checked = workout.complete;

  workoutItem.innerHTML = `<div> <p> Distance </p> <p> ${workout.distance} miles </p> </div> 
  <div> <p>Time </p> <p> ${workout.time} minutes </p> </div> 
  <div> <p> Pace </p> <p> ${workout.pace} minutes per mile</p> </div>
  <button data-id="${workout._id}" class="close"> X </button>`;

  workoutItem.prepend(check);

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

  console.log(workouts);

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
