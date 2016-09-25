
(function(win){
	//主程序入口
	var main = {

		init : function(){
			ad.init();
			this.initPopupDom();
			this.events();
		},
		events : function(){
			
			document.ondblclick = function(){//双击获取关键词

				var keyWord = tool.getSelect();
				tool.ajax({
					url:'https://www.shanbay.com/api/v1/bdc/search/',
					data:{
						word:keyWord,
						_:(new Date()).getTime()
						
					},
					cb:function(data){
						var json = JSON.parse(data);
						if(json.msg == "SUCCESS"){
								console.log(2);
							popLayer.changeContent(json.data);
						}

					}
				});

			}

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
							<span id="queryWord" class="word">urge</span>\
							<span id="querypPronunciation" class="pronunciation">/ɜːrdʒ/</span>\
							<a id="querypSpeak" class="speaker">\
					         	<i class="iconfont icon"></i>\
					      	</a>\
						</div>\
					    <div class="definition">\
					       	<span id="queryDef">n. 冲动 vt. 驱策,鼓励,力陈,催促 vi. 极力主张</span>\
					    </div>\
					</div>';
			objPopup.innerHTML = str;
			document.body.insertBefore(objPopup,oHeader);
			popLayer.init();

		}
	}
	
domReady(function(){
		main.init();
	});
	 
  
		
})(window)

