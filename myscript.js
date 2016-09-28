
(function(win){
	//主程序入口
	var main = {

		init : function(){
			ad.init();
			this.initPopupDom();
			this.events();
		},
		events : function(){
			
			var senList = document.querySelectorAll('.sentence');
			var len = senList.length;
			var key = null;
			var self = this;
			this.lastTarget = null; //记录上次点击的节点
			//点击文章内容时
			for(var i = 0; i < len; i++){

				senList[i].addEventListener('click',function(ev){
					ev.stopPropagation();
					var target = ev.target;

					if( target.tagName.toLowerCase() === "span" ){

						if( tool.hasClass(target,'active') ){
							return;
						}
						tool.addClass(target,'active');

						if( self.lastTarget ){
							tool.removeClass(self.lastTarget,'active');
						}

						self.lastTarget = target;

						key = target.innerHTML.replace(/\.|\"|\,/g,'');
						
						self.getData(key,function(){
							popLayer.computePosition(ev);
						});

					}else{
						popLayer.hide();

						if( self.lastTarget ){
							tool.removeClass(self.lastTarget,'active');
							self.lastTarget = null;
						}
				
					}

				});

			}
			//双击获取标题关键词
			document.ondblclick = function(ev){

				var key = tool.getSelect();
				self.getData(key,function(){
					popLayer.computePosition(ev);
				});
			}

			document.addEventListener('click',function(ev){
				popLayer.hide();
				
				if( self.lastTarget ){
					tool.removeClass(self.lastTarget,'active');
					self.lastTarget = null;
				}
				

			});

		},
		getData : function(key,cb){
			tool.ajax({
				url:'https://www.shanbay.com/api/v1/bdc/search/',
				data:{
					word:key,
					_:(new Date()).getTime()
					
				},
				cb:function(data){
					var json = JSON.parse(data);
					if(json.msg == "SUCCESS"){
						popLayer.changeContent(json.data);
						cb ? cb() :"";
					}else{
						popLayer.noContent(key,json.msg);
						cb ? cb() :"";
					}

				}
			});
		},
		initPopupDom : function(){ //初始化弹层

			var str = "";
			var objPopup=document.createElement('div');
			var oHeader = document.getElementsByTagName('header')[0];
				objPopup.id="popup";
				objPopup.className="query-word";

			str+='<div id="query-content">\
					<div class="triangle triangle-left"></div>\
					<div class="triangle-outter triangle-left"></div>\
					<div class="triangle triangle-right"></div>\
					<div class="triangle-outter triangle-right"></div>\
			 			<div class="title">\
							<span id="queryWord" class="word"></span>\
							<span id="querypPronunciation" class="pronunciation"></span>\
							<a id="querypSpeak" class="speaker">\
					         	<i class="iconfont icon"></i>\
					      	</a>\
						</div>\
					    <div class="definition">\
					       	<span id="queryDef"></span>\
					    </div>\
					    <audio id="player" src="" name="media">\
					    </audio>\
					</div>';
			objPopup.innerHTML = str;
			document.body.insertBefore(objPopup,oHeader);
			popLayer.init();

		},
		loadingAnimate : function(){
			var oDiv = document.createElement('div');
			oDiv.className="spinner-wrap";
			var str = '<div class="spinner">\
							  	<div class="double-bounce1"></div>\
							  	<div class="double-bounce2"></div>\
							  	<span class="text">加载中~~</span>\
							</div>';
							
			oDiv.innerHTML = str;
			document.body.appendChild(oDiv);
		}
	}
	
	domReady(function(){
		main.init();
		main.loadingAnimate()

	});

	window.onload = function(){

		var spinner = document.getElementsByClassName('spinner-wrap')[0];
		spinner.style.display = 'none';
	}


	 
  
		
})(window)

