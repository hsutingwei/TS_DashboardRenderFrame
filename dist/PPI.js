import { NeedAjaxArr, gPageObj, PageMake } from './PageInit.js';
import { PageSet, UrlQuery, ColorRuleClass, MenuList, ValueDisplay } from './set.js';
/**此class用於定義Part Page Search的搜尋流程。
 * 每個專案的Part Page Search可依各需求重新定義。若有新流程需定義，需從PartPageSearch擴充接口
 */
export class PPSearch {
    static PageSearch() {
        let pps = new PPSearch();
        for (let i = 0; i < NeedAjaxArr.length; i++) {
            pps.BlockSearch(NeedAjaxArr[i]);
        }
    }
    BlockSearch(tPageName) {
        if (!gPageObj.PageNameObj[tPageName]) {
            return;
        }
        if (gPageObj.PageNameObj[tPageName].AjaxStatus != null) {
            gPageObj.PageNameObj[tPageName].AjaxStatus.abort();
            gPageObj.PageNameObj[tPageName].AjaxStatus = null;
        }
        let Query = {};
        let Block = gPageObj.PageNameObj[tPageName].BlockId;
        let taIdx = NeedAjaxArr.indexOf(tPageName);
        document.getElementById(Block + '_Loader').style.display = 'block';
        let bu = $('input[name="BUTAB"]:checked').val();
        Query = {
            PageName: tPageName,
            BU: '',
            PageNumber: -1,
            NumberPerAPage: -1,
            QueryArr: [bu]
        };
        gPageObj.PageNameObj[tPageName].AjaxStatus = doAjax2('HomePageSearch', true, Query, function (data) {
            let pps = new PPSearch();
            pps.SubBlockRouter(tPageName, data);
            gPageObj.PageNameObj[tPageName].AjaxStatus = null;
            document.getElementById(Block + '_Loader').style.display = 'none';
        });
    }
    SubBlockRouter(tPageName, data) {
        let ppm = new PPMake();
        if (gPageObj.PageNameObj[tPageName]) {
            let TableHtmlStr = ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
        }
    }
}
/**此class用於定義個專案的Part Page Search的區塊搜尋後的表單圖表渲染邏輯。
 * 以及定義Part Page Search需要額外的邏輯功能
 */
export class PPMake {
    TableReport(tPageName, IdName, data) {
        let ps = new PageSet();
        let HeadArr = ps.MakeTableTitle(new Array(), tPageName);
        let tAttitute = 'table-layout:fixed;height:100%;width:100%;';
        let tAttitute2 = 'table-layout:fixed;height:100%;width:100%;';
        let TableObj = {};
        if (tPageName == 'SEMI_PART_DETAIL' || tPageName == 'SEMI_PART_INFO') {
            tAttitute = 'max-height:45vh;width:100%;';
            TableObj = {
                scrollY: '40vh',
                scrollX: false,
                scrollCollapse: true,
                autoWidth: false,
                searching: false,
                paging: false,
                bInfo: false,
                ordering: false
            };
        }
        else if (tPageName == 'SEMI_PROJECT') {
            tAttitute = 'overflow-y:auto;height:27vh;width:100%;display:block;';
            tAttitute2 = 'overflow-y:auto;height:27vh;width:100%;display:none;';
        }
        else {
            tAttitute = 'height:100%;width:100%;';
        }
        let htmlStr = this.CreatReadWriteTable(tPageName, data, tAttitute, HeadArr);
        let tmphtmlStr = this.CreatReadWriteTable(tPageName, data, tAttitute2, HeadArr);
        let tDom = document.getElementById(IdName);
        if (tPageName == 'SEMI_PROJECT' && tDom) {
            tDom.innerHTML = htmlStr + tmphtmlStr;
        }
        else if (tDom) {
            tDom.innerHTML = htmlStr;
        }
        if (tPageName == 'SEMI_PART_DETAIL' || tPageName == 'SEMI_PART_INFO') {
            tDom = document.getElementById(IdName + '_Hidden');
            if (tDom) {
                tDom.innerHTML = htmlStr.replace('id="' + IdName + '"', 'id="' + IdName + '_Hidden"');
            }
            let t = $('#' + IdName).DataTable(TableObj);
        }
        ps.MergeTableValue(IdName);
        this.ColorMergeCell(tPageName);
        $('#' + IdName).hover(function () {
            tDom = document.getElementById(IdName + '_EnlargeBtn');
            if (tDom) {
                tDom.style.visibility = 'visible';
                tDom.style.opacity = '1';
                tDom.style.transition = '';
            }
        }, function () {
            tDom = document.getElementById(IdName + '_EnlargeBtn');
            if (tDom) {
                tDom.style.visibility = 'hidden';
                tDom.style.opacity = '0';
                tDom.style.transition = 'visibility 0s, opacity 0.5s linear';
            }
        });
        $('#' + IdName + '_EnlargeBtn').hover(function () {
            tDom = document.getElementById(IdName + '_EnlargeBtn');
            if (tDom) {
                tDom.style.visibility = 'visible';
                tDom.style.opacity = '1';
                tDom.style.transition = '';
            }
        }, function () {
            tDom = document.getElementById(IdName + '_EnlargeBtn');
            if (tDom) {
                tDom.style.visibility = 'hidden';
                tDom.style.opacity = '0';
                tDom.style.transition = 'visibility 0s, opacity 0.5s linear';
            }
        });
    }
    ChartReport(tPageName, IdName, data) {
    }
    CreatTableTitle(tPageName, DomName, ExtraFieldArr, TitleArr, BkColorArr, IdName) {
        let tmpTitleArr = new Array();
        for (let i = 0; i < TitleArr.length; i++) {
            let tttArr = new Array();
            for (let j = 0; j < TitleArr[i].length; j++) {
                tttArr.push(TitleArr[i][j]);
            }
            tmpTitleArr.push(tttArr);
        }
        let LineNode = '';
        if (DomName == 'thead') {
            LineNode = 'th';
        }
        let TitleHtml = '<' + DomName + ' class="AutoNewline">';
        let SameIdxArr = [];
        for (let i = 0, j = 0; tmpTitleArr.length > 0 && i < tmpTitleArr[0].length; i = j) {
            for (j = i + 1; j < tmpTitleArr[0].length && tmpTitleArr[0][i] == tmpTitleArr[0][j]; j++) { }
            SameIdxArr.push(j);
        }
        if (tmpTitleArr.length > 0) {
            for (let i = 0; i < tmpTitleArr.length; i++) {
                TitleHtml += '<tr>';
                for (let j = 0, col = 0, row = 0, c = 0, r = 0, sIdx = 0; j < tmpTitleArr[i].length; j++) {
                    if (tmpTitleArr[i][j] == '#') {
                        if (j + 1 == SameIdxArr[sIdx]) {
                            sIdx++;
                        }
                        continue;
                    }
                    for (c = j + 1; c < tmpTitleArr[i].length && c < SameIdxArr[sIdx] && tmpTitleArr[i][j] == tmpTitleArr[i][c]; col++, c++) {
                        tmpTitleArr[i][c] = '#';
                    }
                    if (c == SameIdxArr[sIdx]) {
                        sIdx++;
                    }
                    for (r = i + 1; r < tmpTitleArr.length && tmpTitleArr[i][j] == tmpTitleArr[r][j]; row++, r++) {
                        for (let k = j + 1; j < tmpTitleArr[r].length && tmpTitleArr[r][j] == tmpTitleArr[r][k]; k++) {
                            tmpTitleArr[r][k] = '#';
                        }
                        tmpTitleArr[r][j] = '#';
                    }
                    let StyleStr = '';
                    if (BkColorArr && BkColorArr[i][j] != '') {
                        StyleStr = 'background-color:' + BkColorArr[i][j] + ';color:black';
                    }
                    TitleHtml += '<' + LineNode + (col > 0 ? ' colspan="' + (col + 1).toString() + '"' : '') + (row > 0 ? ' rowspan="' + (row + 1).toString() + '"' : '') + (StyleStr != '' ? ' style="' + StyleStr + '"' : '') + '>';
                    TitleHtml += tmpTitleArr[i][j] + '</' + LineNode + '>';
                    col = 0, row = 0;
                }
                for (let k = 0; i == 0 && k < ExtraFieldArr.length; k++) {
                    TitleHtml += '<' + LineNode + ' rowspan="' + tmpTitleArr.length + '">' + ExtraFieldArr[k] + '</' + LineNode + '>';
                }
                TitleHtml += '</tr>';
            }
        }
        else if ((tPageName.indexOf('OEE') > -1 && IdName != 'Block1_3' && IdName != 'Block2_3' && IdName != 'Block3_3' && IdName != 'Block4_3')
            || tPageName.indexOf('CIRCLE') > -1) {
            return '';
        }
        else {
            let pm = new PageMake();
            let ps = new PageSet();
            let ShieldIdxArr = ps.NeedShieldField(tPageName);
            for (let i = 0; i < gPageObj.PageNameObj[tPageName].TitleStrArr.length; i++) {
                TitleHtml += '<' + LineNode + ' ' + pm.MakeWidthAttributeStr(tPageName, gPageObj.PageNameObj[tPageName].TitleStrArr[i], (ShieldIdxArr.indexOf(i) > -1 ? 'display:none;' : ''), gPageObj.PageNameObj[tPageName].isWriteMode ? 'Write' : 'Read') + '>' + gPageObj.PageNameObj[tPageName].TitleStrArr[i] + '</' + LineNode + '>';
            }
            for (let j = 0; j < ExtraFieldArr.length; j++) {
                TitleHtml += '<' + LineNode + '>' + ExtraFieldArr[j] + '</' + LineNode + '>';
            }
        }
        TitleHtml += '</' + DomName + '>';
        return TitleHtml;
    }
    CreatReadWriteTable(tPageName, data, AttributeStr, TitleArr, IdName) {
        let vd = new ValueDisplay();
        let tFieldArr = [];
        let TableId = tPageName + '_Table';
        let htmlStr = '';
        htmlStr += '<table id="' + TableId + '" class="whitespace-nowrap ' + TableId + '" style="' + AttributeStr + '">';
        htmlStr += this.CreatTableTitle(tPageName, 'thead', [], TitleArr, undefined, IdName);
        htmlStr += '<tbody>';
        let uq = new UrlQuery();
        let cr = new ColorRuleClass();
        cr.InitColorObj(tPageName, data);
        for (let i = 0; i < data.length; i++) {
            let tmpArr = data[i].split(',');
            let tmpRowTitle = tmpArr[0];
            htmlStr += '<tr>';
            for (let j = 0; j < tmpArr.length; j++) {
                let FieldIdx = -1;
                let hrefUrl = '';
                if (uq.UrlInfObj[tPageName]) {
                    let tArr = tmpArr[j].split(';');
                    if (uq.NeedSetKeyValue(tPageName, tFieldArr[j])) {
                        hrefUrl = uq.GetUrl(tArr[1], tPageName, tFieldArr[j], tmpRowTitle, tmpArr);
                    }
                    if (tArr.length > 1) {
                        tmpArr[j] = tArr[0];
                    }
                }
                let tmpStr = tmpArr[j].replace('%', '');
                let InnStr = vd.NeedModifyDisplay(tFieldArr[j], tmpArr[j], tPageName, isNaN(Number(tmpRowTitle)) ? tmpRowTitle : undefined);
                let ColorHtml = cr.CheckColorRule(i, j);
                ColorHtml += ColorHtml != '' ? 'font-weight:bold;' : '';
                let AttributeStr = '';
                if (hrefUrl != '') {
                    AttributeStr = 'href="' + hrefUrl + '" class="magic-btn" style="cursor: pointer;font-weight:bold;color:black" target="_blank"';
                    InnStr = '<a ' + AttributeStr + '>' + InnStr + '</a>';
                }
                if (tmpStr != '' && !isNaN(Number(tmpStr))) {
                    htmlStr += '<td style="text-align:right;' + ColorHtml + '">' + InnStr + '</td>';
                }
                else {
                    htmlStr += '<td style="text-align:left;' + ColorHtml + '">' + InnStr + '</td>';
                }
            }
            htmlStr += '</tr>';
        }
        htmlStr += '</tbody></table>';
        return htmlStr;
    }
    MakeWidthAttributeStr(tPageName, InputFieldName, StyleAttr) {
        return '';
    }
    MakeListHtml(Dom, AttributeStr, ValueArr, SelectValue) {
        return '';
    }
    MakeOptionHtml(ValueArr, SelectValue) {
        return '';
    }
    MakeChart(tPageName, data, IdName) {
    }
    InitSearchArea(tPageName, IdName) {
    }
    /**給合併儲存格後的表格上色(只針對有合併的範圍) */
    ColorMergeCell(tPageName) {
        let TableInf = {
            SEMI_TABLE_MTD_YTM_NSB: {
                CheckRange: 1,
                BackgroundColor: 'RGB(222,236,246)',
                TurnColor: 'rgb(223, 224, 226)'
            },
            SEMI_TABLE_Top10_CUST_NSB: {
                CheckRange: 1,
                BackgroundColor: 'RGB(222,236,246)',
                TurnColor: 'rgb(223, 224, 226)'
            },
            SEMI_TABLE_IN_OUT_GOODS: {
                CheckRange: 1,
                BackgroundColor: 'RGB(226,239,217)',
                TurnColor: 'rgb(223, 224, 226)'
            },
            Prober_Handler: {
                CheckRange: 1,
                BackgroundColor: 'RGB(214,220,228)',
                TurnColor: 'rgb(223, 224, 226)'
            },
            SEMI_TESTER: {
                CheckRange: 1,
                BackgroundColor: 'RGB(214,220,228)',
                TurnColor: 'rgb(223, 224, 226)'
            },
        };
        if (TableInf[tPageName]) {
            let TableIdName = tPageName + '_Table';
            let t = $('#' + TableIdName + ' tbody tr');
            for (let i = 0, k = 0; t.eq(i).html() != null; i++) {
                let jump = false;
                if (t.eq(i).html().toString().indexOf('</th>') > -1) {
                    continue;
                }
                for (let j = 0; t.eq(i).find('td').eq(j).html() != null && j < TableInf[tPageName].CheckRange; j++) {
                    if (t.eq(i).find('td').eq(j).css('display') == 'none') {
                        jump = true;
                        break;
                    }
                    if (TableInf[tPageName].TurnColor && TableInf[tPageName].TurnColor != '' && k % 2 != 0) {
                        t.eq(i).find('td').eq(j).css('background-color', TableInf[tPageName].TurnColor || '');
                    }
                    else {
                        t.eq(i).find('td').eq(j).css('background-color', TableInf[tPageName].BackgroundColor);
                    }
                }
                if (jump) {
                    continue;
                }
                k++;
            }
        }
    }
    static ClickReport(TitleStr, TableIdName) {
        document.getElementById('mySmallModalLabel').innerHTML = TitleStr;
        let TableInnerHtml = document.getElementById(TableIdName).innerHTML || '';
        let Attitude = 'table-layout:fixed;height:100%;width:100%;';
        if (TableIdName.indexOf('Hidden') > -1) {
            //Attitude += 'background-color:rgb(223, 224, 226);color:black;border: 1px solid black;';
        }
        TableInnerHtml = '<table id="IndexAlertTable" class="table table-bordered ' + TableIdName + '" style="' + Attitude + '">' + TableInnerHtml + '</table>';
        document.getElementById('AlertText').innerHTML = TableInnerHtml;
        ButtonClickSimulation('#AlertBtn');
        if (TableIdName.indexOf('Hidden') > -1) {
            let TableObj = {
                scrollY: '75vh',
                scrollX: false,
                scrollCollapse: true,
                autoWidth: false,
                searching: false,
                paging: false,
                bInfo: false,
                ordering: false
            };
            let t = $('#IndexAlertTable').DataTable(TableObj);
        }
    }
    /**初始化個區塊的搜尋Menu
     * @param {string} tPageName 頁面名稱
     */
    static InitBlockMenu(tPageName) {
        let MenuInf = {
            OEEIndex: {
                OEECPType: {
                    DomId: 'Block1_Search',
                    DefaultValue: '',
                    EventPageName: ['OEE_CP']
                },
                OEELCDType: {
                    DomId: 'Block2_Search',
                    DefaultValue: '',
                    EventPageName: ['OEE_LCD']
                },
                OEEFTType: {
                    DomId: 'Block3_Search',
                    DefaultValue: 'Tray',
                    EventPageName: ['OEE_FT']
                },
                OEEDSType: {
                    DomId: 'Block4_Search',
                    DefaultValue: '挑檢',
                    EventPageName: ['OEE_DS']
                }
            }
        };
        let pm = new PageMake();
        if (MenuInf[tPageName]) {
            Object.keys(MenuInf[tPageName]).forEach((key) => {
                if (MenuList[key] != null) {
                    let AttrStr = pm.MakeWidthAttributeStr(tPageName, key, '', 'Search');
                    let htmlStr = pm.MakeListHtml('select', AttrStr, MenuList[key].MenuArr, MenuInf[tPageName][key].DefaultValue);
                    document.getElementById(MenuInf[tPageName][key].DomId).innerHTML = htmlStr;
                    $('#' + MenuInf[tPageName][key].DomId).unbind().change(function () {
                        let pps = new PPSearch();
                        MenuInf[tPageName][key].EventPageName.forEach(function (value) {
                            pps.BlockSearch(value);
                        });
                    });
                }
            });
        }
        $('.selectpicker').selectpicker(); //可搜尋下拉式初始化
    }
}
window.PPMake = PPMake;
window.PPSearch = PPSearch;
