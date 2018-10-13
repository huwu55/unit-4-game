$(document).ready(function(){
var severusSnape = {
    objectName: "severusSnape",
    name : "Severus Snape",
    healthPoint : 150,
    attackPower : 20,
    counterAttackPower : 20
};

var dracoMalfoy = {
    objectName: "dracoMalfoy",
    name : "Draco Malfoy",
    healthPoint : 100,
    attackPower : 5,
    counterAttackPower : 5
};

var tomRiddle = {
    objectName: "tomRiddle",
    name : "Tom Riddle",
    healthPoint : 180,
    attackPower : 25,
    counterAttackPower : 25
};

var harryPotter = {
    objectName: "harryPotter",
    name : "Harry Potter",
    healthPoint : 120,
    attackPower : 8,
    counterAttackPower : 8
};

var characters = [severusSnape, dracoMalfoy, tomRiddle, harryPotter];
var attacker, defender;

function returnCharacter(characterName){
    for(var i = 0; i < characters.length; i++){
        if(characters[i].objectName === characterName)
            break;
    }
    return characters[i];
}

function calculateAttackPower(character){
    character.attackPower += character.counterAttackPower;
}

function calculateHP(role_attacker, role_defender){
    role_defender.healthPoint = role_defender.healthPoint - role_attacker.attackPower;
    
    if(role_defender.healthPoint <= 0){
        $("#" + role_defender.objectName).remove();
        if ($(".enemiesAvailableToAttack").children().length === 1){
            $("#comment1").html("<p>You Won!!! GAME OVER!!!</p>");
            $("#comment2").html("<input type='button' value='Restart' onclick='location.reload();'>");
        }
        else{
            $("#comment1").html("<p>You have defeated " + role_defender.name + ", you can choose to fight another enemy.</p>");
            $("#comment2").html("");
        }
    }
    else{
        role_attacker.healthPoint = role_attacker.healthPoint - role_defender.counterAttackPower;
        $("#" + role_attacker.objectName +" p:last").html(role_attacker.healthPoint);
        $("#" + role_defender.objectName +" p:last").html(role_defender.healthPoint);
        if(role_attacker.healthPoint <=0){
            $("#comment1").html("<p>You have been defeated... GAME OVER!!!</p>");
            $("#comment2").html("<input type='button' value='Restart' onclick='location.reload();'>");
        }
        else{
            $("#comment1").html("<p>You attacked " + role_defender.name + " for " + role_attacker.attackPower + " damage.</p>");
            $("#comment2").html("<p>" + role_defender.name + " attacked you back for " + role_defender.counterAttackPower + " damage.</p>");
        }
    }
    calculateAttackPower(role_attacker);
}

//run

characters.forEach(function(element){
    $("#"+element.objectName).append("<p>"+element.healthPoint+"</p>");
});


//start game
$(".character").click(function(){
    if($("#selectCharacter").children().length > 0){
        $("#"+$(this).attr('id')).appendTo($(".yourCharacter"));
        attacker = returnCharacter($(this).attr('id'));
        $("#selectCharacter").children().addClass("red");
        $("#selectCharacter").children().appendTo($(".enemiesAvailableToAttack"));
    }
    else if($(".enemiesAvailableToAttack").children().length > 0 
        && $(".defender").children().length === 1){
        if($(this).parent().attr("class") != "yourCharacter"){
            $("#"+$(this).attr('id')).appendTo($(".defender"));
            $("#"+$(this).attr('id')).removeClass("red");
            defender = returnCharacter($(this).attr('id'));
            $("#comment1").html("");
            $("#comment2").html("");
        }
    }
});

//The chosen character attacks the chosen defender
$("#attack").click(function(){
    if($(".defender").children().length > 1 && attacker.healthPoint > 0)
        calculateHP(attacker,defender);
    else if (attacker.healthPoint <= 0 || $(".enemiesAvailableToAttack").children().length === 1);
    else {
        $("#comment1").html("<p>No enemies here.</p>");
        $("#comment2").html("");
    }
});

});