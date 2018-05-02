//将页面数据存入一个json数据
//引入模块
const http = require('http');
const cheerio = require('cheerio');
const zlib = require('zlib');
const opt = {
        hostname: 'www.kugou.com',
        path: '/yy/html/rank.html',
        headers: {
            'accept-encoding': 'gzip'
        }
    }
    //发起请求
http.request(opt, res => {
    //监听接收的数据，获取响应到的数据
    let arr = []; //定义空数组存放接收到的数据
    let json = {}; //定义空对象存放获取到的json数据
    res.on('data', chunk => {
        arr.push(chunk);
    });
    //监听结束
    res.on('end', () => {
        //拼接buffer数据?????（原因？）
        const buf = Buffer.concat(arr);
        //因为请求的是压缩格式的文件，所以要将文件解压输出，buf:需要解压的数据； decoded:解压后的数据
        //cheerio.load:用来操作DOM元素
        zlib.gunzip(buf, function(err, decoded) {
            //获取榜单页面的数据
            const da = decoded.toString();
            const $ = cheerio.load(da);
            // 遍历榜单列表，获取每个列表中的文本内容
            $('.pc_temp_songlist > ul >li>a').each(function() {
                //把每一个节点的名称和连接地址以键值对的方式追加到json这个空对象里
                json[$(this).text()] = $(this).attr('href');
            });

        });



    });
    // res.pipe(ws);
}).end();