#pragma strict
var bang: AudioClip;
var click: AudioClip;
function Start () {

}

function Update () {

}

function OnMouseOver () {
	
}

function OnMouseDown () {
	audio.PlayOneShot(bang);
	Application.LoadLevel("level");
}