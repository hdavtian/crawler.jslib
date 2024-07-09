import IcComponent from "./IcComponent";

class AnswerProgress extends IcComponent{
    AppName;
 
    constructor(_appName){
        super(_appName);
        this.AppName = _appName;
        this.Parts = [
            {
                name: "Main Wrapper",
                cssSelector: ".ic-answer-progress",
                borderStyle: "5px solid red"
            },
            {
                name: "Progress bar",
                cssSelector: ".ic-answer-progress-bar",
                borderStyle: "5px dashed white"
            },
            {
                name: "Pretext",
                cssSelector: ".ic-answer-progress-pretext",
                borderStyle: "5px dashed orange"
            },
            {
                name: "Subtext",
                cssSelector: ".ic-answer-progress-subtext",
                borderStyle: "5px dashed cyan"
            },
            {
                name: "Remaining text",
                cssSelector: ".ic-answer-progress-remainingText",
                borderStyle: "5px dashed gray"
            },
            {
                name: "Progress post text",
                cssSelector: ".ic-answer-progress-posttext",
                borderStyle: "5px dashed pink"
            }
        ];
    }
}

export default AnswerProgress;