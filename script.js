var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
var selection = JSON.parse(localStorage.getItem("selection") || 0);
var points = JSON.parse(localStorage.getItem("points") || 0);
var heroes = JSON.parse(localStorage.getItem("heroes") || "[]");
function update_tasks_storage(){
    tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
}
function update_selection_storage(){
    selection = JSON.parse(localStorage.getItem("selection") || 0);
    if (selection == undefined || selection == null) localStorage.setItem("selection", 0);
    selection = JSON.parse(localStorage.getItem("selection") || 0);
}
function update_points_storage(){
    points = JSON.parse(localStorage.getItem("points") || 0);
    if (points == undefined || points == null) localStorage.setItem("points", 0);
    points = JSON.parse(localStorage.getItem("points") || 0);
}
var heroes_list = [
    {
        "name": "hawk_eye",
        "bought": true,
        "col1": ["from-slate-900", "from-slate-900/50"],
        "col2": ["to-violet-700", "to-violet-700/50"],
        "col3": "hover:shadow-violet-500"
    },
    {
        "name": "black_panther",
        "bought": false,
        "col1": ["from-slate-800", "from-slate-800/50"],
        "col2": ["to-slate-900", "to-slate-900/50"],
        "col3": "hover:shadow-slate-500"
    },
    {
        "name": "doctor_strange",
        "bought": false,
        "col1": ["from-red-900", "from-red-900/50"],
        "col2": ["to-orange-500", "to-orange-500/50"],
        "col3": "hover:shadow-orange-900"
    },
    {
        "name": "thor",
        "bought": false,
        "col1": ["from-gray-900", "from-gray-900/50"],
        "col2": ["to-blue-900", "to-blue-900/50"],
        "col3": "hover:shadow-blue-700"
    },
    {
        "name": "hulk",
        "bought": false,
        "col1": ["from-green-600", "from-green-600/50"],
        "col2": ["to-green-900", "to-green-900/50"],
        "col3": "hover:shadow-green-600"
    },
    {
        "name": "captain_america",
        "bought": false,
        "col1": ["from-red-600", "from-red-600/50"],
        "col2": ["to-blue-900", "to-blue-900/50"],
        "col3": "hover:shadow-blue-500"
    },
    {
        "name": "spider_man",
        "bought": false,
        "col1": ["from-indigo-900", "from-indigo-900/50"],
        "col2": ["to-red-600", "to-red-600/50"],
        "col3": "hover:shadow-red-600"
    },
    {
        "name": "iron_man",
        "bought": false,
        "col1": ["from-amber-600", "from-amber-600/50"],
        "col2": ["to-red-800", "to-red-800/50"],
        "col3": "hover:shadow-amber-600"
    }
];
function update_heroes_storage(){
    heroes = JSON.parse(localStorage.getItem("heroes") || null);
    if(heroes == null || heroes == undefined || heroes == 0 || heroes == "[]") localStorage.setItem("heroes", JSON.stringify(heroes_list));
    heroes = JSON.parse(localStorage.getItem("heroes") || "[]");
}

const restore_local_storage = function () {

    localStorage.setItem("heroes", JSON.stringify("[]"));
    update_heroes_storage();

    localStorage.setItem("selection", 0);
    update_selection_storage();

    localStorage.setItem("points", 0);
    update_points_storage();

    update_tasks_storage();
}

function reset(){
    restore_local_storage();
    location.reload();
    show();
}

const initialize_local_storage = function () {

    update_heroes_storage();

    update_points_storage();

    update_selection_storage();

    update_tasks_storage();
}

initialize_local_storage();




function show_nav() {
    document.querySelector(".nav-bar").className = "nav-bar";
    document.querySelector(".nav-bar").classList.add(`${heroes[selection].col1[1]}`);
    document.querySelector(".nav-bar").classList.add(`${heroes[selection].col2[1]}`);
    console.log(document.querySelector(".nav-bar").className);
}
function show_hero_image() {
    document.querySelector(".hero-image").setAttribute("src", `./images/${heroes[selection].name}.webp`);
    document.querySelector(".hero-image").setAttribute("class", `hero-image ${heroes[selection].col3}`);
}
function show_cards() {
    document.querySelector(".cards-container").innerHTML = `
        <div class="blank-end space-x-0"></div>`;
    heroes.forEach((hero, index) => {
        let affordable = false;
        if (points >= index * 300) affordable = true;
        let name = hero.name;
        let col1 = hero.col1[1];
        let col2 = hero.col2[1];
        let col3 = hero.col3;
        let bought = hero.bought;
        if(index == 0){
            console.log(name, "bought");
            let to_insert = `<div class="card">
            <img src="./images/${name}.webp" alt="" srcset="" index="${index}" class="card-image ${col3}" onclick=buy(${index})>
            </div>`;
            document.querySelector(".blank-end").insertAdjacentHTML("beforebegin", to_insert);
        }
        else if (bought) {
            console.log(name, "bought");
            let to_insert = `<div class="card">
            <img src="./images/${name}.webp" alt="" srcset="" index="${index}" class="card-image ${col3}" onclick=buy(${index})>
            </div>`;
            document.querySelector(".blank-end").insertAdjacentHTML("beforebegin", to_insert);
        }
        else if (!affordable) {
            console.log(name, "affordable");
            let to_insert = `<div class="card">
            <img src="./images/locked.png" alt="" srcset="" index="${index}" class="card-image ${col3}" onclick=buy(${index})>
            </div>`;
            document.querySelector(".blank-end").insertAdjacentHTML("beforebegin", to_insert);
        }
        else if (!bought) {
            console.log(name, "not bought");
            let to_insert = `<div class="card">
            <img src="./images/${name}_unbought.png" alt="" srcset="" index="${index}" class="card-image ${col3}" onclick=buy(${index})>
            </div>`;
            document.querySelector(".blank-end").insertAdjacentHTML("beforebegin", to_insert);
        }
    });
}
function show_tasks() {
    console.log(selection);
    document.querySelector(".task-queue").innerHTML = "";
    tasks.forEach((task, index) => {
        let to_insert = `<div class="pushed">
            <div class="pushed-desc bg-gradient-to-r ${heroes[selection].col1[1]} ${heroes[selection].col2[1]} border-white">${task}</div>
            <button index="${index}" title="push" type="submit" class="push delete bg-amber-500/50 border-2 border-amber-500 shadow-sm hover:shadow-amber-400" onclick=delete_task(this)><img src="./images/delete.svg" alt="" srcset="" class="icon"></button>
            <button index="${index}" title="push" type="submit" class="push done bg-green-500/50 border-2 border-green-500 shadow-sm hover:shadow-green-400" onclick=done_task(this)><img src="./images/done.svg" alt="" srcset="" class="icon"></button>
        </div>`
        document.querySelector(".task-queue").innerHTML = to_insert + document.querySelector(".task-queue").innerHTML;
    });
}
function show_info(){
    document.querySelector(".info-screen").className = "info-screen bg-gradient-to-b from-black";
    document.querySelector(".info-screen").classList.add(`${heroes[selection].col2[1]}`);
    console.log(document.querySelector(".info-screen").className);
}
function show() {
    show_nav();
    show_hero_image();
    show_cards();
    show_tasks();
    show_info();
}
show();


// update points *****





var curr_points = points;
function update_points(to_add) {
    curr_points += to_add;
    if (curr_points > 0) {
        localStorage.setItem("points", curr_points);
    }
    else {
        if (curr_points < 0) {
            reset();
        }
        curr_points = 0;
        localStorage.setItem("points", curr_points);
    }
    document.querySelector(".coins").innerHTML = curr_points;

    //
    localStorage.setItem("points", curr_points);
    update_points_storage();
    //
}
update_points(0);








// push *****





document.querySelector(".push").addEventListener("click", () => {
    let task = document.querySelector(".task-desc").value;
    if (task) {
        tasks.push(task);

        //
        localStorage.setItem("tasks", JSON.stringify(tasks));
        update_tasks_storage();
        //

        //
        update_points(20);
        //

        show();
    }
    else {
        alert("give valid input");
    }
    document.querySelector(".task-desc").value = "";
});




// delete task *****




function delete_task(dlt) {
    tasks.splice(dlt.getAttribute('index'), 1);

    //
    localStorage.setItem("tasks", JSON.stringify(tasks));
    update_tasks_storage();
    //

    //
    update_points(-50);
    //

    show();
}




// done task *****




function done_task(dlt) {
    tasks.splice(dlt.getAttribute('index'), 1);

    //
    localStorage.setItem("tasks", JSON.stringify(tasks));
    update_tasks_storage();
    //

    //
    update_points(100);
    //

    show();
}




// buy *****




function buy(index) {
    console.log(heroes[index].bought);
    if (heroes[index].bought) {

        //
        localStorage.setItem("selection", index);
        update_selection_storage();
        //

    }
    else if (points >= index * 300) {
        update_points(index * (-300));

        //
        localStorage.setItem("selection", index);
        update_selection_storage();
        //

        heroes[index].bought = true;

        //
        localStorage.setItem("heroes", JSON.stringify(heroes));
        heroes = JSON.parse(localStorage.getItem("heroes") || "[]");
        //
    }
    else {
        alert("you don't have enough coins");
    }

    //
    localStorage.setItem("tasks", JSON.stringify(tasks));
    update_tasks_storage();
    //

    show();
}

document.querySelector(".nav-tasks").addEventListener("click", () => {
    document.querySelector(".tasks").classList.remove("hidden");
    document.querySelector(".cards").classList.add("hidden");
    document.querySelector(".info").classList.add("hidden");
    show();
})

document.querySelector(".nav-cards").addEventListener("click", () => {
    document.querySelector(".tasks").classList.add("hidden");
    document.querySelector(".cards").classList.remove("hidden");
    document.querySelector(".info").classList.add("hidden");
    show();
})

document.querySelector(".nav-coins").addEventListener("click", () =>{
    document.querySelector(".cards").classList.add("hidden");
    document.querySelector(".tasks").classList.add("hidden");
    document.querySelector(".info").classList.remove("hidden");
    show();
})