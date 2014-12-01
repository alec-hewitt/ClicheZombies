#pragma strict
//sound
var pistolAud: AudioClip;
var rifleAud: AudioClip;
var shotgunAud: AudioClip;
var rpgAud: AudioClip;
var xgunAud: AudioClip;
var minigunAud: AudioClip;
//other aud
var pickup: AudioClip;
var powerup: AudioClip;
//current transform position in a Vector2 array
public var myPos;
//health var
public var health: int;
//speed var
var speed = 100;
//timer for weapon hold
public var time;
//check if im holding weapon
public var holdingWeapon: boolean;
//bullet ref
public var bullet: GameObject;
//bullet spawn point
public var spawn: Transform;
//bulllet speed
public var bulletSpeed: float;
//bullet clone
public var clone: GameObject;
//shots fired master
public var shots:int;
//myWeapon When new weapon is initiated, myWeapon adopts all arguments-
//to ease and automate info fetching from external scripts, objects + classes
public var myWeapon : weapon = new weapon(0,0,0,0.0,0.0); 
//weapons
// ID - SPEED -  DAMAGE - NEXT FIRE - FIRE RATE
public var pistol : weapon = new weapon(1,5000,3,0.2,0.2); 
public var rifle : weapon = new weapon(2,5000,5,0.8,0.8);
public var shotgun : weapon = new weapon(3,5000,4,0.5,0.5);
public var RPG : weapon = new weapon(4,3000,8,1.0,1.0);
public var minigun : weapon = new weapon(5,7000,8,0.1,0.1);
public var xGun : weapon = new weapon(6,7000,15,0.1,0.1);
//weapon sprites
public var Spistol : GameObject; 
public var Srifle : GameObject;
public var Sshotgun : GameObject;
public var SRPG : GameObject;
public var Sminigun : GameObject;
public var Sxgun : GameObject;

public var blood: GameObject;

public var masterInstance : master;


function Start () {
	//enable my body
	renderer.enabled = true;
	health = 100;
	//disable all weapon sprite renderers, as to appear not wielded of player
	Spistol.renderer.enabled = false;
	Srifle.renderer.enabled = false;
	Sshotgun.renderer.enabled = false;
	SRPG.renderer.enabled = false; 
	Sminigun.renderer.enabled = false;
	Sxgun.renderer.enabled = false;
	//give pistol
	initWeapon(pistol);
	//instance of master class 
	masterInstance = GameObject.Find("master").GetComponent(master);
}

function Update () {

	/* /-------------------------------gun switch test
	if(Input.GetKeyDown(KeyCode.R)) {
		dropWeapon();
		initWeapon(rifle);
	}
	if(Input.GetKeyDown(KeyCode.G)) {
		dropWeapon();
		initWeapon(RPG);
	}
	if(Input.GetKeyDown(KeyCode.M)) {
		dropWeapon();
		initWeapon(minigun);
	}
	if(Input.GetKey(KeyCode.B)) {
		dropWeapon();
		initWeapon(shotgun);
	}
	if(Input.GetKey(KeyCode.X)) {
		dropWeapon();
		initWeapon(xGun);
	} */


	//follow mouse cursor
	var pos = Camera.main.WorldToScreenPoint(transform.position);
    var dir = Input.mousePosition - pos;
    var angle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.AngleAxis(angle, Vector3(0,0,1)); 
    //MOVE
	if(Input.GetKey(KeyCode.D)) {
		rigidbody2D.AddForce(Vector2.right * speed); //move player right
	} else if(Input.GetKey(KeyCode.A)) {
		rigidbody2D.AddForce(Vector2.right * -speed); //move player right
	} else  if(Input.GetKey(KeyCode.W)) {
		rigidbody2D.AddForce(Vector2.up * speed); //move player right
	} else if(Input.GetKey(KeyCode.S)) {
		rigidbody2D.AddForce(Vector2.up * -speed); //move player right}	
	myPos = Vector2(transform.position.x,transform.position.y);
	if(health <= 0){
		die();
		masterInstance.menu();} 
	if (Input.GetButton("Fire1") && Time.time > myWeapon.nextFire) {
			myWeapon.nextFire = Time.time + myWeapon.fireRate;
			fire();}}
//weapon class
class weapon{

	//damage and automatic variables
	public var nmbr:int;
	public var speed:int;
	public var damage:int; 
	public var nextFire : float;
	public var fireRate : float;
	//constructor
	public function weapon(wNmbr:int,wSpeed:int,wDamage:int,wNextFire:float,wFireRate:float){
		nmbr = wNmbr;	
		speed = wSpeed;
		damage = wDamage;
		nextFire = wNextFire;
		fireRate = wFireRate;}} //initiates the  current weapon when picked up
	public function initWeapon(weapon){
		//play pickup
		audio.PlayOneShot(pickup);
		holdingWeapon = true;
		if(weapon == pistol){
			Debug.Log("Picked up a pistol!");
			//sets my weapon params to pistol params
			myWeapon.nmbr = pistol.nmbr;
			myWeapon.damage = pistol.damage;
			myWeapon.speed = pistol.speed;
			myWeapon.nextFire = pistol.nextFire;
			myWeapon.fireRate = pistol.fireRate;
			//start timer
			Spistol.renderer.enabled = true;
		}
		if(weapon == rifle){
			Debug.Log("Picked up a rifle!");
			//sets my weapon params to rifle params	
			myWeapon.nmbr = rifle.nmbr;
			myWeapon.damage = rifle.damage;
			myWeapon.speed = rifle.speed;
			myWeapon.nextFire = rifle.nextFire;
			myWeapon.fireRate = rifle.fireRate;
			//start timer
			//make visible
			Srifle.renderer.enabled = true;
		}
		if(weapon == shotgun){
			Debug.Log("Picked up a shotgun!");
			//sets my weapon params to shotgun params
			myWeapon.nmbr = shotgun.nmbr;
			myWeapon.damage = shotgun.damage;
			myWeapon.speed = shotgun.speed;
			myWeapon.nextFire = shotgun.nextFire;
			myWeapon.fireRate = shotgun.fireRate;
			//start timer
			//make visible
			Sshotgun.renderer.enabled = true;
		}
		if(weapon == RPG){
			Debug.Log("Picked up an RPG!");
			//sets my weapon params to RPG params
			myWeapon.nmbr = RPG.nmbr;
			myWeapon.damage = RPG.damage;
			myWeapon.speed = RPG.speed;
			myWeapon.nextFire = RPG.nextFire;
			myWeapon.fireRate = RPG.fireRate;
			//start timer
			//make visible
			SRPG.renderer.enabled = true;
		}
		if(weapon == minigun){
			Debug.Log("Picked up an minigun!");
			//sets my weapon params to RPG params
			myWeapon.nmbr = minigun.nmbr;
			myWeapon.damage = minigun.damage;
			myWeapon.speed = minigun.speed;
			myWeapon.nextFire = minigun.nextFire;
			myWeapon.fireRate = minigun.fireRate;
			//start timer
			//make visible
			Sminigun.renderer.enabled = true;
		}
		if(weapon == xGun){
			Debug.Log("Picked up an xGun!");
			//sets my weapon params to RPG params
			myWeapon.nmbr = xGun.nmbr;
			myWeapon.damage = xGun.damage;
			myWeapon.speed = xGun.speed;
			myWeapon.nextFire = xGun.nextFire;
			myWeapon.fireRate = xGun.fireRate;
			//start timer
			//make visible
			Sxgun.renderer.enabled = true;
		}
	}	

	public function fire(){ 
		shots++;
		if(holdingWeapon == true){
			//shoot bullet
			clone = Instantiate(bullet, spawn.transform.position, spawn.transform.rotation);
			clone.rigidbody2D.velocity = transform.TransformDirection(Vector2.right * myWeapon.speed);

			//play audio clips shoot and reload
			if(myWeapon.nmbr == 1){ //pistol
				audio.PlayOneShot(pistolAud);
			} else if(myWeapon.nmbr == 2){ //rifle
				audio.PlayOneShot(rifleAud);
			} else if (myWeapon.nmbr == 3){ //shotgun
				audio.PlayOneShot(shotgunAud);
			} else if(myWeapon.nmbr == 4){
				audio.PlayOneShot(rpgAud);
			} else if(myWeapon.nmbr == 5){
				audio.PlayOneShot(minigunAud);
			} else if(myWeapon.nmbr == 6){
				audio.PlayOneShot(xgunAud);
			}
		}		
}

	public function dropWeapon(){
		//set bool
		holdingWeapon = false;
		//disable all weapon sprites
		if(myWeapon.nmbr == 1){
			Spistol.renderer.enabled = false;
		}
		if(myWeapon.nmbr == 2){
			Srifle.renderer.enabled = false;
		}
		if(myWeapon.nmbr == 3){
			Sshotgun.renderer.enabled = false;
		}
		if(myWeapon.nmbr == 4){
			SRPG.renderer.enabled = false;
		}
		if(myWeapon.nmbr == 5){
			Sminigun.renderer.enabled = false;
		}
		if(myWeapon.nmbr == 6){
			Sxgun.renderer.enabled = false;
		}
			//reset myWeapon stats
			myWeapon.nmbr = 0;
			myWeapon.damage = 0;
			myWeapon.speed = 0;
			myWeapon.nextFire = 0.0;
			myWeapon.fireRate = 0.0;
	}

	public function die(){
		//destroy gameObject
		Destroy(this.gameObject);
		//blood
		Instantiate(blood,transform.position,transform.rotation);
	}

	//ONCOLLISIONENTER

	function OnCollisionEnter2D(zombie: Collision2D)
	{
		//enemies
		if(zombie.collider.name == "zombie(Clone)")    
		{
			health -= 25;
		}
		if(zombie.collider.name == "bigZombie(Clone)")    
		{
			health -= 50;
		}
		//items
		if(zombie.collider.name == "pi(Clone)"){
			dropWeapon();
			initWeapon(pistol);
		} 
		if(zombie.collider.name == "ri(Clone)"){
			dropWeapon();
			initWeapon(rifle);
		} 
		if(zombie.collider.name == "sh(Clone)"){
			dropWeapon();
			initWeapon(shotgun);
		} 
		if(zombie.collider.name == "rp(Clone)"){
			dropWeapon();
			initWeapon(RPG);
		} 
		if(zombie.collider.name == "mi(Clone)"){
			dropWeapon();
			initWeapon(minigun);
		}
		if(zombie.collider.name == "x(Clone)"){
			dropWeapon();
			initWeapon(xGun);
		}  
	}