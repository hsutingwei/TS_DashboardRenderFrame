"use strict";
function doAjax(url, isAsync, queryStr, doFunction) {
    $.ajax({
        type: "POST",
        url: url,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: isAsync,
        data: JSON.stringify(queryStr),
        success: function (response) {
            doFunction(response);
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        }
    });
}
function doAjax2(url, isAsync, queryStr, doFunction) {
    return $.ajax({
        type: "POST",
        url: url,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: isAsync,
        data: JSON.stringify(queryStr),
        success: function (response) {
            doFunction(response);
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        }
    });
}
function ViewChange(ClassName) {
    var dom = document.getElementsByClassName(ClassName);
    if (dom.length > 0) {
        var change = dom[0].style.display;
        change = change == 'none' ? 'block' : 'none';
        for (var i = 0; i < dom.length; i++) {
            dom[i].style.display = change;
        }
    }
}
function ViewChange2(ClassName, DisplayMode) {
    let dom = document.getElementsByClassName(ClassName);
    if (dom.length > 0) {
        for (let i = 0; i < dom.length; i++) {
            let change = dom[i].style.display;
            if (change != DisplayMode) {
                dom[i].style.display = DisplayMode;
            }
        }
    }
}
function CheckEscapeChar(input) {
    if (input == null || input.length == 0) {
        return input;
    }
    input = input.replace(/--/g, '');
    input = input.replace(/'/g, '`');
    return input;
}
function HaveEscapeChar(input) {
    if (input == null || input.length == 0) {
        return false;
    }
    var tmp = input.replace(/--/g, '');
    tmp = tmp.replace(/'/g, '`');
    if (tmp == input) {
        return false;
    }
    return true;
}
function ButtonClickSimulation(jQuerySelecter) {
    $(jQuerySelecter)[0].click();
}
function MoneyFormat(num) {
    num = num.trim();
    if (isNaN(parseFloat(num))) {
        return num;
    }
    var p = num.toString().split('.');
    var re = p[0].split('').reverse().reduce(function (acc, num, i, orig) {
        return num == '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
    }, '') + (p[1] != null ? '.' + p[1] : '');
    return parseFloat(num) < 0 && re[0] != '-' ? '-' + re : re;
}
function MillionFormat(num) {
    if (isNaN(parseFloat(num))) {
        return num;
    }
    return formatFloat(parseFloat(num) / 1000000, 2).toString();
}
function GetDataUpLimit(input) {
    if (typeof input == 'string' && isNaN(parseFloat(input))) {
        return 0;
    }
    if (typeof input == 'string') {
        input = parseFloat(input);
    }
    var isNegative = false;
    if (input < 0) {
        isNegative = true;
        input = input * -1;
    }
    if (input == 0) {
        return 0;
    }
    input = Math.ceil(input);
    var tmpStr = input.toString();
    var NumDig = GetNumberDigit(input);
    var tRange = Math.pow(10, NumDig - 1);
    var tNum = input / tRange;
    var UpLimitNum = Math.ceil(tNum);
    UpLimitNum = tRange * UpLimitNum;
    if (NumDig == 1) {
        //UpLimitNum = 10;
        UpLimitNum = input;
    }
    else if (NumDig > 2 && parseInt(tmpStr[1]) <= 5) {
        let tmp = parseInt(tmpStr);
        var i = 2;
        var tRange = Math.pow(10, NumDig - i);
        UpLimitNum = Math.ceil(tmp / tRange) * tRange;
    }
    else if (NumDig > 2) {
        let tmp = tmpStr[0].toString();
        var ex = false;
        var i = 1;
        for (i = 1; i < NumDig; i++) {
            if (tmpStr[i] == '0' && i + 1 < NumDig && tmpStr[i + 1] == '0') {
                ex = true;
                tmp += tmpStr[i];
            }
            else {
                break;
            }
        }
        if (ex) {
            UpLimitNum = (parseInt(tmp) + 1) * Math.pow(10, NumDig - i);
        }
    }
    return isNegative ? UpLimitNum * -1 : UpLimitNum;
}
function GetNumberDigit(input) {
    if (typeof input == 'string' && isNaN(parseFloat(input))) {
        return 0;
    }
    input = input.toString();
    var tLen = input.indexOf('.');
    if (tLen < 0) {
        tLen = input.length;
    }
    return tLen;
}
function gcd(m, n) {
    var remainder = 0;
    do {
        remainder = m % n;
        m = n;
        n = remainder;
    } while (remainder !== 0);
    return m;
}
function formatFloat(num, pos) {
    var size = Math.pow(10, pos);
    var re = Math.round(num * size) / size;
    var reStr = '';
    var tmpArr = re.toString().split('.');
    if (tmpArr.length > 1) {
        reStr = tmpArr[0] + '.' + paddingRight(tmpArr[1], pos);
    }
    else if (tmpArr.length == 1) {
        reStr = tmpArr[0] + '.';
        for (var i = 0; i < pos; i++) {
            reStr += '0';
        }
    }
    return parseFloat(reStr);
}
function toType(obj) {
    var type = typeof (obj);
    if (type != 'object') {
        return type;
    }
    else if (obj == null) {
        return 'null';
    }
    else if (Array.isArray(obj)) {
        return 'array';
    }
    return '';
} //取得物件的型別
function paddingRight(str, length) {
    if (str.length >= length) {
        return str;
    }
    else {
        return paddingRight(str + '0', length);
    }
} //右邊補零
function paddingLeft(str, length) {
    if (str.length >= length) {
        return str;
    }
    else {
        return paddingRight('0' + str, length);
    }
} //左邊補零
function CheckDecimalPoint(DataArr) {
    for (var i = 0; i < DataArr.length; i++) {
        var tmpArr = DataArr[i].split(',');
        var nArr = new Array();
        for (var j = 0; j < tmpArr.length; j++) {
            tmpArr[j] = tmpArr[j].trim();
            tmpArr[j] = CheckDecimalPointFn(tmpArr[j], tmpArr[j].indexOf('%') > -1 ? 1 : 2);
            nArr.push(tmpArr[j]);
        }
        DataArr[i] = nArr.join(',');
    }
    return DataArr;
}
function CheckDecimalPointFn(Num, nCount) {
    var NumStr = Num.toString();
    var isPerson = NumStr.indexOf('%') > -1 ? true : false;
    var HavePoint = true;
    NumStr = NumStr.replace('%', '');
    if (isNaN(parseFloat(NumStr))) {
        return Num.toString();
    }
    if (NumStr.indexOf('.') < 0) {
        HavePoint = false;
    }
    if (!HavePoint) {
        NumStr += '.';
        for (var i = 0; i < nCount; i++) {
            NumStr += '0';
        }
    }
    else {
        var tmpStr = NumStr.substring(NumStr.indexOf('.') + 1);
        for (let i = NumStr.length; i < nCount; i++) {
            NumStr += '0';
        }
    }
    if (isPerson) {
        NumStr += '%';
    }
    return NumStr;
}
function ch2Unicdoe(str) {
    if (str == null) {
        return '';
    }
    var unicode = '';
    for (var i = 0; i < str.length; i++) {
        var temp = str.charAt(i);
        if (isChinese(temp)) {
            unicode += '\\u' + temp.charCodeAt(0).toString(16);
        }
        else {
            unicode += temp;
        }
    }
    return unicode;
}
function unicode2Ch(str) {
    if (str == null || str == '') {
        return '';
    }
    // 控制迴圈躍遷
    var len = 1;
    var result = '';
    // 注意，這裡迴圈變數的變化是i=i+len 了
    for (var i = 0; i < str.length; i = i + len) {
        len = 1;
        var temp = str.charAt(i);
        if (temp == '\\') {
            // 找到形如 \u 的字元序列
            if (str.charAt(i + 1) == 'u') {
                // 提取從i+2開始(包括)的 四個字元
                var unicode = str.substr((i + 2), 4);
                // 以16進製為基數解析unicode字串，得到一個10進位制的數字
                var a = parseInt(unicode, 16).toString(10);
                result += String.fromCharCode(parseInt(parseInt(unicode, 16).toString(10)));
                // 提取這個unicode經過了5個字元， 去掉這5次迴圈
                len = 6;
            }
            else {
                result += temp;
            }
        }
        else {
            result += temp;
        }
    }
    return HtmlCharMap(result);
}
function HtmlCharMap(str) {
    str = str.replace(/%20/g, ' ');
    return str;
}
function htmlDecode(input) {
    var _a;
    var doc = new DOMParser().parseFromString(input, "text/html");
    return ((_a = doc.documentElement.textContent) === null || _a === void 0 ? void 0 : _a.toString()) || input;
}
function DropFileUpload(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            $('.image-upload-wrap').hide();
            if (e.target != null && e.target.result != null) {
                $('.file-upload-image').attr('src', (_a = e.target.result) === null || _a === void 0 ? void 0 : _a.toString());
            }
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        removeUpload();
    }
}
function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});
function GetColorArr(N, R, G, B) {
    var max = R;
    if (G > max) {
        max = G;
    }
    if (B > max) {
        max = B;
    }
    var Multi = 255 / max;
    var Rank = Multi / N;
    var ColorArr = [];
    for (var i = 1; i <= N; i++) {
        var ColorObj = {
            R: R * (1 + i * Rank),
            G: G * (1 + i * Rank),
            B: B * (1 + i * Rank)
        };
        ColorArr.push(ColorObj);
    }
    return ColorArr;
}
function SelectRefresh(SelectId) {
    $('#' + SelectId).val(0); //預設第一個值
    $('.selectpicker').selectpicker('refresh');
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function SampleNumParse(NumStr) {
    var reg = /K/g;
    var tRegArr = NumStr.match(reg);
    var tmpNum = parseFloat(NumStr.replace(reg, '').replace(' ', ''));
    if (tRegArr == null) {
        return NumStr;
    }
    for (var i = 0; i < tRegArr.length; i++) {
        tmpNum = tmpNum * 1000;
    }
    return tmpNum.toString();
}
//取得某搜尋欄位的值
//tFieldName: 欄位名稱(搜尋Bar)
function GetSelectValue(tFieldName) {
    for (var i = 0;; i++) {
        var tmpNode = $('#field_' + i);
        if (tmpNode.html() == null) {
            break;
        }
        var tHtml = tmpNode.prev().html();
        if (tHtml == tFieldName) {
            return tmpNode.val();
        }
    }
    return '';
}
function AlertClick(TitleStr, MsgStr) {
    let tDom = document.getElementById('mySmallModalLabel');
    if (tDom != null) {
        tDom.innerHTML = TitleStr;
    }
    tDom = document.getElementById('AlertText');
    if (tDom != null) {
        tDom.innerHTML = MsgStr;
    }
    ButtonClickSimulation('#AlertBtn');
}
//檢查字串是否全英文
function isLetters(str) {
    var re = /^[A-Za-z]+$/;
    if (str.match(re) == null) {
        return false;
    }
    else {
        return true;
    }
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function SetButtonDisable(IdName, Disable, InnerHtml) {
    let tDom = document.getElementById(IdName);
    if (tDom) {
        tDom.disabled = Disable;
        if (InnerHtml) {
            tDom.innerHTML = InnerHtml;
        }
    }
}
