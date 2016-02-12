$(document).ready(function () {
	$('.special .filter ul li a').click(function(){
		var sect=$(this).attr('rel');
		var ib=$(this).parent().parent().attr('rel');
		var filterdata=$('#filter').serialize();
		$.ajax({
				type: "POST",
				url: "/ajx/stocks.php",
				data: filterdata+"&sect="+sect+"&ib="+ib,
				success: function(msg){
					if (msg){
						$(".special .slider").html(msg);
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
					}
								
					}
				});		
	return false;	
	});

	$('a.fancybox').fancybox({
		'padding':0
	});

	$('.feedback .tab button').click(function(){
		var id=$(this).parent().parent().attr('data-tab');
		var a=true;
		$(this).parent().find('input.required, textarea.required').each( function(){
		
			if ($(this).val()=="") {
				$(this).css('background',"#f85c76");
				a=false;	
			}else {
				$(this).css('background',"#fff");
			}
		});
		if (a) {
			var formdata=$('#f'+id).serialize();
			$.ajax({
				  type: "POST",
				  url: "/ajx/f"+id+".php",
				  data: formdata,
				  success: function(msg){ 
					if (msg != 0){
						$('.feedback').fadeOut(500);
						$('.modal').fadeIn(500);
    					$('.fade').fadeIn(500);
						$('.tab input, .tab textarea').val('');
					}
					
					
				  }
				});	
			}	
		
		return false;
	});

	
  

    $('.search input').focus(function() {
    	$('.search').addClass('white');
    });
     $('.search input').focusout(function() {
    	$('.search').removeClass('white');
    });


    $('#search').submit(function(){
    	var s=$('input[name=s]').val();
    	var data1=$('input[name=data1]').val();
    	$.ajax({
				  type: "POST",
				  url: "/ajx/search.php",
				  data: "s="+s+"&data1="+data1,
				  success: function(msg){ 
					if (msg){
						location.href=msg;
					}
					
					
				  }
				});

    	return false;
    }) ;
    
    $('.ui-autocomplete').click(function(){
    	$('#search').submit();
    });
    $('.scheme .legend ul li span').click(function(){
    	$('.scheme .legend ul li').removeClass('active');
    	$(this).parent().addClass('active');
    }); 

    $('.rent button').click(function(){
    	$('[data-feedback=open]').click();
    	$('[data-load=3]').click();
    	return false;
    });
	//показываем второй этаж
    if (location.hash=="#floor2") {
    	$('.scheme .plan .nav li a[href=2]').click();
    }
    $('input[name=phone]').mask("+7 (999) 999-99 99");

    $('.fade, .modal .close').click(function(){
    	$('.modal').fadeOut(500);
    	$('.fade').fadeOut(500);
    });
    $('.section.contacts .core ul li:nth-child(3n)').click(function(){
    		$('[data-feedback=open]').click();

    });

    $('.section.contacts .core ul li:nth-child(2n)').click(function(){
   		$('.fade, .modaltime').fadeIn(500);

    });

    $('.fade, .modaltime .close').click(function(){
    	$('.fade, .modaltime').fadeOut(500);
    });
    
    $('.filterdo').click(function(){
    	$('.special .filter ul li.active').find('a').click();
    	$('.filter-modal').fadeOut(500);
    });
    $('.filterclear').click(function(){
    	$('.checker span.checked').each(function(){
    		$(this).find('input').click();
    	});
    });
    $('.section.contacts .core ul li').hover(function(){
    	$(this).addClass('hover');
    }, function (){
    	$(this).removeClass('hover');
    });
    $('#filter input').change(function(){
    	$('.filterdo').click();
    });
  
    $('.modalgallery').each(function() {
		$(this).slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'fade',
			fadeSpeed: 500,
			slideEasing: 'easeInOutQuad',
			play: 7500,
			pause: 1000,
		});
	})
    
  		
  	$('[data-tab=2] select[name=tc]').change(function(){
  		var id=$(this).val();
  		$('.tab section').removeClass('active');
  		$(id).addClass('active');
  		$(id+" .variants li:first-child a").click();
  	});
  	$('.variants li a').click(function(){
  		$('.variants li').removeClass('active');
  		$(this).parent().addClass('active');
  		var cl = $(this).attr('href');
  		$(this).parent().parent().parent().find('.modalgallery').hide();
  		$(this).parent().parent().parent().find('.'+cl).show();
  		return false;
  	});
  	$('.tab section.active .variants li:first-child a').click();
  	$('.special .filter ul li').removeClass('active');
})