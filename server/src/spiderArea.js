module.exports=(()=>{
  "user strict";
  let http = require('http'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    request = require('request');
    var iconv = require('iconv-lite');
  return {
    config:{
      newHouseUrl:'http://db.house.qq.com/dl/#LXNob3d0eXBlXzE='//爬取大连市新房的页面地址
    },
    start:function(){
      console.log(33);
      this.requestNewhouseUrl();
    },
    requestNewhouseUrl:function(){
      var url='http://db.house.qq.com/dl/#LXNob3d0eXBlXzE=';
      http.get(url, function(res){
          res.setEncoding('binary');
          var source = "";
          res.on('data', function(data) {
              source += data;
          });
          res.on('end', function() {
            var buf = new Buffer(source, 'binary');
            var str = iconv.decode(buf, 'GBK');
            let $ = cheerio.load(str);
            console.log($.html());
              //这里输出的内容就不会有乱码了
          }).on("error", function() {
              logger.error('获取数据出现错误');
          });
      });
    }
  }
})()
