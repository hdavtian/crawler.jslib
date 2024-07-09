import IcComponent from "./IcComponent.js";

class DocumentSliderV4 extends IcComponent{
    
    AppName
 
    constructor(_appName){
        super(_appName);
        this.AppName = _appName;
        this.Parts = [
        {
            name: "Main Wrapper",
            cssSelector: ".DocumentSliderContainer",
            borderStyle: "5px solid red"
        },
        {
            name: "sliderContainer",
            cssSelector: ".DocumentSliderContainer .sliderWrap",
            borderStyle: "5px solid blue"
        },
        {
            name: "slide",
            cssSelector: ".DocumentSliderContainer .sliderWrap .docSlide",
            borderStyle: "5px solid orange"
        },
        {
            name: "image",
            cssSelector: ".DocumentSliderContainer .sliderWrap .docSlide .docImage",
            borderStyle: "5px dashed purple"
        },
        {
            name: "firstLabel",
            cssSelector: ".DocumentSliderContainer .sliderWrap .docSlide .firstLabel",
            borderStyle: "5px dashed cyan"
        },
        {
            name: "secondLabel",
            cssSelector: ".DocumentSliderContainer .sliderWrap .docSlide .secondLabel",
            borderStyle: "5px dashed gray"
        },
        {
            name: "thirdLabel",
            cssSelector: ".DocumentSliderContainer .sliderWrap .docSlide .thirdLabel",
            borderStyle: "5px dashed gray"
        },
        {
            name: "fourthLabel",
            cssSelector: ".DocumentSliderContainer .sliderWrap .docSlide .fourthLabel",
            borderStyle: "5px dashed gray"
        },
        {
            name: "has pager",
            cssSelector: ".DocumentSliderContainer .bx-controls.bx-has-pager",
            borderStyle: "5px solid pink"
        },
        {
            name: "pager item",
            cssSelector: ".DocumentSliderContainer .bx-controls.bx-has-pager .bx-pager-item",
            borderStyle: "5px solid green"
        }
    ];
    }
}

export default DocumentSliderV4;