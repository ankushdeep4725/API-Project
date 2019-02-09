/*! WOW - v1.1.2 - 2015-04-07
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);
(function ($) {
 "use strict";

	/*----------------------------
	 wow js active
	------------------------------ */
	
		new WOW().init();

	/*------------- preloader js --------------*/
	$(window).on('load',function() { // makes sure the whole site is loaded
		$('.preloder-wrap').fadeOut(); // will first fade out the loading animation
		$('.loader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(150).css({'overflow':'visible'})
	})

    // search
	$(".search-wrap ul li a").on("click", function(){
		$(".search-area").addClass("active");
	});
	$(".search-area span.closs-btn ").on("click", function(){
		$(".search-area").removeClass("active");
	});
	// // stickey menu
	$(window).on('scroll',function() {
		var scroll = $(window).scrollTop(),
			mainHeader = $('#sticky-header'),
			mainHeaderHeight = mainHeader.innerHeight();

		// console.log(mainHeader.innerHeight());
		if (scroll > 2) {
			$("#sticky-header").addClass("sticky");
		}else{
			$("#sticky-header").removeClass("sticky");
		}
	});

    // slicknav
	$('ul#navigation').slicknav({
		prependTo:".responsive-menu-wrap"
	});


	// slider-active
	$('.slider-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		animateOut: 'fadeOut',
		animateIn: 'FadepIn',
		nav:true,
		autoplay:true,
		autoplayTimeout:3000,
		loop:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			450:{
				items:1
			},
			678:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

	//slider-area background setting
    function sliderBgSetting() {
        if ($(".slider-area .slider-items").length) {
            $(".slider-area .slider-items").each(function() {
                var $this = $(this);
                var img = $this.find(".slider").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }

    //    home2 slider   //
    //Setting hero slider home page 1
    function heroSlider() {
		debugger;
        if ($(".slider-active2").length) {

            var time = 7, // time in seconds
                $progressBar,
                $bar,
                $elem,
                isPause,
                tick,
                percentTime,
                owl = $('.slider-active2');


            owl.owlCarousel({
                items : 1,
                smartSpeed:5000,
				margin:0,
				animateOut: 'slideOutDown',
				animateIn: 'slideInDown',
				nav:true,
                rtl:true,
				autoplay:true,
				autoplayTimeout:6000,
				loop:true,
				navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                onInitialized: progressBar
            });

            owl.on('changed.owl.carousel', function(event) {
               moved();
            })

            // progress bar
            function progressBar() {
                buildProgressBar();
                start();
            }

            function buildProgressBar(){
                $progressBar = $("<div>",{
                    id:"progressBar"
                });

                $bar = $("<div>",{
                    id:"bar"
                });

                $progressBar.append($bar).prependTo(owl);
            }

            function start() {
                percentTime = 0;
                isPause = false;
                tick = setInterval(interval, 10);
            };

            function interval() {
                if(isPause === false){
                    percentTime += 1 / time;

                    $bar.css({
                        width: percentTime+"%"
                    });

                    if(percentTime >= 500){
                        owl.trigger("next.owl.carousel");
                        percentTime = 0;
                    }
                }
            }

            function moved(){
                clearTimeout(tick);
                start();
            }
        }
    }

	setTimeout(function(){
	
	heroSlider();
},1000);

	// slider-active
	$(".slider-active2").on('translate.owl.carousel', function(){
		$('.slider-content h2').removeClass('fadeInUp animated').hide();
		$('.slider-content p').removeClass('fadeInUp animated').hide();
		$('.slider-content ul').removeClass('fadeInUp animated').hide();
	});

	$(".slider-active2").on('translated.owl.carousel', function(){
		$('.owl-item.active .slider-content h2').addClass('fadeInUp animated').show();
		$('.owl-item.active .slider-content p').addClass('slideInUp animated').show();
		$('.owl-item.active .slider-content ul').addClass('fadeInUp animated').show();
	});


    // slider-active
	$('.slider-active3').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		autoplay:true,
		autoplayTimeout:3000,
		loop:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			450:{
				items:1
			},
			678:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

    // slider-active
	$(".slider-active3").on('translate.owl.carousel', function(){
		$('.slider-content h2').removeClass('fadeInUp animated').hide();
		$('.slider-content p').removeClass('fadeInUp animated').hide();
		$('.slider-content ul').removeClass('fadeInUp animated').hide();
	});

	$(".slider-active3").on('translated.owl.carousel', function(){
		$('.owl-item.active .slider-content h2').addClass('fadeInUp animated').show();
		$('.owl-item.active .slider-content p').addClass('slideInUp animated').show();
		$('.owl-item.active .slider-content ul').addClass('fadeInUp animated').show();
	});
	/*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
	$(window).on('load', function() {

		sliderBgSetting();

	});

    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var parallaxSpeed = $(this).data("speed");
                var doParallax = -(resize / parallaxSpeed);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover",
                });

                if ( window.innerWidth < 768) {
                    $(this).css({
                        backgroundPosition: "center center"
                    });
                }
            });
        }
    }
	$(window).on("scroll", function() {
		bgParallax();
	});


	// // stickey menu
	$(window).on('scroll',function() {
		var scroll = $(window).scrollTop(),
			mainHeader = $('#sticky-header'),
			mainHeaderHeight = mainHeader.innerHeight();

		// console.log(mainHeader.innerHeight());
		if (scroll > 1) {
			$("#sticky-header").addClass("sticky");
		}else{
			$("#sticky-header").removeClass("sticky");
		}
	});

	// hover effect
	//setTimeout(function() {
		$(".portfolio").snakeify({speed: 300});
		$(".team-wrap2 .team-img").snakeify({speed: 300});
	//},2000);
	/*--------------------------
	 scrollUp
	---------------------------- */
	$.scrollUp({
		scrollText: '<i class="fa fa-arrow-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});

	/*--
	Magnific Popup
	------------------------*/
	$('.popup').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		}

	});

	/* magnificPopup video view */
	$('.video-popup').magnificPopup({
		type: 'iframe',
		gallery:{
			enabled:true
		}
	});

	// counter up
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	/*-------------------------------------------------------
        blog details
    -----------------------------------------------------*/
    if ($(".about-area,.featured-area,.skill-area").length) {
        var post = $(".about-area .about-img, .featured-img,.skill-area .skill-img");

        post.each(function() {
            var $this = $(this);
            var entryMedia = $this.find("img");
			var entryMediaPic = entryMedia.attr("src");

            $this.css({
                backgroundImage: "url("+ entryMediaPic +")",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            })
        })
    }

    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    }


	$(window).on("load", function() {
		setTwoColEqHeight($(".about-area .about-img"), $(".about-area .about-wrap"));
		setTwoColEqHeight($(".featured-content .featured-img"), $(".featured-content .featured-info"));
		setTwoColEqHeight($(".skill-area .skill-img"), $(".skill-area .skill-wrap"));

	});


	// test-active
	$('.test-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:false,
		autoplay:true,
		autoplayTimeout:6000,
		loop:true,
		slideBy:2,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
				slideBy:1
			},
			450:{
				items:1,
				slideBy:1
			},
			678:{
				items:2
			},
			1000:{
				items:2
			}
		}
	})

    // pricing-active
	$('.pricing-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		loop:true,
		slideBy:2,
		navText:['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
		responsive:{
			0:{
				items:1,
			},
			450:{
				items:1,
			},
			600:{
				items:2,
			},
			800:{
				items:3,
			},
			1000:{
				items:3
			}
		}
	})

    // pricing-active
	$('.single-service-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		loop:true,
		slideBy:2,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			450:{
				items:1,
			},
			600:{
				items:1,
			},
			800:{
				items:1,
			},
			1000:{
				items:1
			}
		}
	})

    $('.grid').imagesLoaded( function() {

	// filter items on button click
	$('.portfolio-menu').on( 'click', 'button', function() {
    	  var filterValue = $(this).attr('data-filter');
    	  $grid.isotope({ filter: filterValue });
    	});

    	// init Isotope
    	var $grid = $('.grid').isotope({
    	  itemSelector: '.portfolio',
    	  percentPosition: true,
    	  masonry: {
    		// use outer width of grid-sizer for columnWidth
    		columnWidth: '.portfolio',
    	  }
    	});
	});

	$('.portfolio-menu button').on('click', function(event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});

    // brand-active
	 $('.brand-active').owlCarousel({
        margin:0,
		loop:true,
		autoplay:true,
		autoplayTimeout:4000,
        nav:false,
		smartSpeed:800,
        navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
        URLhashListener:true,
        startPosition: 'URLHash',
        responsive:{
            0:{
                items:2
            },
            450:{
                items:2
            },
            768:{
                items:4
            },
            1000:{
                items:5
            }
        }
    });

    /*------------------------------------------
        Pricing table switcher
    -------------------------------------------*/
    if ($(".pricing-switcher-wrap").length) {
        var switcher = $(".pricing-switcher-wrap .pricing-switch");
        var pricingTab = $(".pricing-table");
        var tablist = $(".pricing-switcher-wrap .pricing-tablist");


        switcher.on("click", function() {
            var $this = $(this);
            $this.find(".pricing-slider").toggleClass("pricing-slide-off");
            pricingTab.children(".pricing-grids").toggleClass("active-price");
            tablist.children("span").toggleClass("active");
        })
    }
    /*---------------------
	 countdown
	--------------------- */
	$('[data-countdown]').each(function() {
		  var $this = $(this), finalDate = $(this).data('countdown');
		  $this.countdown(finalDate, function(event) {
			$this.html(event.strftime('<span class="cdown days"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hour</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>Min</p></span> <span class="cdown second"> <span><span class="time-count">%S</span> <p>Sec</p></span>'));
		});
	});
    
	/*===============================================
                    rtl-sj start
    =================================================*/

    // slider-active
	$('.rtl-slider-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		rtl:true,
		animateOut: 'fadeOut',
		animateIn: 'FadepIn',
		nav:true,
		autoplay:true,
		autoplayTimeout:3000,
		loop:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			450:{
				items:1
			},
			678:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
    // test-active
	$('.rtl-test-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
        rtl:true,
		nav:false,
		autoplay:true,
		autoplayTimeout:6000,
		loop:true,
		slideBy:2,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
				slideBy:1
			},
			450:{
				items:1,
				slideBy:1
			},
			678:{
				items:2
			},
			1000:{
				items:2
			}
		}
	})

    // pricing-active
	$('.rtl-pricing-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		rtl:true,
		loop:true,
		slideBy:2,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			450:{
				items:1,
			},
			600:{
				items:2,
			},
			800:{
				items:3,
			},
			1000:{
				items:3
			}
		}
	})
    // brand-active
	 $('.rtl-brand-active').owlCarousel({
        margin:0,
		loop:true,
		rtl:true,
		autoplay:true,
		autoplayTimeout:4000,
        nav:false,
		smartSpeed:800,
        navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
        responsive:{
            0:{
                items:2
            },
            450:{
                items:2
            },
            768:{
                items:4
            },
            1000:{
                items:5
            }
        }
    });
    // pricing-active
	$('.rtl-single-service-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
        rtl:true,
		loop:true,
		slideBy:2,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			450:{
				items:1,
			},
			600:{
				items:1,
			},
			800:{
				items:1,
			},
			1000:{
				items:1
			}
		}
	})
	
	// slider-active
	$('.rtl-slider-active3').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		rtl:true,
		autoplay:true,
		autoplayTimeout:3000,
		loop:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			450:{
				items:1
			},
			678:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

    // slider-active
	$(".rtl-slider-active3").on('translate.owl.carousel', function(){
		$('.slider-content h2').removeClass('fadeInUp animated').hide();
		$('.slider-content p').removeClass('fadeInUp animated').hide();
		$('.slider-content ul').removeClass('fadeInUp animated').hide();
	});

	$(".rtl-slider-active3").on('translated.owl.carousel', function(){
		$('.owl-item.active .slider-content h2').addClass('fadeInUp animated').show();
		$('.owl-item.active .slider-content p').addClass('slideInUp animated').show();
		$('.owl-item.active .slider-content ul').addClass('fadeInUp animated').show();
	});
	
	
	    // pricing-active
	$('.rtl-single-service-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		rtl:true,
		loop:true,
		slideBy:2,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			450:{
				items:1,
			},
			600:{
				items:1,
			},
			800:{
				items:1,
			},
			1000:{
				items:1
			}
		}
	})
    /*===============================================
                    rtl-sj end
    =================================================*/  

    /*---------------------
    // Ajax Contact Form
    --------------------- */

    $('.cf-msg').hide();
    $('form#cf button#submit').on('click', function() {
        var fname = $('#fname').val();
        var subject = $('#subject').val();
        var email = $('#email').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
            alert('Please enter valid email');
            return false;
        }

        fname = $.trim(fname);
        subject = $.trim(subject);
        email = $.trim(email);
        msg = $.trim(msg);

        if (fname != '' && email != '' && msg != '') {
            var values = "fname=" + fname + "&subject=" + subject + "&email=" + email + " &msg=" + msg;
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: values,
                success: function() {
                    $('#fname').val('');
                    $('#subject').val('');
                    $('#email').val('');
                    $('#msg').val('');

                    $('.cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                    setTimeout(function() {
                        $('.cf-msg').fadeOut('slow');
                    }, 4000);
                }
            });
        } else {
            $('.cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')
        }
        return false;
    });

})(jQuery);
