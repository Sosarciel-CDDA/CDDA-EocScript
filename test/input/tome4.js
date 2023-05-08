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
	u_TStr = floor(u_strength/2);
	u_TDex = u_dexterity;
	u_TCon = floor(u_strength/2);
	u_TMag = u_intelligence;
	u_TWil = floor(u_perception/2);
	u_TCun = floor(u_perception/2);
}

recurrence(1);






if(eobj({u_has_effect:'effect'}))
	eobj({u_cast_spell:'spell'})
