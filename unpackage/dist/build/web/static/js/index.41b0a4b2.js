(function(n){function e(e){for(var o,r,c=e[0],u=e[1],s=e[2],l=0,d=[];l<c.length;l++)r=c[l],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&d.push(a[r][0]),a[r]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(n[o]=u[o]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,s||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],o=!0,c=1;c<t.length;c++){var u=t[c];0!==a[u]&&(o=!1)}o&&(i.splice(e--,1),n=r(r.s=t[0]))}return n}var o={},a={index:0},i=[];function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.e=function(n){var e=[],t=a[n];if(0!==t)if(t)e.push(t[2]);else{var o=new Promise((function(e,o){t=a[n]=[e,o]}));e.push(t[2]=o);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,r.nc&&c.setAttribute("nonce",r.nc),c.src=function(n){return r.p+"static/js/"+({"pages-chat-chat~pages-index-index":"pages-chat-chat~pages-index-index","pages-chat-chat":"pages-chat-chat","pages-index-index":"pages-index-index","pages-chat-right-chat":"pages-chat-right-chat"}[n]||n)+"."+{"pages-chat-chat~pages-index-index":"7543f17a","pages-chat-chat":"c0e3d449","pages-index-index":"9b2a51fa","pages-chat-right-chat":"7e43f5e5"}[n]+".js"}(n);var u=new Error;i=function(e){c.onerror=c.onload=null,clearTimeout(s);var t=a[n];if(0!==t){if(t){var o=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;u.message="Loading chunk "+n+" failed.\n("+o+": "+i+")",u.name="ChunkLoadError",u.type=o,u.request=i,t[1](u)}a[n]=void 0}};var s=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(e)},r.m=n,r.c=o,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},r.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)r.d(t,o,function(e){return n[e]}.bind(null,o));return t},r.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="./",r.oe=function(n){throw console.error(n),n};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var p=u;i.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("cdd7")},"158c":function(n,e,t){var o=t("a762");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);var a=t("967d").default;a("497192aa",o,!0,{sourceMap:!1,shadowMode:!1})},"179a":function(n,e,t){"use strict";t.r(e);var o=t("a665"),a=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=a.a},"25f1":function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){}));var o=function(){var n=this.$createElement,e=this._self._c||n;return e("App",{attrs:{keepAliveInclude:this.keepAliveInclude}})},a=[]},a665:function(n,e,t){"use strict";t("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=o},a762:function(n,e,t){var o=t("c86c");e=o(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*每个页面公共css */\n/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/::-webkit-scrollbar{　　width:5px!important;　　height:5px!important;　　background-color:transparent!important}\n/*定义滚动条轨道 内阴影+圆角*/::-webkit-scrollbar-track{　　border-radius:5px!important;　　background-color:transparent!important}\n/*定义滑块 内阴影+圆角*/::-webkit-scrollbar-thumb{　　border-radius:5px!important;　　background-color:#999!important}",""]),n.exports=e},cb84:function(n,e,t){"use strict";(function(n){var e=t("f5bd").default;t("473f"),t("bf0f"),t("de6c"),t("5c47"),t("a1c1");var o=e(t("9b8e")),a={keys:function(){return[]}};n["____74590C2____"]=!0,delete n["____74590C2____"],n.__uniConfig={globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8"},uniIdRouter:{}},n.__uniConfig.compilerVersion="4.36",n.__uniConfig.darkmode=!1,n.__uniConfig.themeConfig={},n.__uniConfig.uniPlatform="h5",n.__uniConfig.appId="__UNI__74590C2",n.__uniConfig.appName="flow-ai",n.__uniConfig.appVersion="1.0.0",n.__uniConfig.appVersionCode="100",n.__uniConfig.router={mode:"hash",base:"./"},n.__uniConfig.publicPath="./",n.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},n.__uniConfig.debug=!1,n.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},n.__uniConfig.sdkConfigs={},n.__uniConfig.qqMapKey=void 0,n.__uniConfig.googleMapKey=void 0,n.__uniConfig.aMapKey=void 0,n.__uniConfig.aMapSecurityJsCode=void 0,n.__uniConfig.aMapServiceHost=void 0,n.__uniConfig.locale="",n.__uniConfig.fallbackLocale=void 0,n.__uniConfig.locales=a.keys().reduce((function(n,e){var t=e.replace(/\.\/(uni-app.)?(.*).json/,"$2"),o=a(e);return Object.assign(n[t]||(n[t]={}),o.common||o),n}),{}),n.__uniConfig.nvue={"flex-direction":"column"},n.__uniConfig.__webpack_chunk_load__=t.e,o.default.component("pages-index-index",(function(n){var e={component:Promise.all([t.e("pages-chat-chat~pages-index-index"),t.e("pages-index-index")]).then(function(){return n(t("337b"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(n){return n(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(n){return n(__uniConfig["async"]["error"])}}),e})),o.default.component("pages-chat-chat",(function(n){var e={component:Promise.all([t.e("pages-chat-chat~pages-index-index"),t.e("pages-chat-chat")]).then(function(){return n(t("79c7"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(n){return n(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(n){return n(__uniConfig["async"]["error"])}}),e})),o.default.component("pages-chat-right-chat",(function(n){var e={component:t.e("pages-chat-right-chat").then(function(){return n(t("4656"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(n){return n(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(n){return n(__uniConfig["async"]["error"])}}),e})),n.__uniRoutes=[{path:"/",alias:"/pages/index/index",component:{render:function(n){return n("Page",{props:Object.assign({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{titleNView:!1})},[n("pages-index-index",{slot:"page"})])}},meta:{id:1,name:"pages-index-index",isNVue:!1,maxWidth:0,pagePath:"pages/index/index",isQuit:!0,isEntry:!0,windowTop:0}},{path:"/pages/chat/chat",component:{render:function(n){return n("Page",{props:Object.assign({},__uniConfig.globalStyle,{titleNView:{type:"transparent"}})},[n("pages-chat-chat",{slot:"page"})])}},meta:{name:"pages-chat-chat",isNVue:!1,maxWidth:0,pagePath:"pages/chat/chat",windowTop:0}},{path:"/pages/chat/right-chat",component:{render:function(n){return n("Page",{props:Object.assign({},__uniConfig.globalStyle,{titleNView:{type:"transparent"}})},[n("pages-chat-right-chat",{slot:"page"})])}},meta:{name:"pages-chat-right-chat",isNVue:!1,maxWidth:0,pagePath:"pages/chat/right-chat",windowTop:0}},{path:"/choose-location",component:{render:function(n){return n("Page",{props:{navigationStyle:"custom"}},[n("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(n){return n("Page",{props:{navigationStyle:"custom"}},[n("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}],n.UniApp&&new n.UniApp}).call(this,t("0ee4"))},cdd7:function(n,e,t){"use strict";var o=t("f5bd").default,a=o(t("9b1b"));t("3dde"),t("a8b2"),t("1480"),t("6e4a"),t("cb84"),t("9337");var i=o(t("ff79")),r=o(t("9b8e"));t("e3ce"),r.default.config.productionTip=!1,i.default.mpType="app";var c=new r.default((0,a.default)({},i.default));c.$mount()},dab3:function(n,e,t){"use strict";var o=t("158c"),a=t.n(o);a.a},e3ce:function(n,e,t){var o=t("bdbb").default;t("bf0f"),uni.addInterceptor({returnValue:function(n){return!n||"object"!==o(n)&&"function"!==typeof n||"function"!==typeof n.then?n:new Promise((function(e,t){n.then((function(n){return n[0]?t(n[0]):e(n[1])}))}))}})},ff79:function(n,e,t){"use strict";t.r(e);var o=t("25f1"),a=t("179a");for(var i in a)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return a[n]}))}(i);t("dab3");var r=t("828b"),c=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=c.exports}});