const goalsApi = "https://gentle-spire-21312.herokuapp.com/goals";
// const goalsApi = "http://localhost:3000/goals"
let goals = [];

//fetch goals
async function fetchGoals() {
  let response = await fetch(goalsApi);
  let fetchedGoals = await response.json();

  // console.log("goals",fetchedGoals);

  return fetchedGoals;
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

//delete goal
async function deleteGoal(id) {
    let response = await fetch(goalsApi + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
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

function spliceGoal(id) {
    const index = goals.findIndex((goal) => goal._id == id)
    goals.splice(index, 1)
    displayGoals()
    deleteGoal(id)
    console.log(index)
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

  runGoalsList.forEach((goal) => createRunGoalContent(goal));
  swimGoalsList.forEach((goal) => createSwimGoalContent(goal));
  bikeGoalsList.forEach((goal) => createBikeGoalContent(goal));
}

//run goal content
function createRunGoalContent(goal) {
  const runGoal = document.getElementById("run-goal");

  let runWorkoutList = workouts.filter((workout) => workout.sport === "Run");

  let runTotal = runWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);

  const close = document.createElement("button");
  close.dataset.id = goal._id;
  close.className = "close";
  close.innerHTML = `<i class="far fa-trash-alt"></i>`;
  close.addEventListener("click", () => {
    deleteGoal(goal._id);
    // spliceGoal(goal._id);
  });

  const edit = document.createElement("button");
  edit.dataset.id = goal._id;
  edit.className = "editButton";
  edit.innerHTML = `<i class="far fa-edit"></i>`;

  const save = document.createElement("button");
  save.dataset.id = goal._id;
  save.className = "saveButton";
  save.innerHTML = `<i class="far fa-save"></i>`;
  save.style.display = "none";

  runGoal.innerHTML = runTotal + "/" + goal.distance;

  runGoal.appendChild(close);
  runGoal.appendChild(edit);
  runGoal.appendChild(save);
}

//swim goal content
function createSwimGoalContent(goal) {
  const swimGoal = document.getElementById("swim-goal");

  let swimWorkoutList = workouts.filter((workout) => workout.sport === "Swim");

  let swimTotal = swimWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);

  const close = document.createElement("button");
  close.dataset.id = goal._id;
  close.className = "close";
  close.innerHTML = `<i class="far fa-trash-alt"></i>`;
  close.addEventListener("click", () => {
    // deleteGoal(goal._id);
    spliceGoal(goal._id);
  });

  const edit = document.createElement("button");
  edit.dataset.id = goal._id;
  edit.className = "editButton";
  edit.innerHTML = `<i class="far fa-edit"></i>`;

  const save = document.createElement("button");
  save.dataset.id = goal._id;
  save.className = "saveButton";
  save.innerHTML = `<i class="far fa-save"></i>`;
  save.style.display = "none";

  swimGoal.innerHTML = swimTotal + "/" + goal.distance;

  swimGoal.appendChild(close);
  swimGoal.appendChild(edit);
  swimGoal.appendChild(save);
}

//bike goal content
function createBikeGoalContent(goal) {
  const bikeGoal = document.getElementById("bike-goal");

  let bikeWorkoutList = workouts.filter((workout) => workout.sport === "Bike");

  let bikeTotal = bikeWorkoutList
    .reduce((acc, curr) => acc + curr.distance, 0)
    .toFixed(2);

  const close = document.createElement("button");
  close.dataset.id = goal._id;
  close.className = "close";
  close.innerHTML = `<i class="far fa-trash-alt"></i>`;
  close.addEventListener("click", () => {
    deleteGoal(goal._id);
    // spliceGoal(goal._id);
  });

  const edit = document.createElement("button");
  edit.dataset.id = goal._id;
  edit.className = "editButton";
  edit.innerHTML = `<i class="far fa-edit"></i>`;

  const save = document.createElement("button");
  save.dataset.id = goal._id;
  save.className = "saveButton";
  save.innerHTML = `<i class="far fa-save"></i>`;
  save.style.display = "none";

  bikeGoal.innerHTML = bikeTotal + "/" + goal.distance;

  bikeGoal.appendChild(close);
  bikeGoal.appendChild(edit);
  bikeGoal.appendChild(save);
}

async function main() {
  const fetchedGoals = await fetchGoals();
  goals = fetchedGoals;
  displayGoals();

  console.log(goals);

  const newGoalForm = document.querySelector("#newGoalForm");
  let goalSportDropdown = document.getElementById("goal-sports");

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
