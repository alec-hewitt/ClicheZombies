#pragma strict

var time: float;

function Start () {
renderer.enabled = true;
time = 300.0;
transform.position.z =- 1;
}

function Update () {

time --;

if(time <= 0){
	if(this.transform.name == "blood(Clone)"){
	Destroy(this.gameObject);
	}

}
}