# v4-analyzer-helper-lib
https://gitlab.investcloud.com/hdavtian/v4-analyzer-helper-lib

## Table of contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)

## Description

- This is a javascript static library consisting of methods that help identify InvestCloud's v4 (angularJs and angular) widgets such as input apps, list apps, components and other things.
- Webpack is used to pack multiple js classes into one bundle accessible through a namespace/object callsed `ictf`
- This library is currently used in the Playwright Baseline Crawler.
- Most of the methods were developed for the v4-analyzer which is a js application that you can run in chrome browser snippets.

## Installation
To install, checkout the repo locally and cd into the project root and run

`npm install`

## Usage
CD into project root and run following command to use webpack to build the bundle which you can then use where ever you need. The bundle will be generated in the `dist` directory

`npx webpack`

When the bundle is injected onto your webpage, you can then use its methods like this

```javascript
ictf.Page.getAllAppNames();

ictf.Util.isListApp('my.app.name');

ictf.UtilByEl.isTabbedApp(element);
```
