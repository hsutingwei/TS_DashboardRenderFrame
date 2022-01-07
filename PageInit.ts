import $, { event, uniqueSort } from 'jquery';
import 'bootstrap';
import * as set from './set.js';
//import { PPSearch, PPMake } from './PPI.js';
import 'datatables.net';
import * as echarts from 'echarts';
import 'bootstrap-datepicker';
import 'bootstrap-fileinput';

export var gPageObj: PageStatus = {
    PageNameArr: [],
    PageNameObj: {}
};
export var CheckArr: Array<string> = [];//存放這次搜尋的文本(用於檢查相似度)
export let NeedAjaxArr: string[] = [];//儲存那些頁面名稱需要紀錄Ajax執行狀態
var AddLineCount: number = -1;//用來記錄新增的筆數(負值是用來與Table的行數做區分)

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    let cr = new set.ColorRuleClass();
    cr.InitColorRule();

    let po = new PageOperation();
    let pm = new PageMake();
    let ps = new set.PageSet();
    let tPageName: string | undefined = document.getElementById('PageName')?.innerHTML;

    if (tPageName != undefined && tPageName != '' && gPageObj.PageNameObj[tPageName] == null) {
        ps.ResetMenuDocumentInnerHtml(tPageName);
        ps.SetMaintain(tPageName);
        gPageObj.PageNameArr.push(tPageName);
        let tFieldName: string | undefined = document.getElementById('FieldName')?.innerHTML;
        let tNecessaryStr: string | undefined = document.getElementById('Necessary')?.innerHTML;
        let tPageNumber: string | undefined = document.getElementById('DefaultPage')?.innerHTML;
        let tPInf: PageInf = new PageInf(tPageName, tFieldName?.split(','), tNecessaryStr?.split(','));
        if (tPageNumber != undefined && tPageNumber != '' && !isNaN(parseInt(tPageNumber))) {
            tPInf.PageNumber = parseInt(tPageNumber);
        }

        gPageObj.PageNameObj[tPageName] = tPInf;
        ps.SetChildPageName(tPageName);

        for (let i = 0; i < gPageObj.PageNameObj[tPageName].ChildName.length; i++) {
            cr.SetColorRuleFromFront(gPageObj.PageNameObj[tPageName].ChildName[i]);
        }
        
        po.InitListArr(tPageName);

        if (ps.isMainIndex(tPageName)) {
            (async function (tPageName: string) {
                const { PPSearch, PPMake } = await import("./PPI.js");
                NeedAjaxArr = gPageObj.PageNameObj[tPageName].ChildName
                if (set.PageSetObj.NoDefaultSearch.indexOf(tPageName) < 0) {
                    let pps = new PPSearch();
                    pps.PageSearch();
                }
            })(tPageName);
        }
        else {
            pm.InitSearchArea(tPageName);
            if (set.PageSetObj.NoDefaultSearch.indexOf(tPageName) < 0) {
                PageOperation.Search(tPageName);
            }
        }
    }

    $('#UpdateSubmit').on('click', (event: JQuery.Event) => {
        if (tPageName != null) {
            po.UpdateClick(tPageName);
        }
    });

    $('#BigAlertArea').on('shown.bs.modal', function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    })

    $('#RowDataArea').on('shown.bs.modal', function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    })
});

class FormInf {
    //TitleArr.length = NecessaryArr.length = ModifiableArr.length
    FormName: string;//表單名稱
    FieldArr: Array<string> = [];//欄位名稱
    TitleStrArr: Array<string> = [];//Table顯示的欄位名稱(多重欄位會降維一維陣列儲存)
    TitleCell: string[][] = [];//紀錄多重欄位(真實的欄位型態)
    NecessaryArr: Array<boolean> = [];//是否必填
    ModifiableArr: Array<boolean> = [];//可否修改

    constructor(tFormName: string, tFieldArr?: Array<string>, tNecessaryArr?: Array<boolean | number | string>, tModifiableArr?: Array<boolean | number | string>) {
        this.FormName = tFormName;
        if (tFieldArr != null) {
            this.FieldArr = tFieldArr;
        }
        if (tNecessaryArr != null) {
            for (let i = 0; i < tNecessaryArr.length; i++) {
                let tValue: any = false;
                if (typeof tNecessaryArr[i] === 'number') { tValue = tNecessaryArr[i] == 1 ? true : false }
                else if (typeof tNecessaryArr[i] === 'string') { tValue = tNecessaryArr[i] == '1' ? true : false }
                else { tValue = tNecessaryArr[i]; }
                this.NecessaryArr.push(tValue);
            }
        }
        if (tModifiableArr != null) {
            for (let i = 0; i < tModifiableArr.length; i++) {
                let tValue: any = false;
                if (typeof tModifiableArr[i] === 'number') { tValue = tModifiableArr[i] == 1 ? true : false }
                else if (typeof tModifiableArr[i] === 'string') { tValue = tModifiableArr[i] == '1' ? true : false }
                else { tValue = tModifiableArr[i]; }
                this.ModifiableArr.push(tValue);
            }
        }

        this.TitleStrArr = this.FieldArr;

        if (this.ModifiableArr.length == 0) {
            let ps = new set.PageSet();
            this.ModifiableArr = ps.InitModifiable(tFormName, this.TitleStrArr);
        }
    }
}

export class PageInf extends FormInf {
    //一個頁面對應一個Table
    PageName: string = this.FormName;//Page名稱
    PageNumber: number = -1;//目前取得第幾頁的資料，用於分頁搜尋。-1為全部結果
    APageCount: number = 10;//預設一頁10筆
    isWriteMode: boolean = false;//目前表格是否為編輯模式
    LastQuery: { [key: string]: any } = {};//上次的查詢條件
    ParentName: string = '';//父PageName
    ChildName: string[] = [];//子PageName
    BlockId: string = '';//此Form所在div id(區塊搜尋才會用到)
    SubBlockId: string[] = [];//此Form所含的子div id(區塊搜尋才會用到)
    AjaxStatus: any;//紀錄此頁面的Ajax請求的狀態(目前只實作於區塊搜尋)

    constructor(tPageName: string, tFieldArr?: Array<string>, tNecessaryArr?: Array<boolean | number | string>, tModifiableArr?: Array<boolean | number | string>) {
        super(tPageName, tFieldArr, tNecessaryArr, tModifiableArr);
        let ps = new set.PageSet();
        let tmpNumberArr = ps.DefineSearPageInf(tPageName);
        this.PageNumber = tmpNumberArr[0];
        this.APageCount = tmpNumberArr[1];
    }

    // 定義此PageName的Title
    SetTableTitle(data?: string[]) {
        let ps = new set.PageSet();
        if (set.PageSetObj.NeedResetFieldArr.indexOf(this.PageName) > -1) {
            let tmpObj = ps.ResetFieldArr(this.PageName, data);
            if (tmpObj.FieldArr.length > 0) {
                this.TitleStrArr = tmpObj.FieldArr;
                this.ModifiableArr = tmpObj.ModifiableArr;
                this.NecessaryArr = tmpObj.NecessaryArr;
            }
        }
    }
}

//此class定義搜尋模組，因搜尋其中的邏輯流程有些會有客製化設定，固定義於獨立的class，再由PageOperation繼承
class SearchOperation implements Search, ClickSearch {
    //重設搜尋Query的值(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
    //因此程式結構這樣寫，設定的部分統一寫在PageSet)
    //tPageName: 頁面名稱
    //sQuery: 搜尋Query
    public ResetSearchQuery(tPageName: string, sQuery: string[]): string[] {
        let ps = new set.PageSet();
        return ps.ResetSearchQuery(tPageName, sQuery);
    }

    //重設搜尋Query的值(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
    //因此程式結構這樣寫，設定的部分統一寫在PageSet)
    //tPageName: 頁面名稱
    //sQuery: 搜尋Query
    public SetFormTitleFromQuery(tPageName: string, Query?: string[], data?: string[][]): string {
        let ps = new set.PageSet();
        return ps.SetFormTitleFromQuery(tPageName, Query, data);
    }

    //修改搜尋結果(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
    //因此程式結構這樣寫，設定的部分統一寫在PageSet)
    //tPageName: 頁面名稱
    //data: 搜尋結果
    public EditSearchResult(tPageName: string, data: string[]): string[] {
        let ps = new set.PageSet();
        return ps.EditSearchResult(tPageName, data);
    }

    //cell欄位的點擊搜尋觸發的函式
    //tPageName: 頁面名稱
    //qyStr: 點擊搜尋的搜尋Query
    public static ClickSearch(tPageName: string, qyStr: string[]): void {
        if (gPageObj.PageNameObj[tPageName] == null) { return; }

        let sbtn: any = $('#SearchBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        let pt = new PageTool();
        let ps = new set.PageSet();
        let so = new SearchOperation();
        pt.LoadingMask('block');
        let tNumberPerAPage = gPageObj.PageNameObj[tPageName].APageCount;
        let tPageNumber = gPageObj.PageNameObj[tPageName].PageNumber;

        so.ResetSearchQuery(tPageName, qyStr);

        let Query = {
            PageName: tPageName,
            PageNumber: tPageNumber,
            NumberPerAPage: tNumberPerAPage,
            QueryArr: qyStr
        };

        gPageObj.PageNameObj[tPageName].LastQuery = Query;
        let tTitleStr = so.SetFormTitleFromQuery(tPageName, qyStr);
        document.getElementById('RowDataAreaTitle')!.innerHTML = tTitleStr;

        if (tPageNumber > -1) {
            let TableIdName = Query.PageName + 'Table';
            let AttributeStr = 'id="' + TableIdName + '" class="hover row-border stripe order-column table table-striped" style="width:100%"';
            let tTableHtml = '<table ' + AttributeStr + '></table>';
            let ColumnObj = [];
            gPageObj.PageNameObj[tPageName].SetTableTitle(Query.QueryArr);
            let tTableTitle: string[] = gPageObj.PageNameObj[tPageName].TitleStrArr;

            for (let i = 0; i < tTableTitle.length; i++) {
                ColumnObj.push({ 'data': tTableTitle[i], 'title': tTableTitle[i] });
            }

            let ExcelHtmlStr = '<button type="button" class="btn btn-primary" style="margin:3px;float:left" id="ExportBtn" onclick="PageOperation.ExportExcel(\'' + tPageName + '\')" data-loading-text="Downloading..."><i class="fa fa-download"></i>匯出</button>';
            document.getElementById('RowDataAreaText')!.innerHTML = ExcelHtmlStr + '<br>' + tTableHtml;
            let AllResultCount = 0;

            let tTableInf: any = {
                language: set.lang,  //提示資訊
                stripeClasses: ["odd", "even"],  //為奇偶行加上樣式，相容不支援CSS偽類的場合
                processing: true,  //隱藏載入提示,自行處理
                serverSide: true,  //啟用伺服器端分頁
                searching: false,  //禁用原生搜索
                orderMulti: false,
                scrollY: '65vh',
                scrollCollapse: true,
                scrollX: true,
                order: [],
                ordering: false,
                columnDefs: [{
                    "targets": 'nosort',  //列的樣式名
                    "orderable": false    //包含上樣式名‘nosort’的禁止排序
                }],
                lengthMenu: [[10, 30, 50], [10, 30, 50]],
                //bLengthChange: false,
                ajax: function (data: any, callback: any, settings: any) {
                    Query.PageNumber = (data.start / data.length) + 1;//當前頁碼
                    //gPageObj.PageNameObj[tPageName].PageNumber = Query.PageNumber;
                    /*param.start = data.start;//開始的記錄序號
                    param.page = (data.start / data.length) + 1;//當前頁碼
                    param.start = (Query.PageNumber - 1) * data.length;//開始的記錄序號*/
                    Query.NumberPerAPage = data.length;//頁面顯示記錄條數，在頁面顯示每頁顯示多少項的時候
                    //console.log(param);
                    //ajax請求數據
                    doAjax('Search', true, Query, function (result: string[]) {
                        let returnData: any = {};
                        if (Query.PageNumber == 1 && result.length > 0) {
                            let tArr = result[0].split(';');
                            AllResultCount = parseInt(tArr[0]);
                            result[0] = tArr[1];
                        }

                        so.EditSearchResult(tPageName, result);

                        returnData.draw = data.draw;
                        returnData.recordsTotal = AllResultCount;
                        returnData.recordsFiltered = AllResultCount;
                        let tmpObj = new Array();
                        for (let i = 0; i < result.length; i++) {
                            let tmpArr = result[i].split(',');
                            let tObj: { [ColumnName: string]: any } = {};
                            for (let j = 0; j < tmpArr.length; j++) {
                                tObj[tTableTitle[j]] = tmpArr[j];
                            }
                            tmpObj.push(tObj);
                        }
                        returnData.data = tmpObj;
                        //$('.selectpicker').selectpicker();
                        callback(returnData);

                        if (document.getElementById('RowDataArea')!.style.display != 'block') {
                            ButtonClickSimulation('#RowDataAreaBtn');
                        }
                        pt.LoadingMask('none');
                        //sbtn.button('reset');
                        SetButtonDisable('SearchBtn', false, '搜尋');
                    });
                },
                //列表表頭欄位
                columns: ColumnObj
            }
            let table = $('#' + TableIdName).DataTable(tTableInf);
            //此處需調用api()方法,否則返回的是JQuery對象而不是DataTables的API對象
        }
        else {
            doAjax('Search', true, Query, function (data: string[]) {
                document.getElementById('RowDataAreaText')!.innerHTML = '明細';

                //ps.FieldColor(data, tPageName);
                let pm = new PageMake();
                let TableIdName = Query.PageName + 'Table';
                let AttributeStr = 'id="' + TableIdName + '" class="hover row-border stripe order-column table table-striped" style="width:100%"';
                let tableHtml = pm.CreatReadWriteTable(tPageName, data, AttributeStr, []);
                document.getElementById('RowDataAreaText')!.innerHTML = tableHtml;

                let TableObj: any = {
                    language: set.lang,  //提示信息
                    lengthMenu: [[10, 30, 50], [10, 30, 50]],
                    scrollY: '65vh',
                    paging: true,
                    scrollX: true,
                    searching: true,
                    dom: 'Bfrtip',
                    buttons: [
                        'excel'
                    ]
                }
                let t2 = $('#' + TableIdName).DataTable(TableObj);

                $('.buttons-excel').addClass('btn btn-primary');

                ButtonClickSimulation('#RowDataAreaBtn');
                pt.LoadingMask('none');
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
            });
        }
    }

    public static Search(tPageName?: string, JumPage?: number): void {
        let sbtn: any = $('#SearchBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        let tmpPageName: string = tPageName == null ? (gPageObj.PageNameArr.length > 0 ? gPageObj.PageNameArr[0] : '') : tPageName;
        //預設搜尋第一個PageName
        if (tmpPageName == null) { return; }
        let ps = new set.PageSet();

        let domId = 'field_';

        //預設一頁10筆
        let tNumberPerAPage = gPageObj.PageNameObj[tmpPageName].PageNumber != -1 ? gPageObj.PageNameObj[tmpPageName].APageCount : -1;
        let PageNumber = gPageObj.PageNameObj[tmpPageName].PageNumber;
        let bu = GetSelectValue('BU') || '';
        if (typeof bu == 'object') {
            bu = bu.join('@');
        }
        //bu = '';

        interface tTSObj {
            [index: string]: any;
        }

        let Query: tTSObj = {
            PageName: tmpPageName,
            BU: bu,
            PageNumber: PageNumber,
            NumberPerAPage: tNumberPerAPage,
            QueryArr: []
        };
        let fQueryArr = [];

        for (let i = 0; document.getElementById(domId + i.toString()); i++) {
            let tmpDom = $('#' + domId + i.toString());
            let tmpNode = tmpDom.parent().find('label').html();
            let tmpValue: any = tmpDom.val();
            let display: string = tmpDom.parent().find('label').css('display').toString();
            if (display != 'none') {
                if (tmpValue == null || tmpValue == undefined) {
                    tmpValue = '';
                }
                else if (set.TableSetObj.DatePickerArr.indexOf(tmpNode) > -1) {
                    tmpValue = tmpDom.find('input').val();
                }
                else if (set.TableSetObj.CheckboxArr.indexOf(gPageObj.PageNameObj[tmpPageName].FieldArr[i]) > -1) {
                    tmpValue = tmpDom.is(':checked').toString();
                }
                else if (toType(tmpValue) == 'array') {
                    if (tmpValue[0] == '') { tmpValue = ''; }//多選若只要選到All，則直接All
                    else { tmpValue = tmpValue.join('@'); }
                }
                else { tmpValue = tmpValue.trim(); }
                if (tmpValue == null || tmpValue == undefined) { tmpValue = ''; }
                tmpValue = tmpValue.replace(/”/g, '"');
            }

            if (tmpValue.length > 0) {
                fQueryArr.push(tmpValue);
            }
            else {
                fQueryArr.push('');
            }
        }

        let TableObj: tTSObj = {};//顯現Table的屬性
        let HiddenTableObj: tTSObj = {};//隱藏Table的屬性
        let WidthArr = new Array();//欄位寬度
        if (set.PageSetObj.NeedExport.indexOf(tmpPageName) > -1) {
            HiddenTableObj = {
                language: set.lang,  //提示信息
                lengthMenu: [[10, 30, 50], [10, 30, 50]],
                scrollY: false,
                scrollX: true,
                scrollCollapse: true,
                searching: false,
                ordering: false,
                dom: 'Bfrtip',
                buttons: [
                    'excel'
                ]
            }
        }
        TableObj = {
            language: set.lang,  //提示信息
            lengthMenu: [[10, 30, 50], [10, 30, 50]],
            scrollY: false,
            scrollX: true,
            scrollCollapse: true,
            autoWidth: false
        }

        if (set.PageSetObj.noInSearchingPage.indexOf(tmpPageName) > -1) {
            TableObj.searching = false;
        }
        if (set.PageSetObj.noSortPage.indexOf(tmpPageName) > -1) {
            TableObj.ordering = false;
            HiddenTableObj.ordering = false;
        }
        if (set.PageSetObj.noPage.indexOf(tmpPageName) > -1) {
            TableObj.paging = false;
        }
        if (set.PageSetObj.NeedYScroll.indexOf(tmpPageName) > -1) {
            TableObj.scrollY = '60vh';
        }
        if (tmpPageName == 'Actual') {
            TableObj.columnDefs = [
                {
                    //设置第一列不参与搜索
                    "targets": [14, 15, 16],
                    "searchable": false
                }
            ];
        }

        if (!ps.CheckSearchQuery(tmpPageName, fQueryArr)) {
            return;
        }

        let cr = new set.ColorRuleClass();

        if (set.PageSetObj.NeedDataTableFreeze.indexOf(tmpPageName) > -1) {
            TableObj.fixedColumns = ps.GetDataTableFreezeValue(tmpPageName);
        }

        Query.QueryArr = fQueryArr;
        gPageObj.PageNameObj[tmpPageName].LastQuery = Query;
        cr.SetColorRuleFromFront(tmpPageName);
        if (PageNumber >= 1) {
            let ColumnObj = new Array();
            let TableIdName = tmpPageName + 'Table';
            let AttributeStr = 'id="' + TableIdName + '" class="hover row-border stripe order-column table table-striped" style="width:100%;white-space:nowrap;"';
            gPageObj.PageNameObj[tmpPageName].SetTableTitle();
            let tmpTitle = new Array();
            let titleInfArr = new Array();
            let pm = new PageMake();
            let FieldArr = gPageObj.PageNameObj[tmpPageName].TitleStrArr;
            for (let i = 0; i < FieldArr.length; i++) {
                ColumnObj.push({ data: FieldArr[i], title: FieldArr[i] });
            }
            tmpTitle = ps.MakeTableTitle(titleInfArr, tmpPageName);
            let ttt = '<table ' + AttributeStr + '></table>';
            let tDom = document.getElementById('TableArea');
            if (tDom != null) {
                tDom.innerHTML = ttt;
            }
            //let tmpTableTitleHtml = CreatTableTitle('thead', noDeletePage.indexOf(PageName) > -1 ? new Array() : ['功能'], tmpTitle);
            //document.getElementById(PageName + 'Table').innerHTML = tmpTableTitleHtml;

            let ShieldIdxArr = ps.NeedShieldField(tmpPageName);
            let AllResultCount = 0;
            TableObj.language = set.lang;
            TableObj.processing = true;
            TableObj.serverSide = true;
            TableObj.orderMulti = false;
            TableObj.ajax = function (data: any, callback: any, settings: any) {
                //封裝請求參數
                let param = {
                    limit: 1,
                    page: 1,
                    start: 1
                };
                Query.PageNumber = (data.start / data.length) + 1; //當前頁碼
                //gPageObj.PageNameObj[tPageName].PageNumber = Query.PageNumber;
                /*param.start = data.start;//開始的記錄序號
                param.page = (data.start / data.length) + 1;//當前頁碼
                param.start = (Query.PageNumber - 1) * data.length;//開始的記錄序號*/
                Query.NumberPerAPage = data.length; //頁面顯示記錄條數，在頁面顯示每頁顯示多少項的時候
                //console.log(param);
                //ajax請求數據
                doAjax('Search', true, Query, function (result: string[]) {
                    type tDataInf = {
                        draw: any,
                        recordsTotal: number,
                        recordsFiltered: number,
                        data: string[]
                    }
                    if (Query.PageNumber == 1 && result.length > 0) {
                        let tArr = result[0].split(';');
                        AllResultCount = parseInt(tArr[0]);
                        result[0] = tArr[1];
                    }
                    let returnData: tDataInf = {
                        draw: data.draw,
                        recordsTotal: AllResultCount,
                        recordsFiltered: AllResultCount,
                        data: []
                    }
                    let tmpObj = new Array();
                    for (let i = 0; i < result.length; i++) {
                        let tmpArr = result[i].split(',');
                        let tObj: { [key: string]: string } = {};
                        for (let j = 0; j < tmpArr.length; j++) {
                            tObj[FieldArr[j]] = tmpArr[j];
                        }
                        tmpObj.push(tObj);
                    }
                    returnData.data = tmpObj;
                    $('.selectpicker').selectpicker();
                    callback(returnData);
                    //sbtn.button('reset');
                    SetButtonDisable('SearchBtn', false, '搜尋');
                });
            };
            TableObj.columns = ColumnObj;
            TableObj.createdRow = function (row: any, data: any, index: number) {
                let LineArr: {
                    class: string,
                    id: string,
                    style: string,
                    onclick: string,
                    innHtml: {
                        aPart: string,
                        MenuPart: string,
                        bPart: string
                    }
                }[] = [];
                let op = new set.OnclickPage();
                let dc = new set.DynamicClass();
                let cr = new set.ColorRuleClass();
                let df = new set.DynamicFunction();
                let pm = new PageMake();
                let pt = new PageTool();
                let tmpArr: string[] = [];
                let KeyValueArr: string[] = [];
                let ValueIdArr: string[] = [];
                let tFieldNameArr: string[] = [];
                let tmpModifuableArr = ps.CheckFieldModifiable(tmpPageName, tmpArr);
                let isWriteMode = gPageObj.PageNameObj[tmpPageName].isWriteMode;
                for (let i = 0; $('td', row).eq(i).html() != null; i++) {
                    tmpArr.push($('td', row).eq(i).html());
                }

                for (let i = 0; i < tmpArr.length; i++) {
                    let ColorHtml = '';
                    let tdClick = '';
                    let tdClass = '';
                    let tdStyle = '';
                    let tdId = 'cell_' + index.toString() + '_' + i.toString();
                    let aPart: string = '';
                    let MenuPart: string = '';
                    let bPart: string = '';

                    if (!gPageObj.PageNameObj[tmpPageName].ModifiableArr[i] && op.FieldIsOnclick(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[0])) {
                        tdClick = op.GetOnclickHtml(tmpPageName, tmpPageName + '_LIST', gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[0], tmpArr);
                    }

                    ColorHtml = cr.CheckColorRule(i, i);

                    tdClass = (tdClick != '' ? 'ClickSearch' : '');
                    tdStyle = ColorHtml + (ShieldIdxArr.indexOf(i) > -1 ? 'display:none;' : '');
                    if (set.TableSetObj.SetRight.indexOf(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]) > -1) {
                        tdClass = (tdClick != '' ? 'ClickSearch' : '');
                        tdStyle += 'text-align:right !important;';
                    }
                    if (ps.NeedCheckSimilarity(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i])) { CheckArr.push(tmpArr[i]); }
                    let tmpSelectList = ps.GetListArr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false);
                    let tmpAttrStr = pm.MakeWidthAttributeStr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], '');
                    if (dc.NeedDynamicGetList(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false)) {
                        tmpAttrStr += ' onchange="' + dc.ReturnFunctionStr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false, tdId) + '"';
                        for (let key in dc.DynamicInfObj[tmpPageName].InfluenceToFieldNames?.[gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]]) {
                            let tKeyValue = tmpArr[i];
                            tKeyValue = df.ResetDynamicQuery(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], key, tKeyValue).toString();
                            KeyValueArr.push(tKeyValue);
                            ValueIdArr.push(key);
                            tFieldNameArr.push(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]);
                        }
                    }
                    if (set.TableSetObj.IgnoreZero.indexOf(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]) > -1 && tmpArr[i] == '0') {
                        tmpArr[i] = '';
                    }

                    let tmpReadHtml = '';
                    if (gPageObj.PageNameObj[tmpPageName].ModifiableArr[i] && tmpModifuableArr[i]) {
                        tmpReadHtml = 'read';
                    }

                    if (set.PageSetObj.NoChangePage.indexOf(tmpPageName) > -1 || ps.NoChangeField(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpPageName, tmpArr[i])) {
                        aPart += tmpArr[i];
                    }
                    else if (set.TableSetObj.NeedModifyDisplayArr.indexOf(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]) > -1) {
                        let tStr = '<span class="MoneyFormat ' + tmpReadHtml + '"' + (isWriteMode ? ' style="display:none"' : '') + '>' + ps.NeedModifyDisplay(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[i], tmpPageName, tmpArr[0]) + '</span><span class="RealNumber" style="display:none">' + tmpArr[i] + '</span>';
                        aPart += tStr;
                    }
                    else if (tmpSelectList != null && tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpPageName, tmpArr[i])) {
                        let tStr = '';
                        if (tmpReadHtml.length > 0) {
                            tStr = '<span class="' + tmpReadHtml + '"' + (isWriteMode ? ' style="display:none"' : '') + '>' + pt.GetListValue(tmpSelectList, tmpArr[i]) + '</span>';
                        }
                        else {
                            tStr = '<span>' + pt.GetListValue(tmpSelectList, tmpArr[i]) + '</span>';
                        }
                        aPart += tStr;
                    }
                    else if (tmpReadHtml.length > 0) {
                        let tStr = '<span class=" ' + tmpReadHtml + '"' + (isWriteMode ? ' style="display:none"' : '') + '>' + tmpArr[i] + '</span>';
                        aPart += tStr;
                    }
                    else {
                        aPart += tmpArr[i];
                    }
                    if (gPageObj.PageNameObj[tmpPageName].ModifiableArr[i] && tmpModifuableArr[i] && ShieldIdxArr.indexOf(i) < 0) {
                        let tClassName = 'write';
                        let tStr = '<span class="' + tClassName + '"' + (isWriteMode ? '' : ' style="display:none"') + '>';
                        if (set.TableSetObj.DatePickerArr.indexOf(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]) > -1) {
                            tStr += pm.MakeListHtml('Calendar', tmpAttrStr, tmpSelectList, tmpArr[i]);
                        }
                        else if (op.FieldIsOnclick(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[0])) {
                            let tClickFun = op.GetOnclickHtml(tmpPageName, tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[0], tmpArr, 'up' + tmpArr[0]);
                            tStr += '<input id="up' + tmpArr[0] + '" class="form-control" ' + tmpAttrStr + ' value="' + tmpArr[i] + '" readonly><button class="btn" onclick="' + tClickFun + '">上傳</button>';
                        }
                        else if (set.TableSetObj.TextAreaArr.indexOf(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]) > -1) {
                            tStr += '<textarea class="form-control" ' + tmpAttrStr + ' rows="' + (tmpArr[i].length < 20 ? 1 : (tmpArr[i].length < 35 ? 2 : 3)) + '">' + tmpArr[i] + '</textarea>';
                        }
                        else if (ps.NeedColorField(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i])) {
                            tStr += '<input class="form-control" type="color"' + tmpAttrStr + ' value="' + tmpArr[i] + '">';
                        }
                        else if (tmpSelectList.length == 0) {
                            tStr += '<input class="form-control" ' + tmpAttrStr + ' value="' + tmpArr[i] + '">';
                        }
                        else if (!ps.NoChangeField(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpPageName, tmpArr[i])) {
                            tmpAttrStr += ' id="' + tdId + '_menu"';
                            if (ps.IsMultiSelect(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false)) {
                                MenuPart = pm.MakeListHtml('Multi Select', tmpAttrStr, tmpSelectList, tmpArr[i]);
                            }
                            else {
                                MenuPart = pm.MakeListHtml('select', tmpAttrStr, tmpSelectList, tmpArr[i]);
                            }
                        }
                        aPart += tStr;
                        bPart += '</span>';
                    }
                    else if (tmpSelectList != null && tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpPageName, tmpArr[i])) {
                        aPart += '<input value="' + tmpArr[i] + '" style="display:none"/>';
                    }

                    LineArr.push(
                        {
                            class: tdClass,
                            id: tdId,
                            style: tdStyle,
                            onclick: tdClick,
                            innHtml: {
                                aPart: aPart,
                                MenuPart: MenuPart,
                                bPart: bPart
                            }
                        });
                }

                for (let i = 0; i < ValueIdArr.length; i++) {
                    let tmpSelectList = pm.FrontDynamicMenuRequest(tmpPageName, tFieldNameArr[i], ValueIdArr[i], false, KeyValueArr[i]);
                    let domId = ValueIdArr[i];
                    let tIdx = Number(domId.substring(domId.lastIndexOf('_') + 1));
                    let tAttrStr = pm.MakeWidthAttributeStr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[tIdx], '');
                    if (tmpSelectList != null && gPageObj.PageNameObj[tmpPageName].ModifiableArr[tIdx] && tmpModifuableArr[tIdx] && ShieldIdxArr.indexOf(tIdx) < 0 && LineArr[tIdx].innHtml.MenuPart != '') {
                        let tNewMenu = '';
                        if (ps.IsMultiSelect(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[tIdx], false)) {
                            tNewMenu = pm.MakeListHtml('Multi Select', tAttrStr, tmpSelectList, tmpArr[tIdx]);
                        }
                        else {
                            tNewMenu = pm.MakeListHtml('select', tAttrStr, tmpSelectList, tmpArr[tIdx]);
                        }
                        LineArr[tIdx].innHtml.MenuPart = tNewMenu;
                    }
                }

                for (let i = 0; i < tmpArr.length; i++) {
                    $('td', row).eq(i).attr('id', LineArr[i].id);
                    $('td', row).eq(i).attr('class', LineArr[i].class);
                    $('td', row).eq(i).attr('style', LineArr[i].style);
                    $('td', row).eq(i).attr('onclick', LineArr[i].onclick);
                    $('td', row).eq(i).html(LineArr[i].innHtml.aPart + LineArr[i].innHtml.MenuPart + LineArr[i].innHtml.bPart);
                }
            };
            TableObj.rowCallback = function (row: any, data: any) {
                if (gPageObj.PageNameObj[tmpPageName].isWriteMode) {
                    for (let i = 0; $('td:eq(' + i + ')', row).html(); i++) {
                        if ($('td:eq(' + i + ') select', row).html() != null) {
                            $('td:eq(' + i + ') select', row).selectpicker('render');//可搜尋下拉式初始化 
                        }
                        if ($('td:eq(' + i + ') .MoneyFormat', row).html() != null && ($('td:eq(' + i + ') .MoneyFormat', row).attr('class')?.indexOf('read') || -1) < 0) {
                            $('td:eq(' + i + ') .MoneyFormat', row).css('display', 'block');
                        }
                    }
                }
            };

            let table = $('#' + tmpPageName + 'Table').DataTable(TableObj);
            //此處需調用api()方法,否則返回的是JQuery對象而不是DataTables的API對象
        }
        else {
            doAjax('Search', true, Query, function (data: string[]) {
                /*for (let i = 0; i < data.length; i++) {
                    if (data[i].indexOf('Sub-Total') == 0) {
                        let ttt = data[i].split(',');
                        for (let j = 0; j < ttt.length; j++) {
                            if (ttt[j].indexOf('Sub-Total') == 0) {
                                ttt[j] = ttt[j].replace('(', '（');
                                ttt[j] = ttt[j].replace(')', '）');
                            }
                            else {
                                break;
                            }
                        }
                        data[i] = ttt.join(',');
                    }
                }*/
                let pm = new PageMake();
                let ps = new set.PageSet();
                let pt = new PageTool();
                gPageObj.PageNameObj[tmpPageName].SetTableTitle(data);
                let so = new SearchOperation();
                data = so.EditSearchResult(tmpPageName, data);
                if (set.PageSetObj.NeedCheckDecimalPoint.indexOf(tmpPageName) > -1) { data = CheckDecimalPoint(data); }
                if (set.PageSetObj.ChartPage.indexOf(tmpPageName) > -1) {
                    pm.MakeChart(tmpPageName, data);
                }

                let TableIdName = tmpPageName + 'Table';
                let AttributeStr = 'id="' + TableIdName + '" class="hover row-border stripe order-column table table-striped" style="width:100%;white-space:nowrap;"';
                let tmpTitle = new Array();
                //gPageObj.PageNameObj[tmpPageName].SetTableTitle(data.length > 0 ? data[0].split(',') : undefined);
                tmpTitle = ps.MakeTableTitle(data, tmpPageName);

                let TableHtml = pm.CreatReadWriteTable(tmpPageName, data, AttributeStr, tmpTitle);
                if (set.PageSetObj.noDataTable.indexOf(tmpPageName) > -1 && set.PageSetObj.NeedMillionInf.indexOf(tmpPageName) > -1) {
                    TableHtml = '<div class="toolbar"><span style="color:blue">(M.NT)</span></div>' + TableHtml;
                }

                let tDom = document.getElementById('TableArea');
                if (tDom != null) { tDom.innerHTML = TableHtml; }
                let HiddenTableIdName = tmpPageName + 'TableHidden';

                if (set.PageSetObj.NeedExport.indexOf(tmpPageName) > -1 && document.getElementById('HiddenTableArea')) {
                    let qy = ps.GetExportQuery(tmpPageName, data, tmpTitle);
                    let HiddenHtml = pt.CreatTable(qy, 'id="' + HiddenTableIdName + '" style="width:100%"');
                    let tDom = document.getElementById('HiddenTableArea');
                    if (tDom != null) { tDom.innerHTML = HiddenHtml }
                }

                let HaveMillion = false;
                let UnitMode = GetSelectValue('單位');
                for (let i = 0; i < gPageObj.PageNameObj[tmpPageName].TitleStrArr.length; i++) { if (set.TableSetObj.MillionFieldArr.indexOf(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]) > -1 && UnitMode != '數量') { HaveMillion = true; break; } }
                if (HaveMillion || set.PageSetObj.NeedMillionInf.indexOf(tmpPageName) > -1) { TableObj.dom = '<"toolbar">frtip'; }

                let t: any = $('#' + TableIdName);
                let t2: any = $('#' + HiddenTableIdName);
                if (set.PageSetObj.noDataTable.indexOf(tmpPageName) < 0 && document.getElementById(TableIdName)) {
                    t = t.DataTable(TableObj);
                }
                if (document.getElementById(HiddenTableIdName)) {
                    t2 = t2.DataTable(HiddenTableObj);
                }

                ps.FreezeField(tmpPageName);

                ps.MergeTableValue(tmpPageName);
                if (set.PageSetObj.noDataTable.indexOf(tmpPageName) < 0) { $('#' + TableIdName).DataTable().draw(); }

                if (JumPage != null) {
                    gPageObj.PageNameObj[tmpPageName].isWriteMode = false;
                    PageOperation.CheckReadWriteMode(false);
                    t.page(JumPage).draw('page');
                }

                $('#addRow').on('click', function () {//新增時觸發
                    let tmpArr: string[] = PageOperation.AddRowInitList(tmpPageName);
                    t.row.add(tmpArr).draw(false);
                    let tmpidName = tmpPageName + 'Table';
                    let tmpHtmlArr = $('#' + tmpidName + ' tbody tr');
                    let ShieldIdxArr = ps.NeedShieldField(tmpPageName);
                    for (let i = 0; tmpHtmlArr.eq(i).html(); i++) {
                        if (tmpHtmlArr.eq(i).find('td').eq(0).html() != '') {
                            continue;
                        }
                        for (let j = 0; j < ShieldIdxArr.length; j++) {
                            if (tmpHtmlArr.eq(i).find('td').eq(ShieldIdxArr[j]).css('display') != 'none') {
                                tmpHtmlArr.eq(i).find('td').eq(ShieldIdxArr[j]).css('display', 'none');
                            }
                        }
                    }

                    $('.selectpicker').selectpicker();//可搜尋下拉式初始化
                    let tDateDom = $('.form_date');
                    if (tDateDom != null) {
                        tDateDom.datetimepicker({
                            weekStart: 1,
                            todayBtn: true,
                            autoclose: true,
                            todayHighlight: true,
                            startView: 2,
                            minViewMode: 2,
                            forceParse: false,
                            format: 'yyyy/mm/dd'
                        } as DatepickerOptions);
                    }
                    t.draw();
                    t.page(0).draw('page');
                    ps.FreezeField(tmpPageName);
                });

                $('#' + TableIdName + ' tbody').on('click', 'tr td .DeleteFun', function () {//刪除時觸發
                    $(this).parent().parent('tr').css('display', 'none');
                });

                $('.sorting_asc').on('click', function () {//排序時觸發
                    ps.FreezeField(tmpPageName);
                });

                $('.sorting_desc').on('click', function () {//排序時觸發
                    ps.FreezeField(tmpPageName);
                });

                $('#' + TableIdName + '_info').bind('DOMNodeInserted', function (e) {//頁數改變時觸發
                    $('.selectpicker').selectpicker();
                    let tDateDom = $('.form_date');
                    if (tDateDom != null) {
                        tDateDom.datetimepicker({
                            weekStart: 1,
                            todayBtn: true,
                            autoclose: true,
                            todayHighlight: true,
                            startView: 2,
                            minViewMode: 2,
                            forceParse: false,
                            format: 'yyyy/mm/dd'
                        } as DatepickerOptions);
                    }
                    PageOperation.CheckReadWriteMode(false);

                    ps.FreezeField(tmpPageName);
                });
                if (HaveMillion || set.PageSetObj.NeedMillionInf.indexOf(tmpPageName) > -1) { $('div.toolbar').html('<span style="color:blue">(M.NT)</span>'); }

                let te = new set.TableExtend();
                te.SetExtendTable(tmpPageName, TableIdName);
                if (set.PageSetObj.noDataTable.indexOf(tmpPageName) < 0 && document.getElementById(TableIdName)) {
                    t.columns.adjust();
                }

                $('#' + TableIdName + ' tbody').on('click', 'td.details-control', function () {
                    let RowIdx = $('#' + TableIdName + '>tbody>tr[role="row"]').index($(this).parent('tr'));
                    let tr = $(this).closest('tr');
                    let row = t.row(tr);

                    if (row.child.isShown()) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        // Open this row
                        if (RowIdx > -1) {
                            row.child(te.TableExtendObj[tmpPageName][RowIdx].SubHtml).show();
                        }
                        $('#' + TableIdName + '>tbody>tr>td[colspan="' + gPageObj.PageNameObj[tmpPageName].TitleStrArr.length + '"]').css('padding', 0);
                        tr.addClass('shown');
                        let tRow = $('#' + TableIdName + '>tbody>tr td');
                        let tNewRow = $('#' + TableIdName + '>tbody>tr>td[colspan="' + gPageObj.PageNameObj[tmpPageName].TitleStrArr.length + '"] tr');
                        let tHeadRow = $('#' + TableIdName + '>thead>tr');
                        for (let i = 0; i < gPageObj.PageNameObj[tmpPageName].TitleStrArr.length; i++) {
                            for (let j = 0; tNewRow.eq(j).html(); j++) {
                                tNewRow.eq(j).find('td').eq(i).css('width', tRow.eq(i).css('width'));
                                tNewRow.eq(j).find('td').eq(i).css('padding-left', 8);
                                tNewRow.eq(j).find('td').eq(i).css('padding-right', 8);
                                //tNewRow.eq(j).find('td').eq(i).css('word-break', 'break-all');
                            }
                            for (let j = 0; tHeadRow.eq(j).html(); j++) {
                                tHeadRow.eq(j).find('th').eq(i).css('width', tRow.eq(i).css('width'));
                                tHeadRow.eq(j).find('th').eq(i).css('padding-left', 8);
                                tHeadRow.eq(j).find('th').eq(i).css('padding-right', 8);
                            }
                        }
                    }
                });

                $('.selectpicker').selectpicker('render');//可搜尋下拉式初始化 
                let tDateDom = $('.form_date');
                if (tDateDom != null) {
                    tDateDom.datetimepicker({
                        weekStart: 1,
                        todayBtn: true,
                        autoclose: true,
                        todayHighlight: true,
                        startView: 2,
                        minViewMode: 2,
                        forceParse: false,
                        format: 'yyyy/mm/dd'
                    } as DatepickerOptions);
                }
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
            });
        }
    }
}

export class TableAndSearchOperation extends SearchOperation implements TableOperation {
    //Update Submit
    //tPageName: 頁面名稱
    //isAsync: AJAX是否異步請求(預設true)
    public static UpdateSubmit(tPageName?: string, isAsync?: boolean): void {
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;

        if (gPageObj.PageNameObj[tmpPageName] != null) {
            SetButtonDisable('UpdateSubmit', true, 'loading...');
            if (isAsync == null) {
                isAsync = true;
            }
            let idName = tmpPageName + 'Table';
            let tmpArr = $('#' + idName + ' tbody tr');
            let UpdateArr: string[] = new Array();
            let InsertArr: string[] = new Array();
            let DeleteArr: string[] = new Array();
            let isUpdate = false;
            let isDelete = false;
            let AllEmpty = true;
            let haveError = false;
            let ModifiableArr = gPageObj.PageNameObj[tmpPageName].ModifiableArr;
            let NecessaryArr = gPageObj.PageNameObj[tmpPageName].NecessaryArr;

            for (let i = 0; tmpArr.eq(i).html(); i++) {
                let tmpQueryStr = '';
                let getId = '';
                for (let j = 0; j < ModifiableArr.length; j++) {
                    let getValue: any;
                    let tmpDom: any;
                    if (tmpArr.eq(i).find('td').eq(j).find('.selectpicker').val() != null) {//一定要加 != null的判斷，不可用本身布林值來判斷，因為0會回傳false
                        getValue = tmpArr.eq(i).find('td').eq(j).find('.selectpicker').val();
                        if (toType(getValue) == 'array') {
                            getValue = getValue.join('/');
                        }
                        tmpDom = tmpArr.eq(i).find('td').eq(j).find('.selectpicker');
                    }
                    else if (tmpArr.eq(i).find('td').eq(j).find('input').val() || tmpArr.eq(i).find('td').eq(j).find('input').val() == '') {
                        getValue = tmpArr.eq(i).find('td').eq(j).find('input').val();
                        tmpDom = tmpArr.eq(i).find('td').eq(j).find('input');
                        getValue = getValue.replace(/”/g, '"');
                    }
                    else if (tmpArr.eq(i).find('td').eq(j).find('.MoneyFormat').html() != null) {
                        getValue = tmpArr.eq(i).find('td').eq(j).find('.RealNumber').html();
                        tmpDom = tmpArr.eq(i).find('td').eq(j).find('.RealNumber');
                    }
                    else if (tmpArr.eq(i).find('td').eq(j).find('textarea').val() || tmpArr.eq(i).find('td').eq(j).find('textarea').val() == '') {
                        getValue = tmpArr.eq(i).find('td').eq(j).find('textarea').val();
                        tmpDom = tmpArr.eq(i).find('td').eq(j).find('textarea');
                    }
                    else {
                        getValue = tmpArr.eq(i).find('td').eq(j).html();
                        tmpDom = tmpArr.eq(i).find('td').eq(j);
                    }

                    getValue = getValue.replace(/,/g, '，');

                    if (tmpArr.eq(i).css('display') != 'none') {//新增、修改
                        if (getValue != '') {
                            AllEmpty = false;
                        }
                        if (j == 0 && getValue != '') {//此tr是否為更新的數據
                            isUpdate = true;
                        }
                    }
                    else {//刪除
                        if (j == 0 && getValue != '') {//此tr是否為刪除的數據
                            isDelete = true;
                            AllEmpty = false;
                            getId = getValue;
                            break;
                        }
                        else {//沒有唯一識別碼表示此tr是新增出來又刪除的，直接忽略它
                            continue;
                        }
                    }

                    if (getValue == '表中數據為空') { return; }

                    if (j > 0 && !isDelete) {
                        if (HaveEscapeChar(getValue)) {
                            tmpArr.eq(i).find('td').eq(j).removeClass('has-warning');//避免重複增加
                            tmpArr.eq(i).find('td').eq(j).addClass('has-warning');
                            tmpDom.attr('data-container', 'body');
                            tmpDom.attr('title', '值有誤').tooltip('show');
                            haveError = true;
                        }
                        else if (NecessaryArr[j] && getValue == '') {
                            tmpArr.eq(i).find('td').eq(j).removeClass('has-error');//避免重複增加
                            tmpArr.eq(i).find('td').eq(j).addClass('has-error');
                            tmpDom.attr('data-container', 'body');
                            tmpDom.attr('title', '必填').tooltip('show');
                            haveError = true;
                        }
                        else {
                            tmpArr.eq(i).find('td').eq(j).removeClass('has-error');
                            tmpArr.eq(i).find('td').eq(j).removeClass('has-warning');
                        }
                    }
                    tmpQueryStr += CheckEscapeChar(getValue) + ',';
                }

                if (AllEmpty) {
                    continue;
                }

                if (isDelete) {
                    DeleteArr.push(getId);
                }
                else if (isUpdate) {
                    UpdateArr.push(tmpQueryStr.substring(0, tmpQueryStr.length - 1));
                }
                else if (!AllEmpty) {
                    InsertArr.push(tmpQueryStr.substring(0, tmpQueryStr.length - 1));
                }

                isUpdate = false;
                isDelete = false;
                AllEmpty = true;
            }

            if (haveError) {//欄位值有誤
                return;
            }

            let bu = GetSelectValue('BU') || '';
            let ps = new set.PageSet();
            UpdateArr = ps.ResetUpdateQuery(tmpPageName, UpdateArr, 'u');
            InsertArr = ps.ResetUpdateQuery(tmpPageName, InsertArr, 'i');

            let Query = {
                'PageName': tmpPageName,
                'BU': bu,
                'DeleteArr': DeleteArr,
                'UpdateArr': UpdateArr,
                'InsertArr': InsertArr
            };

            doAjax('Update', isAsync, Query, function (data: Array<boolean>) {
                let TextStr = '';
                let isGood = true;
                if (InsertArr.length > 0) {
                    if (data[0]) {
                        TextStr += '新增成功<br/>';
                    }
                    else {
                        TextStr += '新增失敗<br/>';
                        isGood = false;
                    }
                }
                if (UpdateArr.length > 0) {
                    if (data[1]) {
                        TextStr += '修改成功<br/>';
                    }
                    else {
                        TextStr += '修改失敗<br/>';
                        isGood = false;
                    }
                }
                if (DeleteArr.length > 0) {
                    if (data[2]) {
                        TextStr += '刪除成功<br/>';
                    }
                    else {
                        TextStr += '刪除失敗<br/>';
                        isGood = false;
                    }
                }

                AlertClick('Attention', TextStr);
                if (isGood) {
                    let TableIdName = tmpPageName + 'Table';
                    let table = $('#' + TableIdName).DataTable();
                    let oriPage = table.page.info().page;
                    PageOperation.Search(tmpPageName, oriPage);
                }

                SetButtonDisable('UpdateSubmit', false, '確定修改');
            });
        }
    }

    //切換檢視/編輯模式。; 根據現在的編輯模式狀態切換檢視/編輯模式。
    //isClick: 是否為Button觸發
    public static CheckReadWriteMode(isClick: boolean, tPageName?: string): void {
        let tmpPageName: string = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;

        if (isClick) {//是否點擊切換模式按鈕
            ViewChange('read');
            ViewChange('write');

            let tDom = document.getElementsByClassName('write') as HTMLCollectionOf<HTMLElement>;
            let tmpStyle: string = '';
            if (tDom != null) {
                tmpStyle = tDom[0].style.display;
            }
            if (tmpStyle == 'none') { gPageObj.PageNameObj[tmpPageName].isWriteMode = false; }
            else { gPageObj.PageNameObj[tmpPageName].isWriteMode = true; }

            let ps = new set.PageSet();
            let TableIdName = tmpPageName + 'Table';
            let t = $('#' + TableIdName).DataTable();
            let oriPage = t.page.info().page;
            t.draw();
            t.page(oriPage).draw('page');

            ps.FreezeField(tmpPageName);
        }
        else {
            ViewChange2('read', !gPageObj.PageNameObj[tmpPageName].isWriteMode ? 'block' : 'none');
            ViewChange2('write', gPageObj.PageNameObj[tmpPageName].isWriteMode ? 'block' : 'none');
        }
    }

    //新增欄位時，初始化選單欄位
    public static AddRowInitList(tPageName: string): string[] {
        let tmpArr: string[] = new Array();
        let op = new set.OnclickPage();
        let ps = new set.PageSet();
        let pm = new PageMake();
        let dc = new set.DynamicClass();
        let df = new set.DynamicFunction();
        let ShieldIdxArr = ps.NeedShieldField(tPageName);
        let KeyValueArr: string[] = [];
        let ValueIdArr: string[] = [];
        let tFieldNameArr: string[] = [];
        let TriggerIdArr: string[] = [];

        if (gPageObj.PageNameObj[tPageName] == null) { return []; }

        for (let i = 0; i < gPageObj.PageNameObj[tPageName].ModifiableArr.length; i++) {
            let GetDefault = ps.AddLineDefaultValue(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i]);
            let tId = 'cell_' + AddLineCount + '_' + i.toString();
            let tAttrStr: string = ' id="' + tId + '"';
            if (ShieldIdxArr.indexOf(i) > -1) {
                tmpArr.push('<span></span>');
            }
            else if (gPageObj.PageNameObj[tPageName].ModifiableArr[i]) {
                let tmpSelectList = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], false);
                if (set.TableSetObj.DatePickerArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[i]) > -1) {
                    tAttrStr += ' ' + pm.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], '');
                    let FieldHtml = pm.MakeListHtml('Calendar', tAttrStr, tmpSelectList, GetDefault);
                    tmpArr.push(FieldHtml);
                }
                else if (op.FieldIsOnclick(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], '')) {
                    tmpArr.push('<input' + tAttrStr + ' class="form-control" title="新增模式不可上傳，請於修改模式中上傳" readonly>');
                }
                else if (GetDefault != '') {//有預設值，且不再需要更改
                    let tmpWidth = ps.MakeWidth(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i]);
                    tmpArr.push('<input' + tAttrStr + ' class="form-control" value="' + GetDefault + '" style="width:' + tmpWidth + ';min-width:' + tmpWidth + '" readonly>');
                }
                else if (ps.NeedColorField(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i])) {
                    tmpArr.push('<input class="form-control" type="color"' + tAttrStr + ' value="">');
                }
                else {
                    tAttrStr += ' ' + pm.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], '');
                    if (dc.NeedDynamicGetList(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], false)) {
                        tAttrStr += ' onchange="' + dc.ReturnFunctionStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], false, tId) + '"';
                        for (let key in dc.DynamicInfObj[tPageName].InfluenceToFieldNames?.[gPageObj.PageNameObj[tPageName].TitleStrArr[i]]) {
                            let tMenuArr: string[] = set.MenuList[gPageObj.PageNameObj[tPageName].TitleStrArr[i]].MenuArr || [];
                            let tKeyValue: string = tMenuArr.length > 0 ? tMenuArr[0].substring(0, tMenuArr[0].indexOf(',')) : '';
                            tKeyValue = df.ResetDynamicQuery(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], key, tKeyValue).toString();
                            KeyValueArr.push(tKeyValue);
                            ValueIdArr.push(key);
                            tFieldNameArr.push(gPageObj.PageNameObj[tPageName].TitleStrArr[i]);
                            TriggerIdArr.push(tId);
                        }
                    }
                    if (tmpSelectList.length == 0) {
                        tmpArr.push('<input' + tAttrStr + ' class="form-control">');
                    }
                    else if (ps.IsMultiSelect(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], false)) {
                        let FieldHtml = pm.MakeListHtml('Multi Select', tAttrStr, tmpSelectList);
                        tmpArr.push(FieldHtml);
                    }
                    else {
                        let FieldHtml = pm.MakeListHtml('select', tAttrStr, tmpSelectList);
                        tmpArr.push(FieldHtml);
                    }
                }
            }
            else {
                if (GetDefault != '') {//有預設值，且不再需要更改
                    tmpArr.push(GetDefault);
                }
                else { tmpArr.push(''); }
            }
        }
        tmpArr.push('<button type="button" class="btn btn-danger DeleteFun write"  style="display:none">刪除</button>');//刪除欄位
        for (let i = 0; i < ValueIdArr.length; i++) {
            let tmpSelectList = pm.FrontDynamicMenuRequest(tPageName, tFieldNameArr[i], ValueIdArr[i], false, KeyValueArr[i]);
            let domId = ValueIdArr[i];
            let tIdx: number = Number(domId.substring(domId.lastIndexOf('_') + 1));
            let realDomId = 'cell_' + AddLineCount + '_' + tIdx.toString();
            let tAttrStr = ' id="' + realDomId + '" ' + pm.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[tIdx], '');
            if (tmpSelectList != null && gPageObj.PageNameObj[tPageName].ModifiableArr[tIdx]) {
                if (ps.IsMultiSelect(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[tIdx], false)) {
                    let FieldHtml = pm.MakeListHtml('Multi Select', tAttrStr, tmpSelectList);
                    tmpArr[tIdx] = FieldHtml;
                }
                else {
                    let FieldHtml = pm.MakeListHtml('select', tAttrStr, tmpSelectList);
                    tmpArr[tIdx] = FieldHtml;
                }
            }
        }
        AddLineCount--;

        return tmpArr;
    }

    //刪除Table某一行
    //RowId: 該行DOM ID(tr的id)
    public DeleteBtn(RowId: string) {
        document.getElementById(RowId)!.style.display = 'none';
    }

    //取消修改
    //tPageName: 頁面名稱
    public static ReSetWrite(tPageName?: string): void {
        let tmpPageName: string = '';
        if (gPageObj.PageNameArr.length == 0) { return; }
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let TableIdName = tmpPageName + 'Table';
        let t = $('#' + TableIdName).DataTable();
        let oriPage = t.page.info().page;
        this.CheckReadWriteMode(true, tmpPageName);
        PageOperation.Search(tmpPageName, oriPage);
    }

    //數據重載(先呼叫後端去除快取的function，再重新搜尋)
    //tPageName: 頁面名稱
    public static ReloadData(tPageName?: string): void {
        let tmpPageName: string = '';
        if (gPageObj.PageNameArr.length == 0) { return; }
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        var sbtn: any = $('#ReloadBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        doAjax('Reload', true, gPageObj.PageNameObj[tmpPageName].LastQuery, function () {
            PageOperation.Search(tmpPageName);

            setTimeout(function () {
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
            }, 1000)
        });
    }
}

//此class定義Page的操作功能
export class PageOperation extends TableAndSearchOperation {//PageName底下操作功能定義於此
    //Update點擊觸發的功能
    //此函式還未將Query傳入後端
    public UpdateClick(tPageName: string): void {
        if (gPageObj.PageNameObj[tPageName] != null) {
            let ps = new set.PageSet();
            let idName = tPageName + 'Table';
            let tmpArr = $('#' + idName + ' tbody tr');
            let msg = '';
            let tmpQueryArr = new Array();
            let ModifiableArr = gPageObj.PageNameObj[tPageName].ModifiableArr;
            let FieldArr = gPageObj.PageNameObj[tPageName].TitleStrArr;

            for (let i = 0; tmpArr.eq(i).html(); i++) {
                for (let j = 0; j < ModifiableArr.length; j++) {
                    let getValue: any = '';
                    if (tmpArr.eq(i).find('td').eq(j).find('.selectpicker').val() != null) {//一定要加 != null的判斷，不可用本身布林值來判斷，因為0會回傳false
                        getValue = tmpArr.eq(i).find('td').eq(j).find('.selectpicker').val();
                        if (toType(getValue) == 'array') {
                            getValue = getValue.join('/');
                        }
                    }
                    else if (tmpArr.eq(i).find('td').eq(j).find('input').val() || tmpArr.eq(i).find('td').eq(j).find('input').val() == '') {
                        getValue = tmpArr.eq(i).find('td').eq(j).find('input').val();
                    }
                    else if (tmpArr.eq(i).find('td').eq(j).find('.MoneyFormat').html() != null) {
                        getValue = tmpArr.eq(i).find('td').eq(j).find('.RealNumber').html();
                    }
                    else {
                        getValue = tmpArr.eq(i).find('td').eq(j).html();
                    }

                    if (tmpArr.eq(i).css('display') != 'none') {//新增、修改
                        if (j == 0 && getValue != '') {//此tr是否為更新的數據
                            break;
                        }
                        if (getValue != '' && ps.NeedCheckSimilarity(tPageName, FieldArr[j])) {
                            tmpQueryArr.push(CheckEscapeChar(getValue));
                        }
                    }
                }
            }

            let tSArr = new Array();
            for (let j = 0; j < tmpQueryArr.length; j++) {
                let tWord = ReplaceToChinese(ToTradition(tmpQueryArr[j]));
                let tSeg = SegStr(tWord, tWord.length, KeyObj);
                tSeg = tSeg.replace(/[,]+/g, ',');
                if (tSeg[0] == ',') { tSeg = tSeg.substring(1); }
                if (tSeg[tSeg.length - 1] == ',') { tSeg = tSeg.substring(0, tSeg.length - 1) }
                let tArr1 = tSeg.split(',');
                let isSimilar = false;
                for (let k = 0; k < CheckArr.length; k++) {
                    let tArr2 = CheckArr[k].split(';');
                    let tArr3 = tArr2[1].split(',');
                    let ttt = GetSimilarityWith(tArr1, tArr3);
                    if (GetSimilarityWith(tArr1, tArr3) > 0.5) {
                        isSimilar = true;
                        let tmpAArr = CheckArr[k].split(';');
                        tSArr.push(tmpAArr[0]);
                    }
                }

                if (isSimilar) {
                    msg += '新增的一筆資料(' + tmpQueryArr[j] + ')，和現有資料相近，如下:<br/>' + tSArr.join('<br/>') + '<br/>';
                    break;
                }
            }

            if (msg == '') {
                let tDom = document.getElementById('UpdateAlertTitle');
                if (tDom != null) { tDom.innerHTML = '更新'; }
                tDom = document.getElementById('UpdateAlertText');
                if (tDom != null) { tDom.innerHTML = '確定更新此頁嗎？'; }
            }
            else {
                let tDom = document.getElementById('UpdateAlertTitle');
                if (tDom != null) { tDom.innerHTML = '注意'; }
                tDom = document.getElementById('UpdateAlertText');
                if (tDom != null) { tDom.innerHTML = '確定更新此頁嗎？\r\n' + msg; }
            }
        }
    }

    //初始化Menu內容
    public InitListArr(tPageName: string) {
        let ps = new set.PageSet();
        for (let key in set.MenuList) {
            //if (set.MenuList[key].MenuArr.length == 0) {
            if (!set.MenuList[key].DataFromDB) {
                set.MenuList[key].MenuArr = ps.GetList(tPageName, key);
            }
            else if (document.getElementById(key) != null) {
                let tmp = document.getElementById(key)?.innerHTML || '';
                tmp = htmlDecode(tmp);
                set.MenuList[key].MenuArr = tmp.split(';');
            }
            //}
        }
    }

    //AP定版功能
    //tPageName: 頁面名稱
    public static VersionSet(tPageName?: string): void {
        let sbtn: any = $('#VersionBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        if (gPageObj.PageNameArr.length <= 0) { return; }
        let tmpPageName: string = '';
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        PageOperation.UpdateSubmit(tmpPageName, false);

        let tFieldArr = ['BU', '年度'];
        let tFieldValue: string[] = [];
        for (let i = 0; i < tFieldArr.length; i++) {
            let tStr = GetSelectValue(tFieldArr[i]);
            tFieldValue.push(tStr != null ? tStr.toString() : '');
        }
        let Query = {
            PageName: tmpPageName,
            QueryArr: tFieldValue
        };

        doAjax('VesionSet', true, Query, function (data: boolean) {
            let result = '';
            if (data) { result = '定版成功'; }
            else { result = '定版失敗'; }
            AlertClick('Attention', result);
            //sbtn.button('reset');
            SetButtonDisable('SearchBtn', false, '搜尋');
            PageOperation.ReloadData();
            location.reload();
        });
    }

    //AP、FCST匯入功能
    public static UploadData(tPageName?: string): void {
        if (gPageObj.PageNameArr.length <= 0) { return; }
        let tmpPageName: string = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;

        let sbtn: any = $('#UploadFileBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');

        // 宣告一個FormData
        let data = new FormData();
        // 將檔案append FormData
        let tDom: any = $('#fileUpload');
        if (tDom != null) {
            let files: any = tDom.get(0).files;
            if (files == null || files.length == 0) {
                AlertClick('Error', '請選擇檔案!');
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
                return;
            }
            if (files[0].name.toLowerCase().indexOf('.xls') < 0) {
                AlertClick('Error', '副檔名錯誤!');
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
                return;
            }
            if (files.length > 0) {
                data.append('UploadedName', files[0]);
                data.append('PageName', tmpPageName);

                let domId = 'field_';
                let fQueryArr = [];
                for (let i = 0; document.getElementById(domId + i.toString()); i++) {
                    //let tmpValue = document.getElementById(domId + i.toString()).value.trim();
                    let tmpValue = $('#' + domId + i.toString()).val();
                    let tStr = '';
                    if (tmpValue != null) {
                        if (typeof tmpValue == 'object' && toType(tmpValue) == 'array') {
                            tStr = tmpValue.join('@');
                        }
                        else { tStr = tmpValue.toString().trim(); }
                    }

                    if (tStr.length > 0) {
                        fQueryArr.push(tStr);
                    }
                    else {
                        fQueryArr.push('');
                    }
                }

                data.append('queryStr', fQueryArr.join(','));
            }

            // 透過ajax方式Post 至Action
            let ajaxRequest = $.ajax({
                type: 'POST',
                url: 'UploadFileExcel',
                contentType: false,         // 告诉jQuery不要去這置Content-Type
                processData: false,         // 告诉jQuery不要去處理發送的數據 
                dataType: 'json',
                data: data
            })
                .done(function (data, textStatus) {
                    if (data != '') {
                        AlertClick('Error', data);
                    }
                    else {
                        AlertClick('成功', '匯入成功!');
                        PageOperation.ReloadData(tmpPageName);
                    }
                    //sbtn.button('reset');
                    SetButtonDisable('SearchBtn', false, '搜尋');
                })
                .fail(function () {
                    alert("error");
                    //sbtn.button('reset');
                    SetButtonDisable('SearchBtn', false, '搜尋');
                });
        }
    }

    //有拖拉功能的上傳功能(總經理報表的專案管理)
    public static UploadData2(tPageName?: string): void {
        if (gPageObj.PageNameArr.length <= 0) { return; }
        let tmpPageName: string = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let sbtn: any = $('#UploadFileBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        let exFileName = ['.xls', '.xlsx', '.docx', '.ppt', '.pptx', '.jpg', '.png', '.pdf'];

        // 宣告一個FormData
        let data = new FormData();
        // 將檔案append FormData
        let tDom: any = $('#UpFile');
        if (tDom != null) {
            let files = tDom.get(0).files;
            if (files == null || files.length == 0) {
                AlertClick('Error', '請選擇檔案!');
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
                return;
            }
            let FileName = files[0].name.toLowerCase();
            let exName = FileName.substring(FileName.lastIndexOf('.'));
            let toIdName: string = document.getElementById('ToIdName')?.innerHTML || '';
            if (exFileName.indexOf(exName) < 0) {
                AlertClick('副檔名錯誤!', '副檔名只允許 ' + exFileName.join('、'));
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
                return;
            }
            if (files.length > 0) {
                data.append('UploadedName', files[0]);
                data.append('FileName', files[0].name);
                data.append('PageName', tmpPageName);

                let domId = 'field_';
                let fQueryArr = [];
                for (let i = 0; document.getElementById(domId + i.toString()); i++) {
                    //let tmpValue = document.getElementById(domId + i.toString()).value.trim();
                    let tmpValue = $('#' + domId + i.toString()).val();
                    let tStr = '';
                    if (tmpValue != null) {
                        if (typeof tmpValue == 'object' && toType(tmpValue) == 'array') {
                            tStr = tmpValue.join('@');
                        }
                        else { tStr = tmpValue.toString().trim(); }
                    }

                    if (tStr.length > 0) {
                        fQueryArr.push(tStr);
                    }
                    else {
                        fQueryArr.push('');
                    }
                }

                data.append('queryStr', fQueryArr.join(','));
                //data.append('DirName', document.getElementById('BigAlertAreaTitle').innerHTML);
                data.append('DirName', toIdName);
            }

            // 透過ajax方式Post 至Action
            let ajaxRequest = $.ajax({
                type: 'POST',
                url: 'UploadFileToServer',
                contentType: false,         // 告诉jQuery不要去這置Content-Type
                processData: false,         // 告诉jQuery不要去處理發送的數據 
                dataType: 'json',
                data: data
            })
                .done(function (data, textStatus) {
                    if (data.indexOf('OK') < 0) {
                        AlertClick('Error', data);
                    }
                    else {
                        tDom = $("#UpFile");
                        tDom.fileinput('clear');
                        ButtonClickSimulation('#BigAlertAreaBtn');
                        AlertClick('成功', '上傳成功!');
                        let tmpArr = data.split(';');
                        (document.getElementById(toIdName) as HTMLInputElement).value = tmpArr[1];
                    }
                    //sbtn.button('reset');
                    SetButtonDisable('SearchBtn', false, '搜尋');
                })
                .fail(function (jqXHR, exception) {
                    console.log(exception);
                    alert("error");
                    //sbtn.button('reset');
                    SetButtonDisable('SearchBtn', false, '搜尋');
                });
        }
    }

    //匯出功能(由後端產生檔案再回傳路徑)
    public static ExportExcel(tPageName?: string): void {
        if (gPageObj.PageNameArr.length <= 0) { return; }
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let Query = gPageObj.PageNameObj[tmpPageName].LastQuery;
        let sbtn: any = $('#ExportBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        if (Query.PageNumber != -1) { Query.PageNumber = -1; }

        doAjax('ExportExcel', true, Query, function (data: string) {
            let tDom: any = document.getElementById('HiddenClickBtn');
            tDom.href = data;
            ButtonClickSimulation('#HiddenClickBtn');
            //sbtn.button('reset');
            SetButtonDisable('SearchBtn', false, '搜尋');
        });
    }

    public static Logout() {
        doAjax('Logout', true, '', function (data: string) {
            window.location.assign(data);
        });
    }

    //LinkToERP功能。目前實作於自有產品
    public static LinkToERP(tPageName?: string): void {
        if (gPageObj.PageNameArr.length <= 0) { return; }
        let tmpPageName: string = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let sbtn: any = $('#LinkERPBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');

        doAjax('LinkToERP', true, gPageObj.PageNameObj[tmpPageName].LastQuery, function (data: string) {
            let result = '';
            if (data && data == 'OK') { result = '同步成功'; }
            else { result = '同步失敗'; }
            AlertClick('Attention', result);
            //sbtn.button('reset');
            SetButtonDisable('SearchBtn', false, '搜尋');
        });
    }
}

export class PageMake implements PageRender {
    public CreatReadWriteTable(tPageName: string, data: Array<string>, AttributeStr: string, TitleArr: Array<Array<string>>) {
        if (gPageObj.PageNameObj[tPageName] == null) { return ''; }
        let TableHtml = '<table ' + AttributeStr + '>';
        TableHtml += this.CreatTableTitle(tPageName, 'thead', set.PageSetObj.noDeletePage.indexOf(tPageName) > -1 ? new Array() : ['功能'], TitleArr);
        TableHtml += '<tbody>';
        let ps = new set.PageSet();
        let pt = new PageTool();
        let UnitMode = GetSelectValue('單位');
        let isSearch = false;
        CheckArr = new Array();
        let ShieldIdxArr = ps.NeedShieldField(tPageName);
        let op = new set.OnclickPage();
        let dc = new set.DynamicClass();
        let cr = new set.ColorRuleClass();
        let df = new set.DynamicFunction();
        let LineAllNotCanEdit = true;
        cr.InitColorObj(tPageName, data);

        for (let i = 0; i < data.length; i++) {
            let tmpId = 'tmprow' + i;
            TableHtml += '<tr id="' + tmpId + '">';
            let tmpArr: string[] = data[i].split(',');
            let tmpModifuableArr = ps.CheckFieldModifiable(tPageName, tmpArr);
            let KeyValueArr: string[] = [];
            let ValueIdArr: string[] = [];
            let tFieldNameArr: string[] = [];
            let tmpFirstTitle = tmpArr[0];
            let LineArr: { aPart: string, MenuPart: string, bPart: string }[] = [];
            if (tPageName == 'SEMI_MAIN_PROJECT') {
                set.NeedClickObj[tPageName]['改善成效'].AnotherValue = 'up' + tmpFirstTitle;
            }

            for (let j = 0; j < tmpArr.length; j++) {
                let ColorHtml = '';
                let cellId = 'cell_' + i.toString() + '_' + j.toString();
                let ClickHtml = '';
                let aPart: string = '';
                let MenuPart: string = '';
                let bPart: string = '';

                if (!gPageObj.PageNameObj[tPageName].ModifiableArr[j] && op.FieldIsOnclick(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0])) {
                    ClickHtml = op.GetOnclickHtml(tPageName, tPageName + '_LIST', gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0], tmpArr);
                    ClickHtml = 'onclick="' + ClickHtml + '"';
                }

                ColorHtml = cr.CheckColorRule(i, j);

                if (set.TableSetObj.SetRight.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1) {
                    let tStr = '<td id="' + cellId + '" class="' + (ClickHtml != 'onclick=""' && ClickHtml != '' ? 'ClickSearch' : '') + '"  style="text-align:right !important;' + ColorHtml + (ShieldIdxArr.indexOf(j) > -1 ? 'display:none;' : '') + '" ' + ClickHtml + '>';
                    aPart += tStr;
                }
                else {
                    let tStr = '<td id="' + cellId + '" class="' + (ClickHtml != 'onclick=""' && ClickHtml != '' ? 'ClickSearch' : '') + '" style="' + ColorHtml + (ShieldIdxArr.indexOf(j) > -1 ? 'display:none;' : '') + '" ' + ClickHtml + '>';
                    aPart += tStr;
                }
                if (ps.NeedCheckSimilarity(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j])) { CheckArr.push(tmpArr[j]); }
                let tmpSelectList = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false);
                let tmpAttrStr = this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], '');
                if (dc.NeedDynamicGetList(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], isSearch)) {
                    tmpAttrStr += ' onchange="' + dc.ReturnFunctionStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false, cellId) + '"';
                    for (let key in dc.DynamicInfObj[tPageName].InfluenceToFieldNames?.[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) {
                        let tKeyValue = tmpArr[j];
                        tKeyValue = df.ResetDynamicQuery(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], key, tKeyValue).toString();
                        KeyValueArr.push(tKeyValue);
                        ValueIdArr.push(key);
                        tFieldNameArr.push(gPageObj.PageNameObj[tPageName].TitleStrArr[j]);
                    }
                }
                if (set.TableSetObj.IgnoreZero.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1 && tmpArr[j] == '0') {
                    tmpArr[j] = '';
                }

                let tmpReadHtml = '';
                if (gPageObj.PageNameObj[tPageName].ModifiableArr[j] && tmpModifuableArr[j]) {
                    tmpReadHtml = 'read';
                    LineAllNotCanEdit = false;
                }

                if (set.PageSetObj.NoChangePage.indexOf(tPageName) > -1 || ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) {
                    aPart += tmpArr[j];
                }
                else if (set.TableSetObj.NeedModifyDisplayArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1) {
                    let tStr = '<span class="MoneyFormat ' + tmpReadHtml + '">' + ps.NeedModifyDisplay(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[j], tPageName, tmpArr[0]) + '</span><span class="RealNumber" style="display:none">' + tmpArr[j] + '</span>';
                    aPart += tStr;
                }
                else if (tmpSelectList != null && tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) {
                    let tStr = '';
                    if (tmpReadHtml.length > 0) {
                        tStr = '<span class="' + tmpReadHtml + '">' + pt.GetListValue(tmpSelectList, tmpArr[j]) + '</span>';
                    }
                    else {
                        tStr = '<span>' + pt.GetListValue(tmpSelectList, tmpArr[j]) + '</span>';
                    }
                    aPart += tStr;
                }
                else if (tmpReadHtml.length > 0) {
                    let tStr = '<span class=" ' + tmpReadHtml + '">' + tmpArr[j] + '</span>';
                    aPart += tStr;
                }
                else {
                    aPart += tmpArr[j];
                }
                if (gPageObj.PageNameObj[tPageName].ModifiableArr[j] && tmpModifuableArr[j] && ShieldIdxArr.indexOf(j) < 0) {
                    let tClassName = 'write';
                    let tStr = '<span class="' + tClassName + '" style="display:none">';
                    if (set.TableSetObj.DatePickerArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1) {
                        tStr += this.MakeListHtml('Calendar', tmpAttrStr, tmpSelectList, tmpArr[j]);
                    }
                    else if (op.FieldIsOnclick(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0])) {
                        let tClickFun = op.GetOnclickHtml(tPageName, tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0], tmpArr, 'up' + tmpArr[0]);
                        tStr += '<input id="up' + tmpArr[0] + '" class="form-control" ' + tmpAttrStr + ' value="' + tmpArr[j] + '" readonly><button class="btn" onclick="' + tClickFun + '">上傳</button>';
                    }
                    else if (set.TableSetObj.TextAreaArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1) {
                        tStr += '<textarea class="form-control" ' + tmpAttrStr + ' rows="' + (tmpArr[j].length < 20 ? 1 : (tmpArr[j].length < 35 ? 2 : 3)) + '">' + tmpArr[j] + '</textarea>';
                    }
                    else if (ps.NeedColorField(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j])) {
                        tStr += '<input class="form-control" type="color"' + tmpAttrStr + ' value="' + tmpArr[j] + '">';
                    }
                    else if (tmpSelectList.length == 0) {
                        tStr += '<input class="form-control" ' + tmpAttrStr + ' value="' + tmpArr[j] + '">';
                    }
                    else if (!ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) {
                        tmpAttrStr += ' id="' + cellId + '_menu"';
                        if (ps.IsMultiSelect(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false)) {
                            MenuPart = this.MakeListHtml('Multi Select', tmpAttrStr, tmpSelectList, tmpArr[j]);
                        }
                        else {
                            MenuPart = this.MakeListHtml('select', tmpAttrStr, tmpSelectList, tmpArr[j]);
                        }
                    }
                    aPart += tStr;
                    bPart += '</span>';
                }
                else if (tmpSelectList != null && tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) {
                    aPart += '<input value="' + tmpArr[j] + '" style="display:none"/>';
                }
                bPart += '</td>';

                LineArr.push({ aPart: aPart, MenuPart: MenuPart, bPart: bPart });
            }

            for (let j = 0; j < ValueIdArr.length; j++) {
                let tmpSelectList = this.FrontDynamicMenuRequest(tPageName, tFieldNameArr[j], ValueIdArr[j], false, KeyValueArr[j]);
                let domId = ValueIdArr[j];
                let tIdx = Number(domId.substring(domId.lastIndexOf('_') + 1));
                let tAttrStr = this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[tIdx], '');
                if (tmpSelectList != null && gPageObj.PageNameObj[tPageName].ModifiableArr[tIdx] && tmpModifuableArr[tIdx] && ShieldIdxArr.indexOf(tIdx) < 0 && LineArr[tIdx].MenuPart != '') {
                    let tNewMenu = '';
                    tAttrStr += ' id="cell_' + i.toString() + '_' + tIdx.toString() + '_menu"';
                    if (ps.IsMultiSelect(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[tIdx], false)) {
                        tNewMenu = this.MakeListHtml('Multi Select', tAttrStr, tmpSelectList, tmpArr[tIdx]);
                    }
                    else {
                        tNewMenu = this.MakeListHtml('select', tAttrStr, tmpSelectList, tmpArr[tIdx]);
                    }
                    LineArr[tIdx].MenuPart = tNewMenu;
                }
            }

            let PartStr = '';
            for (let j = 0; j < LineArr.length; j++) {
                PartStr += LineArr[j].aPart + LineArr[j].MenuPart + LineArr[j].bPart
            }

            TableHtml += PartStr;

            if (set.PageSetObj.noDeletePage.indexOf(tPageName) < 0) {
                if (LineAllNotCanEdit) {
                    TableHtml += '<td></td>';
                }
                else {
                    TableHtml += '<td><button type="button" class="btn btn-danger DeleteFun write" style="display:none">刪除</button></td>';
                }
            }
            TableHtml += '</tr>';
        }

        TableHtml += '</tbody></table>';
        //CheckArr = SegWord(CheckArr);

        return TableHtml;
    }

    //建立Table表單的Title欄位的Html
    //tPageName: 頁面名稱
    //DomName:表單的id名稱，將此函式定義的html產生致此ID的innerHtml
    //ExtraFieldArr:需要額外建立的欄位名稱，此不存在於FieldArr
    //TitleArr:Title欄位名稱二維陣列
    public CreatTableTitle(tPageName: string, DomName: string, ExtraFieldArr: Array<string>, TitleArr: Array<Array<string>>) {
        let ps = new set.PageSet();
        let tmpTitleArr = new Array();
        let ShieldIdxArr = ps.NeedShieldField(tPageName);
        let LineNode = '';
        let TitleHtml = '';
        if (gPageObj.PageNameObj[tPageName] != null) {
            let FieldArr = gPageObj.PageNameObj[tPageName].TitleStrArr;
            for (let i = 0; i < TitleArr.length; i++) {
                let tttArr = new Array();
                for (let j = 0; j < TitleArr[i].length; j++) { tttArr.push(TitleArr[i][j]); }
                tmpTitleArr.push(tttArr);
            }
            if (DomName == 'thead') { LineNode = 'th'; }
            TitleHtml = '<' + DomName + '>';

            if (tmpTitleArr.length > 0) {
                for (let i = 0; i < tmpTitleArr.length; i++) {
                    TitleHtml += '<tr>';
                    for (let j = 0, col = 0, row = 0, c = 0, r = 0; j < tmpTitleArr[i].length; j++) {
                        if (tmpTitleArr[i][j] == '@') { continue; }
                        for (c = j + 1; c < tmpTitleArr[i].length && tmpTitleArr[i][j] == tmpTitleArr[i][c]; col++, c++) { tmpTitleArr[i][c] = '@'; }
                        for (r = i + 1; r < tmpTitleArr.length && tmpTitleArr[i][j] == tmpTitleArr[r][j]; row++, r++) {
                            for (let k = j + 1; j < tmpTitleArr[r].length && tmpTitleArr[r][j] == tmpTitleArr[r][k]; k++) { tmpTitleArr[r][k] = '@'; }
                            tmpTitleArr[r][j] = '@';
                        }

                        let LegthStr = this.MakeWidthAttributeStr(tPageName, FieldArr[j], (ShieldIdxArr.indexOf(j) > -1 ? 'display:none;' : ''));
                        TitleHtml += '<' + LineNode + ' ' + LegthStr + (col > 0 ? ' colspan="' + (col + 1).toString() + '"' : '') + (row > 0 ? ' rowspan="' + (row + 1).toString() + '"' : '') + ' ' + (ShieldIdxArr.indexOf(j) > -1 ? 'style="display:none"' : '') + '>';
                        TitleHtml += '<span class="WordTitle">' + tmpTitleArr[i][j] + '</span></' + LineNode + '>';
                        col = 0, row = 0;
                    }
                    for (let k = 0; i == 0 && k < ExtraFieldArr.length; k++) { TitleHtml += '<' + LineNode + ' rowspan="' + tmpTitleArr.length + '">' + ExtraFieldArr[k] + '</' + LineNode + '>'; }
                    TitleHtml += '</tr>';
                }
            }
            else {
                for (let i = 0; i < FieldArr.length; i++) {
                    TitleHtml += '<' + LineNode + ' ' + this.MakeWidthAttributeStr(tPageName, FieldArr[i], (ShieldIdxArr.indexOf(i) > -1 ? 'display:none;' : '')) + '>' + FieldArr[i] + '</' + LineNode + '>';
                }
                for (let j = 0; j < ExtraFieldArr.length; j++) {
                    TitleHtml += '<' + LineNode + '>' + ExtraFieldArr[j] + '</' + LineNode + '>';
                }
            }

            TitleHtml += '</' + DomName + '>';
        }

        return TitleHtml;
    }

    //定義dom物件的style屬性
    //tPageName: 頁面名稱
    //InputFieldName: 欄位名稱
    //StyleAttr: css定義
    public MakeWidthAttributeStr(tPageName: string, InputFieldName: string, StyleAttr: string): string {
        let ps = new set.PageSet();
        let WidthAttributeStr = '';
        let WidthStr = ps.MakeWidth(tPageName, InputFieldName);
        let tmpList = ps.GetListArr(tPageName, InputFieldName, false);
        WidthAttributeStr = WidthStr == '' ? '' : ' style="width:' + WidthStr + ';' + (tmpList.length == 0 ? 'min-width:' + WidthStr + ';' : '') + StyleAttr + '" data-width="' + WidthStr + '"';

        return WidthAttributeStr;
    }

    //製作選單DOM物件
    //Dom: select/Multi Select/Calendar
    //AttributeStr: DOM物件額外的屬性字串
    //ValueArr: Menu內容
    //SelectValue: Menu預設值
    public MakeListHtml(Dom: string, AttributeStr: string, ValueArr: string[], SelectValue?: string): string {//製作選單DOM物件
        var DomHtml = '';

        if (Dom == 'select') {
            DomHtml = '<select class="selectpicker" data-live-search="true" data-container="body" data-html="true"' + AttributeStr + '>';
            DomHtml += this.MakeOptionHtml(ValueArr, SelectValue);
            DomHtml += '</select>';
        }
        else if (Dom == 'Multi Select') {
            DomHtml = '<select multiple class="selectpicker" data-live-search="true" data-container="body" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" data-selected-text-format="count > 1" data-html="true"' + AttributeStr + '>';
            DomHtml += this.MakeOptionHtml(ValueArr, SelectValue);
            DomHtml += '</select>';
        }
        else if (Dom == 'Calendar') {
            if (SelectValue == null) { SelectValue = ''; }
            DomHtml = '<div ' + AttributeStr + ' class="input-group date form_date col-md-5" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd"><input class="form-control" size="16" type="text" value="' + SelectValue + '" readonly><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>';
        }

        return DomHtml;
    }

    //製作Select Option Html
    //ValueArr: Menu內容
    //SelectValue: Menu預設值
    public MakeOptionHtml(ValueArr: string[], SelectValue?: string): string {
        var OptionHtml = '';
        var tValueArr = new Array();
        var isMulti = false;
        if (SelectValue != null && SelectValue.toString().indexOf('/') > -1) {
            tValueArr = SelectValue.toString().split('/');
            isMulti = true;
        }

        for (var j = 0; j < ValueArr.length; j++) {
            if (ValueArr[j] == '') { continue; }
            var tmp = ValueArr[j].split(',');
            if ((isMulti && tValueArr.indexOf(tmp[0]) > -1) || SelectValue == tmp[0]) {
                OptionHtml += '<option value="' + tmp[0] + '" selected>' + tmp[1] + '</option>';
            }
            else {
                OptionHtml += '<option value="' + tmp[0] + '">' + tmp[1] + '</option>';
            }
        }

        return OptionHtml;
    }

    public MakeChart(tPageName: string, data: string[]): void {
        let dom = document.getElementById('ChartArea') as HTMLDivElement;
        if (dom == null) { return; }

        let myChart = echarts.init(dom);
        let ps = new set.PageSet();
        let option = ps.ChartsOption(tPageName, data);

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    //初始化搜尋欄位
    //tPageName: 頁面名稱
    public InitSearchArea(tPageName: string): void {
        if (gPageObj.PageNameObj[tPageName] == null) {
            return;
        }
        let ps = new set.PageSet();
        let tmpObj = ps.InitSearchObj(tPageName);
        let pt = new PageTool();
        let UrlGetObj = pt.UrlGetVariable();
        tmpObj = pt.SetDefaultValue(tmpObj, UrlGetObj);
        let DisplayArr = tmpObj.DisplayArr;//要查詢的欄位
        let DefaultKey = tmpObj.DefaultKey;//各欄位的預設查詢值
        let DefaultValue = tmpObj.DefaultValue;//各欄位的預設值
        let htmlStr = '';
        let NeedSearchBtn = false;//需不需要有搜尋按鈕
        let isSearch = true;
        let KeyValueArr: string[] = [];
        let ValueIdArr: any[] = [];
        let tFieldNameArr: string[] = [];
        let dc = new set.DynamicClass();
        let tmpFieldName = 'field_';

        for (let i = 0; i < gPageObj.PageNameObj[tPageName].FieldArr.length; i++) {
            let domId = tmpFieldName + i;
            if (dc.NeedDynamicGetList(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], isSearch)) {
                set.DCMenuIdNameList.push(domId);
            }
            if (DisplayArr.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[i]) > -1) {
                let tClassName = ps.SearchBarClassName(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i]);
                htmlStr += '<div class="form-group' + (tClassName != '' ? ' ' + tClassName : '') + '" style="float:left;margin:3px">';
                NeedSearchBtn = true;
            }
            else {
                let tClassName = ps.SearchBarClassName(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i]);
                htmlStr += '<div class="form-group' + (tClassName != '' ? ' ' + tClassName : '') + '" style="display:none;float:left;margin:3px">';
            }

            htmlStr += '<label for="' + domId + '">' + gPageObj.PageNameObj[tPageName].FieldArr[i] + '</label>';

            let DefaultIdx = DefaultKey.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[i]);
            if (DefaultIdx > -1) {
                let tmpSelectList = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], true);
                let AttrStr = 'id="' + domId + '"' + this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], '');

                if (set.TableSetObj.DatePickerArr.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[i]) > -1) {
                    htmlStr += this.MakeListHtml('Calendar', AttrStr, tmpSelectList, DefaultValue[DefaultIdx]);
                }
                else if (set.TableSetObj.CheckboxArr.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[i]) > -1) {
                    htmlStr += '<input class="form-check-input" type="checkbox" class="form-control" id="' + domId + '" ' + this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], '') + ' ' + (DefaultValue[DefaultIdx] == 'true' || DefaultValue[DefaultIdx] == '1' ? 'checked' : '') + '>';
                }
                else if (tmpSelectList == null || tmpSelectList.length == 0) {
                    htmlStr += '<input type="text" class="form-control" id="' + domId + '" ' + this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], '') + ' value="' + DefaultValue[DefaultIdx] + '">';
                }
                else {
                    if (dc.NeedDynamicGetList(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], isSearch)) {
                        if (dc.DynamicInfObj[tPageName].InfluenceByThisFieldName == gPageObj.PageNameObj[tPageName].FieldArr[i]) {
                            AttrStr += ' onchange="' + dc.FunctionName + '()" ';
                        }
                        else if (Object.keys(dc.DynamicInfObj[tPageName].InfluenceToFieldNames?.[gPageObj.PageNameObj[tPageName].FieldArr[i]] || []).length > 0) {
                            let tDCHtml = '';
                            tDCHtml += dc.ReturnFunctionStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], isSearch);
                            for (let key in dc.DynamicInfObj[tPageName].InfluenceToFieldNames?.[gPageObj.PageNameObj[tPageName].FieldArr[i]]) {
                                KeyValueArr.push(DefaultValue[DefaultIdx]);
                                ValueIdArr.push(key);
                                tFieldNameArr.push(gPageObj.PageNameObj[tPageName].FieldArr[i]);
                            }
                            AttrStr += ' onchange="' + tDCHtml + '" ';
                        }
                    }
                    if (ps.IsMultiSelect(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], true)) {
                        htmlStr += this.MakeListHtml('Multi Select', AttrStr, tmpSelectList, DefaultValue[DefaultIdx]);
                    }
                    else {
                        htmlStr += this.MakeListHtml('select', AttrStr, tmpSelectList, DefaultValue[DefaultIdx]);
                    }
                }
            }
            else {
                htmlStr += '<input type="text" class="form-control" id="' + domId + '" ' + this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], '') + '>';
            }

            htmlStr += '</div>';
        }

        let tDom = document.getElementById('SearchArea');
        if (tDom != null) { tDom.innerHTML = htmlStr; }
        if (!NeedSearchBtn) {//預設是block
            tDom = document.getElementById('SearchBtn');
            if (tDom != null) { tDom.style.display = 'none'; }
        }

        for (let i = 0; i < ValueIdArr.length; i++) {
            let tNum = ValueIdArr[i].replace(tmpFieldName, '');
            let DefaultIdx = DefaultKey.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[tNum]);
            if (DefaultIdx > -1) {
                let tmpSelectList = this.FrontDynamicMenuRequest(tPageName, tFieldNameArr[i], ValueIdArr[i], true, KeyValueArr[i]);
                let domId = ValueIdArr[i];
                if (tmpSelectList != null) {
                    document.getElementById(domId)!.innerHTML = this.MakeOptionHtml(tmpSelectList, DefaultValue[DefaultIdx]);
                }
            }
        }

        let TableIdName = tPageName + 'Table';
        $('.selectpicker').selectpicker();//可搜尋下拉式初始化
        let DatePickerObj: any = {
            weekStart: 1,
            todayBtn: true,
            autoclose: true,
            todayHighlight: true,
            startView: 2,
            minViewMode: 2,
            minView: 2,
            forceParse: false,
            format: 'yyyy/mm/dd'
        };
        DatePickerObj.minViewMode = 2;

        let HaveDatePick = false;
        for (let i = 0; i < set.TableSetObj.DatePickerArr.length; i++) {
            let tIdx = gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf(set.TableSetObj.DatePickerArr[i]);
            if (tIdx > -1) {
                HaveDatePick = true;
                let tSDId = 'field_' + tIdx;
                $('#' + tSDId).datetimepicker(ps.SetDatePick(tPageName, DatePickerObj, tSDId));
            }
        }

        if (!HaveDatePick) {
            $('.form_date').datetimepicker(DatePickerObj);
        }
    }

    //動態影響生成Menu(不經後端的Menu)
    //tPageName: 頁面名稱
    //FieldName: 欄位名稱(因值改變而影響別的欄位)
    //FieldId: 搜尋BAR欄位ID(被影響的欄位)
    //KeyQuery: 下拉選單的值
    public FrontDynamicMenuRequest(tPageName: string, FieldName: string, FieldId: string, isSearch: boolean, KeyQuery?: string[] | string): string[] | undefined {
        let dc = new set.DynamicClass();
        let ps = new set.PageSet();
        let valueArr: string[] | undefined = [];

        if (dc.DynamicInfObj[tPageName] && dc.DynamicInfObj[tPageName].InfluenceToFieldNames && Object.keys(dc.DynamicInfObj[tPageName].InfluenceToFieldNames!).length > 0) {
            let Key = KeyQuery != null ? KeyQuery : GetSelectValue(FieldName);
            if (Key == null || (typeof Key === 'object' && Key.length == 0)) { Key = ''; }
            let tPStr: string = '';
            if (dc.DynamicInfObj[tPageName].InfluenceToFieldNames![FieldName][FieldId] != null) {
                if (set.MenuList[dc.DynamicInfObj[tPageName].InfluenceToFieldNames![FieldName][FieldId].MenuName] != null) {
                    if (set.MenuList[dc.DynamicInfObj[tPageName].InfluenceToFieldNames![FieldName][FieldId].MenuName].DataFromDB) {
                        tPStr = document.getElementById(dc.DynamicInfObj[tPageName].InfluenceToFieldNames![FieldName][FieldId].MenuName)?.innerHTML || '';
                    }
                    else {
                        let tmpArr = ps.GetList(tPageName, dc.DynamicInfObj[tPageName].InfluenceToFieldNames![FieldName][FieldId].MenuName);
                        tPStr = tmpArr.join(';');
                    }
                }
                tPStr = htmlDecode(tPStr);
                let tPdArr = tPStr?.split(';');
                let tKeyArr = [];
                let haveAll = false;
                for (let i = 0; tPStr != '' && tPdArr != null && i < tPdArr.length; i++) {
                    let ttt = tPdArr[i].split(',')
                    let tmpIdx = ttt[1].indexOf('-');
                    tKeyArr.push(ttt[1].substring(0, tmpIdx));
                    tPdArr[i] = ttt[0] + ',' + ttt[1].substring(tmpIdx + 1);
                }
                if (typeof Key === 'object') {
                    for (let i = 0; i < Key.length; i++) {
                        if (Key[i] == '') {
                            haveAll = true;
                            break;
                        }
                        for (let j = 0; j < tKeyArr.length; j++) {
                            if (tKeyArr[j] == Key[i]) {
                                valueArr.push(tPdArr![j]);
                            }
                        }
                    }
                }
                else {
                    if (Key == '') {
                        haveAll = true;
                    }
                    for (let j = 0; !haveAll && j < tKeyArr.length; j++) {
                        if (tKeyArr[j] == Key) {
                            valueArr.push(tPdArr![j]);
                        }
                    }
                }
                if (haveAll) {
                    valueArr = tPdArr;
                }

                let tFieldArr = document.getElementById('FieldName')?.innerHTML.split(',');
                let tfIdx = parseInt(FieldId.substring(FieldId.indexOf('_') + 1));
                if (!isNaN(tfIdx) && tFieldArr != null && valueArr != null) {
                    valueArr = valueArr.filter(onlyUnique);
                    for (let i = 0; i < valueArr.length; i++) {
                        let tArr = valueArr[i].split(',');
                        if (tArr[0].indexOf('"') > -1) {
                            valueArr[i] = tArr[0].replace(/"/g, '”') + ',' + tArr[1];
                        }
                    }
                    valueArr = ps.GetListTitle(tPageName, tFieldArr[tfIdx], isSearch, valueArr);
                }
            }
        }

        return valueArr;
    }
}

export class PageTool {
    //有下拉選單的欄位值，將Key值替換成Value值
    public GetListValue(tMenuArr: string[], keyValue: string): string {
        if (keyValue.toString().indexOf('/') > -1) {//含有複選分隔符號
            let tValueArr = keyValue.toString().split('/');
            let reArr = new Array();
            for (let i = 0; i < tMenuArr.length; i++) {
                let tmp = tMenuArr[i].split(',');
                if (tValueArr.indexOf(tmp[0]) > -1) { reArr.push(tmp[1]); }
            }
            return reArr.join('/');
        }
        else {
            for (let i = 0; i < tMenuArr.length; i++) {
                let tmp = tMenuArr[i].split(',');
                if (tmp[0] == keyValue) {
                    return tmp[1];
                }
            }
        }

        return '';
    }

    //將數據轉換成匯出格式的數據
    //tdata: 數據(不含Title)
    public MakeExportData(tPageName: string, tdata: string[] | string[][]): string[] {
        let reData: string[] = new Array();
        let ps = new set.PageSet();

        for (let i = 0; i < tdata.length; i++) {
            let tmpArr = typeof tdata[i] == 'string' ? tdata[i].toString().split(',') : tdata[i] as string[];
            let tReArr: string[] = new Array();
            let ps = new set.PageSet();
            for (let j = 0; j < tmpArr.length; j++) {
                if (set.PageSetObj.NoChangePage.indexOf(tPageName) > -1 || (gPageObj.PageNameObj[tPageName] != null && j < gPageObj.PageNameObj[tPageName].TitleStrArr.length && ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j]))) {
                    tReArr.push(tmpArr[j]);
                    continue;
                }
                if (set.TableSetObj.MoneyFieldArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1) {
                    if (tmpArr[j].indexOf('%') > -1) {
                        tmpArr[j] = MoneyFormat(tmpArr[j].replace('%', '')) + '%';
                    }
                    else {
                        tmpArr[j] = MoneyFormat(tmpArr[j]);
                    }
                }
                let tmpSelectList = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false);
                tmpArr[j] = tmpArr[j].replace(/;/g, '；');
                if (tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) { tReArr.push(this.GetListValue(tmpSelectList, tmpArr[j])); }
                else { tReArr.push(tmpArr[j]); }
            }
            reData.push(tReArr.join(';'));
        }

        return reData;
    }

    //將Title物件轉換為一維陣列//匯出的函式會用
    //TitleArr: Title的物件
    public ObjTitleToStrArr(tPageName: string, TitleArr: string[][]) {
        let reTitleArr = new Array();

        if (TitleArr.length > 0) {
            for (let i = 0; i < TitleArr[0].length; i++) {
                let tmpStr = TitleArr[0][i];
                for (let j = 1; j < TitleArr.length; j++) { if (TitleArr[j][i] != TitleArr[0][i]) { tmpStr += TitleArr[j][i]; } }
                reTitleArr.push(tmpStr);
            }
        }
        else {
            reTitleArr = gPageObj.PageNameObj[tPageName].TitleStrArr;
        }

        return reTitleArr;
    }

    public CreatTable(qy: { FieldName: string[], QueryResult: string[] }, AttributeStr: string): string {
        var TableHtml = '<table ' + AttributeStr + '>';
        TableHtml += '<thead><tr>';

        for (var i = 0; i < qy.FieldName.length; i++) {
            TableHtml += '<th>' + qy.FieldName[i] + '</th>';
        }

        TableHtml += '</thead><tbody>';
        for (var i = 0; i < qy.QueryResult.length; i++) {
            TableHtml += '<tr>';
            var tmpArr = qy.QueryResult[i].split(';');
            for (var j = 0; j < tmpArr.length; j++) {
                TableHtml += '<td>' + tmpArr[j] + '</td>';
            }
            TableHtml += '</tr>';
        }

        TableHtml += '</tbody>';

        return TableHtml;
    }

    public static UploadAlert(tPageName: string, TitleStr: string[], InputId: string) {
        ButtonClickSimulation('#BigAlertAreaBtn');
        let tDom = document.getElementById('BigAlertAreaTitle');
        if (tDom != null) { tDom.innerHTML = TitleStr.join('/'); }
        tDom = document.getElementById('ToIdName');
        if (tDom != null) { tDom.innerHTML = InputId; }
    }

    public LoadingMask(mode: string) {
        let tDom: any = document.getElementById('LoadingMask');
        if (tDom.style.display != mode) {
            ButtonClickSimulation('#LoadingMaskBtn');
        }
    }

    //get傳遞參數設置搜尋條件
    public UrlGetVariable(): { [key: string]: string } {
        var getUrl = location.search.replace('?', '');
        var tmpArr = getUrl.split('&');
        var KeyValueObj: { [key: string]: string } = {};

        if (getUrl == '' || tmpArr.length == 0) {
            return KeyValueObj;
        }

        for (var i = 0; i < tmpArr.length; i++) {
            var tArr = tmpArr[i].split('=');
            var tmpKey = unicode2Ch(tArr[0]);
            var tmpValue = unicode2Ch(tArr[1]);
            KeyValueObj[tmpKey] = tmpValue.replace(/@/g, '/');
        }

        return KeyValueObj;
    }

    //修改下拉式選單可否使用
    public SelectDisableChange(ExceptforIdArr: string[], mode: boolean) {
        for (var i = 0; document.getElementById('field_' + i); i++) {
            if (ExceptforIdArr.indexOf('field_' + i) < 0 && document.getElementById('field_' + i)!.innerHTML.indexOf('<option') > -1) {
                (document.getElementById('field_' + i) as HTMLInputElement).disabled = mode;
            }
        }
    }

    //除了指定的搜尋Bar物件ID以外，其餘Menu重新整理
    //ExceptforIdArr: 搜尋Bar物件ID
    //tPageName: 頁面名稱
    public ReloadSelectOption(ExceptforIdArr: string[], tPageName?: string) {
        if (gPageObj.PageNameArr.length <= 0) { return; }
        let tmpPageName: string = '';
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let ps = new set.PageSet();
        let pm = new PageMake();
        let tmpObj = ps.InitSearchObj(tmpPageName);
        let DefaultValue = tmpObj.DefaultValue;//各欄位的預設值
        let DefaultKey = tmpObj.DefaultKey;
        let tmpFieldArr = gPageObj.PageNameObj[tmpPageName].FieldArr;
        for (let i = 0; document.getElementById('field_' + i); i++) {
            if (ExceptforIdArr.indexOf('field_' + i) < 0 && document.getElementById('field_' + i)!.innerHTML.indexOf('<option') > -1) {
                let DefaultIdx = DefaultKey.indexOf(tmpFieldArr[i]);
                if (DefaultIdx > -1) {

                    let tmpSelectList = ps.GetListArr(tmpPageName, tmpFieldArr[i], true);

                    if (tmpSelectList != null && tmpSelectList.length > 0) {
                        document.getElementById('field_' + i)!.innerHTML = pm.MakeOptionHtml(tmpSelectList, DefaultValue[DefaultIdx]);
                    }
                }
            }
        }
    }
    
    public SetDefaultValue(DefaultObj: { DisplayArr: string[], DefaultKey: string[], DefaultValue: string[] }, UrlObj: { [key: string]: string }) {
        var UrlKeys = Object.keys(UrlObj);

        for (var i = 0; i < UrlKeys.length; i++) {
            var idx = DefaultObj.DefaultKey.indexOf(UrlKeys[i]);
            if (idx > -1) {
                DefaultObj.DefaultValue[idx] = UrlObj[UrlKeys[i]];
            }
        }

        return DefaultObj;
    }
}

window.PageOperation = PageOperation;
window.PageTool = PageTool;