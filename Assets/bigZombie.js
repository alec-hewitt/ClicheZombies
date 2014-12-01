#pragma strict
//enemy health
public var health = 20;
//player script access
public var playerInstance : player;
public var masterInstance : master;
public var spawnInstance : spawnHandler;
//damage done by self
public var damage;
//(local) damage done by bullet
public var bDamage: int;
public var target : Transform; //the enemy's target
public var moveSpeed = 3; //move speed
public var rotationSpeed = 3; //speed of turning
var myTransform : Transform; //current transform data of this enemy

public var diePos: Vector2;
public var dieRotate;
//objects
public var blood: GameObject;
//audio
var squish: AudioClip;


function Awake()
{
	//my position transform data
    myTransform = transform; 
}

function Start () {
	transform.position.z -= 1;
	//instance os player
	playerInstance = GameObject.Find("player").GetComponent(player);
	masterInstance = GameObject.Find("master").GetComponent(master);
	spawnInstance = GameObject.Find("spawnHandler").GetComponent(spawnHandler);	
	//target for AI
	target = GameObject.FindWithTag("player").transform; //target the player
}

function Update () {

	if(health <= 0){
		//destroy self
		Destroy(this.gameObject);
		//raise player score in master script
		masterInstance.score += 100;
		//raise player kills in master script
		masterInstance.kills++;
		//play squish sound
		audio.PlayOneShot(squish);
	}

    var dir = target.position - myTransform.position;
    var angle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.AngleAxis(angle, Vector3(0,0,1)); 
    //go towards player 
    myTransform.position += myTransform.right * moveSpeed * Time.deltaTime;

}

function OnCollisionEnter2D(clone: Collision2D)
{
	if(clone.collider.name == "bullet(Clone)")    
	{
		diePos = transform.position;
		dieRotate = transform.rotation;
		//destroy bullet
		Destroy(clone.gameObject);
		//subtract health
		bDamage = playerInstance.myWeapon.damage;

		health -= bDamage;
		//make blood
		Instantiate(blood,diePos,dieRotate);
	}
}
