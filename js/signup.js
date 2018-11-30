window.onload = function() {
	 // add eventListener for tizenhwkey
   

	 setDefaultEvents();
	 /**
		* Handles the hardware key events.
		* @private
		* @param {Object} event - The object contains data of key event
		*/
		function keyEventHandler(event) {
			if (event.keyName === "back") {
					try {
							window.history.back();
					} catch (ignore) {
							tizen.application.getCurrentApplication().exit();

					}
			}
	}
	 /**
		* Sets default event listeners.
		* @private
		*/
	 function setDefaultEvents() {
			 document.addEventListener("tizenhwkey", keyEventHandler);
	 }

    
    $('.email').on("change keyup paste",
    		  function(){
    		    if($(this).val()){
    		      $('.icon-paper-plane').addClass("next");
    		    } else {
    		      $('.icon-paper-plane').removeClass("next");
    		    }
    		  }
    		);

    		$('.next-button').hover(
    		  function(){
    		    $(this).css('cursor', 'pointer');
    		  }
    		);

    		$('.next-button.email').click(
    		  function(){
    		    console.log("Something");
    		    $('.email-section').addClass("fold-up");
    		    $('.password-section').removeClass("folded");
    		  }
    		);

    		$('.password').on("change keyup paste",
    		  function(){
    		    if($(this).val()){
    		      $('.icon-lock').addClass("next");
    		    } else {
    		      $('.icon-lock').removeClass("next");
    		    }
    		  }
    		);

    		$('.next-button').hover(
    		  function(){
    		    $(this).css('cursor', 'pointer');
    		  }
    		);

    		$('.next-button.password').click(
    		  function(){
    		    console.log("Something");
    		    $('.password-section').addClass("fold-up");
    		    $('.repeat-password-section').removeClass("folded");
    		  }
    		);

    		$('.repeat-password').on("change keyup paste",
    		  function(){
    		    if($(this).val()){
    		      $('.icon-repeat-lock').addClass("next");
    		    } else {
    		      $('.icon-repeat-lock').removeClass("next");
    		    }
    		  }
    		);

    		$('.next-button.repeat-password').click(
    		  function(){
    		    console.log("Something");
    		    $('.repeat-password-section').addClass("fold-up");
    		    $('.success').css("marginTop", 0);
    		  }
    		);
    
}