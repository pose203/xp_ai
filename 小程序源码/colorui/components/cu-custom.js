(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"5ba6":function(t,n,a){"use strict";a.r(n);var u=a("659d"),e=a("753f");for(var c in e)["default"].indexOf(c)<0&&function(t){a.d(n,t,(function(){return e[t]}))}(c);var o=a("f0c5"),r=Object(o["a"])(e["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],void 0);n["default"]=r.exports},"659d":function(t,n,a){"use strict";a.d(n,"b",(function(){return u})),a.d(n,"c",(function(){return e})),a.d(n,"a",(function(){}));var u=function(){var t=this.$createElement;this._self._c},e=[]},"753f":function(t,n,a){"use strict";a.r(n);var u=a("fb55"),e=a.n(u);for(var c in u)["default"].indexOf(c)<0&&function(t){a.d(n,t,(function(){return u[t]}))}(c);n["default"]=e.a},fb55:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,u="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(a,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};n.default=a}).call(this,a("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5ba6"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
