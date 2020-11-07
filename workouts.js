// const api = ""
let workouts = [];

// push new workout to workouts array
function addWorkoutToArray(t, d, s) {
  const workoutData = {
    sport: s,
    time: t,
    distance: d,
    pace: (t / d).toFixed(2),
  };

  workouts.push(workoutData);

  displayWorkouts();

  console.log("all workouts",workouts);

}


//add workout
function displayWorkouts() {
  const runList = document.querySelector(".run");
  runList.innerHTML = "";

  let runWorkoutList = workouts.filter(workout => workout.sport === "Run")
  let swimWorkoutList = workouts.filter(workout => workout.sport === "Swim")
  let bikeWorkoutList = workouts.filter(workout => workout.sport === "Bike")

  runWorkoutList.forEach((workout) => createWorkoutContent(workout));
  swimWorkoutList.forEach((workout) => createWorkoutContent(workout));
  bikeWorkoutList.forEach((workout) => createWorkoutContent(workout));


}

//display workouts
function createWorkoutContent(workout) {
  const runList = document.querySelector(".run");
  const swimList = document.querySelector(".swim")
  const bikeList = document.querySelector(".bike")

  const workoutItem = document.createElement("div");
  workoutItem.className = "listItem"

  workoutItem.innerHTML = `<p>Time: ${workout.time} minutes </p> <p> Distance: ${workout.distance} miles </p> <p> Pace: ${workout.pace} minutes per mile</p>
  <button class="close"> X </button>`;

  if (workout.sport === "Run") {
    runList.appendChild(workoutItem);
  } 
  else if (workout.sport === "Swim") {
    swimList.appendChild(workoutItem)
  } 
  else if (workout.sport === "Bike") {
      bikeList.appendChild(workoutItem)
  }

}

function main() {
  displayWorkouts();

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
