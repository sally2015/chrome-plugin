# chrome-plugin

- 9.22查找扇贝api，了解如何在chrome用js定义插件，成功获取一个单词的api返回值
- domRead.js是在dom加载立即剔除文章，但是此时图片的资源为完全加载，这里用一个css3弹层提示用户，用户可以提前预览文章但暂不可以点击单词查询
- onload事件加载完毕之后，弹层消失，此时单击文章中单词可以查询单词，并且有发音
- 点击上一页下一页可以切换页码，查询框可以根据当前位置调整
- tool.js是封装一些方法，这里完全用原生js书写，initArticle.js是处理文章一些细节，popup.js是弹层的一些实现，myScript.js是文件的入口
- 测试文章链接：https://www.theguardian.com/politics/2015/may/28/david-cameron-sets-off-on-mission-to-win-over-european-leaders#1
