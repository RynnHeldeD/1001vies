$(document).ready(function(){
	$('.main-slider').slick({
		arrows: false,
		useTransform: true,
		draggable: true,
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
		speed: 1200
	});
});