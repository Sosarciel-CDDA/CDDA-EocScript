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
	//u_val('hp', 'bodypart: head')-=dmg;
	//eobj({
	//	u_set_hp:{ "math": ["u_val('hp', 'bodypart: head')-"+dmg] },
	//	target_part:"head"
	//});
	//torso
	eobj({ "arithmetic": [ 
			{ "global_val": "currHpTmp" }, "-", { "u_val": "hp", "bodypart":"head" }
		]
	});
	if(dmg>currHpTmp)
		overDmg = currHpTmp-0.01;
	else
		overDmg = dmg-1;
	eobj({
		u_set_hp:{ "arithmetic": [ 
			{ "u_val": "hp", "bodypart":"head" }, "-", { "global_val": "overDmg" }
		] },
		target_part:"head"
	});
}

function print_global_val(varName){
	eobj( { u_message: "全局变量 "+varName+" 当前的值为 : <global_val:"+varName+">" })
	//eobj( { u_message: {global_val:varName}})
}

function te4_fireball(){
	let te4_fireball_dmg = 30;
	print_global_val(te4_fireball_dmg);
	get_hurt(te4_fireball_dmg);
	//...
}

//recurrence(1);




