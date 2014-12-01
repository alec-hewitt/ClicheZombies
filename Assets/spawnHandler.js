#pragma strict

public var zombieA: AudioClip;

public var randomEnemy: int;
public var randomSpawn: int;


public var spawner: Vector2;
public var spawn1: Transform;
public var spawn2: Transform;
public var spawn3: Transform;
public var spawn4: Transform;

public var enemy;

var kills;
//spawn delay 
public var delay: float;
//timer
public var timer:float;

public var spawning: boolean;

public var bigZombie: GameObject;
public var zombie: GameObject;

public var playerInstance : player;

public var masterInstance : master; 

function Start () {
	//instance os player
	playerInstance = GameObject.Find("player").GetComponent(player);
	masterInstance = GameObject.Find("master").GetComponent(master);

	spawn();

	timer = 0.0;

	delay = 2.5;
}

function Update () {

	kills = masterInstance.kills;

	if(!spawning){
		timer += Time.deltaTime;
	}

	if(timer > delay){
		spawn();
		timer = 0;
	}
	if(masterInstance.kills > 20){
		delay = 2.0;
	}
	if(masterInstance.kills > 30){
		delay = 1.8;
	}
	if(masterInstance.kills > 40){
		delay = 1.6;
	}
	if(masterInstance.kills > 50){
		delay = 1.2;
	}
	if(masterInstance.kills > 60){
		delay = .9;
	}
	if(masterInstance.kills > 70){
		delay = 0.6;
	}
	if(masterInstance.kills > 85){
		delay = 0.4;
	}
	if(masterInstance.kills > 110){
		delay = 0.25;
	}



	
}

function spawn(){

	spawning = true;

	var location: GameObject;
	//pick a random spawn point each time
	randomEnemy = Mathf.Abs(Random.Range(1,7));
	randomSpawn = Mathf.Abs(Random.Range(1,5));

	if(randomEnemy == 1 || randomEnemy == 3 || randomEnemy == 4 || randomEnemy == 5 || randomEnemy == 6){
		enemy = zombie;
	}
	if(randomEnemy == 2){
		enemy = bigZombie;
	}
	if(randomSpawn == 1){
		spawner.x = spawn1.position.x;
		spawner.y = spawn1.position.y;
	}
	if(randomSpawn == 2){
		spawner.x = spawn2.position.x;
		spawner.y = spawn2.position.y;
	}
	if(randomSpawn == 3){
		spawner.x = spawn3.position.x;
	 	spawner.y = spawn3.position.y;
	}
	if(randomSpawn == 4){
		spawner.x = spawn4.position.x;
		spawner.y = spawn4.position.y;
	}

	var zombie: GameObject = Instantiate(enemy,spawner,spawn1.rotation);

	spawning = false;
}