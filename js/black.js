/**
 *@desc: 设置线路标题
 *@param: tabs 线路标题的数组，如tabs=['线路一','线路二','线路三']
 *@param: vari 自定义的全局变量名称，建议使用MY_URL，避免出现重复变量造成未知bug
 *@param: setUrl 切换插件的链接，一般默认使用断佬插件
 *@warning: 里面代码无需更改，只传递参数调用即可
 */
var setTabs = function([tabs, vari, setUrl]){
    d.push({
        title: '‘‘点下面切换线路’’',
        url:setUrl,
        col_type: 'text_center_1'
    });
    for (var i = 0; i < tabs.length; i++) {
        var url = "hiker://empty@lazyRule=.js:putVar('"+vari+"', '"+i+"');refreshPage();'toast://切换成功！'";
        d.push({
            title: tabs[i] + (getVar(vari, '0')==i?'❣️':''),
            url: url,
            col_type: tabs.length>2?'text_3':'text_2'
        });
    }
}

/**
 *@desc: 设置线路列表
 _dnPar 使用先导入断佬插件 ，play__data节点
 */
var setLists = (dataObj)=>{
    let hUrl = `@lazyRule=.js:let conf = getVar('shsort');if(conf==' - 正序'){putVar({key:'shsort', value:' - 逆序'});}else{putVar({key:'shsort', value:' - 正序'})};refreshPage(false);'toast://切换排序成功'`;
    //var lazy =  `@lazyRule=body&&.player_video&&script&&Html.js:eval(input.replace(/player_.*?={/,'player_aaaa={'));var url=player_aaaa.url;var jx='https://ssl.vip.cqzyw.net:11551/?url='+url;refreshX5WebView(jx);'toast://播放中';`;
    var {lists, _text , _url , index, _dnPar, lazy} = dataObj;
    var _text = _text || 'a&&Text';
    var _url = _url || 'a&&href';

    d.push({
        title: '‘‘选集’’',
        url: hUrl,
        col_type: 'text_center_1'
    });
    var list = lists[index];
    if (getVar('shsort') == ' - 逆序') {
        for (var j = list.length - 1; j >= 0; j--) {
            var jurl = parseDom(list[j], _url);
            d.push({
                title: parseDomForHtml(list[j],_text),
                url:_dnPar!=undefined?playParse.player_xx(jurl, _dnPar) : jurl+lazy,
                col_type: list.length >3?'text_3':'text_2'
            });
        }
    } else {
        for (var j = 0; j < list.length; j++) {
            var jurl = parseDom(list[j], _url);
            d.push({
                title: parseDomForHtml(list[j], _text),
                url: _dnPar!=undefined?playParse.player_xx(jurl, _dnPar) : jurl+lazy,
                col_type: list.length >3?'text_3':'text_2'
            });
        }
    }
}