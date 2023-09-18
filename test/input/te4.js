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


function set_spell_lvl(spell_id,spell_lvl){
	_lvl = spell_lvl*20/3;
	_int_lvl = round(_lvl);

	eobj({"math":["u_val('spell_level','spell: "+spell_id+"')","=", '_int_lvl']})
}

function update_spell_lvl(stat){
	set_spell_lvl(te4_fireball,stat);
}


function print_global_val(varName){
	eobj( { u_message: "全局变量 "+varName+" 当前的值为 : <global_val:"+varName+">" })
	//eobj( { u_message: {global_val:varName}})
}

function update_stat(){
	recurrence("60 s");
	u_TStr = 5+floor(u_val('strength')/2);
	u_TDex = u_val('dexterity');
	u_TCon = 5+floor(u_val('strength')/2);
	u_TMag = u_val('intelligence');
	u_TWil = 5+floor(u_val('perception')/2);
	u_TCun = 5+floor(u_val('perception')/2);
	mag = 1333;
	print_global_val(mag);
	update_spell_lvl(mag);
}

//recurrence(1);
//global(false);
//run_for_npcs(false);




