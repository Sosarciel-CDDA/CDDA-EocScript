

function print_global_val(varName){
	eobj( { u_message: "全局变量 "+varName+" 当前的值为 : <global_val:"+varName+">" })
	//eobj( { u_message: {global_val:varName}})
}

function update_stat(){
	recurrence("1 s");
	print_global_val(mag3);
	print_global_val(mag1);
	print_global_val(mag2);
}


//初始化现有血量
function init_curr_hp(){
	eoc_type("ACTIVATION")
	if(u_currhp==0)
		u_currhp = u_hp();
}
//刷新现有血量
function update_mon_hp(){
	recurrence(1);
	eobj({ "u_cast_spell": { "id": "init_curr_hp_spell" } })
}

//检测现有血量并触发get_hit
function check_curr_hp(){
	eoc_type("ACTIVATION")
	mag1 = u_currhp;
	mag2 = u_hp();
	if(and(u_currhp > u_hp(),has_target==0)){
		eobj({ "u_cast_spell": { "id": "tgsummon" } })
		has_target=1;
	}
	u_currhp = u_hp();
}

//尝试攻击触发的eoc
function hiteocs(){
	eoc_type("ACTIVATION")
	eobj({"u_cast_spell":{"id":"check_mon_hp_spell"}})
	has_target=0;
	eobj({
		"u_cast_spell":{"id":"testconfire"},
		"targeted":true
	})
}



//recurrence(1);
//global(false);
//run_for_npcs(false);




