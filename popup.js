(function(win){

	var popup = {

		init : function(){
			//初始化各对象
			this.objPopup =  document.getElementById('popup');
			this.queryWord = document.getElementById('queryWord');
			this.querypPronunciation = document.getElementById('querypPronunciation');
			this.querypSpeak = document.getElementById('querypSpeak');
			this.queryDef = document.getElementById('queryDef');
		},
		show : function(){
			
		},
		hide :function(){

		},
		changeContent : function(options){
				
			this.queryWord.innerHTML = options.content;
			this.querypPronunciation.innerHTML = '/'+options.pronunciations.uk+'/';
			this.queryDef.innerHTML = options.definition;

		}
	}

	win.popLayer = popup;
}(window))
