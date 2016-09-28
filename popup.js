(function(win){
	var doc = document;
	var popup = {

		init : function(){
			//初始化各对象
			this.objPopup =  document.getElementById('popup');
			this.queryWord = document.getElementById('queryWord');
			this.querypPronunciation = document.getElementById('querypPronunciation');
			this.querypSpeak = document.getElementById('querypSpeak');
			this.queryDef = document.getElementById('queryDef');
			this.player = document.getElementById('player');
			this.playerSource = document.getElementById('playerSource');

			//计算当前屏幕大小
			this.winWidth =  document.body.clientWidth;
			this.winHeight =  document.body.clientHeight;
			this.halfWidth = this.winWidth/2;
			this.halfHeight =  this.winHeight/2;
			this.initEvents();

		},
		initEvents : function(){
			var self = this;

			this.querypSpeak.addEventListener('click',function(ev){

				ev.stopPropagation();
				self.player.play();

			});
				

		},
		show : function(obj){
			tool.removeClass(obj,'hide');
			tool.addClass(obj,'show');
		},
		hide :function(){
			tool.addClass(this.objPopup,'hide');
			tool.removeClass(this.objPopup,'show');
		},
		changeContent : function(options){
				
			this.queryWord.innerHTML = options.content;
			this.querypPronunciation.innerHTML = '/'+options.pronunciations.uk+'/';
			this.queryDef.innerHTML = options.definition;
			this.player.src = options.audio_addresses.uk[0];

		},
		//未找到单词
		noContent : function(key,msg){
			this.queryWord.innerHTML = key;
			this.querypPronunciation.innerHTML = '';
			this.queryDef.innerHTML = msg;
		},
		computePosition : function(ev,target){
			this.show( this.objPopup );

			if( this.isLeftRight(ev.clientX) ){//计算在屏幕的左半边还是右半边

				this.objPopup.style.left =  ev.clientX+"px";
				
			}else{

				this.objPopup.style.left = ( ev.clientX-tool.getStyle(this.objPopup,'width')-60 )+"px";
				
			}
			if( this.isLeftRight(ev.clientY) ){//计算在屏幕的上半边还是下半边

				this.objPopup.style.top = ( ev.clientY+this.getScrollTop()+20)+"px";
			
			}else{

				this.objPopup.style.top = ( ev.clientY+this.getScrollTop()-tool.getStyle(this.objPopup,'height')-60)+"px";
			
			}
			
			

		},
		getScrollTop : function(){
			return document.body.scrollTop || document.documentElement.scrollTop;
		},
		isLeftRight : function(x){ //判断在左在右
			if( x <= this.halfWidth){
				return true;
			}else{
				return false;
			}
		},
		isTopBottom : function(y){

			if( x <= this.halfHeight){
				return true;
			}else{
				return false;
			}
		}
	}

	win.popLayer = popup;
}(window))
