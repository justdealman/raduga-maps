function introSize() {
	var h = $(window).height()-90;
	if ( $('.disabled').length > 0 ) {
		h = $('.section').width()*921/1920;
	}
	if ( h < 509 ) {
		h = 509;
	}
	$('.section:first-child').css({
		'height': h+90+'px'
	});
	if ( $('.disabled').length > 0 ) {
		$('.section:first-child').css({
			'height': $('.section').width()*921/1920+90+'px'
		});
	}
	$('.introduction, .introduction .container, .introduction .container .core').css({
		'height': h+'px'
	});
	$('.introduction .container, .introduction .container .core').width($('.section').width());
	$('.introduction .slides_control').css({
		'left': -$('.section').width()+'px',
		'width': $('.section').width()+'px'
	});
	$('.introduction .core').css({
		'left': $('.section').width()+'px'
	});
	$('.introduction .container .slide1 > img').css({
		'width': 'auto',
		'height': h+'px'
	});
	$('.introduction .container .slide2 .bg').css({
		'width': $('.section').width()+'px',
		'height': h+'px'
	});
}
function indexPanels() {
	if ( $(window).height() < 602 ) {
		$('.new-panel').css({
			'top': '0',
			'margin-top': '0'
		});
	}
	else {
		$('.new-panel').css({
			'top': '50%',
			'margin-top': '-301px'
		});
	}
}
function sectionZoom() {
	$('.section:has("h1")').each(function() {
		var f = 0;
		if ( $(this).find('.footer').length > 0 ) {
			f = $(this).find('.footer').height();
		}
		var p = (($(window).height()-$(this).find('.header').height()-$(this).find('h1').outerHeight(true)-f)-$(this).find('.core').outerHeight(true))/4;
		if ( p < 0 ) {
			p = 0;
		}
		$(this).find('.core').css({
			'padding-top': p+'px'
		});
	});
}
$(document).ready(function() {
	if ( $('.welcome').length > 0 ) {
		if ( $(window).height() >= 600 && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			// тут условие если есть кино
			if ($('body').hasClass('rub')){
				$('.wrapper').fullpage({
					css3: true,
					anchors: ['welcome', 'stores', 'special', 'gallery', 'cinema', 'contacts'],
					onLeave: function(index, nextIndex, direction) {
						if ( nextIndex == 1 ) {
							$('.header ul li').removeClass('active');
						}
						else {
							$('.header ul li:nth-child('+eval(nextIndex-1)+')').addClass('active').siblings().removeClass('active');
						}
					}
				});	
			}else {
			$('.wrapper').fullpage({
				css3: true,
				anchors: ['welcome', 'stores', 'special', 'gallery', 'contacts'],
				onLeave: function(index, nextIndex, direction) {
					if ( nextIndex == 1 ) {
						$('.header ul li').removeClass('active');
					}
					else {
						$('.header ul li:nth-child('+eval(nextIndex)+')').addClass('active').siblings().removeClass('active');
					}
				}
			});
			}
			$.fn.fullpage.reBuild();
			$('body').addClass('enabled');
		}
		else {
			$('body').addClass('disabled');
		}
	}
	if ( $('.enabled').length > 0 ) {
		sectionZoom();
	}
	$('.disabled .header ul li a').bind('click', function(event) {
		var target = $(this).attr('href').substr(1);
		$('html, body').animate({ scrollTop: $('.section.'+target).position().top+'px' }, 750);
		$(this).parent().addClass('active').siblings().removeClass('active');
		event.preventDefault();
	});
	$('.disabled .header a[href="#welcome"]').bind('click', function(event) {
		$('html, body').animate({ scrollTop: '0' }, 750);
		$('.disabled .header ul li').removeClass('active');
		event.preventDefault();
	});
	$('.enabled .header ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('.enabled .header a[href="#welcome"]').bind('click', function() {
		$('.enabled .header ul li').removeClass('active');
	});
 	if ( $('.introduction').length > 0 ) {
		if ( $('.introduction .container > div').length > 1 ) {
			$('.introduction').slides({
				generatePagination: true,
				generateNextPrev: true,
				container: 'container',
				effect: 'fade',
				fadeSpeed: 500,
				slideEasing: 'easeInOutQuad',
				play: 7500,
				pause: 1000,
				slidesLoaded: function() {
					$('.introduction .core:first-child').addClass('complete');
				},
				animationStart: function() {
					var current = $('.introduction .pagination li.current').index()+1;
					$('.introduction .core[data-slide="'+current+'"]').addClass('out');
					$('.introduction .core[data-slide="'+current+'"] .animated').removeClass('flipInX').addClass('flipOutX');
				},
				animationComplete: function() {
					var current = $('.introduction .pagination li.current').index()+1;
					$('.introduction .core[data-slide="'+current+'"]').addClass('complete').siblings().removeClass('complete out');
					$('.introduction .core[data-slide="'+current+'"] .animated').removeClass('flipOutX').addClass('flipInX');
				}
			});
		}
		else {
			$('.introduction .container').append('<div></div>');
			$('.introduction').slides({
				generatePagination: false,
				generateNextPrev: false,
				container: 'container',
				effect: 'fade',
				fadeSpeed: 500,
				slideEasing: 'easeInOutQuad',
				play: 0,
				pause: 0,
				slidesLoaded: function() {
					$('.introduction .core:first-child').addClass('complete');
				}
			});
		}
 		introSize();
 	}
	$('.about .plan > ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	}).filter(':first').click();
	$('.special .filter ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	}).filter(':first').click();
	$('.stores .core > ul li.icon2').hover(
		function() {
			var current = $(this);
			current.find('div span:nth-child(1)').addClass('hover');
			setTimeout(function() {
				current.find('div span:nth-child(2)').addClass('hover');
			}, 200);
			setTimeout(function() {
				current.find('div span:nth-child(3)').addClass('hover');
			}, 400);
		},
		function() {
			$(this).find('div span').removeClass('hover');
		}
	);
	$('.special .slider').slidesfix({
		generatePagination: false,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 750,
		slideEasing: 'easeInOutQuad',
		play: 0,
		pause: 1000,
	});
	if ( $('.gallery .slider .item').length > 3 ) {
		$('.gallery .slider').slidesfix({
			generatePagination: false,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 750,
			slideEasing: 'easeInOutQuad',
			play: 0,
			pause: 1000,
		});
		$('.gallery .slider .container > div > div').addClass('inner');
	}
	else {
		$('.gallery .slider .container > div').addClass('inner');
	}
	$('input, textarea').each(function () {
		$(this).data('holder',$(this).attr('placeholder'));
		$(this).focusin(function(){
			$(this).attr('placeholder','');
		});
		$(this).focusout(function(){
			$(this).attr('placeholder',$(this).data('holder'));
		});
	});
	if ( $('section .plan').length > 0 ) {
		var paths = {
			shop1: {
				name: 'Мария-Ра',
				path: 'M 3 97.5 L 3 193 L 55.5 193 L 108 193 L 108 97.5 L 108 2 L 55.5 2 L 3 2 L 3 97.5Z'
			},
			shop2: {
				name: 'Incanto',
				path: 'M 143 31 L 143 60 L 159 60 L 175 60 L 175 31 L 175 2 L 159 2 L 143 2 L 143 31Z'
			},
			shop3: {
				name: 'Mango',
				path: 'M 282 31 L 282 60 L 301 60 L 320 60 L 320 31 L 320 2 L 301 2 L 282 2 L 282 31Z'
			},
			shop4: {
				name: 'Adidas',
				path: 'M 322 31 L 322 60 L 356.5 60 L 391 60 L 391 31 L 391 2 L 356.5 2 L 322 2 L 322 31Z'
			},
			shop5: {
				name: 'Love Republic',
				path: 'M 143 133.5 L 143 175 L 164.5 175 L 186 175 L 186 133.5 L 186 92 L 164.5 92 L 143 92 L 143 133.5Z'
			},
			shop6: {
				name: 'H&M',
				path: 'M 188 133.5 L 188 175 L 205.3 175 L 222.5 175 L 232.5 165 C 241.6 155.9 242.8 155 246.2 155 L 250 155 L 250 123.5 L 250 92 L 219 92 L 188 92 L 188 133.5Z'
			},
			shop7: {
				name: 'Love Republic',
				path: 'M 337 133.5 L 337 175 L 364 175 L 391 175 L 391 138.2 L 391 101.4 L 386.2 96.7 L 381.4 92 L 359.2 92 L 337 92 L 337 133.5Z'
			},
			shop8: {
				name: 'Mango',
				path: 'M 176 236 L 176 264 L 198 264 L 220 264 L 220 236 L 220 208 L 198 208 L 176 208 L 176 236Z'
			},
			shop9: {
				name: 'Incanto',
				path: 'M 262 236 L 262 264 L 281 264 L 300 264 L 300 236 L 300 208 L 281 208 L 262 208 L 262 236Z'
			}
		}
		var r = Raphael('floor1', 471, 280),
		attributes = {
			fill: 'rgba(255,255,255,0)',
			stroke: 'rgba(255,255,255,0)',
			'stroke-width': 1,
			'stroke-linejoin': 'round'
		},
		arr = new Array();
		for (var shop in paths) {
			var obj = r.path(paths[shop].path);
			obj.attr(attributes);
			arr[obj.id] = shop;
			obj.hover(
				function() {
					this.animate({
						fill: 'rgba(255,255,255,0.5)',
						stroke: 'rgba(255,255,255,0.5)'
					}, 0);
					var point = this.getBBox(0);
					$('#floor1').append('<p class="bubble">'+paths[arr[this.id]].name+'</p>');
					$('#floor1 .bubble').css({
						'left': point.x+point.width/2+'px',
						'top': point.y-29+'px',
						'margin-left': -$('#floor1 .bubble').outerWidth()/2+'px'
					});
				},
				function() {
					this.animate({
						fill: attributes.fill,
						stroke: attributes.stroke
					}, 0);
					$('#floor1 .bubble').remove();
				}
			);
		}
	}
	if ( $('.shop-page .slider').length > 0 ) {
		$('.shop-page .slider').jcarousel({
			scroll: 1,
			animation: 500,
			wrap: 'circular'
		});
	}
	if ( $('.list-alphabet').length > 0 ) {
		$('.list-alphabet > li').each(function() {
			var letter = eval($(this).index()+1);
			var cols = $(this).find('div p').size();
			var size = cols;
			if ( cols > 3 ) {
				cols = 3;
			}
			$(this).append('<ul></ul>');
			var colContent = Math.ceil(size/3);
			for ( var i = 0; i < cols; i++ ) {
				$(this).find('ul').append('<li></li>');
				for ( var j = 1; j<= colContent; j++ ) {
					$(this).find('div > :nth-child('+eval(i*colContent+j)+')').clone().appendTo('.list-alphabet > li:nth-child('+letter+') > ul li:nth-of-type('+eval(i+1)+')');
				}
			}
		});
	}
	if ( $('.new-panel').length > 0 ) {
		$('.new-panel').append('<span class="close"></span>');
		$('.new-panel .close').bind('click', function() {
			$(this).parent().stop(true,true).fadeOut(100);
		});
	}
	if ( $('.new-panel').length > 0 ) {
		$('.new-panel').append('<span class="close"></span>');
		$('.new-panel .close').bind('click', function() {
			$(this).parent().stop(true,true).fadeOut(100);
		});
	}
	if ( $('.new-panel').length > 0 ) {
		indexPanels();
	}
	$('.introduction .container, .special .slider .container, .gallery .slider .container').bind('swipeleft', function() {
		$(this).parent().find('.next').trigger('click');
	});
	$('.introduction .container, .special .slider .container, .gallery .slider .container').bind('swiperight', function() {
		$(this).parent().find('.prev').trigger('click');
	});
	if ( $('input[type="radio"]').length > 0 ) {
		$('input[type="radio"]').uniform();
	}
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	if ( $('.range-ui').length > 0 ) {
		$('.range-ui').slider({
			range: true,
			min: 0,
			max: 20000,
			step: 5,
			values: [2500, 10000],
			slide: function(event, ui) {
				$('.range input[name="from"]').val(ui.values[0]);
				$('.range input[name="to"]').val(ui.values[1]);
			}
		});
		$('.range input[name="from"]').val($('.range-ui').slider('values', 0));
		$('.range input[name="to"]').val($('.range-ui').slider('values', 1));
	}
	$('.feedback .nav ul li').bind('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.feedback').find('.tab[data-tab="'+$(this).attr('data-load')+'"]').show().siblings('.tab').hide();
	}).filter(':first').click();
	if ( $('.feedback').length > 0 ) {
		$('.feedback > div').append('<span class="close"></span>');
		$('[data-feedback="open"]').bind('click', function() {
			var t = 0;
			if ( $('.enabled').length > 0 ) {
				$('.feedback').css({
					'top': t+'px'
				}).stop(true,true).fadeIn(250);
				$.fn.fullpage.setMouseWheelScrolling(false);
			}
			else {
				var t = $(document).scrollTop();
				$('.feedback').css({
					'top': t+'px'
				}).stop(true,true).fadeIn(250);
			}
			$('.fade').stop(true,true).fadeIn(250);
		});
		$('.fade, .feedback .close').bind('click', function() {
			$('.feedback, .fade').stop(true,true).fadeOut(250);
			if ( $('.enabled').length > 0 ) {
				$.fn.fullpage.setMouseWheelScrolling(true);
			}
		});
		$('.feedback').click(function() {
			$('.feedback, .fade').stop(true,true).fadeOut(250);
			if ( $('.enabled').length > 0 ) {
				$.fn.fullpage.setMouseWheelScrolling(true);
			}
		});
		$('.feedback > div').click(function(event){
			event.stopPropagation();
		});
	}
	$('.header h5 span').bind('click', function() {
		$('.header .mallsel').css({
			'left': $(this).offset().left+'px',
			'top': $(this).offset().top+'px'
		}).slideDown(200);
	});
	$('.header .mallsel p span').bind('click', function() {
		$('.header .mallsel').slideUp(200);
	});
	$('html').click(function() {
		$('.header .mallsel').slideUp(200);
	});
	$('.header .mallsel, .header h5 span').click(function(event){
		event.stopPropagation();
	});
	if ( $('.stores .core .carousel').length > 0 ) {
		$('.stores .core .carousel').jcarousel({
			scroll: 1,
			animation: 500,
			wrap: 'circular'
		});
	}
	if ( $('.filter').length > 0 ) {
		$('.filter-show').bind('click', function() {
			if ( $(this).hasClass('active') ) {
				$(this).parents('.section').find('.filter-modal').stop(true,true).fadeOut(250);
				$(this).removeClass('active');
			}
			else {
				$(this).parents('.section').find('.filter-modal').css({
					'top': $(this).position().top+'px'
				}).stop(true,true).fadeIn(250);
				$(this).addClass('active');
			}
		});
		$('html').click(function() {
			$('.filter-modal').stop(true,true).fadeOut(250);
			$('.filter-show').removeClass('active');
		});
		$('.filter-modal, .filter-show').click(function(event){
			event.stopPropagation();
		});
	}
	$('textarea').keyup(function() {
		$(this).height(38);
		$(this).height(this.scrollHeight-28);
	});
	$('.section.cinema [data-film]').bind('click', function(event) {
		event.preventDefault();
		var t = $(this).parents('.cinema').find('.description[data-film-desc="'+$(this).attr('data-film')+'"]').show().siblings('.description').hide();
		$('[data-film]').removeClass('active');
		$(this).addClass('active');
	}).filter(':first').click();
});
$(window).resize(function() {
	if ( $('.introduction').length > 0 ) {
		introSize();
	}
	if ( $('.new-panel').length > 0 || $('.social-panel').length > 0 ) {
		indexPanels();
	}
	if ( $('.enabled').length > 0 ) {
		sectionZoom();
	}
});
$(window).load(function() {
	/*if ( $('.introduction').length > 0 ) {
		introSize();
	}*/
	if ( $('.new-panel').length > 0 ) {
		$('.new-panel').delay(1500).fadeIn(250);
	}
});