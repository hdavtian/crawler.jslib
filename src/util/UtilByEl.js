import Page from "./Page";

// re-creating some methods from Util to accept element parameters rather than appname:string
// removing v1 support
class UtilByEl {

    static getAppType(el) {
        if (this.isInputApp(el)) {
            return "input";
        }
        else if (this.isListApp(el) && !this.isComponent(el)) {
            return "list";
        }
        else if (this.isListApp(el) && this.isComponent(el)) {
            return "component";
        }
        else {
            return "unknown";
        }
    }
    static isInputApp(el) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v4-angularjs":
                return this.isInputAppV4AngularJs(el);
            case "v4-angular":
                return this.isInputAppV4Angular(el);
            default:
                return false;
        }
    }
    static isInputAppV4AngularJs(el) {
        try {
            let info = this.getAppInfoV4AngularJs(el);
            return info.applet.screenType.toLowerCase() === "input";
        }
        catch (exception) {
            return null;
        }
    }
    static isInputAppV4Angular(el) {
        // example: window.IC.Testing.getAppComponent("RBCHomeFooterV4.Input.App").applet.screenType
        try {
            let info = this.getAppInfoV4Angular(el);
            return info.applet.screenType.toLowerCase() === "input";
        }
        catch (exception) {
            return null;
        }
    }
    static getAppInfoV4AngularJs(el) {
        try {
            return $(el).isolateScope();
        }
        catch (exception) {
            return null;
        }
    }
    static getAppInfoV4Angular(el) {
        try {
            let ICWindow = window;
            //@todo, this may be problematic, still using appname
            return ICWindow.IC.Testing.getAppComponent(appName);
        }
        catch (exception) {
            return null;
        }
    }
    static isListApp(el) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v4-angularjs":
                return this.isListAppV4AngularJs(el);
            case "v4-angular":
                return this.isListAppV4Angular(el);
            default:
                return false;
        }
    }
    static isListAppV4AngularJs(el) {
        try {
            let info = this.getAppInfoV4AngularJs(el);
            return info.applet.screenType.toLowerCase() === "list";
        }
        catch (exception) {
            return null;
        }
    }
    static isListAppV4Angular(el) {
        // example: window.IC.Testing.getAppComponent("RBCHomeFooterV4.Input.App").applet.screenType
        try {
            let info = this.getAppInfoV4Angular(el);
            return info.applet.screenType.toLowerCase() === "list";
        }
        catch (exception) {
            return null;
        }
    }
    static isComponent(el) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v4-angularjs":
                return this.isComponentV4AngularJs(el);
            case "v4-angular":
                return this.isComponentV4Angular(el);
            default:
                return false;
        }
    }
    static isComponentV4AngularJs(el) {
        try {
            let info = this.getAppInfoV4AngularJs(el);
            return info.applet.component === true;
        }
        catch (exception) {
            return null;
        }
    }
    static isComponentV4Angular(el) {
        try {
            let info = this.getAppInfoV4Angular(el);
            return info.applet.component === true;
        }
        catch (exception) {
            return null;
        }
    }
    static getComponentName(el) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v4-angularjs":
                return this.getComponentNameV4AngularJs(el);
            case "v4-angular":
                return this.getComponentNameV4Angular(el);
            default:
                return null;
        }
    }
    static getComponentNameV4AngularJs(el) {
        try {
            let info = this.getAppInfoV4AngularJs(el);
            return info.applet.componentType;
        }
        catch (exception) {
            return null;
        }
    }
    static getComponentNameV4Angular(el) {
        try {
            let info = this.getAppInfoV4Angular(el);
            return info.applet.componentType;
        }
        catch (exception) {
            return null;
        }
    }
    // tabApplications
    static isTabbedApp(el) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v4-angularjs":
                return this.isTabbedAppV4AngularJs(el);
            case "v4-angular":
                return this.isTabbedAppV4Angular(el);
            default:
                return false;
        }
    }
    static isTabbedAppV4AngularJs(el) {
        try {
            let info = this.getAppInfoV4AngularJs(el);
            return info.applet.tabApplications.length > 0;
        }
        catch (exception) {
            return null;
        }
    }
    static isTabbedAppV4Angular(el) {
        try {
            let info = this.getAppInfoV4Angular(el);
            return info.applet.tabApplications.length > 0;
        }
        catch (exception) {
            return null;
        }
    }
    static getTabbedApps(el) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v4-angularjs":
            case "v4-angular":
                return this.getTabbedAppsV4AngularJs(el);
            default:
                return false;
        }
    }
    static getTabbedAppsV4AngularJs(el) {
        try {
            let dxTabPanel = $(el).find(".ic-tabs").dxTabPanel("instance");
            let dxItems = dxTabPanel.option("items");
            let tabAppArr = [];
            for (let dxItem of dxItems) {
                tabAppArr.push(IcTabApp(dxItem))    
            }
            return tabAppArr;
            function IcTabApp(dxTabPanelObj){
                return {
                    "TabId": dxTabPanelObj.tabId,
                    "TabName": dxTabPanelObj.tabName,
                    "AppName": dxTabPanelObj.id,
                    "UniqueTabName": CreateUniqueTabName(dxTabPanelObj.id, dxTabPanelObj.tabId)
                }
            }
            function CreateUniqueTabName(appName, tabId){
                let name = "";
                if (appName.indexOf("|") !== -1) {
                    let parts = appName.split("|")
                    name = parts[0].trim() + "." + tabId.trim();
                } else {
                    name = appName.trim() + "." + tabId.trim();
                }
                return name;
            }
        }
        catch (exception) {
            return null;
        }
    }
    static clickTabApp(el, _index){
        try {
            let dxTabPanel = $(el).find(".ic-tabs").dxTabPanel("instance");
            dxTabPanel.option("selectedIndex", _index);
        }
        catch (exception) {
            return null;
        }
    }
    // end of class
}

export default UtilByEl;