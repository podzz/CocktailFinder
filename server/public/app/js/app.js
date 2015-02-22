/* Photo ClickTheme v.1.2 scripts */


(function($) {

	var $win = $(window),
		$winHeight = $win.height();

	//Fade preloader out 
	$(window).load(function() {
		var $preloader = $('.preloader');
		
		$preloader.fadeOut('slow',function() {
			$(this).remove();
		});
	});
	
	//Calculate big photo height and its container in home page,
	//as well as centering the banner (do all this also on screen resize)
	var $photoWrapper = $('#page-content-wrapper.home'), 
		$banner = $('#page-content-wrapper.home .inner .banner'),
		$bannerHeight = $banner.height();
		
	$photoWrapper.css('height', $winHeight);
	$banner.css('top', ($winHeight - $bannerHeight) / 2);
	
	$(window).resize(function () {
		$winHeight = $win.height();
		$bannerHeight = $banner.height();
		$photoWrapper.css('height', $winHeight);
		$banner.css('top', ($winHeight - $bannerHeight) / 2);
	});
	
	//Make banner text in home page into an arc
	// $('.banner-header').arctext({
		// radius : 500,
		// fitText : true
	// });
	
	//Make sure the page title in album page fits without breaking 
	$('.centered-header').fitText();
	
	// Menu Toggle Script 
	$('#menu-toggle, .close-icon').on('click', function() {
		$("#site-wrapper").toggleClass("toggled");
	});
	
	//Center blog info vertically 
	var $blogArticle = $('#blog article'),
		$blogMeta = $('#blog .blog-meta');
		
	$blogArticle.each(function() {
		var $this = $(this),
			$articleHeight = $this.height(),
			$blogInfoHeight = $this.find('.blog-info').height(); 
			
		$blogMeta.css('margin-top', ($articleHeight - $blogInfoHeight) / 2);
	});
	
	//Center blog info vertically on window resize 
	$(window).resize(function() {
		$blogArticle.each(function() {
			var $this = $(this),
				$articleHeight = $this.height(),
				$blogInfoHeight = $this.find('.blog-info').height(); 
			
			$blogMeta.css('margin-top', ($articleHeight - $blogInfoHeight) / 2);
		});
	});
	
})(jQuery);