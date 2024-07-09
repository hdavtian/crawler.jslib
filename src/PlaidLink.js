import IcComponent from "./IcComponent";

class PlaidLink extends IcComponent{
    AppName;
 
    constructor(_appName){
        super(_appName);
        this.AppName = _appName;
        this.Parts = [
            {
                name: "Main Wrapper",
                cssSelector: ".ic-plaid-link",
                borderStyle: "5px solid red"
            },
            {
                name: "Form",
                cssSelector: ".ic-plaid-link .plaid-link-form",
                borderStyle: "5px solid blue"
            },
            {
                name: "Account table",
                cssSelector: ".ic-plaid-link .plaid-link-account-table",
                borderStyle: "5px solid orange"
            },
            {
                name: "Accounts head",
                cssSelector: ".ic-plaid-link .plaid-link-account-table .accounts-head",
                borderStyle: "5px dashed blue"
            },
            {
                name: "Added connections",
                cssSelector: ".ic-plaid-link .plaid-link-account-table .addedConnections",
                borderStyle: "5px dashed gray"
            },
            {
                name: "Plaid connection",
                cssSelector: ".ic-plaid-link .plaid-link-account-table .addedConnections .plaid-connection",
                borderStyle: "5px dashed black"
            },
            {
                name: "Plaid connection wrapper",
                cssSelector: ".ic-plaid-link .plaid-link-account-table .addedConnections .plaid-connection .plaid-connection-div",
                borderStyle: "5px dashed cyan"
            },
            {
                name: "Plaid account wrapper",
                cssSelector: ".ic-plaid-link .plaid-link-account-table .addedConnections .plaid-connection .plaid-account-div",
                borderStyle: "5px dashed green"
            }
        ];
    }
}

export default PlaidLink;