module.exports=(()=>{
  "user strict";
  let http = require('http'),
      fs = require('fs'),
      cheerio = require('cheerio'),
      request = require('request'),
      iconv = require('iconv-lite'),
      validTT,
      Alidayu=require('alidayujs');
  return {
    //爬取某个商城是否有货，类似于秒杀,有货时发短信
    start:function(){
      const _this=this;
      validTT=setInterval(()=>{
        _this.requestNewhouseUrl();
      },30000000);
      this.sendMessage();
    },
    sendMessage:function(){
      //应用密匙 见：http://www.alidayu.com/help?spm=a3142.7802526.1.24.iEB4Yc&_t=1#create
      const config = {
        app_key: '23550171',
        secret: '600dab93b43a236aea8cd1093121df95'
      };
      let alidayu = new Alidayu(config);
      //参数 见：http://open.taobao.com/doc2/apiDetail.htm?apiId=25450
      const options = {
        sms_free_sign_name: '测试',
        sms_type:'normal',
        rec_num: '18610610050',  //多个手机号逗号隔开
        sms_template_code: 'SMS_31165022',
      };
      //发送短信
      alidayu.sms(options,function(err,result){
        if(err){
          console.log('ERROR'+err);
        }
        else{
          console.log(result);
        }
      });
    },
    requestNewhouseUrl:function(){
      let url='http://detail.koudaitong.com/show/goods?alias=3np8b922ih8d4&reft=1480388528368_1480389045149&spm=f45633573_fake18352360';
      http.get(url, function(res){
          res.setEncoding('binary');
          let source = "";
          res.on('data', function(data) {
              source += data;
          });
          res.on('end', function() {
            let buf = new Buffer(source, 'binary');
            let str = iconv.decode(buf, 'GBK');
            let $ = cheerio.load(str);
            //这里输出的内容就不会有乱码了
            let num=$('.goods-meta-name').next().eq(1).text().substring(0,1);
            if(num!=0){
              console.log('有货了');
            }
            else{
              console.log('没货');
            }
          }).on("error", function() {
            console.error('获取数据出现错误');
          });
      });
    }
  }
})()
