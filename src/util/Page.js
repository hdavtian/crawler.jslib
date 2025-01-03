import Util from './Util';
//import $ from 'jquery';

class Page {
    /**
     * returns unknown, v1, v4-angularjs, or v4-angular
     */
    static getSiteVersion() {
        let version = "unknown";
        if (this.isWebPageV1()) {
            version = "v1";
        }
        else if (this.isWebPageV4()) {
            if (this.isWebPageAngularJs()) {
                version = "v4-angularjs";
            }
            else if (this.isWebPageAngular()) {
                version = "v4-angular";
            }
        }
        return version;
    }
    // using the following 4 methods in TF java codebase as well
    static isWebPageAngular() {
        return $('ic-root').length > 0;
    }
    static isWebPageAngularJs() {
        // following eval() is one way to appease the typescript compiler
        //let isAngularJs = !!(angular.version && angular.version.major < 2);
        //let isAngularJs = !!(eval("angular.version") && eval("angular.version.major < 2"));
        let ICAngular = window.angular;
        let isAngularJs = !!(ICAngular.version && ICAngular.version.major < 2);
        return isAngularJs && !this.isWebPageV1();
    }
    static isWebPageV4() {
        return this.isWebPageAngularJs() || this.isWebPageAngular();
    }
    static isWebPageV1() {
        return $('[ng-view]').length === 0;
    }
    static getUrlHost() {
        return window.location.host;
    }
    static getAppNames() {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.getAppNames_v1();
            case "v4-angularjs":
                return this.getAppNames_v4angularjs();
            case "v4-angular":
                return this.getAppNames_v4angular();
            default:
                return ["unknown"];
        }
    }
    static getAppNames_v1() {
        let names = [];
        let $applets = $('div').filter(function () {
            return this.id.match(/app/i);
        });
        $applets.each(function () {
            names.push($(this).attr("id"));
        });
        return names;
    }
    static getAppNames_v4() {
        let $apps = $('*[data-app]');
        let _appsArray = [];
        $apps.each(function (index) {
            _appsArray.push($(this).attr("data-app"));
        });
        return _appsArray;
    }
    static getAppNames_v4angularjs() {
        return this.getAppNames_v4();
    }
    static getAppNames_v4angular() {
        return this.getAppNames_v4();
    }
    // *********
    static getAllApps() {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.getAllApps_v1();
            case "v4-angularjs":
                return this.getAllApps_v4angularjs();
            case "v4-angular":
                return this.getAllApps_v4angular();
            default:
                return [null];
        }
    }
    static getAllApps_v1() {
        // not verified
        let apps = [];
        let $applets = $('div').filter(function () {
            return this.id.match(/app/i);
        });
        $applets.each(function () {
            apps.push($(this)[0]);
        });
        return apps;
    }
    static getAllApps_v4() {
        let $apps = $('*[data-app]');
        let apps = [];
        $apps.each(function (index) {
            apps.push($(this)[0]);
        });
        return apps;
    }
    static getAllApps_v4angularjs() {
        return this.getAllApps_v4();
    }
    static getAllApps_v4angular() {
        let $apps = $('*[data-app] > :first');
        let apps = [];
        $apps.each(function (index) {
            apps.push($(this)[0]);
        });
        return apps;;
    }
    static getAllVisibleAppNames(){
        let visibleAppNames = [];
        let els = this.getAllApps();
        for (const el of els) {
            if (this.isElementVisible(el)) {
                let appName = el.getAttribute("data-app");
                if (appName != "") {
                    visibleAppNames.push(appName)
                }
            }
        }
        return visibleAppNames;
    }
    // amelia
    static getAllAppNames() {
        var $apps = $('*[data-app]:visible');
        var _appsArray = [];

        $apps.each(function (index) {
            _appsArray.push($(this).attr("data-app"));
        });
        return _appsArray
    }
    static getAllComponentAppNames() {
        var $apps = $('*[data-app]:visible');
        var _appsArray = [];

        $apps.each(function (index) {
            var _appName = $(this).attr("data-app");
            var is = $(this).isolateScope();
            var isComponent = is.applet.component;
            if (isComponent) {
                /*
                var _componentName = is.applet.componentType;
                _appsArray.push({
                    appName: _appName,
                    componentName: _componentName
                })
                */
                _appsArray.push(_appName);
            }
        });
        return _appsArray
    }
    static getAllComponentInfo(optionalAddedInfo) {

        var $apps = $('*[data-app]:visible');
        var _appsArray = [];
        var _this = this;

        $apps.each(function (index) {

            var _appName = $(this).attr("data-app");
            var is = $(this).isolateScope();
            var isComponent = is.applet.component;

            if (isComponent) {
                
                var _componentName = is.applet.componentType;
                var _componentPartsObj = _this.getIcComponentInstance(_componentName, _appName);
                var _parts = (_componentPartsObj != null) ? _componentPartsObj.GetPartsReport() : null;
                var _url = window.location;

                _appsArray.push({
                    appName: _appName,
                    componentName: _componentName,
                    url: _url,
                    parts: _parts
                })
            }
        });
        return JSON.stringify(_appsArray);
    }
    static getComponentInfoByAppName(_appName, _additionalInjectedInfo) {

        var $app = $('[data-app="' + _appName + '"]:visible');
        var $is = $app.isolateScope();
        var isComponent = $is.applet.component;
        var componentInfo = {};
        var _this = this;

        if (isComponent) {

            var _componentName = $is.applet.componentType;
            var _componentPartsObj = _this.getIcComponentInstance(_componentName, _appName);
            var _parts = (_componentPartsObj != null) ? _componentPartsObj.GetPartsReport() : null;
            var _url = window.location;

            componentInfo.appName = _appName;
            componentInfo.componentName = _componentName;
            componentInfo.url = _url;
            componentInfo.parts = _parts;

            if (_additionalInjectedInfo != undefined) {
                // parse it
                try {

                    if (typeof _additionalInjectedInfo == 'object') {
                        _additionalInjectedInfo = JSON.stringify(_additionalInjectedInfo);
                    }

                    var _additionalInfoObj = JSON.parse(_additionalInjectedInfo);

                    // Iterate over the properties of the object
                    for (var key in _additionalInfoObj) {
                        if (_additionalInfoObj.hasOwnProperty(key)) {
                            componentInfo[key] = _additionalInfoObj[key]
                        }
                    }
                } catch (error) {
                    console.error("Error parsing JSON string:", error);
                }
            }
        }
        return JSON.stringify(componentInfo);
        /*
        Example:
        {
            appName: "CPD.WhatsNew.App",
            componentName: "DocumentSliderV4",
            ...
        }
        */
    }
    static getIcComponentInstance(componentName, appName) {

        var componentInstance;

        switch (componentName.toLowerCase()) {

            case "documentsliderv4":
                componentInstance = new ictf.DocumentSliderV4(appName);
                break;

            case "repeaterv4":
                componentInstance = new ictf.RepeaterV4(appName);
                break;

            case "answerprogress":
                componentInstance = new ictf.AnswerProgress(appName);
                break;

            case "donutchartv4":
                componentInstance = new ictf.DonutChartV4(appName);
                break;

            case "donutprogress":
                componentInstance = new ictf.DonutProgress(appName);
                break;

            case "plaidlink":
                componentInstance = new ictf.PlaidLink(appName);
                break;

            case "stockchartv4":
                componentInstance = new ictf.StockChartV4(appName);
                break;

            default:
                componentInstance = null;
        }

        return componentInstance;
    }
    static getUrlsFromIcMenuObject() {

        function extractLinks(data) {
            const links = [];
        
            function processItem(item) {
                if (!item || typeof item !== 'object') {
                    return;
                }
        
                if (item.link != null && typeof item.link === 'string' && item.link.trim()) {
                    links.push(item.link);
                }
        
                if (item.subMenu && Array.isArray(item.subMenu)) {
                    item.subMenu.forEach(processItem);
                }
            }
        
            if (Array.isArray(data)) {
                data.forEach(processItem);
            }
        
            return links;
        }

        let extractedLinks = extractLinks(window.icMenuDefaultItems);

        // remove signout or logout links
        extractedLinks = extractedLinks.filter(str => !str.toLowerCase().includes("signin"));
        extractedLinks = extractedLinks.filter(str => !str.toLowerCase().includes("login"));
        extractedLinks = extractedLinks.filter(str => !str.toLowerCase().includes("signout"));
        extractedLinks = extractedLinks.filter(str => !str.toLowerCase().includes("logout"));
        extractedLinks = extractedLinks.filter(str => str !== "#");

        return extractedLinks;
    }
    // *********
    // appTypes: all, input, list, component
    static getAppCountOfType(appType) {
        let appNames = this.getAppNames();
        let allAppsCount = 0, inputAppCount = 0, listAppCount = 0, componentCount = 0;
        for (let appName of appNames) {
            // list apps (and now input apps) may also be components
            allAppsCount++;
            if (Util.isComponent(appName)) {
                componentCount++;
            }
            if (Util.isInputApp(appName)) {
                inputAppCount++;
            }
            else if (Util.isListApp(appName)) {
                listAppCount++;
            }
        }
        switch (appType) {
            case "all":
                return allAppsCount;
            case "input":
                return inputAppCount;
            case "list":
                return listAppCount;
            case "component":
                return componentCount;
        }
    }
    static getAllAppsCount() {
        let appNames = this.getAppNames();
        let allAppsCount = 0, inputAppCount = 0, listAppCount = 0, componentCount = 0, chartAppCount = 0, hiddenAppCount = 0;
        for (let appName of appNames) {
            let appEl = this.getAppElement(appName);
            // list apps (and now input apps) may also be components
            allAppsCount++;
            if (Util.isComponent(appName)) {
                componentCount++;
            }
            if (Util.isInputApp(appName)) {
                inputAppCount++;
            }
            else if (Util.isListApp(appName)) {
                listAppCount++;
            }
            if (Util.isChartApp(appName)) {
                chartAppCount++;
            }
            if (!this.isElementVisible(appEl)) {
                hiddenAppCount++;
            }
        }
        return {
            "all": allAppsCount,
            "input": inputAppCount,
            "list": listAppCount,
            "chart": chartAppCount,
            "component": componentCount,
            "hidden": hiddenAppCount
        };
    }
    static getAppElement(appName, _instance = 0) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.getAppElement_v1(appName);
            case "v4-angularjs":
                return this.getAppElement_v4_angularJS(appName, _instance);
            case "v4-angular":
                return this.getAppElement_v4_angular(appName, _instance);
            default:
                return null;
        }
    }
    static getAppElement_v1(appName) {
        // not verified
        return eval("$(\"body\")[0]");
    }
    static getAppElement_v4_angularJS(appName, _instance = 0) {
        if (appName == null || appName == "") {
            return;
        }
        let el = null;
        try {
            //el = eval("$(\"[data-app='" + appName + "']\").eq(" + _instance + ")[0]");
            el = $("[data-app='" + appName + "']").eq(_instance)[0];
        }
        catch (exception) {
            throw new Error("element cannot be null");
        }
        if (el == null) {
            throw new Error("element cannot be null");
        }
        return el;
    }
    static getAppElement_v4_angular(appName, _instance = 0) {
        // not verified
        try {
            //return eval("$(\"[data-app='" + appName + "']\").eq(" + _instance + ")[0]");
            return $("[data-app='" + appName + "']").eq(_instance)[0];
        }
        catch (exception) {
            return null;
        }
    }
    static scrollToElement(el) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(el).offset().top
        }, 500);
    }
    static scrollToElementAndHighlight(el) {
        let _this = this;
        if (this.isElementInViewport(el)) {
            _this.addCssClass(el, "icsa-heighlighted-app");
        }
        else {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(el).offset().top
            }, 500).promise().done(function () {
                _this.addCssClass(el, "icsa-heighlighted-app");
            });
        }
    }
    static isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */);
    }
    static addCssClass(el, className) {
        $(el).addClass(className);
    }
    static removeCssClass(el, className) {
        $(el).removeClass(className);
    }
    static removeCssClassFromAllElements(className) {
        $("*").removeClass(className);
    }
    static unhighlightAllAppElements() {
        let apps = this.getAllApps();
        for (let app of apps) {
            this.removeCssClass(app, "icsa-heighlighted-app");
        }
    }
    static highlightAllAppElements() {
        let apps = this.getAllApps();
        for (let app of apps) {
            this.addCssClass(app, "icsa-heighlighted-app");
        }
    }
    static elementWidthAndHeightNotZero(el){
        try {
            let result = el.offsetHeight != 0 && el.offsetWidth != 0;
            return result;
        } catch(err){
            return false;
        }
    }
    static isElementVisible(el) {
        // check all following conditions
        let jqVisible = this.elJqVisibleCheck(el);
        let hasAriaHidden = this.elHasAttribute(el, "aria-hidden", "true");
        let anyParentHasAriaHidden = this.anyParentHasAttributeWithValue(el, "aria-hidden", "true");
        let anyParentHasOpacityZero = this.anyParentHasCssPropertyWithValue(el, "opacity", "0");
        let widthAndHeightNotZero = this.elementWidthAndHeightNotZero(el);
        return jqVisible && !hasAriaHidden && !anyParentHasAriaHidden && !anyParentHasOpacityZero && widthAndHeightNotZero;
    }
    static elHasAttribute(el, _attr, _attrValue) {
        if ($(el).attr(_attr) != undefined) {
            return $(el).attr(_attr) == _attrValue;
        }
        else {
            return false;
        }
    }
    static elHasCssPropValue(el, cssPropName, cssPropValue) {
        return false;
    }
    static anyParentHasAttributeWithValue(el, _attr, _attrValue) {
        let result = false;
        $(el).parents().each(function () {
            let _actualAttrValue = $(this).attr(_attr);
            if (_actualAttrValue != undefined) {
                if (_actualAttrValue == _attrValue) {
                    result = true;
                    // breaking loop
                    return false;
                }
            }
        });
        return result;
    }
    static anyParentHasCssPropertyWithValue(el, _cssProp, _value) {
        let result = false;
        $(el).parents().each(function () {
            let _actualValue = $(this).css(_cssProp);
            if (_actualValue != undefined) {
                if (_actualValue == _value) {
                    result = true;
                    // breaking loop
                    return false;
                }
            }
        });
        return result;
    }
    static anyParentHasCssValue(el, _cssProp, _cssValue) {
        let result = false;
        $(el).parents().each(function () {
            let _actualCssValue = $(this).css(_cssProp);
            if (_actualCssValue != undefined) {
                if (_actualCssValue == _cssValue) {
                    result = true;
                    // breaking loop
                    return false;
                }
            }
        });
        return result;
    }
    static elJqVisibleCheck(el) {
        return $(el).is(":visible");
    }
    static getElVisibilityStatus(el) {
        if (this.isElementVisible(el)) {
            return "visible";
        }
        else {
            return "hidden";
        }
    }
    static isAppDuplicated(name, names) {
        let count = names.filter(item => item == name).length;
        return count > 1;
    }
    // get the index of appearance of type of a string in an array
    // so for example if 'a' exists three times in an array [a,b,c,a,d,a],
    // then this function should return 1 (or 0) for first instance (4 or 3) for second, and (5 or 6) for second
    // then return the orderOfAppearance
    static getIndexOfAppearanceOfType(_item, _items, currentIterationIndex) {
        // do a for loop from 0 to currentIterationIdex
        // return count of times item has appeared in array and return it
        let count = 0;
        for (let i = 0, l = _items.length; i < l; i++) {
            if (i == currentIterationIndex) {
                break;
            }
            if (_item == _items[i]) {
                count++;
            }
        }
        return count;
    }
    static getAppNamesByType(appType) {
        let siteVersion = Page.getSiteVersion();
        switch (siteVersion) {
            case "v1":
                return this.getAppNamesByType_v1(appType);
            case "v4-angularjs":
            case "v4-angular":
                return this.getAppNamesByType_v4(appType);
            default:
                return ["unknown"];
        }
    }
    static getAppNamesByType_v1(appType) {
        throw "not implemented";
    }
    static getAppNamesByType_v4(appType) {
        let $apps = $('*[data-app]');
        let _appsArray = [];
        $apps.each(function (index) {
            let $this = $(this);
            let appName = $this.attr("data-app");
            switch (appType.toLowerCase()) {
                case "all":
                    _appsArray.push(appName);
                    break;
                case "input":
                    if (Util.isInputApp(appName)) {
                        _appsArray.push(appName);
                    }
                    break;
                case "list":
                    if (Util.isListApp(appName)) {
                        _appsArray.push(appName);
                    }
                    break;
                case "component":
                    if (Util.isComponent(appName)) {
                        _appsArray.push(appName);
                    }
                    break;
                case "chart":
                    if (Util.isChartApp(appName)) {
                        _appsArray.push(appName);
                    }
                    break;
                case "hidden":
                    if (!Page.isElementVisible($this[0])) {
                        _appsArray.push(appName);
                    }
                    break;
                default:
            }
        });
        return _appsArray;
    }
    static getUrlModel() {
        const url = window.location;
        const urlModel = {
            Scheme: url.protocol.replace(':', ''),
            Host: url.hostname,
            Port: url.port ? parseInt(url.port) : null,
            Path: url.pathname,
            Query: url.search ? url.search.substring(1) : '',
            Fragment: url.hash ? url.hash.substring(1) : '',
            Title: document.title,
            FullUrl: url.href,
            GeneratedTitleFromParts: generatedTitle
        };
        var generatedTitle = CreateTitle(urlModel.Path, urlModel.Fragment, urlModel.FullUrl);
        urlModel.GeneratedTitleFromParts = generatedTitle;
    
        return urlModel;
    
        function CreateTitle(path, fragment, fullPath) {
            if (!path?.trim() || !fragment?.trim()) {
                // Cleanup task: Remove non-alphanumeric characters and "http"/"https"
                return fullPath
                    .replace(/https?:\/\//gi, '') // Remove http or https
                    .replace(/[^a-zA-Z0-9]/g, ''); // Remove all non-alphanumeric characters
            }
    
            // Process the path: Get the file name without the extension
            const pathParts = path.split('/');
            let fileName = pathParts[pathParts.length - 1]?.split('.')[0] || '';
    
            // Process the fragment
            let fragmentPart;
            if (fragment.includes('=')) {
                fragmentPart = fragment.split('=').pop() || '';
            } else {
                // Work backwards to find the first non-alphanumeric character
                let index = fragment.length - 1;
                while (index >= 0 && /[a-zA-Z0-9]/.test(fragment[index])) {
                    index--;
                }
    
                fragmentPart = fragment.substring(index + 1); // Get substring after the non-alphanumeric character
            }
    
            // Remove non-alphanumeric characters from fileName and fragmentPart
            fileName = fileName.replace(/[^a-zA-Z0-9]/g, '');
            fragmentPart = fragmentPart.replace(/[^a-zA-Z0-9]/g, '');
    
            // Concatenate processed parts with an underscore
            return `${fileName}_${fragmentPart}`;
        }
    }
}

export default Page;
