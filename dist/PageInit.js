var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import $ from 'jquery';
import 'bootstrap';
import * as set from './set.js';
//import { PPSearch, PPMake } from './PPI.js';
import 'datatables.net';
import * as echarts from 'echarts';
import 'bootstrap-datepicker';
import 'bootstrap-fileinput';
export var gPageObj = {
    PageNameArr: [],
    PageNameObj: {}
};
/**存放這次搜尋的文本(用於檢查相似度) */
export var CheckArr = [];
/**儲存那些頁面名稱需要紀錄Ajax執行狀態 */
export let NeedAjaxArr = [];
/**用來記錄新增的筆數(負值是用來與Table的行數做區分) */
var AddLineCount = -1;
/**頁面初始化 */
$(function () {
    var _a, _b, _c, _d;
    let po = new PageOperation();
    let pm = new PageMake();
    let ps = new set.PageSet();
    pm.IniteMenuBar(false, 'MenuBarLink2'); //渲染Menu Link
    pm.IniteMenuBar(true, 'MenuBarLink'); //渲染Menu Link並帶權限
    $('[data-toggle="tooltip"]').tooltip();
    let cr = new set.ColorRuleClass();
    cr.InitColorRule();
    let tPageName = (_a = document.getElementById('PageName')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (tPageName != undefined && tPageName != '' && gPageObj.PageNameObj[tPageName] == null) {
        ps.ResetMenuDocumentInnerHtml(tPageName);
        ps.SetMaintain(tPageName);
        gPageObj.PageNameArr.push(tPageName);
        let tFieldName = (_b = document.getElementById('FieldName')) === null || _b === void 0 ? void 0 : _b.innerHTML;
        let tNecessaryStr = (_c = document.getElementById('Necessary')) === null || _c === void 0 ? void 0 : _c.innerHTML;
        let tPageNumber = (_d = document.getElementById('DefaultPage')) === null || _d === void 0 ? void 0 : _d.innerHTML;
        let tPInf = new PageInf(tPageName, tFieldName === null || tFieldName === void 0 ? void 0 : tFieldName.split(','), tNecessaryStr === null || tNecessaryStr === void 0 ? void 0 : tNecessaryStr.split(','));
        if (tPageNumber != undefined && tPageNumber != '' && !isNaN(parseInt(tPageNumber))) {
            tPInf.PageNumber = parseInt(tPageNumber);
        }
        gPageObj.PageNameObj[tPageName] = tPInf;
        ps.SetChildPageName(tPageName);
        for (let i = 0; i < gPageObj.PageNameObj[tPageName].ChildName.length; i++) {
            cr.SetColorRuleFromFront(gPageObj.PageNameObj[tPageName].ChildName[i]);
        }
        po.InitListArr(tPageName);
        pm.InitSearchArea(tPageName);
        if (ps.isMainIndex(tPageName)) {
            (function (tPageName) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { PPSearch, PPMake } = yield import("./PPI.js");
                    PPMake.InitBlockMenu(tPageName);
                    NeedAjaxArr = gPageObj.PageNameObj[tPageName].ChildName;
                    if (set.PageSetObj.NoDefaultSearch.indexOf(tPageName) < 0) {
                        PPSearch.PageSearch();
                    }
                });
            })(tPageName);
        }
        else {
            if (set.PageSetObj.NoDefaultSearch.indexOf(tPageName) < 0) {
                PageOperation.Search(tPageName);
            }
        }
    }
    //確認更新按鈕的觸發函式
    $('#UpdateSubmit').on('click', (event) => {
        if (tPageName != null) {
            po.UpdateClick(tPageName);
        }
    });
    //監聽shown.bs.modal的隱藏顯示切換，用於顯示區塊後造成datatable.js跑版
    $('#BigAlertArea').on('shown.bs.modal', function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust(); //重新渲染datatable.js以解決顯示區塊後造成跑版
    });
    //監聽shown.bs.modal的隱藏顯示切換，用於顯示區塊後造成datatable.js跑版
    $('#RowDataArea').on('shown.bs.modal', function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust(); //重新渲染datatable.js以解決顯示區塊後造成跑版
    });
});
/**定義Table表單屬性
 * TitleArr.length = NecessaryArr.length = ModifiableArr.length
 */
class FormInf {
    /**初始化表單屬性
     * @param {string} tFormName 表單名稱
     * @param {Array<string>} tFieldArr 欄位名稱(來自ID="FieldName"的DOM InnerHtml)
     * @param {Array<boolean | number | string>} tNecessaryArr 是否必填(來自ID="Necessary"的DOM InnerHtml)
     * @param {Array<boolean | number | string>} tModifiableArr 可否修改
     */
    constructor(tFormName, tFieldArr, tNecessaryArr, tModifiableArr) {
        /**欄位名稱 */
        this.FieldArr = [];
        /**Table顯示的欄位名稱(多重欄位會降維一維陣列儲存) */
        this.TitleStrArr = [];
        /**紀錄多重欄位(真實的欄位型態) */
        this.TitleCell = [];
        /**是否必填 */
        this.NecessaryArr = [];
        /**可否修改 */
        this.ModifiableArr = [];
        /**這次的搜尋結果 */
        this.FullData = [];
        /**搜尋結果物件的讀取順序(內容值為物件屬性名稱)，此功能應用於Dapper的回傳結果 */
        this.FullDataObjOrder = [];
        this.FormName = tFormName;
        if (tFieldArr != null) {
            this.FieldArr = tFieldArr;
        }
        if (tNecessaryArr != null) {
            for (let i = 0; i < tNecessaryArr.length; i++) {
                let tValue = false;
                if (typeof tNecessaryArr[i] === 'number') {
                    tValue = tNecessaryArr[i] == 1 ? true : false;
                }
                else if (typeof tNecessaryArr[i] === 'string') {
                    tValue = tNecessaryArr[i] == '1' ? true : false;
                }
                else {
                    tValue = tNecessaryArr[i];
                }
                this.NecessaryArr.push(tValue);
            }
        }
        if (tModifiableArr != null) {
            for (let i = 0; i < tModifiableArr.length; i++) {
                let tValue = false;
                if (typeof tModifiableArr[i] === 'number') {
                    tValue = tModifiableArr[i] == 1 ? true : false;
                }
                else if (typeof tModifiableArr[i] === 'string') {
                    tValue = tModifiableArr[i] == '1' ? true : false;
                }
                else {
                    tValue = tModifiableArr[i];
                }
                this.ModifiableArr.push(tValue);
            }
        }
        this.TitleStrArr = this.FieldArr;
        if (this.ModifiableArr.length == 0) {
            let ps = new set.PageSet();
            this.ModifiableArr = ps.InitModifiable(tFormName, this.TitleStrArr);
        }
    }
    /**將Object型別的回傳結果(一行)，轉回string陣列
     * @param LineData key:欄位名稱; value:欄位值
     * @return {string[]} 回傳欄位值組成的陣列
    */
    LineDataObjToArray(LineData) {
        let tNLineData = [];
        this.FullDataObjOrder.forEach(function (item) {
            if (LineData[item] != null) {
                tNLineData.push(LineData[item]);
            }
        });
        return tNLineData;
    }
}
/**定義頁面屬性
 * 一個頁面對應一個Table
 * @extends FormInf*/
export class PageInf extends FormInf {
    /**初始化頁面屬性
     * @param {string} tPageName 表單名稱
     * @param {Array<string>} tFieldArr 欄位名稱(來自ID="FieldName"的DOM InnerHtml)
     * @param {Array<boolean | number | string>} tNecessaryArr 是否必填(來自ID="Necessary"的DOM InnerHtml)
     * @param {Array<boolean | number | string>} tModifiableArr 可否修改
     */
    constructor(tPageName, tFieldArr, tNecessaryArr, tModifiableArr) {
        super(tPageName, tFieldArr, tNecessaryArr, tModifiableArr);
        /**Page名稱 */
        this.PageName = this.FormName;
        /**目前取得第幾頁的資料，用於分頁搜尋。-1為全部結果 */
        this.PageNumber = -1;
        /**預設一頁10筆 */
        this.APageCount = 10;
        /**目前表格是否為編輯模式 */
        this.isWriteMode = false;
        /**上次的查詢條件 */
        this.LastQuery = {};
        /**父PageName */
        this.ParentName = '';
        /**子PageName */
        this.ChildName = [];
        /**此Form所在div id(區塊搜尋才會用到) */
        this.BlockId = '';
        /**此Form所含的子div id(區塊搜尋才會用到) */
        this.SubBlockId = [];
        let ps = new set.PageSet();
        let tmpNumberArr = ps.DefineSearPageInf(tPageName);
        this.PageNumber = tmpNumberArr[0];
        this.APageCount = tmpNumberArr[1];
    }
    /**定義此PageName的Title */
    SetTableTitle(data) {
        let ps = new set.PageSet();
        if (set.PageSetObj.NeedResetFieldArr.indexOf(this.PageName) > -1) {
            let tmpObj = ps.ResetFieldArr(this.PageName, data);
            if (tmpObj.FieldArr.length > 0) {
                this.TitleStrArr = tmpObj.FieldArr;
                this.ModifiableArr = this.ModifiableArr.map(function (item, i) { return item || tmpObj.ModifiableArr[i]; });
                this.NecessaryArr = tmpObj.NecessaryArr;
            }
        }
    }
}
/**此class定義搜尋模組，因搜尋其中的邏輯流程有些會有客製化設定，固定義於獨立的class，再由PageOperation繼承
 * @implements Search, ClickSearch
 */
class SearchOperation {
    /**重設搜尋Query的值(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
     * 因此程式結構這樣寫，設定的部分統一寫在PageSet)
     * @param {string} tPageName 頁面名稱
     * @param {string[]} sQuery 搜尋Query
     * @return {string[]} 回傳重新定義的搜尋陣列
     */
    ResetSearchQuery(tPageName, sQuery) {
        let ps = new set.PageSet();
        return ps.ResetSearchQuery(tPageName, sQuery);
    }
    /**重設搜尋Query的值(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
     * 因此程式結構這樣寫，設定的部分統一寫在PageSet)
     * @param {string} tPageName 頁面名稱
     * @param {string[]} Query 搜尋Query
     * @param {string[][]} data 搜尋結果陣列(二維)
     * @return {string} 回傳重新定義的Title
     */
    SetFormTitleFromQuery(tPageName, Query, data) {
        let ps = new set.PageSet();
        return ps.SetFormTitleFromQuery(tPageName, Query, data);
    }
    /**修改搜尋結果(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
     * 因此程式結構這樣寫，設定的部分統一寫在PageSet)
     * @param {string} tPageName 頁面名稱
     * @param {string[]} data 搜尋結果陣列
     * @return {string[] | { [key: string]: string }[]} 回傳重新定義的搜尋結果
     */
    EditSearchResult(tPageName, data) {
        let ps = new set.PageSet();
        return ps.EditSearchResult(tPageName, data);
    }
    /**點擊搜尋觸發的函式(cell欄位或其他)
     * @param {string} tPageName 頁面名稱
     * @param {string[]} qyStr 點擊搜尋的搜尋Query
     */
    static ClickSearch(tPageName, qyStr) {
        if (gPageObj.PageNameObj[tPageName] == null) {
            return;
        }
        let sbtn = $('#SearchBtn');
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
        document.getElementById('RowDataAreaTitle').innerHTML = tTitleStr;
        if (tPageNumber > -1) {
            Query.PageNumber = 1;
            Query.NumberPerAPage = ps.DefineMenuLength(tPageName)[0];
            //此動作流程是為了在分頁搜尋時先取得後端回傳的Title
            //此搜尋Query跟搜尋第一頁的搜尋結果一模一樣，再由後端將結果存入快取
            doAjax('Search', true, Query, function (FirstData) {
                if (Query.PageNumber == 1 && FirstData.length > 0) {
                    FirstData[0] = FirstData[0].split(';')[1];
                }
                gPageObj.PageNameObj[tPageName].SetTableTitle(FirstData.length > 0 ? FirstData[0].split(',') : []);
                let tmpTitle = ps.MakeTableTitle(FirstData.length > 0 ? FirstData[0].split(',') : [], tPageName);
                let tmpFieldArr = [];
                let ColumnObj = [];
                for (let i = 0; tmpTitle.length > 0 && i < tmpTitle[0].length; i++) {
                    let tmpStr = '';
                    for (let j = 0; j < tmpTitle.length; j++) {
                        tmpStr += tmpTitle[j][i];
                    }
                    tmpFieldArr.push(tmpStr);
                }
                if (set.PageSetObj.noDeletePage.indexOf(tPageName) < 0) {
                    tmpFieldArr.push('功能');
                }
                for (let i = 0; i < tmpFieldArr.length; i++) {
                    ColumnObj.push({ data: tmpFieldArr[i], title: tmpFieldArr[i] });
                }
                let TableIdName = Query.PageName + 'Table';
                let AttributeStr = 'id="' + TableIdName + '" class="hover row-border stripe order-column table table-striped whitespace-nowrap" style="width:100%"';
                let tTableHtml = '<table ' + AttributeStr + '></table>';
                //let tTableTitle: string[] = gPageObj.PageNameObj[tPageName].TitleStrArr;
                let ExcelHtmlStr = '<button type="button" class="btn btn-primary" style="margin:3px;float:left" id="ExportBtn" onclick="PageOperation.ExportExcel(\'' + tPageName + '\')" data-loading-text="Downloading..."><i class="fa fa-download"></i>匯出</button>';
                document.getElementById('RowDataAreaText').innerHTML = ExcelHtmlStr + '<br>' + tTableHtml;
                let AllResultCount = 0;
                let tTableInf = {
                    language: set.lang,
                    stripeClasses: ["odd", "even"],
                    processing: true,
                    serverSide: true,
                    searching: false,
                    orderMulti: false,
                    scrollY: '65vh',
                    scrollCollapse: true,
                    scrollX: true,
                    order: [],
                    ordering: false,
                    columnDefs: [{
                            "targets": 'nosort',
                            "orderable": false //包含上樣式名‘nosort’的禁止排序
                        }],
                    lengthMenu: [ps.DefineMenuLength(tPageName), ps.DefineMenuLength(tPageName)],
                    //bLengthChange: false,
                    ajax: function (data, callback, settings) {
                        if (gPageObj.PageNameObj[tPageName].AjaxStatus != null) {
                            gPageObj.PageNameObj[tPageName].AjaxStatus.abort();
                            gPageObj.PageNameObj[tPageName].AjaxStatus = null;
                        }
                        Query.PageNumber = (data.start / data.length) + 1; //當前頁碼
                        //gPageObj.PageNameObj[tPageName].PageNumber = Query.PageNumber;
                        /*param.start = data.start;//開始的記錄序號
                        param.page = (data.start / data.length) + 1;//當前頁碼
                        param.start = (Query.PageNumber - 1) * data.length;//開始的記錄序號*/
                        Query.NumberPerAPage = data.length; //頁面顯示記錄條數，在頁面顯示每頁顯示多少項的時候
                        //console.log(param);
                        //ajax請求數據
                        gPageObj.PageNameObj[tPageName].AjaxStatus = doAjax2('Search', true, Query, function (result) {
                            if (Query.PageNumber == 1 && result.length > 0) {
                                let tArr = result[0].split(';');
                                AllResultCount = parseInt(tArr[0]);
                                result[0] = tArr[1];
                            }
                            result = so.EditSearchResult(tPageName, result);
                            let returnData = {
                                draw: data.draw,
                                recordsTotal: AllResultCount,
                                recordsFiltered: AllResultCount,
                                data: []
                            };
                            gPageObj.PageNameObj[tPageName].FullData = [];
                            let tmpObj = new Array();
                            for (let i = 0; i < result.length; i++) {
                                let tmpArr = result[i].split(',');
                                gPageObj.PageNameObj[tPageName].FullData.push(tmpArr);
                                let tObj = {};
                                for (let j = 0; j < tmpArr.length; j++) {
                                    tObj[tmpFieldArr[j]] = tmpArr[j];
                                }
                                if (set.PageSetObj.noDeletePage.indexOf(tPageName) < 0) {
                                    tObj['功能'] = '<button type="button" class="btn btn-danger DeleteFun write" ' + (gPageObj.PageNameObj[tPageName].isWriteMode ? '' : 'style="display:none"') + '>刪除</button>';
                                }
                                tmpObj.push(tObj);
                            }
                            returnData.data = tmpObj;
                            //$('select.selectpicker').selectpicker();
                            callback(returnData);
                            gPageObj.PageNameObj[tPageName].AjaxStatus = null;
                            if (document.getElementById('RowDataArea').style.display != 'block') {
                                ButtonClickSimulation('#RowDataAreaBtn');
                            }
                            pt.LoadingMask('none');
                            //sbtn.button('reset');
                            SetButtonDisable('SearchBtn', false, '搜尋');
                        });
                    },
                    //列表表頭欄位
                    columns: ColumnObj
                };
                let table = $('#' + TableIdName).DataTable(tTableInf);
                //此處需調用api()方法,否則返回的是JQuery對象而不是DataTables的API對象
            });
        }
        else {
            if (gPageObj.PageNameObj[tPageName].AjaxStatus != null) {
                gPageObj.PageNameObj[tPageName].AjaxStatus.abort();
                gPageObj.PageNameObj[tPageName].AjaxStatus = null;
            }
            gPageObj.PageNameObj[tPageName].AjaxStatus = doAjax2('Search', true, Query, function (data) {
                document.getElementById('RowDataAreaText').innerHTML = '明細';
                gPageObj.PageNameObj[tPageName].SetTableTitle(data);
                let tmpTitle = new Array();
                tmpTitle = ps.MakeTableTitle(data, tPageName);
                so.EditSearchResult(tPageName, data);
                //ps.FieldColor(data, tPageName);
                let pm = new PageMake();
                let TableIdName = Query.PageName + 'Table';
                let AttributeStr = 'id="' + TableIdName + '" class="hover row-border stripe order-column table table-striped whitespace-nowrap" style="width:100%"';
                let tableHtml = pm.CreatReadWriteTable(tPageName, data, AttributeStr, tmpTitle);
                document.getElementById('RowDataAreaText').innerHTML = tableHtml;
                let TableObj = {
                    language: set.lang,
                    scrollY: '65vh',
                    paging: set.PageSetObj.noPage.indexOf(tPageName) > -1 ? false : true,
                    scrollX: true,
                    searching: set.PageSetObj.noInSearchingPage.indexOf(tPageName) > -1 ? false : true,
                    ordering: set.PageSetObj.noSortPage.indexOf(tPageName) > -1 ? false : true,
                    scrollCollapse: true,
                };
                if (ps.DefineMenuLength(tPageName).length > 0) {
                    TableObj.lengthMenu = [ps.DefineMenuLength(tPageName), ps.DefineMenuLength(tPageName)];
                }
                if (set.PageSetObj.NeedExport.indexOf(tPageName) > -1) {
                    TableObj['dom'] = 'Bfrtip';
                    TableObj['buttons'] = ['excel'];
                }
                let t2 = $('#' + TableIdName).DataTable(TableObj);
                $.fn.dataTable.ext.search.push(function (settings, LineData, tIndex) {
                    let tFPageName = settings.sTableId.replace('Table', '');
                    let SearchText = $('.dataTables_filter').find('input').val().toString().toLowerCase();
                    if (SearchText == '') {
                        return true;
                    }
                    else {
                        for (let i = 0; i < gPageObj.PageNameObj[tFPageName].FullData[tIndex].length; i++) {
                            let tmpSelectList = ps.GetListArr(tFPageName, gPageObj.PageNameObj[tFPageName].TitleStrArr[i], false);
                            if (set.PageSetObj.NoChangePage.indexOf(tFPageName) < 0 && tmpSelectList.length > 0) {
                                let GetValue = pt.GetListValue(ps.GetMenuName(tFPageName, gPageObj.PageNameObj[tFPageName].TitleStrArr[i], false), gPageObj.PageNameObj[tFPageName].FullData[tIndex][i]);
                                if (GetValue.toLowerCase().indexOf(SearchText) > -1) {
                                    return true;
                                }
                            }
                            else if (gPageObj.PageNameObj[tFPageName].FullData[tIndex][i].toLowerCase().indexOf(SearchText) > -1) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                $('.buttons-excel').addClass('btn btn-primary');
                ButtonClickSimulation('#RowDataAreaBtn');
                pt.LoadingMask('none');
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
                gPageObj.PageNameObj[tPageName].AjaxStatus = null;
            });
        }
    }
    /**頁面搜尋觸發的函式
     * @param {string} tPageName 頁面名稱
     * @param {number} JumPage 搜尋結果指定呈現的頁面
     */
    static Search(tPageName, JumPage) {
        let sbtn = $('#SearchBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        let tmpPageName = tPageName == null ? (gPageObj.PageNameArr.length > 0 ? gPageObj.PageNameArr[0] : '') : tPageName;
        //預設搜尋第一個PageName
        if (tmpPageName == null) {
            return;
        }
        let ps = new set.PageSet();
        let domId = 'field_';
        let tNumberPerAPage = ps.DefineSearPageInf(tmpPageName)[1];
        let PageNumber = ps.DefineSearPageInf(tmpPageName)[0];
        let bu = GetSelectValue('BU') || '';
        if (typeof bu == 'object') {
            bu = bu.join('@');
        }
        let Query = {
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
            let tmpValue = tmpDom.val();
            let display = tmpDom.parent().find('label').css('display').toString();
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
                    if (tmpValue[0] == '') {
                        tmpValue = '';
                    } //多選若只要選到All，則直接All
                    else {
                        tmpValue = tmpValue.join('@');
                    }
                }
                else {
                    tmpValue = tmpValue.trim();
                }
                if (tmpValue == null || tmpValue == undefined) {
                    tmpValue = '';
                }
                tmpValue = tmpValue.replace(/”/g, '"');
            }
            if (tmpValue.length > 0) {
                fQueryArr.push(tmpValue);
            }
            else {
                fQueryArr.push('');
            }
        }
        let TableObj = {}; //顯現Table的屬性
        let HiddenTableObj = {}; //隱藏Table的屬性
        let WidthArr = new Array(); //欄位寬度
        if (set.PageSetObj.NeedExport.indexOf(tmpPageName) > -1) {
            HiddenTableObj = {
                language: set.lang,
                lengthMenu: [[10, 30, 50], [10, 30, 50]],
                scrollY: false,
                scrollX: true,
                scrollCollapse: true,
                searching: false,
                ordering: false,
                dom: 'Bfrtip',
                buttons: [
                    //'excel'
                    {
                        extend: 'excel',
                    },
                ]
            };
        }
        TableObj = {
            language: set.lang,
            scrollY: false,
            scrollX: true,
            scrollCollapse: true,
            autoWidth: false
        };
        if (ps.DefineMenuLength(tmpPageName).length > 0) {
            TableObj.lengthMenu = [ps.DefineMenuLength(tmpPageName), ps.DefineMenuLength(tmpPageName)];
        }
        if (TableObj.lengthMenu && TableObj.lengthMenu[0].length == 1) {
            TableObj.bLengthChange = false;
            TableObj.bInfo = false;
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
        if (set.PageSetObj.TableNeedDefer.indexOf(tmpPageName) > -1) {
            TableObj.deferRender = true;
            TableObj.orderClasses = false;
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
        let cr = new set.ColorRuleClass();
        let so = new SearchOperation();
        so.ResetSearchQuery(tmpPageName, fQueryArr);
        Query.QueryArr = fQueryArr;
        gPageObj.PageNameObj[tmpPageName].LastQuery = Query;
        let tfixedColumns = ps.GetDataTableFreezeValue(tmpPageName);
        if (tfixedColumns != undefined) {
            TableObj.fixedColumns = { leftColumns: tfixedColumns };
        }
        if (set.PageSetObj.NeedExport.indexOf(tmpPageName) > -1) {
            let tmpTitle = ps.SetFormTitleFromQuery(tmpPageName, Query.QueryArr);
            if (tmpTitle != '') {
                HiddenTableObj.buttons.forEach(function (object) {
                    object['title'] = tmpTitle;
                });
            }
        }
        cr.SetColorRuleFromFront(tmpPageName);
        if (!ps.CheckSearchQuery(tmpPageName, fQueryArr)) {
            SetButtonDisable('SearchBtn', false, '搜尋');
            return;
        }
        if (PageNumber >= 1) {
            Query.PageNumber = 1;
            Query.NumberPerAPage = ps.DefineMenuLength(tmpPageName)[0];
            //此動作流程是為了在分頁搜尋時先取得後端回傳的Title
            //此搜尋Query跟搜尋第一頁的搜尋結果一模一樣，再由後端將結果存入快取
            doAjax('Search', true, Query, function (FirstData) {
                if (Query.PageNumber == 1 && FirstData.length > 0) {
                    FirstData[0] = FirstData[0].split(';')[1];
                }
                gPageObj.PageNameObj[tmpPageName].SetTableTitle(FirstData.length > 0 ? FirstData[0].split(',') : []);
                let tAddRowCount = 0; //增加幾個row計數
                let tAddRowObj = {}; //新增的obj暫存。key是計數，value是對應的欄位內容
                let ColumnObj = new Array();
                let TableIdName = tmpPageName + 'Table';
                let AttributeStr = 'id="' + TableIdName + '" class="row-border table-striped whitespace-nowrap" style="width:100%;"';
                let tmpTitle = ps.MakeTableTitle(FirstData.length > 0 ? FirstData[0].split(',') : [], tmpPageName);
                let pm = new PageMake();
                let FieldArr = gPageObj.PageNameObj[tmpPageName].TitleStrArr;
                let tmpFieldArr = [];
                for (let i = 0; tmpTitle.length > 0 && i < tmpTitle[0].length; i++) {
                    let tmpStr = '';
                    for (let j = 0; j < tmpTitle.length; j++) {
                        tmpStr += tmpTitle[j][i];
                    }
                    tmpFieldArr.push(tmpStr);
                }
                if (set.PageSetObj.noDeletePage.indexOf(tmpPageName) < 0) {
                    tmpFieldArr.push('功能');
                }
                for (let i = 0; i < tmpFieldArr.length; i++) {
                    ColumnObj.push({ data: tmpFieldArr[i], title: tmpFieldArr[i] });
                }
                let ttt = '<table ' + AttributeStr + '></table>';
                let tDom = document.getElementById('TableArea');
                if (tDom != null) {
                    tDom.innerHTML = ttt;
                }
                let headerHtml = pm.CreatTableTitle(tmpPageName, 'thead', set.PageSetObj.noDeletePage.indexOf(tmpPageName) > -1 ? [] : ['功能'], tmpTitle);
                let ShieldIdxArr = ps.NeedShieldField(tmpPageName);
                let AllResultCount = 0;
                TableObj.language = set.lang;
                TableObj.processing = true;
                TableObj.serverSide = true;
                TableObj.orderMulti = false;
                TableObj.ajax = function (data, callback, settings) {
                    if (gPageObj.PageNameObj[tmpPageName].AjaxStatus != null) {
                        gPageObj.PageNameObj[tmpPageName].AjaxStatus.abort();
                        gPageObj.PageNameObj[tmpPageName].AjaxStatus = null;
                    }
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
                    gPageObj.PageNameObj[tmpPageName].AjaxStatus = doAjax2('Search', true, Query, function (result) {
                        if (Query.PageNumber == 1 && result.length > 0) {
                            let tArr = result[0].split(';');
                            AllResultCount = parseInt(tArr[0]);
                            result[0] = tArr[1];
                        }
                        let so = new SearchOperation();
                        result = so.EditSearchResult(tmpPageName, result);
                        let returnData = {
                            draw: data.draw,
                            recordsTotal: AllResultCount,
                            recordsFiltered: AllResultCount,
                            data: []
                        };
                        let tmpObj = new Array();
                        if (gPageObj.PageNameObj[tmpPageName].isWriteMode) {
                            for (let i = 1; i <= tAddRowCount; i++) {
                                if (tAddRowObj[i] != null) {
                                    tmpObj.push(tAddRowObj[i]);
                                }
                            }
                        }
                        gPageObj.PageNameObj[tmpPageName].FullData = [];
                        for (let i = 0; i < result.length; i++) {
                            let tmpArr = result[i].split(',');
                            gPageObj.PageNameObj[tmpPageName].FullData.push(tmpArr);
                            let tObj = {};
                            for (let j = 0; j < tmpArr.length; j++) {
                                tObj[tmpFieldArr[j]] = tmpArr[j];
                            }
                            if (set.PageSetObj.noDeletePage.indexOf(tmpPageName) < 0) {
                                tObj['功能'] = '<button type="button" class="btn btn-danger DeleteFun write" ' + (gPageObj.PageNameObj[tmpPageName].isWriteMode ? '' : 'style="display:none"') + '>刪除</button>';
                            }
                            tmpObj.push(tObj);
                        }
                        returnData.data = tmpObj;
                        $('select.selectpicker').selectpicker();
                        callback(returnData);
                        //sbtn.button('reset');
                        gPageObj.PageNameObj[tmpPageName].AjaxStatus = null;
                        SetButtonDisable('SearchBtn', false, '搜尋');
                    });
                };
                TableObj.columns = ColumnObj;
                TableObj.createdRow = function (row, data, index) {
                    var _a;
                    let LineArr = [];
                    let op = new set.OnclickPage();
                    let dc = new set.DynamicClass();
                    let cr = new set.ColorRuleClass();
                    let df = new set.DynamicFunction();
                    let pm = new PageMake();
                    let pt = new PageTool();
                    let vd = new set.ValueDisplay();
                    let tmpArr = [];
                    let KeyValueArr = [];
                    let ValueIdArr = [];
                    let tFieldNameArr = [];
                    let isWriteMode = gPageObj.PageNameObj[tmpPageName].isWriteMode;
                    for (let i = 0; i < tmpFieldArr.length; i++) {
                        tmpArr.push(data[tmpFieldArr[i]]);
                    }
                    if (set.PageSetObj.noDeletePage.indexOf(tmpPageName) < 0) {
                        tmpArr.push(data['功能']);
                    }
                    cr.InitColorObj(tmpPageName, [tmpArr]);
                    let tmpModifuableArr = ps.CheckFieldModifiable(tmpPageName, tmpArr);
                    for (let i = 0; i < tmpArr.length; i++) {
                        let ColorHtml = '';
                        let tdClick = '';
                        let tdClass = '';
                        let tdStyle = '';
                        let tdId = 'cell_' + index.toString() + '_' + i.toString();
                        let aPart = '';
                        let MenuPart = '';
                        let bPart = '';
                        if (!gPageObj.PageNameObj[tmpPageName].ModifiableArr[i] && op.FieldIsOnclick(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[0])) {
                            tdClick = op.GetOnclickHtml(tmpPageName, tmpPageName + '_LIST', gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[0], tmpArr);
                        }
                        ColorHtml = cr.CheckColorRule(0, i);
                        tdClass = (tdClick != '' ? 'ClickSearch' : '');
                        tdStyle = ColorHtml + (ShieldIdxArr.indexOf(i) > -1 ? 'display:none;' : '');
                        if (set.TableSetObj.SetRight.indexOf(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]) > -1) {
                            tdClass = (tdClick != '' ? 'ClickSearch' : '');
                            tdStyle += 'text-align:right !important;';
                        }
                        if (ps.NeedCheckSimilarity(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i])) {
                            CheckArr.push(tmpArr[i]);
                        }
                        let tmpSelectList = ps.GetListArr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false);
                        let tmpAttrStr = pm.MakeWidthAttributeStr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], '', gPageObj.PageNameObj[tmpPageName].isWriteMode ? 'Write' : 'Read');
                        if (dc.NeedDynamicGetList(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false)) {
                            tmpAttrStr += ' onchange="' + dc.ReturnFunctionStr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false, tdId) + '"';
                            for (let key in (_a = dc.DynamicInfObj[tmpPageName].InfluenceToFieldNames) === null || _a === void 0 ? void 0 : _a[gPageObj.PageNameObj[tmpPageName].TitleStrArr[i]]) {
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
                        if (set.PageSetObj.NoChangePage.indexOf(tmpPageName) > -1) {
                            aPart += tmpArr[i];
                        }
                        else if (vd.NeedChangeDisplay(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpPageName, tmpArr[0], tmpArr[i])) {
                            let tStr = '<span class="MoneyFormat ' + tmpReadHtml + '"' + (isWriteMode ? ' style="display:none"' : '') + '>' + vd.NeedModifyDisplay(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpArr[i], tmpPageName, tmpArr[0]) + '</span><span class="RealNumber" style="display:none">' + tmpArr[i] + '</span>';
                            aPart += tStr;
                        }
                        else if (tmpSelectList != null && tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpPageName, tmpArr[i])) {
                            let tStr = '';
                            if (tmpReadHtml.length > 0) {
                                tStr = '<span class="' + tmpReadHtml + '"' + (isWriteMode ? ' style="display:none"' : '') + '>' + pt.GetListValue(ps.GetMenuName(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false), tmpArr[i]) + '</span>';
                            }
                            else {
                                tStr = '<span>' + pt.GetListValue(ps.GetMenuName(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], false), tmpArr[i]) + '</span>';
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
                        LineArr.push({
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
                        let tAttrStr = pm.MakeWidthAttributeStr(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr[tIdx], '', gPageObj.PageNameObj[tmpPageName].isWriteMode ? 'Write' : 'Read');
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
                    if (set.PageSetObj.noDeletePage.indexOf(tmpPageName) < 0) {
                        $('td', row).eq(tmpArr.length).html('<button type="button" class="btn btn-danger DeleteFun write" ' + (gPageObj.PageNameObj[tmpPageName].isWriteMode ? '' : 'style="display:none"') + '>刪除</button>');
                    }
                };
                TableObj.rowCallback = function (row, data) {
                    var _a;
                    if (gPageObj.PageNameObj[tmpPageName].isWriteMode) {
                        for (let i = 0; $('td:eq(' + i + ')', row).html() != null; i++) {
                            if ($('td:eq(' + i + ') select', row).html() != null) {
                                $('td:eq(' + i + ') select', row).selectpicker('render'); //可搜尋下拉式初始化 
                            }
                            if ($('td:eq(' + i + ') .MoneyFormat', row).html() != null && (((_a = $('td:eq(' + i + ') .MoneyFormat', row).attr('class')) === null || _a === void 0 ? void 0 : _a.indexOf('read')) || -1) < 0) {
                                $('td:eq(' + i + ') .MoneyFormat', row).css('display', 'block');
                            }
                        }
                    }
                };
                TableObj.drawCallback = function (settings) {
                    let api = this.api();
                    let CurrentPageData = api.rows({ page: 'current' }).data();
                    ps.MergeTableValue(tmpPageName);
                    ps.AlignedHeader(tmpPageName);
                    ps.FreezeField(tmpPageName);
                };
                if (tmpTitle.length > 0 && tmpTitle[0].length > 0) {
                    headerHtml = headerHtml.replace('<thead>', '').replace('</thead>', '');
                    TableObj.headerCallback = function (thead, data, start, end, display) {
                        $(thead).parent().html(headerHtml);
                    };
                }
                let t = $('#' + tmpPageName + 'Table').DataTable(TableObj);
                //此處需調用api()方法,否則返回的是JQuery對象而不是DataTables的API對象
                $('#addRow').unbind().on('click', function () {
                    tAddRowCount++;
                    let tmpArr = PageOperation.AddRowInitValueList(tmpPageName);
                    let tNode = {};
                    for (let i = 0; i < tmpFieldArr.length; i++) {
                        tNode[tmpFieldArr[i]] = tmpArr[i];
                    }
                    if (set.PageSetObj.noDeletePage.indexOf(tmpPageName) < 0) {
                        tNode['功能'] = '<button type="button" class="btn btn-danger DeleteFun write" ' + (gPageObj.PageNameObj[tmpPageName].isWriteMode ? '' : 'style="display:none"') + '>刪除</button>';
                    }
                    tAddRowObj[tAddRowCount] = tNode;
                    t.page(0).draw('page');
                    ps.FreezeField(tmpPageName);
                });
                $('#' + TableIdName + ' tbody').unbind().on('click', 'tr td .DeleteFun', function () {
                    $(this).parent().parent('tr').css('display', 'none');
                    if ($(this).parent().parent('tr').find('td').eq(0).html() == '') {
                        tAddRowCount--;
                    }
                });
            });
        }
        else {
            if (gPageObj.PageNameObj[tmpPageName].AjaxStatus != null) {
                gPageObj.PageNameObj[tmpPageName].AjaxStatus.abort();
                gPageObj.PageNameObj[tmpPageName].AjaxStatus = null;
            }
            gPageObj.PageNameObj[tmpPageName].AjaxStatus = doAjax2('Search', true, Query, function (data) {
                let pm = new PageMake();
                let ps = new set.PageSet();
                let pt = new PageTool();
                let vd = new set.ValueDisplay();
                gPageObj.PageNameObj[tmpPageName].SetTableTitle(data);
                let so = new SearchOperation();
                let tdata = so.EditSearchResult(tmpPageName, data);
                if (set.PageSetObj.NeedCheckDecimalPoint.indexOf(tmpPageName) > -1) {
                    tdata = CheckDecimalPoint(tdata);
                }
                if (set.PageSetObj.ChartPage.indexOf(tmpPageName) > -1) {
                    pm.MakeChart(tmpPageName, tdata);
                }
                let TableIdName = tmpPageName + 'Table';
                let AttributeStr = 'id="' + TableIdName + '" class="hover row-border stripe order-column table table-striped whitespace-nowrap" style="width:100%;"';
                let tmpTitle = new Array();
                //gPageObj.PageNameObj[tmpPageName].SetTableTitle(data.length > 0 ? data[0].split(',') : undefined);
                tmpTitle = ps.MakeTableTitle(tdata, tmpPageName);
                let TableHtml = pm.CreatReadWriteTable(tmpPageName, tdata, AttributeStr, tmpTitle);
                let preTableHtml = ps.TableInfHtml(tmpPageName);
                let tDom = document.getElementById('TableArea');
                if (tDom != null) {
                    tDom.innerHTML = TableHtml;
                }
                let HiddenTableIdName = tmpPageName + 'TableHidden';
                if (set.PageSetObj.NeedExport.indexOf(tmpPageName) > -1 && document.getElementById('HiddenTableArea')) {
                    let qy = ps.GetExportQuery(tmpPageName, tdata, tmpTitle);
                    let HiddenHtml = pt.CreatTable(qy, 'id="' + HiddenTableIdName + '" style="width:100%"');
                    let tDom = document.getElementById('HiddenTableArea');
                    if (tDom != null) {
                        tDom.innerHTML = HiddenHtml;
                    }
                    HiddenTableObj = ps.DataTableExportCustomize(tmpPageName, tdata, HiddenTableObj);
                }
                let HaveMillion = false;
                let UnitMode = GetSelectValue('單位');
                for (let i = 0; i < gPageObj.PageNameObj[tmpPageName].TitleStrArr.length; i++) {
                    if (vd.NeedMillionFormat(gPageObj.PageNameObj[tmpPageName].TitleStrArr[i], tmpPageName) && UnitMode != '數量') {
                        HaveMillion = true;
                        break;
                    }
                }
                if (HaveMillion || preTableHtml != '') {
                    TableObj.dom = '<"toolbar">frtip';
                }
                let t = $('#' + TableIdName);
                let t2 = $('#' + HiddenTableIdName);
                if (set.PageSetObj.noDataTable.indexOf(tmpPageName) < 0 && document.getElementById(TableIdName)) {
                    t = t.DataTable(TableObj);
                    $.fn.dataTable.ext.search.push(function (settings, LineData, tIndex) {
                        let tFPageName = settings.sTableId.replace('Table', '');
                        let SearchText = $('.dataTables_filter').find('input').val().toString().toLowerCase();
                        if (SearchText == '') {
                            return true;
                        }
                        else {
                            for (let i = 0; i < gPageObj.PageNameObj[tFPageName].FullData[tIndex].length; i++) {
                                let tmpSelectList = ps.GetListArr(tFPageName, gPageObj.PageNameObj[tFPageName].TitleStrArr[i], false);
                                if (set.PageSetObj.NoChangePage.indexOf(tFPageName) < 0 && tmpSelectList.length > 0) {
                                    let GetValue = pt.GetListValue(ps.GetMenuName(tFPageName, gPageObj.PageNameObj[tFPageName].TitleStrArr[i], false), gPageObj.PageNameObj[tFPageName].FullData[tIndex][i]);
                                    if (GetValue.toLowerCase().indexOf(SearchText) > -1) {
                                        return true;
                                    }
                                }
                                else if (gPageObj.PageNameObj[tFPageName].FullData[tIndex][i].toLowerCase().indexOf(SearchText) > -1) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    });
                }
                if (document.getElementById(HiddenTableIdName)) {
                    t2 = t2.DataTable(HiddenTableObj);
                }
                ps.FreezeField(tmpPageName);
                ps.MergeTableValue(tmpPageName);
                if (set.PageSetObj.noDataTable.indexOf(tmpPageName) < 0) {
                    $('#' + TableIdName).DataTable().draw();
                }
                if (JumPage != null) {
                    gPageObj.PageNameObj[tmpPageName].isWriteMode = false;
                    PageOperation.CheckReadWriteMode(false);
                    t.page(JumPage).draw('page');
                }
                $('#addRow').on('click', function () {
                    let ps = new set.PageSet();
                    let tmpArr = PageOperation.AddRowInitList(tmpPageName);
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
                    $('tr *:not([id]) select.selectpicker').selectpicker(); //可搜尋下拉式初始化
                    for (let i = 0; i < set.TableSetObj.DatePickerArr.length; i++) {
                        let tIdx = gPageObj.PageNameObj[tmpPageName].TitleStrArr.indexOf(set.TableSetObj.DatePickerArr[i]);
                        if (tIdx > -1) {
                            for (let i = -1; $('#cell_' + i.toString() + '_' + tIdx.toString()).html(); i--) {
                                $('#cell_' + i.toString() + '_' + tIdx.toString()).datetimepicker(ps.SetDatePick(tmpPageName, set.TableSetObj.DatePickerArr[i]));
                            }
                        }
                    }
                    //t.draw();
                    t.page(0).draw('page');
                    ps.FreezeField(tmpPageName);
                });
                $('#' + TableIdName + ' tbody').on('click', 'tr td .DeleteFun', function () {
                    $(this).parent().parent('tr').css('display', 'none');
                });
                /**可能是新版datatable.js的用法 */
                $('.sorting').on('click', function () {
                    $('#' + TableIdName + ' select.selectpicker:last-child').selectpicker();
                    ps.FreezeField(tmpPageName);
                });
                /**可能是舊版datatable.js的用法 */
                /*$('.sorting_asc').on('click', function () {//排序時觸發
                    $('#' + TableIdName + ' select.selectpicker:last-child').selectpicker();
                    ps.FreezeField(tmpPageName);
                });

                $('.sorting_desc').on('click', function () {//排序時觸發
                    $('#' + TableIdName + ' select.selectpicker:last-child').selectpicker();
                    ps.FreezeField(tmpPageName);
                });*/
                $('#' + TableIdName + '_info').bind('DOMNodeInserted', function (e) {
                    let ps = new set.PageSet();
                    $('#' + TableIdName + ' select.selectpicker:last-child').selectpicker();
                    for (let i = 0; i < set.TableSetObj.DatePickerArr.length; i++) {
                        let tIdx = gPageObj.PageNameObj[tmpPageName].TitleStrArr.indexOf(set.TableSetObj.DatePickerArr[i]);
                        if (tIdx > -1) {
                            let tCName = 'cell_' + tIdx;
                            $('.' + tCName + ' .form_date').datetimepicker(ps.SetDatePick(tmpPageName, set.TableSetObj.DatePickerArr[i]));
                        }
                    }
                    PageOperation.CheckReadWriteMode(false);
                    ps.FreezeField(tmpPageName);
                    ps.MergeTableValue(tmpPageName);
                });
                if (HaveMillion || preTableHtml != '') {
                    $('div.toolbar').html(preTableHtml);
                }
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
                $('#' + TableIdName + ' select.selectpicker:last-child').selectpicker('render'); //可搜尋下拉式初始化(只對顯示的第一頁初始化)
                for (let i = 0; i < set.TableSetObj.DatePickerArr.length; i++) {
                    let tIdx = gPageObj.PageNameObj[tmpPageName].TitleStrArr.indexOf(set.TableSetObj.DatePickerArr[i]);
                    if (tIdx > -1) {
                        let tCName = 'cell_' + tIdx;
                        $('.' + tCName + ' .form_date').datetimepicker(ps.SetDatePick(tmpPageName, set.TableSetObj.DatePickerArr[i]));
                    }
                }
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
                gPageObj.PageNameObj[tmpPageName].AjaxStatus = null;
            });
        }
    }
}
/**此class定義表單Table操作模組，繼承SearchOperation及TableOperation
 * @extends SearchOperation
 * @implements TableOperation
 */
export class TableAndSearchOperation extends SearchOperation {
    /**Update Submit
     * @param {string} tPageName 頁面名稱
     * @param {boolean} isAsync AJAX是否異步請求(預設true)
     */
    static UpdateSubmit(tPageName, isAsync) {
        var _a;
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        if (gPageObj.PageNameObj[tmpPageName] != null) {
            SetButtonDisable('UpdateSubmit', true, 'loading...');
            if (isAsync == null) {
                isAsync = true;
            }
            let idName = tmpPageName + 'Table';
            let tmpArr = $('#' + idName + ' tbody tr');
            let UpdateArr = new Array();
            let InsertArr = new Array();
            let DeleteArr = new Array();
            let isUpdate = false;
            let isDelete = false;
            let AllEmpty = true;
            let haveError = false;
            let ModifiableArr = gPageObj.PageNameObj[tmpPageName].ModifiableArr;
            let NecessaryArr = gPageObj.PageNameObj[tmpPageName].NecessaryArr;
            let ps = new set.PageSet();
            let tmpModifiableArr = ps.InitModifiable(tmpPageName, gPageObj.PageNameObj[tmpPageName].TitleStrArr);
            for (let i = 0; tmpArr.eq(i).html(); i++) {
                let tmpQueryStr = '';
                let getId = '';
                for (let j = 0; j < ModifiableArr.length; j++) {
                    let getValue;
                    let tmpDom;
                    if (tmpArr.eq(i).find('td').eq(j).css('display') == 'none') {
                        if (tmpArr.eq(i).find('td').eq(j).find('span').html() !== undefined) {
                            getValue = tmpArr.eq(i).find('td').eq(j).find('span').html();
                            tmpDom = tmpArr.eq(i).find('td').eq(j).find('span');
                        }
                        else {
                            getValue = tmpArr.eq(i).find('td').eq(j).html();
                            tmpDom = tmpArr.eq(i).find('td').eq(j);
                        }
                    }
                    else if (tmpArr.eq(i).find('td').eq(j).find('select.selectpicker').val() != null) { //一定要加 != null的判斷，不可用本身布林值來判斷，因為0會回傳false
                        getValue = tmpArr.eq(i).find('td').eq(j).find('select.selectpicker').val();
                        if (toType(getValue) == 'array') {
                            getValue = getValue.join('/');
                        }
                        tmpDom = tmpArr.eq(i).find('td').eq(j).find('.dropdown-toggle select.selectpicker');
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
                    getValue = getValue.replace(/,/g, '，').trim();
                    if (tmpArr.eq(i).css('display') != 'none') { //新增、修改
                        if (getValue != '') {
                            AllEmpty = false;
                        }
                        if (j == 0 && getValue != '') { //此tr是否為更新的數據
                            isUpdate = true;
                        }
                    }
                    else { //刪除
                        if (j == 0 && getValue != '') { //此tr是否為刪除的數據
                            isDelete = true;
                            AllEmpty = false;
                            getId = getValue;
                            break;
                        }
                        else { //沒有唯一識別碼表示此tr是新增出來又刪除的，直接忽略它
                            continue;
                        }
                    }
                    if (getValue == '表中數據為空') {
                        return;
                    }
                    if (j > 0 && !isDelete) {
                        if (HaveEscapeChar(getValue)) {
                            tmpArr.eq(i).find('td').eq(j).removeClass('has-warning'); //避免重複增加
                            tmpArr.eq(i).find('td').eq(j).addClass('has-warning');
                            tmpDom.attr('data-container', 'body');
                            tmpDom.attr('title', '值有誤').tooltip('show');
                            haveError = true;
                        }
                        else if (NecessaryArr[j] && getValue == '' && tmpModifiableArr[j]) {
                            tmpArr.eq(i).find('td').eq(j).removeClass('has-error'); //避免重複增加
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
            if (haveError) { //欄位值有誤
                SetButtonDisable('UpdateSubmit', false, '確定修改');
                return;
            }
            let bu = typeof GetSelectValue('BU') == 'object' ? (GetSelectValue('BU') || []).join('@') : ((_a = GetSelectValue('BU')) === null || _a === void 0 ? void 0 : _a.toString()) || '';
            UpdateArr = ps.ResetUpdateQuery(tmpPageName, UpdateArr, 'u');
            InsertArr = ps.ResetUpdateQuery(tmpPageName, InsertArr, 'i');
            let Query = {
                'PageName': tmpPageName,
                'BU': bu,
                'DeleteArr': DeleteArr,
                'UpdateArr': UpdateArr,
                'InsertArr': InsertArr
            };
            doAjax('Update', isAsync, Query, function (data) {
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
    /**切換檢視/編輯模式。; 根據現在的編輯模式狀態切換檢視/編輯模式。
     * @param {boolean} isClick 是否為Button觸發
     * @param {string} tPageName 頁面名稱
     */
    static CheckReadWriteMode(isClick, tPageName) {
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        if (isClick) { //是否點擊切換模式按鈕
            ViewChange('read');
            ViewChange('write');
            let tDom = document.getElementsByClassName('write');
            let tmpStyle = '';
            if (tDom != null) {
                tmpStyle = tDom[0].style.display;
            }
            if (tmpStyle == 'none') {
                gPageObj.PageNameObj[tmpPageName].isWriteMode = false;
            }
            else {
                gPageObj.PageNameObj[tmpPageName].isWriteMode = true;
            }
            let ps = new set.PageSet();
            let TableIdName = tmpPageName + 'Table';
            let t = $('#' + TableIdName).DataTable();
            let oriPage = t.page.info().page;
            //t.draw();
            t.page(oriPage).draw('page');
            ps.FreezeField(tmpPageName);
        }
        else {
            ViewChange2('read', !gPageObj.PageNameObj[tmpPageName].isWriteMode ? 'block' : 'none');
            ViewChange2('write', gPageObj.PageNameObj[tmpPageName].isWriteMode ? 'block' : 'none');
        }
    }
    /**新增欄位時，初始化選單欄位
     * @param {string} tPageName 頁面名稱
     * @return {string[]} 回傳html串列(一行)
     */
    static AddRowInitList(tPageName) {
        var _a;
        let tmpArr = new Array();
        let op = new set.OnclickPage();
        let ps = new set.PageSet();
        let pm = new PageMake();
        let dc = new set.DynamicClass();
        let df = new set.DynamicFunction();
        let ShieldIdxArr = ps.NeedShieldField(tPageName);
        let KeyValueArr = [];
        let ValueIdArr = [];
        let tFieldNameArr = [];
        let TriggerIdArr = [];
        if (gPageObj.PageNameObj[tPageName] == null) {
            return [];
        }
        for (let i = 0; i < gPageObj.PageNameObj[tPageName].ModifiableArr.length; i++) {
            let GetDefault = ps.AddLineDefaultValue(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i]);
            let tId = 'cell_' + AddLineCount + '_' + i.toString();
            let tAttrStr = ' id="' + tId + '"';
            if (ShieldIdxArr.indexOf(i) > -1) {
                tmpArr.push('<span></span>');
            }
            else if (gPageObj.PageNameObj[tPageName].ModifiableArr[i]) {
                let tmpSelectList = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], false);
                if (set.TableSetObj.DatePickerArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[i]) > -1) {
                    tAttrStr += ' ' + pm.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], '', gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read');
                    let FieldHtml = pm.MakeListHtml('Calendar', tAttrStr, tmpSelectList, GetDefault);
                    tmpArr.push(FieldHtml);
                }
                else if (op.FieldIsOnclick(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], '')) {
                    tmpArr.push('<input' + tAttrStr + ' class="form-control" title="新增模式不可上傳，請於修改模式中上傳" readonly>');
                }
                else if (GetDefault != '') { //有預設值，且不再需要更改
                    let tmpWidth = ps.MakeWidth(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read');
                    tmpArr.push('<input' + tAttrStr + ' class="form-control" value="' + GetDefault + '" style="width:' + tmpWidth + ';min-width:' + tmpWidth + '" readonly>');
                }
                else if (ps.NeedColorField(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i])) {
                    tmpArr.push('<input class="form-control" type="color"' + tAttrStr + ' value="">');
                }
                else {
                    tAttrStr += ' ' + pm.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], '', gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read');
                    if (dc.NeedDynamicGetList(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], false)) {
                        tAttrStr += ' onchange="' + dc.ReturnFunctionStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], false, tId) + '"';
                        for (let key in (_a = dc.DynamicInfObj[tPageName].InfluenceToFieldNames) === null || _a === void 0 ? void 0 : _a[gPageObj.PageNameObj[tPageName].TitleStrArr[i]]) {
                            let tMenuArr = set.MenuList[gPageObj.PageNameObj[tPageName].TitleStrArr[i]].MenuArr || [];
                            let tKeyValue = tMenuArr.length > 0 ? tMenuArr[0].substring(0, tMenuArr[0].indexOf(',')) : '';
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
                if (GetDefault != '') { //有預設值，且不再需要更改
                    tmpArr.push(GetDefault);
                }
                else {
                    tmpArr.push('');
                }
            }
        }
        tmpArr.push('<button type="button" class="btn btn-danger DeleteFun write"  style="display:none">刪除</button>'); //刪除欄位
        for (let i = 0; i < ValueIdArr.length; i++) {
            let tmpSelectList = pm.FrontDynamicMenuRequest(tPageName, tFieldNameArr[i], ValueIdArr[i], false, KeyValueArr[i]);
            let domId = ValueIdArr[i];
            let tIdx = Number(domId.substring(domId.lastIndexOf('_') + 1));
            let realDomId = 'cell_' + AddLineCount + '_' + tIdx.toString();
            let tAttrStr = ' id="' + realDomId + '" ' + pm.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[tIdx], '', gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read');
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
    /**新增欄位時，初始化選單欄位(僅value值，沒有html)
     * @param {string} tPageName 頁面名稱
     * @return {string[]} 欄位初始值串列(一行)
     */
    static AddRowInitValueList(tPageName) {
        let tmpArr = new Array();
        let op = new set.OnclickPage();
        let ps = new set.PageSet();
        let ShieldIdxArr = ps.NeedShieldField(tPageName);
        if (gPageObj.PageNameObj[tPageName] == null) {
            return [];
        }
        for (let i = 0; i < gPageObj.PageNameObj[tPageName].ModifiableArr.length; i++) {
            let GetDefault = ps.AddLineDefaultValue(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i]);
            if (ShieldIdxArr.indexOf(i) > -1) {
                tmpArr.push('');
            }
            else if (gPageObj.PageNameObj[tPageName].ModifiableArr[i]) {
                if (set.TableSetObj.DatePickerArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[i]) > -1) {
                    tmpArr.push(GetDefault);
                }
                else if (op.FieldIsOnclick(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], '')) {
                    tmpArr.push('');
                }
                else if (GetDefault != '') { //有預設值，且不再需要更改
                    tmpArr.push(GetDefault);
                }
                else if (ps.NeedColorField(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i])) {
                    tmpArr.push('');
                }
                else {
                    tmpArr.push('');
                }
            }
            else {
                if (GetDefault != '') { //有預設值，且不再需要更改
                    tmpArr.push(GetDefault);
                }
                else {
                    tmpArr.push('');
                }
            }
        }
        AddLineCount--;
        return tmpArr;
    }
    /**刪除Table某一行
     * @param {string} RowId 該行DOM ID(tr的id)
     */
    DeleteBtn(RowId) {
        document.getElementById(RowId).style.display = 'none';
    }
    /**取消修改
     * @param {string} tPageName 頁面名稱
     */
    static ReSetWrite(tPageName) {
        let tmpPageName = '';
        if (gPageObj.PageNameArr.length == 0) {
            return;
        }
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let TableIdName = tmpPageName + 'Table';
        let t = $('#' + TableIdName).DataTable();
        let oriPage = t.page.info().page;
        this.CheckReadWriteMode(true, tmpPageName);
        PageOperation.Search(tmpPageName, oriPage);
    }
    /**數據重載(先呼叫後端去除快取的function，再重新搜尋)
     * @param {string} tPageName 頁面名稱
     */
    static ReloadData(tPageName) {
        let tmpPageName = '';
        if (gPageObj.PageNameArr.length == 0) {
            return;
        }
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        var sbtn = $('#ReloadBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        doAjax('Reload', true, gPageObj.PageNameObj[tmpPageName].LastQuery, function () {
            PageOperation.Search(tmpPageName);
            setTimeout(function () {
                //sbtn.button('reset');
                SetButtonDisable('SearchBtn', false, '搜尋');
            }, 1000);
        });
    }
}
/**此class定義Page的操作功能
 * PageName底下操作功能定義於此
 * @extends TableAndSearchOperation
 */
export class PageOperation extends TableAndSearchOperation {
    /**Update點擊觸發的功能。
     * 此函式還未將Query傳入後端
     * @param {string} tPageName 頁面名稱
     */
    UpdateClick(tPageName) {
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
                    let getValue = '';
                    if (tmpArr.eq(i).find('td').eq(j).find('select.selectpicker').val() != null) { //一定要加 != null的判斷，不可用本身布林值來判斷，因為0會回傳false
                        getValue = tmpArr.eq(i).find('td').eq(j).find('select.selectpicker').val();
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
                    if (tmpArr.eq(i).css('display') != 'none') { //新增、修改
                        if (j == 0 && getValue != '') { //此tr是否為更新的數據
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
                if (tSeg[0] == ',') {
                    tSeg = tSeg.substring(1);
                }
                if (tSeg[tSeg.length - 1] == ',') {
                    tSeg = tSeg.substring(0, tSeg.length - 1);
                }
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
                if (tDom != null) {
                    tDom.innerHTML = '更新';
                }
                tDom = document.getElementById('UpdateAlertText');
                if (tDom != null) {
                    tDom.innerHTML = '確定更新此頁嗎？';
                }
            }
            else {
                let tDom = document.getElementById('UpdateAlertTitle');
                if (tDom != null) {
                    tDom.innerHTML = '注意';
                }
                tDom = document.getElementById('UpdateAlertText');
                if (tDom != null) {
                    tDom.innerHTML = '確定更新此頁嗎？\r\n' + msg;
                }
            }
        }
    }
    /**初始化Menu內容 */
    InitListArr(tPageName) {
        var _a;
        let ps = new set.PageSet();
        for (let key in set.MenuList) {
            if (!set.MenuList[key].DataFromDB) {
                set.MenuList[key].MenuArr = ps.GetList(tPageName, key);
            }
            else if (document.getElementById(key) != null) {
                let tmp = ((_a = document.getElementById(key)) === null || _a === void 0 ? void 0 : _a.innerHTML) || '';
                tmp = htmlDecode(tmp);
                set.MenuList[key].MenuArr = tmp.split(';');
                for (let i = 0; i < set.MenuList[key].MenuArr.length; i++) {
                    if (set.MenuList[key].MenuArr[i].indexOf(',') < 0) {
                        set.MenuList[key].MenuArr[i] = set.MenuList[key].MenuArr[i] + ',' + set.MenuList[key].MenuArr[i];
                    }
                    let ttt = set.MenuList[key].MenuArr[i].split(',');
                    set.MenuList[key].MenuArr[i] = ttt[0].replace(/"/g, '”') + ',' + ttt[1];
                }
                set.MenuList[key].MenuArr = set.MenuList[key].MenuArr.filter(onlyUnique);
            }
            set.MenuList[key].ValueHaveDash = true;
            for (let i = set.MenuList[key].MenuArr.length > 0 && (set.MenuList[key].MenuArr[0] == ',' || set.MenuList[key].MenuArr[0] == ',All') ? 1 : 0; i < set.MenuList[key].MenuArr.length; i++) {
                if (set.MenuList[key].MenuArr[i].split(',')[1].indexOf('-') < 0) {
                    set.MenuList[key].ValueHaveDash = false;
                    break;
                }
            }
            for (let i = 0; i < set.MenuList[key].MenuArr.length; i++) {
                set.MenuList[key].KeyValue[set.MenuList[key].MenuArr[i].split(',')[0]] = set.MenuList[key].MenuArr[i].split(',')[1];
                set.MenuList[key].ValueKey[set.MenuList[key].MenuArr[i].split(',')[1]] = set.MenuList[key].MenuArr[i].split(',')[0];
            }
        }
    }
    /**AP定版功能
     * @param {string} tPageName 頁面名稱
     */
    static VersionSet(tPageName) {
        let sbtn = $('#VersionBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        if (gPageObj.PageNameArr.length <= 0) {
            return;
        }
        let tmpPageName = '';
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        PageOperation.UpdateSubmit(tmpPageName, false);
        let tFieldArr = ['BU', '年度'];
        let tFieldValue = [];
        for (let i = 0; i < tFieldArr.length; i++) {
            let tStr = GetSelectValue(tFieldArr[i]);
            tFieldValue.push(tStr != null ? tStr.toString() : '');
        }
        let Query = {
            PageName: tmpPageName,
            QueryArr: tFieldValue
        };
        doAjax('VesionSet', true, Query, function (data) {
            let result = '';
            if (data) {
                result = '定版成功';
            }
            else {
                result = '定版失敗';
            }
            AlertClick('Attention', result);
            //sbtn.button('reset');
            SetButtonDisable('SearchBtn', false, '搜尋');
            PageOperation.ReloadData();
            location.reload();
        });
    }
    /**AP、FCST匯入功能
     * @param {string} tPageName 頁面名稱
    */
    static UploadData(tPageName) {
        if (gPageObj.PageNameArr.length <= 0) {
            return;
        }
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let sbtn = $('#UploadFileBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        // 宣告一個FormData
        let data = new FormData();
        // 將檔案append FormData
        let tDom = $('#fileUpload');
        if (tDom != null) {
            let files = tDom.get(0).files;
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
                        else {
                            tStr = tmpValue.toString().trim();
                        }
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
                contentType: false,
                processData: false,
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
    /**有拖拉功能的上傳功能(總經理報表的專案管理)
     * @param {string} tPageName 頁面名稱
    */
    static UploadData2(tPageName) {
        var _a;
        if (gPageObj.PageNameArr.length <= 0) {
            return;
        }
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let sbtn = $('#UploadFileBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        let exFileName = ['.xls', '.xlsx', '.docx', '.ppt', '.pptx', '.jpg', '.png', '.pdf'];
        // 宣告一個FormData
        let data = new FormData();
        // 將檔案append FormData
        let tDom = $('#UpFile');
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
            let toIdName = ((_a = document.getElementById('ToIdName')) === null || _a === void 0 ? void 0 : _a.innerHTML) || '';
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
                        else {
                            tStr = tmpValue.toString().trim();
                        }
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
                contentType: false,
                processData: false,
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
                    document.getElementById(toIdName).value = tmpArr[1];
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
    /**匯出功能(由後端產生檔案再回傳路徑)
     * @param {string} tPageName 頁面名稱
     * @param {string} ExportIdName 觸發此event的匯出button
    */
    static ExportExcel(tPageName, ExportIdName) {
        if (gPageObj.PageNameArr.length <= 0) {
            return;
        }
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let Query = gPageObj.PageNameObj[tmpPageName].LastQuery;
        let tIdName = ExportIdName ? ExportIdName : 'ExportBtn';
        let sbtn = $('#' + tIdName);
        //sbtn.button('loading');
        $("#" + tIdName).prop('disabled', true);
        SetButtonDisable('SearchBtn', true, 'loading...');
        if (Query.PageNumber != -1) {
            Query.PageNumber = -1;
        }
        doAjax('ExportExcel', true, Query, function (data) {
            let tIdx = -1;
            if ((tIdx = data.indexOf('失敗')) == 0) {
                alert(data.substring(tIdx + 3));
            }
            else {
                let tDom = document.getElementById('HiddenClickBtn');
                tDom.href = data;
                ButtonClickSimulation('#HiddenClickBtn');
            }
            //sbtn.button('reset');
            SetButtonDisable('SearchBtn', false, '搜尋');
            $("#" + tIdName).prop('disabled', false);
        });
    }
    static Logout() {
        doAjax('Logout', true, '', function (data) {
            window.location.assign(data);
        });
    }
    /**LinkToERP功能。目前實作於自有產品 */
    static LinkToERP(tPageName) {
        if (gPageObj.PageNameArr.length <= 0) {
            return;
        }
        let tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let sbtn = $('#LinkERPBtn');
        //sbtn.button('loading');
        SetButtonDisable('SearchBtn', true, 'loading...');
        doAjax('LinkToERP', true, gPageObj.PageNameObj[tmpPageName].LastQuery, function (data) {
            let result = '';
            if (data && data == 'OK') {
                result = '同步成功';
            }
            else {
                result = '同步失敗';
            }
            AlertClick('Attention', result);
            //sbtn.button('reset');
            SetButtonDisable('SearchBtn', false, '搜尋');
        });
    }
}
/**此class用於定義表單渲染相關的函式
 * @implements PageRender
 */
export class PageMake {
    /**產生Table Html。
     * 含各欄位的menu選單、檢視/編輯、預設值、動態觸發欄位...等
     * @param {string} tPageName 頁面名稱
     * @param data 搜尋結果
     * @param {string} AttributeStr Table 需額外附帶的屬性(需完整字串，如 'class="abc" style="display:none"')
     * @param {Array<Array<string>>} TitleArr Title呈現
     */
    CreatReadWriteTable(tPageName, data, AttributeStr, TitleArr) {
        var _a, _b, _c, _d, _e;
        if (gPageObj.PageNameObj[tPageName] == null) {
            return '';
        }
        gPageObj.PageNameObj[tPageName].FullData = [];
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
        let vd = new set.ValueDisplay();
        let LineAllNotCanEdit = true;
        cr.InitColorObj(tPageName, data);
        let tmpMenuObj = {};
        let tmpGetListObj = {};
        let tmpAttrStrObj = {};
        for (let i = 0; i < data.length; i++) {
            let tmpId = 'tmprow' + i;
            TableHtml += '<tr id="' + tmpId + '">';
            let tmpArr = typeof data[i] == 'string' ? data[i].split(',') : gPageObj.PageNameObj[tPageName].LineDataObjToArray(data[i]);
            gPageObj.PageNameObj[tPageName].FullData.push(tmpArr);
            let tmpModifuableArr = ps.CheckFieldModifiable(tPageName, tmpArr);
            let KeyValueArr = [];
            let ValueIdArr = [];
            let tFieldNameArr = [];
            let tmpFirstTitle = tmpArr[0];
            let LineArr = [];
            if (tPageName == 'SEMI_MAIN_PROJECT') {
                set.NeedClickObj[tPageName]['改善成效'].AnotherValue = 'up' + tmpFirstTitle;
            }
            for (let j = 0; j < tmpArr.length; j++) {
                let ColorHtml = '';
                let cellId = 'cell_' + i.toString() + '_' + j.toString();
                let tClassName = 'cell_' + j.toString();
                let ClickHtml = '';
                let aPart = '';
                let MenuPart = '';
                let bPart = '';
                if (!gPageObj.PageNameObj[tPageName].ModifiableArr[j] && op.FieldIsOnclick(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0])) {
                    ClickHtml = op.GetOnclickHtml(tPageName, tPageName + '_LIST', gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0], tmpArr);
                    ClickHtml = 'onclick="' + ClickHtml + '"';
                }
                ColorHtml = cr.CheckColorRule(i, j);
                if (set.TableSetObj.SetRight.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1) {
                    let tStr = '<td id="' + cellId + '" class="' + tClassName + ' ' + (ClickHtml != 'onclick=""' && ClickHtml != '' ? 'ClickSearch' : '') + '"  style="text-align:right !important;' + ColorHtml + (ShieldIdxArr.indexOf(j) > -1 ? 'display:none;' : '') + '" ' + ClickHtml + '>';
                    aPart += tStr;
                }
                else {
                    let tStr = '<td id="' + cellId + '" class="' + tClassName + ' ' + (ClickHtml != 'onclick=""' && ClickHtml != '' ? 'ClickSearch' : '') + '" style="' + ColorHtml + (ShieldIdxArr.indexOf(j) > -1 ? 'display:none;' : '') + '" ' + ClickHtml + '>';
                    aPart += tStr;
                }
                if (ps.NeedCheckSimilarity(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j])) {
                    CheckArr.push(tmpArr[j]);
                }
                if (!tmpGetListObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) {
                    tmpGetListObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]] = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false);
                }
                if (!tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) {
                    tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]] = {};
                }
                if (((_a = tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) === null || _a === void 0 ? void 0 : _a.Read) == null) {
                    tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]].Read = this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], '', 'Read');
                }
                if (((_b = tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) === null || _b === void 0 ? void 0 : _b.Write) == null) {
                    tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]].Write = this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], '', 'Write');
                }
                let tmpSelectList = tmpGetListObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]];
                let tmpAttrStr = ((_c = tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) === null || _c === void 0 ? void 0 : _c.Read) || '';
                let tmpAttrStr2 = ((_d = tmpAttrStrObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) === null || _d === void 0 ? void 0 : _d.Write) || '';
                if (dc.NeedDynamicGetList(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], isSearch)) {
                    let tmpStr = ' onchange="' + dc.ReturnFunctionStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false, cellId) + '"';
                    tmpAttrStr += tmpStr;
                    tmpAttrStr2 += tmpStr;
                    for (let key in (_e = dc.DynamicInfObj[tPageName].InfluenceToFieldNames) === null || _e === void 0 ? void 0 : _e[gPageObj.PageNameObj[tPageName].TitleStrArr[j]]) {
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
                /*else {
                    LineAllNotCanEdit = true;
                }*/
                if (set.PageSetObj.NoChangePage.indexOf(tPageName) > -1) {
                    aPart += tmpArr[j];
                }
                else if (vd.NeedChangeDisplay(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpFirstTitle, tmpArr[j])) {
                    let tStr = '<span class="MoneyFormat ' + tmpReadHtml + '">' + vd.NeedModifyDisplay(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[j], tPageName, tmpArr[0]) + '</span><span class="RealNumber" style="display:none">' + tmpArr[j] + '</span>';
                    aPart += tStr;
                }
                else if (tmpSelectList != null && tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) {
                    let tStr = '';
                    if (tmpReadHtml.length > 0) {
                        tStr = '<span class="' + tmpReadHtml + '">' + pt.GetListValue(ps.GetMenuName(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false), tmpArr[j]) + '</span>';
                    }
                    else {
                        tStr = '<span>' + pt.GetListValue(ps.GetMenuName(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false), tmpArr[j]) + '</span>';
                    }
                    aPart += tStr;
                }
                else if (ps.NeedColorField(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j])) {
                    let tStr = '<span class="ring ' + tmpReadHtml + '" style="--tw-ring-color:' + tmpArr[j] + '">' + tmpArr[j] + '</span>';
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
                        tStr += this.MakeListHtml('Calendar', tmpAttrStr2, tmpSelectList, tmpArr[j]);
                    }
                    else if (op.FieldIsOnclick(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0])) {
                        let tClickFun = op.GetOnclickHtml(tPageName, tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], tmpArr[0], tmpArr, 'up' + tmpArr[0]);
                        tStr += '<input id="up' + tmpArr[0] + '" class="form-control" ' + tmpAttrStr2 + ' value="' + tmpArr[j] + '" readonly><button class="btn" onclick="' + tClickFun + '">上傳</button>';
                    }
                    else if (set.TableSetObj.TextAreaArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1) {
                        tStr += '<textarea class="form-control" ' + tmpAttrStr2 + ' rows="' + (tmpArr[j].length < 20 ? 1 : (tmpArr[j].length < 35 ? 2 : 3)) + '">' + tmpArr[j] + '</textarea>';
                    }
                    else if (ps.NeedColorField(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j])) {
                        tStr += '<input class="form-control" type="color"' + tmpAttrStr2 + ' value="' + tmpArr[j].replace(/，/g, ',') + '">';
                    }
                    else if (tmpSelectList.length == 0) {
                        tStr += '<input class="form-control" ' + tmpAttrStr2 + ' value="' + tmpArr[j] + '">';
                    }
                    else if (!ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) {
                        tmpAttrStr2 += ' id="' + cellId + '_menu"';
                        if (tmpMenuObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j] + '_' + tmpArr[j]]) {
                            MenuPart = tmpMenuObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j] + '_' + tmpArr[j]];
                        }
                        else {
                            tmpMenuObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j] + '_' + tmpArr[j]] = ps.IsMultiSelect(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false)
                                ? this.MakeListHtml('Multi Select', tmpAttrStr2, tmpSelectList, tmpArr[j])
                                : this.MakeListHtml('select', tmpAttrStr2, tmpSelectList, tmpArr[j]);
                            MenuPart = tmpMenuObj[gPageObj.PageNameObj[tPageName].TitleStrArr[j] + '_' + tmpArr[j]];
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
                let tAttrStr = this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[tIdx], '', gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read');
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
                PartStr += LineArr[j].aPart + LineArr[j].MenuPart + LineArr[j].bPart;
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
    /**建立Table表單的Title欄位的Html
     * @param {string} DomName 頁面名稱
     * @param {string} tPageName 表單的id名稱，將此函式定義的html產生致此ID的innerHtml
     * @param {Array<string>} ExtraFieldArr 需要額外建立的欄位名稱，此不存在於FieldArr
     * @param {Array<Array<string>>} tPageName Title欄位名稱二維陣列
     */
    CreatTableTitle(tPageName, DomName, ExtraFieldArr, TitleArr) {
        let ps = new set.PageSet();
        let tmpTitleArr = new Array();
        let ShieldIdxArr = ps.NeedShieldField(tPageName);
        let LineNode = '';
        let TitleHtml = '';
        if (gPageObj.PageNameObj[tPageName] != null) {
            let FieldArr = gPageObj.PageNameObj[tPageName].TitleStrArr;
            for (let i = 0; i < TitleArr.length; i++) {
                let tttArr = new Array();
                for (let j = 0; j < TitleArr[i].length; j++) {
                    tttArr.push(TitleArr[i][j]);
                }
                tmpTitleArr.push(tttArr);
            }
            if (DomName == 'thead') {
                LineNode = 'th';
            }
            TitleHtml = '<' + DomName + '>';
            if (tmpTitleArr.length > 0) {
                for (let i = 0; i < tmpTitleArr.length; i++) {
                    TitleHtml += '<tr>';
                    for (let j = 0, col = 0, row = 0, c = 0, r = 0; j < tmpTitleArr[i].length; j++) {
                        if (tmpTitleArr[i][j] == '@') {
                            continue;
                        }
                        for (c = j + 1; c < tmpTitleArr[i].length && tmpTitleArr[i][j] == tmpTitleArr[i][c]; col++, c++) {
                            tmpTitleArr[i][c] = '@';
                        }
                        for (r = i + 1; r < tmpTitleArr.length && tmpTitleArr[i][j] == tmpTitleArr[r][j]; r++) {
                            let k = 0;
                            for (k = j + 1; k < tmpTitleArr[r].length && k < c && tmpTitleArr[r][j] == tmpTitleArr[r][k]; k++) { }
                            if (k == c) {
                                for (k = j; k < c; k++) {
                                    tmpTitleArr[r][k] = '@';
                                }
                                row++;
                            }
                        }
                        let LegthStr = this.MakeWidthAttributeStr(tPageName, FieldArr[j], (ShieldIdxArr.indexOf(j) > -1 ? 'display:none;' : ''), gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read');
                        TitleHtml += '<' + LineNode + ' ' + LegthStr + (col > 0 ? ' colspan="' + (col + 1).toString() + '"' : '') + (row > 0 ? ' rowspan="' + (row + 1).toString() + '"' : '') + ' ' + (ShieldIdxArr.indexOf(j) > -1 ? 'style="display:none"' : '') + '>';
                        TitleHtml += '<span class="WordTitle">' + tmpTitleArr[i][j] + '</span></' + LineNode + '>';
                        col = 0, row = 0;
                    }
                    for (let k = 0; i == 0 && k < ExtraFieldArr.length; k++) {
                        TitleHtml += '<' + LineNode + ' rowspan="' + tmpTitleArr.length + '">' + ExtraFieldArr[k] + '</' + LineNode + '>';
                    }
                    TitleHtml += '</tr>';
                }
            }
            else {
                for (let i = 0; i < FieldArr.length; i++) {
                    TitleHtml += '<' + LineNode + ' ' + this.MakeWidthAttributeStr(tPageName, FieldArr[i], (ShieldIdxArr.indexOf(i) > -1 ? 'display:none;' : ''), gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read') + '>' + FieldArr[i] + '</' + LineNode + '>';
                }
                for (let j = 0; j < ExtraFieldArr.length; j++) {
                    TitleHtml += '<' + LineNode + '>' + ExtraFieldArr[j] + '</' + LineNode + '>';
                }
            }
            TitleHtml += '</' + DomName + '>';
        }
        return TitleHtml;
    }
    /**定義dom物件的style屬性
     * @param {string} tPageName 頁面名稱
     * @param {string} InputFieldName 欄位名稱
     * @param {string} StyleAttr css定義
     * @param {'Read' | 'Write' | 'Search'} tMode 呼叫此funtion是來自什麼操作
     * @return {string} 回傳style屬性(字串包含style="")
     */
    MakeWidthAttributeStr(tPageName, InputFieldName, StyleAttr, tMode) {
        let ps = new set.PageSet();
        let WidthAttributeStr = '';
        let WidthStr = ps.MakeWidth(tPageName, InputFieldName, tMode);
        let tmpList = ps.GetListArr(tPageName, InputFieldName, false);
        WidthAttributeStr = WidthStr == '' ? '' : ' style="width:' + WidthStr + ';' + (tmpList.length == 0 ? 'min-width:' + WidthStr + ';' : '') + StyleAttr + '" data-width="' + WidthStr + '"';
        return WidthAttributeStr;
    }
    /**製作選單DOM物件
     * @param {string} Dom select/Multi Select/Calendar
     * @param {string} AttributeStr DOM物件額外的屬性字串
     * @param {string[]} ValueArr Menu內容
     * @param {string} SelectValue Menu預設值
     * @return 回傳select的html
    */
    MakeListHtml(Dom, AttributeStr, ValueArr, SelectValue) {
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
            if (SelectValue == null) {
                SelectValue = '';
            }
            DomHtml = '<div ' + AttributeStr + ' class="input-group date form_date col-md-5" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd"><input class="form-control" size="16" type="text" value="' + SelectValue + '" readonly><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>';
        }
        return DomHtml;
    }
    /**製作Select Option Html
     * @param {string[]} ValueArr Menu內容
     * @param {string} SelectValue Menu預設值
     * @return {string} 回傳 select dom的innerHtml
     */
    MakeOptionHtml(ValueArr, SelectValue) {
        var OptionHtml = '';
        var tValueArr = new Array();
        var isMulti = false;
        if (SelectValue != null && SelectValue.toString().indexOf('@') > -1) {
            tValueArr = SelectValue.toString().split('@');
            isMulti = true;
        }
        for (var j = 0; j < ValueArr.length; j++) {
            if (ValueArr[j] == '') {
                continue;
            }
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
    /**產生圖表
     * @param {string} tPageName 頁面名稱
     * @param data 搜尋結果
     */
    MakeChart(tPageName, data) {
        let dom = document.getElementById('ChartArea');
        if (dom == null) {
            return;
        }
        let myChart = echarts.init(dom);
        let ps = new set.PageSet();
        let option = ps.ChartsOption(tPageName, data);
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        // 使用刚指定的配置项和数据显示图表。
        //myChart.setOption(option);
    }
    /**初始化搜尋欄位
     * @param {string} tPageName 頁面名稱
     */
    InitSearchArea(tPageName) {
        var _a, _b, _c, _d;
        if (gPageObj.PageNameObj[tPageName] == null) {
            return;
        }
        let ps = new set.PageSet();
        let tmpObj = ps.InitSearchObj(tPageName);
        let pt = new PageTool();
        let UrlGetObj = pt.UrlGetVariable();
        tmpObj = pt.SetDefaultValue(tmpObj, UrlGetObj);
        let DisplayArr = tmpObj.DisplayArr; //要查詢的欄位
        let DefaultKey = tmpObj.DefaultKey; //各欄位的預設查詢值
        let DefaultValue = tmpObj.DefaultValue; //各欄位的預設值
        let htmlStr = '';
        let NeedSearchBtn = false; //需不需要有搜尋按鈕
        let isSearch = true;
        let KeyValueArr = [];
        let ValueIdArr = [];
        let tFieldNameArr = [];
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
                let AttrStr = 'id="' + domId + '"' + this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], '', 'Search');
                if (dc.NeedDynamicGetList(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], isSearch)) {
                    if (dc.DynamicInfObj[tPageName].InfluenceByThisFieldName == gPageObj.PageNameObj[tPageName].FieldArr[i]) {
                        AttrStr += ' onchange="' + dc.ReturnFunctionStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], isSearch) + '" ';
                    }
                    else if (Object.keys(((_a = dc.DynamicInfObj[tPageName].InfluenceToFieldNames) === null || _a === void 0 ? void 0 : _a[gPageObj.PageNameObj[tPageName].FieldArr[i]]) || []).length > 0) {
                        let tDCHtml = '';
                        tDCHtml += dc.ReturnFunctionStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], isSearch);
                        for (let key in (_b = dc.DynamicInfObj[tPageName].InfluenceToFieldNames) === null || _b === void 0 ? void 0 : _b[gPageObj.PageNameObj[tPageName].FieldArr[i]]) {
                            KeyValueArr.push(DefaultValue[DefaultIdx]);
                            ValueIdArr.push(key);
                            tFieldNameArr.push(gPageObj.PageNameObj[tPageName].FieldArr[i]);
                        }
                        AttrStr += ' onchange="' + tDCHtml + '" ';
                    }
                }
                if (set.TableSetObj.DatePickerArr.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[i]) > -1) {
                    htmlStr += this.MakeListHtml('Calendar', AttrStr, tmpSelectList, DefaultValue[DefaultIdx]);
                }
                else if (set.TableSetObj.CheckboxArr.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[i]) > -1) {
                    htmlStr += '<input class="form-check-input" type="checkbox" class="form-control" ' + AttrStr + ' ' + (DefaultValue[DefaultIdx] == 'true' || DefaultValue[DefaultIdx] == '1' ? 'checked' : '') + '>';
                }
                else if (tmpSelectList == null || tmpSelectList.length == 0) {
                    htmlStr += '<input type="text" class="form-control" ' + AttrStr + ' value="' + DefaultValue[DefaultIdx] + '">';
                }
                else {
                    if (ps.IsMultiSelect(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], true)) {
                        htmlStr += this.MakeListHtml('Multi Select', AttrStr, tmpSelectList, DefaultValue[DefaultIdx]);
                    }
                    else {
                        htmlStr += this.MakeListHtml('select', AttrStr, tmpSelectList, DefaultValue[DefaultIdx]);
                    }
                }
            }
            else {
                htmlStr += '<input type="text" class="form-control" id="' + domId + '" ' + this.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[i], '', 'Search') + '>';
            }
            htmlStr += '</div>';
        }
        let tDom = document.getElementById('SearchArea');
        if (tDom != null) {
            tDom.innerHTML = htmlStr;
        }
        if (!NeedSearchBtn) { //預設是block
            tDom = document.getElementById('SearchBtn');
            if (tDom != null) {
                tDom.style.display = 'none';
            }
        }
        //let HaveDone: string[] = [];
        for (let i = 0; i < ValueIdArr.length; i++) {
            //if (HaveDone.indexOf(ValueIdArr[i]) > -1) { continue; }//被影響的欄位已處理過，則跳過//由於複數動態欄位有各自的預設值，因此還需全部都檢查
            let tNum = ValueIdArr[i].replace(tmpFieldName, '');
            let DefaultIdx = DefaultKey.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[tNum]);
            let tListArr = ps.GetListArr(tPageName, tFieldNameArr[i], true);
            let tmpKeyValue = [];
            if (KeyValueArr[i] == '' && tListArr.length > 0 && tListArr[0].split(',')[0] != ''
                && dc.DynamicInfObj[tPageName].InfluenceToFieldNames[tFieldNameArr[i]][ValueIdArr[i]].ValueByIdName != null && dc.DynamicInfObj[tPageName].InfluenceToFieldNames[tFieldNameArr[i]][ValueIdArr[i]].ValueByIdName.length > 0) {
                //若沒有預設值且欄位是多重來源動態Menu，則自動選擇個來源List的第一個值
                (_c = dc.DynamicInfObj[tPageName].InfluenceToFieldNames[tFieldNameArr[i]][ValueIdArr[i]].ValueByIdName) === null || _c === void 0 ? void 0 : _c.forEach(function (item, idx) {
                    let tmpIdx = Number(item.split('_')[1]);
                    tListArr = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].FieldArr[tmpIdx], true);
                    tmpKeyValue.push(tListArr[0].split(',')[0]);
                });
            }
            else if (KeyValueArr[i] == '' && tListArr.length > 0 && tListArr[0].split(',')[0] != '') {
                //若沒有預設值，但Menu List沒有All的選項，則賦值Menu List的第一個值
                tmpKeyValue = tListArr[0].split(',')[0];
            }
            else if (dc.DynamicInfObj[tPageName].InfluenceToFieldNames[tFieldNameArr[i]][ValueIdArr[i]].ValueByIdName != null && dc.DynamicInfObj[tPageName].InfluenceToFieldNames[tFieldNameArr[i]][ValueIdArr[i]].ValueByIdName.length > 0) {
                (_d = dc.DynamicInfObj[tPageName].InfluenceToFieldNames[tFieldNameArr[i]][ValueIdArr[i]].ValueByIdName) === null || _d === void 0 ? void 0 : _d.forEach(function (item, idx) {
                    //若有預設值且欄位是多重來源動態Menu，則將預設值帶入FrontDynamicMenuRequest的參數
                    let tmpIdx = Number(item.split('_')[1]);
                    let tDIdx = DefaultKey.indexOf(gPageObj.PageNameObj[tPageName].FieldArr[tmpIdx]);
                    tmpKeyValue.push(DefaultValue[tDIdx]);
                });
            }
            else {
                tmpKeyValue = ps.IsMultiSelect(tPageName, tFieldNameArr[i], true) ? KeyValueArr[i].split('@') : KeyValueArr[i];
            }
            if (DefaultIdx > -1 && tmpKeyValue.length > 0 && tmpKeyValue[0] != '') { //預設值若為空白不需重新動態變動
                let tmpSelectList = this.FrontDynamicMenuRequest(tPageName, tFieldNameArr[i], ValueIdArr[i], true, tmpKeyValue);
                //HaveDone.push(ValueIdArr[i]);
                let domId = ValueIdArr[i];
                if (tmpSelectList != null) {
                    document.getElementById(domId).innerHTML = this.MakeOptionHtml(tmpSelectList, DefaultValue[DefaultIdx]);
                }
            }
            else if (ValueIdArr[i] == '') {
                set.DynamicFunction.DynamicRequest(tPageName, ValueIdArr[i], tFieldNameArr[i], true);
            }
        }
        let TableIdName = tPageName + 'Table';
        $('select.selectpicker').selectpicker(); //可搜尋下拉式初始化
        for (let i = 0; i < set.TableSetObj.DatePickerArr.length; i++) {
            let tIdx = gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf(set.TableSetObj.DatePickerArr[i]);
            if (tIdx > -1) {
                let tSDId = 'field_' + tIdx;
                $('#' + tSDId).datetimepicker(ps.SetDatePick(tPageName, set.TableSetObj.DatePickerArr[i]));
            }
        }
    }
    /**動態影響生成Menu(不經後端的Menu)
     * @param {string} tPageName 頁面名稱
     * @param {string} FieldName 欄位名稱(因值改變而影響別的欄位)
     * @param {string} FieldId 搜尋BAR欄位ID(被影響的欄位)
     * @param {boolean} isSearch 呼叫此function是否來自搜尋bar初始化
     * @param {string[] | string} KeyQuery 下拉選單的值
     */
    FrontDynamicMenuRequest(tPageName, FieldName, FieldId, isSearch, KeyQuery) {
        var _a, _b, _c, _d;
        let dc = new set.DynamicClass();
        let ps = new set.PageSet();
        let valueArr = [];
        if (dc.DynamicInfObj[tPageName] && dc.DynamicInfObj[tPageName].InfluenceToFieldNames && Object.keys(dc.DynamicInfObj[tPageName].InfluenceToFieldNames).length > 0) {
            let Key = KeyQuery != null ? KeyQuery : GetSelectValue(FieldName);
            if (Key == null || (typeof Key === 'object' && Key.length == 0)) {
                Key = '';
            }
            let tPStr = '';
            if (dc.DynamicInfObj[tPageName].InfluenceToFieldNames[FieldName][FieldId] != null) {
                if (set.MenuList[dc.DynamicInfObj[tPageName].InfluenceToFieldNames[FieldName][FieldId].MenuName] != null) {
                    if (set.MenuList[dc.DynamicInfObj[tPageName].InfluenceToFieldNames[FieldName][FieldId].MenuName].DataFromDB) {
                        tPStr = ((_a = document.getElementById(dc.DynamicInfObj[tPageName].InfluenceToFieldNames[FieldName][FieldId].MenuName)) === null || _a === void 0 ? void 0 : _a.innerHTML) || '';
                    }
                    else {
                        let tmpArr = ps.GetList(tPageName, dc.DynamicInfObj[tPageName].InfluenceToFieldNames[FieldName][FieldId].MenuName);
                        tPStr = tmpArr.join(';');
                    }
                }
                tPStr = htmlDecode(tPStr);
                let tPdArr = tPStr === null || tPStr === void 0 ? void 0 : tPStr.split(';');
                let tKeyArr = [];
                let haveAll = false;
                let noDash = false;
                let tKeyIdxRange = {};
                let tLastFirstStr = '';
                for (let i = 0; tPStr != '' && tPdArr != null && i < tPdArr.length; i++) {
                    let ttt = tPdArr[i].split(',');
                    let tmpIdx = ttt[1].indexOf('-');
                    if (tmpIdx < 0) {
                        noDash = true;
                    }
                    let tValueStr = ttt[1].substring(0, tmpIdx);
                    tKeyArr.push(tValueStr);
                    tPdArr[i] = ttt[0] + ',' + ttt[1].substring(tmpIdx + 1);
                    let tFirstStr = tValueStr.replace(/－/g, '-').split('＊')[0];
                    if (!tKeyIdxRange[tFirstStr]) {
                        tKeyIdxRange[tFirstStr] = { begin: i, end: i };
                        if (tLastFirstStr != '') {
                            tKeyIdxRange[tLastFirstStr].end = i;
                        }
                        tLastFirstStr = tFirstStr;
                    }
                }
                tKeyIdxRange[tLastFirstStr].end = tPdArr.length;
                if (noDash) {
                    valueArr = tPdArr;
                }
                else {
                    if (typeof Key === 'object' && ((_b = dc.DynamicInfObj[tPageName]) === null || _b === void 0 ? void 0 : _b.InfluenceToFieldNames[FieldName][FieldId].ValueByIdName) && ((_c = dc.DynamicInfObj[tPageName]) === null || _c === void 0 ? void 0 : _c.InfluenceToFieldNames[FieldName][FieldId].ValueByIdName.length) > 0) {
                        let tCheckFirstKey = Key[0].split('@').find(x => x == '') != null ? [''] : Key[0].split('@'); //如果複選結果含有空白，則直接空白
                        let tOthersEmpty = true; //第一個之後的條件是否全空白
                        for (let k = 1; k < Key.length; k++) {
                            if (Key[k].split('@').find(x => x == '') == null) { //不可 != ''，因為複選可能同時有空白和非空白選項
                                tOthersEmpty = false;
                                break;
                            }
                        }
                        if (tOthersEmpty) { //第一個之後的條件全空白可直接回begin、end範圍的陣列
                            if (tCheckFirstKey.length == 1 && tCheckFirstKey[0] == '') {
                                valueArr = tPdArr;
                            }
                            else {
                                for (let k = 0; k < tCheckFirstKey.length; k++) {
                                    let tmpValueArr = JSON.parse(JSON.stringify(tPdArr));
                                    if (tKeyIdxRange[tCheckFirstKey[k]]) {
                                        tmpValueArr = tmpValueArr.splice(tKeyIdxRange[tCheckFirstKey[k]].begin, tKeyIdxRange[tCheckFirstKey[k]].end - tKeyIdxRange[tCheckFirstKey[k]].begin);
                                        valueArr = valueArr.concat(tmpValueArr);
                                    }
                                }
                            }
                        }
                        else {
                            for (let k = 0; k < tCheckFirstKey.length; k++) {
                                let begin = false;
                                let tKIdx = -1;
                                let tStartIdx = tCheckFirstKey[k].split('@').find(x => x == '') != null ? 0 : tKeyIdxRange[tCheckFirstKey[k]].begin;
                                let tEndIdx = tCheckFirstKey[k].split('@').find(x => x == '') != null ? tKeyArr.length : tKeyIdxRange[tCheckFirstKey[k]].end;
                                for (let i = tStartIdx; i < tEndIdx; i++) {
                                    let flag = false;
                                    let tArr = tKeyArr[i].replace(/－/g, '-').split('＊');
                                    for (let j = 0; j < Key.length; j++) {
                                        if (Key[j] == '' || (Key[j].indexOf('@') > -1 && Key[j].split('@').find(x => x == '') != null)) {
                                        }
                                        else if (Key[j].indexOf('@') > -1 && Key[j].split('@').find(x => x == tArr[j]) != null) {
                                        }
                                        else if (Key[j] == tArr[j]) {
                                            begin = true;
                                            tKIdx = j;
                                        }
                                        else { //前一條件不符合，直接跳出不往下檢查
                                            flag = true;
                                            break;
                                        }
                                    }
                                    if (!flag) {
                                        valueArr.push(tPdArr[i]);
                                    }
                                    if (begin && Key[tKIdx] != tArr[tKIdx]) { //因Menu列表有排序，出了範圍後面即可不檢查
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    else if (typeof Key === 'object') {
                        for (let i = 0; i < Key.length; i++) {
                            if (Key[i] == '') {
                                haveAll = true;
                                break;
                            }
                            for (let j = 0; j < tKeyArr.length; j++) {
                                if (tKeyArr[j] == Key[i]) {
                                    valueArr.push(tPdArr[j]);
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
                                valueArr.push(tPdArr[j]);
                            }
                        }
                    }
                    if (haveAll) {
                        valueArr = tPdArr;
                    }
                }
                let tFieldArr = (_d = document.getElementById('FieldName')) === null || _d === void 0 ? void 0 : _d.innerHTML.split(',');
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
    /**渲染MenuBar
     * @param {boolean} NeedCheckRight 是否需要檢查權限(false僅回傳MenuName不會回傳URL)
     * @param {string} DomId DOM ID
     * @param {string} PageMode 用來分辨哪個BU(部份系統才需要)
    */
    IniteMenuBar(NeedCheckRight, DomId, PageMode) {
        doAjax('../Home/GetMenu' + (NeedCheckRight ? '2' : ''), true, { NeedCheckRight: NeedCheckRight ? '1' : '0', bu: PageMode }, function (data) {
            let MenuHtml = '';
            let MenuRender = function (MenuObj, MenuLevel) {
                let tReHtml = '';
                let ULAttrStr = ""; //ul標籤
                let LIAttrStr = ""; //li標籤
                let aAttrStr = ""; //a標籤
                switch (MenuLevel) {
                    case 1:
                        ULAttrStr = "class=\"nav navbar-nav\"";
                        LIAttrStr = "class=\"dropdown\"";
                        aAttrStr = "class=\"LinkClass dropdown-toggle text-2xl text-black hover:text-green-500 hover:font-bold focus:text-green-500 focus:font-bold\"";
                        break;
                    case 2:
                        ULAttrStr = "class=\"dropdown-menu\"";
                        LIAttrStr = "class=\"nav-item dropdown\"";
                        aAttrStr = "class=\"dropdown-item LinkClass\"";
                        break;
                    default:
                        ULAttrStr = "class=\"submenu dropdown-menu\"";
                        aAttrStr = "class=\"dropdown-item LinkClass\"";
                        break;
                }
                tReHtml += '<ul ' + ULAttrStr + '>';
                for (let i = 0; MenuObj[i] != null; i++) {
                    let HrefStr = (MenuObj[i].CanUse ? " href=\"" + MenuObj[i].URL + "\" target=\"_blank\"" : "");
                    let aID = MenuLevel == 1 ? " id=\"drop" + MenuLevel.toString() + "_" + i.toString() + "\"" : "";
                    let tmpAaAttrStr = aAttrStr + aID + HrefStr + (MenuObj[i].URL != "" && !MenuObj[i].CanUse ? " style=\"color:gray\"" : "");
                    let AInnerStr = MenuObj[i].Child != null ? (MenuLevel == 1 ? "<span class='caret'></span>" : "<span class='float-right'>&raquo</span>") : "";
                    if (MenuLevel == 1 && MenuObj[i].Child == null) {
                        tmpAaAttrStr = tmpAaAttrStr.replace("data-toggle=\"dropdown\"", "");
                    }
                    if (MenuLevel == 1 && AInnerStr != "") {
                        tmpAaAttrStr = tmpAaAttrStr.replace("class=\"", "class=\"cursor-pointer ");
                    }
                    tReHtml += '<li ' + LIAttrStr + '><a ' + tmpAaAttrStr + '>' + MenuObj[i].MenuName + AInnerStr + '</a>'
                        + (MenuObj[i].Child != null ? MenuRender(MenuObj[i].Child, MenuLevel + 1) : '')
                        + '</li>';
                }
                tReHtml += '</ul>';
                return tReHtml;
            };
            data.forEach(function (item) {
                MenuHtml += MenuRender(item, 1);
            });
            document.getElementById(DomId ? DomId : 'MenuBarLink').innerHTML = MenuHtml;
            if (DomId && DomId == 'MenuBarLink') {
                $('#MenuBarLink2').addClass('hidden');
            }
        });
    }
}
/**此class用於定義表單圖表相關的簡易工具函式 */
export class PageTool {
    /**有下拉選單的欄位值，將Key值替換成Value值
     * @param {string} tMenuName MenuName
     * @param {string} keyValue 需要被替換的原字串
     * @return {string} 回傳根據Menu值替換後的結果
     */
    GetListValue(tMenuName, keyValue) {
        if (keyValue == '' || set.MenuList[tMenuName] == null) {
            return keyValue;
        }
        if (keyValue.toString().indexOf('@') > -1) { //含有複選分隔符號
            let tValueArr = keyValue.toString().split('@');
            let reArr = new Array();
            for (let i = 0; i < tValueArr.length; i++) {
                if (set.MenuList[tMenuName].KeyValue[tValueArr[i]] != null) {
                    reArr.push(set.MenuList[tMenuName].ValueHaveDash ? set.MenuList[tMenuName].KeyValue[tValueArr[i]].split('-')[1] : set.MenuList[tMenuName].KeyValue[tValueArr[i]]);
                }
            }
            return reArr.join('/');
        }
        else {
            return set.MenuList[tMenuName].ValueHaveDash && set.MenuList[tMenuName].KeyValue[keyValue] ? set.MenuList[tMenuName].KeyValue[keyValue].split('-')[1] : (set.MenuList[tMenuName].KeyValue[keyValue] || keyValue);
        }
    }
    /**將數據轉換成匯出格式的數據
     * @param {string} tPageName 頁面名稱
     * @param tdata 數據(不含Title)
     * @return {string[]} 回傳調整過後的數據
     */
    MakeExportData(tPageName, tdata) {
        let reData = new Array();
        let vd = new set.ValueDisplay();
        for (let i = 0; i < tdata.length; i++) {
            let tmpArr = typeof tdata[i] == 'string' ? tdata[i].toString().split(',') : (typeof tdata[i] == 'object' ? gPageObj.PageNameObj[tPageName].LineDataObjToArray(tdata[i]) : tdata[i]);
            let tReArr = new Array();
            let ps = new set.PageSet();
            for (let j = 0; j < tmpArr.length; j++) {
                if (set.PageSetObj.NoChangePage.indexOf(tPageName) > -1 || (gPageObj.PageNameObj[tPageName] != null && j < gPageObj.PageNameObj[tPageName].TitleStrArr.length && ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j]))) {
                    tReArr.push(tmpArr[j]);
                    continue;
                }
                if (vd.NeedKilobitFormat(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[0])) {
                    if (tmpArr[j].indexOf('%') > -1) {
                        tmpArr[j] = MoneyFormat(tmpArr[j].replace('%', '')) + '%';
                    }
                    else {
                        tmpArr[j] = MoneyFormat(tmpArr[j]);
                    }
                }
                let tmpSelectList = ps.GetListArr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false);
                tmpArr[j] = tmpArr[j].replace(/;/g, '；');
                if (tmpSelectList.length > 0 && !ps.NoChangeField(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[j])) {
                    tReArr.push(this.GetListValue(ps.GetMenuName(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[j], false), tmpArr[j]));
                }
                else {
                    tReArr.push(tmpArr[j]);
                }
            }
            reData.push(tReArr.join(';'));
        }
        return reData;
    }
    /**將Title物件轉換為一維陣列。
     * 匯出的函式會用
     * @param {string} tPageName 頁面名稱
     * @param {string[][]} TitleArr Title的物件 */
    ObjTitleToStrArr(tPageName, TitleArr) {
        let reTitleArr = new Array();
        if (TitleArr.length > 0) {
            for (let i = 0; i < TitleArr[0].length; i++) {
                let tmpStr = TitleArr[0][i];
                for (let j = 1; j < TitleArr.length; j++) {
                    if (TitleArr[j][i] != TitleArr[0][i]) {
                        tmpStr += TitleArr[j][i];
                    }
                }
                reTitleArr.push(tmpStr);
            }
        }
        else {
            reTitleArr = gPageObj.PageNameObj[tPageName].TitleStrArr;
        }
        return reTitleArr;
    }
    CreatTable(qy, AttributeStr) {
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
    static UploadAlert(tPageName, TitleStr, InputId) {
        ButtonClickSimulation('#BigAlertAreaBtn');
        let tDom = document.getElementById('BigAlertAreaTitle');
        if (tDom != null) {
            tDom.innerHTML = TitleStr.join('/');
        }
        tDom = document.getElementById('ToIdName');
        if (tDom != null) {
            tDom.innerHTML = InputId;
        }
    }
    LoadingMask(mode) {
        let tDom = document.getElementById('LoadingMask');
        if (tDom.style.display != mode) {
            ButtonClickSimulation('#LoadingMaskBtn');
        }
    }
    /**get傳遞參數設置搜尋條件
     * @return {{ [key: string]: string }} 根據Get(From URL)回傳物件
     */
    UrlGetVariable() {
        var getUrl = location.search.replace('?', '');
        var tmpArr = getUrl.split('&');
        var KeyValueObj = {};
        if (getUrl == '' || tmpArr.length == 0) {
            return KeyValueObj;
        }
        for (var i = 0; i < tmpArr.length; i++) {
            var tArr = decodeURI(tmpArr[i]).split('=');
            var tmpKey = tArr[0];
            var tmpValue = tArr[1];
            KeyValueObj[tmpKey] = tmpValue;
        }
        return KeyValueObj;
    }
    /**修改下拉式選單可否使用 */
    SelectDisableChange(ExceptforIdArr, mode) {
        for (var i = 0; document.getElementById('field_' + i); i++) {
            if (ExceptforIdArr.indexOf('field_' + i) < 0 && document.getElementById('field_' + i).innerHTML.indexOf('<option') > -1) {
                document.getElementById('field_' + i).disabled = mode;
            }
        }
    }
    /**除了指定的搜尋Bar物件ID以外，其餘Menu重新整理
     * @param {string[]} ExceptforIdArr 搜尋Bar物件ID
     * @param {string} tPageName 頁面名稱
     */
    ReloadSelectOption(ExceptforIdArr, tPageName) {
        var _a, _b;
        if (gPageObj.PageNameArr.length <= 0) {
            return;
        }
        let tmpPageName = '';
        tmpPageName = tPageName == null ? gPageObj.PageNameArr[0] : tPageName;
        let ps = new set.PageSet();
        let pm = new PageMake();
        let dc = new set.DynamicClass();
        let tmpObj = ps.InitSearchObj(tmpPageName);
        let DefaultValue = tmpObj.DefaultValue; //各欄位的預設值
        let DefaultKey = tmpObj.DefaultKey;
        let tmpFieldArr = gPageObj.PageNameObj[tmpPageName].FieldArr;
        let KeyValueArr = [];
        let ValueIdArr = [];
        let tFieldNameArr = [];
        let tmpFieldName = 'field_';
        for (let i = 0; document.getElementById('field_' + i); i++) {
            if (ExceptforIdArr.indexOf('field_' + i) < 0 && document.getElementById('field_' + i).innerHTML.indexOf('<option') > -1) {
                let DefaultIdx = DefaultKey.indexOf(tmpFieldArr[i]);
                if (DefaultIdx > -1) {
                    let tmpSelectList = ps.GetListArr(tmpPageName, tmpFieldArr[i], true);
                    if (tmpSelectList != null && tmpSelectList.length > 0) {
                        document.getElementById('field_' + i).innerHTML = pm.MakeOptionHtml(tmpSelectList, DefaultValue[DefaultIdx]);
                    }
                    if (Object.keys(((_a = dc.DynamicInfObj[tmpPageName].InfluenceToFieldNames) === null || _a === void 0 ? void 0 : _a[gPageObj.PageNameObj[tmpPageName].FieldArr[i]]) || []).length > 0) {
                        let tDCHtml = '';
                        tDCHtml += dc.ReturnFunctionStr(tmpPageName, gPageObj.PageNameObj[tmpPageName].FieldArr[i], true);
                        for (let key in (_b = dc.DynamicInfObj[tmpPageName].InfluenceToFieldNames) === null || _b === void 0 ? void 0 : _b[gPageObj.PageNameObj[tmpPageName].FieldArr[i]]) {
                            KeyValueArr.push(DefaultValue[DefaultIdx]);
                            ValueIdArr.push(key);
                            tFieldNameArr.push(gPageObj.PageNameObj[tmpPageName].FieldArr[i]);
                        }
                    }
                }
            }
        }
        for (let i = 0; i < ValueIdArr.length; i++) {
            let tNum = ValueIdArr[i].replace(tmpFieldName, '');
            let DefaultIdx = DefaultKey.indexOf(gPageObj.PageNameObj[tmpPageName].FieldArr[tNum]);
            if (DefaultIdx > -1) {
                let tmpSelectList = pm.FrontDynamicMenuRequest(tmpPageName, tFieldNameArr[i], ValueIdArr[i], true, KeyValueArr[i]);
                let domId = ValueIdArr[i];
                if (tmpSelectList != null) {
                    document.getElementById(domId).innerHTML = pm.MakeOptionHtml(tmpSelectList, DefaultValue[DefaultIdx]);
                }
            }
        }
    }
    /**重新定義搜尋欄位初始值
     * @param DefaultObj 原來的搜尋Obj Inf.
     * @param UrlObj 來自Get參數(from URL)的搜尋欄位初始值obj Inf.
     * @return 回傳重新定義的搜尋預設值物件
     */
    SetDefaultValue(DefaultObj, UrlObj) {
        var UrlKeys = Object.keys(UrlObj);
        for (var i = 0; i < UrlKeys.length; i++) {
            var idx = DefaultObj.DefaultKey.indexOf(UrlKeys[i]);
            if (idx > -1) {
                DefaultObj.DefaultValue[idx] = UrlObj[UrlKeys[i]];
            }
        }
        let ps = new set.PageSet();
        return ps.ResetSearchDisplayFromURL(DefaultObj, UrlObj);
    }
}
window.PageOperation = PageOperation;
window.PageTool = PageTool;
