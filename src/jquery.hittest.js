var enableLog = true;
function log(msg){
	if(enableLog || typeof console!=="undefined")
	{
		console.log(msg)
	}
}
$(document).ready(function(){
	$(document).scroll(function(){
		//log($('.target').offset().top + ' : ' + $('.xy-hitter').offset().top);
		if($('.target').offset().top <= $('.xy-hitter').offset().top + $('.xy-hitter').outerHeight())
		{
			log('hitting y')
		}
		else
		{
			log('out of y')
		}

	});
	log($(document));
	log($('.xy-hitter'));
	log($($('.xy-hitter')));
	$( ".target" ).draggable(
		{
			containment: "body",
			drag: onDragTarget
		}
	);
});
function onDragTarget(e, ui)
{
	var hitter = $('.xy-hitter');
	var tbottom = hitter.offset().top + hitter.outerHeight();
	var ttop = hitter.offset().top;
	var tleft = hitter.offset().left;
	var tright = hitter.offset().left + hitter.outerWidth();
	var hbottom = ui.offset.top + ui.helper.outerHeight();
	var htop = ui.offset.top;
	var hleft = ui.offset.left;
	var hright = ui.offset.left + ui.helper.outerWidth();
	var hitCoords = {x: false, y: false};

	if(ttop <= hbottom && tbottom >= htop)
	{
		hitCoords.y = true;
	}
	if(tleft <= hright && tright >= hleft)
	{
		hitCoords.x = true;
	}
	log(ui.helper.hitTest({target: '.xy-hitter'}));
}
(function($) {
	$.fn.hitTest = function(options) {
		var defaults = {
			target: '',
			method: 'object',
			axis: '',
			hittingClass: 'tcg-hitting',
			returnType: 'jquery',
			/*
				possible values:
				'jquery': returns the given jQuery object itself (chainable)
				'boolean': returns true or false (NOT chainable)
			*/
			autoRemoveHittingClass: true,
			boundingBox: 'outer'
			/*
				possible values:
				'plain': the element without padding, border, margin
				'inner': the element including padding
				'outer': the element including padding and border
				'extended': the element including padding, border and margin
			*/
		};
		var settings = $.extend(true, {}, defaults, options);

		if($(settings.target).length == 0)
		{
			return false;
		}

		//return testInterception(this, settings.target);

		return this.each(function(index, el) {
			var hitCoords = testInterception(el, settings.target);
			var classes = [settings.hittingClass];
			if(settings.autoRemoveHittingClass)
			{
				var removeClasses = settings.hittingClass + ' ' + settings.hittingClass + '-x ' + settings.hittingClass + '-y';
				$(el).removeClass(removeClasses);
			}

			switch(settings.axis)
			{
				case 'x':
				{
					if(hitCoords.x == true)
					{
						classes.push(settings.hittingClass + '-x');
					}
					break;
				}
				case 'y':
				{
					if(hitCoords.y == true)
					{
						classes.push(settings.hittingClass + '-y');
					}
					break;
				}
				case 'xy':
				{
					if(hitCoords.x == true && hitCoords.y == true)
					{
						classes.push(settings.hittingClass + '-x');
						classes.push(settings.hittingClass + '-y');
					}
					break;
				}
				default:
				{
					if(hitCoords.x == true)
					{
						classes.push(settings.hittingClass + '-x');
					}
					if(hitCoords.y == true)
					{
						classes.push(settings.hittingClass + '-y');
					}
					break;
				}
			}
			$(el).addClass(classes.join(' '))
			return('Hitting on these axis: X = ' + hitCoords.x + ' | Y = ' + hitCoords.y);
    	});
		function testInterception(ob1, ob2)
		{
			var hitter = $(ob1);
			var tbottom = hitter.offset().top + hitter.outerHeight();
			var ttop = hitter.offset().top;
			var tleft = hitter.offset().left;
			var tright = hitter.offset().left + hitter.outerWidth();

			var target = $(ob2);
			var hbottom = target.offset().top + target.outerHeight();
			var htop = target.offset().top;
			var hleft = target.offset().left;
			var hright = target.offset().left + target.outerWidth();
			var hitCoords = {x: false, y: false};

			if(ttop <= hbottom && tbottom >= htop)
			{
				hitCoords.y = true;
			}
			if(tleft <= hright && tright >= hleft)
			{
				hitCoords.x = true;
			}
			return hitCoords;
		}

	};
})(jQuery);
