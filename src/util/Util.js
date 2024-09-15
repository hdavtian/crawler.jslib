//import $ from "jquery";
import Page from "./Page";

class Util {
    static isInputApp(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.isInputAppV1(appName);
            case "v4-angularjs":
                return this.isInputAppV4AngularJs(appName);
            case "v4-angular":
                return this.isInputAppV4Angular(appName);
            default:
                return false;
        }
    }
    static isInputAppV1(appName) {
        return false;
    }
    static isInputAppV4AngularJs(appName) {
        try {
            let info = Util.getAppInfoV4AngularJs(appName);
            return info.applet.screenType.toLowerCase() === "input";
        }
        catch (exception) {
            return null;
        }
    }
    static isInputAppV4Angular(appName) {
        // example: window.IC.Testing.getAppComponent("RBCHomeFooterV4.Input.App").applet.screenType
        try {
            let info = Util.getAppInfoV4Angular(appName);
            return info.applet.screenType.toLowerCase() === "input";
        }
        catch (exception) {
            return null;
        }
    }
    static isListApp(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.isListAppV1(appName);
            case "v4-angularjs":
                return this.isListAppV4AngularJs(appName);
            case "v4-angular":
                return this.isListAppV4Angular(appName);
            default:
                return false;
        }
    }
    static isListAppV1(appName) {
        return false;
    }
    static isListAppV4AngularJs(appName) {
        try {
            let info = Util.getAppInfoV4AngularJs(appName);
            return info.applet.screenType.toLowerCase() === "list";
        }
        catch (exception) {
            return null;
        }
    }
    static isListAppV4Angular(appName) {
        // example: window.IC.Testing.getAppComponent("RBCHomeFooterV4.Input.App").applet.screenType
        try {
            let info = Util.getAppInfoV4Angular(appName);
            return info.applet.screenType.toLowerCase() === "list";
        }
        catch (exception) {
            return null;
        }
    }
    static isListAppReady(appName) {
        try {
            var dxDataGrid = $("[data-app='" + appName + "'] .icGrid").dxDataGrid("instance");
            var isReady = dxDataGrid.getDataSource().isLoaded();
            return isReady;
        } catch {
            return true;
        }
    }
    static isComponent(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.isComponentV1(appName);
            case "v4-angularjs":
                return this.isComponentV4AngularJs(appName);
            case "v4-angular":
                return this.isComponentV4Angular(appName);
            default:
                return false;
        }
    }
    static isComponentV1(appName) {
        return false;
    }
    static isComponentV4AngularJs(appName) {
        try {
            let info = Util.getAppInfoV4AngularJs(appName);
            return info.applet.component === true;
        }
        catch (exception) {
            return null;
        }
    }
    static isComponentV4Angular(appName) {
        try {
            let info = Util.getAppInfoV4Angular(appName);
            return info.applet.component === true;
        }
        catch (exception) {
            return null;
        }
    }
    static getComponentName(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.getComponentNameV1(appName);
            case "v4-angularjs":
                return this.getComponentNameV4AngularJs(appName);
            case "v4-angular":
                return this.getComponentNameV4Angular(appName);
            default:
                return null;
        }
    }
    static getComponentNameV1(appName) {
        return null;
    }
    static getComponentNameV4AngularJs(appName) {
        try {
            let info = Util.getAppInfoV4AngularJs(appName);
            return info.applet.componentType;
        }
        catch (exception) {
            return null;
        }
    }
    static getComponentNameV4Angular(appName) {
        try {
            let info = Util.getAppInfoV4Angular(appName);
            return info.applet.componentType;
        }
        catch (exception) {
            return null;
        }
    }
    static getAppType(appName) {
        if (this.isInputApp(appName)) {
            return "input";
        }
        else if (this.isListApp(appName) && !this.isComponent(appName)) {
            return "list";
        }
        else if (this.isListApp(appName) && this.isComponent(appName)) {
            return "component";
        }
        else {
            return "unknown";
        }
    }
    static getParentAppName(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.getParentAppNameV1(appName);
            case "v4-angularjs":
                return this.getParentAppNameV4AngularJs(appName);
            case "v4-angular":
                return this.getParentAppNameV4Angular(appName);
        }
    }
    static getParentAppNameV1(appName) {
        try {
            return "not implemented yet";
        }
        catch (exception) {
            return null;
        }
    }
    static getParentAppNameV4AngularJs(appName) {
        try {
            let info = Util.getAppInfoV4AngularJs(appName);
            return info.applet.ContainerName;
        }
        catch (exception) {
            return null;
        }
    }
    static getParentAppNameV4Angular(appName) {
        try {
            let info = Util.getAppInfoV4Angular(appName);
            return info.applet.containerName;
        }
        catch (exception) {
            return null;
        }
    }
    static getAppInfo(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.getAppInfoV1(appName);
            case "v4-angularjs":
                return this.getAppInfoV4AngularJs(appName);
            case "v4-angular":
                return this.getAppInfoV4Angular(appName);
        }
    }
    static getAppInfoV1(appName) {
        try {
            return "not implemented yet";
        }
        catch (exception) {
            return null;
        }
    }
    static getAppInfoV4AngularJs(appName) {
        try {
            return $("[data-app='" + appName + "']").isolateScope();
        }
        catch (exception) {
            return null;
        }
    }
    static getAppInfoV4Angular(appName) {
        try {
            let ICWindow = window;
            return ICWindow.IC.Testing.getAppComponent(appName);
        }
        catch (exception) {
            return null;
        }
    }
    static getAppElement(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                throw "not implemented";
            case "v4-angularjs":
            case "v4-angular":
                return this.getAppElementV4(appName);
        }
    }
    static getAppElementV4(appName) {
        try {
            return $("[data-app='" + appName + "']");
        }
        catch (exception) {
            return null;
        }
    }
    static getDataStep() {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return "not implemented";
            case "v4-angularjs":
            case "v4-angular":
                return this.getDataStepV4();
        }
    }
    static getDataStepV4() {
        try {
            return $("body").attr("data-step");
        }
        catch (exception) {
            return null;
        }
    }
    static getDataWorkflow() {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return "not implemented";
            case "v4-angularjs":
            case "v4-angular":
                return this.getDataWorkflowV4();
        }
    }
    static getDataWorkflowV4() {
        try {
            return $("body").attr("data-workflow");
        }
        catch (exception) {
            return null;
        }
    }
    static getThemeName() {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return "not implemented";
            case "v4-angularjs":
            case "v4-angular":
                return this.getThemeNameV4();
        }
    }
    static getThemeNameV4() {
        try {
            let ICWindow = window;
            return ICWindow.IX_Theme.themeName;
        }
        catch (exception) {
            return null;
        }
    }
    static getThemeWb() {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return "not implemented";
            case "v4-angularjs":
            case "v4-angular":
                return this.getThemeWbV4();
        }
    }
    static getThemeWbV4() {
        try {
            let ICWindow = window;
            return ICWindow.IX_Theme.details.StyleWorkbook;
        }
        catch (exception) {
            return null;
        }
    }
    static getThemeWs() {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return "not implemented";
            case "v4-angularjs":
            case "v4-angular":
                return this.getThemeWsV4();
        }
    }
    static getThemeWsV4() {
        try {
            let ICWindow = window;
            return ICWindow.IX_Theme.details.StyleSheet;
        }
        catch (exception) {
            return null;
        }
    }
    static hasModel(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.hasModelV4(appName);
        }
    }
    static hasModelV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return !jQuery.isEmptyObject(info.model);
        }
        catch (exception) {
            return null;
        }
    }
    static getModel(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getModelV4(appName);
        }
    }
    static getModelV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return info.model;
        }
        catch (exception) {
            return null;
        }
    }
    static getModelCount(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getModelCountV4(appName);
        }
    }
    static getModelCountV4(appName) {
        try {
            let model = this.getModelV4(appName);
            return Object.keys(model).length;
        }
        catch (exception) {
            return null;
        }
    }
    static getModelActualCount(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getModelActualCountV4(appName);
        }
    }
    static getModelActualCountV4(appName) {
        try {
            let $app = this.getAppElement(appName);
            return $app.find("[model*='model.']").length;
        }
        catch (exception) {
            return null;
        }
    }
    static hasFields(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.hasFieldsV4(appName);
        }
    }
    static hasFieldsV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return !jQuery.isEmptyObject(info.fields);
        }
        catch (exception) {
            return null;
        }
    }
    static getFields(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getFieldsV4(appName);
        }
    }
    static getFieldsV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return info.fields;
        }
        catch (exception) {
            return null;
        }
    }
    static getFieldsCount(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getFieldsCountV4(appName);
        }
    }
    static getFieldsCountV4(appName) {
        try {
            let fields = this.getFieldsV4(appName);
            return Object.keys(fields).length;
        }
        catch (exception) {
            return null;
        }
    }
    static isFieldVisibleInFieldsObj(field) {
        if (field.hasOwnProperty("numberBoxModel")) {
            return field["numberBoxModel"].visible;
        }
        else if (field.hasOwnProperty("textBoxModel")) {
            return field["textBoxModel"].visible;
        }
        else if (field.hasOwnProperty("dateBoxModel")) {
            return field["dateBoxModel"].visible;
        }
        else if (field.hasOwnProperty("checkBoxModel")) {
            return field["checkBoxModel"].visible;
        }
        else if (field.hasOwnProperty("icLabelModel")) {
            return field["icLabelModel"].visible;
        }
        else if (field.hasOwnProperty("visible")) {
            return field["visible"];
        }
    }
    static getFieldsVisibleCount(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getFieldsVisibleCountV4(appName);
        }
    }
    static getFieldsVisibleCountV4(appName) {
        try {
            let count = 0;
            const fields = this.getFieldsV4(appName);
            for (const field in fields) {
                if (this.isFieldVisibleInFieldsObj(fields[field])) {
                    count++;
                }
            }
            return count;
        }
        catch (exception) {
            return null;
        }
    }
    // ********
    static hasButtons(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.hasButtonsV4(appName);
        }
    }
    static hasButtonsV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return !jQuery.isEmptyObject(info.buttons);
        }
        catch (exception) {
            return null;
        }
    }
    static getButtons(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getButtonsV4(appName);
        }
    }
    static getButtonsV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return info.buttons;
        }
        catch (exception) {
            return null;
        }
    }
    static getButtonsCount(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getButtonsCountV4(appName);
        }
    }
    static getButtonsCountV4(appName) {
        try {
            let buttons = Util.getButtonsV4(appName);
            return Object.keys(buttons).length;
        }
        catch (exception) {
            return null;
        }
    }
    static getButtonsActualCount(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getButtonsActualCountV4(appName);
        }
    }
    static getButtonsActualCountV4(appName) {
        try {
            let $app = this.getAppElementV4(appName);
            return $app.find("button").length;
        }
        catch (exception) {
            return null;
        }
    }
    static hasItems(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.hasItemsV4(appName);
        }
    }
    static hasItemsV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            //return !jQuery.isEmptyObject(info.buttons)
            // check to see if context._datasources properties exists for appName
            let datasources = info.context._dataSources;
            let sourcePropertyName = "";
            let _appName = appName.replace(/\./g, '').toLowerCase();
            Object.keys(datasources).forEach(function (key, index) {
                // key: the name of the object key
                // index: the ordinal position of the key within the object
                if (key.toLowerCase().indexOf(_appName) != -1) {
                    sourcePropertyName = key;
                }
            });
            if (sourcePropertyName == "") {
                return false;
            }
            return datasources[sourcePropertyName]._items.length != 0;
        }
        catch (exception) {
            return null;
        }
    }
    static getItems(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getItemsV4(appName);
        }
    }
    static getItemsV4(appName) {
        try {
            try {
                let info = Util.getAppInfo(appName);
                //return !jQuery.isEmptyObject(info.buttons)
                // check to see if context._datasources properties exists for appName
                let datasources = info.context._dataSources;
                let sourcePropertyName = "";
                let _appName = appName.replace(/\./g, '').toLowerCase();
                Object.keys(datasources).forEach(function (key, index) {
                    // key: the name of the object key
                    // index: the ordinal position of the key within the object
                    if (key.toLowerCase().indexOf(_appName) != -1) {
                        sourcePropertyName = key;
                    }
                });
                return datasources[sourcePropertyName]._items;
            }
            catch (exception) {
                return null;
            }
        }
        catch (exception) {
            return null;
        }
    }
    static getItemsCount(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getItemsCountV4(appName);
        }
    }
    static getItemsCountV4(appName) {
        try {
            try {
                let items = this.getItems(appName);
                return items.length;
            }
            catch (exception) {
                return null;
            }
        }
        catch (exception) {
            return null;
        }
    }
    static hasEcdRequestServerCallType(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.hasEcdRequestServerCallTypeV4(appName);
        }
    }
    static hasEcdRequestServerCallTypeV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return info.applet.config.ecdRequest.ServerCallType != null && "ServerCallType" in info.applet.config.ecdRequest;
        }
        catch (exception) {
            return null;
        }
    }
    static getEcdRequestServerCallType(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getEcdRequestServerCallTypeV4(appName);
        }
    }
    static getEcdRequestServerCallTypeV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return info.applet.config.ecdRequest.ServerCallType;
        }
        catch (exception) {
            return null;
        }
    }
    static hasServer(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.hasServerV4(appName);
        }
    }
    static hasServerV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return info.applet.server != null && "server" in info.applet;
        }
        catch (exception) {
            return null;
        }
    }
    static getServer(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return null;
            case "v4-angularjs":
            case "v4-angular":
                return this.getServerV4(appName);
        }
    }
    static getServerV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return info.applet.server;
        }
        catch (exception) {
            return null;
        }
    }
    static getAppTop(el) {
        let ICWindow = window;
        //return el.getBoundingClientRect().top + $(window)['scrollTop']();
        return $(el).offset().top;
    }
    static getAppLeft(el) {
        let ICWindow = window;
        //return el.getBoundingClientRect().left + $(window)['scrollLeft']();
        return $(el).offset().left;
    }
    static getAppWidth(el) {
        return $(el).outerWidth();
    }
    static getAppHeight(el) {
        return $(el).outerHeight();
    }
    //*** */
    static isChartApp(appName) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                throw "not supported";
            case "v4-angularjs":
            case "v4-angular":
                return this.isChartAppV4(appName);
        }
    }
    static isChartAppV4(appName) {
        try {
            let info = Util.getAppInfo(appName);
            return !jQuery.isEmptyObject(info.chart);
        }
        catch (exception) {
            return null;
        }
    }
    static getDocumentScrollPosition() {
        return document.documentElement.scrollTop;
    }
    static getDocumentViewportHeight() {
        return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    }
    static getDocumentViewportWidth() {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }
    static isAppByNameVisible(appName) {
        let app = Page.getAppElement(appName);
        return Page.isElementVisible(app);
    }
    static isAppSticky(appName) {
        let $el = this.getAppElement(appName);
        let anyParentIsFixed = Page.anyParentHasCssValue($el[0], "position", "fixed");
        return $el.css("position") == "fixed" || anyParentIsFixed;
    }
    static getCircularReplacer() {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    }
    ;
    static printObjInNewWindow(_obj) {
        var myWindow = window.open('', '', 'width=500,height=500');
        myWindow.document.write("<pre>" + JSON.stringify(_obj, this.getCircularReplacer(), 1) + "</pre>");
        myWindow.focus();
    }
    static writeJsonContentToWebEl(_json, $el) {
        $el.html(JSON.stringify(_json, this.getCircularReplacer(), 1));
    }
    // ***************
    static hasCL_(appName) {
        try {
            const $el = this.getAppElement(appName);
            return $el.find("[class*='CL_']").length > 0;
        }
        catch (exception) {
            return null;
        }
    }
    static getClElementCount(appName) {
        try {
            const $el = this.getAppElement(appName);
            return $el.find("[class*='CL_']").length;
        }
        catch (exception) {
            return null;
        }
    }
    static getCLElements(appName) {
        let $el = this.getAppElement(appName);
        let $els = $el.find("[class*='CL_']");
        let els = [];
        $els.each(function () {
            els.push($(this));
        });
        return els;
    }
    static getCLElement(appName, _clClassName) {
        let $el = this.getAppElement(appName);
        return $el.find("." + _clClassName);
    }
    static getCLClassNameFromElement($el) {
        let allClasses = $el.attr("class");
        let _classesArray = allClasses.split(" ");
        let theClass = "";
        for (let _class of _classesArray) {
            if (_class.indexOf("CL_") != -1) {
                theClass = _class;
                break;
            }
        }
        return theClass;
    }
    static getCLClassesFromApp(appName) {
        let classes = [];
        let $elementsWithCLClass = this.getCLElements(appName);
        for (let $elWithClClass of $elementsWithCLClass) {
            classes.push(this.getCLClassNameFromElement($elWithClClass));
        }
        return classes;
    }
    static highlightCLElements(appName, outlineCssClass) {
        let app = this.getAppElement(appName);
        let classNames = this.getCLClassesFromApp(appName);
        for (let className of classNames) {
            let $fieldEl = app.find("." + className);
            $fieldEl.addClass(outlineCssClass);
            this.addFieldBadge(appName, className, $fieldEl);
        }
        this.animateInAllFields(appName);
        this.makeAllFieldBadgeElementsDraggable();
    }
    static animateInAllFields(appName) {
        // code removed
    }
    static unhighlightCLElements(appName, outlineCssClass) {
        let app = this.getAppElement(appName);
        let classNames = this.getCLClassesFromApp(appName);
        for (let className of classNames) {
            let $fieldEl = app.find("." + className);
            $fieldEl.removeClass(outlineCssClass);
            this.removeFieldBadge(appName, className);
        }
    }
    static addFieldBadge(appName, fieldClassName, $fieldEl) {
        let output = `
            <div data-icsa-field-badge-for-app="${appName}" data-icsa-field-badge-field-name="${fieldClassName}" class="icsa-app-field">
                ${(!Page.isElementVisible($fieldEl[0])) ? "<i class='fa-solid fa-eye-slash'></i>&nbsp;" : ""}
                ${fieldClassName}
            </div>
        `;
        $(".icsa-main-ui-fields-wrapper").append(output);
    }
    static removeFieldBadge(appName, fieldClassName) {
        let $el = this.getFieldBadgeElement(appName, fieldClassName);
        $el.remove();
    }
    static removeAllFieldBadges() {
        $(".icsa-main-ui-fields-wrapper").html("");
    }
    static getFieldBadgeElement(appName, fieldClassName) {
        return $(".icsa-main-ui-fields-wrapper").find("[data-icsa-field-badge-for-app='" + appName + "'][data-icsa-field-badge-field-name='" + fieldClassName + "']");
    }
    static makeAllFieldBadgeElementsDraggable() {
        let _this = this;
        $(".icsa-main-ui-fields-wrapper .icsa-app-field").each(function () {
            let appName = $(this).attr("data-icsa-field-badge-for-app");
            let clClassName = $(this).attr("data-icsa-field-badge-field-name");
            let $fieldEl = _this.getCLElement(appName, clClassName);
            $(this).draggable({
                drag: function (event, ui) {
                    ui.helper.addClass("icsa-highlight-when-moving");
                    //$fieldEl.addClass("icsa-highlight-when-moving");
                    $fieldEl.attr("style", "border:2px solid red!important");
                },
                stop: function (event, ui) {
                    ui.helper.removeClass("icsa-highlight-when-moving");
                    //$fieldEl.removeClass("icsa-highlight-when-moving");
                    $fieldEl.removeAttr("style");
                }
            });
        });
    }
}

export default Util;