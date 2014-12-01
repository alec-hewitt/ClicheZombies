#pragma strict
//CONNTROLS A ZOMBIE-DROPPED WEAPON PICKUP ITEM
//IS AN INSTANNTIATED SPRITE
//HAS  RIGIDBODY2D, POLYGON COLLIDER2D,SPRITE RENDERER, TRANSFORM
public var timer:float;

var name;

function Start () {
	renderer.enabled = true;
	//settle timer
	timer = 0.0;
}

function Update () {
  //start timer
  timer += Time.deltaTime;
  //spin
  transform.Rotate(Vector3.forward * Time.deltaTime * 100);
  //check  timer
  if(timer > 10.0){
  	if(this.transform.name == "pi(Clone)" || this.transform.name == "ri(Clone)"  || this.transform.name == "mi(Clone)" || this.transform.name == "rp(Clone)" || this.transform.name == "sh(Clone)" || this.transform.name == "x(Clone)"){
  		Destroy(this.gameObject);
  	}
  }

}

function OnCollisionEnter2D(player: Collision2D)
{
	if(player.collider.name == "player")    
	{
		if(this.transform.name == "pi(Clone)" || this.transform.name == "ri(Clone)"  || this.transform.name == "mi(Clone)" || this.transform.name == "rp(Clone)" || this.transform.name == "sh(Clone)" || this.transform.name == "x(Clone)"){
			Destroy(this.gameObject);
		}
	}

	if(player.collider.name == "bullet(Clone)"){
		Destroy(player.gameObject);
	}    
}