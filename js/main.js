window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
    
    $(document).on('click', '.below button', function(){
    	  var belowCard = $('.below'),
    	  aboveCard = $('.above'),
    	  parent = $('.form-collection');
    	  parent.addClass('animation-state-1');
    	  setTimeout(function(){
    	    belowCard.removeClass('below');
    	    aboveCard.removeClass('above');
    	    belowCard.addClass('above');
    	    aboveCard.addClass('below');
    	    setTimeout(function(){
    	      parent.addClass('animation-state-finish');
    	      parent.removeClass('animation-state-1');
    	      setTimeout(function(){
    	        aboveCard.addClass('turned');
    	        belowCard.removeClass('turned');
    	        parent.removeClass('animation-state-finish');
    	      }, 300)
    	    }, 10)
    	  }, 300);
    	});


    // Sample code
   /* var mainPage = document.querySelector('#main');

    mainPage.addEventListener("click", function() {
        var contentText = document.querySelector('#content-text');

        contentText.innerHTML = (contentText.innerHTML === "Basic") ? "Tizen" : "Basic";
    });
    */
    
    
};