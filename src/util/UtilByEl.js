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
            let appName = el.getAttribute("data-app");
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
    static getTabbedAppNamesV4Angular(angularInfoObj) {
        try {
            return angularInfoObj.applet.tabApplications;
        }
        catch (exception) {
            return null;
        }
    }
    static getTabbedApps(el) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v4-angularjs":
                return this.getTabbedAppsV4AngularJs(el);
            case "v4-angular":
                return this.getTabbedAppsV4Angular(el);
            default:
                return false;
        }
    }
    static getTabbedAppsV4Angular(el) {
        // need to parse the dom
        // angular websites do no expose dx api
        
        // first get the app names for the tab apps
        let infoObj = this.getAppInfoV4Angular(el);
        // this is a string[]
        let tabAppNames = this.getTabbedAppNamesV4Angular(infoObj);
        let tabWebElements = el.querySelectorAll(".dx-tabpanel-tabs .dx-item");
        const tabWebElArray = Array.from(tabWebElements);

        // will return this array
        let v4tabApps = [];
        let counter = 1;

        for(let app of tabAppNames){
            // TabName is the visible title

            // clean up AppName by replacing "|" with "_"
            let cleanAppName = tabAppNames[counter - 1].replace(/\|/g, "_");

            // clean up TabName by replacing "|" with "_" as well
            let rawTabName = tabWebElArray[counter - 1].textContent;
            let cleanTabName = rawTabName.replace(/\|/g, "_");

            v4tabApps.push({
                AppName: cleanAppName,
                TabId: "Page" + counter,
                TabName: tabWebElArray[counter-1].textContent,
                UniqueTabName: cleanTabName + ".Page" + counter
            });
            counter++;
        }
        return v4tabApps;
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
                // clean up AppName and TabName by replacing "|" with "_"
                let cleanAppName = dxTabPanelObj.id.replace(/\|/g, "_");
                let cleanTabName = dxTabPanelObj.tabName.replace(/\|/g, "_");

                return {
                    "TabId": dxTabPanelObj.tabId,
                    "TabName": cleanTabName,
                    "AppName": cleanAppName,
                    "UniqueTabName": CreateUniqueTabName(cleanAppName, dxTabPanelObj.tabId)
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
    static clickTabAppV4Angular(el, _index){
        try {
            let tabWebElements = el.querySelectorAll(".dx-tabpanel-tabs .dx-item");
            const tabWebElArray = Array.from(tabWebElements);
            tabWebElArray[_index].click();
        }
        catch (exception) {
            return null;
        }
    }
    // end of class
}

export default UtilByEl;