# OPAS Typescript
## 營運績效系統表單圖表搜尋渲染框架

這是一個使用 Typescript 語言開發的渲染框架，旨在為 OPAS 表單和圖表搜尋提供方便和高校的渲染功能。

## 技術
- [TypeScript] - 前端開發的使用語言
- [DataTable.js] - 表單使用的js (js直接更版不會有問題)
- [EChart.js] - 圖表使用的js (js值接更版不會有問題)
- [tailwind css] - 使用的css工具，css快速開發、RWD的好幫手
- [tooltip] - tooltip使用的js
- [selectpicker] - 下拉式選單使用的js (js更版可能會有問題)
- [datetimepicker] - 日期選單使用的js (js更版可能會有問題)
- [jQuery]

## 功能

- 自動產生搜尋列、下拉式選單、選單值動態變化
- 自動產生客製化Table、Chart
- 一般搜尋、區塊搜尋(異步請求)、點擊搜尋
- 顏色Highlight定義


## 安裝
安裝[node.js]

安裝[pnpm](https://pnpm.io/zh-TW/installation)
Windows
```sh
iwr https://get.pnpm.io/install.ps1 -useb | iex
```
or
```sh
npm install -g pnpm
```

安裝typescript
```sh
pnpm install -g typescript
```
安裝完typescript後，可以至命令提示字元輸入指令確認，如下
測試TS安裝是否正常
```sh
tsc
```
檢視安裝的版本
```sh
tsc -v
```
使用相關資訊
```sh
tsc --help
```

開始開發typescript，指定路徑下於命令提示字元輸入指令
```sh
tsc --init
```
tsconfig.json設定
```sh
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    "target": "ES2015",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "esnext",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "outDir": "./dist/",                              /* Redirect output structure to the directory. */

    /* Strict Type-Checking Options */
    "strict": true,                                 /* Enable all strict type-checking options. */

    /* Module Resolution Options */
    "types": [],                                 /* Type declaration files to be included in compilation. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */

    /* Advanced Options */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  }
}
```

ts程式開發完後，於程式路徑下使用命令提示字元輸入指令，即會根據tsconfig.json中定義的 "outDir" 輸出js檔
```sh
tsc
```
產生出來的js檔後，需要把js檔內的 import 刪除，只留下自己寫的程式碼引用，如下
```
import $ from 'jquery';
import 'bootstrap';
import * as set from './set.js';
//import { PPSearch, PPMake } from './PPI.js';
import 'datatables.net';
import * as echarts from 'echarts';
import 'bootstrap-datepicker';
import 'bootstrap-fileinput';
```
改為
```
import * as set from './set.js';
```
最後於OPAS專案內引用，如下。因set.js、PPI.js、ChineseSegment.js會於PageInit.js程式動態引用
```
<script type="module" src="~/ts/PageInit.js"></script>
```
OPAS引用js、css完整範例
```
    <script src="~/scripts/jquery-3.4.1.min.js"></script>
    <script src="~/scripts/bootstrap.min.js"></script>
    <script src="~/scripts/modernizr-2.6.2.js"></script>
    <script src="~/scripts/jquery.dataTables.min.js"></script>
    <script src="~/scripts/dataTables.fixedColumns.min.js"></script>
    <script type="module" src="~/ts/PageInit.js"></script>
    <script src="~/ts/data.js"></script>
    <script src="~/scripts/bootstrap-select.min.js"></script>
    <script src="~/scripts/bootstrap-datetimepicker.min.js"></script>
    <script src="~/scripts/datatables.min.js"></script>
    <script src="~/scripts/jszip.min.js"></script>
    <script src="~/scripts/pdfmake.min.js"></script>
    <script src="~/scripts/vfs_fonts.js"></script>
    <script src="~/scripts/buttons.html5.min.js"></script>
    <script src="~/scripts/buttons.print.min.js"></script-->
    <script src="~/scripts/ChineseSegment.js"></script>
    <script src="~/scripts/echarts.min.js"></script>
    <script src="~/scripts/bootstrap.bundle.min.js"></script>
    <link href="~/Content/Site.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/Tab.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/fixedColumns.dataTables.min.css" rel="stylesheet" type="text/css" /-->
    <link href="~/Content/datatables.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/bootstrap-select.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/UploadArea.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/loaders.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/LinkStyle.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/tail.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/tooltip.css" rel="stylesheet" type="text/css" />
    <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
```


#### 頁面初始化
開始使用渲染框架前，HTML頁面必須要有以下物件
```html
<span style="display:none" id="PageName">{頁面名稱}</span>
<span style="display:none" id="DefaultPage">{頁面預設顯示第幾頁}</span>
<span style="display:none" id="BuName">{BU名稱}</span>
<span style="display:none" id="FieldName">{頁面欄位名稱}</span>
<span style="display:none" id="Necessary">{頁面欄位是否必填}</span>
<span style="display:none" id="ColorRule">{顏色Highlight規則}</span>
<div style="display:none" id="MenuValueArea">{下拉選單Key/Value物件}</div>
```
| DOM | 說明 |
| ------ | ------ |
| PageName | 搜尋頁面的名稱 |
| DefaultPage | 搜尋頁面預設顯示第幾頁，此值也可由 set.ts/DefineSearPageInf() 定義 |
| BuName | BU名稱，有不同BU使用相同模組頁面(同PageName)就會用到此值 |
| FieldName | 此值於Page Load時由後端傳入前端，根據此值渲染搜尋列。此值也可由 set.ts/ResetMenuDocumentInnerHtml()定義 |
| Necessary | 此值於Page Load時由後端傳入前端，觸發更新函式時，根據此值檢查欄位是否為空。 |
| ColorRule | 此值於Page Load時由後端傳入前端，set.ts/ColorRuleClass/InitColorRule() 根據此值初始化顏色定義 |
| MenuValueArea | 此值於Page Load時由後端傳入前端，根據此值初始化下拉式選單物件。 |

#### PageInit.ts
整個渲染框架的起始點。
此檔案內都是基礎的渲染邏輯，新專案套用時不需重新定義。
除非有新需求、或是BUG。

#### set.ts
渲染框架的設定檔，不同專案客製化需求由此檔定義。有新需求再擴寫。

#### PPI.ts
新的搜尋運作流程，專用於區塊搜尋。頁面初始化時會根據 set.ts/isMainIndex() 來決定跑 Search(一般搜尋) 還是 PageSearch(區塊搜尋)。

#### data.ts
通用小工具

#### ChineseSegment.ts
功能用於檢查名詞相似度，純前端即時斷詞字典生成。
最新版本已放棄由前端實作此功能，改由後端實作。
實際範例可見自有產品的終端客戶定義。

## License
yves.hsu


   [TypeScript]: <https://www.typescriptlang.org/>
   [DataTable.js]: <https://datatables.net/>
   [EChart.js]: <https://echarts.apache.org/zh/index.html>
   [tailwind css]: <https://tailwindcss.com/>
   [jQuery]: <http://jquery.com>
   [tooltip]: <https://getbootstrap.com/docs/4.0/components/tooltips/>
   [selectpicker]: <https://developer.snapappointments.com/bootstrap-select/>
   [datetimepicker]: <https://getdatepicker.com/4/Options/>
   [node.js]: <https://nodejs.org/zh-tw/download>
