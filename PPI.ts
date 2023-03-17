import { NeedAjaxArr, gPageObj, PageInf, PageMake, PageOperation, PageTool } from './PageInit.js';
import { PageSet, TableSetObj, UrlQuery, ColorRuleClass, MenuList, ValueDisplay } from './set.js';

/**此class用於定義Part Page Search的搜尋流程。
 * 每個專案的Part Page Search可依各需求重新定義。若有新流程需定義，需從PartPageSearch擴充接口
 */
export class PPSearch implements PartPageSearch {
    static PageSearch(): void {
        let tPageName: string = document.getElementById('PageName')!.innerHTML || '';
        if (tPageName == 'OEEIndex') {
            $('#field_3').css('float', 'right');
            $('#field_4').css('float', 'right');
            $('#field_3').parent().find('label').css('padding-top', '10px');
            $('#field_4').parent().find('label').css('padding-top', '10px');
        }
        else if (tPageName.indexOf('Index') > -1) {
            $('#field_5').css('float', 'right');
            $('#field_6').css('float', 'right');
            $('#field_5').parent().find('label').css('padding-top', '10px');
            $('#field_6').parent().find('label').css('padding-top', '10px');
        }

        let pps = new PPSearch();
        for (let i = 0; i < NeedAjaxArr.length; i++) {
            pps.BlockSearch(NeedAjaxArr[i]);
        }

        switch (tPageName) {
            case 'AEIndex':
                $('#Block2').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ Type=' + tType);
                    if (tBu == 'FT') {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_FT?' + getStr);
                    }
                    else if (tBu == 'DS') {
                        getStr = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ=' + tType);
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_DS?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_CPLCD?' + getStr);
                    }
                });

                $('#Block4').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tItem = $('#Block3_Search').find('select').val();
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('機型=' + tType) + '&' + encodeURI('項目=' + tItem);
                    if (tBu == 'DS') {
                        window.open('http://192.168.5.141:83/EQPRAM/Default/DSEQPRAM?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/EQPRAM/Default/TestEQPRAM?' + getStr);
                    }
                });

                $('#Block3').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tItem = $('#Block3_Search').find('select').val();
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('機型=' + tType) + '&' + encodeURI('項目=' + tItem);
                    if ($('#field_0').val() != 'DS') {
                        window.open('http://192.168.5.141:83/EQPRAM/Default/Abnormal?' + getStr);
                    }
                });

                $('#Block5').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tItem = $('#Block3_Search').find('select').val();
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('機型=' + tType) + '&' + encodeURI('項目=' + tItem);
                    if ($('#field_0').val() != 'DS') {
                        window.open('http://192.168.5.141:83/EQPRAM/Default/Abnormal?' + getStr);
                    }
                });
                break;
            case 'PEIndex':
                $('#Block2').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ Type=' + tType);
                    if (tBu == 'FT') {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_FT?' + getStr);
                    }
                    else if (tBu == 'DS') {
                        getStr = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ=' + tType);
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_DS?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_CPLCD?' + getStr);
                    }
                });

                $('#Block5').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ Type=' + tType);
                    if (tBu == 'FT') {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_FT?' + getStr);
                    }
                    else if (tBu == 'DS') {
                        getStr = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ=' + tType);
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_DS?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_CPLCD?' + getStr);
                    }
                });

                $('#Block3').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ Type=' + tType);
                    if (tBu == 'FT') {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_FT?' + getStr);
                    }
                    else if (tBu == 'DS') {
                        getStr = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ=' + tType);
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_DS?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_CPLCD?' + getStr);
                    }
                });

                $('#Block4').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ Type=' + tType);
                    if (tBu == 'FT') {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_FT?' + getStr);
                    }
                    else if (tBu == 'DS') {
                        getStr = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ=' + tType);
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_DS?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_CPLCD?' + getStr);
                    }
                });

                $('#Block6').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('機型=' + tType);
                    if (tBu == 'DS') {
                        window.open('http://192.168.5.141:83/OEE/Default/UPHA?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/OEE/Default/TTA?' + getStr);
                    }
                });
                break
            case 'QEIndex':
                $('#Block2').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ Type=' + tType);
                    if (tBu == 'FT') {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_FT?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_CPLCD?' + getStr);
                    }
                });

                $('#Block3').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('EQ Type=' + tType);
                    if (tBu == 'FT') {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_FT?' + getStr);
                    }
                    else {
                        window.open('http://192.168.5.141:83/SEMI/Default/PH_CPLCD?' + getStr);
                    }
                });

                $('#Block4').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('機型=' + tType);
                    window.open('http://192.168.5.141:83/Yield/Default/RTRate?' + getStr);
                });

                $('#Block5').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('機型=' + tType);
                    window.open('http://192.168.5.141:83/Yield/Default/YieldRate?' + getStr);
                });

                $('#Block6').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('機型=' + tType) + '&' + encodeURI('重點客戶勾選=true') + '&' + encodeURI('圖表類型=客戶');
                    window.open('http://192.168.5.141:83/Yield/Default/YieldRate?' + getStr);
                });
                break;
            default:
                break;
        }
    }

    BlockSearch(tPageName: string): void {
        if (!gPageObj.PageNameObj[tPageName]) {
            return;
        }

        let oriPageName: string = tPageName;
        let PPISetChildPageName = function (tPageName: string, oriPageName: string) {
            if (gPageObj.PageNameObj[tPageName] == null) {
                if (gPageObj.PageNameObj[tPageName] == null) {
                    gPageObj.PageNameArr.push(tPageName);
                }
                gPageObj.PageNameObj[tPageName] = new PageInf(tPageName);
                gPageObj.PageNameObj[tPageName].SetTableTitle();
                gPageObj.PageNameObj[tPageName].ParentName = gPageObj.PageNameObj[oriPageName].ParentName;
                gPageObj.PageNameObj[tPageName].BlockId = gPageObj.PageNameObj[oriPageName].BlockId;
                if (gPageObj.PageNameObj[oriPageName]?.SubBlockId != null) {
                    gPageObj.PageNameObj[tPageName].SubBlockId = gPageObj.PageNameObj[oriPageName].SubBlockId;
                }
            }
        }
        if (tPageName.indexOf('AE_') == 0 && $('#field_0').html() != null && $('#field_0').val() == 'DS') {
            tPageName = tPageName.replace('AE_', 'AE_DS');
            PPISetChildPageName(tPageName, oriPageName);

            if (gPageObj.PageNameObj[oriPageName] && gPageObj.PageNameObj[oriPageName].AjaxStatus != null) {
                gPageObj.PageNameObj[oriPageName].AjaxStatus.abort();
                gPageObj.PageNameObj[oriPageName].AjaxStatus = null;
            }
        }
        else if (tPageName.indexOf('AE_') == 0 && $('#field_0').html() != null && $('#field_0').val() != 'DS') {
            let tmpPageName = tPageName.replace('AE_', 'AE_DS');
            if (gPageObj.PageNameObj[tmpPageName] && gPageObj.PageNameObj[tmpPageName].AjaxStatus != null) {
                gPageObj.PageNameObj[tmpPageName].AjaxStatus.abort();
                gPageObj.PageNameObj[tmpPageName].AjaxStatus = null;
            }
        }
        else if (tPageName.indexOf('PE_') == 0 && $('#field_0').html() != null && $('#field_0').val() == 'DS') {
            switch (tPageName) {
                case 'PE_LEND_TAC':
                    tPageName = 'PE_DSLOSS_TAC';
                    break;
                case 'PE_LOSS_TAC':
                    tPageName = 'PE_DSLOSS_TAE';
                    break;
                case 'PE_RE':
                    tPageName = 'PE_DSRE';
                    break;
                case 'PE_TTAD':
                    tPageName = 'PE_DSUAD';
                    break;
                default:
                    tPageName = tPageName.replace('PE_', 'PE_DS');
                    break;
            }
            PPISetChildPageName(tPageName, oriPageName);

            if (gPageObj.PageNameObj[oriPageName] && gPageObj.PageNameObj[oriPageName].AjaxStatus != null) {
                gPageObj.PageNameObj[oriPageName].AjaxStatus.abort();
                gPageObj.PageNameObj[oriPageName].AjaxStatus = null;
            }
        }
        else if (tPageName.indexOf('PE_') == 0 && $('#field_0').html() != null && $('#field_0').val() != 'DS') {
            let tmpPageName: string = '';
            switch (tPageName) {
                case 'PE_LEND_TAC':
                    tmpPageName = 'PE_DSLOSS_TAC';
                    break;
                case 'PE_LOSS_TAC':
                    tmpPageName = 'PE_DSLOSS_TAE';
                    break;
                case 'PE_RE':
                    tmpPageName = 'PE_DSRE';
                    break;
                case 'PE_TTAD':
                    tmpPageName = 'PE_DSUAD';
                    break;
                default:
                    tmpPageName = tPageName.replace('PE_', 'PE_DS');
                    break;
            }
            if (gPageObj.PageNameObj[tmpPageName] && gPageObj.PageNameObj[tmpPageName].AjaxStatus != null) {
                gPageObj.PageNameObj[tmpPageName].AjaxStatus.abort();
                gPageObj.PageNameObj[tmpPageName].AjaxStatus = null;
            }
        }

        let Query: any = {};
        let Block = gPageObj.PageNameObj[oriPageName].BlockId;
        document.getElementById(Block + '_Loader')!.style.display = 'block';
        let domId = 'field_';
        let fQueryArr: string[] = [];

        for (let i = 0; document.getElementById(domId + i.toString()); i++) {
            let tmpDom = $('#' + domId + i.toString());
            let tmpNode = tmpDom.parent().find('label').html();
            let tmpValue: any = tmpDom.val();
            let display: string = tmpDom.parent().find('label').css('display').toString();
            if (display != 'none') {
                if (tmpValue == null || tmpValue == undefined) {
                    tmpValue = '';
                }
                else if (TableSetObj.DatePickerArr.indexOf(tmpNode) > -1) {
                    tmpValue = tmpDom.find('input').val();
                }
                else if (TableSetObj.CheckboxArr.indexOf(gPageObj.PageNameObj[gPageObj.PageNameObj[tPageName].ParentName].FieldArr[i]) > -1) {
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

        if (gPageObj.PageNameObj[tPageName].AjaxStatus != null) {
            gPageObj.PageNameObj[tPageName].AjaxStatus.abort();
            gPageObj.PageNameObj[tPageName].AjaxStatus = null;
        }

        Query = {
            PageName: tPageName,
            BU: '',
            PageNumber: -1,
            NumberPerAPage: -1,
            QueryArr: fQueryArr
        }

        let ps = new PageSet();
        Query.QueryArr = ps.ResetSearchQuery(tPageName, Query.QueryArr);

        gPageObj.PageNameObj[tPageName].LastQuery = Query;
        gPageObj.PageNameObj[gPageObj.PageNameObj[tPageName].ParentName].LastQuery = Query;
        gPageObj.PageNameObj[tPageName].AjaxStatus = doAjax2('HomePageSearch', true, Query, function (data: string[]) {
            let pps = new PPSearch();
            let ps = new PageSet();
            gPageObj.PageNameObj[tPageName].SetTableTitle(data);
            ps.EditSearchResult(tPageName, data);
            pps.SubBlockRouter(tPageName, data);
            gPageObj.PageNameObj[tPageName].AjaxStatus = null;
            document.getElementById(Block + '_Loader')!.style.display = 'none';
        });
    }

    SubBlockRouter(tPageName: string, data: string[]): void {
        let ppm = new PPMake();
        let URLArr: string[] = ['OEE', 'AE', 'PE', 'QE'];

        switch (tPageName) {
            case 'OEE_CP':
                ppm.OEEReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'OEE_LCD':
                ppm.OEEReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'OEE_FT':
                ppm.OEEReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'OEE_DS':
                ppm.OEEReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_CIRCLE':
                if (data.length == 0) { return; }
                data = ppm.CheckDataCount(data, 7, 13);
                let tmpData: string[] = [
                    ['Target:', data[data.length - 1].split(',')[0]].join(','),
                    ['Actual:', data[data.length - 1].split(',')[1]].join(','),
                    ['Growth:', data[data.length - 1].split(',')[2]].join(','),
                    ['EQ#:', data[data.length - 1].split(',')[3]].join(','),
                ];
                ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_2', tmpData);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_1', [data[data.length - 1].split(',')[1]]);

                //URL寫在這是因為DOM ID在這個CALL才會存在
                $('#Block1_1').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[0] + '?' + getStr);
                });

                for (let i = 0; i < 3; i++) {
                    tmpData = [
                        ['Target:', data[data.length - 1].split(',')[4 + i * 3 + 0]].join(','),
                        ['Actual:', data[data.length - 1].split(',')[4 + i * 3 + 1]].join(','),
                        ['Growth:', data[data.length - 1].split(',')[4 + i * 3 + 2]].join(','),
                    ];
                    ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 4).toString(), tmpData);
                    ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 3).toString(), [data[data.length - 1].split(',')[4 + i * 3 + 1]]);
                }

                $('#Block1_5').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                        + '&' + encodeURI('Type=' + tType);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[2] + '?' + getStr);
                });

                $('#Block1_7').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    if (tBu != 'DS') {
                        let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                        let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                        let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                        let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                        let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                        let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                        let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                            + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                            + '&' + encodeURI('Type=' + tType);
                        window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[3] + '?' + getStr);
                    }
                });
                break;
            case 'AE_EQP':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_CTA':
                data = ppm.CheckDataCount(data, 7, 3);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_RAM':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_CHTA':
                //$('#CHTA_Title').html('Causes Handling Time Analysis - Device');
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_DSCIRCLE':
                if (data.length == 0) { return; }
                data = ppm.CheckDataCount(data, 7, 13);
                let tmpData2: string[] = [
                    ['Target:', data[data.length - 1].split(',')[0]].join(','),
                    ['Actual:', data[data.length - 1].split(',')[1]].join(','),
                    ['Growth:', data[data.length - 1].split(',')[2]].join(','),
                    ['EQ#:', data[data.length - 1].split(',')[3]].join(','),
                ];
                ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_2', tmpData2);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_1', [data[data.length - 1].split(',')[1]]);

                //URL寫在這是因為DOM ID在這個CALL才會存在
                $('#Block1_1').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[0] + '?' + getStr);
                });

                for (let i = 0; i < 3; i++) {
                    tmpData2 = [
                        ['Target:', data[data.length - 1].split(',')[4 + i * 3 + 0]].join(','),
                        ['Actual:', data[data.length - 1].split(',')[4 + i * 3 + 1]].join(','),
                        ['Growth:', data[data.length - 1].split(',')[4 + i * 3 + 2]].join(','),
                    ];
                    ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 4).toString(), tmpData2);
                    ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 3).toString(), [data[data.length - 1].split(',')[4 + i * 3 + 1]]);
                }

                $('#Block1_5').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                        + '&' + encodeURI('Type=' + tType);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[2] + '?' + getStr);
                });

                $('#Block1_7').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    if (tBu != 'DS') {
                        let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                        let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                        let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                        let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                        let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                        let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                        let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                            + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                            + '&' + encodeURI('Type=' + tType);
                        window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[3] + '?' + getStr);
                    }
                });
                break;
            case 'AE_DSEQP':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_DSCTA':
                data = ppm.CheckDataCount(data, 7, 2);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_DSRAM':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'AE_DSCHTA':
                //$('#CHTA_Title').html('Causes Time Analysis - Equipment');
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_CIRCLE':
                if (data.length == 0) { return; }
                data = ppm.CheckDataCount(data, 7, 13);
                let tmpData3: string[] = [
                    ['Target:', data[data.length - 1].split(',')[0]].join(','),
                    ['Actual:', data[data.length - 1].split(',')[1]].join(','),
                    ['Growth:', data[data.length - 1].split(',')[2]].join(','),
                    ['EQ#:', data[data.length - 1].split(',')[3]].join(','),
                ];
                ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_2', tmpData3);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_1', [data[data.length - 1].split(',')[1]]);

                //URL寫在這是因為DOM ID在這個CALL才會存在
                $('#Block1_1').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[0] + '?' + getStr);
                });

                for (let i = 0; i < 3; i++) {
                    tmpData3 = [
                        ['Target:', data[data.length - 1].split(',')[4 + i * 3 + 0]].join(','),
                        ['Actual:', data[data.length - 1].split(',')[4 + i * 3 + 1]].join(','),
                        ['Growth:', data[data.length - 1].split(',')[4 + i * 3 + 2]].join(','),
                    ];
                    ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 4).toString(), tmpData3);
                    ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 3).toString(), [data[data.length - 1].split(',')[4 + i * 3 + 1]]);
                }

                $('#Block1_3').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                        + '&' + encodeURI('Type=' + tType);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[1] + '?' + getStr);
                });

                $('#Block1_7').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    if (tBu != 'DS') {
                        let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                        let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                        let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                        let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                        let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                        let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                        let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                            + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                            + '&' + encodeURI('Type=' + tType);
                        window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[3] + '?' + getStr);
                    }
                });
                break;
            case 'PE_OE':
                data = ppm.CheckDataCount(data, 7, 3);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_LEND_TAC':
                $('#LEND_Title').html('LEND Time Analysis - Customer');
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_LOSS_TAC':
                $('#LOSS_Title').html('LOSS Time Analysis - Customer');
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_RE':
                data = ppm.CheckDataCount(data, 7, 5);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_TTAD':
                $('#TTA_Title').html('Test/Index Time Analysis - Device');
                ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_DSCIRCLE':
                if (data.length == 0) { return; }
                data = ppm.CheckDataCount(data, 7, 13);
                let tmpData4: string[] = [
                    ['Target:', data[data.length - 1].split(',')[0]].join(','),
                    ['Actual:', data[data.length - 1].split(',')[1]].join(','),
                    ['Growth:', data[data.length - 1].split(',')[2]].join(','),
                    ['EQ#:', data[data.length - 1].split(',')[3]].join(','),
                ];
                ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_2', tmpData4);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_1', [data[data.length - 1].split(',')[1]]);

                //URL寫在這是因為DOM ID在這個CALL才會存在
                $('#Block1_1').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[0] + '?' + getStr);
                });

                for (let i = 0; i < 3; i++) {
                    tmpData4 = [
                        ['Target:', data[data.length - 1].split(',')[4 + i * 3 + 0]].join(','),
                        ['Actual:', data[data.length - 1].split(',')[4 + i * 3 + 1]].join(','),
                        ['Growth:', data[data.length - 1].split(',')[4 + i * 3 + 2]].join(','),
                    ];
                    ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 4).toString(), tmpData4);
                    ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 3).toString(), [data[data.length - 1].split(',')[4 + i * 3 + 1]]);
                }

                $('#Block1_3').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                        + '&' + encodeURI('Type=' + tType);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[1] + '?' + getStr);
                });

                $('#Block1_7').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    if (tBu != 'DS') {
                        let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                        let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                        let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                        let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                        let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                        let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                        let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                            + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                            + '&' + encodeURI('Type=' + tType);
                        window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[3] + '?' + getStr);
                    }
                });
                break;
            case 'PE_DSOE':
                data = ppm.CheckDataCount(data, 7, 3);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_DSLOSS_TAC':
                $('#LEND_Title').html('LOSS Time Analysis - Causes');
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_DSLOSS_TAE':
                $('#LOSS_Title').html('LOSS Time Analysis - Equipment');
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_DSRE':
                data = ppm.CheckDataCount(data, 7, 3);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'PE_DSUAD':
                $('#TTA_Title').html('UPH Analysis - Device');
                ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'QE_CIRCLE':
                if (data.length == 0) { return; }
                data = ppm.CheckDataCount(data, 7, 13);
                let tmpData5: string[] = [
                    ['Target:', data[data.length - 1].split(',')[0]].join(','),
                    ['Actual:', data[data.length - 1].split(',')[1]].join(','),
                    ['Growth:', data[data.length - 1].split(',')[2]].join(','),
                    ['EQ#:', data[data.length - 1].split(',')[3]].join(','),
                ];
                ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_2', tmpData5);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_1', [data[data.length - 1].split(',')[1]]);

                //URL寫在這是因為DOM ID在這個CALL才會存在
                $('#Block1_1').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[0] + '?' + getStr);
                });

                for (let i = 0; i < 3; i++) {
                    tmpData5 = [
                        ['Target:', data[data.length - 1].split(',')[4 + i * 3 + 0]].join(','),
                        ['Actual:', data[data.length - 1].split(',')[4 + i * 3 + 1]].join(','),
                        ['Growth:', data[data.length - 1].split(',')[4 + i * 3 + 2]].join(','),
                    ];
                    ppm.TableReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 4).toString(), tmpData5);
                    ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId + '_' + (i * 2 + 3).toString(), [data[data.length - 1].split(',')[4 + i * 3 + 1]]);
                }

                $('#Block1_3').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                        + '&' + encodeURI('Type=' + tType);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[1] + '?' + getStr);
                });

                $('#Block1_5').unbind().click(function () {
                    let tBu = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                    let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                    let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                    let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                    let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                    let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[5];
                    let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                    let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                        + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay)
                        + '&' + encodeURI('Type=' + tType);
                    window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[2] + '?' + getStr);
                });
                break;
            case 'QE_WORK':
                data = ppm.CheckDataCount(data, 7, 2);
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'QE_RTAC':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'QE_RTAR':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'QE_YR':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            case 'QE_YRC':
                ppm.ChartReport(tPageName, gPageObj.PageNameObj[tPageName].BlockId, data);
                break;
            default:
                break;
        }
    }
}

/**此class用於定義個專案的Part Page Search的區塊搜尋後的表單圖表渲染邏輯。
 * 以及定義Part Page Search需要額外的邏輯功能
 */
export class PPMake implements BlockReport {
    /**檢查搜尋結果的數量，若不足則自動補齊
     * @param {string[]} data 原完整搜尋結果陣列
     * @param {number} RowCount data應該的行數
     */
    CheckDataCount(data: string[], RowCount: number, CellCount: number): string[] {
        if (data.length == 0) { return data; }

        for (let i = 0, m = 0, k = 1; i < data.length && k < RowCount; i = m) {
            let tN: number = Number(data[i].split(',')[data[i].split(',').length - 1]);
            if (tN != k) {
                let tStr: string = '';
                for (let j = 1; j < CellCount; j++) { tStr += ','; }
                data.splice(i, 0, tStr + ',' + k.toString());
            }
            for (m = i + 1; m < data.length && k == Number(data[m].split(',')[data[m].split(',').length - 1]); m++) { }
            k++
        }

        return data;
    }

    /**OEE渲染
     * @param {string} tPageName 頁面名稱
     * @param {string} idName 渲染DOM ID
     * @param {string[]} data 原完整搜尋結果陣列
     */
    OEEReport(tPageName: string, IdName: string, data: string[]) {
        let DomId: string = IdName + '_1';
        if (data.length == 0) {
            document.getElementById(DomId)!.innerHTML = '';
            DomId = IdName + '_2';
            document.getElementById(DomId)!.innerHTML = '';
            return;
        }
        data = this.CheckDataCount(data, 7, 15);
        let htmlStr: string = '<div class="flex-1 flex-grow min-h-[calc((100vh-70px)*92/100*3/11)]" id="' + DomId + '_1"></div><div class="flex-1" id="' + DomId + '_2"></div>';
        let tmpData: string[] = [];
        document.getElementById(DomId)!.innerHTML = htmlStr;

        tmpData = [
            ['Target:', data[data.length - 1].split(',')[0]].join(','),
            ['Actual:', data[data.length - 1].split(',')[1]].join(','),
            ['Growth:', data[data.length - 1].split(',')[2]].join(','),
            ['EQ#:', data[data.length - 1].split(',')[3]].join(','),
        ];
        this.TableReport(tPageName, DomId + '_2', tmpData);
        this.ChartReport(tPageName, DomId + '_1', [data[data.length - 1].split(',')[1]]);

        DomId = IdName + '_2';
        htmlStr = '<div class="flex-1 flex flex-col"><div class="flex flex-grow min-h-[calc((100vh-70px)*92/100*2/11)]" id="' + DomId + '_1_1"></div><div id="' + DomId + '_1_2"></div></div>'
            + '<div class="flex-1 flex flex-col"><div class="flex flex-grow min-h-[calc((100vh-70px)*92/100*2/11)]" id="' + DomId + '_2_1"></div><div id="' + DomId + '_2_2"></div></div>'
            + '<div class="flex-1 flex flex-col"><div class="flex flex-grow min-h-[calc((100vh-70px)*92/100*2/11)]" id="' + DomId + '_3_1"></div><div id="' + DomId + '_3_2"></div></div>';

        document.getElementById(DomId)!.innerHTML = htmlStr;

        for (let i = 0; i < 3; i++) {
            tmpData = [
                ['Target:', data[data.length - 1].split(',')[4 + i * 3 + 0]].join(','),
                ['Actual:', data[data.length - 1].split(',')[4 + i * 3 + 1]].join(','),
            ];
            this.TableReport(tPageName, DomId + '_' + (i + 1).toString() + '_2', tmpData);
            this.ChartReport(tPageName, DomId + '_' + (i + 1).toString() + '_1', [data[data.length - 1].split(',')[4 + i * 3 + 1]]);
        }

        DomId = IdName + '_3';
        tmpData = JSON.parse(JSON.stringify(data));
        tmpData = tmpData.map(item => {
            let tArr: string[] = item.split(',');
            return tArr[1] + ',' + tArr[0] + ',' + tArr[5] + ',' + tArr[11] + ',' + tArr[13] + ',' + tArr[14]
        });
        this.ChartReport(tPageName, DomId, tmpData);

        //URL寫在這是因為DOM ID在這個CALL才會存在
        let tIdx = parseInt(IdName.substring(5, 6));
        let buArr: string[] = ['CP', 'LCD', 'FT', 'DS'];
        let URLArr: string[] = ['AE', 'PE', 'QE'];
        let tBu = buArr[tIdx - 1];
        for (let j = 0; j < URLArr.length; j++) {
            if (tBu == 'DS' && j == 2) { continue; }
            $('#Block' + tIdx.toString() + '_2_' + (j + 1).toString() + '_1').unbind().click(function () {
                let tMode = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0];
                let tYear = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[1];
                let tMonth = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[2];
                let tWeek = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[3];
                let tDay = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[4];
                let tType = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6] == '8@12' ? '' : gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[6];
                let getStr: string = encodeURI('BU=' + tBu) + '&' + encodeURI('區間=' + tMode) + '&' + encodeURI('年=' + tYear)
                    + '&' + encodeURI('月=' + tMonth) + '&' + encodeURI('週=' + tWeek) + '&' + encodeURI('日=' + tDay) + '&' + encodeURI('Type=' + tType);
                window.open('http://192.168.5.141:83/OEE/HOME/' + URLArr[j] + '?' + getStr);
            });
        }
    }

    TableReport(tPageName: string, IdName: string, data: string[]): void {
        if (data.length == 0) {
            document.getElementById(IdName)!.innerHTML = '';
            return;
        }
        let ps = new PageSet();
        let HeadArr = ps.MakeTableTitle(new Array(), tPageName);
        let tAttitute = '';
        let TableObj: { [key: string]: any } = {};
        if (tPageName == 'PE_TTAD' || tPageName == 'PE_DSUAD') {
            tAttitute = 'height:100%;width:100%;';
            TableObj = {
                scrollY: '25vh',
                scrollX: false,
                autoWidth: false,
                searching: false,
                paging: false,
                bInfo: false,
                ordering: false
            }
        }
        else {
            tAttitute = 'height:100%;width:100%;';
        }
        if ((tPageName.indexOf('OEE') > -1 && IdName != 'Block1_3' && IdName != 'Block2_3' && IdName != 'Block3_3' && IdName != 'Block4_3')
            || tPageName.indexOf('CIRCLE') > -1) {
            HeadArr = [];
        }
        let htmlStr = this.CreatReadWriteTable(tPageName, data, tAttitute, HeadArr, IdName);

        let tDom = document.getElementById(IdName);
        if (tDom) {
            tDom.innerHTML = htmlStr;
        }
        if (tPageName == 'PE_TTAD' || tPageName == 'PE_DSUAD') {
            let t = $('#' + tPageName + '_Table').DataTable(TableObj);
        }

        ps.MergeTableValue(IdName);
        this.ColorMergeCell(tPageName);
    }

    ChartReport(tPageName: string, IdName: string, data: string[]): void {
        this.MakeChart(tPageName, data, IdName);
    }

    CreatTableTitle(tPageName: string, DomName: string, ExtraFieldArr: string[], TitleArr: string[][], BkColorArr?: string[][], IdName?: string): string {
        let tmpTitleArr = new Array();
        for (let i = 0; i < TitleArr.length; i++) {
            let tttArr = new Array();
            for (let j = 0; j < TitleArr[i].length; j++) { tttArr.push(TitleArr[i][j]); }
            tmpTitleArr.push(tttArr);
        }
        let LineNode = ''
        if (DomName == 'thead') { LineNode = 'th'; }
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
                    for (c = j + 1; c < tmpTitleArr[i].length && c < SameIdxArr[sIdx] && tmpTitleArr[i][j] == tmpTitleArr[i][c]; col++, c++) { tmpTitleArr[i][c] = '#'; }
                    if (c == SameIdxArr[sIdx]) {
                        sIdx++;
                    }
                    for (r = i + 1; r < tmpTitleArr.length && tmpTitleArr[i][j] == tmpTitleArr[r][j]; row++, r++) {
                        for (let k = j + 1; j < tmpTitleArr[r].length && tmpTitleArr[r][j] == tmpTitleArr[r][k]; k++) { tmpTitleArr[r][k] = '#'; }
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
                for (let k = 0; i == 0 && k < ExtraFieldArr.length; k++) { TitleHtml += '<' + LineNode + ' rowspan="' + tmpTitleArr.length + '">' + ExtraFieldArr[k] + '</' + LineNode + '>'; }
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

    CreatReadWriteTable(tPageName: string, data: string[], AttributeStr: string, TitleArr: string[][], IdName?: string): string {
        let vd = new ValueDisplay();
        let tFieldArr: string[] = [];
        let TableId = tPageName + '_Table';
        let htmlStr = '';
        htmlStr += '<table id="' + TableId + '" class="whitespace-nowrap ' + (tPageName == 'PE_TTAD' || tPageName == 'PE_DSUAD' ? 'table table-bordered ' + TableId : TableId) + '" style="' + AttributeStr + '">';
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
                    if (tArr.length > 1) { tmpArr[j] = tArr[0]; }
                }
                let tmpStr = tmpArr[j].replace('%', '');
                let InnStr = vd.NeedModifyDisplay(tFieldArr[j], tmpArr[j], tPageName, isNaN(Number(tmpRowTitle)) ? tmpRowTitle : undefined);

                let ColorHtml = cr.CheckColorRule(i, j);
                ColorHtml += ColorHtml != '' ? 'font-weight:bold;' : '';

                let AttributeStr = '';
                if (hrefUrl != '') {
                    AttributeStr = 'href="' + hrefUrl + '" class="magic-btn" style="cursor: pointer;font-weight:bold;color:black" target="_blank"';
                    InnStr = '<a ' + AttributeStr + '>' + InnStr + '</a>'
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

    MakeWidthAttributeStr(tPageName: string, InputFieldName: string, StyleAttr: string): string {
        return '';
    }

    MakeListHtml(Dom: string, AttributeStr: string, ValueArr: string[], SelectValue?: string | undefined): string {
        return '';
    }

    MakeOptionHtml(ValueArr: string[], SelectValue?: string | undefined): string {
        return '';
    }

    MakeChart(tPageName: string, data: string[], IdName?: string): void {
        if (IdName != null) {
            let dom = document.getElementById(IdName) as HTMLDivElement;
            if (dom == null) { return; }

            let myChart = echarts.init(dom);
            let option = this.ChartsOption(tPageName, data, IdName);

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            /*if (tPageName.indexOf('OEE') == 0) {
                PPIChart.push(myChart);
            }*/
        }
    }

    InitSearchArea(tPageName: string, IdName?: string): void {

    }

    /**給合併儲存格後的表格上色(只針對有合併的範圍) */
    ColorMergeCell(tPageName: string): void {
        let TableInf: {
            [tPageName: string]: {
                TitleColor: string,
                CheckRange: number,//合併儲存格的範圍，需與MergeTableValue定義的範圍一樣
                BackgroundColor: string,//cell的背景顏色
                TurnColor?: string,//是否需間格替換顏色，有則間格此顏色，無則不需替換
            }
        } = {
            PE_TTAD: {
                TitleColor: 'rgb(0,176,80)',
                CheckRange: 11,
                BackgroundColor: 'rgb(226,239,217)',
                TurnColor: 'rgb(223, 224, 226)'
            },
            PE_DSUAD: {
                TitleColor: 'rgb(0,176,80)',
                CheckRange: 5,
                BackgroundColor: 'rgb(226,239,217)',
                TurnColor: 'rgb(223, 224, 226)'
            },
        };

        if (TableInf[tPageName]) {
            let TableIdName = tPageName + '_Table';
            let t = $('#' + TableIdName + ' tbody tr');
            if (TableInf[tPageName].TitleColor != null && TableInf[tPageName].TitleColor != '') {
                $('.' + TableIdName + ' thead tr').css('background-color', TableInf[tPageName].TitleColor);
            }

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

    static ClickReport(TitleStr: string, TableIdName: string): void {
        document.getElementById('mySmallModalLabel')!.innerHTML = TitleStr;
        let TableInnerHtml = document.getElementById(TableIdName)!.innerHTML || '';
        let Attitude = 'table-layout:fixed;height:100%;width:100%;';
        if (TableIdName.indexOf('Hidden') > -1) {
            //Attitude += 'background-color:rgb(223, 224, 226);color:black;border: 1px solid black;';
        }
        TableInnerHtml = '<table id="IndexAlertTable" class="table table-bordered ' + TableIdName + '" style="' + Attitude + '">' + TableInnerHtml + '</table>'
        document.getElementById('AlertText')!.innerHTML = TableInnerHtml;
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
            }
            let t = $('#IndexAlertTable').DataTable(TableObj);
        }
    }

    /**初始化個區塊的搜尋Menu
     * @param {string} tPageName 頁面名稱
     */
    static InitBlockMenu(tPageName: string) {
        /**定義各PageName中的Search Area所需要的Menu */
        type MenuObj = {
            /**PageName */
            [PageName: string]: {
                /**MenuName*/
                [MenuName: string]: {
                    /**此Menu所在的Dom ID */
                    DomId: string,
                    /**此Menu的預設值 */
                    DefaultValue: string,
                    /**此Menu會觸法重新搜尋的PageName */
                    EventPageName: string[],
                    /**若URL參數那些欄位有預設值，則不初始化。因為已在搜尋BAR初始化時初始化 */
                    UrlNoInit?: string[]
                }
            }
        }
        let MenuInf: MenuObj = {
            OEEIndex: {
                CP_TYPE: {
                    DomId: 'Block1_Search',
                    DefaultValue: '',
                    EventPageName: ['OEE_CP']
                },
                LCD_TYPE: {
                    DomId: 'Block2_Search',
                    DefaultValue: '',
                    EventPageName: ['OEE_LCD']
                },
                FT_TYPE: {
                    DomId: 'Block3_Search',
                    DefaultValue: 'Tray',
                    EventPageName: ['OEE_FT']
                },
                DS_TYPE: {
                    DomId: 'Block4_Search',
                    DefaultValue: '挑檢',
                    EventPageName: ['OEE_DS']
                }
            },
            AEIndex: {
                ITEM: {
                    DomId: 'Block3_Search',
                    DefaultValue: 'ABNOR',
                    EventPageName: ['AE_RAM', 'AE_CTA', 'AE_CHTA'],
                    UrlNoInit: ['BU']
                },
                CH_TYPE: {
                    DomId: 'Block5_Search',
                    DefaultValue: 'Cust',
                    EventPageName: ['AE_CHTA'],
                    UrlNoInit: ['BU']
                },
            },
            PEIndex: {
                TTA_TYPE: {
                    DomId: 'Block6_Search',
                    DefaultValue: 'Test Time',
                    EventPageName: ['PE_TTAD']
                },
            }
        }

        let pm = new PageMake();
        let ps = new PageSet();
        let pt = new PageTool();
        let UrlGetObj = pt.UrlGetVariable();

        if (MenuInf[tPageName]) {
            Object.keys(MenuInf[tPageName]).forEach((key) => {
                let jump = false;
                for (let i = 0; MenuInf[tPageName][key].UrlNoInit != null && i < MenuInf[tPageName][key].UrlNoInit!.length; i++) {
                    if (UrlGetObj[MenuInf[tPageName][key].UrlNoInit![i]] != null) {
                        jump = true;
                        break;
                    }
                }

                if (MenuList[key] != null) {
                    if (!jump) {
                        let tmpSelectList = ps.GetListArr(tPageName, key, true);
                        let AttrStr = pm.MakeWidthAttributeStr(tPageName, key, '', 'Search');
                        let htmlStr = pm.MakeListHtml('select', AttrStr, tmpSelectList, MenuInf[tPageName][key].DefaultValue);
                        document.getElementById(MenuInf[tPageName][key].DomId)!.innerHTML = htmlStr;
                    }

                    $('#' + MenuInf[tPageName][key].DomId).unbind().change(function () {
                        let pps = new PPSearch();
                        MenuInf[tPageName][key].EventPageName.forEach(function (value) {
                            pps.BlockSearch(value);
                        });
                    });
                }
            });
        }

        for (let i = 0; $('#field_' + i.toString()).html() != null; i++) {
            $('#field_' + i.toString()).unbind().change(function () {
                $(this).selectpicker('refresh');
                if (tPageName == 'OEEIndex') {
                    PPSearch.PageSearch();
                }
            });
        }

        $('.selectpicker').selectpicker();//可搜尋下拉式初始化
    }

    ChartsOption(tPageName: string, data: string[] | { [key: string]: string }[], idName?: string): any {
        if (gPageObj.PageNameObj[tPageName] == null) { return {}; }
        let option: any = {};
        let tdata: number[][] = [];
        let tmpTitle = new Array();
        let tHavePersent: boolean[] = [];//紀錄每一行是否含有%，且為數值
        let haveTitleAtFirst = true;
        let AllEmpty = true;//第一列是否全空值
        let vd = new ValueDisplay();

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
            let tmpArr: string[] = typeof data[i] == 'string' ? (data[i] as string).split(',') : gPageObj.PageNameObj[tPageName].LineDataObjToArray(data[i]);
            let newtdata: number[] = [];
            if (haveTitleAtFirst) { tmpTitle.push(tmpArr[0]); }
            for (let j = haveTitleAtFirst ? 1 : 0; j < tmpArr.length; j++) {//跳過一開始的Title
                let tnStr: string = '';
                if (tmpArr[j].length > 0 && !isNaN(Number(tmpArr[j])) && vd.NeedMillionFormat(gPageObj.PageNameObj[tPageName].TitleStrArr[j], tPageName, tmpArr[0])) {
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

        if ((tPageName == 'OEE_CP' || tPageName == 'OEE_LCD' || tPageName == 'OEE_FT' || tPageName == 'OEE_DS')
            && (idName != null && (idName.indexOf('Block1_1') > -1 || idName.indexOf('Block2_1') > -1 || idName.indexOf('Block3_1') > -1 || idName.indexOf('Block4_1') > -1
                || idName.indexOf('Block1_2') > -1 || idName.indexOf('Block2_2') > -1 || idName.indexOf('Block3_2') > -1 || idName.indexOf('Block4_2') > -1))) {
            let tmpTArr: string[] = ['AE', 'PE', 'QE'];
            let tPersent = tdata[0][0];
            let tTarget = 100 - tPersent > 0 ? 100 - tPersent : 0;
            let tActual = tPersent;
            let max1 = 0;
            let max2 = 0;
            let range1 = max1 / 10;
            let range2 = max2 / 10;
            option = {
                tooltip: {
                    show: false,
                },
                legend: {
                    show: false
                },
                label: {
                    formatter: function (params: any) {
                        let vd = new ValueDisplay();
                        let tttStr: string = '';
                        if (idName.indexOf('Block1_1') > -1 || idName.indexOf('Block2_1') > -1 || idName.indexOf('Block3_1') > -1 || idName.indexOf('Block4_1') > -1) {
                            tttStr = 'OEE';
                        }
                        else {
                            tttStr = tmpTArr[Number(idName.substring(9, 10)) - 1];
                        }
                        return vd.NeedModifyDisplay('', params.name, tPageName, 'Actual:') + '\r\n' + tttStr;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        color: ['transparent'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                position: 'center',
                                color: '#000000',
                                fontSize: idName.indexOf('Block1_1') > -1 || idName.indexOf('Block2_1') > -1 || idName.indexOf('Block3_1') > -1 || idName.indexOf('Block4_1') > -1
                                    ? 30
                                    : 20,
                            }
                        },
                        data: [
                            {
                                value: 0,
                                name: tPersent,
                                label: {
                                    color: '#000000'
                                }
                            }
                        ]
                    },
                    {
                        color: [idName.indexOf('Block1_1') > -1 || idName.indexOf('Block2_1') > -1 || idName.indexOf('Block3_1') > -1 || idName.indexOf('Block4_1') > -1 ? '#FF2D2D' : '#38AC26', 'rgb(217,217,217)'],
                        type: 'pie',
                        radius: ['60%', '90%'],
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: tActual,
                                name: 'Actual',
                                label: {
                                    normal: {
                                        show: false
                                    }
                                },
                            },
                            {
                                value: tTarget,
                                name: 'Target',
                                label: {
                                    normal: {
                                        show: false
                                    }
                                },
                            }
                        ]
                    }]
            };
        }
        else if ((tPageName == 'OEE_CP' || tPageName == 'OEE_LCD' || tPageName == 'OEE_FT' || tPageName == 'OEE_DS')
            && idName != null && (idName.indexOf('Block1_3') > -1 || idName.indexOf('Block2_3') > -1 || idName.indexOf('Block3_3') > -1 || idName.indexOf('Block4_3') > -1)) {
            let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr
            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tTitle: string[] = ['OEE', 'OEE Target', 'AE', 'QE', 'OE', 'RE'];
            let tColor: string[] = ['#38AC26', 'red', 'blue', 'black', 'rgb(112,48,160)', 'rgb(239,99,229)'];
            let tValue: number[][] = [[], [], [], [], [], []];
            let tSeries: any[] = [];

            for (let i = 0; i < tdata.length; i++) {
                for (let j = 0; j < tTitle.length; j++) {
                    tValue[j].push(tdata[i][j]);
                }
            }

            tTitle.forEach(function (item, idx) {
                let tObj: any = {
                    name: item,
                    type: idx == 0 ? 'bar' : 'line',
                    itemStyle: {
                        normal: {
                            color: tColor[idx]
                        }
                    },
                    data: tValue[idx]
                };
                if (idx == 1) {
                    tObj['lineStyle'] = {
                        type: 'dashed'
                    }
                }
                tSeries.push(tObj);
            });

            option = {
                grid: {
                    top: 15,
                    bottom: 45
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
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName.indexOf('CIRCLE') > -1 && idName != null) {
            let tPersent = tdata[0][0];
            let tTarget = 100 - tPersent > 0 ? 100 - tPersent : 0;
            let tActual = tPersent;
            let tmpTArr: string[] = ['OEE', 'AE', 'PE', 'QE'];
            option = {
                tooltip: {
                    show: false,
                },
                legend: {
                    show: false
                },
                label: {
                    formatter: function (params: any) {
                        let vd = new ValueDisplay();
                        return vd.NeedModifyDisplay('', params.name, tPageName, 'Actual:') + '\r\n' + tmpTArr[parseInt((parseInt(idName.substring(7, 8)) / 2).toString())];
                    }
                },
                series: [
                    {
                        type: 'pie',
                        color: ['transparent'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                position: 'center',
                                color: '#000000',
                                fontSize: 20,
                            }
                        },
                        data: [
                            {
                                value: 0,
                                name: tPersent,
                                label: {
                                    color: '#000000'
                                }
                            }
                        ]
                    },
                    {
                        color: [parseInt((parseInt(idName.substring(7, 8)) / 2).toString()) == 0 ? '#FF2D2D' : '#38AC26', 'rgb(217,217,217)'],
                        type: 'pie',
                        radius: ['60%', '90%'],
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: tActual,
                                name: 'Actual',
                                label: {
                                    normal: {
                                        show: false
                                    }
                                },
                            },
                            {
                                value: tTarget,
                                name: 'Target',
                                label: {
                                    normal: {
                                        show: false
                                    }
                                },
                            }
                        ]
                    }]
            };
        }
        else if (tPageName == 'AE_EQP' || tPageName == 'AE_DSEQP') {
            let ChartInf: any = {
                'WORK(稼動率)': {
                    Color: 'rgb(0,128,0)',
                    isLine: false,
                    ShowBottom: true
                },
                'LOSS': {
                    Color: 'rgb(255,255,204)',
                    isLine: false,
                    ShowBottom: false
                },
                'LEND': {
                    Color: 'rgb(0,255,255)',
                    isLine: false,
                    ShowBottom: false
                },
                'CORR': {
                    Color: 'rgb(255,153,0)',
                    isLine: false,
                    ShowBottom: false
                },
                'SETUP_W': {
                    Color: 'rgb(255,102,204)',
                    isLine: false,
                    ShowBottom: false
                },
                'SETUP': {
                    Color: 'rgb(255,0,255)',
                    isLine: false,
                    ShowBottom: false
                },
                'ABNOR_W': {
                    Color: 'rgb(255,255,102)',
                    isLine: false,
                    ShowBottom: false
                },
                'ABNOR': {
                    Color: 'rgb(255,255,0)',
                    isLine: false,
                    ShowBottom: false
                },
                'PM': {
                    Color: 'rgb(0,0,255)',
                    isLine: false,
                    ShowBottom: false
                },
                'DOWN': {
                    Color: 'rgb(255,0,0)',
                    isLine: false,
                    ShowBottom: false
                },
                'NS': {
                    Color: 'rgb(166,166,166)',
                    isLine: false,
                    ShowBottom: false
                },
                '可用率(AE)': {
                    Color: 'rgb(102,0,204)',
                    isLine: true,
                    ShowBottom: true
                },
                'PROCESS(稼動率)': {
                    Color: 'rgb(0,128,0)',
                    isLine: false,
                    ShowBottom: false
                },
                'LOSS-WIP': {
                    Color: 'rgb(255,255,204)',
                    isLine: false,
                    ShowBottom: false
                },
                'LOSS-MEN': {
                    Color: 'rgb(255,255,204)',
                    isLine: false,
                    ShowBottom: false
                },
                'ENG': {
                    Color: 'rgb(0,255,255)',
                    isLine: false,
                    ShowBottom: false
                },
                'SD-SETUP': {
                    Color: 'rgb(255,0,255)',
                    isLine: false,
                    ShowBottom: false
                },
                'SD-PM': {
                    Color: 'rgb(0,0,255)',
                    isLine: false,
                    ShowBottom: false
                },
            }

            let ItemObj: any = {};
            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                if (ChartInf[tmpTitle[i]] != null) {
                    for (let j = 0; j < tdata[i].length; j++) {
                        if (ItemObj[tmpTitle[i]] != null) {
                            ItemObj[tmpTitle[i]].push(tdata[i][j]);
                        }
                        else {
                            ItemObj[tmpTitle[i]] = [tdata[i][j]];
                        }
                    }
                }
                else {
                    console.log(tmpTitle[i]);
                }
            }

            let max1 = 0;

            for (let i = 0; i < tmpTitle.length; i++) {
                if (ChartInf[tmpTitle[i]] != null) {
                    let tmpObj: any = {
                        name: tmpTitle[i],
                        type: ChartInf[tmpTitle[i]].isLine ? 'line' : 'bar',
                        yAxisIndex: 0,
                        barGap: '0%',
                        itemStyle: {
                            color: ChartInf[tmpTitle[i]].Color
                        },
                        z: 2,
                        data: ItemObj[tmpTitle[i]]
                    };
                    if (!ChartInf[tmpTitle[i]].isLine) {
                        tmpObj['stack'] = '總數';
                    }
                    if (ChartInf[tmpTitle[i]].ShowBottom) {
                        tmpObj['label'] = {
                            show: true,
                            position: 'insideBottom'
                        };
                    }
                    tSeries.push(tmpObj);
                    max1 = Math.max(max1, ...ItemObj[tmpTitle[i]]);
                }
            }

            let rank = 5;
            if (max1 < 100) { max1 = 100; }
            else { max1 = GetDataUpLimit(max1); }
            let range1 = max1 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 15,
                    left: 60
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial',
                        align: 'left'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'AE_CTA') {
            let tTop10Color = ['#E65100', '#EF6C00', '#F57C00', '#FB8C00', '#FF9800', '#FFA726', '#FFB74D', '#FFCC80', '#FFE0B2', '#FFF3E0'];
            let ItemObj: any = {};
            let ItemArr: any[] = [];
            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];
            let tOtherArr: number[] = [0, 0, 0, 0, 0, 0, 0];
            let tTotalArr: number[] = [0, 0, 0, 0, 0, 0, 0];

            for (let i = 0, j = 0; i < tdata.length; i++) {
                if (data[i].toString().split(',')[1].trim() == '') { continue; }
                let tIdx: number = tdata[i][2] - 1;
                if (ItemObj[data[i].toString().split(',')[1].trim()]) {
                    ItemObj[data[i].toString().split(',')[1].trim()].Item[tIdx] = tdata[i][1];
                    ItemObj[data[i].toString().split(',')[1].trim()].Total += tdata[i][1];
                    ItemArr[ItemObj[data[i].toString().split(',')[1].trim()].ArrIdx].Item[tIdx] = tdata[i][1];
                    ItemArr[ItemObj[data[i].toString().split(',')[1].trim()].ArrIdx].Total += tdata[i][1];
                }
                else {
                    ItemObj[data[i].toString().split(',')[1].trim()] = {
                        Item: [0, 0, 0, 0, 0, 0, 0],
                        Total: tdata[i][1],
                        ArrIdx: j++
                    };
                    ItemObj[data[i].toString().split(',')[1].trim()].Item[tIdx] = tdata[i][1]
                    ItemArr.push({
                        Name: data[i].toString().split(',')[1].trim(),
                        Item: [0, 0, 0, 0, 0, 0, 0],
                        Total: tdata[i][1]
                    });
                    ItemArr[ItemArr.length - 1].Item[tIdx] = tdata[i][1]
                }
            }

            ItemArr.sort(function (a: any, b: any) {
                return b.Total - a.Total;
            });

            for (let i = 0, k = 0; i < ItemArr.length; i++) {
                if (ItemArr[i].Name == 'RATE' || ItemArr[i].Name == 'Others') {
                    continue;
                }
                let tmpObj: any = {
                    name: ItemArr[i].Name,
                    type: 'bar',
                    yAxisIndex: 0,
                    barGap: '0%',
                    stack: '每日',
                    itemStyle: {
                        color: tTop10Color[k++]
                    },
                    z: 2,
                    data: ItemArr[i].Item
                };
                tSeries.push(tmpObj);
                ItemArr[i].Item.forEach((v: number, idx: number) => {
                    tTotalArr[idx] += v;
                });
            }

            if (ItemObj['Others']) {
                tSeries.push({
                    name: 'Others',
                    type: 'bar',
                    yAxisIndex: 0,
                    barGap: '0%',
                    stack: '每日',
                    itemStyle: {
                        color: tTop10Color[tTop10Color.length - 1]
                    },
                    z: 2,
                    data: ItemObj['Others'].Item
                });
            }

            if (ItemObj['RATE']) {
                tSeries.push({
                    name: 'Rate',
                    type: 'line',
                    yAxisIndex: 1,
                    itemStyle: {
                        color: 'red'
                    },
                    z: 2,
                    data: ItemObj['RATE'].Item
                });
            }

            let max1 = GetDataUpLimit(Math.max(...tTotalArr));
            let max2 = GetDataUpLimit(Math.max(...ItemObj['RATE'].Item));
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            let tmpTitleArr = new Array();
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: 60
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
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let tItemObj: any = {};
                        let tItemArr: any[] = []
                        for (let i = 0; i < params.length; i++) {
                            tItemObj[params[i].seriesName] = {
                                marker: params[i].marker,
                                value: params[i].value
                            };
                            tItemArr.push({
                                name: params[i].seriesName,
                                marker: params[i].marker,
                                value: params[i].value
                            });
                        }

                        tItemArr.sort(function (a: any, b: any) {
                            return b.value - a.value;
                        });

                        for (let i = 0; i < tItemArr.length; i++) {
                            if (tItemArr[i].name != 'Others' && tItemArr[i].name != 'Rate') {
                                res += '<br>' + tItemArr[i].marker + tItemArr[i].name + ' : ' + tItemArr[i].value;
                            }
                        }

                        if (tItemObj['Others']) {
                            res += '<br>' + tItemObj['Others'].marker + 'Others : ' + tItemObj['Others'].value;
                        }
                        if (tItemObj['Rate']) {
                            let tmpValue = tItemObj['Rate'].value;
                            tmpValue = vd.NeedModifyDisplay('Rate', tmpValue, tPageName, params[0].name);
                            res += '<br>' + tItemObj['Rate'].marker + 'Rate : ' + tmpValue;
                        }

                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'AE_DSCTA') {
            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tItemInf: any[] = [
                {
                    Name: '占百分比',
                    Color: 'red',
                    Item: [0, 0, 0, 0, 0, 0, 0]
                },
                {
                    Name: '次數',
                    Color: 'rgb(252,138,12)',
                    Item: [0, 0, 0, 0, 0, 0, 0]
                },
            ];
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                let tIdx: number = tdata[i][2] - 1;
                for (let j = 0; j < tdata[i].length && j < tItemInf.length; j++) {
                    if (data[i].toString().split(',')[j] != '') {
                        tItemInf[j].Item[tIdx] = tdata[i][j];
                    }
                }
            }

            for (let i = 0; i < tItemInf.length; i++) {
                let tmpObj: any = {
                    name: tItemInf[i].Name,
                    type: i > 0 ? 'bar' : 'line',
                    yAxisIndex: i > 0 ? 0 : 1,
                    barGap: '0%',
                    itemStyle: {
                        color: tItemInf[i].Color
                    },
                    z: 2,
                    data: tItemInf[i].Item
                };
                tSeries.push(tmpObj);
            }

            let max1 = GetDataUpLimit(Math.max(...tItemInf[1].Item));
            let max2 = GetDataUpLimit(Math.max(...tItemInf[0].Item));
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: 60
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
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'AE_RAM') {
            let tColorArr: string[] = ['rgb(142,180,227)', 'blue', 'rgb(255,0,0)'];
            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];
            let tDObj: any = {};
            for (let i = 0; i < xTitle.length; i++) {
                tDObj[xTitle[i]] = [];
            }

            for (let i = 3; i < data.length; i++) {
                let tmpArr: string[] = (data[i] as string).split(',');
                for (let j = 0; j < tmpArr.length; j++) {
                    if (tmpArr[j] != '') {
                        tDObj[xTitle[j]].push('<span style="float:left">' + tmpArr[j].replace(':', ' : </span><span style="float:right">') + '</span>');
                    }
                }
            }

            for (let i = 0; i < tdata.length && i < 3; i++) {
                let tmpObj: any = {
                    name: tmpTitle[i],
                    type: i > 0 ? 'line' : 'bar',
                    yAxisIndex: i > 0 ? 1 : 0,
                    barGap: '0%',
                    itemStyle: {
                        color: tColorArr[i]
                    },
                    z: 2,
                    data: tdata[i]
                };
                tSeries.push(tmpObj);
            }

            let max1 = GetDataUpLimit(Math.max(...tdata[0]));
            let max2 = GetDataUpLimit(Math.max(...tdata[1], ...tdata[2]));
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: 60
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
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        res += '<br>' + tDObj[params[0].name].join('<br>');
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}hrs'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}hrs'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'AE_DSRAM') {
            let tColorArr: string[] = ['rgb(142,180,227)', 'blue'];
            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];
            let tDObj: any = {};
            for (let i = 0; i < xTitle.length; i++) {
                tDObj[xTitle[i]] = [];
            }

            for (let i = 2; i < data.length; i++) {
                let tmpArr: string[] = (data[i] as string).split(',');
                for (let j = 0; j < tmpArr.length; j++) {
                    if (tmpArr[j] != '') {
                        tDObj[xTitle[j]].push('<span style="float:left">' + tmpArr[j].replace(':', ' : </span><span style="float:right">') + '</span>');
                    }
                }
            }

            for (let i = 0; i < tdata.length && i < 2; i++) {
                let tmpObj: any = {
                    name: tmpTitle[i],
                    type: i > 0 ? 'line' : 'bar',
                    yAxisIndex: i > 0 ? 1 : 0,
                    barGap: '0%',
                    itemStyle: {
                        color: tColorArr[i]
                    },
                    z: 2,
                    data: tdata[i]
                };
                tSeries.push(tmpObj);
            }

            let max1 = GetDataUpLimit(Math.max(...tdata[0]));
            let max2 = GetDataUpLimit(Math.max(...tdata[1]));
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: 60
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
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        res += '<br>' + tDObj[params[0].name].join('<br>');
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}hrs'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}hrs'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'AE_CHTA' || tPageName == 'AE_DSCHTA') {
            let tSeries: any = [];
            let tmpObj: any = {
                name: '',
                type: 'bar',
                xyAxisIndex: 0,
                barGap: '0%',
                itemStyle: {
                    color: 'rgb(0,128,0)'
                },
                z: 2,
                data: []
            };

            for (let i = 0; i < tdata.length; i++) {
                tmpObj.data.push(tdata[i][0]);
            }

            tSeries.push(tmpObj);

            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 15,
                    left: gPageObj.PageNameObj[tPageName].LastQuery.QueryArr[0] != 'DS' ? 100 : 60
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
                    },
                },
                xAxis: [
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'Arial',
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        inverse: true,
                        type: 'category',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        axisLabel: {
                            formatter: function (value: any) {
                                return value.toString().length > 10
                                    ? value.toString().substring(0, 10) + '...'
                                    : value.toString();
                            }
                        },
                        data: tmpTitle
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'PE_OE') {
            let ChartInf: any = {
                'WORK': {
                    Color: 'rgb(0,128,0)',
                },
                'LOSS': {
                    Color: 'rgb(255,255,204)',
                },
                'LEND': {
                    Color: 'rgb(0,255,255)',
                },
            }
            let ValueInf: any = [
                {
                    Name: 'WORK',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: 'LOSS',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: 'LEND',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                }
            ]
            let tTotalArr: number[] = [];

            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                let tTotal: number = 0;
                for (let j = 0; j < tdata[i].length && j < ValueInf.length; j++) {
                    ValueInf[j].Arr[tdata[i][3] - 1] = tdata[i][j];
                    tTotal += tdata[i][j];
                }
                tTotalArr.push(tTotal);
            }

            for (let i = 0; i < ValueInf.length; i++) {
                let tmpObj: any = {
                    name: ValueInf[i].Name,
                    type: 'bar',
                    yAxisIndex: 0,
                    barGap: '0%',
                    stack: '每日',
                    itemStyle: {
                        color: ChartInf[ValueInf[i].Name].Color
                    },
                    z: 2,
                    data: ValueInf[i].Arr
                };
                tSeries.push(tmpObj);
            }

            tSeries.push({
                name: 'OE',
                type: 'line',
                yAxisIndex: 0,
                barGap: '0%',
                itemStyle: {
                    color: 'rgb(102,0,204)'
                },
                z: 2,
                data: ValueInf[0].Arr
            });

            let max1 = Math.max(...tTotalArr);
            let rank = 5;
            if (max1 < 100) { max1 = 100; }
            else { max1 = GetDataUpLimit(max1); }
            let range1 = max1 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 15,
                    left: 60
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial',
                        align: 'left'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'PE_DSOE') {
            let ChartInf: any = {
                'PROCESS': {
                    Color: 'rgb(0,128,0)',
                },
                'LOSS': {
                    Color: 'rgb(255,255,204)',
                },
                'ENG': {
                    Color: 'rgb(0,255,255)',
                },
            }
            let ValueInf: any = [
                {
                    Name: 'PROCESS',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: 'LOSS',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: 'ENG',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                }
            ]
            let tTotalArr: number[] = [];

            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                let tTotal: number = 0;
                for (let j = 0; j < tdata[i].length && j < ValueInf.length; j++) {
                    ValueInf[j].Arr[tdata[i][tdata[i].length - 1] - 1] = tdata[i][j];
                    tTotal += tdata[i][j];
                }
                tTotalArr.push(tTotal);
            }

            for (let i = 0; i < ValueInf.length; i++) {
                let tmpObj: any = {
                    name: ValueInf[i].Name,
                    type: 'bar',
                    yAxisIndex: 0,
                    barGap: '0%',
                    stack: '每日',
                    itemStyle: {
                        color: ChartInf[ValueInf[i].Name].Color
                    },
                    z: 2,
                    data: ValueInf[i].Arr
                };
                tSeries.push(tmpObj);
            }

            tSeries.push({
                name: 'OE',
                type: 'line',
                yAxisIndex: 0,
                barGap: '0%',
                itemStyle: {
                    color: 'rgb(102,0,204)'
                },
                z: 2,
                data: ValueInf[0].Arr
            });

            let max1 = Math.max(...tTotalArr);
            let rank = 5;
            if (max1 < 100) { max1 = 100; }
            else { max1 = GetDataUpLimit(max1); }
            let range1 = max1 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 15,
                    left: 60
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial',
                        align: 'left'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'PE_LEND_TAC' || tPageName == 'PE_LOSS_TAC' || tPageName == 'PE_DSLOSS_TAC'
            || tPageName == 'PE_DSLOSS_TAE' || tPageName == 'QE_RTAC' || tPageName == 'QE_RTAR') {
            let tTop10Color = ['#E65100', '#EF6C00', '#F57C00', '#FB8C00', '#FF9800', '#FFA726', '#FFB74D', '#FFCC80', '#FFE0B2', '#FFF3E0'];
            let tSData: any = [];
            for (let i = 0; i < tdata.length; i++) {
                tSData.push({
                    name: tmpTitle[i],
                    value: tdata[i],
                    itemStyle: {
                        color: tTop10Color[i]
                    }
                });
            }

            option = {
                grid: {
                    top: 15
                },
                tooltip: {
                    trigger: 'item',
                    valueFormatter: (value: any) => (value + (tPageName != 'QE_RTAR' ? '%' : ''))
                },
                series: [
                    {
                        type: 'pie',
                        radius: '85%',
                        data: tSData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            alignTo: 'edge',
                            formatter: function (params: any) {
                                let vd = new ValueDisplay();
                                return '{name|' + params.name + '}\n{value|' + vd.NeedModifyDisplay(tPageName, params.value, tPageName) + '}';
                            },
                            minMargin: 5,
                            edgeDistance: 10,
                            lineHeight: 15,
                            rich: {
                                name: {
                                    fontSize: 16,
                                },
                                value: {
                                    fontSize: 13,
                                }
                            }
                        },
                        labelLine: {
                            length: 8,
                            length2: 0,
                            maxSurfaceAngle: 80
                        },
                        labelLayout: function (params: any) {
                            const isLeft = params.labelRect.x < ($('#' + gPageObj.PageNameObj[tPageName].BlockId).width() || 0) / 2;
                            const points = params.labelLinePoints;
                            // Update the end point.
                            points[2][0] = isLeft
                                ? params.labelRect.x
                                : params.labelRect.x + params.labelRect.width;
                            return {
                                labelLinePoints: points
                            };
                        },
                    }
                ]
            };
        }
        else if (tPageName == 'PE_RE') {
            let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr
            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tOInfObj: { [name: string]: string[] } = {};
            for (let i = 0; i < xTitle.length; i++) {
                tOInfObj[xTitle[i]] = [];
            }
            let vd = new ValueDisplay();
            for (let i = 0; i < tdata.length; i++) {
                tOInfObj[xTitle[i]].push('正測RE : ' + vd.NeedModifyDisplay('正測RE', tdata[i][4].toString(), tPageName, '正測RE'));
            }
            let ChartInf: any = {
                '實際正測產出數': {
                    Color: 'rgb(142,180,227)',
                    isLine: false,
                },
                '標準正測產出數': {
                    Color: 'rgb(217,150,148)',
                    isLine: false,
                },
                'RE': {
                    Color: 'rgb(102,0,204)',
                    isLine: true,
                },
                '關Site率': {
                    Color: 'red',
                    isLine: true,
                },
            }
            let ValueInf: any = [
                {
                    Name: '實際正測產出數',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: '標準正測產出數',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: 'RE',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: '關Site率',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                }
            ]

            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                for (let j = 0; j < tdata[i].length && j < ValueInf.length; j++) {
                    ValueInf[j].Arr[tdata[i][tdata[i].length - 1] - 1] = tdata[i][j];
                }
            }

            for (let i = 0; i < ValueInf.length && ((LastQuery[0] == 'FT' && i < 4) || i < 3); i++) {
                let tmpObj: any = {
                    name: ValueInf[i].Name,
                    type: ChartInf[ValueInf[i].Name].isLine ? 'line' : 'bar',
                    yAxisIndex: ChartInf[ValueInf[i].Name].isLine ? 1 : 0,
                    barGap: '0%',
                    itemStyle: {
                        color: ChartInf[ValueInf[i].Name].Color
                    },
                    z: 2,
                    data: ValueInf[i].Arr
                };
                tSeries.push(tmpObj);
            }

            let max1 = GetDataUpLimit(Math.max(...ValueInf[0].Arr, ...ValueInf[1].Arr));
            let max2 = GetDataUpLimit(Math.max(...ValueInf[2].Arr, ...ValueInf[3].Arr));
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: max1.toString().length >= 7 ? 75 : 60
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
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        res += '<br>' + (tOInfObj[params[0].name] ? tOInfObj[params[0].name] : []).join('<br>');
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'PE_DSRE') {
            let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr
            let ChartInf: any = {
                '實際產出數': {
                    Color: 'rgb(142,180,227)',
                    isLine: false,
                },
                '標準產出數': {
                    Color: 'rgb(217,150,148)',
                    isLine: false,
                },
                'RE': {
                    Color: 'rgb(102,0,204)',
                    isLine: true,
                },
                '關Site率': {
                    Color: 'red',
                    isLine: true,
                },
            }
            let ValueInf: any = [
                {
                    Name: '實際產出數',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: '標準產出數',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: 'RE',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    Name: '關Site率',
                    Arr: [0, 0, 0, 0, 0, 0, 0],
                }
            ]

            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                for (let j = 0; j < tdata[i].length && j < ValueInf.length; j++) {
                    ValueInf[j].Arr[tdata[i][tdata[i].length - 1] - 1] = tdata[i][j];
                }
            }

            for (let i = 0; i < ValueInf.length && ((LastQuery[0] == 'FT' && i < 4) || i < 3); i++) {
                let tmpObj: any = {
                    name: ValueInf[i].Name,
                    type: ChartInf[ValueInf[i].Name].isLine ? 'line' : 'bar',
                    yAxisIndex: ChartInf[ValueInf[i].Name].isLine ? 1 : 0,
                    barGap: '0%',
                    itemStyle: {
                        color: ChartInf[ValueInf[i].Name].Color
                    },
                    z: 2,
                    data: ValueInf[i].Arr
                };
                tSeries.push(tmpObj);
            }

            let max1 = GetDataUpLimit(Math.max(...ValueInf[0].Arr, ...ValueInf[1].Arr));
            let max2 = GetDataUpLimit(Math.max(...ValueInf[2].Arr, ...ValueInf[3].Arr));
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: max1.toString().length >= 7 ? 75 : 60
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
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'QE_WORK') {
            let ChartInf: any = {
                'WORK': {
                    Color: '#38AC26',
                },
                'WORK_RT': {
                    Color: 'rgb(146,208,80)',
                },
            }
            let ValueInf: any = [
                {
                    Name: 'WORK',
                    Arr: [0, 0, 0, 0, 0, 0],
                },
                {
                    Name: 'WORK_RT',
                    Arr: [0, 0, 0, 0, 0, 0],
                },
            ]
            let tTotalArr: number[] = [];

            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                let tTotal: number = 0;
                for (let j = 0; j < tdata[i].length && j < ValueInf.length; j++) {
                    ValueInf[j].Arr[tdata[i][tdata[i].length - 1] - 1] = tdata[i][j];
                    tTotal += tdata[i][j];
                }
                tTotalArr.push(tTotal);
            }

            for (let i = 0; i < ValueInf.length; i++) {
                let tmpObj: any = {
                    name: ValueInf[i].Name,
                    type: 'bar',
                    yAxisIndex: 0,
                    barGap: '0%',
                    stack: '每日',
                    itemStyle: {
                        color: ChartInf[ValueInf[i].Name].Color
                    },
                    z: 2,
                    data: ValueInf[i].Arr
                };
                tSeries.push(tmpObj);
            }

            tSeries.push({
                name: 'WORK_RT',
                type: 'line',
                yAxisIndex: 0,
                barGap: '0%',
                itemStyle: {
                    color: 'rgb(102,0,204)'
                },
                z: 2,
                data: ValueInf[1].Arr
            });

            let max1 = Math.max(...tTotalArr);
            let rank = 5;
            if (max1 < 100) { max1 = 100; }
            else { max1 = GetDataUpLimit(max1); }
            let range1 = max1 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 15,
                    left: 60
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial',
                        align: 'left'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'QE_YR') {
            let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr
            let ChartInf: any = {
                'First Yield': {
                    Color: 'rgb(217,150,148)',
                    isLine: false,
                },
                'Final Yield': {
                    Color: 'rgb(142,180,227)',
                    isLine: false,
                },
                'Yield Gap': {
                    Color: 'rgb(102,0,204)',
                    isLine: true,
                },
                'Recover Rate': {
                    Color: '#38AC26',
                    isLine: true,
                },
            }
            let ValueInf: any = [
                {
                    Name: 'First Yield',
                    Arr: [],
                },
                {
                    Name: 'Final Yield',
                    Arr: [],
                },
                {
                    Name: 'Yield Gap',
                    Arr: [],
                },
                {
                    Name: 'Recover Rate',
                    Arr: [],
                },
            ]

            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                for (let j = 0; j < tdata[i].length; j++) {
                    ValueInf[i].Arr.push(tdata[i][j]);
                }
            }

            for (let i = 0; i < ValueInf.length; i++) {
                let tmpObj: any = {
                    name: ValueInf[i].Name,
                    type: ChartInf[ValueInf[i].Name].isLine ? 'line' : 'bar',
                    yAxisIndex: ChartInf[ValueInf[i].Name].isLine ? 1 : 0,
                    barGap: '0%',
                    itemStyle: {
                        color: ChartInf[ValueInf[i].Name].Color
                    },
                    z: 2,
                    data: ValueInf[i].Arr
                };
                tSeries.push(tmpObj);
            }

            let max1 = GetDataUpLimit(Math.max(...ValueInf[0].Arr, ...ValueInf[1].Arr));
            let max2 = GetDataUpLimit(Math.max(...ValueInf[2].Arr, ...ValueInf[3].Arr));
            let min1 = GetDataUpLimit(Math.min(...ValueInf[0].Arr, ...ValueInf[1].Arr));
            let min2 = GetDataUpLimit(Math.min(...ValueInf[2].Arr, ...ValueInf[3].Arr));
            if (max1 < 100) {
                max1 = 100;
            }
            if (min1 > 0) {
                min1 = 0;
            }
            if (min2 > 0) {
                min2 = 0;
            }
            if (min1 < 0 && min2 >= 0) {
                min2 = Math.round(max2 * min1 / max1);
            }
            else if (min1 >= 0 && min2 < 0) {
                min1 = Math.round(max1 * min2 / max2);
            }
            else if (max1 > 0 && max2 > 0 && min1 < 0 && min2 < 0) {
                if (max1 / min1 * -1 > max2 / min2 * -1) {
                    min1 = Math.round(max1 * min2 / max2);
                }
                else {
                    min2 = Math.round(max2 * min1 / max1);
                }
            }
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: 60
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial',
                        align: 'left'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }
        else if (tPageName == 'QE_YRC') {
            let LastQuery = gPageObj.PageNameObj[tPageName].LastQuery.QueryArr
            let ChartInf: any = {
                'First Yield': {
                    Color: 'rgb(217,150,148)',
                    isLine: false,
                },
                'Final Yield': {
                    Color: 'rgb(142,180,227)',
                    isLine: false,
                },
                'Yield Gap': {
                    Color: 'rgb(102,0,204)',
                    isLine: true,
                },
                'Recover Rate': {
                    Color: '#38AC26',
                    isLine: true,
                },
            }
            let ValueInf: any = [
                {
                    Name: 'First Yield',
                    Arr: [],
                },
                {
                    Name: 'Final Yield',
                    Arr: [],
                },
                {
                    Name: 'Recover Rate',
                    Arr: [],
                },
                {
                    Name: 'Yield Gap',
                    Arr: [],
                }
            ]

            let xTitle: string[] = JSON.parse(JSON.stringify(gPageObj.PageNameObj[tPageName].TitleStrArr));
            let tSeries: any = [];

            for (let i = 0; i < tdata.length; i++) {
                ValueInf[0].Arr.push(tdata[i][0]);
                ValueInf[1].Arr.push(tdata[i][1]);
                ValueInf[2].Arr.push(tdata[i][3]);
                ValueInf[3].Arr.push(tdata[i][2]);
            }

            for (let i = 0; i < ValueInf.length; i++) {
                let tmpObj: any = {
                    name: ValueInf[i].Name,
                    type: ChartInf[ValueInf[i].Name].isLine ? 'scatter' : 'bar',
                    yAxisIndex: ChartInf[ValueInf[i].Name].isLine ? 1 : 0,
                    barGap: '0%',
                    itemStyle: {
                        color: ChartInf[ValueInf[i].Name].Color
                    },
                    z: 2,
                    data: ValueInf[i].Arr
                };
                tSeries.push(tmpObj);
            }

            let max1 = GetDataUpLimit(Math.max(...ValueInf[0].Arr, ...ValueInf[1].Arr));
            let max2 = GetDataUpLimit(Math.max(...ValueInf[2].Arr, ...ValueInf[3].Arr));
            let min1 = GetDataUpLimit(Math.min(...ValueInf[0].Arr, ...ValueInf[1].Arr));
            let min2 = GetDataUpLimit(Math.min(...ValueInf[2].Arr, ...ValueInf[3].Arr));
            if (max1 < 100) {
                max1 = 100;
            }
            if (min1 > 0) {
                min1 = 0;
            }
            if (min2 > 0) {
                min2 = 0;
            }
            if (min1 < 0 && min2 >= 0) {
                min2 = Math.round(max2 * min1 / max1);
            }
            else if (min1 >= 0 && min2 < 0) {
                min1 = Math.round(max1 * min2 / max2);
            }
            else if (max1 > 0 && max2 > 0 && min1 < 0 && min2 < 0) {
                if (max1 / min1 * -1 > max2 / min2 * -1) {
                    min1 = Math.round(max1 * min2 / max2);
                }
                else {
                    min2 = Math.round(max2 * min1 / max1);
                }
            }
            let rank = 5;
            let range1 = max1 / rank;
            let range2 = max2 / rank;
            option = {
                grid: {
                    top: 15,
                    bottom: 25,
                    right: 60,
                    left: 60
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontFamily: 'Arial',
                        align: 'left'
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function (params: any) {
                        let res = '' + params[0].name;
                        let vd = new ValueDisplay();
                        for (let i = 0; i < params.length; i++) {
                            let tmpValue = params[i].value;
                            tmpValue = vd.NeedModifyDisplay(params[i].seriesName, tmpValue, tPageName, params[i].name);
                            res += '<br>' + params[i].marker + params[i].seriesName + ' : ' + tmpValue;
                        }
                        return res;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xTitle,
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
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max1,
                        interval: range1,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                    {
                        type: 'value',
                        nameTextStyle: {
                            fontFamily: 'DFKai-sb',
                        },
                        min: 0,
                        max: max2,
                        interval: range2,
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#898989']
                            }
                        },
                    },
                ],
                series: tSeries
            };
        }

        return option;
    }
}

window.PPMake = PPMake;
window.PPSearch = PPSearch;