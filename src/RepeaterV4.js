import IcComponent from "./IcComponent";

class RepeaterV4 extends IcComponent{
 
    AppName;
 
    constructor(_appName){
        super(_appName);
        this.AppName = _appName;
        this.Parts = [
            {
                name: "Main Wrapper",
                cssSelector: ".ic-repeater-wrapper",
                borderStyle: "5px solid red"
            },
            {
                name: "Items wrapper",
                cssSelector: ".ic-repeater-wrapper .ic-repeater-items",
                borderStyle: "5px solid blue"
            },
            {
                name: "Item",
                cssSelector: ".ic-repeater-wrapper .ic-repeater-items .ic-repeater-item",
                borderStyle: "5px dashed gray"
            },
            {
                name: "Pagination wrapper",
                cssSelector: ".ic-repeater-wrapper .pagination-wrapper",
                borderStyle: "5px solid purple"
            },
            {
                name: "Pagination pages",
                cssSelector: ".ic-repeater-wrapper .pagination-wrapper .dx-pages .pager-info .page-selector",
                borderStyle: "5px dashed purple"
            },
            {
                name: "Pagination prev",
                cssSelector: ".ic-repeater-wrapper .pagination-wrapper .dx-pages .dx-navigate-button.dx-prev-button",
                borderStyle: "5px solid red"
            },
            {
                name: "Pagination next",
                cssSelector: ".ic-repeater-wrapper .pagination-wrapper .dx-pages .dx-navigate-button.dx-next-button",
                borderStyle: "5px solid red"
            }
        ]
    }
}

export default RepeaterV4;