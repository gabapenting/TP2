/////////////////// variables y constantes ////////////////

var nameInput
var chosenLvl
var attempts = 1
var selectedCards = [];
var players = JSON.parse(localStorage.getItem("plays"))

const pictures = [
    "../images/alce.jpg",
    "../images/elefante.jpg",
    "../images/nena.jpg",
    "../images/peces.jpg",
    "../images/unichancho.jpg",
    "../images/zapas.jpg",
    "../images/alce.jpg",
    "../images/elefante.jpg",
    "../images/nena.jpg",
    "../images/peces.jpg",
    "../images/unichancho.jpg",
    "../images/zapas.jpg"
]

//////////////// inicio del juego ////////////

$(".lvl").on("click", function () {
    nameInput = $("#playerName").val();

    if (nameInput == "") {
        $("#warning").removeClass("hide");
        setTimeout(function () {
            $("#warning").addClass("hide");
        }, 1200);
    }
    else {
        chosenLvl = $(this).html()
        $("#welcomeContainer").addClass("hide");
        $("#gameContainer").removeClass("hide");
        $("#name").append(nameInput);
        $("#showChosenLvl").html(chosenLvl);

        if (chosenLvl == "FACIL") {
            $("#attempts").html("18");
            attempts = 18
        } else if (chosenLvl == "INTERMEDIO") {
            $("#attempts").html("12");
            attempts = 12
        } else if (chosenLvl == "EXPERTO") {
            $("#attempts").html("9");
            attempts = 9
        }
    }
})

///////////// mezcla y asignacion de cartas ////////

const lineup = shuffle(pictures)

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

for (var i = 1; i <= pictures.length; i++) {
    $("#" + i).attr("data-img", pictures[i - 1])
};

$("img").on("click", function (e) {
    const imgId = e.target.id
    const id = $("#" + imgId).attr("data-id")
    $("#" + imgId).attr("src", lineup[id - 1])
});

//////////// comparar y contar ////////////

$("img").on("click", function () {

    $(this).toggleClass("flip");
    selectedCards.push($(this));
    if (selectedCards.length == 2) {
        if (selectedCards[0].attr("data-img") == selectedCards[1].attr("data-img") && selectedCards[0].attr("data-id") != selectedCards[1].attr("data-id")) {
            selectedCards[0].addClass("samecard");
            selectedCards[1].addClass("samecard");
            selectedCards[0].removeClass("flip");
            selectedCards[1].removeClass("flip");
            $(selectedCards[0]).off("click");
            $(selectedCards[1]).off("click");
            selectedCards = []
            attempts = attempts - 1
            $("#counter").html(attempts);
        } else {
            setTimeout(function () {
                for (var i = 1; i <= selectedCards.length; i++) {
                    $("#" + selectedCards[i - 1].attr('id')).attr("src", "../images/tapada.jpg")
                };
                selectedCards = []
            }, 1200);

            attempts = attempts - 1
            $("#counter").html(attempts);
        }
        endgame()

    }
})


/////////////// fin del juego ///////////////

function endgame () {
    if (attempts <= 0) {
        $("#overlay").removeClass("hide");
        $("#finalModal").removeClass("hide");
        $("#loss").removeClass("hide");
    } else if ($('.samecard').length == 12) {
        $("#overlay").removeClass("hide");
        $("#finalModal").removeClass("hide");
        $("#win").removeClass("hide");
        $("#attemptsLeft").html(attempts);
        rank()
    } 
}

/////////////// ranking ///////////////

function rank() {
    var obj ={
        name: $("#playerName").val(),
        level: chosenLvl,
        attempts: attempts,
    }

    if (players == null) {
        players = []
    }
    players.push(obj);
    localStorage.setItem("plays", JSON.stringify(players));

    for (i=0; i < players.length; i++) {
        $('#rankNames').append(`
         <tr>
            <td>${players[i].name}</td>
         </tr>
        `)
        $("#rankLevel").append(`
        <tr>
           <td>${players[i].level}</td>
        </tr>
       `)
        $("#rankAttempts").append(`
        <tr>
           <td>${players[i].attempts}</td>
        </tr>
       `)
    }    
}

//////////////// start over //////////////////

$("#reload").on("click", function() {
    location.reload()
})

