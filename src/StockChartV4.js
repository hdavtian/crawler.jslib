import IcComponent from "./IcComponent";

class StockChartV4 extends IcComponent{
    //highCharts
    AppName;
 
    constructor(_appName){
        super(_appName);
        this.AppName = _appName;
        this.Parts = [
            {
                name: "Main Wrapper",
                cssSelector: ".stockChartContainer",
                borderStyle: "5px solid red"
            },
            {
                name: "HighCharts wrapper",
                cssSelector: ".stockChartContainer .highcharts-container",
                borderStyle: "5px solid blue"
            }
        ];
    }
}

export default StockChartV4;