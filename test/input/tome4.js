/* if(u_isInit==1){
 * 	u_TStr = 10;
 * 	u_TDex = 10;
 * 	u_TCon = 10;
 * 	u_TMag = 10;
 * 	u_TWil = 10;
 * 	u_TCun = 10;
 * 	u_isInit = 1;
 * }
**/
function update_stat(){
	recurrence("60 s");
	u_TStr = 5+floor(u_strength/2);
	u_TDex = u_dexterity;
	u_TCon = 5+floor(u_strength/2);
	u_TMag = u_intelligence;
	u_TWil = 5+floor(u_perception/2);
	u_TCun = 5+floor(u_perception/2);
}

function get_hurt(dmg){
	eobj({u_set_hp:{math:["u_hp-"+dmg]}});
}

function get_fireball_hurt(){
	get_hurt(100);
	//...
}

recurrence(1);




