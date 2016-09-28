var tool = {
	ajax : function(options){

		var data = options.data;
		var url = options.url;
		var cb = options.cb;
		var xhr = new XMLHttpRequest();

		xhr.open('get',url+'?'+this.params(data),true);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				
				cb(xhr.responseText);
			}
		}
		xhr.send(null)
		
	},
	params : function(data){
		var arr=[];
		for(var attr in data){
			arr.push(attr+'='+data[attr]);
		}

		var str = arr.join('&');

		return str;

	},
	getSelect : function ()
    {
        if(window.getSelection)
        {
           return window.getSelection().toString();

        }
        else
        {
           return document.selection.createRange().text.toString();
        }
        
    },
    addClass:function(obj,name){//添加class,支持一次添加多个class
		
		var str = obj.className;
		var nameArr=name.split(' ');
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			if(!nameArr.length){
				break;
			}
			for(var j=0;j<nameArr.length;j++){
				
				if(nameArr[j]==arr[i]){
					nameArr.splice(j,1);
					j--;
				}
			}
		}
		if(nameArr.length){
			obj.className+=" "+nameArr.join(' ');	
		}
		
		
	},
	removeClass:function(obj,name){//删除class,支持一次删除多个class
		
		var str = obj.className;
		var arr=str.split(' ');
		var nameArr=name.split(' ');
		for(var i=0;i<arr.length;i++){
			if(!nameArr.length){
				break;
			}
			for(var j=0;j<nameArr.length;j++){
				
				if(nameArr[j]==arr[i]){
					arr.splice(i,1);
					nameArr.splice(j,1);
					j--;
				}
			}
		}
		obj.className=arr.join(' ')
		
	},
	hasClass:function(obj,name){//检测是否含有指定class
		var str = obj.className;
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			
			if(arr[i]==name){
				return true;
			}
		}
		return false;
	},
	toggleClass:function(obj,name){
		if(this.hasClass(obj,name)){
			this.removeClass(obj,name);
		}else{
			this.addClass(obj,name);
		}
	},
	getStyle:function(obj,attr){
		if(obj.currentStyle){
			return parseInt(obj.currentStyle[attr]);
		}else{
			return parseInt(getComputedStyle(obj,null)[attr]);
		}
		
	},
}