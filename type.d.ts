interface Window {
    PageOperation: typeof import("./PageInit")["PageOperation"];
    DynamicFunction: typeof import("./set")["DynamicFunction"];
    PPMake: typeof import("./PPI")["PPMake"];
    PageTool: typeof import("./PageInit")["PageTool"];
}

interface JQuery {
    datetimepicker(input: any): any;
}

type TableSetObj = {//內容值填入欄位名稱
    MoneyFieldArr: string[],//需要千分位表示數字的欄位名稱
    NeedModifyDisplayArr: string[],//需要將顯示的值做特別修改
    MillionFieldArr: string[],//需要轉百萬的欄位
    IgnoreZero: string[],//若是0，可忽略的欄位
    SetRight: string[],//欄位需要置右的欄位名稱
    DatePickerArr: string[],//日期選單
    TextAreaArr: string[],//需要textarea的欄位名稱
    CheckboxArr: string[],//需要checkbox的欄位名稱
}

type PageSetObj = {//內容值填入頁面名稱
    noDeletePage: string[],//不需要刪除功能的頁面
    noSortPage: string[],//不需要排序的頁面
    noInSearchingPage: string[],//不需要表格內搜尋的頁面
    noPage: string[],//不需要分頁的頁面
    ChartPage: string[],//需要圖表的頁面
    NoChangePage: string[],//不需要運行替換顯示欄位的機制的頁面
    NeedYScroll: string[],//需要Y軸滾輪的頁面
    NeedDataTableFreeze: string[],//合併儲存格，需要使用DataTable的凍結欄位渲染
    NeedResetFieldArr: string[],//需要重新定義欄位名稱(一開始後端傳過來的欄位名稱是搜尋欄位)
    NeedCheckDecimalPoint: string[],//需要檢查百分比小數幾位數
    noDataTable: string[],//不需要DataTable渲染
    NeedMillionInf: string[],//需要百萬訊息標示的頁面
    NeedExport: string[],//需要匯出的頁面
    NoDefaultSearch: string[],//頁面載入時不預設搜尋
    TableNeedDefer: string[],//datatable.js需要設定延遲載入
}

interface PageStatus {
    PageNameArr: Array<string>;//儲存這個頁面所有出現的PageName
    PageNameObj: PageObj;//儲存這個頁面所有出現的PageName的PageInf
}

interface PageObj {//key:PageName,value:PageInf
    [PageName: string]: PageInf;
}

//Dashboard基礎的頁面搜尋
abstract class Search {
    //搜尋接口(函式實例化是因為此函式是網頁上會值接觸發的功能)
    //tPageName: 頁面名稱
    //JumPage: 搜尋後顯是第幾頁
    static Search: (tPageName?: string, JumPage?: number) => void;
}

//Dashboard頁面中，表單上欄位的點擊搜尋
abstract class ClickSearch {
    //點擊搜尋接口(函式實例化是因為此函式是網頁上會值接觸發的功能)
    //tPageName: 頁面名稱
    //qyStr: 點擊搜尋的搜尋Query
    static ClickSearch: (tPageName: string, qyStr: string[]) => void;
}

//Dashboard頁面中，區塊搜尋
abstract class PartPageSearch {
    //整個頁面的搜尋，用於依序呼叫每個Block的搜尋
    static PageSearch: () => void;

    //單一區塊的搜尋
    //tPageName: 頁面名稱(區塊名稱)
    BlockSearch: (tPageName: string) => void;

    //定義子Block的需要呼叫的函式，一般會再呼叫Table、Chart的建置
    //tPageName: 頁面名稱(區塊名稱)
    //data: Block搜尋取得的回傳數據
    SubBlockRouter: (tPageName: string, data: string[]) => void;
}

//表單操作，部分操作是以Table.js為前提
abstract class TableOperation {
    //更新接口(函式實例化是因為此函式是網頁上會值接觸發的功能)
    //tPageName: 頁面名稱
    //isAsync: 更新的Ajax是否異步
    static UpdateSubmit: (tPageName?: string, isAsync?: boolean) => void;

    //檢視、編輯模式切換(函式實例化是因為此函式是網頁上會值接觸發的功能)
    //isClick: 是否為Button觸發
    //tPageName: 頁面名稱
    static CheckReadWriteMode: (isClick: boolean, tPageName?: string) => void;

    //新增欄位時，取得各欄位的InnerHtml的陣列
    //tPageName: 頁面名稱
    static AddRowInitList: (tPageName: string) => string[];

    //刪除接口
    //RowId: 該行DOM ID(tr的id)
    DeleteBtn: (RowId: string) => void;

    //取消修改
    //tPageName: 頁面名稱
    static ReSetWrite: (tPageName?: string) => void;

    //數據重載
    //tPageName: 頁面名稱
    static ReloadData: (tPageName?: string) => void;
}

//頁面渲染
interface PageRender {
    //Table Form的Title的字串 <DomName></DomName>
    //tPageName: 頁面名稱
    //DomName: Dom物件標籤，如thead
    //ExtraFieldArr: 額外需加入的Title
    //TitleArr: Table Form的標題陣列
    CreatTableTitle: (tPageName: string, DomName: string, ExtraFieldArr: Array<string>, TitleArr: Array<Array<string>>) => string;

    //Table Form的Html Dom字串 <table></table>
    //tPageName: 頁面名稱
    //data: Table內容陣列，行數據的每一欄位以','分隔
    //AttributeStr: Table Dom物件的屬性，如class、style等
    //TitleArr: Table Form的Title陣列
    CreatReadWriteTable: (tPageName: string, data: Array<string>, AttributeStr: string, TitleArr: Array<Array<string>>) => string;

    //定義dom物件的style屬性
    //tPageName: 頁面名稱
    //InputFieldName: 此DOM物件的欄位名稱
    //StyleAttr: 除了width其他的Style屬性
    MakeWidthAttributeStr: (tPageName: string, InputFieldName: string, StyleAttr: string, tMode: 'Read' | 'Write' | 'Search') => string;

    //製作選單DOM物件
    //Dom: Dom物件種類，如 select、Multi Select、Calendar
    //AttributeStr: 需額外定義的Dom物件屬性
    //ValueArr: 選單內容陣列
    //SelectValue: 選單預設值
    MakeListHtml: (Dom: string, AttributeStr: string, ValueArr: string[], SelectValue?: string) => string;

    //製作Select Option Html
    //ValueArr: 選單內容陣列
    //SelectValue: 選單預設值
    MakeOptionHtml: (ValueArr: string[], SelectValue?: string) => string;

    //圖表渲染
    //tPageName: 頁面名稱
    //data: 圖表數據陣列
    //IdName: 圖表渲染的Dom ID
    MakeChart: (tPageName: string, data: string[], IdName?: string) => void;

    //搜尋欄位渲染
    //tPageName: 頁面名稱
    //IdName: 搜尋欄位渲染的Dom ID
    InitSearchArea: (tPageName: string, IdName?: string) => void;
}

interface BlockReport extends PageRender {
    //Table Form表單繪製並輸出至innerHtml
    //tPageName: 頁面名稱(區塊名稱)
    //IdName: Dom物件ID(目標InnHtml)
    //data: Block搜尋取得的回傳數據
    TableReport: (tPageName: string, IdName: string, data: string[]) => void;

    //Chart圖表繪製並輸出至innHtml
    //tPageName: 頁面名稱(區塊名稱)
    //IdName: Dom物件ID(目標InnHtml)
    //data: Block搜尋取得的回傳數據
    ChartReport: (tPageName: string, IdName: string, data: string[]) => void;
}