import IcComponent from "./IcComponent";

class DonutChartV4 extends IcComponent{
    //highCharts
    AppName;
 
    constructor(_appName){
        super(_appName);
        this.AppName = _appName;
        this.Parts = [
            {
                name: "Main Wrapper",
                cssSelector: ".donut-container-div",
                borderStyle: "5px solid red"
            },
            {
                name: "HighCharts wrapper",
                cssSelector: ".donut-container-div .highcharts-container",
                borderStyle: "5px solid blue"
            },
            {
                name: "Legend",
                cssSelector: ".donut-container-div .DonutChartLegendTable",
                borderStyle: "5px solid green"
            },
            {
                name: "Legend row",
                cssSelector: ".donut-container-div .DonutChartLegendTable .DonutChartLegendTableRow",
                borderStyle: "5px dashed gray"
            }
        ];
    }
}

export default DonutChartV4;