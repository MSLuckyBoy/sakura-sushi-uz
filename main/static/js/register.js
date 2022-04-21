$(document).ready(function(){
	const check = () => {
		cart = JSON.parse(localStorage.getItem('cart'));

		content = '';
		counter = 0;

		for (id in cart){
			counter += 1;
			title = cart[id]['name'];
			price = cart[id]['price'];
			count = cart[id]['count'];

			content += `<tr>
							<th scope="col-2">${counter}</th>
							<td scope="col-4" class='text-break'>${title}</td>
							<td scope="col-4">${price}</td>
							<td scope="col-2">${count}</td>
						</tr>`
		}

		return content;
	}

	$('#checkout').click(function(){
		btn = $(this);
		$(btn).prop('disabled', true);
		$(btn).prop('readonly', true);
		if (localStorage.getItem('profile')){
			document.querySelector('.check_list').insertAdjacentHTML('afterbegin', check());
			setTimeout(function() {
				$('#staticBackdrop').modal('show');
			}, 300);
			
			$(btn).prop('disabled', false);
			$(btn).prop('readonly', false);
		}
		else{
			sessionStorage.setItem('is_checkout_btn', true);
			$.ajax({
				url: '/login',
				type: 'get',
				dataType: 'json',
				beforeSend: function(){
					setTimeout(function() {
						$('#modal-login').modal('show');
					}, 300);
					$(btn).prop('disabled', false);
					$(btn).prop('readonly', false);
				},
				success: function(data){
					$('#modal-login #log-form').html(data.html_form);
				}
			})
		}
	})

	$('#confirm').click(function(){
		btn = $(this);
		$(btn).prop('disabled', true);
		$(btn).prop('readonly', true);

		var x_cor = $('#x_cor').val();
		var y_cor = $('#y_cor').val();

		var address = $('#user_address').val();

		var payment = $('#payment').val();

		var comment = $('#comment').val();


		if (x_cor == '' && y_cor == '' && address == ''){
			alert('Пожалуйста, заполните все поля, отмеченные (*)!');
			
			$(btn).prop('disabled', false);
			$(btn).prop('readonly', false);
		}
		else if(x_cor == '' && y_cor == '' && address != ''){
			alert('Пожалуйста, укажите адрес доставки на карте!');
			
			$(btn).prop('disabled', false);
			$(btn).prop('readonly', false);
		}
		else if(x_cor != '' && y_cor != '' && address == ''){
			$('#user_address').addClass('is-invalid');
			alert('Пожалуйста, укажите адрес доставки!');
			
			$(btn).prop('disabled', false);
			$(btn).prop('readonly', false);
		}
		else{
			$('#user_address').addClass('is-valid').removeClass('is-invalid');
			$('#payment').addClass('is-valid');
			$('#comment').addClass('is-valid');

			data = JSON.parse(localStorage.getItem('profile'));
			cart = JSON.parse(localStorage.getItem('cart'));

			let product = {}

			for (let i in cart){
				product[i] = cart[i]['count']
			}
			data['x_cor'] = x_cor;
			data['y_cor'] = y_cor;
			data['address'] = address;
			data['payment'] = payment;
			data['comment'] = comment;
			data['product'] = product;

			$.ajax({
				url: '../checkout/',
				data: data,
				type: 'get',
				dataType: 'json',
				success: function(data){
					if (data.is_success == true){
						cart = {};
						localStorage.setItem('cart', JSON.stringify(cart));
						
						sessionStorage.removeItem('is_checkout_btn');
						alert('Спасибо за ваш заказ, мы свяжемся с вами в ближайшее время!')
						location.reload();
					}
					else{
						$(btn).prop('disabled', true);
						$(btn).prop('readonly', true);
					}
				}
			})
		}
	})

	$('#cancel').click(function(){
		sessionStorage.removeItem('is_checkout_btn');
		location.reload();
	})

	/*--------------------------------*/

	$('.login').click(function(){
		$.ajax({
			url: '/login',
			type: 'get',
			dataType: 'json',
			beforeSend: function(){
				$('#modal-login').modal('show');
			},
			success: function(data){
				$('#modal-login #log-form').html(data.html_form);
			}
		})
	})

	$('#modal-login').on('submit', '.login-form', function(){
		var form = $(this);
		$('#log_send_code').prop('disabled', true);
		$('#log_send_code').prop('readonly', true);

		$.ajax({
			url: form.attr('data-url'),
			data: form.serialize(),
			type: form.attr('method'),
			dataType: 'json',
			success: function(data){
				if(data.form_is_valid){
					$('#log_tel').addClass('is-valid').removeClass('is-invalid');
					$('#log_tel').prop('disabled', true);
					$('#log_tel').prop('readonly', true);
					$('#log_send_code').prop('disabled', true);
					$('#log_send_code').prop('readonly', true);

					localStorage.setItem('profile', JSON.stringify(data.user_data));
					if (sessionStorage.getItem('is_checkout_btn') == 'true' ){
						$('#modal-login').modal('hide');
						document.querySelector('.check_list').insertAdjacentHTML('afterbegin', check());
						$('#staticBackdrop').modal('show');
					}
					else{
						location.reload();
					}
				}
				else{
					$('#modal-login #log-form').html(data.html_form);
					$('#log_tel').addClass('is-invalid').removeClass('is-valid');
					$('#log_send_code').prop('disabled', false);
					$('#log_send_code').prop('readonly', false);
				}
			}
		})
		return false;
	})

	/*--------------------------------*/

	$('.register').click(function(){
		$.ajax({
			url: '/register',
			type: 'get',
			dataType: 'json',
			beforeSend: function(){
				$('#modal-register').modal('show');
			},
			success: function(data){
				$('#modal-register #reg-form').html(data.html_form);
			}
		})
	})

	$('#modal-register').on('submit', '.register-form', function(){
		var form = $(this);
		$('#reg_send_code').prop('disabled', true);
		$('#reg_send_code').prop('readonly', true);
		$.ajax({
			url: form.attr('data-url'),
			data: form.serialize(),
			type: form.attr('method'),
			dataType: 'json',
			success: function(data){
				if(data.form_is_valid){
					$('#username').addClass('is-valid').removeClass('is-invalid');
					$('#reg_tel').addClass('is-valid').removeClass('is-invalid');
					$('#username').prop('disabled', true);
					$('#username').prop('readonly', true);
					$('#reg_tel').prop('disabled', true);
					$('#reg_tel').prop('readonly', true);
					$('#reg_send_code').prop('disabled', true);
					$('#reg_send_code').prop('readonly', true);

					localStorage.setItem('profile', JSON.stringify(data.user_data));
					if (sessionStorage.getItem('is_checkout_btn') == 'true' ){
						$('#modal-register').modal('hide');
						document.querySelector('.check_list').insertAdjacentHTML('afterbegin', check());
						$('#staticBackdrop').modal('show');
					}
					else{
						location.reload();
					}
				}
				else{
					$('#modal-register #reg-form').html(data.html_form);
					$('#reg_send_code').prop('disabled', false);
					$('#reg_send_code').prop('readonly', false);
				}
			}
		})
		return false;
	})

	/*--------------------------------*/

	$('.profile').click(function(){
		let data = JSON.parse(localStorage.getItem('profile'));
		let username = data['username'];
		let phone_num = data['phone_number'];

		$('#modal-profile #user_data').html(
			`
			<h5>Имя Фамилия:</h5>
			<span class="input-group-text mb-3">${username}</span>
			<h5>Телефон номер:</h5>
			<span class="input-group-text mb-3">${phone_num}</span>
			`
		);
		$('#modal-profile').modal('show');
	})

	$('#logout').click(function(){
		localStorage.removeItem('profile');
		$('#modal-profile').modal('hide');
		location.reload();
	})

})


if (localStorage.getItem('profile') !== null){
	$('.this').addClass('profile').removeClass('login');
}
else{
	$('.this').addClass('login').removeClass('profile');
}
