(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/newsdetail/newsdetail"],{"1f15":function(t,e,n){"use strict";(function(t){n("3a5c");a(n("66fd"));var e=a(n("467e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"36ef":function(t,e,n){"use strict";var a=n("9364"),r=n.n(a);r.a},"467e":function(t,e,n){"use strict";n.r(e);var a=n("de89"),r=n("7fd8");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n("36ef");var o,f=n("f0c5"),c=Object(f["a"])(r["default"],a["b"],a["c"],!1,null,"741e2b73",null,!1,a["a"],o);e["default"]=c.exports},"7fd8":function(t,e,n){"use strict";n.r(e);var a=n("a60c"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=r.a},9364:function(t,e,n){},a60c:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{list:{},indicatorDots:!0,interval:2e3,duration:500}},onLoad:function(t){this.list=JSON.parse(decodeURIComponent(t.data))},filters:{formatDate:function(t){if(""!=t&&null!=t){var e=new Date(t),n=e.getMonth()+1,a=e.getFullYear()+"-"+n+"-"+e.getDate();return a.replace(/-/g,"/"),a}}},methods:{}};e.default=a},de89:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=(t._self._c,t._f("formatDate")(t.list.CreateAt));t.$mp.data=Object.assign({},{$root:{f0:n}})},u=[]}},[["1f15","common/runtime","common/vendor"]]]);