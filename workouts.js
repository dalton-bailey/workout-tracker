const api = "https://gentle-spire-21312.herokuapp.com/workouts";
// const api = "http://localhost:3000/workouts";
let workouts = [];

//fetch workouts
async function fetchWorkouts() {
  let response = await fetch(api);
  let fetchedWorkouts = await response.json();

  return fetchedWorkouts;
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

//delete workout
async function deleteWorkout(id) {
  let response = await fetch(api + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//update workout
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
function addWorkoutToArray(t, d, s, r) {
  const workoutData = {
    complete: false,
    sport: s,
    time: t,
    distance: d,
    pace: (t / d).toFixed(2),
    rank: r,
  };

  postWorkout(workoutData);
  workouts.push(workoutData);
  displayWorkouts();
}

//splice workout for user interface
function spliceWorkout(id) {
  const index = workouts.findIndex((workout) => workout._id == id);
  workouts.splice(index, 1);
  displayWorkouts();
  deleteWorkout(id);
  console.log(index);
}

//complete workout
function completeWorkout(id) {
  const index = workouts.findIndex((workout) => workout._id == id);
  complete = workouts[index]["complete"] = !workouts[index]["complete"];
  updateWorkout(id, workouts[index]);
}

//edit workout
function editWorkout(elem, id) {
  elem.querySelector(".distance").disabled = false;
  elem.querySelector(".time").disabled = false;
  elem.querySelector(".rank").disabled = false;

  const rank = elem.querySelector(".rank");
  rank.style.display = "block";

  const editButton = elem.querySelector(".editButton");
  editButton.style.display = "none";

  const saveButton = elem.querySelector(".saveButton");
  saveButton.style.display = "block";

  const currentRank = elem.querySelector(".currentRank");
  currentRank.style.display = "none";
}

//save workout
function saveWorkout(elem, id) {
  elem.querySelector(".distance").disabled = true;
  elem.querySelector(".time").disabled = true;
  elem.querySelector(".rank").disabled = true;

  let updateT = elem.querySelector(".time").value;

  let updateD = Number(elem.querySelector(".distance").value);

  let rankDropdown = elem.querySelector(".rank");

  let updateR = rankDropdown.options[rankDropdown.selectedIndex].text;

  let data = {
    distance: updateD,
    time: updateT,
    pace: (updateT / updateD).toFixed(2),
    rank: updateR,
  };

  const editButton = elem.querySelector(".editButton");
  editButton.style.display = "block";

  const saveButton = elem.querySelector(".saveButton");
  saveButton.style.display = "none";

  const rank = elem.querySelector(".rank");
  rank.style.display = "none";

  const currentRank = elem.querySelector(".currentRank");
  currentRank.style.display = "block";
  currentRank.innerHTML = updateR;

  console.log(updateT, updateD, updateR);
  updateWorkout(id, data);
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

  runDistance.innerHTML = runTotal + " total miles";
  swimDistance.innerHTML = swimTotal + " total miles";
  bikeDistance.innerHTML = bikeTotal + " total miles";
}

function filter(filterValue) {
  let easyWorkouts = workouts.filter((workout) => workout.rank === "Easy")
  let medWorkouts = workouts.filter((workout) => workout.rank === "Medium")
  let hardWorkouts = workouts.filter((workout) => workout.rank === "Hard")

  let runs = document.querySelector(".runs")
  let swims = document.querySelector(".swims")
  let bikes = document.querySelector(".bikes")


  if (filterValue === "Easy") {
    console.log(easyWorkouts)
  }
  else if (filterValue === "Medium") {
    console.log(medWorkouts)
  }
  else if (filterValue === "Hard") {
    console.log(hardWorkouts)
  }
  else if (filterValue === "Runs") {
    swims.style.display = "none"
    bikes.style.display = "none"
    runs.style.display = "block"
  }
  else if (filterValue === "Swims") {
    runs.style.display = "none"
    bikes.style.display = "none"
    swims.style.display = "block"
  }
  else if (filterValue === "Bikes") {
    runs.style.display = "none"
    swims.style.display = "none"
    bikes.style.display = "block"
  }
}

//add workout
function displayWorkouts() {
  const runList = document.querySelector(".run");
  runList.innerHTML = "";

  const swimList = document.querySelector(".swim");
  swimList.innerHTML = "";

  const bikeList = document.querySelector(".bike");
  bikeList.innerHTML = "";

  workouts.forEach((workout) => createWorkoutContent(workout));

  distances();
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
  close.className = "close";
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
  save.style.display = "none";

  edit.addEventListener("click", () => {
    editWorkout(workoutItem, workout._id);
  });

  save.addEventListener("click", () => {
    saveWorkout(workoutItem, workout._id);
  });

  workoutItem.innerHTML = `
  <div> <p> Distance </p> <input class="distance" type="text" value= "${workout.distance}" disabled> </div> 
  <div> <p>Time </p> <input class="time" type="text" value="${workout.time}" disabled> </div> 
  <div> <p> Pace </p> <p> ${workout.pace} minutes per mile</p> </div>
  <div class="rankDiv"> <label for="rank">Rank</label> <p class="currentRank"> ${workout.rank} </p> <select id="rank" class="rank" disabled style="display:none"> <option value="1">Easy</option> <option value="2">Medium</option> <option value="3">Hard</option> </select> </div>
  `;

  workoutItem.prepend(check);
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

async function main() {
  let fetchedWorkouts = await fetchWorkouts();
  workouts = fetchedWorkouts;
  displayWorkouts();

  console.log(workouts);

  let newWorkoutForm = document.querySelector("#newWorkoutForm");
  let sportDropdown = document.getElementById("sports");
  let rankDropdown = document.querySelector("#rank");
  

  //event listener to get new workout data
  newWorkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let time = document.getElementById("workoutTime").value;

    let distance = Number(document.getElementById("workoutDistance").value);

    let sport = sportDropdown.options[sportDropdown.selectedIndex].text;

    let rank = rankDropdown.options[rankDropdown.selectedIndex].text;

    if (time === "") {
      alert("Please input a time");
    } else if (distance === "") {
      alert("Please input a distance");
    } else {
      addWorkoutToArray(time, distance, sport, rank);
      updateWorkout(time, distance, sport, rank);
    }
  });

  let filterSubmit = document.querySelector("#filterDiv")
  let filterDropdown = document.querySelector("#filterDropdown")

  filterSubmit.addEventListener("submit", (event) => {
    event.preventDefault();

    let filterValue = filterDropdown.options[filterDropdown.selectedIndex].text

    filter(filterValue);
  })
}

main();

// window.addEventListener("load", () => {
//     userName()
// });

// const userName = () => {
// let person = prompt("Please enter your name");
// if (person != null) {
//   document.querySelector(".userName").innerHTML =
//     "Hello " + person ;
// }
// }
