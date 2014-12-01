#pragma strict
//HANDLE ALL TRASACTIONS 

public var playerInstance : player;

public var score: int;
public var kills: int;
public var health: int;
public var shots:int;
public var farmHS:int;
public var scoreText: GUIText;
 
function Start () {
	playerInstance = GameObject.Find("player").GetComponent(player);
}

function Update () {
	//health
	health = playerInstance.health;
	//update scoreText GUI
	scoreText.text = "SCORE: " + score;
	//shots fired
	shots = playerInstance.shots;
}

function menu(){
	Application.LoadLevel("level");
}
