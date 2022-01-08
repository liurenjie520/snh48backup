function ActionMember(){
	var nums = new Array();
	var j=0;
	for (i = 1 ; i <= 152 ; i++) {
		if (i == 18){
			continue;
		}
		else if (i == 22){
			continue;
		}
		else if (i == 32){
			continue;
		}
		else if (i == 33){
			continue;
		}
		else if ( i>=39 && i<=50 ){
			continue;
		}
		else if (i == 35){
			continue;
		}
		else if (i == 52){
			continue;
		}
		else if (i == 53){
			continue;
		}
		else if (i == 55){
			continue;
		}
		else if (i == 56){
			continue;
		}
		else if (i == 58){
			continue;
		}
		else if (i == 59){
			continue;
		}
		else if (i == 60){
			continue;
		}
		else if (i == 72){
			continue;
		}
		else if (i == 74){
			continue;
		}
		else if (i == 78){
			continue;
		}
		else if (i == 79){
			continue;
		}
		else if (i == 80){
			continue;
		}
		else if (i == 85){
			continue;
		}
		else if (i == 97){
			continue;
		}
		else if (i == 102){
			continue;
		}
		else if (i == 107){
			continue;
		}
		else if (i == 108){
			continue;
		}
		else if (i == 111){
			continue;
		}
		else if (i == 112){
			continue;
		}
		else if (i == 113){
			continue;
		}
		else if (i == 115){
			continue;
		}
		else if (i == 116){
			continue;
		}
		else if (i == 118){
			continue;
		}
		else if (i == 121){
			continue;
		}
		else if (i == 122){
			continue;
		}
		else if (i == 123){
			continue;
		}
		else if (i == 124){
			continue;
		}
		else if (i == 127){
			continue;
		}
		else if (i == 128){
			continue;
		}
		else if (i == 130){
			continue;
		}
		else if (i == 131){
			continue;
		}
		else if (i == 132){
			continue;
		}
		else if (i == 135){
			continue;
		}
		else if (i == 136){
			continue;
		}
		else if (i == 137){
			continue;
		}
		else if (i == 139){
			continue;
		}
		else if (i == 150){
			continue;
		}
		nums[j]=i;
		j++;
	}
	
	nums.sort(function() { return Math.random() - 0.5; });
	nums = nums.slice(0, 4);
	 
	for (i = 0 ; i < nums.length ; i++) {
		$(".b2_bomc img:eq("+ i +")").fadeOut(100);
		$(".b2_bomc img:eq("+ i +")").attr("src","http://www.snh48.com/images/member/zp_"+ nums[i] +".jpg");
		$(".b2_bomc img:eq("+ i +")").fadeIn(100);
	}
	setTimeout(ActionMember,4000);
}
$(function(){
	ActionMember();
})