//cheerio：http爬虫   扒网页用  基于jQuery封装的一个模块，可以使用jQ的语法。
//先下载后引入
const cheerio = require('cheerio');
const http = require('http');

//使用方法
const $ = cheerio.load('<h2>hello</h2>');
console.log($.html()); //获取$的整个html页面
console.log($('h2').text()); //获取h2标签的文本内容
$('h2').text('nodejs'); //设置h2标签的内容
console.log($.html());


const opt = {
        hostname: 'www.kugou.com',
    }
    //发起请求
http.request(opt, res => {
    //接收数据监听事件，获取响应到的数据
    let str = '';
    res.on('data', chunk => {
        str += chunk;
    });
    //监听结束
    res.on('end', () => {
        const $ = cheerio.load(str);
        //可以通过dom元素抓取到网页中指定部分的内容
        console.log($('.subNav').text());
    });

}).end();