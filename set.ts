import { EChartOption } from 'echarts';
import { extend } from 'jquery';
import './PageInit.js'
import { gPageObj, PageInf, PageMake, PageOperation, PageTool } from './PageInit.js';

export var MenuList: {//下拉式選單資訊物件
    [key: string]: {//Menu名稱
        MenuArr: string[],//Menu內容(key1,value1;key2,value2)
        DataFromDB: boolean//內容是否由後端DB產生
    }
} = {
    'Process': {
        MenuArr: [],
        DataFromDB: false
    },
    '工時Flag': {
        MenuArr: [],
        DataFromDB: false
    },
    '是否有效': {
        MenuArr: [],
        DataFromDB: false
    },
    '查詢方式': {
        MenuArr: [],
        DataFromDB: false
    },
    '產品類別': {
        MenuArr: [],
        DataFromDB: false
    },
    '計算單位': {
        MenuArr: [],
        DataFromDB: false
    },
    'FCST維護單位': {
        MenuArr: [],
        DataFromDB: false
    },
    'FCST 維護單位': {
        MenuArr: [],
        DataFromDB: false
    },
    'SA/PC': {
        MenuArr: [],
        DataFromDB: false
    },
    '加總條件': {
        MenuArr: [],
        DataFromDB: false
    },
    '報表類型': {
        MenuArr: [],
        DataFromDB: false
    },
    '新/舊客戶': {
        MenuArr: [],
        DataFromDB: false
    },
    '客戶區域定義': {
        MenuArr: [],
        DataFromDB: false
    },
    '包機客戶': {
        MenuArr: [],
        DataFromDB: false
    },
    '年度': {
        MenuArr: [],
        DataFromDB: false
    },
    '月份': {
        MenuArr: [],
        DataFromDB: false
    },
    '月': {
        MenuArr: [],
        DataFromDB: false
    },
    'BU': {
        MenuArr: [],
        DataFromDB: false
    },
    'Type': {
        MenuArr: [],
        DataFromDB: false
    },
    '維護單位': {
        MenuArr: [],
        DataFromDB: false
    },
    'CustCombine2': {
        MenuArr: [],
        DataFromDB: true
    },
    'CompDisplay': {
        MenuArr: [],
        DataFromDB: true
    },
    'Top10CustDisplay': {
        MenuArr: [],
        DataFromDB: true
    },
    'CustCompine3AP': {
        MenuArr: [],
        DataFromDB: true
    },
    'PerHer': {
        MenuArr: [],
        DataFromDB: true
    },
    'Tester': {
        MenuArr: [],
        DataFromDB: true
    },
    'ProductType': {
        MenuArr: [],
        DataFromDB: true
    },
    'Ver': {
        MenuArr: [],
        DataFromDB: true
    },
    'CustCompine3SA': {
        MenuArr: [],
        DataFromDB: true
    },
    'CustCompine3PC': {
        MenuArr: [],
        DataFromDB: true
    },
    'APSAName': {
        MenuArr: [],
        DataFromDB: true
    },
    'FCSTSAName': {
        MenuArr: [],
        DataFromDB: true
    },
    'CustCombineCN': {
        MenuArr: [],
        DataFromDB: true
    },
    'Top10CustDisplay2': {
        MenuArr: [],
        DataFromDB: true
    },
    'ProdList': {
        MenuArr: [],
        DataFromDB: true
    },
    'BUProdList': {
        MenuArr: [],
        DataFromDB: true
    },
    '營收日期': {
        MenuArr: [],
        DataFromDB: false
    },
    'PH_MacType_Display': {
        MenuArr: [],
        DataFromDB: true
    },
    'ProductName': {
        MenuArr: [],
        DataFromDB: true
    },
    'CustCode2': {
        MenuArr: [],
        DataFromDB: true
    },
    'RC_PRODUCTTYPE': {
        MenuArr: [],
        DataFromDB: true
    },
    'RCT_PRODUCTTYPE': {
        MenuArr: [],
        DataFromDB: true
    },
    'RentCostCust': {
        MenuArr: [],
        DataFromDB: true
    },
    'Runcard_W_Cust': {
        MenuArr: [],
        DataFromDB: true
    },
    'Runcard_C_Cust': {
        MenuArr: [],
        DataFromDB: true
    },
    'RC_Cust': {
        MenuArr: [],
        DataFromDB: true
    },
    'RCT_Cust': {
        MenuArr: [],
        DataFromDB: true
    },
    TEST_ALL_CUST: {
        MenuArr: [],
        DataFromDB: true
    }
};
export var NeedClickObj: {//表單內部值需要Click Function的定義
    [PageName: string]: {//頁面名稱
        [FieldName: string]: {//欄位名稱。表示這個頁面有哪些欄位名稱有Click Function
            Function: string,//觸發的Function名稱
            ValueQuery: Array<string | number>,//Function要傳入的參數。數值表示對應該行的line data索引; 字串表示以指定值作為參數，若需要輸入數值則以中括號表示，例如:[3.14]
            NotShowInRowTitle?: Array<string | number>,//某些行不跑Click Function判定。字串表示該行的首欄位Title; number表示行座標。
            AnotherValue?: string,//需額外傳遞的參數
        }
    }
} = {
    SEMI_MAIN_PROJECT: {
        改善成效: {
            Function: 'PageTool.UploadAlert',
            ValueQuery: [0, 1, 2],
            AnotherValue: ''
        }
    }
};
export var DedaultListArr: Array<string> = [];
export var lang = {
    "sProcessing": "處理中...",
    "sLengthMenu": "每頁 _MENU_ 項",
    "sZeroRecords": "沒有匹配結果",
    "sInfo": "當前顯示第 _START_ 至 _END_ 項，共 _TOTAL_ 項。",
    "sInfoEmpty": "當前顯示第 0 至 0 項，共 0 項",
    "sInfoFiltered": "(由 _MAX_ 項結果過濾)",
    "sInfoPostFix": "",
    "sSearch": "表格內搜索:",
    "sUrl": "",
    "sEmptyTable": "表中數據為空",
    "sLoadingRecords": "載入中...",
    "sInfoThousands": ",",
    "oPaginate": {
        "sFirst": "首頁",
        "sPrevious": "上頁",
        "sNext": "下頁",
        "sLast": "末頁",
        "sJump": "跳轉"
    },
    "oAria": {
        "sSortAscending": ": 以昇冪排列此列",
        "sSortDescending": ": 以降冪排列此列"
    }
};
export var DCMenuIdNameList: Array<string> = [];//紀錄會動態影響其他搜尋欄位的搜尋欄位物件ID
export let ColorRuleArr: {//存放顏色Highlight規則
    [PageName: string]: {//頁面名稱
        [CellOrRowIdx: number | string]: {//行座標or縱坐標or行標題
            [isLateral: number]: {//是否橫坐標判定(1:true; 0:false)
                [Rule: string]: {//顏色規則
                    Color: string,//顏色
                    BackgroundColor: string,//背景顏色
                    Others: {//特殊規則
                        'Score': number,//權重，用於規則有重疊時來決定規則優先順序
                        [TitleOrFieldName: string]: string | number,//Row Title or Field Name，指對應到這些特殊條件才符合此規則
                    }
                }
            }
        }
    }
} = {};

export var TableSetObj: TableSetObj = {//此物件屬性儲存都是欄位名稱
    MoneyFieldArr: ['出貨數', '成本', '毛利率', 'Jan營收', 'Feb營收', 'Mar營收', 'Apr營收', 'May營收', 'Jun營收', 'Jul營收', 'Aug營收', 'Sep營收', 'Oct營收', 'Nov營收', 'Dec營收', 'Jan單價', 'Feb單價', 'Mar單價', 'Apr單價', 'May單價', 'Jun單價', 'Jul單價', 'Aug單價', 'Sep單價', 'Oct單價', 'Nov單價', 'Dec單價', 'Jan數量', 'Feb數量', 'Mar數量', 'Apr數量', 'May數量', 'Jun數量', 'Jul數量', 'Aug數量', 'Sep數量', 'Oct數量', 'Nov數量', 'Dec數量', '1月數量', '1月單價', '1月營收', '2月數量', '2月單價', '2月營收', '3月數量', '3月單價', '3月營收', '4月數量', '4月單價', '4月營收', '5月數量', '5月單價', '5月營收', '6月數量', '6月單價', '6月營收', '7月數量', '7月單價', '7月營收', '8月數量', '8月單價', '8月營收', '9月數量', '9月單價', '9月營收', '10月數量', '10月單價', '10月營收', '11月數量', '11月單價', '11月營收', '12月數量', '12月單價', '12月營收', 'AP', 'FCST', 'Actual', 'Actual vs AP Hit Rate', 'Actual vs FCST Hit Rate', '單價', '營收', '數量', 'NSB', '%', 'GPM', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],//需要千分位表示數字的欄位名稱
    NeedModifyDisplayArr: ['出貨數', '成本', '毛利率', 'Jan營收', 'Feb營收', 'Mar營收', 'Apr營收', 'May營收', 'Jun營收', 'Jul營收', 'Aug營收', 'Sep營收', 'Oct營收', 'Nov營收', 'Dec營收', 'Jan單價', 'Feb單價', 'Mar單價', 'Apr單價', 'May單價', 'Jun單價', 'Jul單價', 'Aug單價', 'Sep單價', 'Oct單價', 'Nov單價', 'Dec單價', 'Jan數量', 'Feb數量', 'Mar數量', 'Apr數量', 'May數量', 'Jun數量', 'Jul數量', 'Aug數量', 'Sep數量', 'Oct數量', 'Nov數量', 'Dec數量', '1月數量', '1月單價', '1月營收', '2月數量', '2月單價', '2月營收', '3月數量', '3月單價', '3月營收', '4月數量', '4月單價', '4月營收', '5月數量', '5月單價', '5月營收', '6月數量', '6月單價', '6月營收', '7月數量', '7月單價', '7月營收', '8月數量', '8月單價', '8月營收', '9月數量', '9月單價', '9月營收', '10月數量', '10月單價', '10月營收', '11月數量', '11月單價', '11月營收', '12月數量', '12月單價', '12月營收', 'AP', 'FCST', 'Actual', 'Actual vs AP Hit Rate', 'Actual vs FCST Hit Rate', '單價', '營收', '數量', 'Taeget GP %', 'NSB', '%', 'GPM', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],//需要將顯示的值做特別修改
    MillionFieldArr: [],//需要轉百萬的欄位
    IgnoreZero: [],//若是0，可忽略的欄位
    SetRight: [],//欄位需要置右的欄位名稱
    DatePickerArr: ['開始時間', '預計完成日', '實際完成日', 'ISSUE_DATE', '週From', '週To'],//日期選單
    TextAreaArr: ['備註'],//需要textarea的欄位名稱
    CheckboxArr: ['成本為0或空值'],
}

export var PageSetObj: PageSetObj = {//此物件屬性儲存都是頁面名稱
    noDeletePage: ['APQuery', 'FCSTQuery', 'APvsFCSTvsAct', 'BillingFCSTChart', 'APFCSTChart', 'CompRevenueChart', 'ProdCustGPM', 'Top10ProdCustGPM', 'Top10CustomerRevenue', 'CustomerRevenueQuery', 'NewProductCustomerNSB', 'CPRUNCARDCOST', 'FTRUNCARDCOST', 'COST_SUMMARY', 'TESTERCOST_SUMMARY'],//不需要刪除功能的頁面
    noSortPage: ['APQuery', 'FCSTQuery', 'APvsFCSTvsAct', 'BillingFCSTChart', 'APFCSTChart', 'CompRevenueChart', 'ProdCustGPM', 'Top10ProdCustGPM', 'Top10CustomerRevenue', 'CustomerRevenueQuery', 'NewProductCustomerNSB', 'CPRUNCARDCOST', 'FTRUNCARDCOST', 'COST_SUMMARY', 'TESTERCOST_SUMMARY'],//不需要排序的頁面
    noInSearchingPage: ['APMaintain', 'FCSTMaintain', 'APQuery', 'FCSTQuery', 'APvsFCSTvsAct', 'BillingFCSTChart', 'APFCSTChart', 'CompRevenueChart', 'ProdCustGPM', 'Top10ProdCustGPM', 'Top10CustomerRevenue', 'CustomerRevenueQuery', 'NewProductCustomerNSB', 'CPRUNCARDCOST', 'FTRUNCARDCOST', 'COST_SUMMARY', 'TESTERCOST_SUMMARY'],//不需要表格內搜尋的頁面
    noPage: ['APQuery', 'FCSTQuery', 'APvsFCSTvsAct', 'BillingFCSTChart', 'APFCSTChart', 'CompRevenueChart', 'ProdCustGPM', 'Top10ProdCustGPM', 'Top10CustomerRevenue', 'CustomerRevenueQuery', 'NewProductCustomerNSB'],//不需要分頁的頁面
    ChartPage: ['BillingFCSTChart', 'CompRevenueChart', 'Top10CustomerRevenue', 'NewProductCustomerNSB', 'APFCSTChart'],//需要圖表的頁面
    NoChangePage: [],//不需要運行替換顯示欄位的機制的頁面
    NeedYScroll: ['APQuery', 'FCSTQuery', 'APvsFCSTvsAct'],//需要Y軸滾輪的頁面
    NeedDataTableFreeze: ['FCSTQuery', 'APQuery', 'APvsFCSTvsAct', 'FTRUNCARDCOST', 'CPRUNCARDCOST'],//需要使用DataTable的凍結欄位渲染
    NeedResetFieldArr: ['APQuery', 'FCSTQuery', 'APvsFCSTvsAct', 'BillingFCSTChart', 'APFCSTChart', 'CompRevenueChart', 'ProdCustGPM', 'Top10CustomerRevenue', 'CustomerRevenueQuery', 'NewProductCustomerNSB', 'Top10ProdCustGPM', 'COST_SUMMARY', 'TESTERCOST_SUMMARY'],//需要重新定義欄位名稱(一開始後端傳過來的欄位名稱是搜尋欄位)
    NeedCheckDecimalPoint: [],//需要檢查百分比小數幾位數
    noDataTable: ['ProdCustGPM', 'Top10ProdCustGPM'],//不需要DataTable渲染
    NeedMillionInf: ['BillingFCSTChart', 'APFCSTChart', 'CompRevenueChart', 'CustomerRevenueQuery', 'Top10CustomerRevenue', 'NewProductCustomerNSB', 'ProdCustGPM', 'Top10ProdCustGPM'],//需要百萬訊息標示的頁面
    NeedExport: ['FCSTMaintain', 'APMaintain', 'CompRevenueChart', 'Top10CustomerRevenue', 'CustomerRevenueQuery', 'APQuery', 'FCSTQuery', 'APvsFCSTvsAct', 'OVH', 'HMRATIO', 'VARIABLE'],//需要匯出的頁面
    NoDefaultSearch: ['FTRUNCARDCOST', 'CPRUNCARDCOST', 'COST_SUMMARY', 'TESTERCOST_SUMMARY'],//頁面載入時不預設搜尋
    TableNeedDefer: [],
}

//月份對應的字串
export enum MonthFormat {
    Jan = 1,
    Feb = 2,
    Mar = 3,
    Apr = 4,
    May = 5,
    Jun = 6,
    Jul = 7,
    Aug = 8,
    Sep = 9,
    Oct = 10,
    Nov = 11,
    Dec = 12
}

//年報表對應字串
export enum YearFormat {
    上半年 = 1,
    下半年 = 2
}

//季報表對應字串
export enum SeasonFormat {
    Q1 = 1,
    Q2 = 2,
    Q3 = 3,
    Q4 = 4
}

//此class的函示會隨著不同系統有不同的定義
//需調整if/else
//或是覆寫
export class PageSet {
    //頁面DOM的設定⬇

    //重設Menu的InnerHtml值(懶得要求後端維護者修改，故於此重新定義)
    public ResetMenuDocumentInnerHtml(tPageName: string) {
        if (tPageName == 'APvsFCSTvsAct') {
            let MenuName = 'FCSTSAName';
            let tDom = document.getElementById(MenuName);
            if (tDom) {
                let tHtmlStr = tDom.innerHTML;
                let tArr: string[] = tHtmlStr.split(';');
                for (let i = 0; i < tArr.length; i++) {
                    let tmp = tArr[i].split(',');
                    tArr[i] = tmp[0] + ',SA-' + tmp[1];
                }
                let reStr = tArr.join(';');
                tDom.innerHTML = reStr;
            }
        }
    }

    //動態給定Menu Bar超連結
    //tPageName: 頁面名稱
    public SetMaintain(tPageName: string) {
        let tMaintainObj: {
            [PageName: string]: {
                [LinkName: string]: string
            }
        } = {
            'Index': {
                'AP維護(測試)': 'http://192.168.5.141:83/TR/Default/APMaintain',
                'FCST維護(測試)': 'http://192.168.5.141:83/TR/Default/FCSTMaintain',
                'AP維護(切挑)': 'http://192.168.5.141:83/DS/Default/APMaintain',
                'FCST維護(切挑)': 'http://192.168.5.141:83/DS/Default/FCSTMaintain'
            },
            'TEST_RECEIVE': {
                'FCST維護': 'http://192.168.5.141:83/TR/Default/FCSTMaintain'
            },
            'TEST_IN_GOODS': {
                'FCST維護': 'http://192.168.5.141:83/TR/Default/FCSTMaintain'
            },
            'TEST_OUT_GOODS': {
                'FCST維護': 'http://192.168.5.141:83/TR/Default/FCSTMaintain'
            },
            'DS_IN_GOODS': {
                'FCST維護': 'http://192.168.5.141:83/DS/Default/FCSTMaintain'
            },
            'DS_OUT_GOODS': {
                'FCST維護': 'http://192.168.5.141:83/DS/Default/FCSTMaintain'
            }
        }

        if (tMaintainObj[tPageName]) {
            let tDom = document.getElementById('MaintainArea');
            if (tDom) {
                let tHtmlStr = tDom.innerHTML;
                for (let tKey in tMaintainObj[tPageName]) {
                    tHtmlStr += '<li><a href="' + tMaintainObj[tPageName][tKey] + '">' + tKey + '</a></li>';
                }

                tDom.innerHTML = tHtmlStr;
            }
        }
    }

    //頁面DOM的設定⬆

    //初始化定義物件屬性⬇

    //定義PageName底下的子PageName，區塊搜尋的各區塊Block Id、Sub Block Id、點擊搜尋的子Table都於此定義
    //tPageName: 頁面名稱
    public SetChildPageName(tPageName: string): void {
        if (gPageObj.PageNameObj[tPageName] == null) { return; }
        let ChildPageName: {
            [ChildPageName: string]: {
                BlockId?: string,//此子頁面名稱所屬的DOM物件ID名稱(目前實作於區塊搜尋)
                SubBlockId?: string[]//此子頁面名稱所含的子DOM物件名稱(目前實作於區塊搜尋)
            }
        } = {};
        let ChildPageNameArr: string[] = [];

        switch (tPageName) {
            case 'Index':
                ChildPageName = {
                    SEMI_TABLE_MTD_YTM_NSB: {
                        BlockId: 'TDTMNSB'
                    },
                    SEMI_TABLE_Top10_CUST_NSB: {
                        BlockId: 'TOP10CUST'
                    },
                    SEMI_TABLE_IN_OUT_GOODS: {
                        BlockId: 'PSINF'
                    },
                    Prober_Handler: {
                        BlockId: 'PHAB'
                    },
                    SEMI_TESTER: {
                        BlockId: 'TESTERAB'
                    },
                    SEMI_PROJECT: {
                        BlockId: 'MAINREPORT'
                    },
                    SEMI_PART_INFO: {
                        BlockId: 'PARTS'
                    },
                    SEMI_PART_DETAIL: {
                        BlockId: 'CUST'
                    },
                }
                for (let key in ChildPageName) {
                    ChildPageNameArr.push(key);
                }
                break;
            case 'TEST_OUT_GOODS':
                ChildPageNameArr = ['TEST_OUT_GOODS_LIST'];
                break;
            case 'TEST_IN_GOODS':
                ChildPageNameArr = ['TEST_IN_GOODS_LIST'];
                break;
            case 'TEST_RECEIVE':
                ChildPageNameArr = ['TEST_RECEIVE_LIST'];
                break;
            case 'TEST_LOTSIZE':
                ChildPageNameArr = ['TEST_LOTSIZE_LIST'];
                break;
            case 'DS_IN_GOODS':
                ChildPageNameArr = ['DS_IN_GOODS_LIST'];
                break;
            case 'DS_OUT_GOODS':
                ChildPageNameArr = ['DS_OUT_GOODS_LIST'];
                break;
            case 'Prober_Handler_CPLCD':
                ChildPageNameArr = ['Prober_Handler_CPLCD_LIST'];
                break;
            case 'Prober_Handler_FT':
                ChildPageNameArr = ['Prober_Handler_FT_LIST'];
                break;
            case 'INK_Activation':
                ChildPageNameArr = ['INK_Activation_LIST'];
                break;
            case 'AOI_Activation':
                ChildPageNameArr = ['AOI_Activation_LIST'];
                break;
            case 'Tester_Activation':
                ChildPageNameArr = ['Tester_Activation_LIST'];
                break;
            case 'Prober_Handler_LBI':
                ChildPageNameArr = ['Prober_Handler_LBI_LIST'];
                break;
            case 'Prober_Handler_DS':
                ChildPageNameArr = ['Prober_Handler_DS_LIST'];
                break;
            default:
                break;
        }

        gPageObj.PageNameObj[tPageName].ChildName = ChildPageNameArr;

        for (let i = 0; i < ChildPageNameArr.length; i++) {
            if (gPageObj.PageNameObj[ChildPageNameArr[i]] == null) {
                gPageObj.PageNameArr.push(ChildPageNameArr[i]);
            }
            gPageObj.PageNameObj[ChildPageNameArr[i]] = new PageInf(ChildPageNameArr[i]);
            gPageObj.PageNameObj[ChildPageNameArr[i]].SetTableTitle();
            gPageObj.PageNameObj[ChildPageNameArr[i]].ParentName = tPageName;
            if (ChildPageName[ChildPageNameArr[i]]?.BlockId != null) {
                gPageObj.PageNameObj[ChildPageNameArr[i]].BlockId = ChildPageName[ChildPageNameArr[i]].BlockId;
            }
            if (ChildPageName[ChildPageNameArr[i]]?.SubBlockId != null) {
                gPageObj.PageNameObj[ChildPageNameArr[i]].SubBlockId = ChildPageName[ChildPageNameArr[i]].SubBlockId;
            }

            this.SetChildPageName(ChildPageNameArr[i]);
        }
    }

    //定義查詢的查詢頁數、查詢的一頁幾筆
    //tPageName: 頁面名稱
    //回傳值[PageNumber, NumberPerAPage]
    public DefineSearPageInf(tPageName: string): [number, number] {
        let PageNumber = -1;
        let NumberPerAPage = 10;

        if (tPageName == 'TEST_OUT_GOODS_LIST' || tPageName == 'TEST_IN_GOODS_LIST' || tPageName == 'TEST_RECEIVE_LIST'
            || tPageName == 'TEST_LOTSIZE_LIST' || tPageName == 'DS_IN_GOODS_LIST' || tPageName == 'DS_OUT_GOODS_LIST'
            || tPageName == 'Prober_Handler_CPLCD_LIST' || tPageName == 'INK_Activation_LIST' || tPageName == 'AOI_Activation_LIST'
            || tPageName == 'Prober_Handler_FT_LIST' || tPageName == 'Tester_Activation_LIST' || tPageName == 'Prober_Handler_LBI_LIST'
            || tPageName == 'Prober_Handler_DS_LIST') {
            PageNumber = 1;
            NumberPerAPage = 10;
        }

        return [PageNumber, NumberPerAPage];
    }

    // 定義該頁面可否修改陣列
    // tPageName:頁面名稱
    // tFieldArr:頁面的欄位名稱陣列
    public InitModifiable(tPageName: string, tFieldArr: Array<string>): Array<boolean> {//初始化可否修改陣列
        let tModifiableArr: Array<boolean> = [];
        let ModifiableInf: {
            [PageName: string]: {
                AllFalse?: boolean,//所有欄位都不可修改
                SomeFalse?: string[]//欄位名稱陣列。僅定義中的欄位名稱不可修改
            }
        } = {
            CustDefi: { SomeFalse: ['年度'] },
            APMaintain: { SomeFalse: ['Ver', '1月營收', '2月營收', '3月營收', '4月營收', '5月營收', '6月營收', '7月營收', '8月營收', '9月營收', '10月營收', '11月營收', '12月營收'] },
            OVH: { SomeFalse: ['更新時間'] },
            HMRATIO: { SomeFalse: ['更新時間'] },
            VARIABLE: { SomeFalse: ['更新時間'] },
            RentCost: { SomeFalse: ['年度', '費用類別'] },
            APvsFCSTvsAct: { AllFalse: true },
            APQuery: { AllFalse: true },
            FCSTQuery: { AllFalse: true },
            Top10ProdCustGPM: { AllFalse: true },
            ProdCustGPM: { AllFalse: true },
            COST_CP: { AllFalse: true },
            CPRUNCARDCOST: { SomeFalse: ['客戶代碼', '客戶名稱', 'PRODUCT_TYPE', 'RCNO', 'RCARD', '型號', 'DEVICE_S', 'BELONG', 'SEQUENCE'] },
            FTRUNCARDCOST: { SomeFalse: ['BU', '客戶代碼', 'CUST_NAME', 'PRODUCT_TYPE', '型號', 'DEVICE_S', 'RCARD', 'DPKTYPE', 'STEP', 'SEQUENCE', 'RCNO'] },
            COST_SUMMARY: { SomeFalse: ['年度', '月份', 'BU', '客戶群組', '客戶代碼', '客戶名稱', '產品線', '流程卡', '型號', '出貨數', '營收', '毛利率'] },
            TESTERCOST_SUMMARY: { SomeFalse: ['年度', '月份', 'BU', '客戶群組', '客戶代碼', '客戶名稱', '產品線', '流程卡', '型號', '測試機', '站點', 'DUT', '溫度', '配件', '機台類別', '出貨數', '營收', '包機機台', '毛利率'] }
        };

        for (let i = 0; i < tFieldArr.length; i++) {
            if (i == 0) { tModifiableArr.push(false); }//流水號
            else if (tFieldArr[i] == '資料來源') { tModifiableArr.push(false); }//固定不可修改
            else if (ModifiableInf[tPageName] && ModifiableInf[tPageName].AllFalse) { tModifiableArr.push(false); }
            else if (ModifiableInf[tPageName] && (ModifiableInf[tPageName].SomeFalse!.indexOf(tFieldArr[i])) > -1) { tModifiableArr.push(false); }
            else { tModifiableArr.push(true); }//預設可修改
        }

        return tModifiableArr;
    }

    //新增欄位時各欄位的預設值(欄位值基本不需要更改的)
    public AddLineDefaultValue(tPageName: string, tFieldName: string): string {
        type DefaultSet = {
            [key: string]: {//key:欄位名稱
                GetValueBySearchBar: boolean,//是否根據搜尋條件帶入值
                SetValue?: string//設定此欄位的預設值
            }
        }

        let Today = new Date();
        let year = Today.getFullYear();
        let month = (Today.getMonth() + 1);
        let day = Today.getDate() - 1;
        let dateStr = year.toString() + '/' + paddingLeft(month.toString(), 2) + '/' + paddingLeft(day.toString(), 2);

        let DefaultInf: DefaultSet = {
            年度: {
                GetValueBySearchBar: true
            },
            BU: {
                GetValueBySearchBar: true
            },
            維護單位: {
                GetValueBySearchBar: true
            },
            月份: {
                GetValueBySearchBar: true
            },
            開始時間: {
                GetValueBySearchBar: false,
                SetValue: dateStr
            },
            預計完成日: {
                GetValueBySearchBar: false,
                SetValue: dateStr
            },
            ISSUE_DATE: {
                GetValueBySearchBar: false,
                SetValue: dateStr
            },
            費用類別: {
                GetValueBySearchBar: false,
                SetValue: '手動新增'
            }
        }

        if (DefaultInf[tFieldName] != null && gPageObj.PageNameObj[tPageName] != null) {
            let fIdx = gPageObj.PageNameObj[tPageName].FieldArr.indexOf(tFieldName);
            if (DefaultInf[tFieldName].GetValueBySearchBar && fIdx > -1) {
                if (fIdx > -1) {
                    return gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[fIdx];
                }
            }

            return DefaultInf[tFieldName].SetValue || '';
        }

        return '';
    }

    //根據欄位值內容決定各欄位可否修改。此函式用於定義搜尋結果(data)每一行的可否修改
    //ValueArr: 一行的數據陣列
    public CheckFieldModifiable(tPageName: string, ValueArr: string[]): boolean[] {
        if (gPageObj.PageNameObj[tPageName] == null) { return []; }

        let FieldModifiableInf: {//所有頁面中的欄位可否修改定義
            [FieldName: string]: {//欄位名稱。新規則則再增加屬性定義
                ValueNotEmptyThenNoEdit?: string[],//此欄位名稱值若不是空白，則此陣列中的欄位名稱不可修改
                ValueThenNoEdit?: {
                    Value: string[],//此欄位名稱值若是指定值的其中一個，則ThenNoEdit陣列中的欄位名稱不可修改
                    ThenNoEdit: string[],//不可修改的目標欄位名稱
                },
            }
        } = {
            資料來源: {
                ValueNotEmptyThenNoEdit: ['客戶代碼', '客戶名稱']
            },
            Ver: {
                ValueNotEmptyThenNoEdit: ['年度', 'BU', '客戶編號', '型號', 'Prober/Handler', 'Tester', 'Product Type', '1月數量', '1月單價', '1月GP(%)', '1月營收', '2月數量', '2月單價', '2月GP(%)', '2月營收', '3月數量', '3月單價', '3月GP(%)', '3月營收', '4月數量', '4月單價', '4月GP(%)', '4月營收', '5月數量', '5月單價', '5月GP(%)', '5月營收', '6月數量', '6月單價', '6月GP(%)', '6月營收', '7月數量', '7月單價', '7月GP(%)', '7月營收', '8月數量', '8月單價', '8月GP(%)', '8月營收', '9月數量', '9月單價', '9月GP(%)', '9月營收', '10月數量', '10月單價', '10月GP(%)', '10月營收', '11月數量', '11月單價', '11月GP(%)', '11月營收', '12月數量', '12月單價', '12月GP(%)']
            },
            費用類別: {
                ValueThenNoEdit: {
                    Value: ['借機費用', '包機費用'],
                    ThenNoEdit: ['年度', 'BU', '客戶編號', '費用類別']
                }
            }
        };

        let PageNameModifiableInf: {//部分頁面名稱的可否修改定義
            [PageName: string]: {//頁面名稱
                OnlyNowAndFutreEdit?: string[],//此頁面名稱的這些欄位名稱陣列只有現在和未來的月份可以修改
            }
        } = {
            FCSTMaintain: {
                OnlyNowAndFutreEdit: ['1月數量', '1月單價', '2月數量', '2月單價', '3月數量', '3月單價', '4月數量', '4月單價', '5月數量', '5月單價', '6月數量', '6月單價', '7月數量', '7月單價', '8月數量', '8月單價', '9月數量', '9月單價', '10月數量', '10月單價', '11月數量', '11月單價', '12月數量', '12月單價']
            }
        };

        let mArr: boolean[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].ModifiableArr));
        let FieldArr = gPageObj.PageNameObj[tPageName].TitleStrArr;

        for (let FieldName in FieldModifiableInf) {
            let tIdx = FieldArr.indexOf(FieldName);
            if (tIdx > -1) {
                if (FieldModifiableInf[FieldName].ValueNotEmptyThenNoEdit && ValueArr[tIdx] != '') {
                    for (let i = 0; i < (FieldModifiableInf[FieldName].ValueNotEmptyThenNoEdit?.length || 0); i++) {
                        let aIdx: number = FieldArr.indexOf(FieldModifiableInf[FieldName].ValueNotEmptyThenNoEdit![i]) || -1;
                        if (aIdx > -1) { mArr[aIdx] = false; }
                    }
                }
                else if (FieldModifiableInf[FieldName].ValueThenNoEdit && ValueArr[tIdx] != '') {
                    if ((FieldModifiableInf[FieldName].ValueThenNoEdit?.Value || []).indexOf(ValueArr[tIdx]) > -1) {
                        for (let i = 0; i < (FieldModifiableInf[FieldName].ValueThenNoEdit?.ThenNoEdit?.length || 0); i++) {
                            let aIdx: number = FieldArr.indexOf(FieldModifiableInf[FieldName].ValueThenNoEdit?.ThenNoEdit![i]) || -1;
                            if (aIdx > -1) { mArr[aIdx] = false; }
                        }
                    }
                }
            }
        }

        if (PageNameModifiableInf[tPageName] != null) {
            if (PageNameModifiableInf[tPageName].OnlyNowAndFutreEdit != null) {
                let tIdx = gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf('年度');
                if (tIdx > -1) {
                    let Year: number = !isNaN(Number(ValueArr[tIdx])) ? parseInt(ValueArr[tIdx]) : 0;
                    let Now = new Date();
                    let NowYear: number = Now.getFullYear();
                    let NowMonth: number = Now.getMonth() + 1;

                    for (let i = 0; i < FieldArr.length; i++) {
                        if (Year < NowYear && PageNameModifiableInf[tPageName].OnlyNowAndFutreEdit && PageNameModifiableInf[tPageName].OnlyNowAndFutreEdit!.indexOf(FieldArr[i]) > -1) {
                            mArr[i] = false;
                        }
                        else if (Year >= NowYear && PageNameModifiableInf[tPageName].OnlyNowAndFutreEdit && PageNameModifiableInf[tPageName].OnlyNowAndFutreEdit!.indexOf(FieldArr[i]) > -1) {
                            if (FieldArr[i].indexOf('月') > -1) {
                                let Month: number = parseInt(FieldArr[i]) || 0;
                                if (Month >= NowMonth) { mArr[i] = true; }
                                else { mArr[i] = false; }
                            }
                            else { mArr[i] = true; }
                        }
                    }
                }
            }
        }

        return mArr;
    }

    //下拉式,input的篩選器
    //fFieldName: 欄位名稱
    //isSearch: 是不是搜尋欄位的模式。false表示Table裡的下拉式選單
    public GetListArr(tPageName: string, fFieldName: string, isSearch: boolean) {
        //加入下拉式選單會影響其他選單的功能(純前端切換)
        let reArr: Array<string> = new Array();
        let tListName = fFieldName;
        //下拉式,input的篩選器
        if (isSearch && tPageName == 'RentCost' && fFieldName == '客戶編號') {
            tListName = 'RentCostCust';
        }
        else if (!isSearch && tPageName == 'RentCost' && fFieldName == '客戶編號') {
            tListName = 'TEST_ALL_CUST';
        }
        else if (tPageName == 'RentCost' && fFieldName == '測試平台') {
            tListName = 'Tester';
        }
        else if (tPageName == 'RentCost' && fFieldName == '機台類別') {
            tListName = 'PH_MacType_Display';
        }
        else if (tPageName == 'RentCost' && fFieldName == '產品類別') {
            tListName = 'ProductName';
        }
        else if (tPageName == 'RevenueMT_Comp' && fFieldName == '客戶') {
            tListName = 'CompDisplay';
        }
        else if (tPageName == 'RevenueMT_Cust' && fFieldName == '客戶') {
            tListName = 'Top10CustDisplay';
        }
        else if (tPageName == 'APMaintain' && fFieldName == '客戶編號') {
            tListName = 'CustCompine3AP';
        }
        else if (tPageName == 'APMaintain' && fFieldName == 'Prober/Handler') {
            tListName = 'PerHer';
        }
        else if (tPageName == 'APMaintain' && fFieldName == 'Tester') {
            tListName = 'Tester';
        }
        else if ((tPageName == 'APMaintain') && (fFieldName == 'Product Type' || fFieldName == '產品類別')) {
            tListName = 'ProductType';
        }
        else if (tPageName == 'APMaintain' && fFieldName == 'Ver') {
            tListName = 'Ver';
        }
        else if ((tPageName == 'FCSTQuery' && fFieldName == '業務名稱')
            || (tPageName == 'APvsFCSTvsAct' && fFieldName == 'FCST 維護名稱')) {
            tListName = 'FCSTSAName';
        }
        else if ((tPageName == 'BillingFCSTChart' || tPageName == 'APFCSTChart') && fFieldName == '客戶') {
            tListName = 'CustCombineCN';
        }
        else if ((tPageName == 'BillingFCSTChart' || tPageName == 'APFCSTChart') && fFieldName == '產品類別') {
            tListName = 'BUProdList';
        }
        else if (tPageName == 'CustomerRevenueQuery' && fFieldName == '十大客戶') {
            tListName = 'Top10CustDisplay2';
        }
        else if (tPageName == 'CPRUNCARDCOST' && fFieldName == '客戶代碼') {
            tListName = 'Runcard_W_Cust';
        }
        else if (tPageName == 'FTRUNCARDCOST' && fFieldName == '客戶代碼') {
            tListName = 'Runcard_C_Cust';
        }
        else if (tPageName == 'COST_SUMMARY' && fFieldName == '客戶代碼') {
            tListName = 'RC_Cust';
        }
        else if (tPageName == 'TESTERCOST_SUMMARY' && fFieldName == '客戶代碼') {
            tListName = 'RCT_Cust';
        }
        else if (tPageName == 'COST_SUMMARY' && fFieldName == '產品線') {
            tListName = 'RC_PRODUCTTYPE';
        }
        else if (tPageName == 'TESTERCOST_SUMMARY' && fFieldName == '產品線') {
            tListName = 'RCT_PRODUCTTYPE';
        }
        else if (fFieldName == 'Prober/Handler') {
            tListName = 'PerHer';
        }
        else if (fFieldName == 'Product Type') {
            tListName = 'ProductType';
        }
        else if (fFieldName == '客戶編號') {
            let ttidx = gPageObj.PageNameObj[tPageName].FieldArr.indexOf('維護單位');
            if (gPageObj.PageNameObj[tPageName].LastQuery.QueryArr == null) {
                tListName = 'CustCompine3SA';
            }
            else {
                let gValue = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[ttidx];
                if (gValue == 'SA') {
                    tListName = 'CustCompine3SA';
                }
                else if (gValue == 'PC') {
                    tListName = 'CustCompine3PC';
                }
            }
        }
        else if (fFieldName == 'SA') {
            tListName = 'APSAName';
        }

        if (MenuList[tListName] != null) {
            reArr = MenuList[tListName].MenuArr;
        }

        for (let i = 0; i < reArr.length; i++) {
            if (reArr[i].indexOf(',') < 0) { reArr[i] = reArr[i] + ',' + reArr[i]; }
            if (tPageName == 'BillingFCSTChart' || tPageName == 'APFCSTChart'
                || (tPageName == 'RentCost' && fFieldName == '機台類別')
                || ((tPageName == 'COST_SUMMARY' || tPageName == 'TESTERCOST_SUMMARY') && fFieldName == '產品線')) {
                let tt = reArr[i].split(',');
                let tmpIdx = tt[1].indexOf('-');
                reArr[i] = tt[0] + ',' + tt[1].substring(tmpIdx + 1);
            }
            let ttt = reArr[i].split(',');
            if (ttt[0].indexOf('"') > -1) {
                reArr[i] = ttt[0].replace(/"/g, '”') + ',' + ttt[1];
            }
        }

        reArr = reArr.filter(onlyUnique);
        reArr = this.GetListTitle(tPageName, fFieldName, isSearch, reArr);

        return reArr;
    }

    //產生下拉式的數據陣列(由前端定義下拉式選單)
    public GetList(tPageName: string, fListName: string) {
        let reArr = new Array();

        if (fListName == '年度' || fListName == '年') {
            let Today = new Date();
            let start = Today.getFullYear() + 1;
            for (let i = start; i >= 2018; i--) {
                reArr.push(i.toString() + ',' + i.toString());
            }
        }
        else if (fListName == '月' || fListName == '月份') {
            for (let i = 1; i <= 12; i++) {
                reArr.push(i.toString() + ',' + i.toString());
            }
        }
        else if (fListName == '新/舊客戶' || fListName == '新/舊產品') {
            reArr.push('EXISTING,EXISTING');
            reArr.push('NEW,NEW');
        }
        else if (fListName == '客戶區域定義') {
            reArr.push('國內,國內');
            reArr.push('國外,國外');
        }
        else if (fListName == '包機客戶') {
            reArr.push(',');
            reArr.push('是,是');
        }
        else if (tPageName == 'CPRUNCARDCOST' && fListName == 'BU') {
            reArr.push('CP,CP');
            reArr.push('LCD,LCD');
        }
        else if (fListName == 'BU' || fListName == 'Process') {
            reArr.push('CP,CP');
            reArr.push('FT,FT');
            reArr.push('LCD,LCD');
        }
        else if ((tPageName == 'ProdCustGPM' || tPageName == 'Top10ProdCustGPM' || tPageName == 'NewProductCustomerNSB') && fListName == 'Type') {
            reArr.push('Product,Product');
            reArr.push('Customer,Customer');
        }
        else if (fListName == 'Type') {
            reArr.push('PROBER,PROBER');
            reArr.push('HANDLER,HANDLER');
            reArr.push('TESTER,TESTER');
        }
        else if (fListName == '客戶') {
            reArr.push('競爭對手,競爭對手');
            reArr.push('十大客戶,十大客戶');
        }
        else if (fListName == '維護單位' || fListName == 'SA/PC' || fListName == 'FCST 維護單位' || fListName == 'FCST維護單位') {
            reArr.push('SA,SA');
            reArr.push('PC,PC');
        }
        else if (fListName == '報表類型') {
            reArr.push('semi,semi');
            reArr.push('季,季');
            reArr.push('月,月');
        }
        else if (fListName == '加總條件') {
            reArr.push('BU,BU');
            reArr.push('區域,區域');
            reArr.push('新/舊客戶,新/舊客戶');
            reArr.push('新/舊產品,新/舊產品');
            reArr.push('客戶,客戶');
            reArr.push('Product Type,Product Type');
            reArr.push('Tester,Tester');
        }
        else if (fListName == '計算單位') {
            reArr.push('金額,金額');
            reArr.push('數量,數量');
        }
        else if (fListName == '查詢方式') {
            reArr.push('累計,累計');
            reArr.push('當月,當月');
        }
        else if ((tPageName == 'OVH' && fListName == '工時Flag') || fListName == '是否有效') {
            reArr.push('Y,Y');
            reArr.push('N,N');
        }
        else if (fListName == '營收日期') {
            reArr.push('出貨日期,出貨日期');
            reArr.push('發票日期,發票日期');
        }

        return reArr;
    }

    //下拉式選單需要額外加選項
    public GetListTitle(tPageName: string, fFieldName: string, isSearch: boolean, reArr: string[]): string[] {
        if (isSearch && (tPageName == 'APMaintain' && fFieldName == 'Ver')) {
            let tmpArr = ['-1,'];
            reArr = tmpArr.concat(reArr);
        }
        else if (tPageName == 'APQuery' && fFieldName == 'Ver' && reArr.length == 1 && reArr[0] == ',') {
            reArr[0] = '-1,';
        }
        else if (isSearch && (((tPageName == 'APMaintain' || tPageName == 'FCSTMaintain') && fFieldName == 'BU')
            || (tPageName == 'APQuery' && (fFieldName == 'SA' || fFieldName == '加總條件' || fFieldName == 'BU'))
            || (tPageName == 'FCSTQuery' && (fFieldName == '業務名稱' || fFieldName == 'BU' || fFieldName == '加總條件'))
            || (tPageName == 'APvsFCSTvsAct' && (fFieldName == 'FCST 維護名稱' || fFieldName == '加總條件' || fFieldName == 'BU'))
            || (tPageName == 'BillingFCSTChart' && (fFieldName == '客戶' || fFieldName == 'BU'))
            || (tPageName == 'APFCSTChart' && (fFieldName == '客戶' || fFieldName == 'BU'))
            || ((tPageName == 'NewProductCustomerNSB' || tPageName == 'COST_SUMMARY' || tPageName == 'TESTERCOST_SUMMARY') && (fFieldName == 'BU'))
            || (tPageName == 'RentCost' && (fFieldName == 'BU' || fFieldName == '客戶編號'))
            || fFieldName == '產品類別' || fFieldName == '產品線')
            || ((tPageName == 'FTRUNCARDCOST' || tPageName == 'CPRUNCARDCOST' || tPageName == 'COST_SUMMARY' || tPageName == 'TESTERCOST_SUMMARY') && (fFieldName == '客戶代碼'))) {
            if (reArr.length == 1 && reArr[0] == ',') {
                reArr[0] = ',All';
            }
            else if (reArr.length == 0 || reArr[0] != ',All') {
                let tmpArr = [',All'];
                reArr = tmpArr.concat(reArr);
            }
        }
        else if (!isSearch && ((tPageName == 'RentCost' && (fFieldName == '產品類別' || fFieldName == '測試平台' || fFieldName == '機台類別')))) {
            if (reArr.length > 1) {
                let tmpArr = [','];
                reArr = tmpArr.concat(reArr);
            }
        }
        else if ((tPageName == 'Actual' && (fFieldName == '產品類別' || fFieldName == '代理商名稱' || fFieldName == '終端客戶')) ||
            (tPageName == 'DistributorDefin' && (fFieldName == '新舊代理商' || fFieldName == '是否為代理商')) ||
            (tPageName == 'EndCustomer' && fFieldName == '負責代理商') ||
            (tPageName == 'SalesRecord' && (fFieldName == '競爭對手名稱' || fFieldName == '終端客戶')) ||
            (tPageName == 'ProjectReview' && (fFieldName == 'Win/Lost')) ||
            ((tPageName == 'APMaintain' || tPageName == 'FCSTMaintain') && (fFieldName == 'Prober/Handler' || fFieldName == 'Tester'))) {
            if (reArr.length > 1) {
                let tmpArr = [','];
                reArr = tmpArr.concat(reArr);
            }
        }

        return reArr;
    }

    //搜尋欄位的預設值
    //tPageName: 頁面名稱
    public InitSearchObj(tPageName: string): { DisplayArr: string[], DefaultKey: string[], DefaultValue: string[] } {
        let Today = new Date();
        let date = Today.getDate();
        let Year = Today.getFullYear();
        let Month = Today.getMonth() + 1;
        if (date == 1 && Month > 1) {
            Month = Month - 1;
        }
        else if (date == 1 && Month == 1) {
            Month = 12;
            Year = Year - 1;
        }
        let obj: { DisplayArr: string[], DefaultKey: string[], DefaultValue: string[] } = {
            DisplayArr: new Array(),
            DefaultKey: new Array(),
            DefaultValue: new Array()
        };

        if (tPageName == 'CustDefi') {
            obj.DisplayArr = ['年度'];
            obj.DefaultKey = ['年度'];
            obj.DefaultValue = [Today.getFullYear().toString()];
        }
        else if (tPageName == 'ProdDefi') {
            obj.DisplayArr = ['年度'];
            obj.DefaultKey = ['年度'];
            obj.DefaultValue = [Today.getFullYear().toString()];
        }
        else if (tPageName == 'RentCost') {
            obj.DisplayArr = ['年度', 'BU', '客戶編號'];
            obj.DefaultKey = ['年度', 'BU', '客戶編號'];
            obj.DefaultValue = [Today.getFullYear().toString(), '', ''];
        }
        else if (tPageName == 'OVH') {
            obj.DisplayArr = ['年度'];
            obj.DefaultKey = ['年度'];
            obj.DefaultValue = [Today.getFullYear().toString()];
        }
        else if (tPageName == 'HMRATIO') {
            obj.DisplayArr = ['年度'];
            obj.DefaultKey = ['年度'];
            obj.DefaultValue = [Today.getFullYear().toString()];
        }
        else if (tPageName == 'letIABLE') {
            obj.DisplayArr = ['Process'];
            obj.DefaultKey = ['Process'];
            obj.DefaultValue = ['CP'];
        }
        else if (tPageName == 'APMaintain') {
            let verArr: any[] = Object.assign([], this.GetListArr(tPageName, 'Ver', false));
            for (let i = 0; i < verArr.length; i++) {
                verArr[i] = parseInt(verArr[i].split(',')[1]);
            }
            obj.DisplayArr = ['BU', '年度', 'Ver'];
            obj.DefaultKey = ['BU', '年度', 'Ver'];
            obj.DefaultValue = ['', Today.getFullYear().toString(), Math.max(...verArr).toString()];
        }
        else if (tPageName == 'FCSTMaintain') {
            obj.DisplayArr = ['BU', '年度', '維護單位'];
            obj.DefaultKey = ['BU', '年度', '維護單位'];
            obj.DefaultValue = ['', Today.getFullYear().toString(), ''];
        }
        else if (tPageName == 'RevenueMT_Comp') {
            obj.DisplayArr = ['年度'];
            obj.DefaultKey = ['年度'];
            obj.DefaultValue = [Today.getFullYear().toString()];
        }
        else if (tPageName == 'RevenueMT_Cust') {
            obj.DisplayArr = ['年度'];
            obj.DefaultKey = ['年度'];
            obj.DefaultValue = [Today.getFullYear().toString()];
        }
        else if (tPageName == 'APQuery') {
            let verArr: any[] = Object.assign([], this.GetListArr(tPageName, 'Ver', false));
            for (let i = 0; i < verArr.length; i++) {
                verArr[i] = parseInt(verArr[i].split(',')[1]);
            }
            obj.DisplayArr = ['BU', '年度', 'Ver', '報表類型', 'SA', '加總條件'];
            obj.DefaultKey = ['BU', '年度', 'Ver', '報表類型', 'SA', '加總條件'];
            obj.DefaultValue = ['', Today.getFullYear().toString(), Math.max(...verArr).toString(), '月', '', ''];
        }
        else if (tPageName == 'FCSTQuery') {
            obj.DisplayArr = ['BU', '年度', '報表類型', 'SA/PC', '業務名稱', '加總條件'];
            obj.DefaultKey = ['BU', '年度', '報表類型', 'SA/PC', '業務名稱', '加總條件'];
            obj.DefaultValue = ['', Today.getFullYear().toString(), '月', 'SA', '', ''];
        }
        else if (tPageName == 'APvsFCSTvsAct') {
            obj.DisplayArr = ['BU', '年度', '報表類型', 'FCST 維護單位', 'FCST 維護名稱', '加總條件', '計算單位', '營收日期'];
            obj.DefaultKey = ['BU', '年度', '報表類型', 'FCST 維護單位', 'FCST 維護名稱', '加總條件', '計算單位', '營收日期'];
            obj.DefaultValue = ['', Today.getFullYear().toString(), '月', 'SA', '', '金額', '', '出貨日期'];
        }
        else if (tPageName == 'BillingFCSTChart') {
            obj.DisplayArr = ['年度', '月份', 'BU', 'FCST維護單位', '客戶', '產品類別', '計算單位', '營收日期'];
            obj.DefaultKey = ['年度', '月份', 'BU', 'FCST維護單位', '客戶', '產品類別', '計算單位', '營收日期'];
            obj.DefaultValue = [Today.getFullYear().toString(), (Today.getMonth() + 1).toString(), '', 'SA', '', '', '金額', '出貨日期'];
        }
        else if (tPageName == 'APFCSTChart') {
            obj.DisplayArr = ['年度', 'BU', 'FCST維護單位', '客戶', '產品類別', '計算單位', '營收日期'];
            obj.DefaultKey = ['年度', 'BU', 'FCST維護單位', '客戶', '產品類別', '計算單位', '營收日期'];
            obj.DefaultValue = [Today.getFullYear().toString(), '', 'SA', '', '', '金額', '出貨日期'];
        }
        else if (tPageName == 'CompRevenueChart') {
            obj.DisplayArr = ['查詢方式', '年度', '月', '營收日期'];
            obj.DefaultKey = ['查詢方式', '年度', '月', '營收日期'];
            obj.DefaultValue = ['累計', Today.getFullYear().toString(), Today.getMonth().toString(), '出貨日期'];
        }
        else if (tPageName == 'Top10CustomerRevenue') {
            obj.DisplayArr = ['查詢方式', '年度', '月', '營收日期'];
            obj.DefaultKey = ['查詢方式', '年度', '月', '營收日期'];
            obj.DefaultValue = ['累計', Today.getFullYear().toString(), Today.getMonth().toString(), '出貨日期'];
        }
        else if (tPageName == 'CustomerRevenueQuery') {
            obj.DisplayArr = ['年度', '十大客戶', '營收日期'];
            obj.DefaultKey = ['年度', '十大客戶', '營收日期'];
            obj.DefaultValue = [Today.getFullYear().toString(), '', '出貨日期'];
        }
        else if (tPageName == 'NewProductCustomerNSB') {
            obj.DisplayArr = ['年度', 'BU', 'Type'];
            obj.DefaultKey = ['年度', 'BU', 'Type'];
            obj.DefaultValue = [Today.getFullYear().toString(), '', ''];
        }
        else if (tPageName == 'ProdCustGPM') {
            obj.DisplayArr = ['查詢方式', '年度', '月', 'Type'];
            obj.DefaultKey = ['查詢方式', '年度', '月', 'Type'];
            obj.DefaultValue = ['累計', Today.getFullYear().toString(), Today.getMonth().toString(), ''];
        }
        else if (tPageName == 'Top10ProdCustGPM') {
            obj.DisplayArr = ['查詢方式', '年度', '月', 'Type'];
            obj.DefaultKey = ['查詢方式', '年度', '月', 'Type'];
            obj.DefaultValue = ['累計', Today.getFullYear().toString(), Today.getMonth().toString(), ''];
        }
        else if (tPageName == 'CPRUNCARDCOST') {
            obj.DisplayArr = ['BU', '客戶代碼', '型號', 'RCNO'];
            obj.DefaultKey = ['BU', '客戶代碼', '型號', 'RCNO'];
            obj.DefaultValue = ['', '', '', ''];
        }
        else if (tPageName == 'FTRUNCARDCOST') {
            obj.DisplayArr = ['客戶代碼', '型號', 'RCNO'];
            obj.DefaultKey = ['BU', '客戶代碼', '型號', 'RCNO'];
            obj.DefaultValue = ['FT', '', '', ''];
        }
        else if (tPageName == 'COST_SUMMARY') {
            obj.DisplayArr = ['年度', '月份', 'BU', '客戶代碼', '產品線', '型號', '成本為0或空值'];
            obj.DefaultKey = ['年度', '月份', 'BU', '客戶代碼', '產品線', '型號', '成本為0或空值'];
            obj.DefaultValue = [Today.getFullYear().toString(), Today.getMonth().toString(), '', '', '', '', 'false'];
        }
        else if (tPageName == 'TESTERCOST_SUMMARY') {
            obj.DisplayArr = ['年度', '月份', 'BU', '客戶代碼', '產品線', '型號', '成本為0或空值'];
            obj.DefaultKey = ['年度', '月份', 'BU', '客戶代碼', '產品線', '型號', '成本為0或空值'];
            obj.DefaultValue = [Today.getFullYear().toString(), Today.getMonth().toString(), '', '', '', '', 'false'];
        }

        return obj;
    }//搜尋欄位的預設值

    //定義特殊欄位需要有額外的class name(目前實作於Search Bar)
    //tPageName: 頁面名稱
    //tFieldName: 欄位名稱
    public SearchBarClassName(tPageName: string, tFieldName: string): string {
        let reStr = '';
        switch (tFieldName) {
            case '年度':
                reStr = 'YearMode';
                break;
            case '月份':
                reStr = 'MonthMode';
                break;
            case '週From':
                reStr = 'WeekMode';
                break;
            case '週To':
                reStr = 'WeekMode';
                break;
            case '成本為0或空值':
                reStr = 'form-check';
                break;
            default:
                break;
        }

        return reStr;
    }

    //DatePicker的option設定
    //tPageName: 頁面名稱
    //DateObj: Datepicker的option物件
    //SearchBarIdName: 日期選單的Dom ID名稱
    public SetDatePick(tPageName: string, DateObj: any, SearchBarIdName: string): any {
        let CloneObj: any = JSON.parse(JSON.stringify(DateObj));

        if ((tPageName == 'TEST_IN_GOODS' || tPageName == 'TEST_OUT_GOODS' || tPageName == 'TEST_RECEIVE'
            || tPageName == 'TEST_LOTSIZE' || tPageName == 'DS_IN_GOODS' || tPageName == 'DS_OUT_GOODS'
            || tPageName == 'Prober_Handler_CPLCD' || tPageName == 'INK_Activation' || tPageName == 'AOI_Activation'
            || tPageName == 'Prober_Handler_FT' || tPageName == 'Tester_Activation' || tPageName == 'Prober_Handler_LBI'
            || tPageName == 'Prober_Handler_DS')
            && SearchBarIdName == 'field_3') {
            CloneObj.todayBtn = false;
            CloneObj['daysOfWeekDisabled'] = [0, 1, 2, 3, 5, 6];
        }
        else if ((tPageName == 'TEST_IN_GOODS' || tPageName == 'TEST_OUT_GOODS' || tPageName == 'TEST_RECEIVE'
            || tPageName == 'TEST_LOTSIZE' || tPageName == 'DS_IN_GOODS' || tPageName == 'DS_OUT_GOODS'
            || tPageName == 'Prober_Handler_CPLCD' || tPageName == 'INK_Activation' || tPageName == 'AOI_Activation'
            || tPageName == 'Prober_Handler_FT' || tPageName == 'Tester_Activation' || tPageName == 'Prober_Handler_LBI'
            || tPageName == 'Prober_Handler_DS')
            && SearchBarIdName == 'field_4') {
            CloneObj.todayBtn = false;
            CloneObj['daysOfWeekDisabled'] = [0, 1, 2, 4, 5, 6];
        }

        return CloneObj;
    }

    //定義物件屬性⬆

    //重新定義物件屬性⬇

    // 定義Table表單的欄位Title
    // tPageName:頁面名稱
    // TitleInfArr:可以是Search回傳的data; 也可以是搜尋Query。因有些PageName的欄位會由TitleInfArr來決定Title
    public ResetFieldArr(tPageName: string, TitleInfArr?: Array<string>): { FieldArr: string[], NecessaryArr: boolean[], ModifiableArr: boolean[] } {
        //if (gPageObj.PageNameObj[tPageName] == null) { return { FieldArr: [], NecessaryArr: [], ModifiableArr: [] }; }
        let tFieldArr: Array<string> = [];
        let newNecessaryArr: boolean[] = [];
        let newModifiableArr: boolean[] = [];
        let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery;
        //需要定義顯示欄位的頁面都是視圖可編輯的表單(目前)，故預設不可修改

        if (tPageName == 'FCSTQuery') {
            tFieldArr = ['SA/PC', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            let tNum = 0;
            if (LastQuery.QueryArr[2] == 'semi') {
                tNum = 2;
            }
            else if (LastQuery.QueryArr[2] == '季') {
                tNum = 4;
            }
            else if (LastQuery.QueryArr[2] == '月') {
                tNum = 12;
            }

            for (let i = 0; i < tNum; i++) {
                tFieldArr.push('數量');
                tFieldArr.push('營收');
            }

            tFieldArr.push('數量');
            tFieldArr.push('營收');
        }
        else if (tPageName == 'APQuery') {
            tFieldArr = ['業務', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            let tNum = 0;
            if (LastQuery.QueryArr[3] == 'semi') {
                tNum = 2;
            }
            else if (LastQuery.QueryArr[3] == '季') {
                tNum = 4;
            }
            else if (LastQuery.QueryArr[3] == '月') {
                tNum = 12;
            }

            for (let i = 0; i < tNum; i++) {
                tFieldArr.push('數量');
                tFieldArr.push('單價');
                tFieldArr.push('營收');
                tFieldArr.push('Taeget GP %');
            }

            tFieldArr.push('數量');
            tFieldArr.push('營收');
        }
        else if (tPageName == 'APvsFCSTvsAct') {
            tFieldArr = ['SA/PC', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            let tNum = 0;
            if (LastQuery.QueryArr[2] == 'semi') {
                tNum = 2;
            }
            else if (LastQuery.QueryArr[2] == '季') {
                tNum = 4;
            }
            else if (LastQuery.QueryArr[2] == '月') {
                tNum = 12;
            }

            for (let i = 0; i < tNum; i++) {
                tFieldArr.push('AP');
                tFieldArr.push('FCST');
                tFieldArr.push('FCST vs AP Hit Rate');
                tFieldArr.push('Actual');
                tFieldArr.push('Actual vs AP Hit Rate');
                tFieldArr.push('Actual vs FCST Hit Rate');
            }

            tFieldArr.push('AP');
            tFieldArr.push('FCST');
            tFieldArr.push('FCST vs AP Hit Rate');
            tFieldArr.push('Actual');
            tFieldArr.push('Actual vs AP Hit Rate');
            tFieldArr.push('Actual vs FCST Hit Rate');
        }
        else if (tPageName == 'BillingFCSTChart') {
            tFieldArr = ['Item'];

            for (let i = 1; i <= 31; i++) {
                tFieldArr.push(i.toString());
            }
        }
        else if (tPageName == 'APFCSTChart') {
            tFieldArr = ['Item'];

            for (let i = 1; i <= 12; i++) {
                tFieldArr.push(MonthFormat[i]);
            }
        }
        else if (tPageName == 'CompRevenueChart') {
            tFieldArr = TitleInfArr ? TitleInfArr[0].split(',') : [];
            for (let i = 1; i < tFieldArr.length; i++) {
                if (TableSetObj.MoneyFieldArr.indexOf(tFieldArr[i]) < 0) {
                    TableSetObj.MoneyFieldArr.push(tFieldArr[i]);
                }
                if (TableSetObj.NeedModifyDisplayArr.indexOf(tFieldArr[i]) < 0) {
                    TableSetObj.NeedModifyDisplayArr.push(tFieldArr[i]);
                }
            }
        }
        else if (tPageName == 'Top10CustomerRevenue') {
            tFieldArr = TitleInfArr ? TitleInfArr[0].split(',') : [];
            for (let i = 1; i < tFieldArr.length; i++) {
                if (TableSetObj.MoneyFieldArr.indexOf(tFieldArr[i]) < 0) {
                    TableSetObj.MoneyFieldArr.push(tFieldArr[i]);
                }
                if (TableSetObj.NeedModifyDisplayArr.indexOf(tFieldArr[i]) < 0) {
                    TableSetObj.NeedModifyDisplayArr.push(tFieldArr[i]);
                }
            }
        }
        else if (tPageName == 'CustomerRevenueQuery') {
            tFieldArr = ['Month'];

            for (let i = 1; i <= 12; i++) {
                tFieldArr.push(MonthFormat[i]);
            }

            tFieldArr.push('Total');
        }
        else if (tPageName == 'NewProductCustomerNSB') {
            tFieldArr = ['Month'];

            for (let i = 1; i <= 12; i++) {
                tFieldArr.push(MonthFormat[i]);
            }
        }
        else if (tPageName == 'ProdCustGPM') {
            tFieldArr = [LastQuery.QueryArr[3], LastQuery.QueryArr[3], 'NSB', '%', 'GPM', 'NSB', '%', 'GPM', 'NSB', '%', 'GPM'];
        }
        else if (tPageName == 'Top10ProdCustGPM') {
            tFieldArr = [LastQuery.QueryArr[3], 'NSB', '%', 'GPM', 'NSB', '%', 'GPM', 'NSB', '%', 'GPM'];
        }
        else if (tPageName == 'COST_SUMMARY') {
            tFieldArr = ['識別碼', '年度', '月份', 'BU', '客戶群組', '客戶代碼', '客戶名稱', '產品線', '流程卡', '型號', '出貨數', '營收', '成本', '毛利率'];
            newNecessaryArr = gPageObj.PageNameObj[tPageName].NecessaryArr;
            newModifiableArr = this.InitModifiable(tPageName, tFieldArr);
        }
        else if (tPageName == 'TESTERCOST_SUMMARY') {
            tFieldArr = ['識別碼', '年度', '月份', 'BU', '客戶群組', '客戶代碼', '客戶名稱', '產品線', '流程卡', '型號', '測試機', '站點', 'DUT', '溫度', '配件', '機台類別', '出貨數', '營收', '成本', '毛利率', '包機機台'];
            newNecessaryArr = gPageObj.PageNameObj[tPageName].NecessaryArr;
            newModifiableArr = this.InitModifiable(tPageName, tFieldArr);
        }

        if (newNecessaryArr.length == 0) {
            for (let i = 0; i < tFieldArr.length; i++) {
                newNecessaryArr.push(false);
                newModifiableArr.push(false);
            }
        }

        return { FieldArr: tFieldArr, NecessaryArr: newNecessaryArr, ModifiableArr: newModifiableArr };
    }

    //重設搜尋Query的值(目前實作於ClickSearch裡，由於NeedClickObj物件無法將所有狀況定義出來，因此特殊狀況於此function定義)
    //tPageName: 頁面名稱
    //sQuery: 搜尋Query
    public ResetSearchQuery(tPageName: string, sQuery: string[]): string[] {
        let reQuery = sQuery;
        for (let i = 0; i < reQuery.length; i++) {
            reQuery[i] = reQuery[i].replace(/”/g, '"');
        }

        //單獨修正累計那行的時間範圍
        if ((tPageName == 'TEST_OUT_GOODS_LIST' || tPageName == 'TEST_IN_GOODS_LIST' || tPageName == 'TEST_RECEIVE_LIST'
            || tPageName == 'TEST_LOTSIZE_LIST' || tPageName == 'DS_IN_GOODS_LIST' || tPageName == 'DS_OUT_GOODS_LIST'
        ) && sQuery.indexOf('累計') > -1) {
            let tParentName = gPageObj.PageNameObj[tPageName].ParentName;
            let year = gPageObj.PageNameObj[tParentName].LastQuery.QueryArr[1];
            let month = gPageObj.PageNameObj[tParentName].LastQuery.QueryArr[2];
            if (gPageObj.PageNameObj[tParentName].LastQuery.QueryArr[0] == '年' || gPageObj.PageNameObj[tParentName].LastQuery.QueryArr[0] == '季') {
                reQuery[0] = year + '/01/01';
            }
            else if (gPageObj.PageNameObj[tParentName].LastQuery.QueryArr[0] == '月') {
                reQuery[0] = year + '/' + paddingLeft(month, 2) + '/01';
            }
            else if (gPageObj.PageNameObj[tParentName].LastQuery.QueryArr[0] == '季') {
                reQuery[0] = gPageObj.PageNameObj[tParentName].LastQuery.QueryArr[3];
            }
        }

        return reQuery;
    }

    //修改搜尋結果
    //tPageName: 頁面名稱
    //data: 搜尋結果
    public EditSearchResult(tPageName: string, data: string[]): string[] | { [key: string]: string }[] {
        let reArr: string[] | { [key: string]: string }[] = data;

        if (tPageName == 'TEST_OUT_GOODS_LIST' || tPageName == 'TEST_IN_GOODS_LIST' || tPageName == 'TEST_RECEIVE_LIST'
            || tPageName == 'TEST_LOTSIZE_LIST' || tPageName == 'DS_IN_GOODS_LIST' || tPageName == 'DS_OUT_GOODS_LIST'
            || tPageName == 'Prober_Handler_CPLCD_LIST' || tPageName == 'INK_Activation_LIST' || tPageName == 'AOI_Activation_LIST'
            || tPageName == 'Prober_Handler_FT_LIST' || tPageName == 'Tester_Activation_LIST' || tPageName == 'Prober_Handler_LBI_LIST'
            || tPageName == 'Prober_Handler_DS_LIST' || tPageName == 'CompRevenueChart' || tPageName == 'Top10CustomerRevenue') {
            data.splice(0, 1);
            reArr = data;
        }
        else if (tPageName == 'CFM_HUMIDITY_TEMP') {
            reArr = JSON.parse(data[0]);
            let tObj: { [key: string]: string }[] = JSON.parse(data[0]);
            let tOrderObj: { [order: number]: string } = {};
            Object.keys(tObj[0]).forEach((key) => {
                tOrderObj[gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf(tObj[0][key])] = key;
            });
            tObj.splice(0, 1);
            reArr = tObj;
            gPageObj.PageNameObj[tPageName].FullDataObjOrder = [];
            for (let i = 0; tOrderObj[i] != null; i++) {
                gPageObj.PageNameObj[tPageName].FullDataObjOrder.push(tOrderObj[i]);
            }
        }

        return reArr;
    }

    //Update()時，修改參數值
    public ResetUpdateQuery(tPageName: string, data: string[], type: 'i' | 'u' | 'd'): string[] {
        let reArr: string[] = data;

        if (tPageName == 'COST_SUMMARY') {
            if (type == 'i' || type == 'u') {
                for (let i = 0; i < reArr.length; i++) {
                    let tmpArr = reArr[i].split(',');
                    let nsb = Number(tmpArr[10]);
                    let cost = Number(tmpArr[11]);
                    tmpArr[12] = nsb == 0 ? '0' : formatFloat((nsb - cost) / nsb * 100, 1).toString();
                    reArr[i] = tmpArr.join(',');
                }
            }
        }
        else if (tPageName == 'TESTERCOST_SUMMARY') {
            if (type == 'i' || type == 'u') {
                for (let i = 0; i < reArr.length; i++) {
                    let tmpArr = reArr[i].split(',');
                    let nsb = Number(tmpArr[16]);
                    let cost = Number(tmpArr[17]);
                    tmpArr[18] = nsb == 0 ? '0' : formatFloat((nsb - cost) / nsb * 100, 1).toString();
                    reArr[i] = tmpArr.join(',');
                }
            }
        }

        return reArr;
    }

    //根據URL參數重新設定搜尋欄位的顯示狀態
    //DefaultObj: 原來的搜尋參數物件
    //UrlObj: URL參數物件(已解碼)
    public ResetSearchDisplayFromURL(DefaultObj: { DisplayArr: string[], DefaultKey: string[], DefaultValue: string[] }, UrlObj: { [key: string]: string }) {
        if (UrlObj['報表類型']) {
            let tIdx: number = 0;
            if (UrlObj['報表類型'] == '年' && (tIdx = DefaultObj.DisplayArr.indexOf('月份')) > -1) {
                DefaultObj.DisplayArr.splice(tIdx, 1);
            }
            else if (UrlObj['報表類型'] == '週' && (tIdx = DefaultObj.DisplayArr.indexOf('月份')) > -1) {
                DefaultObj.DisplayArr.splice(tIdx, 1, '週From', '週To');
                tIdx = DefaultObj.DisplayArr.indexOf('年度');
                DefaultObj.DisplayArr.splice(tIdx, 1);
            }
        }
        if (UrlObj['BU'] && UrlObj['BU'] == 'FT') {
            let tIdx: number = DefaultObj.DisplayArr.indexOf('機型');
            DefaultObj.DisplayArr.splice(tIdx + 1, 0, '機種');
        }

        return DefaultObj;
    }

    //重新定義物件屬性⬆

    //Table、Chart相關定義⬇

    //建立需要客製化Title的頁面(合併儲存格格式，例:['BU', 'BU']表BU左右兩格合併為一格)
    //TitleInfArr: Search回傳的data陣列
    //tPageName: 頁面名稱
    public MakeTableTitle(TitleInfArr: Array<string> | { [key: string]: string }[], tPageName: string): Array<Array<string>> {
        let reObj: string[][] = new Array();
        let year: any = GetSelectValue('年度');
        let yStr: string = year != null ? year.toString() : '';
        let lyStr: string = year != null ? (parseInt(year) - 1).toString() : '';
        let now = new Date();
        let before = new Date(now.setDate(now.getDate() - 1));//前一天
        let nowMonth = paddingLeft((before.getMonth() + 1).toString(), 2);
        let nowDay = paddingLeft(before.getDate().toString(), 2);
        let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery;

        if (tPageName == 'APQuery') {
            let dFormat: any;
            if (LastQuery.QueryArr[3] == 'semi') {
                dFormat = YearFormat;
            }
            else if (LastQuery.QueryArr[3] == '季') {
                dFormat = SeasonFormat;
            }
            else if (LastQuery.QueryArr[3] == '月') {
                dFormat = MonthFormat;
            }
            let tmpArr = [];
            tmpArr = ['業務', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            let tfArr = Object.keys(dFormat).filter(key => !isNaN(Number(dFormat[key])));
            for (let i = 0; i < tfArr.length; i++) {
                let tmpStr = tfArr[i];
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
            }
            tmpArr.push('Total');
            tmpArr.push('Total');
            reObj.push(tmpArr);

            tmpArr = [];
            tmpArr = ['業務', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            for (let i = 0; i < tfArr.length; i++) {
                tmpArr.push('數量');
                tmpArr.push('單價');
                tmpArr.push('營收');
                tmpArr.push('Taeget GP %');
            }
            tmpArr.push('數量');
            tmpArr.push('營收');
            reObj.push(tmpArr);
        }
        else if (tPageName == 'FCSTQuery') {
            let dFormat: any;
            if (LastQuery.QueryArr[2] == 'semi') {
                dFormat = YearFormat;
            }
            else if (LastQuery.QueryArr[2] == '季') {
                dFormat = SeasonFormat;
            }
            else if (LastQuery.QueryArr[2] == '月') {
                dFormat = MonthFormat;
            }
            let tmpArr = [];
            tmpArr = ['SA/PC', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            let tfArr = Object.keys(dFormat).filter(key => !isNaN(Number(dFormat[key])));
            for (let i = 0; i < tfArr.length; i++) {
                let tmpStr = tfArr[i];
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
            }
            tmpArr.push('Total');
            tmpArr.push('Total');
            reObj.push(tmpArr);

            tmpArr = [];
            tmpArr = ['SA/PC', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            for (let i = 0; i < tfArr.length; i++) {
                tmpArr.push('數量');
                tmpArr.push('營收');
            }
            tmpArr.push('數量');
            tmpArr.push('營收');
            reObj.push(tmpArr);
        }
        else if (tPageName == 'APvsFCSTvsAct') {
            let dFormat: any;
            if (LastQuery.QueryArr[2] == 'semi') {
                dFormat = YearFormat;
            }
            else if (LastQuery.QueryArr[2] == '季') {
                dFormat = SeasonFormat;
            }
            else if (LastQuery.QueryArr[2] == '月') {
                dFormat = MonthFormat;
            }
            let tmpArr = [];
            tmpArr = ['SA/PC', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            let tfArr = Object.keys(dFormat).filter(key => !isNaN(Number(dFormat[key])));
            for (let i = 0; i < tfArr.length; i++) {
                let tmpStr = tfArr[i];
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
                tmpArr.push(tmpStr);
            }
            tmpArr.push('Total');
            tmpArr.push('Total');
            tmpArr.push('Total');
            tmpArr.push('Total');
            tmpArr.push('Total');
            tmpArr.push('Total');
            reObj.push(tmpArr);

            tmpArr = [];
            tmpArr = ['SA/PC', 'BU', '區域', '新/舊客戶', '新/舊產品', '客戶代碼', '客戶', '型號', 'Prober/Handler', 'Tester', 'Product Type'];
            for (let i = 0; i < tfArr.length; i++) {
                tmpArr.push('AP');
                tmpArr.push('FCST');
                tmpArr.push('FCST vs AP Hit Rate');
                tmpArr.push('Actual');
                tmpArr.push('Actual vs AP Hit Rate');
                tmpArr.push('Actual vs FCST Hit Rate');
            }
            tmpArr.push('AP');
            tmpArr.push('FCST');
            tmpArr.push('FCST vs AP Hit Rate');
            tmpArr.push('Actual');
            tmpArr.push('Actual vs AP Hit Rate');
            tmpArr.push('Actual vs FCST Hit Rate');
            reObj.push(tmpArr);
        }
        else if (tPageName == 'ProdCustGPM') {
            let tmpArr = [];
            tmpArr = [LastQuery.QueryArr[3], LastQuery.QueryArr[3], (parseInt(LastQuery.QueryArr[1]) - 1).toString() + ' Actual', (parseInt(LastQuery.QueryArr[1]) - 1).toString() + ' Actual', (parseInt(LastQuery.QueryArr[1]) - 1).toString() + ' Actual', LastQuery.QueryArr[1] + ' AP', LastQuery.QueryArr[1] + ' AP', LastQuery.QueryArr[1] + ' AP', LastQuery.QueryArr[1] + ' Actual', LastQuery.QueryArr[1] + ' Actual', LastQuery.QueryArr[1] + ' Actual'];
            reObj.push(tmpArr);

            tmpArr = [LastQuery.QueryArr[3], LastQuery.QueryArr[3], 'NSB', '%', 'GPM', 'NSB', '%', 'GPM', 'NSB', '%', 'GPM'];
            reObj.push(tmpArr);
        }
        else if (tPageName == 'Top10ProdCustGPM') {
            let tmpArr = [];
            tmpArr = [LastQuery.QueryArr[3], (parseInt(LastQuery.QueryArr[1]) - 1).toString() + ' Actual', (parseInt(LastQuery.QueryArr[1]) - 1).toString() + ' Actual', (parseInt(LastQuery.QueryArr[1]) - 1).toString() + ' Actual', LastQuery.QueryArr[1] + ' AP', LastQuery.QueryArr[1] + ' AP', LastQuery.QueryArr[1] + ' AP', LastQuery.QueryArr[1] + ' Actual', LastQuery.QueryArr[1] + ' Actual', LastQuery.QueryArr[1] + ' Actual'];
            reObj.push(tmpArr);

            tmpArr = [LastQuery.QueryArr[3], 'NSB', '%', 'GPM', 'NSB', '%', 'GPM', 'NSB', '%', 'GPM'];
            reObj.push(tmpArr);
        }
        else if (tPageName == 'FCSTMaintain' || tPageName == 'APMaintain') {
            let tmpArr1 = [];
            let tmpArr2 = [];
            let FieldArr = gPageObj.PageNameObj[tPageName].TitleStrArr;
            for (let i = 0; i < FieldArr.length; i++) {
                let tIdx = FieldArr[i].indexOf('月');
                if (tIdx > -1) {
                    tmpArr1.push(FieldArr[i].substring(0, tIdx + 1));
                    tmpArr2.push(FieldArr[i].substring(tIdx + 1));
                }
                else {
                    tmpArr1.push(FieldArr[i]);
                    tmpArr2.push(FieldArr[i]);
                }
            }

            reObj.push(tmpArr1);
            reObj.push(tmpArr2);
        }

        if (reObj.length == 0) {
            let tArr: string[] = [];
            for (let i = 0; i < gPageObj.PageNameObj[tPageName].TitleStrArr.length; i++) {
                tArr.push(gPageObj.PageNameObj[tPageName].TitleStrArr[i]);
            }
            reObj.push(tArr);
        }

        return reObj;
    }

    //檢查需要被屏蔽的列
    public NeedShieldField(tPageName: string): Array<number> {
        let bu = document.getElementById('BuName')?.innerHTML;
        let tFieldIdxArr: Array<number> = [];

        /*for (let i = 0; i < FieldArr.length; i++) {
            if (bu != 'ATE' && (FieldArr[i] == '終端客戶' || FieldArr[i] == 'Type')) {
                tFieldIdxArr.push(i);
            }
        }*/

        return tFieldIdxArr;
    }

    //檢查需要被屏蔽的行
    //tPageName: 頁面名稱
    //data: 數據(搜尋結果)
    public NeedShieldRank(tPageName: string, data: string[]) {
        var tRankIdxArr = [];

        if (tPageName == 'Top10_CUSTMTD_NSB' || tPageName == 'Top10_CUSTYTM_NSB')
            for (var i = 0; i < data.length; i++) {
                var tmpArr = data[i].split(',');
                if (tmpArr[0].indexOf('TOTAL') > -1) {
                    tRankIdxArr.push(i);
                }
            }

        return tRankIdxArr;
    }

    //建立input的寬度篩選器
    //InputFieldName: 欄位名稱
    public MakeWidth(tPageName: string, InputFieldName: string, tMode: 'Read' | 'Write' | 'Search'): string {
        let WidthStr = '';
        if (!InputFieldName) {
            return WidthStr;
        }

        InputFieldName = InputFieldName.replace(/&amp;/g, '&');
        if (InputFieldName == '客戶區域定義' || InputFieldName == '包機客戶' || InputFieldName == '維護單位' || InputFieldName == 'Tester' || InputFieldName == 'Ver' || InputFieldName == '報表類型' || InputFieldName == '月份' || InputFieldName == '月' || InputFieldName == '查詢方式' || InputFieldName == '工時Flag'
            || InputFieldName == '是否有效' || InputFieldName == '包機費用編號' || InputFieldName == 'EQ') {
            WidthStr = '60px'
        }
        else if (InputFieldName == '年度' || InputFieldName == 'BU' || InputFieldName == '產品線' || InputFieldName == '機台類別'
            || InputFieldName == '1月數量' || InputFieldName == '2月數量' || InputFieldName == '3月數量' || InputFieldName == '4月數量' || InputFieldName == '5月數量' || InputFieldName == '6月數量' || InputFieldName == '7月數量' || InputFieldName == '8月數量' || InputFieldName == '9月數量' || InputFieldName == '10月數量' || InputFieldName == '11月數量' || InputFieldName == '12月數量'
            || InputFieldName == '1月單價' || InputFieldName == '2月單價' || InputFieldName == '3月單價' || InputFieldName == '4月單價' || InputFieldName == '5月單價' || InputFieldName == '6月單價' || InputFieldName == '7月單價' || InputFieldName == '8月單價' || InputFieldName == '9月單價' || InputFieldName == '10月單價' || InputFieldName == '11月單價' || InputFieldName == '12月單價'
            || InputFieldName == '1月GP' || InputFieldName == '2月GP' || InputFieldName == '3月GP' || InputFieldName == '4月GP' || InputFieldName == '5月GP' || InputFieldName == '6月GP' || InputFieldName == '7月GP' || InputFieldName == '8月GP' || InputFieldName == '9月GP' || InputFieldName == '10月GP' || InputFieldName == '11月GP' || InputFieldName == '12月GP'
            || InputFieldName == '1月營收' || InputFieldName == '2月營收' || InputFieldName == '3月營收' || InputFieldName == '4月營收' || InputFieldName == '5月營收' || InputFieldName == '6月營收' || InputFieldName == '7月營收' || InputFieldName == '8月營收' || InputFieldName == '9月營收' || InputFieldName == '10月營收' || InputFieldName == '11月營收' || InputFieldName == '12月營收'
            || InputFieldName == '計算單位' || InputFieldName == 'FCST 維護單位' || InputFieldName == 'FCST維護單位' || InputFieldName == 'Process'
            || InputFieldName == 'M_TYPE') {
            WidthStr = '80px'
        }
        else if (InputFieldName == '新/舊客戶' || InputFieldName == 'Prober/Handler' || InputFieldName == 'Product Type' || InputFieldName == '加總條件' || InputFieldName == 'SA/PC' || InputFieldName == '產品類別' || InputFieldName == 'Type'
            || InputFieldName == '營收日期' || InputFieldName == '測試平台' || InputFieldName == '流程卡' || InputFieldName == '出貨數'
            || InputFieldName == 'RCNO' || InputFieldName == 'RCARD') {
            WidthStr = '90px'
        }
        else if (InputFieldName == '型號') {
            WidthStr = '140px'
        }
        else if ((tPageName == 'CPRUNCARDCOST' && (InputFieldName == '客戶代碼')) || InputFieldName == 'SA' || InputFieldName == '業務名稱' || InputFieldName == '營收日期'
            || InputFieldName == '機台類別' || InputFieldName == '客戶名稱') {
            WidthStr = '160px'
        }
        else if (InputFieldName == '客戶編號') {
            WidthStr = '350px'
        }

        return WidthStr;
    }

    //定義圖表的option
    //tPageName: 頁面名稱
    //data: 數據
    public ChartsOption(tPageName: string, data: string[] | { [key: string]: string }[]): EChartOption {
        if (gPageObj.PageNameObj[tPageName] == null) { return {}; }
        let option: any = {};
        let tdata: number[][] = [];
        let UnitMode = GetSelectValue('單位');
        let ReportMode = GetSelectValue('報表類型');
        let tmpTitle = new Array();
        let tHavePersent: boolean[] = [];//紀錄每一行是否含有%，且為數值
        let haveTitleAtFirst = true;
        let AllEmpty = true;//第一列是否全空值

        for (let i = 0; i < data.length; i++) {
            let tmpArr = typeof data[i] == 'string' ? (data[i] as string).split(',') : gPageObj.PageNameObj[tPageName].LineDataObjToArray(data[i]);
            if (tmpArr[0] == '' || tmpArr[0] == '-') { continue; }
            AllEmpty = false;
            if (!isNaN(Number(tmpArr[0]))) {
                haveTitleAtFirst = false;
                break;
            }
        }

        //若第一列全空值，則視為沒有RowTitle
        if (AllEmpty) { haveTitleAtFirst = false; }

        for (let i = 0; i < data.length; i++) {
            tHavePersent.push(false);
            let tmpArr = typeof data[i] == 'string' ? (data[i] as string).split(',') : gPageObj.PageNameObj[tPageName].LineDataObjToArray(data[i]);
            let newtdata: number[] = [];
            if (haveTitleAtFirst) { tmpTitle.push(tmpArr[0]); }
            for (let j = haveTitleAtFirst ? 1 : 0; j < tmpArr.length; j++) {//跳過一開始的Title
                let tnStr: string = '';
                if (tmpArr[j].length > 0 && !isNaN(Number(tmpArr[j])) && TableSetObj.MillionFieldArr.indexOf(gPageObj.PageNameObj[tPageName].TitleStrArr[j]) > -1 && UnitMode != '數量') {
                    tnStr = MillionFormat(tmpArr[j]);
                }
                else { tnStr = tmpArr[j]; }
                if (!tHavePersent[i] && tnStr.indexOf('%') > -1 && !isNaN(Number(tmpArr[j].replace('%', '')))) {
                    tHavePersent[i] = true;
                }
                if (tHavePersent[i]) { tnStr = tnStr.replace('%', ''); }
                newtdata.push(tnStr == '' || tnStr == '-' ? 0 : Number(tnStr));
            }

            tdata.push(newtdata);
        }

        if (tPageName == 'BillingFCSTChart') {
            let year = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
            let month = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
            let curMonthDays = new Date(year, month, 0).getDate();

            for (let i = 0; i < tdata.length; i++) {
                tdata[i].splice(curMonthDays, tdata[i].length - curMonthDays);
            }

            let UnitMode = GetSelectValue('計算單位');
            let max1 = tdata.length > 5 ? GetDataUpLimit(Math.max(Math.max(...tdata[3]), Math.max(...tdata[4]))) : 0;
            let max2 = tdata.length > 2 ? GetDataUpLimit(Math.max(Math.max(...tdata[0]), Math.max(...tdata[1]))) : 0;
            let range1 = max1 / 10;
            let range2 = max2 / 10;
            option = {
                title: {
                    text: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2].replace(/@/g, '、') + ' ' + gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0] + '/' + gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' Billing VS FCST Analysis Trend Chart',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'DFKai-sb',
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: { show: true, title: '保存為圖片' }
                    }
                },
                legend: {
                    top: '25px',
                    data: ['FCST', 'Billing', 'FCST ACC.', 'Billing ACC.']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                        nameTextStyle: {
                            fontFamily: 'Arial',
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: UnitMode == '金額' ? 'M.NT' : 'M.QTY',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: UnitMode == '金額' ? 'M.NT' : 'M.QTY',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: 'FCST',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(142,180,227)'
                            }
                        },
                        data: tdata.length > 1 ? tdata[0] : []
                    },
                    {
                        name: 'Billing',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(217,150,148)'
                            }
                        },
                        data: tdata.length > 1 ? tdata[1] : []
                    },
                    {
                        name: 'FCST ACC.',
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: 'rgb(0,0,255)'
                            }
                        },
                        data: tdata.length > 1 ? tdata[3] : []
                    },
                    {
                        name: 'Billing ACC.',
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: 'rgb(255,0,0)'
                            }
                        },
                        data: tdata.length > 1 ? tdata[4] : []
                    }
                ]
            };
        }
        else if (tPageName == 'CompRevenueChart') {
            let max1 = GetDataUpLimit(Math.max(...tdata[2]));
            let max2 = GetDataUpLimit(Math.max(Math.max(...tdata[0]), Math.max(...tdata[1])));
            let min = GetDataUpLimit(Math.min(...tdata[2]));
            let min2 = 0;
            if (min > 0) { min = 0; }
            if (min2 > 0) { min2 = 0; }
            if (min < 0 && min2 >= 0) {
                min2 = Math.round(max2 * min / max1);
            }
            else if (min >= 0 && min2 < 0) {
                min = Math.round(max1 * min2 / max2);
            }
            else if (max1 > 0 && max2 > 0 && min < 0 && min2 < 0) {
                if (max1 / min * -1 > max2 / min2 * -1) {
                    min = Math.round(max1 * min2 / max2);
                }
                else {
                    min2 = Math.round(max2 * min / max1);
                }
            }
            let range1 = (max1 - min) / 10;
            let range2 = (max2 - min2) / 10;
            let tmpTitleData = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            tmpTitleData.splice(0, 1);
            option = {
                title: {
                    text: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' Competitor Revenue Analysis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'DFKai-sb',
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: { show: true, title: '保存為圖片' }
                    }
                },
                legend: {
                    top: '25px',
                    data: [(parseInt(gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1]) - 1) + '營業額', gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + '營業額', 'YOY']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: tmpTitleData,
                        nameTextStyle: {
                            fontFamily: 'Arial',
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'M.NT',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: min2,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: 'YOY%',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: min,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    }
                ],
                series: [
                    {
                        name: (parseInt(gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1]) - 1) + '營業額',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(142,180,227)'
                            }
                        },
                        data: tdata[0]
                    },
                    {
                        name: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + '營業額',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(217,150,148)'
                            }
                        },
                        data: tdata[1]
                    },
                    {
                        name: 'YOY',
                        type: 'scatter',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: 'green',
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: function (a: any, b: any, c: any) {
                                        return a.value + '%';
                                    }
                                },
                                lineStyle: {
                                    width: '30'
                                }
                            }
                        },
                        data: tdata[2]
                    }
                ]
            };
        }
        else if (tPageName == 'Top10CustomerRevenue') {
            let max1 = tdata.length > 7 ? GetDataUpLimit(Math.max(...tdata[7])) : 0;
            let max2 = tdata.length > 7 ? GetDataUpLimit(Math.max(Math.max(...tdata[6]), Math.max(...tdata[4]))) : 0;
            let range1 = (max1) / 10;
            let range2 = (max2) / 10;
            let tmpTitleData = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            tmpTitleData.splice(0, 1);
            option = {
                title: {
                    text: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + paddingLeft(gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2], 2) + ' Top10 Customer Revenue Analysis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'DFKai-sb',
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: { show: true, title: '保存為圖片' }
                    }
                },
                legend: {
                    top: '25px',
                    data: [gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' AP', gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' 久元營收', gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' AP 達成率']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: tmpTitleData,
                        nameTextStyle: {
                            fontFamily: 'Arial',
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'M.NT',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '%',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    }
                ],
                series: [
                    {
                        name: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' AP',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(142,180,227)'
                            }
                        },
                        data: tdata.length > 7 ? tdata[6] : []
                    },
                    {
                        name: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' 久元營收',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(217,150,148)'
                            }
                        },
                        data: tdata.length > 5 ? tdata[4] : []
                    },
                    {
                        name: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' AP 達成率',
                        type: 'scatter',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: 'green',
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: function (a: any, b: any, c: any) {
                                        return a.value + '%';
                                    }
                                },
                                lineStyle: {
                                    width: '30'
                                }
                            }
                        },
                        data: tdata[7]
                    }
                ]
            };
        }
        else if (tPageName == 'NewProductCustomerNSB') {
            let Today = new Date();
            let month = Today.getMonth();
            let max = GetDataUpLimit(Math.max(Math.max(...tdata[2]), Math.max(...tdata[3])));
            let range = (max) / 10;
            let tmpTitleData = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            tmpTitleData.splice(0, 1);
            option = {
                title: {
                    text: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' ' + gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0] + ' New ' + gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2] + ' NSB Analysis Trend Chart',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'DFKai-sb',
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: { show: true, title: '保存為圖片' }
                    }
                },
                legend: {
                    top: '25px',
                    data: ['AP', 'Actual', 'AP 累計', 'Actual 累計']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: tmpTitleData,
                        nameTextStyle: {
                            fontFamily: 'Arial',
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'M.NT',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max,
                        interval: range,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: 'AP',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(142,180,227)'
                            }
                        },
                        data: tdata[0]
                    },
                    {
                        name: 'Actual',
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(217,150,148)'
                            }
                        },
                        data: tdata[1]
                    },
                    {
                        name: 'AP 累計',
                        type: 'line',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'blue'
                            }
                        },
                        data: tdata[2]
                    },
                    {
                        name: 'Actual 累計',
                        type: 'line',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'red'
                            }
                        },
                        data: tdata[3]
                    }
                ]
            };
        }
        else if (tPageName == 'APFCSTChart') {
            let UnitMode = GetSelectValue('計算單位');
            let YearIdx = 0;
            let NowYear = parseInt(gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[YearIdx]);
            let LastYear = NowYear - 1;
            let max1 = tdata.length > 10 ? GetDataUpLimit(Math.max(Math.max(...tdata[6]), Math.max(...tdata[7]), Math.max(...tdata[9]))) : 0;
            let max2 = tdata.length > 4 ? GetDataUpLimit(Math.max(Math.max(...tdata[0]), Math.max(...tdata[1]), Math.max(...tdata[3]))) : 0;
            let range1 = (max1) / 10;
            let range2 = (max2) / 10;
            let tmpTitleData = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            tmpTitleData.splice(0, 1);
            option = {
                title: {
                    text: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] + ' ' + gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0] + ' AP VS FCST Analysis Trend Chart',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'DFKai-sb',
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: { show: true, title: '保存為圖片' }
                    }
                },
                legend: {
                    top: '25px',
                    data: [LastYear + ' Actual', NowYear + ' AP', NowYear + ' Billing + FCST', LastYear + ' Actual ACC.', NowYear + ' AP ACC.', NowYear + ' Billing + FCST ACC.']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: tmpTitleData,
                        nameTextStyle: {
                            fontFamily: 'Arial',
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: UnitMode == '金額' ? 'M.NT' : 'M.QTY',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: UnitMode == '金額' ? 'M.NT' : 'M.QTY',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: LastYear + ' Actual',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '0%',
                        itemStyle: {
                            normal: {
                                color: '#38AC26'
                            }
                        },
                        data: tdata.length > 4 ? tdata[3] : []
                    },
                    {
                        name: NowYear + ' AP',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '0%',
                        itemStyle: {
                            normal: {
                                color: 'rgb(142,180,227)'
                            }
                        },
                        data: tdata.length > 1 ? tdata[0] : []
                    },
                    {
                        name: NowYear + ' Billing + FCST',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '0%',
                        itemStyle: {
                            normal: {
                                color: 'rgb(217,150,148)'
                            }
                        },
                        data: tdata.length > 2 ? tdata[1] : []
                    },
                    {
                        name: LastYear + ' Actual ACC.',
                        type: 'line',
                        yAxisIndex: 0,
                        barGap: '0%',
                        itemStyle: {
                            normal: {
                                color: '#38AC26'
                            }
                        },
                        data: tdata.length > 10 ? tdata[9] : []
                    },
                    {
                        name: NowYear + ' AP ACC.',
                        type: 'line',
                        yAxisIndex: 0,
                        barGap: '0%',
                        itemStyle: {
                            normal: {
                                color: 'rgb(0,0,255)'
                            }
                        },
                        data: tdata.length > 7 ? tdata[6] : []
                    },
                    {
                        name: NowYear + ' Billing + FCST ACC.',
                        type: 'line',
                        yAxisIndex: 0,
                        barGap: '0%',
                        itemStyle: {
                            normal: {
                                color: 'rgb(255,0,0)'
                            }
                        },
                        data: tdata.length > 8 ? tdata[7] : []
                    }
                ]
            };
        }

        return option;
    }

    //定義凍結欄位(使用DataTable渲染)
    //tPageName: 頁面名稱
    public GetDataTableFreezeValue(tPageName: string) {
        let reObj: { leftColumns?: number } = {};
        let ReportMode = GetSelectValue('報表類型');
        //var bu = document.getElementById('BuName').innerHTML;
        if (tPageName == 'FCSTQuery' || tPageName == 'APQuery' || tPageName == 'APvsFCSTvsAct') {
            reObj.leftColumns = 11;
        }
        else if (tPageName == 'APMaintain') {
            reObj.leftColumns = 8;
        }
        else if (tPageName == 'CPRUNCARDCOST') {
            reObj.leftColumns = 10;
        }
        else if (tPageName == 'FTRUNCARDCOST') {
            reObj.leftColumns = 11;
        }

        return reObj;
    }

    //設定凍結欄位(不使用DataTable渲染)
    public FreezeField(tPageName: string): void {
        var tmpArr = new Array();
        var LeftCount = 0;
        var ShieldIdx = this.NeedShieldField(tPageName);

        if (tPageName == 'APMaintain' || tPageName == 'FCSTMaintain') {
            LeftCount = 8;
        }
        else if (tPageName == 'CPRUNCARDCOST') {
            LeftCount = 10;
        }
        else if (tPageName == 'FCSTMaintain') {
            LeftCount = 11;
        }

        if (LeftCount > 0) {
            var tableDom = $('#' + tPageName + 'Table tbody tr');
            var titleDom = $('#' + tPageName + 'Table_wrapper thead tr');

            for (var i = 0; tableDom.eq(i).html(); i++) {
                var LeftWidth = 0;
                for (var j = 0; j < LeftCount; j++) {
                    if (tableDom.eq(i).find('td').eq(j).html() == '表中數據為空') {
                        break;
                    }
                    else if (ShieldIdx.indexOf(j) > -1) {
                        continue;
                    }
                    var widthCss = LeftWidth.toString() + 'px';
                    tableDom.eq(i).find('td').eq(j).css('left', widthCss);
                    tableDom.eq(i).find('td').eq(j).css('position', 'sticky');
                    tableDom.eq(i).find('td').eq(j).css('z-index', '1');
                    tableDom.eq(i).find('td').eq(j).css('background-color', 'white');

                    //合併儲存格後，只需判斷第一行(不確定會不會出錯)
                    if (i < 1 && titleDom.eq(i).find('th').eq(j).html() != null) {
                        titleDom.eq(i).find('th').eq(j).css('left', widthCss);
                        titleDom.eq(i).find('th').eq(j).css('position', 'sticky');
                        titleDom.eq(i).find('th').eq(j).css('z-index', '1');
                        titleDom.eq(i).find('th').eq(j).css('background-color', 'white');
                    }

                    var tmpWidth = parseInt(tableDom.eq(i).find('td').eq(j).css('width').replace('px', ''));
                    var tmpPadding = parseInt(tableDom.eq(i).find('td').eq(j).css('padding').replace('px', ''));
                    LeftWidth += tmpWidth + tmpPadding * 2;
                }
            }
        }
    }

    //將PageName對應的Table做合併儲存格，於此定義各PageName的合併儲存格範圍
    //tPageName: 頁面名稱
    public MergeTableValue(tPageName: string) {
        let TableIdName = tPageName + 'Table';
        let t = $('#' + TableIdName + ' tbody tr');
        let ShieldArr = this.NeedShieldField(tPageName);

        type MergeInf = {
            [key: string]: {
                CheckXRange: number,//檢查是否需要合併的範圍
                IgnoreXIdx?: number[],//要被忽略檢查的列座標。座標範圍須小於CheckXRange才有效
                OnlyYWayCheck?: number[],//只需直行合併的列座標
                XWayRange?: {//指定座標合併儲存格(目前僅x方向判定)
                    [yIndex: number]: {
                        [xIndex: number]: number//value(number): 合併儲存格欄位數
                    }
                }
            }
        }

        let MergeInf: MergeInf = {
            MainInv: {
                CheckXRange: 4,
                IgnoreXIdx: [1, 2, 3],
                XWayRange: {
                    12: {
                        2: 2
                    }
                },
            },
            FocusInv: {
                CheckXRange: 4,
                IgnoreXIdx: [1, 2, 3],
                XWayRange: {
                    12: {
                        2: 2
                    }
                },
            },
            NSBInv: {
                CheckXRange: 1,
            },
        }

        if (MergeInf[tPageName] == null) { return; }

        let RowCountArr: number[] = [];
        for (let i = 0; i < MergeInf[tPageName].CheckXRange; i++) {
            RowCountArr.push(0);
        }

        for (let i = 0; t.eq(i).html() != null; i++) {
            let firstValue = t.eq(i).find('td').eq(0).html().toLowerCase();
            for (let j = 0, k = 1; t.eq(i).find('td').eq(j).html() != null && j < MergeInf[tPageName].CheckXRange; j = k) {
                let tmpNowStr = t.eq(i).find('td').eq(j).html();
                let tStr = tmpNowStr.replace('%', '');
                if (firstValue.indexOf('total') < 0 && firstValue.indexOf('sub-total') < 0) {
                    if (MergeInf[tPageName].XWayRange && MergeInf[tPageName].XWayRange![i] && MergeInf[tPageName].XWayRange![i][j]) { }
                    else {
                        if (ShieldArr.indexOf(i) > -1) {//被屏蔽的欄位不檢查
                            k = j + 1;
                            continue;
                        }
                        if (!isNaN(Number(tStr)) || tStr == '-' || tStr.indexOf('</') > -1) {//數字欄位以及不是純值(有編輯/檢視、百萬表示等)不檢查
                            k = j + 1;
                            continue;
                        }
                        if (MergeInf[tPageName].IgnoreXIdx != null && MergeInf[tPageName].IgnoreXIdx!.indexOf(j) > -1) {
                            k = j + 1;
                            continue;
                        }
                    }
                }
                let count = 0;
                let rcount = 0;

                if (MergeInf[tPageName].XWayRange && MergeInf[tPageName].XWayRange![i] && MergeInf[tPageName].XWayRange![i][j]) {
                    count = MergeInf[tPageName].XWayRange![i][j] - 1;
                    let tCount = 0;
                    for (k = j + 1; t.eq(i).find('td').eq(k).html() != null && k < MergeInf[tPageName].CheckXRange && tCount < count; k++, tCount++) {//橫檢查
                        t.eq(i).find('td').eq(k).css('display', 'none');
                    }
                }
                else {
                    if (t.eq(i).find('td').eq(j).css('display') != 'none') {//已被合併使欄位為display none的就跳過不檢查
                        if (rcount == 0) {//直檢查
                            for (let m = i + 1; t.eq(m).html() != null && tmpNowStr == t.eq(m).find('td').eq(j).html() && (j == 0 || m <= RowCountArr[j - 1]); m++, rcount++) {
                                t.eq(m).find('td').eq(j).css('display', 'none');
                            }
                        }

                        RowCountArr[j] = i + rcount;
                    }

                    if (firstValue.indexOf('sub-total') == 0 || firstValue.indexOf('total') == 0) {//第一欄位值為這些值時，不考慮過濾條件
                        for (k = j + 1; t.eq(i).find('td').eq(k).html() != null && tmpNowStr == t.eq(i).find('td').eq(k).html() && k < MergeInf[tPageName].CheckXRange; k++, count++) {//橫檢查
                            t.eq(i).find('td').eq(k).css('display', 'none');
                        }
                    }
                    else {
                        for (k = j + 1; t.eq(i).find('td').eq(k).html() != null && tmpNowStr == t.eq(i).find('td').eq(k).html() && k < MergeInf[tPageName].CheckXRange; k++, count++) {//橫檢查
                            if (ShieldArr.indexOf(k) > -1) {
                                count--;
                                continue;
                            }
                            else if (MergeInf[tPageName].OnlyYWayCheck != null && MergeInf[tPageName].OnlyYWayCheck!.indexOf(k) > -1) {
                                count--;
                                break;
                            }
                            else if (MergeInf[tPageName].XWayRange && MergeInf[tPageName].XWayRange![i] && MergeInf[tPageName].XWayRange![i][k]) {
                                count--;
                                break;
                            }
                            else if (MergeInf[tPageName].IgnoreXIdx != null && MergeInf[tPageName].IgnoreXIdx!.indexOf(k) > -1) {
                                count--;
                                continue;
                            }
                            t.eq(i).find('td').eq(k).css('display', 'none');
                        }
                    }
                }
                if (count > 0) {
                    t.eq(i).find('td').eq(j).attr('colspan', count + 1);
                }
                if (rcount > 0) {
                    t.eq(i).find('td').eq(j).attr('rowspan', rcount + 1);
                }
            }
        }
    }

    //Table、Chart相關定義⬆

    //定義那些頁面名稱是多個區塊搜尋的主頁面
    //tPageName: 頁面名稱
    public isMainIndex(tPageName: string): boolean {
        if (tPageName == 'Index') {
            return true;
        }
        return false;
    }

    //需要檢查相似度的欄位
    // tPageName:頁面名稱
    // tFieldName:頁面的某一個欄位名稱
    public NeedCheckSimilarity(tPageName: string, tFieldName: string): boolean {//需要檢查相似度的欄位
        if (tPageName == 'EndCustomer' && (tFieldName == '終端客戶' || tFieldName == '客戶簡稱')) {
            return true;
        }
        return false;
    }//需要檢查相似度的欄位

    //不需要替換Menu的表單欄位//true: 不需要替換; false: 要替換
    //tFieldName: 欄位名稱
    //tPageName: 頁面名稱
    //FieldValue: 欄位值
    public NoChangeField(tFieldName: string, tPageName: string, FieldValue: string): boolean {
        if ((tPageName == 'APvsFCSTvsAct' || tPageName == 'APQuery' || tPageName == 'FCSTQuery')
            && (tFieldName == 'BU' || tFieldName == '新/舊客戶' || tFieldName == 'BU' || tFieldName == 'SA/PC')) {
            return true;
        }

        return false;
    }

    //需要將顯示的值做修改(百萬、千分位、小數點)
    //tFieldName: 欄位名稱
    //valueStr: 欄位值
    //tRowTitleName: 行Title(每一行最左邊的值)
    public NeedModifyDisplay(tFieldName: string, valueStr: string, tPageName: string, tRowTitleName?: string): string {
        var ReStr = valueStr;
        var ReportMode = GetSelectValue('報表類型');

        if (valueStr == null) { return ''; }

        var tmpStr = valueStr.toString().replace('%', '');
        if (isNaN(Number(tmpStr))) {
            return valueStr;
        }

        if (valueStr == '' || tFieldName == 'Ver.' || tmpStr == '') {
            if (tPageName.indexOf('GPM') > -1 && (tFieldName == 'NSB' || tFieldName == '%' || tFieldName == 'GPM')) {
                return '-';
            }
            return valueStr;
        }

        if (tFieldName == '%' || tRowTitleName == '成長率') {
            ReStr = CheckDecimalPointFn((formatFloat(parseFloat(valueStr), 1)).toString() + '%', 1);
        }
        else if (tFieldName[tFieldName.length - 1] == '數' || tFieldName.indexOf('數量') > -1 || tFieldName.indexOf('營收') > -1 || tFieldName == 'AP' || tFieldName == 'FCST' || tFieldName == 'Actual'
            || (tPageName == 'RentCost')) {
            ReStr = formatFloat(parseFloat(valueStr), 0).toString().replace('.', '');
        }
        else if (tFieldName.indexOf('單價') > -1) {
            if (valueStr.indexOf('.') > -1) {
                ReStr = CheckDecimalPointFn(formatFloat(parseFloat(valueStr), 3), 3);
            }
            else {
                ReStr = valueStr;
            }
        }
        else if (valueStr.toString().indexOf('%') > -1) {//有百分比的數值
            if (tmpStr != '') {
                ReStr = CheckDecimalPointFn(formatFloat(parseFloat(tmpStr), 1), 1) + '%';
            }
            else {
                return '';
            }
        }
        else {//無百分比的數值
            ReStr = CheckDecimalPointFn(formatFloat(parseFloat(valueStr), 2), 2);
        }

        if (TableSetObj.MillionFieldArr.indexOf(tFieldName) > -1) {//百萬表示
            var UnitMode = GetSelectValue('單位');
            if (UnitMode != '數量') {
                ReStr = MillionFormat(tmpStr);
            }
        }
        if (TableSetObj.MoneyFieldArr.indexOf(tFieldName) > -1) {//千分位
            if (valueStr.toString().indexOf('%') > -1) {
                ReStr = MoneyFormat(ReStr.replace('%', '')) + '%';
            }
            else {
                ReStr = MoneyFormat(ReStr);
            }
        }

        return ReStr;
    }

    //檢查是否為複選下拉式
    //tPageName: 頁面名稱
    //tFieldName: 欄位名稱
    //isSearchArea: 是否為搜尋欄位裡的選單
    public IsMultiSelect(tPageName: string, tFieldName: string, isSearchArea: boolean): boolean {
        if (isSearchArea) {
            if (tPageName == 'APQuery' && (tFieldName == 'SA' || tFieldName == 'BU')) {
                return true;
            }
            else if (tPageName == 'FCSTQuery' && (tFieldName == '業務名稱' || tFieldName == 'BU')) {
                return true;
            }
            else if (tPageName == 'APvsFCSTvsAct' && (tFieldName == 'BU')) {
                return true;
            }
            else if (tPageName == 'BillingFCSTChart' && (tFieldName == 'BU')) {
                return true;
            }
            else if (tPageName == 'APFCSTChart' && (tFieldName == 'BU')) {
                return true;
            }
            else if (tPageName == 'NewProductCustomerNSB' && (tFieldName == 'BU')) {
                return true;
            }
            else if ((tPageName == 'BillingFCSTChart' || tPageName == 'APFCSTChart') && (tFieldName == '客戶')) {
                return true;
            }
        }

        return false;
    }//檢查是否為多選下拉式

    //產生匯出的資訊Query，標題/內容
    public GetExportQuery(tPageName: string, data: string[] | string[][] | { [key: string]: string }[], tmpTitle: string[][]) {
        let qy: { FieldName: string[], QueryResult: string[] } = {
            'FieldName': [],
            'QueryResult': []
        };
        if (gPageObj.PageNameObj[tPageName] == null) {
            return qy;
        }

        let pg = new PageTool();
        let tmpQueryResult = pg.MakeExportData(tPageName, data);
        let tmpFieldArr = gPageObj.PageNameObj[tPageName].TitleStrArr;
        tmpFieldArr = pg.ObjTitleToStrArr(tPageName, tmpTitle);

        if (tPageName == 'APMaintain' || tPageName == 'FCSTMaintain') {
            tmpFieldArr.splice(3, 1, '客戶代碼', '客戶名稱', '業務');
            for (let i = 0; i < tmpQueryResult.length; i++) {
                let tList = tmpQueryResult[i].split(';');
                let tmpValue = tList[3];
                let tValueArr = tmpValue.split('/');
                let tmpProductType = tList[7].split('-');
                tList[7] = tmpProductType[1];
                tList.splice(3, 1, tValueArr[0], tValueArr[1], tValueArr[2]);
                tmpQueryResult[i] = tList.join(';');
            }
        }
        else if (tPageName == 'APQuery' || tPageName == 'FCSTQuery' || tPageName == 'APvsFCSTvsAct') {
            for (let i = tmpQueryResult.length - 1; i >= 0; i--) {
                let tList = tmpQueryResult[i].split(';');
                if (tList[0].toLowerCase().indexOf('total') > -1) {
                    if (tList[0].toLowerCase().indexOf('total') == 0) {
                        for (let j = 1; j < tList.length; j++) {
                            if (tList[j].toLowerCase().indexOf('total') == 0) {
                                tList[j] = '';
                            }
                        }
                    }
                    else {
                        tList[1] = '';
                        let tmpSame = tList[2];
                        for (let j = 3; j < tList.length; j++) {
                            if (tList[j] == tmpSame) {
                                tList[j] = '';
                            }
                        }
                    }
                    tmpQueryResult[i] = tList.join(';');
                }
            }
        }

        qy.FieldName = tmpFieldArr;
        qy.QueryResult = tmpQueryResult;

        return qy
    }

    //客製化Datatable.js excel參數
    public DataTableExportCustomize(tPageName: string, data: string[] | string[][] | { [key: string]: string }[], dtObj: { [index: string]: any }): { [index: string]: any } {
        let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery;
        if (tPageName == 'YIELD_RATE') {
            if (LastQuery.QueryArr[0] == '總表') {
                dtObj['buttons'][0]['customize'] = function (xlsx: any) {
                    let sheet = xlsx.xl.worksheets['sheet1.xml'];
                    let styleSheet = xlsx.xl['styles.xml'];
                    let n1 = '<numFmt formatCode="0.000%" numFmtId="170"/>';
                    let s1 = '<xf numFmtId="170" fontId="0" fillId="0" borderId="0" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1"/>';
                    styleSheet.childNodes[0].childNodes[0].innerHTML = styleSheet.childNodes[0].childNodes[0].innerHTML + n1;
                    styleSheet.childNodes[0].childNodes[5].innerHTML = styleSheet.childNodes[0].childNodes[5].innerHTML + s1;
                    let el = $('cellXfs', styleSheet);
                    let styleIdx = $('xf', el).length - 1;
                    $('row:eq(5) c[r]', sheet).attr('s', styleIdx);
                }
            }
            else {
                dtObj['buttons'][0]['customize'] = function (xlsx: any) {
                    let sheet = xlsx.xl.worksheets['sheet1.xml'];
                    let styleSheet = xlsx.xl['styles.xml'];
                    let n1 = '<numFmt formatCode="0.000%" numFmtId="170"/>';
                    let s1 = '<xf numFmtId="170" fontId="0" fillId="0" borderId="0" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1"/>';
                    styleSheet.childNodes[0].childNodes[0].innerHTML = styleSheet.childNodes[0].childNodes[0].innerHTML + n1;
                    styleSheet.childNodes[0].childNodes[5].innerHTML = styleSheet.childNodes[0].childNodes[5].innerHTML + s1;
                    let el = $('cellXfs', styleSheet);
                    let styleIdx = $('xf', el).length - 1;
                    $('row c[r^="E"]', sheet).attr('s', styleIdx);
                }
            }
        }
        else if (tPageName == 'OS_RATE') {
            if (LastQuery.QueryArr[0] == '總表') {
                dtObj['buttons'][0]['customize'] = function (xlsx: any) {
                    let sheet = xlsx.xl.worksheets['sheet1.xml'];
                    let styleSheet = xlsx.xl['styles.xml'];
                    let n1 = '<numFmt formatCode="0.000%" numFmtId="170"/>';
                    let s1 = '<xf numFmtId="170" fontId="0" fillId="0" borderId="0" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1"/>';
                    styleSheet.childNodes[0].childNodes[0].innerHTML = styleSheet.childNodes[0].childNodes[0].innerHTML + n1;
                    styleSheet.childNodes[0].childNodes[5].innerHTML = styleSheet.childNodes[0].childNodes[5].innerHTML + s1;
                    let el = $('cellXfs', styleSheet);
                    let styleIdx = $('xf', el).length - 1;
                    $('row:eq(3) c[r], row:eq(4) c[r]', sheet).attr('s', styleIdx);
                }
            }
            else {
                dtObj['buttons'][0]['customize'] = function (xlsx: any) {
                    let sheet = xlsx.xl.worksheets['sheet1.xml'];
                    let styleSheet = xlsx.xl['styles.xml'];
                    let n1 = '<numFmt formatCode="0.000%" numFmtId="170"/>';
                    let s1 = '<xf numFmtId="170" fontId="0" fillId="0" borderId="0" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1"/>';
                    styleSheet.childNodes[0].childNodes[0].innerHTML = styleSheet.childNodes[0].childNodes[0].innerHTML + n1;
                    styleSheet.childNodes[0].childNodes[5].innerHTML = styleSheet.childNodes[0].childNodes[5].innerHTML + s1;
                    let el = $('cellXfs', styleSheet);
                    let styleIdx = $('xf', el).length - 1;
                    $('row:eq(3) c[r], row:eq(4) c[r]', sheet).attr('s', styleIdx);
                    $('row c[r^="C"], row c[r^="D"]', sheet).attr('s', styleIdx);
                }
            }
        }

        return dtObj;
    }

    //判定欄位是否需要Color Type
    public NeedColorField(tPageName: string, tFieldName: string) {
        if (tPageName == 'ColorRule' && tFieldName == 'ColorCode') {
            return true;
        }

        return false;
    }

    //檢查搜尋字串合法
    //tPageName: 頁面名稱
    //Data: 搜尋值陣列
    public CheckSearchQuery(tPageName: string, data: string[]) {
        if (tPageName == 'TEST_IN_GOODS' || tPageName == 'TEST_OUT_GOODS' || tPageName == 'TEST_RECEIVE' || tPageName == 'TEST_RECEIVE') {
            let tS: any = new Date(data[3]);
            let tE: any = new Date(data[4]);
            if (data[3] >= data[4]) {
                AlertClick('錯誤', '週From需小於週To');
                return false;
            }
            if (tE - tS > 365 * 24 * 60 * 60 * 1000) {
                AlertClick('錯誤', '週範圍不可超過一年');
                return false;
            }
        }

        return true;
    }

    //從搜尋條件設定表單的Title(目前實作於ClickSearch裡)
    //tPageName: 頁面名稱
    //Query: 搜尋Query
    //data: 搜尋結果
    public SetFormTitleFromQuery(tPageName: string, Query?: string[], data?: string[][]): string {
        let reTitleStr = '';

        if (tPageName == 'Prober_Handler_CPLCD_LIST' || tPageName == 'INK_Activation_LIST' || tPageName == 'AOI_Activation_LIST'
            || tPageName == 'Prober_Handler_FT_LIST' || tPageName == 'Tester_Activation_LIST' || tPageName == 'Prober_Handler_LBI_LIST'
            || tPageName == 'Prober_Handler_DS_LIST') {
            let qyStr: string[] = Query || [];
            for (let i = 2; i < qyStr.length; i++) {
                if (i > 2) { reTitleStr += ' '; }
                reTitleStr += qyStr[i].replace(/@/g, '、');
            }
            if (qyStr[0] == qyStr[1]) {
                reTitleStr += ' ' + qyStr[0];
            }
            else {
                reTitleStr += ' ' + qyStr[0] + '~' + qyStr[1];
            }
        }
        else if (tPageName == 'TEST_OUT_GOODS_LIST' || tPageName == 'TEST_IN_GOODS_LIST' || tPageName == 'TEST_RECEIVE_LIST'
            || tPageName == 'TEST_LOTSIZE_LIST' || tPageName == 'DS_IN_GOODS_LIST' || tPageName == 'DS_OUT_GOODS_LIST') {
            if (gPageObj.PageNameObj[tPageName] != null) {
                let tQuery: string[] = Query || [];
                reTitleStr = tQuery[2] + ' ' + tQuery[3].replace(/@/g, '、') + ' ' + tQuery[4].replace(/@/g, '、') + ' ' + tQuery[5].replace(/@/g, '、') + ' ' + tQuery[6].replace(/@/g, '、') + ' ' + tQuery[7];
                if (tQuery[0] == tQuery[1]) {
                    reTitleStr += ' ' + tQuery[0];
                }
                else {
                    reTitleStr += ' ' + tQuery[0] + '~' + tQuery[1];
                }

                if (Query != undefined && Query[2].length > 0 && Query[2][0] != '總' && Query[2][0] != '累' && Query[2][Query[2].length - 1] != '數') {
                    let tMenuName = 'CUST';
                    if (tPageName == 'TEST_IN_GOODS_LIST' || tPageName == 'TEST_LOTSIZE_LIST') {
                        tMenuName = 'TEST_IN_CUST';
                    }
                    else if (tPageName == 'TEST_OUT_GOODS_LIST') {
                        tMenuName = 'TEST_OUT_CUST';
                    }
                    else if (tPageName == 'TEST_RECEIVE_LIST') {
                        tMenuName = 'TEST_RECEIVE_CUST';
                    }
                    else if (tPageName == 'DS_IN_GOODS_LIST') {
                        tMenuName = 'DS_IN_CUST';
                    }
                    else if (tPageName == 'DS_OUT_GOODS_LIST') {
                        tMenuName = 'DS_OUT_CUST';
                    }
                    let tgArr = MenuList[tMenuName].MenuArr;
                    for (let i = 0; i < tgArr.length; i++) {
                        let tArr = tgArr[i].split(',');
                        if (tArr[0] == Query[2]) {
                            reTitleStr = reTitleStr.replace(tArr[0], tArr[1]);
                            break;
                        }
                    }
                }
            }
        }

        return reTitleStr;
    }
}

export class DynamicClass {//此class定義某欄位值改變時影響其他欄位
    DynamicInfObj: {
        [PageName: string]: {//PageName頁面名稱
            InfluenceByThisFieldName?: string,//因某個欄位名稱而動態影響Menu內容(目前只實作於經後端的Menu，會在這些欄位改變時觸發改變所有經後端產生的Menu)
            InfluenceToFieldNames?: {//於此物件定義的欄位名稱，指這些欄位名稱被改變時會觸發動態Menu取值(目前只實作於不經後端的Menu)
                [FieldName: string]: {//欄位名稱
                    [FieldId: string]: {//此欄位名稱會影響哪些搜尋Bar上的欄位ID，使其動態改變Menu值。可用cell_y_x來表示table內某一欄位座標，如 cell_y_7(x需定值)
                        MenuName: string,//此欄位ID需要用到的Menu名稱
                        EffectiveInSearchBar?: boolean,//動態載入在搜尋Bar是否有效。無定義則表示有效
                        EffectiveInTable?: boolean,//動態載入在Table是否有效。無定義則表示無效
                        ValueByIdName?: string[],//此被影響的欄位需帶入那些IdName(搜尋bar)的值
                    }//若FieldName沒有定義FieldId，則表示有此動態影響關係，但有其他的動作定義(於DynamicFunction中定義)
                }
            }
        }
    };
    FunctionName: string = 'DynamicFunction.DynamicRequest';//動態處理的觸發function
    //tIdx: number;
    constructor() {
        this.DynamicInfObj = {
            TEST_EQP_Abnormal: {
                InfluenceToFieldNames: {
                    報表類型: {
                        '': {
                            MenuName: ''
                        }
                    },
                    'BU': {
                        'field_8': {
                            MenuName: 'TEST_CUST',
                        },
                        'field_9': {
                            MenuName: 'TEST_EQP_CATEGORY',
                        },
                        'field_10': {
                            MenuName: 'TEST_EQP_NO',
                            ValueByIdName: ['field_7', 'field_9'],
                        },
                        'field_11': {
                            MenuName: 'TEST_TESTER',
                            ValueByIdName: ['field_7', 'field_9', 'field_10'],
                        },
                    },
                    '機型': {
                        'field_10': {
                            MenuName: 'TEST_EQP_NO',
                            ValueByIdName: ['field_7', 'field_9'],
                        },
                        'field_11': {
                            MenuName: 'TEST_TESTER',
                            ValueByIdName: ['field_7', 'field_9', 'field_10'],
                        },
                    },
                    '機台': {
                        'field_11': {
                            MenuName: 'TEST_TESTER',
                            ValueByIdName: ['field_7', 'field_9', 'field_10'],
                        },
                    }
                }
            },
            TEST_EQP_RAM: {
                InfluenceToFieldNames: {
                    報表類型: {
                        '': {
                            MenuName: ''
                        }
                    },
                    'BU': {
                        'field_7': {
                            MenuName: 'TEST_CUST',
                        },
                        'field_8': {
                            MenuName: 'TEST_EQP_CATEGORY',
                        },
                        'field_9': {
                            MenuName: 'TEST_EQP_NO',
                            ValueByIdName: ['field_6', 'field_8'],
                        },
                        'field_10': {
                            MenuName: 'TEST_TESTER',
                            ValueByIdName: ['field_6', 'field_8', 'field_9'],
                        },
                    },
                    '機型': {
                        'field_9': {
                            MenuName: 'TEST_EQP_NO',
                            ValueByIdName: ['field_6', 'field_8'],
                        },
                        'field_10': {
                            MenuName: 'TEST_TESTER',
                            ValueByIdName: ['field_6', 'field_8', 'field_9'],
                        },
                    },
                    '機台': {
                        'field_10': {
                            MenuName: 'TEST_TESTER',
                            ValueByIdName: ['field_6', 'field_8', 'field_9'],
                        },
                    }
                }
            },
            DS_EQP_RAM: {
                InfluenceToFieldNames: {
                    報表類型: {
                        '': {
                            MenuName: ''
                        }
                    },
                    '機型': {
                        'field_7': {
                            MenuName: 'DS_EQP_NO',
                        },
                    },
                }
            }
        };
    }

    NeedDynamicGetList(tPageName: string, tFiledName: string, isSearchArea: boolean): boolean {
        if (isSearchArea != null) {
            if (isSearchArea) {//搜尋Bar
                if (this.DynamicInfObj[tPageName]?.InfluenceByThisFieldName == tFiledName) {
                    return true;
                }
            }
        }
        if (this.DynamicInfObj[tPageName]?.InfluenceToFieldNames?.[tFiledName]) {
            return true;
        }

        return false;
    }

    //根據定義產生call function字串
    //tPageName: 頁面名稱
    //tFiledName: 欄位名稱
    //isSearchArea: 此函式是否來自搜尋Bar(目前未實作特殊功能)
    //TriggerFromId: 觸發此函式的DOM ID(目前實作於Table內部的觸發)
    ReturnFunctionStr(tPageName: string, tFiledName: string, isSearchArea: boolean, TriggerFromId?: string): string {
        let reStr = '';
        if (this.NeedDynamicGetList(tPageName, tFiledName, isSearchArea)) {
            if (this.DynamicInfObj[tPageName].InfluenceByThisFieldName == tFiledName) {
                reStr += this.FunctionName + '(\'' + tPageName + '\', null, null, ' + isSearchArea + ');';
            }
            if (this.DynamicInfObj[tPageName]?.InfluenceToFieldNames && this.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFiledName] != null) {
                if (Object.keys(this.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFiledName]).length > 0) {
                    for (let key in this.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFiledName]) {
                        if ((isSearchArea && (this.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFiledName][key]?.EffectiveInSearchBar == false))
                            || (!isSearchArea && (!this.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFiledName][key]?.EffectiveInTable))) {
                            continue;
                        }
                        reStr += this.FunctionName + '(\'' + tPageName + '\', \'' + key + '\', \'' + tFiledName + '\', ' + isSearchArea;
                        if (TriggerFromId) {
                            reStr += ', \'' + TriggerFromId + '\'';
                        }
                        reStr += ');';
                    }
                }
                else {
                    reStr += this.FunctionName + '(\'' + tPageName + '\', \'\', \'' + tFiledName + '\', ' + isSearchArea;
                    if (TriggerFromId) {
                        reStr += ', \'' + TriggerFromId + '\'';
                        reStr += ');';
                    }
                }
            }
        }

        return reStr;
    }
}

export class OnclickPage {
    //判定這個cell有沒有Click Function
    //tPageName: 頁面名稱
    //FieldName: 欄位名稱
    //RowTitle: 該行行Title
    FieldIsOnclick(tPageName: string, FieldName: string, RowTitle: string) {
        if (NeedClickObj[tPageName] && NeedClickObj[tPageName][FieldName] && (NeedClickObj[tPageName][FieldName].NotShowInRowTitle || []).indexOf(RowTitle) < 0) {
            return true;
        }

        return false;
    }
    //tPageName: 頁面名稱
    //tTablePageName: click search的table頁面名稱
    //FieldName: 欄位名稱
    //RowTitle: 該行行Title
    //dataArr: 一行的data陣列
    //p1: 需額外加入的參數
    GetOnclickHtml(tPageName: string, tTablePageName: string, FieldName: string, RowTitle: string, dataArr: Array<string>, p1?: string) {
        let regexp = /\[[^\[&^\]]+\]/g;
        if (this.FieldIsOnclick(tPageName, FieldName, RowTitle)) {
            let HtmlStr: string = NeedClickObj[tPageName][FieldName].Function;
            HtmlStr += '(\'' + tTablePageName + '\', [\'';
            for (let i = 0; i < NeedClickObj[tPageName][FieldName].ValueQuery.length; i++) {
                if (i > 0) {
                    HtmlStr += '\', \'';
                }
                let tArr: string[] | null;
                if (typeof NeedClickObj[tPageName][FieldName].ValueQuery[i] == 'number') {
                    HtmlStr += dataArr[+NeedClickObj[tPageName][FieldName].ValueQuery[i]].replace(/"/g, '”');
                }
                else if ((tArr = NeedClickObj[tPageName][FieldName].ValueQuery[i].toString().match(regexp)) != null) {
                    let tNumber: string = tArr[0].replace('[', '').replace(']', '');
                    if (!isNaN(Number(tNumber))) { HtmlStr += tNumber; }
                }
                else {
                    HtmlStr += NeedClickObj[tPageName][FieldName].ValueQuery[i].toString().replace(/"/g, '”');
                }
            }

            HtmlStr += '\']';
            if (p1) { HtmlStr += ', \'' + p1 + '\''; }
            HtmlStr += ')';
            return HtmlStr;
        }

        return '';
    }
}

export class ColorRuleClass {
    HighlightObj: {//經過規則判定，每行確定要Highlight的座標資訊
        [RowIdx: number]: {
            [CellIdx: number]: {//行座標
                Color: string,//顏色
                BackgroundColor: string,//背景顏色
                Score: number,//目前Highlight的權重，用於決定複數規則下是否覆寫
            }
        }
    } = {};

    //從前端定義顏色規則(有些專案還沒支援由後端資料庫定義顏色功能，因此需要由前端定義)
    SetColorRuleFromFront(tPageName: string) {
        let ReportMode = GetSelectValue('報表類型');
        type Node = {
            Rule: string[];
            Color: string[];
            BackgroundColor: string[];
            isLateral: boolean;
        }

        if (tPageName == 'ProdCustGPM') {
            //ColorRuleArr = {};//設定初始化清空
            let tNode: {
                [CellIdx: number]: Node;
            } = {};
            let tcNode: Node = {
                Rule: ['[10] < [7]'],
                Color: ['white'],
                BackgroundColor: ['red'],
                isLateral: true
            };
            let TargetIdx = 10;
            tNode[TargetIdx] = tcNode;

            if (!ColorRuleArr[tPageName]) {
                ColorRuleArr[tPageName] = tNode;
            }
            else if (!ColorRuleArr[tPageName][TargetIdx]) {
                ColorRuleArr[tPageName][TargetIdx] = tcNode;
            }
        }
        else if (tPageName == 'Top10ProdCustGPM') {
            //ColorRuleArr = {};//設定初始化清空
            let tNode: {
                [CellIdx: number]: Node;
            } = {};
            let tcNode: Node = {
                Rule: ['[9] < [6]'],
                Color: ['white'],
                BackgroundColor: ['red'],
                isLateral: true
            };
            let TargetIdx = 9;
            tNode[TargetIdx] = tcNode;

            if (!ColorRuleArr[tPageName]) {
                ColorRuleArr[tPageName] = tNode;
            }
            else if (!ColorRuleArr[tPageName][TargetIdx]) {
                ColorRuleArr[tPageName][TargetIdx] = tcNode;
            }
        }
        else if (tPageName == 'Top10CustomerRevenue') {
            //ColorRuleArr = {};//設定初始化清空
            let LasyQuery = gPageObj.PageNameObj[tPageName].LastQuery;
            let tNode: {
                [CellIdx: number | string]: Node;
            } = {};
            let tcNode: Node = {
                Rule: ['[' + LasyQuery[1] + ' AP達成率] > 100'],
                Color: ['red'],
                BackgroundColor: [''],
                isLateral: false
            };
            let TargetIdx: number | string = LasyQuery[1] + ' AP達成率';
            tNode[TargetIdx] = tcNode;

            if (!ColorRuleArr[tPageName]) {
                ColorRuleArr[tPageName] = tNode;
            }
            else if (!ColorRuleArr[tPageName][TargetIdx]) {
                ColorRuleArr[tPageName][TargetIdx] = tcNode;
            }
        }
    }

    //判斷是否為特殊規則時，是否不看搜尋Bar。
    //一般先判斷RowTitle，判斷欄位名稱，再判斷搜尋Bar
    NotSearchBar(tPageName: string): boolean {
        let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery;

        if (tPageName == 'YIELD_RATE') {
            if (LastQuery.QueryArr[0] != '總表') {
                return true;
            }
        }

        return false;
    }

    //定義特殊規則
    SetOtherRules(Query: string[]): { 'Score': number, [TitleOrFieldName: string]: string | number } {
        let tNode: { 'Score': number, [TitleOrFieldName: string]: string | number } = { 'Score': Number(Query[5]) };
        if (Query.length > 6) {
            if (Query[6] && Query[6] != '') {
                tNode['BU'] = Query[6];
                //tNode['Score'] += 1;
            }
            if (Query[7] && Query[7] != '') {
                tNode['客戶'] = Query[7];
                //tNode['Score'] += 2;
            }
            //x: 權重順序: BU/客戶 > 客戶 > BU > 無
            //v: 現改為由資料庫決定權種大小

            return tNode;
        }

        return tNode;
    }

    //根據後端傳至前端的顏色規則，初始化顏色規則物件
    InitColorRule() {
        if (document.getElementById('ColorRule')?.innerHTML != null) {
            //let tmpColorStr = document.getElementById('ColorRule').innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            let tmpColorStr = document.getElementById('ColorRule')?.innerText || document.getElementById('ColorRule')?.textContent;
            let tColorRuleArr: string[] = tmpColorStr != null && tmpColorStr != '' ? tmpColorStr?.split(';') : [];

            for (let i = 0; i < tColorRuleArr.length; i++) {
                let tArr = tColorRuleArr[i].split(',');
                tArr[1] = tArr[1].trim();
                tArr[3] = tArr[3].trim();

                type Node1 = {
                    Color: string,//顏色
                    BackgroundColor: string,//背景顏色
                    Others: {
                        'Score': number,
                        [TitleOrFieldName: string]: string | number,
                    }
                }
                type Node2 = {
                    [Rule: string]: Node1
                }
                type Node3 = {
                    [isLateral: number]: Node2
                }
                type Node4 = {
                    [CellOrRowIdx: number | string]: Node3
                }
                let tNode1: Node1 = {
                    Color: tArr[3],
                    BackgroundColor: '',
                    Others: this.SetOtherRules(tArr)
                };
                let tNode2: Node2 = {
                    [tArr[1]]: tNode1
                }
                let tNode3: Node3 = {
                    [+tArr[4]]: tNode2
                }
                let tcIdx = !isNaN(Number(tArr[2])) ? +tArr[2] : tArr[2];
                let tNode4: Node4 = {
                    [tcIdx]: tNode3
                }

                if (ColorRuleArr[tArr[0]] == null) {
                    ColorRuleArr[tArr[0]] = tNode4;
                }
                else if (ColorRuleArr[tArr[0]][tcIdx] == null) {
                    ColorRuleArr[tArr[0]][tcIdx] = tNode3;
                }
                else if (ColorRuleArr[tArr[0]][tcIdx][+tArr[4]] == null) {
                    ColorRuleArr[tArr[0]][tcIdx][+tArr[4]] = tNode2;
                }
                else if (ColorRuleArr[tArr[0]][tcIdx][+tArr[4]][tArr[1]] == null) {
                    ColorRuleArr[tArr[0]][tcIdx][+tArr[4]][tArr[1]] = tNode1;
                }
            }
        }
    }

    //判斷此欄位值是否符合特殊規則。若沒定義特殊規則則回傳true
    //tPageName: 頁面名稱
    //Others: 判定規則
    //CellIdx: 行座標
    //RowTitle: 左邊第一值
    isConformRule(tPageName: string, Others: { 'Score': number, [TitleOrFieldName: string]: string | number }, CellIdx: number, RowTitle: string): boolean {
        let tmpBool: boolean[] = [];
        let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery;
        let TitleArr = gPageObj.PageNameObj[tPageName].TitleStrArr;
        let ps = new PageSet();
        let pt = new PageTool();
        let haveOtherRules: boolean = false;

        for (let x in Others) {
            if (x != 'Score') {
                haveOtherRules = true;
                let tFIdx = gPageObj.PageNameObj[tPageName].FieldArr.indexOf(x);
                let GetValue: string[] | string = LastQuery.QueryArr.length > 0 ? (LastQuery.QueryArr[tFIdx].indexOf('@') > -1 ? LastQuery.QueryArr[tFIdx].split('@') : LastQuery.QueryArr[tFIdx]) : '';
                let tmpMenuArr: string[] = ps.GetListArr(tPageName, x, true);
                let tmpValue: string = pt.GetListValue(tmpMenuArr, Others[x].toString());
                let tmpValueArr: string[] = tmpValue.indexOf('/') > -1 ? tmpValue.split('/') : [];
                let tRowTitleArr: string[] = RowTitle.indexOf('/') > -1 ? RowTitle.split('/') : [];
                let tmpCellValue: string = CellIdx > -1 && CellIdx < TitleArr.length ? TitleArr[CellIdx] : '';
                let tCellTitleArr: string[] = tmpCellValue.indexOf('/') > -1 ? tmpCellValue.split('/') : [];

                //先判斷RowTitle
                if (RowTitle == tmpValue || RowTitle == Others[x]
                    || tRowTitleArr.indexOf(tmpValue) > -1 || tRowTitleArr.indexOf(Others[x].toString()) > -1
                    || tmpValueArr.indexOf(RowTitle) > -1) {
                    return true;
                }
                //再判斷欄位名稱
                if (tmpCellValue == tmpValue || tmpCellValue == Others[x]
                    || tCellTitleArr.indexOf(tmpValue) > -1 || tCellTitleArr.indexOf(Others[x].toString()) > -1
                    || tmpValueArr.indexOf(tmpCellValue) > -1) {
                    return true;
                }
                //最後判斷搜尋Bar
                if (!this.NotSearchBar(tPageName)) {
                    if ((typeof GetValue == 'object' && GetValue.indexOf(Others[x].toString()) > -1)
                        || (typeof GetValue == 'string' && GetValue == Others[x])) {
                        return true;
                    }
                }
            }
        }

        return !haveOtherRules ? true : false;
    }

    //將搜尋結果與顏色規則初始化Hightlight座標資訊物件
    InitColorObj(tPageName: string, data: string[][] | string[] | { [key: string]: string }[]) {
        let regexp = /\[[^\[&^\]]+\]/g;
        this.HighlightObj = {};
        let RowTitle: string[] = [];//左邊第一個值的Title
        let TitleArr: string[] = gPageObj.PageNameObj[tPageName].TitleStrArr;//欄位名稱陣列
        let tData: string[][] = [];
        Object.assign(tData, data);

        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] == 'string') {
                tData[i] = (data[i] as string).split(',');
            }
            else if (typeof data[i] == 'object'){
                tData[i] = gPageObj.PageNameObj[tPageName].LineDataObjToArray(data[i]);
            }
            RowTitle.push(tData[i][0]);

            for (let j = 0; j < tData[i].length; j++) {
                tData[i][j] = tData[i][j].replace('%', '');
                //if (tData[i][j] == '' || tData[i][j] == '-') { tData[i][j] = '0'; }
                //不能轉0，否則可能會合法運算Higglight顏色
                let tArr = tData[i][j].split(';');
                if (tArr.length > 1) { tData[i][j] = tArr[0]; }
            }
        }

        for (let i = 0; i < tData.length; i++) {
            let tLineData: string[] = tData[i];
            //縱坐標判定
            if (ColorRuleArr[tPageName] && ColorRuleArr[tPageName][i] && ColorRuleArr[tPageName][i][0]) {
                for (let tRule in ColorRuleArr[tPageName][i][0]) {
                    let tIdxArr: string[] = tRule.match(regexp) || [];
                    for (let m = 0; m < tLineData.length; m++) {
                        let isConform = this.isConformRule(tPageName, ColorRuleArr[tPageName][i][0][tRule].Others, m, RowTitle[i]);
                        if (isConform) {
                            let tValue = tLineData[m].replace('%', '');
                            let tmRule = tRule;
                            let HaveDash = false;
                            //if (!isNaN(Number(tValue))) {
                            for (let k = 0; k < tIdxArr.length; k++) {
                                let tStr: string = tIdxArr[k].replace('[', '').replace(']', '');
                                let tIdx: number = -1;
                                if (!isNaN(Number(tStr))) {
                                    tIdx = Number(tStr);
                                }
                                else {
                                    tIdx = RowTitle.indexOf(tStr);
                                }

                                while (tmRule.indexOf(tIdxArr[k]) > -1) {
                                    if (tData[tIdx][m] == '-' || tData[tIdx][m] == '') {
                                        HaveDash = true;
                                        break;
                                    }
                                    tmRule = tmRule.replace(tIdxArr[k], tData[tIdx][m]);
                                }

                                if (HaveDash) { break; }
                            }

                            if (HaveDash) { continue; }
                            if (eval(tmRule)) {
                                let tNode = {
                                    Color: ColorRuleArr[tPageName][i][0][tRule].Color,//顏色
                                    BackgroundColor: ColorRuleArr[tPageName][i][0][tRule].BackgroundColor,//背景顏色
                                    Score: ColorRuleArr[tPageName][i][0][tRule].Others.Score
                                }

                                if (!this.HighlightObj[i]) {
                                    let tpNode = { [m]: tNode };
                                    this.HighlightObj[i] = tpNode;
                                }
                                else if (!this.HighlightObj[i][m]) {
                                    this.HighlightObj[i][m] = tNode;
                                }
                                //如果目前Highlight權重高於目前的，則覆蓋
                                else if (tNode.Score > this.HighlightObj[i][m].Score) {
                                    this.HighlightObj[i][m] = tNode;
                                }
                            }
                            //}
                        }
                    }
                }
            }
            //縱Title判定。縱坐標、縱Title，兩個判定不寫成一個的原因:讓權重去決定要不要覆寫
            if (ColorRuleArr[tPageName] && ColorRuleArr[tPageName][RowTitle[i]] && ColorRuleArr[tPageName][RowTitle[i]][0]) {
                for (let tRule in ColorRuleArr[tPageName][RowTitle[i]][0]) {
                    let tIdxArr: string[] = tRule.match(regexp) || [];
                    for (let m = 0; m < tLineData.length; m++) {
                        let isConform = this.isConformRule(tPageName, ColorRuleArr[tPageName][RowTitle[i]][0][tRule].Others, m, RowTitle[i]);
                        if (isConform) {
                            let tmRule = tRule;
                            let tValue = tLineData[m].replace('%', '');
                            let HaveDash = false;
                            //if (!isNaN(Number(tValue))) {
                            for (let k = 0; k < tIdxArr.length; k++) {
                                let tStr: string = tIdxArr[k].replace('[', '').replace(']', '');
                                let tIdx: number = -1;
                                if (!isNaN(Number(tStr))) {
                                    tIdx = Number(tStr);
                                }
                                else {
                                    tIdx = RowTitle.indexOf(tStr);
                                }

                                while (tmRule.indexOf(tIdxArr[k]) > -1) {
                                    if (tData[tIdx][m] == '-' || tData[tIdx][m] == '') {
                                        HaveDash = true;
                                        break;
                                    }
                                    tmRule = tmRule.replace(tIdxArr[k], tData[tIdx][m]);
                                }
                                if (HaveDash) { break; }
                            }

                            if (HaveDash) { continue; }
                            if (eval(tmRule)) {
                                let tNode = {
                                    Color: ColorRuleArr[tPageName][RowTitle[i]][0][tRule].Color,//顏色
                                    BackgroundColor: ColorRuleArr[tPageName][RowTitle[i]][0][tRule].BackgroundColor,//背景顏色
                                    Score: ColorRuleArr[tPageName][RowTitle[i]][0][tRule].Others.Score
                                }

                                if (!this.HighlightObj[i]) {
                                    let tpNode = { [m]: tNode };
                                    this.HighlightObj[i] = tpNode;
                                }
                                else if (!this.HighlightObj[i][m]) {
                                    this.HighlightObj[i][m] = tNode;
                                }
                                //如果目前Highlight權重高於目前的，則覆蓋
                                else if (tNode.Score > this.HighlightObj[i][m].Score) {
                                    this.HighlightObj[i][m] = tNode;
                                }
                            }
                            //}
                        }
                    }
                }
            }
            //橫坐標判定
            for (let CellIdx in ColorRuleArr[tPageName]) {
                //索引為欄位名稱的狀況
                let tCellIdx: number = gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf(CellIdx);
                if (ColorRuleArr[tPageName][CellIdx][1] && (!isNaN(Number(CellIdx)) || tCellIdx > -1)) {
                    //只要是數字一律視為座標，Title不會考慮有數字名稱的可能
                    if (!isNaN(Number(CellIdx))) { tCellIdx = Number(CellIdx); }
                    for (let tRule in ColorRuleArr[tPageName][CellIdx][1]) {
                        let isConform = this.isConformRule(tPageName, ColorRuleArr[tPageName][CellIdx][1][tRule].Others, tCellIdx, RowTitle[i]);
                        if (isConform) {
                            let tIdxArr: string[] = tRule.match(regexp) || [];
                            let tmRule = tRule;
                            let HaveDash = false;

                            for (let k = 0; k < tIdxArr.length; k++) {
                                let tStr: string = tIdxArr[k].replace('[', '').replace(']', '');
                                let tIdx: number = -1;
                                if (!isNaN(Number(tStr))) {
                                    tIdx = Number(tStr);
                                }
                                else {
                                    tIdx = gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf(tStr);
                                }

                                while (tmRule.indexOf(tIdxArr[k]) > -1) {
                                    if (tData[i][tIdx] == '-' || tData[i][tIdx] == '') {
                                        HaveDash = true;
                                        break;
                                    }
                                    tmRule = tmRule.replace(tIdxArr[k], tData[i][tIdx]);
                                }
                                if (HaveDash) { break; }
                            }

                            if (HaveDash) { continue; }
                            if (eval(tmRule)) {
                                let tNode = {
                                    Color: ColorRuleArr[tPageName][CellIdx][1][tRule].Color,//顏色
                                    BackgroundColor: ColorRuleArr[tPageName][CellIdx][1][tRule].BackgroundColor,//背景顏色
                                    Score: ColorRuleArr[tPageName][CellIdx][1][tRule].Others.Score,
                                }

                                if (!this.HighlightObj[i]) {
                                    let tpNode = { [tCellIdx]: tNode };
                                    this.HighlightObj[i] = tpNode;
                                }
                                else if (!this.HighlightObj[i][tCellIdx]) {
                                    this.HighlightObj[i][tCellIdx] = tNode;
                                }
                                //如果目前Highlight權重高於目前的，則覆蓋
                                else if (tNode.Score > this.HighlightObj[i][tCellIdx].Score) {
                                    this.HighlightObj[i][tCellIdx] = tNode;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //檢查行座標是否需要Highlight。回傳style格式的字串
    CheckColorRule(RowIdx: number, CellIdx: number): string {
        let c: string = this.HighlightObj[RowIdx] && this.HighlightObj[RowIdx][CellIdx] ? this.HighlightObj[RowIdx][CellIdx].Color : '';
        let b: string = this.HighlightObj[RowIdx] && this.HighlightObj[RowIdx][CellIdx] ? this.HighlightObj[RowIdx][CellIdx].BackgroundColor : '';
        let reStr = '';
        if (c != '') {
            reStr += 'color:' + c + ';';
        }
        if (b != '') {
            reStr += 'background-color:' + b + ';';
        }
        return reStr;
    }
}

//此class定義動態改變欄位時觸發的function(用於搜尋bar)
export class DynamicFunction {
    //此函式用於定義非FrontDynamicMenuRequest的動作。(此函式用於前端動態影響的條件下且idName = ''，call function)
    private FrontDynamic(tPageName: string, tFieldName: string): void {
        if (tPageName == 'TEST_IN_GOODS' || tPageName == 'TEST_OUT_GOODS' || tPageName == 'TEST_RECEIVE'
            || tPageName == 'TEST_LOTSIZE' || tPageName == 'DS_IN_GOODS' || tPageName == 'DS_OUT_GOODS'
            || tPageName == 'Prober_Handler_CPLCD' || tPageName == 'INK_Activation' || tPageName == 'AOI_Activation'
            || tPageName == 'Prober_Handler_FT' || tPageName == 'Tester_Activation' || tPageName == 'Prober_Handler_LBI'
            || tPageName == 'Prober_Handler_DS') {
            let mode = GetSelectValue('報表類型');

            if (mode == '年' || mode == '季' || mode == 'YOY') {
                ViewChange2('YearMode', 'block');
                ViewChange2('MonthMode', 'none');
                ViewChange2('WeekMode', 'none');
            }
            else if (mode == '月') {
                ViewChange2('YearMode', 'block');
                ViewChange2('MonthMode', 'block');
                ViewChange2('WeekMode', 'none');
            }
            else if (mode == '週') {
                ViewChange2('YearMode', 'none');
                ViewChange2('MonthMode', 'none');
                ViewChange2('WeekMode', 'block');
            }
        }
    }

    //此函式用於定義需要通過後端取值時，另外還需要純前端的改變。
    private FrontDynamicInBackCall(tPageName: string): void {

    }

    //此函式用於定義需要通過後端取值時，DynamicRequest最後結束前需要執行的動作
    private DynamicInBackCallAtEnd(tPageName: string, isSearch: boolean): void {
        if (tPageName == 'DS_IN_GOODS' || tPageName == 'DS_OUT_GOODS') {
            SelectRefresh('field_2');
            DynamicFunction.DynamicRequest(tPageName, 'field_7', 'BU', isSearch);
        }
        else if (tPageName == 'TEST_IN_GOODS' || tPageName == 'TEST_OUT_GOODS' || tPageName == 'DS_IN_GOODS' || tPageName == 'DS_OUT_GOODS') {
            SelectRefresh('field_2');
            DynamicFunction.DynamicRequest(tPageName, 'field_7', 'BU', isSearch);
            DynamicFunction.DynamicRequest(tPageName, 'field_8', 'BU', isSearch);
            DynamicFunction.DynamicRequest(tPageName, 'field_9', 'BU', isSearch);
        }
        else if (tPageName == 'Prober_Handler_DS' || tPageName == 'SEMI_TESTER_M') {
            SelectRefresh('field_2');
            DynamicFunction.DynamicRequest(tPageName, 'field_3', 'BU', isSearch);
        }
        else if (tPageName == 'Tester_Activation') {
            SelectRefresh('field_5');
            DynamicFunction.DynamicRequest(tPageName, 'field_6', 'BU', isSearch);
        }
        else if (tPageName == 'Prober_Handler_FT') {
            SelectRefresh('field_5');
            DynamicFunction.DynamicRequest(tPageName, 'field_6', 'EQ Type', isSearch);
        }
        else if (tPageName == 'Prober_Handler_DS_Y' || tPageName == 'SEMI_TESTER_Y') {
            SelectRefresh('field_1');
            DynamicFunction.DynamicRequest(tPageName, 'field_2', 'BU', isSearch);
        }
    }

    //重新定義動態欄位的Query值
    public ResetDynamicQuery(tPageName: string, tFiledName: string, TargetIdName: string, key: string | string[]): string | string[] {
        if (tPageName == 'RentCost' && tFiledName == 'BU' && TargetIdName == 'field_7') {
            if (key == 'CP' || key == 'LCD') {
                return 'PROBER';
            }
            else {
                return 'HANDLER';
            }
        }

        return key;
    }

    //動態影響觸發的function。包含純前端的改變、透過後端取值的ajax呼叫
    //tPageName: 頁面名稱
    //idName: html物件ID名稱(搜尋bar、可以是table某欄位的ID)(受到影響的)
    //tFieldName: 欄位名稱(因此欄位影響別的欄位的)
    //TriggerFromId: 觸發此函式的DOM ID(目前實作於Table內部的觸發)
    public static DynamicRequest(tPageName: string, idName: string, tFieldName: string, isSearch: boolean, TriggerFromId?: string): void {
        let Today = new Date();
        let year = GetSelectValue('年度');
        if (tPageName == 'Actual') {
            year = GetSelectValue('年');
        }
        if (!tPageName) {
            tPageName = gPageObj.PageNameArr[0];
        }
        let bu = '';

        let Query: { PageName: string, Year: string, BU: string } = {
            PageName: tPageName,
            Year: year?.toString() || '',
            BU: bu
        };
        let NeedRequest = false;
        let dc = new DynamicClass();

        //判定是否需要呼叫後端
        //idName為被影響的搜尋bar的物件ID。因後端呼叫會影響全部的搜尋bar的menu值，idName不會有值
        if (idName != null) {
            if (dc.DynamicInfObj[tPageName]?.InfluenceToFieldNames && dc.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFieldName] != null) {
                if (idName == '') {
                    let df = new DynamicFunction();
                    df.FrontDynamic(tPageName, tFieldName);
                }
                else {
                    let pm = new PageMake();
                    let valueArr: string[] | undefined = [];

                    if (TriggerFromId) {
                        let tmp = $('#' + TriggerFromId).find('select').val() || $('#' + TriggerFromId).find('input').val() || $('#' + TriggerFromId).val() || '';
                        let tValue = typeof tmp == 'number' ? tmp.toString() : tmp;
                        let TargetIdx = idName.substring(idName.indexOf('_') + 1);
                        let TargetID = TriggerFromId.substring(0, TriggerFromId.lastIndexOf('_') + 1) + TargetIdx + '_menu';
                        if (!document.getElementById(TargetID)) {
                            TargetID = TriggerFromId.substring(0, TriggerFromId.lastIndexOf('_') + 1) + TargetIdx;
                        }
                        let df = new DynamicFunction();
                        tValue = df.ResetDynamicQuery(tPageName, tFieldName, idName, tValue);
                        valueArr = pm.FrontDynamicMenuRequest(tPageName, tFieldName, idName, isSearch, tValue);
                        document.getElementById(TargetID)!.innerHTML = pm.MakeOptionHtml(valueArr || [], '');
                        $('#' + TargetID).selectpicker('refresh');
                    }
                    else if (dc.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFieldName][idName].ValueByIdName && dc.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFieldName][idName].ValueByIdName!.length > 0) {
                        let tValueArr: string[] = [];
                        dc.DynamicInfObj[tPageName]?.InfluenceToFieldNames![tFieldName][idName].ValueByIdName!.forEach(function (item) {
                            tValueArr.push(typeof $('#' + item).val() == 'object' ? ($('#' + item).val() as string[]).join('@') : $('#' + item).val()!.toString());
                        });
                        valueArr = pm.FrontDynamicMenuRequest(tPageName, tFieldName, idName, isSearch, tValueArr);
                        document.getElementById(idName)!.innerHTML = pm.MakeOptionHtml(valueArr || [], '');
                        $('#' + idName).selectpicker('refresh');
                    }
                    else {
                        valueArr = pm.FrontDynamicMenuRequest(tPageName, tFieldName, idName, isSearch);
                        document.getElementById(idName)!.innerHTML = pm.MakeOptionHtml(valueArr || [], '');
                        $('#' + idName).selectpicker('refresh');
                    }
                }
            }
        }
        else {
            NeedRequest = true;
        }

        if (NeedRequest) {
            let pt = new PageTool();
            /*for (let i = 0; i < DCMenuIdNameList.length; i++) {
                pt.SelectDisableChange([DCMenuIdNameList[i]], false);
            }*/

            doAjax('GetMenuByYear', true, Query, function (data: string) {
                if (data != null && data.length > 0) {
                    let tmpArr = data.split('@');

                    if (Query.Year != null) {
                        for (let i = 0; i < tmpArr.length; i++) {
                            if (tmpArr[i].length > 0) {
                                let tArr = tmpArr[i].split('#');
                                if (document.getElementById(tArr[0])) {
                                    document.getElementById(tArr[0])!.innerHTML = tArr[1];
                                }
                                else {
                                    document.getElementById('MenuValueArea')!.innerHTML += '<span id="' + tArr[0] + '">' + tArr[1] + '</span>';
                                }
                            }
                        }

                        let po = new PageOperation();
                        let df = new DynamicFunction();
                        df.FrontDynamicInBackCall(tPageName);

                        po.InitListArr(tPageName);

                        /*for (let i = 0; i < DCMenuIdNameList.length; i++) {
                            pt.SelectDisableChange([DCMenuIdNameList[i]], true);
                        }*/
                        pt.ReloadSelectOption(DCMenuIdNameList);

                        $('.selectpicker').selectpicker('refresh');
                        df.DynamicInBackCallAtEnd(tPageName, isSearch);
                    }
                }
            });
        }
    }
}

//此class用於定義Table間因某欄位而影響其他欄位的動作
export class DynamicFunctionInTable extends DynamicFunction {
    public static DynamicRequest(tPageName: string, idName: string, tFieldName: string): void {

    }
}

//此class用於定義欄位含有超連結時，需額外帶的get參數
export class UrlQuery {
    UrlInfObj: {//定義各頁面各欄位含有超連結且需有需額外帶的get參數的物件
        [PageName: string]: {//頁面名稱
            [FieldName: string]: {//欄位名稱，需要定義get參數的欄位名稱
                key: {
                    [KeyName: string]: {//get參數的key值(此為超連結目標網址頁面裡的搜尋bar欄位名稱)
                        ValueForFieldName?: string,//Value從該PageName的"欄位名稱"對應的行座標取得
                        ValueForDataIdx?: number,//Value從該PageName的Table對應的"行座標"取得
                        Value?: string//Value固定此值
                        ValueById?: string,//從DOM物件取得value
                        ValueByName?: string,//從DOM物件(radio)取得value
                    }//Value取得優先順序從上述定義上到下，都沒有則空字串
                },
                RowTitleEx?: {//此欄位的某行行標題(line data 第一個值)所帶的值另外定義
                    [RowTitle: string]: {//此RowTitle另外定義Get參數
                        key: {
                            [KeyName: string]: {//get參數的key值(此為超連結目標網址頁面裡的搜尋bar欄位名稱)
                                ValueForFieldName?: string,//Value從該PageName的"欄位名稱"對應的行座標取得
                                ValueForDataIdx?: number,//Value從該PageName的Table對應的"行座標"取得
                                Value?: string//Value固定此值
                                ValueById?: string,//從DOM物件取得value
                                ValueByName?: string,//從DOM物件(radio)取得value
                            }//Value取得優先順序從上述定義上到下，都沒有則空字串
                        },
                        Url?: string//URL,若沒有則以傳入Function的參數為主
                    }
                },
                Url?: string,//URL
            }
        }
    } = {};
    constructor() {
        let Now = new Date();//當下時間
        let Before = new Date(Now.setDate(Now.getDate() - 1));//前一天時間
        let NowMonth = paddingLeft((Before.getMonth() + 1).toString(), 2);//前一天月份，補零
        let NowDay = paddingLeft(Before.getDate().toString(), 2);//前一天日期，捕零
        let Year = Before.getFullYear().toString();//前一天年分
        let Month = (Before.getMonth() + 1).toString();//前一天月份

        this.UrlInfObj = {
            MainIO: {
                'Input': {
                    key: {
                        報表類型: {
                            ValueByName: 'tabset'
                        },
                        年度: {
                            ValueById: 'field_0'
                        },
                        月份: {
                            ValueById: 'field_1'
                        },
                        週From: {
                            ValueById: 'field_2'
                        },
                        週To: {
                            ValueById: 'field_2'
                        },
                        BU: {
                            ValueForDataIdx: 0
                        },
                    },
                    RowTitleEx: {
                        'DS': {
                            key: {
                                報表類型: {
                                    ValueByName: 'tabset'
                                },
                                年度: {
                                    ValueById: 'field_0'
                                },
                                月份: {
                                    ValueById: 'field_1'
                                },
                                週From: {
                                    ValueById: 'field_2'
                                },
                                週To: {
                                    ValueById: 'field_2'
                                },
                            },
                            Url: 'http://192.168.5.141:83/SEMI/Default/DSPurchases'
                        }
                    },
                    Url: 'http://192.168.5.141:83/SEMI/Default/Purchases'
                },
                'Output': {
                    key: {
                        報表類型: {
                            ValueByName: 'tabset'
                        },
                        年度: {
                            ValueById: 'field_0'
                        },
                        月份: {
                            ValueById: 'field_1'
                        },
                        週From: {
                            ValueById: 'field_2'
                        },
                        週To: {
                            ValueById: 'field_2'
                        },
                        BU: {
                            ValueForDataIdx: 0
                        },
                    },
                    RowTitleEx: {
                        'DS': {
                            key: {
                                報表類型: {
                                    ValueByName: 'tabset'
                                },
                                年度: {
                                    ValueById: 'field_0'
                                },
                                月份: {
                                    ValueById: 'field_1'
                                },
                                週From: {
                                    ValueById: 'field_2'
                                },
                                週To: {
                                    ValueById: 'field_2'
                                },
                            },
                            Url: 'http://192.168.5.141:83/SEMI/Default/DSShipment'
                        }
                    },
                    Url: 'http://192.168.5.141:83/SEMI/Default/Shipment'
                },
            },
            MainFCNSB: {
                'Customer': {
                    key: {
                        報表類型: {
                            ValueByName: 'tabset'
                        },
                        年度: {
                            ValueById: 'field_0'
                        },
                        月份: {
                            ValueById: 'field_1'
                        },
                        週: {
                            ValueById: 'field_2'
                        },
                        客戶: {
                            ValueForDataIdx: 0
                        },
                    },
                    Url: 'http://192.168.5.141:83/TestPPI/tmp/Default/FocusCustomer'
                },
            },
            NSBPL: {
                '年': {
                    key: {
                        年度: {
                            ValueById: 'field_0'
                        },
                        BU: {
                            ValueForDataIdx: 0
                        },
                    },
                    RowTitleEx: {
                        DS: {
                            key: {
                                年度: {
                                    ValueById: 'field_0'
                                },
                            },
                            Url: 'http://192.168.5.141:83/DS/Default/APFCST'
                        }
                    },
                    Url: 'http://192.168.5.141:83/TR/Default/APFCSTChart'
                },
                '月': {
                    key: {
                        年度: {
                            ValueById: 'field_0'
                        },
                        月份: {
                            ValueById: 'field_1'
                        },
                        BU: {
                            ValueForDataIdx: 0
                        },
                    },
                    RowTitleEx: {
                        DS: {
                            key: {
                                年度: {
                                    ValueById: 'field_0'
                                },
                                月份: {
                                    ValueById: 'field_1'
                                },
                            },
                            Url: 'http://192.168.5.141:83/DS/Default/BillingFCST'
                        }
                    },
                    Url: 'http://192.168.5.141:83/TR/Default/BillingFCSTChart'
                },
            },
            FocusIO: {
                'Input': {
                    key: {
                        報表類型: {
                            ValueByName: 'tabset'
                        },
                        年度: {
                            ValueById: 'field_0'
                        },
                        月份: {
                            ValueById: 'field_1'
                        },
                        週From: {
                            ValueById: 'field_2'
                        },
                        週To: {
                            ValueById: 'field_2'
                        },
                        客戶: {
                            ValueById: 'field_3'
                        },
                        BU: {
                            ValueForDataIdx: 0
                        },
                    },
                    RowTitleEx: {
                        'DS': {
                            key: {
                                報表類型: {
                                    ValueByName: 'tabset'
                                },
                                年度: {
                                    ValueById: 'field_0'
                                },
                                月份: {
                                    ValueById: 'field_1'
                                },
                                週From: {
                                    ValueById: 'field_2'
                                },
                                週To: {
                                    ValueById: 'field_2'
                                },
                                客戶: {
                                    ValueById: 'field_3'
                                },
                            },
                            Url: 'http://192.168.5.141:83/SEMI/Default/DSPurchases'
                        }
                    },
                    Url: 'http://192.168.5.141:83/SEMI/Default/Purchases'
                },
                'Output': {
                    key: {
                        報表類型: {
                            ValueByName: 'tabset'
                        },
                        年度: {
                            ValueById: 'field_0'
                        },
                        月份: {
                            ValueById: 'field_1'
                        },
                        週From: {
                            ValueById: 'field_2'
                        },
                        週To: {
                            ValueById: 'field_2'
                        },
                        客戶: {
                            ValueById: 'field_3'
                        },
                        BU: {
                            ValueForDataIdx: 0
                        },
                    },
                    RowTitleEx: {
                        'DS': {
                            key: {
                                報表類型: {
                                    ValueByName: 'tabset'
                                },
                                年度: {
                                    ValueById: 'field_0'
                                },
                                月份: {
                                    ValueById: 'field_1'
                                },
                                週From: {
                                    ValueById: 'field_2'
                                },
                                週To: {
                                    ValueById: 'field_2'
                                },
                                客戶: {
                                    ValueById: 'field_3'
                                },
                            },
                            Url: 'http://192.168.5.141:83/SEMI/Default/DSShipment'
                        }
                    },
                    Url: 'http://192.168.5.141:83/SEMI/Default/Shipment'
                },
            },
        }
    }

    //取得的Value需要經過額外運算
    //tPageName: 頁面名稱
    //tFieldName: 含有超連結的欄位名稱
    //KeyName: 參數名稱
    //tValue: value值
    TransFromValue(tPageName: string, tFieldName: string, tKeyName: string, tValue: string): string {
        if ((tPageName == 'MainIO' || tPageName == 'FocusIO') && (tFieldName == 'Input' || tFieldName == 'Output') && tKeyName == '週From') {
            let tDateTime = new Date(tValue);
            let LastDate = new Date(tDateTime.getTime() - 7 * 24 * 60 * 60 * 1000);
            tValue = LastDate.getFullYear() + '/' + paddingLeft((LastDate.getMonth() + 1).toString(), 2) + '/' + paddingLeft((LastDate.getDate()).toString(), 2);
        }
        else if ((tPageName == 'MainIO' || tPageName == 'FocusIO') && (tFieldName == 'Input' || tFieldName == 'Output') && tKeyName == '週To') {
            let tDateTime = new Date(tValue);
            let LastDate = new Date(tDateTime.getTime() - 1 * 24 * 60 * 60 * 1000);
            tValue = LastDate.getFullYear() + '/' + paddingLeft((LastDate.getMonth() + 1).toString(), 2) + '/' + paddingLeft((LastDate.getDate()).toString(), 2);
        }
        else if (tPageName == 'FocusIO' && (tFieldName == 'Input' || tFieldName == 'Output') && tKeyName == '客戶') {
            tValue = (MenuList['FocusCustomerNSBTitle'].MenuArr.find(function (value) {
                return value.split(',')[1] == tValue;
            }) || '').split(',')[0];
        }

        return tValue;
    }

    //判斷此cell是否需要設定url get value參數
    //tPageName: 頁面名稱
    //tFieldName: 此cell的欄位名稱
    NeedSetKeyValue(tPageName: string, tFieldName: string): boolean {
        return this.UrlInfObj[tPageName] && this.UrlInfObj[tPageName][tFieldName] ? true : false;
    }

    //根據定義回傳此cell的含get參數的Url字串
    //Url: 超連結網址
    //tPageName: 頁面名稱
    //tFieldName: 此cell的欄位名稱
    //tRowTitle: 此cell的行標題(line data的第一個值)
    //LineData: 此cell所在的line data全部值
    GetUrl(Url: string, tPageName: string, tFieldName: string, tRowTitle: string, LineData: string[]): string {
        let reUrlStr = '';

        if (this.NeedSetKeyValue(tPageName, tFieldName)) {
            let first = true;
            let tUrl: string = Url;

            //處理[FieldName: string]有RowTitleEx的例外規則
            if (this.UrlInfObj[tPageName] && this.UrlInfObj[tPageName][tFieldName] && this.UrlInfObj[tPageName][tFieldName].RowTitleEx && this.UrlInfObj[tPageName][tFieldName].RowTitleEx![tRowTitle] != null) {
                tUrl = this.UrlInfObj[tPageName][tFieldName].RowTitleEx![tRowTitle].Url ? this.UrlInfObj[tPageName][tFieldName].RowTitleEx![tRowTitle].Url! : tUrl;
                for (let KeyName in this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key) {
                    let tKeyStr: string = KeyName;
                    let tValueStr: string = '';
                    if (this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueForFieldName != null) {
                        let tIdx = gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf(this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueForFieldName!);
                        tValueStr = LineData[tIdx];
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueForDataIdx != null && this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueForDataIdx! < LineData.length) {
                        tValueStr = LineData[this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueForDataIdx!];
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].Value != null) {
                        tValueStr = this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].Value!;
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueById != null && document.getElementById(this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueById!)) {
                        let tmpDom = $('#' + this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueById!);
                        let tmpValue: any = tmpDom.val();
                        if (tmpDom.find('input').val() != null) {
                            tmpValue = tmpDom.find('input').val();
                        }
                        else if (tmpDom.is(':checkbox')) {
                            tmpValue = tmpDom.is(':checked').toString();
                        }
                        else if (toType(tmpValue) == 'array') {
                            if (tmpValue[0] == '') { tmpValue = ''; }//多選若只要選到All，則直接All
                            else { tmpValue = tmpValue.join('@'); }
                        }
                        tValueStr = tmpValue;
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueByName != null) {
                        tValueStr = ($('input[name="' + this.UrlInfObj[tPageName]![tFieldName]!.RowTitleEx![tRowTitle].key[KeyName].ValueByName + '"]:checked') as any).val();
                    }

                    tValueStr = this.TransFromValue(tPageName, tFieldName, KeyName, tValueStr);
                    if (!first) {
                        reUrlStr += '&';
                    }
                    first = false;
                    reUrlStr += encodeURI(tKeyStr + '=' + tValueStr);
                }
            }
            else {
                tUrl = this.UrlInfObj[tPageName]![tFieldName]!.Url ? this.UrlInfObj[tPageName]![tFieldName]!.Url! : tUrl;
                for (let KeyName in this.UrlInfObj[tPageName]![tFieldName]!.key) {
                    let tKeyStr: string = KeyName;
                    let tValueStr: string = '';

                    if (this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueForFieldName != null) {
                        let tIdx = gPageObj.PageNameObj[tPageName].TitleStrArr.indexOf(this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueForFieldName!);
                        tValueStr = LineData[tIdx];
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueForDataIdx != null && this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueForDataIdx! < LineData.length) {
                        tValueStr = LineData[this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueForDataIdx!];
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].Value != null) {
                        tValueStr = this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].Value!;
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueById != null && document.getElementById(this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueById!)) {
                        let tmpDom = $('#' + this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueById!);
                        let tmpValue: any = tmpDom.val();
                        if (tmpDom.find('input').val() != null) {
                            tmpValue = tmpDom.find('input').val();
                        }
                        else if (tmpDom.is(':checkbox')) {
                            tmpValue = tmpDom.is(':checked').toString();
                        }
                        else if (toType(tmpValue) == 'array') {
                            if (tmpValue[0] == '') { tmpValue = ''; }//多選若只要選到All，則直接All
                            else { tmpValue = tmpValue.join('@'); }
                        }
                        tValueStr = tmpValue;
                    }
                    else if (this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueByName != null) {
                        tValueStr = ($('input[name="' + this.UrlInfObj[tPageName]![tFieldName]!.key[KeyName].ValueByName + '"]:checked') as any).val();
                    }

                    tValueStr = this.TransFromValue(tPageName, tFieldName, KeyName, tValueStr);
                    if (!first) {
                        reUrlStr += '&';
                    }
                    first = false;
                    reUrlStr += encodeURI(tKeyStr + '=' + tValueStr);
                }
            }

            return tUrl + '?' + reUrlStr;
        }

        return reUrlStr;
    }
}

export class TableExtend {
    TableExtendObj: {
        [PageName: string]: {//頁面名稱
            [RowIdx: number]: {//行座標(對應原Data座標)
                SubIdx: number[],//Sub Node 行座標(對應原Data座標)
                SubHtml: string//Table Html，此RowIdx隱藏展開的html
            }
        }
    } = {};
    constructor() {
        this.TableExtendObj = {
            Prober_Handler_CPLCD: {
                6: {//Extend Node Idx
                    SubIdx: [7],//Sub Node Idx
                    SubHtml: ''//Table Html
                },
                11: {
                    SubIdx: [12],//Sub Node Idx
                    SubHtml: ''//Table Html
                },
                17: {
                    SubIdx: [18, 19, 20, 21],//Sub Node Idx
                    SubHtml: ''//Table Html
                }
            },
            Prober_Handler_FT: {
                8: {
                    SubIdx: [9, 10, 11],//Sub Node Idx
                    SubHtml: ''//Table Html
                },
                20: {
                    SubIdx: [21, 22, 23, 24],//Sub Node Idx
                    SubHtml: ''//Table Html
                }
            },
            Prober_Handler_LBI: {
                6: {
                    SubIdx: [7, 8],//Sub Node Idx
                    SubHtml: ''//Table Html
                },
                17: {
                    SubIdx: [18, 19, 20, 21],//Sub Node Idx
                    SubHtml: ''//Table Html
                }
            }
        }
    }
    SetExtendTable(tPageName: string, TableId: string) {
        let tTable = $('#' + TableId + ' tbody');
        if (this.TableExtendObj[tPageName] != null) {
            let tIdxArr = [];
            let OriIdx = [];
            let HtmlArr = [];
            for (let kIdx in this.TableExtendObj[tPageName]) {
                OriIdx.push(kIdx);
                let tTrStr = '';
                for (let i = 0; i < this.TableExtendObj[tPageName][kIdx].SubIdx.length; i++) {
                    let tmpTrHtml = tTable.find('tr').eq(this.TableExtendObj[tPageName][kIdx].SubIdx[i]).html();
                    tTrStr += '<tr>' + tmpTrHtml + '</tr>';
                    tIdxArr.push(this.TableExtendObj[tPageName][kIdx].SubIdx[i]);
                }
                tTrStr = '<table style="width:100%;word-break:break-all;">' + tTrStr + '</table>';
                HtmlArr.push(tTrStr);
                this.TableExtendObj[tPageName][kIdx].SubHtml = tTrStr;
                tTable.find('tr').eq(+kIdx).find('td').eq(0).addClass('details-control');
                tTable.find('tr').eq(+kIdx).find('td').eq(0).html(tTable.find('tr').eq(+kIdx).find('td').eq(0).html() + '▼');
                tTable.find('tr').eq(+kIdx).find('td').eq(0).css('cursor', 'pointer');
            }

            tIdxArr.sort((a, b) => b - a);
            for (let i = 0; i < tIdxArr.length; i++) {
                tTable.find('tr').eq(tIdxArr[i]).hide();
            }

            let tRow = $('#' + TableId + '>tbody>tr td');
            $('#' + TableId + '_wrapper .dataTables_scrollHead table').css('width', '100%');
        }
    }
}

window.DynamicFunction = DynamicFunction;