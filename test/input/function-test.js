function regenMana(num){
  u_val('mana')+=num;
  return 123;
}
function regenVal(id,bp){
  u_val(id,bp)+=1;
  return 123;
}
regenVal('hp','bp1')
regenVal('hp','bp2')
let c = regenVal('hp','bp2')+1;
regenMana(10);