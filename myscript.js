function ajax(options){

	var data = options.data;
	var url = options.url;
	var cb = options.cb;
	var xhr = new XMLHttpRequest();

	xhr.open('get',url+'?'+params(data),true);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log(cb)
			cb(xhr.responseText);
		}
	}
	xhr.send(null)
	
}
ajax({
	url:'https://www.shanbay.com/api/v1/bdc/search/',
	data:{
		word:'speculation',
		_:(new Date()).getTime()
		
	},
	cb:function(data){
			console.log(data)
		}
});
function params(data){
		var arr=[];
		for(var attr in data){
			arr.push(attr+'='+data[attr]);
		}

		var str = arr.join('&');

		return str;

	}