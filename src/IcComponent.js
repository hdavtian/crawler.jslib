class IcComponent {
    
    El;
    Metrics;
    AppName;
    ComponentName;
    AppMainCssSelector;
    ComponentMainCssSelector
    Parts;
    
    constructor(_appName){
        this.AppName = _appName;
        this.AppMainCssSelector = `[data-app='${this.AppName}']`;
        this.El = document.querySelector(this.AppMainCssSelector);
        this.Metrics = this.GetElementMetrics(this.El);
        this.Parts = [];
        this.ComponentName = this.GetComponentName();
        
    }
    GetEl(){
        return this.El;
    }
    Highlight(){
        this.HighlightEl(this.El, "green")
    }
    HighlightEl(el, borderStyle){
        //el.style.border = borderStyle;
        if (el.tagName.toLowerCase() === 'td') {
            el.style.setProperty('background', "cyan", 'important');
        } else {
            el.style.setProperty('border', borderStyle, 'important');
        }
    }
    // parts is an array[obj]
    HighlightAllParts(){
        for (const part of this.Parts){
            let els = this.El.querySelectorAll(part.cssSelector);
            els.forEach(el => {
                this.HighlightEl(el, part.borderStyle);
            })
        }
    }
    GetPartsReport(){
        let report = [];
        
        for (const part of this.Parts){
            let info = {};
            let els = this.El.querySelectorAll(part.cssSelector);
            info["name"] = part.name;
            info["cssSelector"] = part.cssSelector;
            if (els.length > 0){
                info["exists"] = true;                
            } else {
                info["exists"] = false;
            }
            report.push(info);
        }
        console.log(report);
        return report;
    }
    UnHighlight(){
        this.El.style.border = "none";
    }

    GetElementMetrics(element) {
        let rect = element.getBoundingClientRect();
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            right: rect.right + scrollLeft,
            bottom: rect.bottom + scrollTop,
            width: rect.width,
            height: rect.height
        };
    }

    GetComponentName(){
        let _is = $(this.El).isolateScope()
        let isComponent = _is.applet.component;
        return _is.applet.componentType;
    }
    
    PublishInfo(){
        let reports = this.GetPartsReport();
        // Create a new <div> element with jQuery
        let _width = 350;
        var $div = $('<div class="component-metrics"></div>');
    
        // Construct the content with different tags and elements
        var content = '<div class="main-wrapper">';
        content += `
            <table class='ictf-component-info'>
                <tr>
                    <th>Component Name</th>
                    <td>${this.ComponentName}</td>
                </tr>
                <tr>
                    <th>App Name</th>
                    <td>${this.AppName}</td>
                </tr>
        `;
        reports.forEach(report => {
            let status = (report.exists) ? 'true' : 'x';
            content += `
               <tr>
                   <th>${report.name}</th>
                   <td>${status}</td>
               </tr>
                ` 
        });
        
        content += '</table>'
        content += '</div>';
    
        // Set the content inside the div
        $div.html(content);
    
        // Apply some inline styles
        $div.css({
            'position': 'absolute',
            'width': _width + 'px',
            'top': this.Metrics.top + 'px',
            /*'left': (this.Metrics.left - _width - 25) + 'px',*/
            'left': (this.Metrics.left + 15) + 'px',
            'background-color': 'yellow',
            'color': 'black',
            'padding': '10px',
            'border': '5px solid black',
            'z-index': '99999'
        });
    
        // Append the div to the body
        $('body').append($div);
    }
}

export default IcComponent;