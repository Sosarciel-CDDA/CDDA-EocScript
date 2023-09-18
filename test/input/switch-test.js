switch(a){
  case 1:
    b=1;
  case 2:
    b=2;
}
eobj((()=>{
		let v1 = "我记得没错的话之前因为要模拟伤害我这样生成了几万个".split("");
		let v2 = "除非先把两个val的string.并在一起，然后赋予到一个变量里面".split("");
		/**
		let out = {
			"switch":{"math":["a"]},
			"cases":[]
		}
		for(let i=0;i<100;i++){
			out.cases.push({"case":i,"effect":[{"math":["b","=",i+""]}]})
		}
		*/
		let out = {
			"switch":{"math":["a"]},
			"cases":[]
		}
		for(let i=0;i<v1.length;i++){
			for(let j=0;j<v2.length;j++)
				out.cases.push({"case":i*100+j,"effect":[{"math":["b","=",v1[i]+v2[j]]}]})
		}
		return out;
})())