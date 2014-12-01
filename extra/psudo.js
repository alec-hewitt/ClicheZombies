//0 = pistol
//1 = rifle
//2 = shotgun
var weapons = new Array(0,1,2);

var randWeapon = Random.Range(0,(weapons.length));

//player position
public var myPos;
//headlth var
public var playerHealth
//speed var
public var playerSpeed
//score
public var score;
//timer for weapon hold
public var time;

public var myWeapon;

//on game start
onStart{
//setting  my health
	health = 100;
	//set init score
	score= 0;

//setting 
	weapons[0] : weapon = new weapon(2); //make each array item into weapon object
	weapons[1] : weapon = new weapon(5); ///
	weapons[2] : weapon = new weapon(10); ///

	initWeapon(0);

}

//every frame call
update{
	
    myPos = transform.position;

	if i hit a zombie{
		health - 10; //subtract 10 health
		animation(ouch); //play animation that shows player hurting
	}

	if i hit a crate  &&  holdingWeapon == false{ 

		myWeapon = randWeapon;

		initWeapon(myWeapon);
	}

	if i press Mouse1{ //if i press mouse button
		fire(myWeapon)
	}
	if(holdingWeapon == true){
	time -- *time.DeltaTime;
	}
	if(time == 0){
		dropWeapon(myWeapon);
	}
}


public class weapon{

	public int damage;
		//CONSTRUCTOR
		public weapon(int Wdamage){
			damage  = Wdamage; 	
		}
} //end of class



function initWeapon(var weapon){

	if(weapon = "pistol"){
		gameObject.pistol.transform.position = myPos = 1;
		holdingWeapon = true;
		}
	}

	if(weapon = "rifle"){
		gameObject.pistol.transform.position = myPos = 1;
		holdingWeapon = true;
		}
	}

	if(weapon = "shotgun"){
		gameObject.pistol.transform.position = myPos = 1;
		holdingWeapon = true;
		}
	}
	return myWeapon;
}

function dropWeapon(var weapon){
	time = 1000;
	holdingWeapon == false;
	
		if(weapon = "pistol"){
		gameObject.pistol.transform.position.x = 1000;
		}
	if(weapon = "rifle"){
		gameObject.pistol.transform.position.x = 1000;
		}
	}
	if(weapon = "shotgun"){
		gameObject.pistol.transform.position.x = 1000;
	}
}



function  kill(){
	//raise scoreboard number
	guiText + 100;
	//check if this is highscrore
	if(guiText.score >= highscore){
		highscore = guiText.score;
	}
}

	function fire(var weapon){
		newBullet : a rigidbody;
		bullet transform  position vector2(x,x,x) * bulletSpeed //straight from standing
		collisionEnter(newBullet : rigidbody2d){

		damage = weapon.damage;

			if(rigidbody name = enemy){

				enemy.die()

				player.kill()
		}