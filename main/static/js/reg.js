let reg = /^\d{9}$/;


document.querySelector('.reg_validation').onclick = function(){
	let obj = document.getElementById('tel');
	let num = obj.value;
	console.log(num.length);

	if (reg.test(num)){
		console.log('validated');
	}
	else{
		console.log('not validated');
	}
}