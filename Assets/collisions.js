#pragma strict
	//on collision enter with a collider on obgject..
	function OnCollisionEnter2D(clone: Collision2D)
	{
		//if collider name is bullet clone..
		if(clone.collider.name == "bullet(Clone)")    
		{
			//destroy bullet on impact.
			Destroy(clone.gameObject);
		}
	}	