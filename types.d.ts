/**
 * 存放這次搜尋的文本(用於檢查相似度)
 */
declare var CheckArr: any;

/**
 * 儲存那些頁面名稱需要紀錄Ajax執行狀態
 */
declare var NeedAjaxArr: any;

/**
 * 用來記錄新增的筆數(負值是用來與Table的行數做區分)
 */
declare var AddLineCount: any;

/**
 * 初始化表單屬性
 * @param tFormName - 表單名稱
 * @param tFieldArr - 欄位名稱(來自ID="FieldName"的DOM InnerHtml)
 * @param tNecessaryArr - 是否必填(來自ID="Necessary"的DOM InnerHtml)
 * @param tModifiableArr - 可否修改
 */
declare class FormInf {
    constructor(tFormName: string, tFieldArr: string[], tNecessaryArr: (boolean | number | string)[], tModifiableArr: (boolean | number | string)[]);
    /**
     * 欄位名稱
     */
    FieldArr: any;
    /**
     * Table顯示的欄位名稱(多重欄位會降維一維陣列儲存)
     */
    TitleStrArr: any;
    /**
     * 紀錄多重欄位(真實的欄位型態)
     */
    TitleCell: any;
    /**
     * 是否必填
     */
    NecessaryArr: any;
    /**
     * 可否修改
     */
    ModifiableArr: any;
    /**
     * 這次的搜尋結果
     */
    FullData: any;
    /**
     * 搜尋結果物件的讀取順序(內容值為物件屬性名稱)，此功能應用於Dapper的回傳結果
     */
    FullDataObjOrder: any;
    /**
     * 將Object型別的回傳結果(一行)，轉回string陣列
     * @returns 回傳欄位值組成的陣列
     */
    LineDataObjToArray(LineData: any): string[];
}

declare interface SearchOperation extends Search, ClickSearch {
}

/**
 * 此class定義搜尋模組，因搜尋其中的邏輯流程有些會有客製化設定，固定義於獨立的class，再由PageOperation繼承
 */
declare class SearchOperation implements Search, ClickSearch {
    /**
     * 重設搜尋Query的值(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
    因此程式結構這樣寫，設定的部分統一寫在PageSet)
     * @param tPageName - 頁面名稱
     * @param sQuery - 搜尋Query
     * @returns 回傳重新定義的搜尋陣列
     */
    ResetSearchQuery(tPageName: string, sQuery: string[]): string[];
    /**
     * 重設搜尋Query的值(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
    因此程式結構這樣寫，設定的部分統一寫在PageSet)
     * @param tPageName - 頁面名稱
     * @param Query - 搜尋Query
     * @param data - 搜尋結果陣列(二維)
     * @returns 回傳重新定義的Title
     */
    SetFormTitleFromQuery(tPageName: string, Query: string[], data: string[][]): string;
    /**
     * 修改搜尋結果(由於ResetSearchQuery屬於Search功能系列其中的函式，但因有需要客製化的設定，
    因此程式結構這樣寫，設定的部分統一寫在PageSet)
     * @param tPageName - 頁面名稱
     * @param data - 搜尋結果陣列
     */
    EditSearchResult(tPageName: string, data: string[]): any;
    /**
     * 點擊搜尋觸發的函式(cell欄位或其他)
     * @param tPageName - 頁面名稱
     * @param qyStr - 點擊搜尋的搜尋Query
     */
    static ClickSearch(tPageName: string, qyStr: string[]): void;
    /**
     * 頁面搜尋觸發的函式
     * @param tPageName - 頁面名稱
     * @param JumPage - 搜尋結果指定呈現的頁面
     */
    static Search(tPageName: string, JumPage: number): void;
}

declare interface TableAndSearchOperation extends TableOperation {
}

/**
 * 此class定義表單Table操作模組，繼承SearchOperation及TableOperation
 */
declare class TableAndSearchOperation extends SearchOperation implements TableOperation {
    /**
     * Update Submit
     * @param tPageName - 頁面名稱
     * @param isAsync - AJAX是否異步請求(預設true)
     */
    static UpdateSubmit(tPageName: string, isAsync: boolean): void;
    /**
     * 切換檢視/編輯模式。; 根據現在的編輯模式狀態切換檢視/編輯模式。
     * @param isClick - 是否為Button觸發
     * @param tPageName - 頁面名稱
     */
    static CheckReadWriteMode(isClick: boolean, tPageName: string): void;
    /**
     * 新增欄位時，初始化選單欄位
     * @param tPageName - 頁面名稱
     * @returns 回傳html串列(一行)
     */
    static AddRowInitList(tPageName: string): string[];
    /**
     * 新增欄位時，初始化選單欄位(僅value值，沒有html)
     * @param tPageName - 頁面名稱
     * @returns 欄位初始值串列(一行)
     */
    static AddRowInitValueList(tPageName: string): string[];
    /**
     * 刪除Table某一行
     * @param RowId - 該行DOM ID(tr的id)
     */
    DeleteBtn(RowId: string): void;
    /**
     * 取消修改
     * @param tPageName - 頁面名稱
     */
    static ReSetWrite(tPageName: string): void;
    /**
     * 數據重載(先呼叫後端去除快取的function，再重新搜尋)
     * @param tPageName - 頁面名稱
     */
    static ReloadData(tPageName: string): void;
}

/**
 * 此class定義Page的操作功能
PageName底下操作功能定義於此
 */
declare class PageOperation extends TableAndSearchOperation {
    /**
     * Update點擊觸發的功能。
    此函式還未將Query傳入後端
     * @param tPageName - 頁面名稱
     */
    UpdateClick(tPageName: string): void;
    /**
     * 初始化Menu內容
     */
    InitListArr(): void;
    /**
     * AP定版功能
     * @param tPageName - 頁面名稱
     */
    static VersionSet(tPageName: string): void;
    /**
     * AP、FCST匯入功能
     * @param tPageName - 頁面名稱
     */
    static UploadData(tPageName: string): void;
    /**
     * 有拖拉功能的上傳功能(總經理報表的專案管理)
     * @param tPageName - 頁面名稱
     */
    static UploadData2(tPageName: string): void;
    /**
     * 匯出功能(由後端產生檔案再回傳路徑)
     * @param tPageName - 頁面名稱
     * @param ExportIdName - 觸發此event的匯出button
     */
    static ExportExcel(tPageName: string, ExportIdName: string): void;
    /**
     * LinkToERP功能。目前實作於自有產品
     */
    static LinkToERP(): void;
}

declare interface PageMake extends PageRender {
}

/**
 * 此class用於定義表單渲染相關的函式
 */
declare class PageMake implements PageRender {
    /**
     * 產生Table Html。
    含各欄位的menu選單、檢視/編輯、預設值、動態觸發欄位...等
     * @param tPageName - 頁面名稱
     * @param AttributeStr - Table 需額外附帶的屬性(需完整字串，如 'class="abc" style="display:none"')
     * @param TitleArr - Title呈現
     */
    CreatReadWriteTable(tPageName: string, data: any, AttributeStr: string, TitleArr: string[][]): void;
    /**
     * 建立Table表單的Title欄位的Html
     * @param DomName - 頁面名稱
     * @param tPageName - 表單的id名稱，將此函式定義的html產生致此ID的innerHtml
     * @param ExtraFieldArr - 需要額外建立的欄位名稱，此不存在於FieldArr
     * @param tPageName - Title欄位名稱二維陣列
     */
    CreatTableTitle(DomName: string, tPageName: string[][], ExtraFieldArr: string[], tPageName: string[][]): void;
    /**
     * 定義dom物件的style屬性
     * @param tPageName - 頁面名稱
     * @param InputFieldName - 欄位名稱
     * @param StyleAttr - css定義
     * @param tMode - 呼叫此funtion是來自什麼操作
     * @returns 回傳style屬性(字串包含style="")
     */
    MakeWidthAttributeStr(tPageName: string, InputFieldName: string, StyleAttr: string, tMode: 'Read' | 'Write' | 'Search'): string;
    /**
     * 製作選單DOM物件
     * @param Dom - select/Multi Select/Calendar
     * @param AttributeStr - DOM物件額外的屬性字串
     * @param ValueArr - Menu內容
     * @param SelectValue - Menu預設值
     * @returns 回傳select的html
     */
    MakeListHtml(Dom: string, AttributeStr: string, ValueArr: string[], SelectValue: string): any;
    /**
     * 製作Select Option Html
     * @param ValueArr - Menu內容
     * @param SelectValue - Menu預設值
     * @returns 回傳 select dom的innerHtml
     */
    MakeOptionHtml(ValueArr: string[], SelectValue: string): string;
    /**
     * 產生圖表
     * @param tPageName - 頁面名稱
     */
    MakeChart(tPageName: string, data: any): void;
    /**
     * 初始化搜尋欄位
     * @param tPageName - 頁面名稱
     */
    InitSearchArea(tPageName: string): void;
    /**
     * 動態影響生成Menu(不經後端的Menu)
     * @param tPageName - 頁面名稱
     * @param FieldName - 欄位名稱(因值改變而影響別的欄位)
     * @param FieldId - 搜尋BAR欄位ID(被影響的欄位)
     * @param isSearch - 呼叫此function是否來自搜尋bar初始化
     * @param KeyQuery - 下拉選單的值
     */
    FrontDynamicMenuRequest(tPageName: string, FieldName: string, FieldId: string, isSearch: boolean, KeyQuery: string[] | string): void;
    /**
     * 渲染MenuBar
     * @param NeedCheckRight - 是否需要檢查權限(false僅回傳MenuName不會回傳URL)
     * @param DomId - DOM ID
     * @param PageMode - 用來分辨哪個BU(部份系統才需要)
     */
    IniteMenuBar(NeedCheckRight: boolean, DomId: string, PageMode: string): void;
}

/**
 * 此class用於定義表單圖表相關的簡易工具函式
 */
declare class PageTool {
    /**
     * 有下拉選單的欄位值，將Key值替換成Value值
     * @param tMenuName - MenuName
     * @param keyValue - 需要被替換的原字串
     * @returns 回傳根據Menu值替換後的結果
     */
    GetListValue(tMenuName: string, keyValue: string): string;
    /**
     * 將數據轉換成匯出格式的數據
     * @param tPageName - 頁面名稱
     * @returns 回傳調整過後的數據
     */
    MakeExportData(tPageName: string, tdata: any): string[];
    /**
     * 將Title物件轉換為一維陣列。
    匯出的函式會用
     * @param tPageName - 頁面名稱
     * @param TitleArr - Title的物件
     */
    ObjTitleToStrArr(tPageName: string, TitleArr: string[][]): void;
    /**
     * get傳遞參數設置搜尋條件
     */
    UrlGetVariable(): any;
    /**
     * 修改下拉式選單可否使用
     */
    SelectDisableChange(): void;
    /**
     * 除了指定的搜尋Bar物件ID以外，其餘Menu重新整理
     * @param ExceptforIdArr - 搜尋Bar物件ID
     * @param tPageName - 頁面名稱
     */
    ReloadSelectOption(ExceptforIdArr: string[], tPageName: string): void;
    /**
     * 重新定義搜尋欄位初始值
     * @param DefaultObj - 原來的搜尋Obj Inf.
     * @param UrlObj - 來自Get參數(from URL)的搜尋欄位初始值obj Inf.
     * @returns 回傳重新定義的搜尋預設值物件
     */
    SetDefaultValue(DefaultObj: any, UrlObj: any): any;
}

/**
 * 此class用於定義Part Page Search的搜尋流程。
每個專案的Part Page Search可依各需求重新定義。若有新流程需定義，需從PartPageSearch擴充接口
 */
declare class PPSearch {
    /**
     * 主區塊搜尋的最外部接口
     */
    static PageSearch(): void;
    /**
     * 定義各區塊搜尋的接口
     */
    BlockSearch(): void;
    /**
     * 各搜尋結果處理的router
     */
    SubBlockRouter(): void;
}

/**
 * 此class用於定義個專案的Part Page Search的區塊搜尋後的表單圖表渲染邏輯。
以及定義Part Page Search需要額外的邏輯功能
 */
declare class PPMake {
    /**
     * 檢查搜尋結果的數量，若不足則自動補齊
     * @param data - 原完整搜尋結果陣列
     * @param RowCount - data應該的行數
     */
    CheckDataCount(data: string[], RowCount: number): void;
    /**
     * OEE渲染
     * @param tPageName - 頁面名稱
     * @param idName - 渲染DOM ID
     * @param data - 原完整搜尋結果陣列
     */
    OEEReport(tPageName: string, idName: string, data: string[]): void;
    /**
     * 給合併儲存格後的表格上色(只針對有合併的範圍)
     */
    ColorMergeCell(): void;
    /**
     * 初始化個區塊的搜尋Menu
     * @param tPageName - 頁面名稱
     */
    static InitBlockMenu(tPageName: string): void;
}

/**
 * 下拉式選單資訊物件
 * @example
 * 132134
 */
declare var MenuList: any;

/**
 * 表單內部值需要Click Function的定義
 */
declare var NeedClickObj: any;

/**
 * 紀錄會動態影響其他搜尋欄位的搜尋欄位物件ID
 */
declare var DCMenuIdNameList: any;

/**
 * 存放顏色Highlight規則
 * @example
 * let a: ColorTuleArr = {
     Actual: {
         '8': {
 *                 1: {
 *                     "[3]>120": {
 *                         Color: 'blue',
 *                         BackgroundColor: '',
 *                         Others: {
 *                             'Score': 1
 *                         }
 *                     },
 *                 }
 *             },
 *             -1: { //-1表示全部
 *                 [1]:{},//表該行符合Rule，則該行所有座標Highlight
 *                 [0]:{}//表該列符合Rule，則該列整行Highlight
 *                 //兩個目前效果相同
 *             }
     }
 *     }
 */
declare var ColorRuleArr: ColorRuleArr;

/**
 * 此物件屬性儲存都是欄位名稱
 */
declare var TableSetObj: any;

/**
 * 此物件屬性儲存都是頁面名稱
 */
declare var PageSetObj: any;

/**
 * 月份對應的字串
 */
declare var MonthFormat: any;

/**
 * 年報表對應字串
 */
declare var YearFormat: any;

/**
 * 季報表對應字串
 */
declare var SeasonFormat: any;

/**
 * 此class的函示會隨著不同系統有不同的定義。
需調整if/else，或是覆寫
 */
declare class PageSet {
    /**
     * 重設Menu的InnerHtml值(懶得要求後端維護者修改，故於此重新定義)
     * @param tPageName - 頁面名稱
     */
    ResetMenuDocumentInnerHtml(tPageName: string): void;
    /**
     * 動態給定Menu Bar超連結
     * @param tPageName - 頁面名稱
     */
    SetMaintain(tPageName: string): void;
    /**
     * 定義PageName底下的子PageName，區塊搜尋的各區塊Block Id、Sub Block Id、點擊搜尋的子Table都於此定義
     * @param tPageName - 頁面名稱
     */
    SetChildPageName(tPageName: string): void;
    /**
     * 定義查詢的查詢頁數、查詢的一頁幾筆
     * @param tPageName - 頁面名稱
     * @returns 回傳值[PageNumber, NumberPerAPage]
     */
    DefineSearPageInf(tPageName: string): any;
    /**
     * 定義DataTable的Menu Length
     * @param tPageName - 頁面名稱
     */
    DefineMenuLength(tPageName: string): void;
    /**
     * 初始化可否修改陣列
     * @param tPageName - 頁面名稱
     * @param tPageName - 頁面的欄位名稱陣列
     * @returns 回傳可否修改陣列(對應每個欄位順序)
     */
    InitModifiable(tPageName: string[], tPageName: string[]): any;
    /**
     * 新增欄位時各欄位的預設值(欄位值基本不需要更改的)
     * @param tPageName - 頁面名稱
     * @param tFieldName - 欄位名稱
     * @returns 回傳欄位預設值，若無則空字串
     */
    AddLineDefaultValue(tPageName: string, tFieldName: string): any;
    /**
     * 根據欄位值內容決定各欄位可否修改。此函式用於定義搜尋結果(data)每一行的可否修改
     * @param tPageName - 頁面名稱
     * @param ValueArr - 一行的數據陣列
     * @returns 回傳這一行欄位可否修改串列
     */
    CheckFieldModifiable(tPageName: string, ValueArr: string[]): any;
    /**
     * 取得欄位對應的Menu名稱
     * @param tPageName - 頁面名稱
     * @param fFieldName - 欄位名稱
     * @param isSearch - 是不是搜尋欄位的模式。false表示Table裡的下拉式選單
     */
    GetMenuName(tPageName: string, fFieldName: string, isSearch: boolean): void;
    /**
     * 下拉式,input的篩選器
     * @param tPageName - 頁面名稱
     * @param fFieldName - 欄位名稱
     * @param isSearch - 是不是搜尋欄位的模式。false表示Table裡的下拉式選單
     */
    GetListArr(tPageName: string, fFieldName: string, isSearch: boolean): void;
    /**
     * 產生下拉式的數據陣列(由前端定義下拉式選單)
     * @param tPageName - 頁面名稱
     * @param fListName - Menu名稱
     * @returns 回傳對應Menu名稱的值傳列
     */
    GetList(tPageName: string, fListName: string): any;
    /**
     * 下拉式選單需要額外加選項
     * @param tPageName - 頁面名稱
     * @param fFieldName - 欄位名稱
     * @param isSearch - 呼叫此function是否來自搜尋Bar初始化
     * @param reArr - Menu值串列
     * @returns 回傳修改過的Menu值串列
     */
    GetListTitle(tPageName: string, fFieldName: string, isSearch: boolean, reArr: string): any;
    /**
     * 搜尋欄位的預設值
     * @param tPageName - 頁面名稱
     * @returns 回傳搜尋物件Inf.
     */
    InitSearchObj(tPageName: string): any;
    /**
     * 定義特殊欄位需要有額外的class name(目前實作於Search Bar)
     * @param tPageName - 頁面名稱
     * @param tFieldName - 欄位名稱
     */
    SearchBarClassName(tPageName: string, tFieldName: string): void;
    /**
     * DatePicker的option設定
     * @param tPageName - 頁面名稱
     * @param tFieldName - 需判斷的欄位名稱
     * @returns 回傳客製化後Datepicker的option
     */
    SetDatePick(tPageName: string, tFieldName: string): any;
    /**
     * 定義Table表單的欄位Title
     * @param tPageName - 頁面名稱
     * @param TitleInfArr - 可以是Search回傳的data; 也可以是搜尋Query。因有些PageName的欄位會由TitleInfArr來決定Title
     */
    ResetFieldArr(tPageName: string, TitleInfArr: string): void;
    /**
     * 重設搜尋Query的值(目前實作於ClickSearch裡，由於NeedClickObj物件無法將所有狀況定義出來，因此特殊狀況於此function定義)
     * @param tPageName - 頁面名稱
     * @param sQuery - 搜尋Query
     * @returns 回傳重新定義的搜尋值串列
     */
    ResetSearchQuery(tPageName: string, sQuery: string[]): any;
    /**
     * 修改搜尋結果
     * @param tPageName - 頁面名稱
     * @param data - 搜尋結果
     * @returns 回傳重新定義的搜尋結果串列
     */
    EditSearchResult(tPageName: string, data: string[]): any;
    /**
     * Update()時，修改參數值
     * @param tPageName - 頁面名稱
     * @param data - 修改數據串列
     * @param type - 呼叫此function的模式，新增/更新/刪除
     */
    ResetUpdateQuery(tPageName: string, data: string[], type: 'i' | 'u' | 'd'): void;
    /**
     * 根據URL參數重新設定搜尋欄位的顯示狀態
     * @param DefaultObj - 原來的搜尋參數物件
     * @param UrlObj - URL參數物件(已解碼)
     * @returns 回傳重新定義的搜尋預設值物件
     */
    ResetSearchDisplayFromURL(DefaultObj: any, UrlObj: any): any;
    /**
     * 建立需要客製化Title的頁面(合併儲存格格式，例:['BU', 'BU']表BU左右兩格合併為一格)
     * @param tPageName - 頁面名稱
     * @returns 回傳重新定義的客製化Title
     */
    MakeTableTitle(TitleInfArr: any, tPageName: string): any;
    /**
     * 檢查需要被屏蔽的列
     * @param tPageName - 頁面名稱
     * @returns 回傳定義的是否有被屏蔽串列(索引值對應欄位順序)
     */
    NeedShieldField(tPageName: string): any;
    /**
     * 檢查需要被屏蔽的行
     * @param tPageName - 頁面名稱
     * @param data - 數據(搜尋結果)
     * @returns 回傳有被屏蔽的索引值(行座標)
     */
    NeedShieldRank(tPageName: string, data: string[]): any;
    /**
     * 建立input的寬度篩選器
     * @param tPageName - 頁面名稱
     * @param InputFieldName - 欄位名稱
     * @param tMode - 呼叫此function來自哪個模式，檢視/編輯/搜尋
     */
    MakeWidth(tPageName: string, InputFieldName: string, tMode: 'Read' | 'Write' | 'Search'): void;
    /**
     * 定義圖表的option
     * @param tPageName - 頁面名稱
     */
    ChartsOption(tPageName: string, data: any): void;
    /**
     * 定義凍結欄位(使用DataTable渲染)
     * @param tPageName - 頁面名稱
     */
    GetDataTableFreezeValue(tPageName: string): void;
    /**
     * 設定凍結欄位(不使用DataTable渲染)
     * @param tPageName - 頁面名稱
     */
    FreezeField(tPageName: string): void;
    /**
     * Datatable.js 對齊Header和body
     */
    AlignedHeader(): void;
    /**
     * 將PageName對應的Table做合併儲存格，於此定義各PageName的合併儲存格範圍
     * @param tPageName - 頁面名稱
     */
    MergeTableValue(tPageName: string): void;
    /**
     * 定義那些頁面名稱是多個區塊搜尋的主頁面
     * @param tPageName - 頁面名稱
     */
    isMainIndex(tPageName: string): void;
    /**
     * 需要檢查相似度的欄位
     * @param tPageName - 頁面名稱
     * @param tFieldName - 欄位名稱
     */
    NeedCheckSimilarity(tPageName: string, tFieldName: string): void;
    /**
     * 不需要替換Menu的表單欄位
     * @param tFieldName - 欄位名稱
     * @param tPageName - 頁面名稱
     * @param FieldValue - 欄位值
     * @returns true: 不需要替換; false: 要替換
     */
    NoChangeField(tFieldName: string, tPageName: string, FieldValue: string): any;
    /**
     * 檢查是否為複選下拉式
     * @param tPageName - 頁面名稱
     * @param tFieldName - 欄位名稱
     * @param isSearchArea - 是否為搜尋欄位裡的選單
     */
    IsMultiSelect(tPageName: string, tFieldName: string, isSearchArea: boolean): void;
    /**
     * 產生匯出的資訊Query，標題/內容
     * @param tPageName - 頁面名稱
     * @param tmpTitle - 標題串列
     */
    GetExportQuery(tPageName: string, data: any, tmpTitle: string[][]): void;
    /**
     * 客製化Datatable.js excel參數
     * @param tPageName - 頁面名稱
     */
    DataTableExportCustomize(tPageName: string, data: any, dtObj: any): void;
    /**
     * 判定欄位是否需要Color Type
     * @param tPageName - 頁面名稱
     * @param tFieldName - 欄位名稱
     */
    NeedColorField(tPageName: string, tFieldName: string): void;
    /**
     * 檢查搜尋字串合法
     * @param tPageName - 頁面名稱
     * @param data - 搜尋值陣列
     */
    CheckSearchQuery(tPageName: string, data: string): void;
    /**
     * 從搜尋條件設定表單的Title(目前實作於ClickSearch裡)
     * @param tPageName - 頁面名稱
     * @param Query - 搜尋Query
     * @param data - 搜尋結果
     */
    SetFormTitleFromQuery(tPageName: string, Query: string[], data: string[][]): void;
    /**
     * 設定Datatable.js的標題訊息(如toolbar)
     * @param tPageName - 頁面名稱
     */
    TableInfHtml(tPageName: string): void;
}

/**
 * 此class定義表單內函有click event
 */
declare class OnclickPage {
    /**
     * 判定這個cell有沒有Click Function
     * @param tPageName - 頁面名稱
     * @param FieldName - 欄位名稱
     * @param RowTitle - 該行行Title
     */
    FieldIsOnclick(tPageName: string, FieldName: string, RowTitle: string): void;
    /**
     * @param tPageName - 頁面名稱
     * @param tTablePageName - click search的table頁面名稱
     * @param FieldName - 欄位名稱
     * @param RowTitle - 該行行Title
     * @param dataArr - 一行的data陣列
     * @param p1 - 需額外加入的參數
     */
    GetOnclickHtml(tPageName: string, tTablePageName: string, FieldName: string, RowTitle: string, dataArr: string[], p1: string): void;
}

/**
 * 此class定義動態改變欄位時觸發的function(用於搜尋bar)
 */
declare class DynamicFunction {
    /**
     * 此函式用於定義非FrontDynamicMenuRequest的動作。(此函式用於前端動態影響的條件下且idName = ''，call function)
     */
    FrontDynamic(): void;
    /**
     * 此函式用於定義需要通過後端取值時，另外還需要純前端的改變。
     */
    FrontDynamicInBackCall(): void;
    /**
     * 此函式用於定義需要通過後端取值時，DynamicRequest最後結束前需要執行的動作
     */
    DynamicInBackCallAtEnd(): void;
    /**
     * 重新定義動態欄位的Query值
     */
    ResetDynamicQuery(): void;
    /**
     * 動態影響觸發的function。包含純前端的改變、透過後端取值的ajax呼叫
     * @param tPageName - 頁面名稱
     * @param idName - html物件ID名稱(搜尋bar、可以是table某欄位的ID)(受到影響的)
     * @param tFieldName - 欄位名稱(因此欄位影響別的欄位的)
     * @param isSearch - 觸發此function是否來自搜尋bar初始化
     * @param TriggerFromId - 觸發此函式的DOM ID(目前實作於Table內部的觸發)
     */
    static DynamicRequest(tPageName: string, idName: string, tFieldName: string, isSearch: boolean, TriggerFromId: string): void;
}

/**
 * 此class用於定義Table間因某欄位而影響其他欄位的動作
 */
declare class DynamicFunctionInTable {
}

