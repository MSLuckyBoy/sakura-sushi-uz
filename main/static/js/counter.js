//--------------------Versiya 4---------------------
/*let cart = {
	"2":{
		count: 2,
		name: "sdsdd",
		img: "img.jpg",
		price: "19000"
	},
	"5":{
		count: 1,
		name: "sdsdd",
		img: "img.jpg",
		price: "15000"
	}
}*/

//--------------
let summa = 0;

const parse_prace = text =>{
	return parseInt(text.replace('сум', '').replace(/\s/g, ''));
}

const int_to_str = num =>{
	return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ' ) + ' сум';
}

//---------------
let cart = {};

if (localStorage.key('cart') == null){
	localStorage.setItem('cart', JSON.stringify(cart));
}

let cart_counter = document.getElementById('product_counter');

let cart_length = Object.keys(JSON.parse(localStorage.getItem('cart'))).length;


const set_value = id => {
	let list = JSON.parse(localStorage.getItem('cart'));

	list[id] = cart[id];

	localStorage.setItem('cart', JSON.stringify(list));
}

const remove_value = id => {
	let list = JSON.parse(localStorage.getItem('cart'));

	delete list[id];

	localStorage.setItem('cart', JSON.stringify(list));
}

const cart_content = id => {
	count = cart[id]['count'];
	img = cart[id]['img'];
	title = cart[id]['name'];
	desc = cart[id]['desc'];
	price = cart[id]['price'];

	content = `<div class="card mb-3" id="prod_${id}" style="max-width: 760px;">
					<div class="row g-0">
						<div class="col-md-6">
							<img src="${img}" class="img-fluid rounded-start" alt="...">
						</div>
						<div class="col-md-6">
							<div class="card-body">
								<a href="menu/${id}" class="link">
									<h5 class="card-title mb-4">${title}</h5>
								</a>
								<p class="card-text blockquote-footer">${desc}</p>
								<h5 class="card-text">${price}</h5>
								<div class="input-group mt-2">
									<button class="btn btn-outline-secondary minus minus_${id}" type="button" data-id="${id}">-</button>
									<span class="input-group-text">${count}</span>
									<button class="btn btn-outline-secondary plus plus_${id}" type="button" data-id="${id}">+</button>
								</div>
							</div>
						</div>
					</div>
				</div>`

	return content
}


array = document.querySelectorAll('.add_to_cart');

array.forEach(function(obj) {
	data_id = obj.getAttribute('data-id');

	const list = JSON.parse(localStorage.getItem('cart'));

	for (let key in list){
		const value = list[key];

		if (data_id == key){
			obj.style.display = 'none';
			obj.parentElement.children[2].style.display = '';
			obj.parentElement.children[2].children[1].innerHTML = value['count'];


			//console.log(`${key}: ${value}`);
		}
	}
})


if (cart_length > 0){
	cart_counter.innerHTML = cart_length;
	cart_counter.style.display = '';
	document.getElementById('empty').style.display = 'none';
	document.getElementById('checkout').style.display = '';
	
	const list = JSON.parse(localStorage.getItem('cart'));

	for (let key in list){
		const value = list[key];

		summa += parse_prace(value['price']) * value['count'];

		cart[key] = {
			'count': value['count'],
			'img': value['img'],
			'name': value['name'],
			'desc': value['desc'],
			'price': value['price']
		}

		document.querySelector('.cart_products').insertAdjacentHTML('afterbegin', cart_content(key));
	}
	document.getElementById('total').innerHTML = int_to_str(summa);
}
else{
	document.getElementById('empty').style.display = '';
	document.getElementById('checkout').style.display = 'none';
}


document.onclick = event => {
	if (event.target.classList.contains('add_to_cart')){
		addFunc(event.target);
	}

	if (event.target.classList.contains('plus')){
		plusFunc(event.target);
	}

	if (event.target.classList.contains('minus')){
		minusFunc(event.target);
	}
}

//Add to cart
const addFunc = data => {
	let parrent = data.parentElement.parentElement;
	let card_body = parrent.children[1];
	let card_footer = parrent.children[2];

	cart_counter.innerHTML = parseInt(cart_counter.textContent) + 1;

	if (parseInt(cart_counter.textContent) != 0){
		cart_counter.style.display = '';
		document.getElementById('empty').style.display = 'none';
		document.getElementById('checkout').style.display = '';
	}

	cart[data.dataset.id] = {
		count: 1,
		img: parrent.children[0].children[0].getAttribute('src'),
		name: card_body.children[0].textContent,
		desc: card_body.children[1].textContent,
		price: card_footer.children[0].textContent
	};

	set_value(data.dataset.id);

	array = document.querySelectorAll('.btn_' + data.dataset.id);

	array.forEach(function(obj) {
		obj.style.display = 'none';
		obj.parentElement.children[2].style.display = '';
		obj.parentElement.children[2].children[1].innerHTML = 1;
	});

	summa += parse_prace(cart[data.dataset.id]['price']);
	document.getElementById('total').innerHTML = int_to_str(summa);

	document.querySelector('.cart_products').insertAdjacentHTML('afterbegin', cart_content(data.dataset.id));
}

//plus
const plusFunc = data => {
	cart[data.dataset.id]['count']++;
	set_value(data.dataset.id);

	summa += parse_prace(cart[data.dataset.id]['price']);
	document.getElementById('total').innerHTML = int_to_str(summa);

	array = document.querySelectorAll('.plus_' + data.dataset.id);

	array.forEach(function(obj) {
		obj.parentElement.children[1].innerHTML = cart[data.dataset.id]['count'];
	});
}


//minus
const minusFunc = data => {
	array = document.querySelectorAll('.plus_' + data.dataset.id);
	
	summa -= parse_prace(cart[data.dataset.id]['price']);
	document.getElementById('total').innerHTML = int_to_str(summa);

	if (cart[data.dataset.id]['count'] - 1 == 0){
		deleteFunc(data.dataset.id);

		array.forEach(function(obj) {
			obj.parentElement.parentElement.children[1].style.display = '';
			obj.parentElement.parentElement.children[2].style.display = 'none';
		})

		let prod_count = parseInt(cart_counter.textContent);

		cart_counter.innerHTML = prod_count - 1;

		if (parseInt(cart_counter.textContent) == 0){
			cart_counter.style.display = 'none';
			document.getElementById('empty').style.display = '';
			document.getElementById('checkout').style.display = 'none';
		}
		else{
			document.getElementById('empty').style.display = 'none';
			document.getElementById('checkout').style.display = '';
		}
		return true;
	}
	cart[data.dataset.id]['count']--;
	set_value(data.dataset.id);

	array.forEach(function(obj) {
		obj.parentElement.children[1].innerHTML = cart[data.dataset.id]['count'];
	})
}

//remove from cart
const deleteFunc = id => {
	delete cart[id];
	remove_value(id);
	document.querySelector(`#prod_${id}`).remove();
}

//--------------------------------------------------



//--------------------Versiya 3---------------------
/*let cart = {
	'dsfe8d2':{
		'count': 2,
		'name': "sdsdd",
		'img': 'img.jpg',
		'price': "1000"
	},
	'bry28e5':{
		'count': 2,
		'name': "sdsdd",
		'img': 'img.jpg',
		'price': "1000"
	},
}*/
/*
let cart = {}
cart_counter = document.getElementById('product_counter');

let summa = 0;

const parse_prace = text =>{
	data = parseInt(text.replace('сум', '').replace(/\s/g, ''));

	return data;
}

const int_to_str = num =>{
	data = num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ' ) + ' сум';

	return data;
}

const parser = id => {
	let data = JSON.parse(localStorage.getItem(id));

	return data;
}

const set_value = id => {
	localStorage.setItem(id, JSON.stringify(cart[id]));
}


const cart_content = id => {
	count = cart[id]['count'];
	img = cart[id]['img'];
	title = cart[id]['name'];
	desc = cart[id]['desc'];
	price = cart[id]['price'];

	content = `<div class="card mb-3" id="prod_${id}" style="max-width: 760px;">
					<div class="row g-0">
						<div class="col-md-6">
							<img src="${img}" class="img-fluid rounded-start" alt="...">
						</div>
						<div class="col-md-6">
							<div class="card-body">
								<a href="menu/${id}" class="link">
									<h5 class="card-title mb-4">${title}</h5>
								</a>
								<p class="card-text blockquote-footer">${desc}</p>
								<h5 class="card-text">${price}</h5>
								<div class="input-group mt-2">
									<button class="btn btn-outline-secondary minus minus_${id}" type="button" data-id="${id}">-</button>
									<span class="input-group-text">${count}</span>
									<button class="btn btn-outline-secondary plus plus_${id}" type="button" data-id="${id}">+</button>
								</div>
							</div>
						</div>
					</div>
				</div>`

	return content
}


array = document.querySelectorAll('.add_to_cart');

array.forEach(function(obj) {
	data_id = obj.getAttribute('data-id');

	for (let i = 0, length = localStorage.length; i < length; i++) {
		const key = localStorage.key(i);
		const value = parser(key);


		if (data_id == key){
			obj.style.display = 'none';
			obj.parentElement.children[2].style.display = '';
			obj.parentElement.children[2].children[1].innerHTML = value['count'];


			//console.log(`${key}: ${value}`);
		}
	}
})

if (localStorage.length > 0){
	cart_counter.innerHTML = localStorage.length;
	cart_counter.style.display = '';
	document.getElementById('empty').style.display = 'none';

	for (let i = 0, length = localStorage.length; i < length; i++) {
		const key = localStorage.key(i);
		const value = parser(key);

		summa += parse_prace(value['price']) * value['count'];

		cart[key] = {
			'count': value['count'],
			'img': value['img'],
			'name': value['name'],
			'desc': value['desc'],
			'price': value['price']
		}

		document.querySelector('.cart_products').insertAdjacentHTML('afterbegin', cart_content(key));
	}
	document.getElementById('total').innerHTML = int_to_str(summa);
}
else{
	document.getElementById('empty').style.display = '';
}


document.onclick = event => {
	if (event.target.classList.contains('add_to_cart')){
		addFunc(event.target);
	}

	if (event.target.classList.contains('plus')){
		plusFunc(event.target);
	}

	if (event.target.classList.contains('minus')){
		minusFunc(event.target);
	}
}




//Add to cart
const addFunc = data => {
	let parrent = data.parentElement.parentElement;
	let card_body = parrent.children[1];
	let card_footer = parrent.children[2];

	//data.style.display = 'none';
	//data.parentElement.children[2].style.display = '';

	let prod_count = parseInt(cart_counter.textContent);

	cart_counter.innerHTML = prod_count + 1;

	if (parseInt(cart_counter.textContent) != 0){
		cart_counter.style.display = '';
		document.getElementById('empty').style.display = 'none';
	}

	cart[data.dataset.id] = {
		'count': 1,
		'img': parrent.children[0].children[0].getAttribute('src'),
		'name': card_body.children[0].textContent,
		'desc': card_body.children[1].textContent,
		'price': card_footer.children[0].textContent
	}

	localStorage.setItem(data.dataset.id, JSON.stringify(cart[data.dataset.id]));

	array = document.querySelectorAll('.btn_' + data.dataset.id);

	array.forEach(function(obj) {
		obj.style.display = 'none';
		obj.parentElement.children[2].style.display = '';
		obj.parentElement.children[2].children[1].innerHTML = 1;
	})

	summa += parse_prace(cart[data.dataset.id]['price']);
	document.getElementById('total').innerHTML = int_to_str(summa);

	document.querySelector('.cart_products').insertAdjacentHTML('afterbegin', cart_content(data.dataset.id));
}


//plus
const plusFunc = data => {
	cart[data.dataset.id]['count']++;
	set_value(data.dataset.id);

	summa += parse_prace(cart[data.dataset.id]['price']);
	document.getElementById('total').innerHTML = int_to_str(summa);

	array = document.querySelectorAll('.plus_' + data.dataset.id);

	array.forEach(function(obj) {
		obj.parentElement.children[1].innerHTML = cart[data.dataset.id]['count'];
	})
}


//minus
const minusFunc = data => {
	array = document.querySelectorAll('.plus_' + data.dataset.id);
	
	summa -= parse_prace(cart[data.dataset.id]['price']);
	document.getElementById('total').innerHTML = int_to_str(summa);

	if (cart[data.dataset.id]['count'] - 1 == 0){
		deleteFunc(data.dataset.id);

		array.forEach(function(obj) {
			obj.parentElement.parentElement.children[1].style.display = '';
			obj.parentElement.parentElement.children[2].style.display = 'none';
		})

		let prod_count = parseInt(cart_counter.textContent);

		cart_counter.innerHTML = prod_count - 1;

		if (parseInt(cart_counter.textContent) == 0){
			cart_counter.style.display = 'none';
			document.getElementById('empty').style.display = '';
		}
		else{
			document.getElementById('empty').style.display = 'none';
		}
		return true;
	}
	cart[data.dataset.id]['count']--;
	set_value(data.dataset.id);

	array.forEach(function(obj) {
		obj.parentElement.children[1].innerHTML = cart[data.dataset.id]['count'];
	})
}


//remove from cart
const deleteFunc = id => {
	delete cart[id];
	localStorage.removeItem(id);
	document.querySelector(`#prod_${id}`).remove();
}
*/
