interface Window {
    PageOperation: typeof import("./PageInit")["PageOperation"];
    DynamicFunction: typeof import("./set")["DynamicFunction"];
    PPMake: typeof import("./PPI")["PPMake"];
    PPSearch: typeof import("./PPI")["PPSearch"];
    PageTool: typeof import("./PageInit")["PageTool"];
}

interface JQuery {
    datetimepicker(input: any): any;
}

/**內容值填入欄位名稱 */
type TableSetObj = {
    /**需要千分位表示數字的欄位名稱 */
    MoneyFieldArr: string[],
    /**需要將顯示的值做特別修改 */
    NeedModifyDisplayArr: string[],
    /**需要轉百萬的欄位 */
    MillionFieldArr: string[],
    /**若是0，可忽略的欄位 */
    IgnoreZero: string[],
    /**欄位需要置右的欄位名稱 */
    SetRight: string[],
    /**日期選單 */
    DatePickerArr: string[],
    /**需要textarea的欄位名稱 */
    TextAreaArr: string[],
    /**需要checkbox的欄位名稱 */
    CheckboxArr: string[],
}

/**內容值填入頁面名稱 */
type PageSetObj = {
    /**不需要刪除功能的頁面 */
    noDeletePage: string[],
    /**不需要排序的頁面 */
    noSortPage: string[],
    /**不需要表格內搜尋的頁面 */
    noInSearchingPage: string[],
    /**不需要分頁的頁面 */
    noPage: string[],
    /**需要圖表的頁面 */
    ChartPage: string[],
    /**不需要運行替換顯示欄位的機制的頁面 */
    NoChangePage: string[],
    /**需要Y軸滾輪的頁面 */
    NeedYScroll: string[],
    /**合併儲存格，需要使用DataTable的凍結欄位渲染 */
    NeedDataTableFreeze: string[],
    /**需要重新定義欄位名稱(一開始後端傳過來的欄位名稱是搜尋欄位) */
    NeedResetFieldArr: string[],
    /**需要檢查百分比小數幾位數 */
    NeedCheckDecimalPoint: string[],
    /**不需要DataTable渲染 */
    noDataTable: string[],
    /**需要百萬訊息標示的頁面 */
    NeedMillionInf: string[],
    /**需要匯出的頁面 */
    NeedExport: string[],
    /**頁面載入時不預設搜尋 */
    NoDefaultSearch: string[],
    /**datatable.js需要設定延遲載入 */
    TableNeedDefer: string[],
}

/**MenuBar物件 */
type MenuObj = {
    /**順序 */
    [Order: number]: {
        /**顯示名稱 */
        MenuName: string,
        /**連結 */
        URL: string,
        /**是否有權限 */
        CanUse: boolean,
        /**子Menu */
        Child: MenuObj
    }
}

interface PageStatus {
    /**儲存這個頁面所有出現的PageName */
    PageNameArr: Array<string>;
    /**儲存這個頁面所有出現的PageName的PageInf */
    PageNameObj: PageObj;
}

/**key:PageName,value:PageInf */
interface PageObj {
    [PageName: string]: PageInf;
}

/**Dashboard基礎的頁面搜尋 */
abstract class Search {
    /**搜尋接口(函式實例化是因為此函式是網頁上會值接觸發的功能)
     * @param {string} tPageName 頁面名稱
     * @param {string} JumPage 搜尋後顯是第幾頁
     */
    static Search: (tPageName?: string, JumPage?: number) => void;
}

/**Dashboard頁面中，表單上欄位的點擊搜尋 */
abstract class ClickSearch {
    /**點擊搜尋接口(函式實例化是因為此函式是網頁上會值接觸發的功能)
     * @param {string} tPageName 頁面名稱
     * @param {string[]} qyStr 點擊搜尋的搜尋Query
     */
    static ClickSearch: (tPageName: string, qyStr: string[]) => void;
}

/**Dashboard頁面中，區塊搜尋 */
abstract class PartPageSearch {
    /**整個頁面的搜尋，用於依序呼叫每個Block的搜尋 */
    static PageSearch: () => void;

    /**單一區塊的搜尋
     * @param {string} tPageName 頁面名稱
     */
    BlockSearch: (tPageName: string) => void;

    /**定義子Block的需要呼叫的函式，一般會再呼叫Table、Chart的建置
     * @param {string} tPageName 頁面名稱
     * @param {string[]} data Block搜尋取得的回傳數據
     */
    SubBlockRouter: (tPageName: string, data: string[]) => void;
}

/**表單操作，部分操作是以Table.js為前提 */
abstract class TableOperation {
    /**更新接口(函式實例化是因為此函式是網頁上會值接觸發的功能)
     * @param {string} tPageName 頁面名稱
     * @param {boolean} isAsync 更新的Ajax是否異步
     */
    static UpdateSubmit: (tPageName?: string, isAsync?: boolean) => void;

    /**檢視、編輯模式切換(函式實例化是因為此函式是網頁上會值接觸發的功能)
     * @param {boolean} isClick 是否為Button觸發
     * @param {string} tPageName 頁面名稱
     */
    static CheckReadWriteMode: (isClick: boolean, tPageName?: string) => void;

    /**新增欄位時，取得各欄位的InnerHtml的陣列
     * @param {string} tPageName 頁面名稱
     * @return {string[]} 回傳html串列(一行)
     */
    static AddRowInitList: (tPageName: string) => string[];

    /**刪除接口
     * @param {string} RowId 該行DOM ID(tr的id)
     */
    DeleteBtn: (RowId: string) => void;

    /**取消修改
     * @param {string} tPageName 頁面名稱
     */
    static ReSetWrite: (tPageName?: string) => void;

    /**數據重載
     * @param {string} tPageName 頁面名稱
     */
    static ReloadData: (tPageName?: string) => void;
}

/**頁面渲染 */
interface PageRender {
    /**Table Form的Title的字串 <DomName></DomName>
     * @param {string} tPageName 頁面名稱
     * @param {string} DomName Dom物件標籤，如thead
     * @param {Array<string>} ExtraFieldArr 額外需加入的Title
     * @param {Array<Array<string>>} tPageName Title欄位名稱二維陣列
     */
    CreatTableTitle: (tPageName: string, DomName: string, ExtraFieldArr: Array<string>, TitleArr: Array<Array<string>>) => string;

    //Table Form的Html Dom字串 <table></table>
    //tPageName: 頁面名稱
    //data: Table內容陣列，行數據的每一欄位以','分隔
    //AttributeStr: Table Dom物件的屬性，如class、style等
    //TitleArr: Table Form的Title陣列
    /**Table Form的Html Dom字串 <table></table>
     * @param {string} tPageName 頁面名稱
     * @param {Array<string> | { [key: string]: string }[]} data Table內容陣列，行數據的每一欄位以','分隔
     * @param {string} AttributeStr Table 需額外附帶的屬性(需完整字串，如 'class="abc" style="display:none"')
     * @param {Array<Array<string>>} TitleArr Title呈現
     */
    CreatReadWriteTable: (tPageName: string, data: Array<string>, AttributeStr: string, TitleArr: Array<Array<string>>) => string;

    /**定義dom物件的style屬性
     * @param {string} tPageName 頁面名稱
     * @param {string} InputFieldName 此DOM物件的欄位名稱
     * @param {string} StyleAttr 除了width其他的Style屬性
     * @param {'Read' | 'Write' | 'Search'} tMode 呼叫此funtion是來自什麼操作
     * @return 回傳style屬性(字串包含style="")
     */
    MakeWidthAttributeStr: (tPageName: string, InputFieldName: string, StyleAttr: string, tMode: 'Read' | 'Write' | 'Search') => string;

    /**製作選單DOM物件
     * @param {string} Dom Dom物件種類，如 select、Multi Select、Calendar
     * @param {string} AttributeStr 需額外定義的Dom物件屬性
     * @param {string[]} ValueArr 選單內容陣列
     * @param {string} SelectValue 選單預設值
     * @return 回傳select的html
     */
    MakeListHtml: (Dom: string, AttributeStr: string, ValueArr: string[], SelectValue?: string) => string;

    /**製作Select Option Html
     * @param {string[]} ValueArr 選單內容陣列
     * @param {string} SelectValue 選單預設值
     * @return {string} 回傳 select dom的innerHtml
     */
    MakeOptionHtml: (ValueArr: string[], SelectValue?: string) => string;

    /**圖表渲染
     * @param {string} tPageName 頁面名稱
     * @param {string[]} data 圖表數據陣列
     * @param {string} IdName 圖表渲染的Dom ID
     */
    MakeChart: (tPageName: string, data: string[], IdName?: string) => void;

    /**搜尋欄位渲染
     * @param {string} tPageName 頁面名稱
     * @param {string} IdName 搜尋欄位渲染的Dom ID
     */
    InitSearchArea: (tPageName: string, IdName?: string) => void;
}

interface BlockReport extends PageRender {
    /**Table Form表單繪製並輸出至innerHtml
     * @param {string} tPageName 頁面名稱
     * @param {string} IdName Dom物件ID(目標InnHtml)
     * @param {string[]} data Block搜尋取得的回傳數據
     */
    TableReport: (tPageName: string, IdName: string, data: string[]) => void;

    /**Chart圖表繪製並輸出至innHtml
     * @param {string} tPageName 頁面名稱
     * @param {string} IdName Dom物件ID(目標InnHtml)
     * @param {string[]} data Block搜尋取得的回傳數據
     */
    ChartReport: (tPageName: string, IdName: string, data: string[]) => void;
}