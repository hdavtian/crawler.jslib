import IcComponent from "./IcComponent";

class DonutProgress extends IcComponent{
    AppName;
 
    constructor(_appName){
        super(_appName);
        this.AppName = _appName;
        this.Parts = [
            {
                name: "Main Wrapper",
                cssSelector: ".ic-donut-progress",
                borderStyle: "5px solid red"
            },
            {
                name: "Progress Wrapper",
                cssSelector: ".ic-donut-progress-progress",
                borderStyle: "5px solid blue"
            },
            {
                name: "Progress Percentage",
                cssSelector: ".ic-donut-progress-success",
                borderStyle: "5px dashed pink"
            },
            {
                name: "Chart Container",
                cssSelector: ".ic-donut-progress-chart-container",
                borderStyle: "5px dashed cyan"
            },
            {
                name: "Subtext",
                cssSelector: ".ic-donut-progress-subtext",
                borderStyle: "5px dashed black"
            }
        ];
    }
}

export default DonutProgress;