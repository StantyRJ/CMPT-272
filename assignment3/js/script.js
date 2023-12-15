//import 'jquery';
let breeds = [];
//const categorys: string = [];
class pig {
    constructor(name, category, personality, height, weight, breed) {
        this.name = name;
        this.category = category;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.breed = breed;
    }
}
class greyPig extends pig {
    constructor(name, category, personality, height, weight, breed, swimming) {
        super(name, category, personality, height, weight, breed);
        this.swimming = swimming;
        breeds = ["Mangalica", "American Landrace", "American Yorkshire"];
    }
}
class chesnutPig extends pig {
    constructor(name, category, personality, height, weight, breed, language) {
        super(name, category, personality, height, weight, breed);
        this.language = language;
        breeds = ["Duroc", "Kunekune", "Red Wattle Hog"];
    }
}
class whitePig extends pig {
    constructor(name, category, personality, height, weight, breed, running) {
        super(name, category, personality, height, weight, breed);
        this.running = running;
        breeds = ["Large White", "Chester White", "Danish Landrace"];
    }
}
class blackPig extends pig {
    constructor(name, category, personality, height, weight, breed, strength) {
        super(name, category, personality, height, weight, breed);
        this.strength = strength;
        breeds = ["Jeju", "Bentheim", "Iberian"];
    }
}
let pigs = [];
//DEFINE ARRAYS OF PIGS
function init() {
    if (localStorage.getItem("pigs") === null) {
        pigs.push(new greyPig("Azio", "Grey", "Happy", 10, 20, "Teacup", 20));
        pigs.push(new chesnutPig("Ben", "Chesnut", "Jolly", 10, 20, "Pot-Bellied", "French"));
        pigs.push(new whitePig("Johnny", "White", "Grumpy", 10, 20, "Teacup", 20));
        pigs.push(new blackPig("Timmy", "Black", "Sad", 10, 20, "Swine", 20));
        localStorage.setItem("pigs", JSON.stringify(pigs));
    }
}
function populateTable() {
    pigs = JSON.parse(localStorage.getItem("pigs"));
    let ind = 0;
    $("#pigs").empty();
    for (const p of pigs) {
        $("#pigs").append(`<tr><td>${p.name}</td><td>${p.category}</td><td><a href="moreInfo.html" id="${ind}" class="info"><button>More info</button></a></td><td><button class="delete" id="${ind}">Delete</button></td></tr>`);
        ind++;
    }
}
//DELETE PIG FROM ARRAY
$(document).on('click', '.delete', function () {
    if (confirm('Are you sure you want to delete that pig?')) {
        var index = $(this).attr('id');
        var toDelete = pigs[parseInt(index)];
        pigs.splice(parseInt(index), 1);
        localStorage.setItem("pigs", JSON.stringify(pigs));
        populateTable();
    }
});
$(document).on('click', '.info', function () {
    var index = $(this).attr('id');
    localStorage.setItem("moreInfoPig", JSON.stringify(pigs[parseInt(index)]));
});
function moreInfo() {
    let inpPig = JSON.parse(localStorage.getItem("moreInfoPig"));
    Object.keys(inpPig).forEach((prop) => $('#moreInfo').append(`<tr><td>${prop}</td><td>${inpPig[prop]}</td></tr>`));
}
let newPig;
function categoryPig() {
    switch ($("#category").val()) {
        case "whitePig":
            newPig = new whitePig("", "White", "", 0, 0, "", 0);
            break;
        case "chesnutPig":
            newPig = new chesnutPig("", "Chesnut", "", 0, 0, "", "");
            break;
        case "greyPig":
            newPig = new whitePig("", "Grey", "", 0, 0, "", 0);
            break;
        case "blackPig":
            newPig = new blackPig("", "White", "", 0, 0, "", 0);
            break;
        default:
            newPig = new whitePig("", "White", "", 0, 0, "", 0);
            break;
    }
    $("#newPig").empty();
    $("#newPig").append(`<label>name:</label><input name="name" type="text"></input><br>`);
    $("#newPig").append(`<label>personality:</label><input name="personality" type="text"></input><br>`);
    $("#newPig").append(`<label>height:</label><input name="height" type="number"></input><br>`);
    $("#newPig").append(`<label>weight:</label><input name="weight" type="number"></input><br>`);
    $("#newPig").append(`<label>breed:</label><select name="breed" id="breedSelector"></select><br>`);
    for (let i in breeds)
        $("#breedSelector").append(`<option>${breeds[i]}</option>`);
    if (Object.keys(newPig)[6] != 'language')
        $("#newPig").append(`<label>${Object.keys(newPig)[6]}</label><input name="extra" type="number"></input><br>`);
    else
        $("#newPig").append(`<label>${Object.keys(newPig)[6]}</label><input name="extra" type="text"></input><br>`);
}
$(document).on('click', "#addPig", function () {
    let formOutput = $("#newPig").serializeArray();
    let fieldValue = formOutput.find((field) => field.name === "name");
    newPig.name = fieldValue.value;
    fieldValue = formOutput.find((field) => field.name === "personality");
    newPig.personality = fieldValue.value;
    fieldValue = formOutput.find((field) => field.name === "height");
    newPig.height = fieldValue.value;
    fieldValue = formOutput.find((field) => field.name === "weight");
    newPig.weight = fieldValue.value;
    fieldValue = formOutput.find((field) => field.name === "breed");
    newPig.breed = fieldValue.value;
    fieldValue = formOutput.find((field) => field.name === "extra");
    if (newPig instanceof greyPig)
        newPig.swimming = fieldValue.value;
    else if (newPig instanceof chesnutPig)
        newPig.language = fieldValue.value;
    else if (newPig instanceof blackPig)
        newPig.strength = fieldValue.value;
    else if (newPig instanceof whitePig)
        newPig.running = fieldValue.value;
    pigs = JSON.parse(localStorage.getItem("pigs"));
    pigs.push(newPig);
    localStorage.setItem("pigs", JSON.stringify(pigs));
    window.location.href = "index.html";
});
