bc.email2ManageFormr = {
	init : function(option,readonly) {
		var $form = $(this);
		var sendDate=$form.find(":input[name='e.sendDate']").val();
		var fromNow=moment(sendDate, "YYYY-MM-DD HH:mm:ss").fromNow()
		$form.find(".emailFormr-fromNow").text(fromNow);
	
	}
};