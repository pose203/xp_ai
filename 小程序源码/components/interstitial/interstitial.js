(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/interstitial/interstitial"],{"05c3":function(t,n,e){"use strict";(function(t,e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=null,i=null,r={data:function(){return{}},mounted:function(){var n=Math.round(Math.random());if(1==n){var r=t.getStorageSync("setting");"1"==r.wxConfig.is_ad&&""!=r.wxConfig.ad_screen&&1!=t.getStorageSync("kami_time")&&(e.createInterstitialAd&&(o=e.createInterstitialAd({adUnitId:r.wxConfig.ad_screen}),o.onLoad((function(){})),o.onError((function(t){})),o.onClose((function(){}))),i=setTimeout((function(){o&&o.show().catch((function(t){console.error(t)}))}),5e3))}},beforeDestroy:function(){i&&(clearTimeout(i),i=null)},methods:{}};n.default=r}).call(this,e("543d")["default"],e("bc2e")["default"])},8946:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var o=function(){var t=this.$createElement;this._self._c},i=[]},b3d7:function(t,n,e){"use strict";e.r(n);var o=e("05c3"),i=e.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=i.a},c97d:function(t,n,e){"use strict";e.r(n);var o=e("8946"),i=e("b3d7");for(var r in i)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(r);var u=e("f0c5"),a=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);n["default"]=a.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/interstitial/interstitial-create-component',
    {
        'components/interstitial/interstitial-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c97d"))
        })
    },
    [['components/interstitial/interstitial-create-component']]
]);
