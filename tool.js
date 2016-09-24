var tool = {
	ajax : function(options){

		var data = options.data;
		var url = options.url;
		var cb = options.cb;
		var xhr = new XMLHttpRequest();

		xhr.open('get',url+'?'+this.params(data),true);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				console.log(cb)
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
        
    }
}