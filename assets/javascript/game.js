$(document).ready(function(){
var severusSnape = {
    name: "severusSnape",
    healthPoint : 150,
    attackPower : 20,
    counterAttackPower : 20,
    chosen: false,
    defend: false
};

var dracoMalfoy = {
    name: "dracoMalfoy",
    healthPoint : 100,
    attackPower : 5,
    counterAttackPower : 5,
    chosen: false,
    defend: false
};

var tomRiddle = {
    name: "tomRiddle",
    healthPoint : 180,
    attackPower : 25,
    counterAttackPower : 25,
    chosen: false,
    defend: false
};

var harryPotter = {
    name: "harryPotter",
    healthPoint : 120,
    attackPower : 8,
    counterAttackPower : 8,
    chosen: false,
    defend: false
};

var characters = [severusSnape, dracoMalfoy, tomRiddle, harryPotter];


function calculateHP(attacker, defender){
    attacker.heathPoint = attacker.healthPoint - defender.counterAttackPower;
    defender.healthPoint = defender.healthPoint - attacker.attackPower;

    if (attacker.healthPoint <=0){
        if (defender.healthPoint <=0) console.log("both loose");
        else console("game over");
    }
}

function calculateAttackPower(character){
    character.attackPower += character.counterAttackPower;
}

//run

// for(var i = 0; i < characters.length; i++){
//     $("#"+characters[i].name).append("<p>"+characters[i].healthPoint+"</p>");
// }

characters.forEach(function(element){
    $("#"+element.name).append("<p>"+element.healthPoint+"</p>");
});


//start game
$(".character").click(function(){
    //console.log($("#selectCharacter").children().length);
    //console.log($(this).attr('id'));
    if($("#selectCharacter").children().length > 0){
        $("#"+$(this).attr('id')).appendTo($(".yourCharacter"));
        $("#selectCharacter").children().appendTo($(".enemiesAvailableToAttack"));
    }

    //console.log($(".enemiesAvailableToAttack").children().length);
    else if($(".enemiesAvailableToAttack").children().length > 0 
        && $(".defender").children().length === 1){
            //if($("#"+$(this).attr('id')))
            //console.log($(this).parent().attr("class"));
        if($(this).parent().attr("class") != "yourCharacter"){
            $("#"+$(this).attr('id')).appendTo($(".defender"));
        }
    }
});

//The chosen character attacks the chosen defender
$("#attack").click(function(){
    console.log("hello world");
});

});