interface JQuery {
    addClass(className: string): JQuery;
    attr(attributeName: string, value: string | number): JQuery;
}
interface JQuery {
    selectpicker(options?: any, callback?: Function): any;
}

function doAjax(url: string, isAsync: boolean, queryStr: string | object, doFunction: any): void {
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

function doAjax2(url: string, isAsync: boolean, queryStr: any, doFunction: any): any {
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

function ViewChange(ClassName: string): void {
    var dom = document.getElementsByClassName(ClassName) as HTMLCollectionOf<HTMLElement>;
    if (dom.length > 0) {
        var change: string = dom[0].style.display;
        change = change == 'none' ? 'block' : 'none';

        for (var i = 0; i < dom.length; i++) {
            dom[i].style.display = change;
        }
    }
}

function ViewChange2(ClassName: string, DisplayMode: string): void {
    let dom = document.getElementsByClassName(ClassName) as HTMLCollectionOf<HTMLElement>;
    if (dom.length > 0) {
        for (let i = 0; i < dom.length; i++) {
            let change = dom[i].style.display;
            if (change != DisplayMode) {
                dom[i].style.display = DisplayMode;
            }
        }
    }
}

function CheckEscapeChar(input: string): string {
    if (input == null || input.length == 0) {
        return input;
    }
    input = input.replace(/--/g, '');
    input = input.replace(/'/g, '`');

    return input;
}

function HaveEscapeChar(input: string): boolean {
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

function ButtonClickSimulation(jQuerySelecter: string): void {//????????????
    $(jQuerySelecter)[0].click();
}

function MoneyFormat(num: string): string {//??????????????????????????????
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

function MillionFormat(num: string): string {//???????????????????????????
    if (isNaN(parseFloat(num))) {
        return num;
    }
    return formatFloat(parseFloat(num) / 1000000, 2).toString();
}

function GetDataUpLimit(input: string | number): number {//????????????????????????????????????????????????
    if (typeof input == 'string' && isNaN(parseFloat(input))) { return 0; }
    if (typeof input == 'string') { input = parseFloat(input); }
    var isNegative = false;
    if (input < 0) {
        isNegative = true;
        input = input * -1;
    }
    if (input == 0) { return 0; }
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
        let tmp: number = parseInt(tmpStr);
        var i = 2;
        var tRange = Math.pow(10, NumDig - i);
        UpLimitNum = Math.ceil(tmp / tRange) * tRange;
    }
    else if (NumDig > 2) {
        let tmp: string = tmpStr[0].toString();
        var ex = false;
        var i = 1;
        for (i = 1; i < NumDig; i++) {
            if (tmpStr[i] == '0' && i + 1 < NumDig && tmpStr[i + 1] == '0') {
                ex = true;
                tmp += tmpStr[i];
            }
            else { break; }
        }
        if (ex) {
            UpLimitNum = (parseInt(tmp) + 1) * Math.pow(10, NumDig - i);
        }
    }

    return isNegative ? UpLimitNum * -1 : UpLimitNum;
}

function GetNumberDigit(input: string | number): number {//??????????????????
    if (typeof input == 'string' && isNaN(parseFloat(input))) { return 0 }

    input = input.toString();
    var tLen = input.indexOf('.');
    if (tLen < 0) { tLen = input.length; }

    return tLen;
}

function gcd(m: number, n: number): number {//??????????????????
    var remainder = 0;
    do {
        remainder = m % n;
        m = n;
        n = remainder;
    } while (remainder !== 0);
    return m;
}

function formatFloat(num: number, pos: number): number {//4???5?????????????????????
    var size = Math.pow(10, pos);
    var re = Math.round(num * size) / size;
    var reStr = '';
    var tmpArr = re.toString().split('.');
    if (tmpArr.length > 1) { reStr = tmpArr[0] + '.' + paddingRight(tmpArr[1], pos); }
    else if (tmpArr.length == 1) {
        reStr = tmpArr[0] + '.';
        for (var i = 0; i < pos; i++) { reStr += '0'; }
    }
    return parseFloat(reStr);
}

function toType(obj: any): string {//?????????????????????
    var type = typeof (obj);
    if (type != 'object') { return type; }
    else if (obj == null) { return 'null'; }
    else if (Array.isArray(obj)) { return 'array'; }
    return '';
}//?????????????????????

function paddingRight(str: string, length: number): string {//????????????
    if (str.length >= length) { return str; }
    else { return paddingRight(str + '0', length); }
}//????????????

function paddingLeft(str: string, length: number): string {//????????????
    if (str.length >= length) { return str; }
    else { return paddingRight('0' + str, length); }
}//????????????

function CheckDecimalPoint(DataArr: string[] | { [key: string]: string }[]): string[] | { [key: string]: string }[] {//?????????????????????????????????????????????
    if (DataArr.length > 0 && typeof DataArr[0] == 'string') {
        for (var i = 0; i < DataArr.length; i++) {
            var tmpArr = (DataArr[i] as string).split(',');
            var nArr = new Array();
            for (var j = 0; j < tmpArr.length; j++) {
                tmpArr[j] = tmpArr[j].trim();
                tmpArr[j] = CheckDecimalPointFn(tmpArr[j], tmpArr[j].indexOf('%') > -1 ? 1 : 2);
                nArr.push(tmpArr[j]);
            }
            DataArr[i] = nArr.join(',');
        }
    }

    return DataArr;
}

function CheckDecimalPointFn(Num: string | number, nCount: number): string {
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
        for (let i = NumStr.split('.')[1].length; i < nCount; i++) {
            NumStr += '0';
        }
    }

    if (isPerson) {
        NumStr += '%';
    }

    return NumStr;
}

function ch2Unicdoe(str: string): string {
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

function unicode2Ch(str: string): string {
    if (str == null || str == '') {
        return '';
    }
    // ??????????????????
    var len = 1;
    var result = '';
    // ???????????????????????????????????????i=i+len ???
    for (var i = 0; i < str.length; i = i + len) {
        len = 1;
        var temp = str.charAt(i);
        if (temp == '\\') {
            // ???????????? \u ???????????????
            if (str.charAt(i + 1) == 'u') {
                // ?????????i+2??????(??????)??? ????????????
                var unicode = str.substr((i + 2), 4);
                // ???16?????????????????????unicode?????????????????????10??????????????????
                var a = parseInt(unicode, 16).toString(10);
                result += String.fromCharCode(parseInt(parseInt(unicode, 16).toString(10)));
                // ????????????unicode?????????5???????????? ?????????5?????????
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

function HtmlCharMap(str: string): string {
    str = str.replace(/%20/g, ' ');
    return str;
}

function htmlDecode(input: string): string {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent?.toString() || input;
}

function DropFileUpload(input: any): void {//????????????
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            if (e.target != null && e.target.result != null) {
                $('.file-upload-image').attr('src', e.target.result?.toString());
            }
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
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

function GetColorArr(N: number, R: number, G: number, B: number) {//????????????????????????????????????????????????N?????????(??????????????????)
    var max = R;
    if (G > max) { max = G; }
    if (B > max) { max = B; }

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

function SelectRefresh(SelectId: string): void {//Refresh???????????????
    $('#' + SelectId).val(0);//??????????????????
    $('.selectpicker').selectpicker('refresh');
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function SampleNumParse(NumStr: string): string {
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

//???????????????????????????
//tFieldName: ????????????(??????Bar)
function GetSelectValue(tFieldName: string): string | Array<string> | number | undefined {
    for (var i = 0; ; i++) {
        var tmpNode = $('#field_' + i);
        if (tmpNode.html() == null) {
            break;
        }
        var tHtml = tmpNode.prev().html();
        if (tHtml == tFieldName) { return tmpNode.val(); }
    }

    return '';
}

function AlertClick(TitleStr: string, MsgStr: string) {
    let tDom = document.getElementById('mySmallModalLabel');
    if (tDom != null) { tDom.innerHTML = TitleStr; }
    tDom = document.getElementById('AlertText');
    if (tDom != null) { tDom.innerHTML = MsgStr; }
    if (document.getElementById('AlertBtn')) {
        ButtonClickSimulation('#AlertBtn');
    }
    else {
        alert(MsgStr);
    }
}

//???????????????????????????
function isLetters(str: string): boolean {
    var re = /^[A-Za-z]+$/;
    if (str.match(re) == null) {
        return false;
    }
    else {
        return true;
    }
}

function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}

function SetButtonDisable(IdName: string, Disable: boolean, InnerHtml?: string) {
    let tDom: any = document.getElementById(IdName);
    if (tDom) {
        tDom.disabled = Disable;
        if (InnerHtml) {
            tDom.innerHTML = InnerHtml;
        }
    }
}