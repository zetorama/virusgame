webpackJsonp([1],{36:function(t,e,r){"use strict";var n=r(20),i=r(87),a=r(82),s=r.n(a),o=r(83),l=r.n(o);n.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"game",component:l.a},{path:"/hello",name:"Hello",component:s.a}]})},37:function(t,e,r){function n(t){r(79)}var i=r(19)(r(38),r(84),n,null,null);t.exports=i.exports},38:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},39:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js sfsfsfs"}}}},40:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(21),i=r.n(n),a=r(44),s=r.n(a),o=r(46),l=r.n(o),u=r(45),h=r.n(u);e.default={name:"matrix",components:{},props:{shouldRemoveEmptyRow:{type:Boolean,default:!0},shouldStartWithRandoms:{type:Boolean,default:!1},colsN:{type:Number,default:10},rowsN:{type:Number,default:16},targetSum:{type:Number,default:10},sequence:{type:Array,default:function(){return[0,1,2,3,4,5,6,7,8,9,0,0,0,1,0,2,0,3,0,4]}}},data:function(){return{chained:[],matrix:this.fill([],this.shouldStartWithRandoms?this.generate(2*this.sequence.length):this.sequence)}},computed:{curSequence:function(){var t=this;return this.matrix.reduce(function(e,r){return e.concat(r.filter(function(e){return t.isAlive(e)}))},[])}},watch:{matrix:function(){this.hasSpace()||this.onGameOver()},curSequence:function(t){t.length<1&&this.onGameWon()},chained:function(t){t.length>1&&this.onChained()}},methods:{onChoose:function(t){this.isCell(t)&&(this.isChained(t)?this.toggle("off",t):this.toggle("on",t))},onChained:function(){if(!(this.chained.length<2)){var t=h()(this.chained,2),e=t[0],r=t[1];if(this.isChainablePair(e,r)){var n=this.getCell(e),i=this.getCell(r);if(n===i||n+i===this.targetSum)return void this.destroy.apply(this,l()(this.chained))}this.chained.splice(0,this.chained.length-1)}},onNext:function(){this.chained=[],this.reproduce()},onRestart:function(){s()(this.$data,this.$options.data.apply(this))},onGameWon:function(){alert("WIN!")},onGameOver:function(){alert("FINITA!")},clsCell:function(t){var e=this.isCell(t),r=!e&&this.isCleared(t),n=!e&&!r;return{"is-digit":e,"is-clean":r,"is-empty":n,"is-active":!n&&this.isChained(t)}},generate:function(t){return[].concat(l()(Array(t))).map(function(t){return Math.min(9,Math.floor(10*Math.random()))})},toggle:function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];if(!this.chained.length){var a;return"off"!==t&&(a=this.chained).push.apply(a,l()(r)),this}var s=this.chained.slice(),o=!0,u=!1,h=void 0;try{for(var c,v=i()(r);!(o=(c=v.next()).done);o=!0){var d=c.value,f=s.findIndex(this._chainedMatcher(d));~f&&"on"!==t?s.splice(f,1):~f||"off"===t||s.push(d)}}catch(t){u=!0,h=t}finally{try{!o&&v.return&&v.return()}finally{if(u)throw h}}return this.chained=s,this},process:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return this.destroy.apply(this,l()(e.length?e:this.chained)),this},destroy:function(){for(var t=this,e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return this.toggle.apply(this,["off"].concat(l()(r))),this.matrix=this.matrix.map(function(e,n){var a=e.slice(),s=!0,o=!1,l=void 0;try{for(var u,c=i()(r);!(s=(u=c.next()).done);s=!0){var v=u.value,d=h()(v,2),f=d[0],m=d[1];f===n&&t.isAlive(a[m])&&(a[m]=null)}}catch(t){o=!0,l=t}finally{try{!s&&c.return&&c.return()}finally{if(o)throw l}}if(!t.shouldRemoveEmptyRow||!a.every(function(t){return null===t}))return a}).filter(Boolean),this},reproduce:function(){return this.matrix=this.fill(this.clone()),this},clone:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.matrix;return Array.isArray(t)?t.map(function(t){return t.slice()}):[]},fill:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.curSequence,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.colsN,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.rowsN;t.length||t.push([]);var a=t.length-1,s=t[a].length,o=!0,l=!1,u=void 0;try{for(var h,c=i()(e);!(o=(h=c.next()).done);o=!0){var v=h.value;if(s<r)t[a].push(v),s++;else{if(a++,n&&a===n)break;t[a]=[v],s=1}}}catch(t){l=!0,u=t}finally{try{!o&&c.return&&c.return()}finally{if(l)throw u}}return t},hasSpace:function(){if(!this.rowsN)return!0;var t=this.matrix.length;return t<this.rowsN||t===this.rowsN&&this.matrix[t-1].length<this.colsN},getCell:function(t){var e=h()(t,2),r=e[0],n=e[1];return this.matrix[r]&&this.isAlive(this.matrix[r][n])?Number(this.matrix[r][n]):void 0},isAlive:function(t){return!!t||0===t},isCell:function(t){var e=h()(t,2),r=e[0],n=e[1];return this.isAlive(this.getCell([r,n]))||!1},isChainable:function(t){if(!this.chained.length)return!0;var e=!0,r=!1,n=void 0;try{for(var a,s=i()(this.chained);!(e=(a=s.next()).done);e=!0){var o=a.value,l=h()(o,2),u=l[0],c=l[1];if(this.isChainablePair(t,[u,c]))return!0}}catch(t){r=!0,n=t}finally{try{!e&&s.return&&s.return()}finally{if(r)throw n}}return!1},isChainablePair:function(t,e){var r=h()(t,2),n=r[0],i=r[1],a=h()(e,2),s=a[0],o=a[1];if(n===s&&i===o)return!1;if(n===s){for(var l=Math.min(i,o)+1;l<Math.max(i,o);l++)if(this.isCell([n,l]))return!1;return!0}if(i===o){for(var u=Math.min(n,s)+1;u<Math.max(n,s);u++)if(this.isCell([u,i]))return!1;return!0}if(Math.abs(n-s)===Math.abs(i-o)){for(var c=n<s?1:-1,v=i<o?1:-1,d=n+1*c,f=i+1*v;c>0&&d<s||c<0&&d>s;d+=c,f+=v)if(this.isCell([d,f]))return!1;return!0}return!1},isChained:function(t){return this.chained.some(this._chainedMatcher(t))},isCleared:function(t){var e=h()(t,2),r=e[0],n=e[1],i=this.matrix.length;return r+1<i||r+1===i&&n<this.matrix[r].length},_chainedMatcher:function(t){var e=h()(t,2),r=e[0],n=e[1];return function(t){var e=h()(t,2),i=e[0],a=e[1];return i===r&&a===n}}}}},41:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(20),i=r(37),a=r.n(i),s=r(36);n.a.config.productionTip=!1,new n.a({el:"#app",router:s.a,template:"<App/>",components:{App:a.a}})},79:function(t,e){},80:function(t,e){},81:function(t,e){},82:function(t,e,r){function n(t){r(80)}var i=r(19)(r(39),r(85),n,"data-v-985da41c",null);t.exports=i.exports},83:function(t,e,r){function n(t){r(81)}var i=r(19)(r(40),r(86),n,"data-v-9e54515e",null);t.exports=i.exports},84:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("span",{attrs:{id:"logo"}},[t._v("√1Ⓡи$")]),t._v(" "),r("h1",[t._v("Virus: The Game")]),t._v(" "),r("router-view",{attrs:{id:"content"}})],1)},staticRenderFns:[]}},85:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"hello"},[r("h1",[t._v(t._s(t.msg))]),t._v(" "),r("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),r("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",[r("li",[r("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),r("li",[r("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),r("li",[r("a",{attrs:{href:"https://gitter.im/vuejs/vue",target:"_blank"}},[t._v("Gitter Chat")])]),t._v(" "),r("li",[r("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),r("br"),t._v(" "),r("li",[r("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",[r("li",[r("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[t._v("vue-router")])]),t._v(" "),r("li",[r("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[t._v("vuex")])]),t._v(" "),r("li",[r("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[t._v("vue-loader")])]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[t._v("awesome-vue")])])])}]}},86:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"matrix-cmp"},[r("header",{staticClass:"header"},[r("form",{staticClass:"options muted"},[r("strong",[t._v("Options:")]),t._v(" "),r("span",{staticClass:"option"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.shouldRemoveEmptyRow,expression:"shouldRemoveEmptyRow"}],attrs:{type:"checkbox",id:"shouldRemoveEmptyRow"},domProps:{checked:Array.isArray(t.shouldRemoveEmptyRow)?t._i(t.shouldRemoveEmptyRow,null)>-1:t.shouldRemoveEmptyRow},on:{__c:function(e){var r=t.shouldRemoveEmptyRow,n=e.target,i=!!n.checked;if(Array.isArray(r)){var a=t._i(r,null);i?a<0&&(t.shouldRemoveEmptyRow=r.concat(null)):a>-1&&(t.shouldRemoveEmptyRow=r.slice(0,a).concat(r.slice(a+1)))}else t.shouldRemoveEmptyRow=i}}}),t._v(" "),r("label",{attrs:{for:"shouldRemoveEmptyRow"}},[t._v("Remove Empty Row(s)")])]),t._v(" "),r("br"),t._v(" "),r("span",{staticClass:"option"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.shouldStartWithRandoms,expression:"shouldStartWithRandoms"}],attrs:{type:"checkbox",id:"shouldStartWithRandoms"},domProps:{checked:Array.isArray(t.shouldStartWithRandoms)?t._i(t.shouldStartWithRandoms,null)>-1:t.shouldStartWithRandoms},on:{__c:function(e){var r=t.shouldStartWithRandoms,n=e.target,i=!!n.checked;if(Array.isArray(r)){var a=t._i(r,null);i?a<0&&(t.shouldStartWithRandoms=r.concat(null)):a>-1&&(t.shouldStartWithRandoms=r.slice(0,a).concat(r.slice(a+1)))}else t.shouldStartWithRandoms=i}}}),t._v(" "),r("label",{attrs:{for:"shouldStartWithRandoms"}},[t._v("Start with Random Sequence")])]),t._v(" "),r("br"),t._v(" "),r("span",{staticClass:"option"},[t._v("\n        Max Rows:\n        "),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.rowsN,expression:"rowsN",modifiers:{number:!0}}],attrs:{type:"radio",id:"rowsN-16",value:"16"},domProps:{checked:t._q(t.rowsN,t._n("16"))},on:{__c:function(e){t.rowsN=t._n("16")}}}),t._v(" "),r("label",{attrs:{for:"rowsN-16"}},[t._v("16")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.rowsN,expression:"rowsN",modifiers:{number:!0}}],attrs:{type:"radio",id:"rowsN-32",value:"32"},domProps:{checked:t._q(t.rowsN,t._n("32"))},on:{__c:function(e){t.rowsN=t._n("32")}}}),t._v(" "),r("label",{attrs:{for:"rowsN-32"}},[t._v("32")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.rowsN,expression:"rowsN",modifiers:{number:!0}}],attrs:{type:"radio",id:"rowsN-0",value:"0"},domProps:{checked:t._q(t.rowsN,t._n("0"))},on:{__c:function(e){t.rowsN=t._n("0")}}}),t._v(" "),r("label",{attrs:{for:"rowsN-0"}},[t._v("∞")])])]),t._v(" "),r("div",{staticClass:"actions"},[r("button",{on:{click:function(e){e.preventDefault(),t.onRestart(e)}}},[t._v("Restart")]),t._v(" "),r("button",{on:{click:function(e){e.preventDefault(),t.onNext(e)}}},[t._v("Next round")])]),t._v(" "),r("dl",{staticClass:"info muted"},[r("dt",[t._v("Sequence length:")]),t._v(" "),r("dd",[t._v(t._s(this.curSequence.length))]),t._v(" "),r("dt",[t._v("Rows number:")]),t._v(" "),r("dd",[t._v(t._s(t.matrix.length))]),t._v(" "),r("dt",[t._v("Max Size:")]),t._v(" "),t.rowsN?r("dd",[t._v(t._s(t.colsN)+"×"+t._s(t.rowsN))]):r("dd",[t._v("unlim")])])]),t._v(" "),r("article",{staticClass:"matrix"},t._l(t.matrix,function(e,n){return r("div",{key:n,staticClass:"row"},t._l(t.colsN,function(e){return r("div",{key:e,class:["cell",t.clsCell([n,e-1])],on:{click:function(r){t.onChoose([n,e-1])}}},[t.isCell([n,e-1])?r("span",{staticClass:"symbol digit"},[t._v("\n          "+t._s(t.getCell([n,e-1]))+"\n        ")]):t.isCleared([n,e-1])?r("span",{staticClass:"symbol cleared"},[t._v("\n          •\n        ")]):t._e()])}))})),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("aside",{staticClass:"guidelines muted"},[r("dl",[r("dt",[t._v("Goal:")]),t._v(" "),r("dd",[t._v("You need to clear up all INFECTED cells")]),t._v(" "),r("dt",[t._v("Next Round:")]),t._v(" "),r("dd",[t._v("It just DUPLICATES current strain")])]),t._v(" "),r("h3",[t._v("You can neutralize TWO infected cells by these RULES:")]),t._v(" "),r("ul",[r("li",[t._v("They both should be on the same VERTICAL, HORIZONTAL or DIAGONAL,")]),t._v(" "),r("li",[t._v("They both should be VISIBLE to each other,")]),t._v(" "),r("li",[t._v("They both should have the SAME VALUE or make a SUM OF 10.")])])])}]}}},[41]);
//# sourceMappingURL=app.3c5e2415d06d0c6955f2.js.map