(function(win){

	var article = {
		init : function(){
			this.getArticle("article");
			this.handlePara();
			this.initPages();

		},
		
		getArticle : function(id){//获取文章部分
			var oArticle = document.getElementById(id);
			
			var content = oArticle.innerHTML;
			document.body.innerHTML = content;

			this.handleImg();
			this.removeAd();

		},
		removeAd:function(){//剔除文章中的广告

			var adClass=["content__labels","content__secondary-column","content__meta-container",
			"element--thumbnail","submeta","ad_unit","caption--main","gallery-lightbox","inline-expand-image","ad-slot"]
			

    		adClass.forEach(function(item,index) {
    	
    			var obj = document.getElementsByClassName(item);

    			for(var i = 0;i<obj.length; i++){

    				if(obj[i]){
	    				obj[i].parentNode.removeChild(obj[i]);
	    			}

    			}


			});

			
		},
		handlePara : function(){//处理文章段落,去除a标签
			var self = this;
			var articleBody = document.getElementsByClassName('content__article-body')[0];
			var re=/<a[^>]*href=['"]([^"]*)['"][^>]*>(.*?)<\/a>/g;

			var pList = articleBody.getElementsByTagName('p');
			var liList = articleBody.getElementsByTagName('li');

			for(var i = 0; i<pList.length; i++){

				var str = pList[i].innerHTML;
				var result = re.exec(str);

				if( result ){

					str = str.replace(re,result[2]);
					
				}
				pList[i].className = "sentence";
				pList[i].innerHTML = self.addSpan(str);

			}

			for(var i = 0; i<liList.length; i++){

				var str = liList[i].innerHTML;
				var result = re.exec(str);

				if( result ){

					str = str.replace(re,result[2]);
					
				}
				liList[i].className = "sentence";
				liList[i].innerHTML = self.addSpan(str);


			}
		},
		addSpan : function(str){ //加上span标签

			var arr = str.split(" ");
			var len = arr.length;
			
			
			for(var i = 0; i < len;i++){

				arr[i] = "<span data-index='"+i+"'>"+arr[i]+"</span>";

			}
			return arr.join(" ");
		},
		initPages : function(obj){ //分页
			this.pgindex=1; 
			var self = this;
			var contentHeight = window.innerHeight;  //获取窗口高度
			var pageContent = document.body.clientHeight;         //获取内容高度
			var pageObj = document.createElement('div'); //放置分页的容器
			var allpages = Math.ceil(parseInt(pageContent)/parseInt(contentHeight));//获取页面数量

			pageObj.id = "pageObj";

			this.appendPage(-1,pageObj);
			this.appendPage(1,pageObj);
		    
		 	document.body.appendChild(pageObj);
		},
		appendPage : function(num,pageObj){
			var self = this;
			var map ={
				"-1":'上一页',
				"1":'下一页'
			}
			var obj = document.createElement('a');
		    obj.href = "#"+num;
		    obj.innerHTML =map[num];
		   
		    obj.addEventListener('click',function(){
		    	self.gotopage(num);
		    });

		  	pageObj.appendChild(obj);
		},
		showPage : function(pageINdex){
			document.body.scrollTop=(pageINdex-1)*parseInt(window.innerHeight);                                                                  //根据高度，输出指定的页
			this.pgindex=pageINdex;
		},
		gotopage : function(value){
			 value=="-1"? this.showPage(this.pgindex-1) : this.showPage(this.pgindex+1);
		},
		handleImg : function(){//处理图片的一些小细节
			var obj = document.getElementsByClassName('js-gallerythumbs')[0];
			obj.className = '';
			obj.href = '';
			obj["data-is-ajax"] = '';
			obj["data-link-name"] = '';
		}
	}

	win.ad = article;
}(window))

    
    
    
    
    
    
    