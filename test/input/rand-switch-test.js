
function giveTask(task,b){
	eobj({sometask : task})
	let a = someFunc(task,a,b);
}

let _rd = rand(1,20);
switch(_rd){
	case 1:
		giveTask('任务1','opt');
	case 2:
		giveTask('任务2','opt');
	case 3:
		giveTask('任务3','opt');
	case 4:
		giveTask('任务4','opt');
	default:
		giveTask('任务5','opt');
}