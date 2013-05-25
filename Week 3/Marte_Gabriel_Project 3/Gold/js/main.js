var storeBlackBeltForm = function(data){
	
}
		
$('#addItem').ready(function(){

		var addForm = $('#addBlackbeltForm'),
			bbformerrors = $('#bbformerrors')
		;
		    addForm.validate({
		    invalidHandler: function(form, validator) {
		    	bbformerrors.click();
		    	for (var key in validator.submitted){
			    	var labelTag = $('label[for^="'+ key +'"]')
			    	var legendtag = labelTag.closest('fieldset').find('.ui-controlgroup-label');
			    	var fieldTag = legendTag.length ? legend.text() : labelTag.text();
			    	html += '<li>' + fieldTag + '</li>';
		    	};
		    	$("#blackbeltformerrors ul").html(html);
			},
			submitHandler: function() {
		var data = addForm.serializeArray();
			storeBlackBeltForm(data);	
			}
})});

		    
		
	
	//any other code needed for addItem page goes here

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){
 
};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};






















