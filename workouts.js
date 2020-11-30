// const { json } = require("body-parser");

const api = "https://gentle-spire-21312.herokuapp.com/workouts";
const goalsApi = "https://gentle-spire-21312.herokuapp.com/goals";
// const api = "http://localhost:3000/workouts";
// const goalsApi = "http://localhost:3000/goals"
let workouts = [];
let goals = [];

//fetch workouts
async function fetchWorkouts() {
  let response = await fetch(api);
  let fetchedWorkouts = await response.json();

  // console.log(fetchedWorkouts);

  return fetchedWorkouts;
}

//fetch goals
async function fetchGoals() {
  let response = await fetch(goalsApi);
  let fetchedGoals = await response.json();

  // console.log("goals",fetchedGoals);

  return fetchedGoals;
}

//post workout
async function postWorkout(data) {
  let response = await fetch(api, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//post goal
async function postGoal(goalData) {
  let response = await fetch(goalsApi, {
    method: "POST",
    body: JSON.stringify(goalData),
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

async function updateWorkout(id, workout) {
  let response = await fetch(api + "/" + id, {
    method: "PUT",
    body: JSON.stringify(workout),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//push new workout to workouts array
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


  // console.log("all workouts", workouts);
}

//push new goal to goals array
function addGoalToArray(s, d) {
  const goalData = {
    complete: false,
    sport: s,
    distance: d,
  };

  postGoal(goalData);

  goals.push(goalData);

  displayGoals();

  console.log("goals", goals);
}

//splice workout for user interface
function spliceWorkout(id) {
  // console.log(workouts, id);
  const index = workouts.findIndex((workout) => workout._id == id);
  // deleteWorkout(id);
  workouts.splice(index, 1);
  displayWorkouts();
  deleteWorkout(id);
  console.log(index);
}

//complete workout
function completeWorkout(id) {
  const index = workouts.findIndex((workout) => workout._id == id);
  complete = workouts[index]["complete"] = !workouts[index]["complete"];
  // console.log(workouts, index, complete);
  updateWorkout(id, workouts[index]);
}

//edit workout
function editWorkout(elem, id) {
  elem.querySelector(".distance").disabled = false;
  elem.querySelector(".time").disabled = false;
  
  const rank = document.querySelector(".rank")
  // console.log(rank)
  // rank.style.display = "block"

  const editButton = document.querySelector(".editButton");
  // editButton.style.display = "none";

  const saveButton = document.querySelector(".saveButton");
  // saveButton.style.display = "block";

  console.log(id);
}

//save workout
function saveWorkout(elem, id, data) {
  elem.querySelector(".distance").disabled = true;
  elem.querySelector(".time").disabled = true;

  const editButton = document.querySelector(".editButton");
  // editButton.style.display = "block";

  const saveButton = document.querySelector(".saveButton");
  // saveButton.style.display = "none";

  const rank = document.querySelector(".rank")
  // rank.style.display = "none"

  updateWorkout(id, data);
  // console.log(id)
}

function distances() {
  const runDistance = document.getElementById("run-distance");
  runDistance.innerHTML = "";

  const swimDistance = document.getElementById("swim-distance");
  swimDistance.innerHTML = "";

  const bikeDistance = document.getElementById("bike-distance");
  bikeDistance.innerHTML = "";

  let runWorkoutList = workouts.filter((workout) => workout.sport === "Run");
  let swimWorkoutList = workouts.filter((workout) => workout.sport === "Swim");
  let bikeWorkoutList = workouts.filter((workout) => workout.sport === "Bike");

  let runTotal = runWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);
  let swimTotal = swimWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);
  let bikeTotal = bikeWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);

  // console.log(runTotal, swimTotal, bikeTotal);

  runDistance.innerHTML = runTotal + " total miles";
  swimDistance.innerHTML = swimTotal + " total miles";
  bikeDistance.innerHTML = bikeTotal + " total miles";
}

function rankings() {
  let rankDropdown = document.querySelector(".rank")

  let rank = rankDropdown.options[rankDropdown.selectedIndex].text;

  console.log(rank)
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


  distances();
}

//add goals
function displayGoals() {
  const runGoal = document.getElementById("run-goal");
  runGoal.innerHTML = "";

  const swimGoal = document.getElementById("swim-goal");
  swimGoal.innerHTML = "";

  const bikeGoal = document.getElementById("bike-goal");
  bikeGoal.innerHTML = "";

  let runGoalsList = goals.filter((goal) => goal.sport === "Run");
  let swimGoalsList = goals.filter((goal) => goal.sport === "Swim");
  let bikeGoalsList = goals.filter((goal) => goal.sport === "Bike");

  runGoalsList.forEach((goal) => createGoalContent(goal));
  swimGoalsList.forEach((goal) => createGoalContent(goal));
  bikeGoalsList.forEach((goal) => createGoalContent(goal));
}

//workouts content
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
  check.addEventListener("click", () => {
    completeWorkout(workout._id);
  });

  const close = document.createElement("button");
  close.dataset.id = workout._id;
  check.className = "close";
  close.innerHTML = `<i class="far fa-trash-alt"></i>`;
  close.addEventListener("click", () => {
    deleteWorkout(workout._id);
    spliceWorkout(workout._id);
  });

  const edit = document.createElement("button");
  edit.dataset.id = workout._id;
  edit.className = "editButton";
  edit.innerHTML = `<i class="far fa-edit"></i>`;

  const save = document.createElement("button");
  save.dataset.id = workout._id;
  save.className = "saveButton";
  save.innerHTML = `<i class="far fa-save"></i>`;
  // save.style.display = "none"

  edit.addEventListener("click", () => {
    editWorkout(workoutItem, workout._id);
  });

  save.addEventListener("click", () => {
    saveWorkout(workoutItem, workout._id);
  });

  const values = ["","easy", "medium", "hard"]

  const rankDropdown = document.createElement("select")
  rankDropdown.name = "ranks"
  rankDropdown.className = "rank"
  // rankDropdown.style.display = "none"

  values.forEach(rank => {
    let option = document.createElement("option")
    option.text = (rank)
    rankDropdown.appendChild(option)
  })


  workoutItem.innerHTML = `
  <div> <p> Distance </p> <input class="distance" type="text" value= "${workout.distance} miles" disabled> </div> 
  <div> <p>Time </p> <input class="time" type="text" value="${workout.time} minutes" disabled> </p>  </div> 
  <div> <p> Pace </p> <p> ${workout.pace} minutes per mile</p> </div>
  `;

  workoutItem.prepend(check);
  workoutItem.appendChild(rankDropdown)
  workoutItem.appendChild(close);
  workoutItem.appendChild(edit);
  workoutItem.appendChild(save);

  if (workout.sport === "Run") {
    runList.appendChild(workoutItem);
  } else if (workout.sport === "Swim") {
    swimList.appendChild(workoutItem);
  } else if (workout.sport === "Bike") {
    bikeList.appendChild(workoutItem);
  }
}

//goals content
function createGoalContent(goal) {
  const runGoal = document.getElementById("run-goal");
  const swimGoal = document.getElementById("swim-goal");
  const bikeGoal = document.getElementById("bike-goal");

  let runWorkoutList = workouts.filter((workout) => workout.sport === "Run");
  let swimWorkoutList = workouts.filter((workout) => workout.sport === "Swim");
  let bikeWorkoutList = workouts.filter((workout) => workout.sport === "Bike");

  let runTotal = runWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);
  let swimTotal = swimWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);
  let bikeTotal = bikeWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);

  if (goal.sport === "Run") {
    runGoal.innerHTML = runTotal + "/" + goal.distance;
  } else if (goal.sport === "Swim") {
    swimGoal.innerHTML = swimTotal + "/" + goal.distance;
  } else if (goal.sport === "Bike") {
    bikeGoal.innerHTML = bikeTotal + "/" + goal.distance;
  }
}

async function main() {
  const fetchedWorkouts = await fetchWorkouts();
  const fetchedGoals = await fetchGoals();
  workouts = fetchedWorkouts;
  goals = fetchedGoals;
  displayWorkouts();
  displayGoals();
  // editWorkout()

  console.log(workouts);
  console.log(goals);

  const newWorkoutForm = document.querySelector("#newWorkoutForm");
  let sportDropdown = document.getElementById("sports");
  const newGoalForm = document.querySelector("#newGoalForm");
  let goalSportDropdown = document.getElementById("goal-sports");
  

  //event listener to get new workout data
  newWorkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let time = document.getElementById("workoutTime").value;

    let distance = Number(document.getElementById("workoutDistance").value);

    let sport = sportDropdown.options[sportDropdown.selectedIndex].text;

    if (time === "") {
      alert("Please input a time");
    } else if (distance === "") {
      alert("Please input a distance");
    } else {
      addWorkoutToArray(time, distance, sport);
      updateWorkout(time, distance, sport)
    }
  });

  //event listener to get new goal data
  newGoalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let goalSport =
      goalSportDropdown.options[goalSportDropdown.selectedIndex].text;

    let goalDistance = Number(document.getElementById("gotalDistance").value);

    console.log(goalSport, goalDistance);

    if (goalDistance === "") {
      alert("please input a goal distance");
    } else {
      // addGoals(goalSport, goalDistance);
      addGoalToArray(goalSport, goalDistance);
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
