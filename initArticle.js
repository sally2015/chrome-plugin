(function(win){

	var article = {

		init : function(){
			this.getArticle("article");

		},
		changeWord : function(){

		},
		getArticle : function(id){//获取纯文章，剔除广告
			// var oArticle = document.getElementById(id);
			var oArticle = document.getElementsByClassName('content__article-body')[0];
			
			var content = oArticle.innerHTML;
			document.body.innerHTML = content;

		}
		
	}

	win.ad = article;
}(window))

    
    
    
    
    
    
    