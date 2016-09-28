(function(win){
	var dom = [];
      //用于判定页面是否加载完毕
      dom.isReady  = false;
      //用于添加要执行的函数
      dom.ready = function(fn){
        if ( dom.isReady ) {
          fn()
        } else {
          dom.push( fn );
        }
      }
      //执行所有在window.onload之前放入的函数
      dom.fireReady = function() {
        if ( !dom.isReady ) {
          if ( !document.body ) {
          		//加入队列中延迟执行
            return setTimeout( dom.fireReady, 16 );
          }
          dom.isReady = 1;
          if ( dom.length ) {
            for(var i = 0, fn;fn = dom[i];i++)
              fn()
          }
        }
      }

      //开始初始化domReady函数，判定页面的加载情况
      //捕获ready回调函数在浏览器事件发生之后被调用的情况
      if ( document.readyState === "complete" ||(document.readyState !== "loading" && !document.documentElement.doScroll) ) {
        
        dom.fireReady();

      }else if(-[1,] ){//判断浏览器
        document.addEventListener( "DOMContentLoaded", function() {
          document.removeEventListener( "DOMContentLoaded",  arguments.callee , false );
          dom.fireReady();
        }, false );
      }else {
        //当页面包含图片时，onreadystatechange事件会触发在window.onload之后，
        //换言之，它只能正确地执行于页面不包含二进制资源或非常少或者被缓存时
        document.attachEvent("onreadystatechange", function() {
          if ( document.readyState == "complete" ) {
            document.detachEvent("onreadystatechange", arguments.callee );
            dom.fireReady();
          }
        });
        (function(){
          if ( dom.isReady ) {
            return;
          }
          //doScroll存在于所有标签而不管其是否支持滚动条
          //这里如果用document.documentElement.doScroll()，我们需要判定其是否位于顶层document
          var node = new Image
          try {
            node.doScroll();
            node = null//防止IE内存泄漏
          } catch( e ) {
            //javascrpt最短时钟间隔为16ms，这里取其倍数
            //http://blog.csdn.net/aimingoo/archive/2006/12/21/1451556.aspx
            setTimeout( arguments.callee, 64 );
            return;
          }
          dom.fireReady();
        })();
      }
     window.domReady = dom.ready;

  })(window)
