"use strict";(self.webpackChunk_02_second_project=self.webpackChunk_02_second_project||[]).push([[3],{8003:function(e,s,a){a.r(s),a.d(s,{default:function(){return C}});var n=a(1413),t=a(2791),i="Dialogs_dialogs__gyKe4",r="Dialogs_dialogsItems__FazGJ",o="Dialogs_active__e6NF5",c="Dialogs_avatar__H19EZ",u="Dialogs_dialog__nc59J",d="Dialogs_messages__PEBvU",l="Dialogs_message__rsSkE",g=a(3504),m=a(184),x=function(e){var s="/dialogs/"+e.id;return(0,m.jsx)("div",{className:u+" "+o,children:(0,m.jsxs)(g.OL,{to:s,children:[(0,m.jsx)("img",{className:c,src:"".concat(e.avatar),alt:""}),e.name]})})},f=function(e){return(0,m.jsx)("div",{className:l,children:e.message})},v=a(5705),_=a(3079),h=function(e){return(0,m.jsx)("div",{children:(0,m.jsx)(v.J9,{initialValues:{messageText:""},validate:function(e){return(0,_.OC)(e,10)},onSubmit:function(s,a){var n=a.resetForm;!function(e,s){new Promise((function(s){s(e)})).then((function(e){alert("Sent"),console.log(e.messageText),s(e.messageText)}))}(s,e.addText),n(),console.log(s)},children:(0,m.jsxs)(v.l0,{children:[(0,m.jsx)(v.gN,{id:"messageText",name:"messageText",placeholder:"Type your message..."}),(0,m.jsx)("button",{type:"submit",children:"Submit"}),(0,m.jsx)(v.Bc,{name:"messageText",component:"div"})]})})})},j=function(e){var s=e.messagesPage.dialogsData.map((function(e){return(0,m.jsx)(x,{avatar:e.avatar,name:e.name,id:e.id},e.id)})),a=e.messagesPage.messagesData.map((function(e){return(0,m.jsx)(f,{message:e.message,id:e.id},e.id)}));return(0,m.jsxs)("div",{className:i,children:[(0,m.jsx)("div",{className:r,children:s}),(0,m.jsx)("div",{className:d,children:a}),(0,m.jsx)("div",{children:(0,m.jsx)(h,{addText:e.addText})})]})},p=a(5685),T=a(364),D=a(7781),A=a(6871),N=a(5954),C=(0,D.qC)((0,T.$j)((function(e){return{messagesPage:e.messagesPage,isAuth:e.auth.isAuth}}),{addMessageActionCreator:p.k}))((function(e){var s=(0,A.s0)();return(0,t.useEffect)((function(){s("".concat((0,N.Y)(e.isAuth,"/dialogs")))}),[]),(0,m.jsx)(j,(0,n.Z)((0,n.Z)({},e),{},{addText:e.addMessageActionCreator}))}))},5954:function(e,s,a){a.d(s,{Y:function(){return n}});var n=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/profile";return e?s:"/login"}},3079:function(e,s,a){a.d(s,{a5:function(){return n},fp:function(){return t},OC:function(){return i}});var n=function(e){var s={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.email)?e.password||(s.password="Required"):s.email="Invalid email address":s.email="Required",s},t=function(e,s){var a={};return e.postText?e.postText.length>s&&(a.postText="\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 ".concat(s)):a.postText="Required",a},i=function(e,s){var a={};return e.messageText?e.messageText.length>s&&(a.messageText="\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 ".concat(s)):a.messageText="Required",a}}}]);
//# sourceMappingURL=3.bb572ba5.chunk.js.map