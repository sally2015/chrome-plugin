(function(win){
	//主程序入口
	var main = {

		init : function(){
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
						
					}
				});

			}

		},
		initPopupDom : function(){ //初始化弹层

			var str = "";
			var objPopup=document.createElement('div');
				objPopup.id="popup";
				objPopup.className="query-word";

			str+='<div id="query-content">\
						<div class="title">\
							<span id="queryWord" class="word">urge</span>\
							<span id="querypPronunciation" class="pronunciation">/ɜːrdʒ/</span>\
							<a id="querypSpeak" class="speaker">\
					         	<i class="sf-icon-speaker"></i>\
					      	</a>\
						</div>\
					    <div class="definition">\
					       	<span id="queryDef">n. 冲动 vt. 驱策,鼓励,力陈,催促 vi. 极力主张</span>\
					    </div>\
					</div>';
			objPopup.innerHTML = str;
			document.body.appendChild(objPopup);

			//初始化各对象
			this.objPopup = objPopup;
			this.queryWord = document.getElementById('queryWord');
			this.querypPronunciation = document.getElementById('querypPronunciation');
			this.querypSpeak = document.getElementById('querypSpeak');
			this.queryDef = document.getElementById('queryDef');

		}
	}

	main.init();

})(window)





