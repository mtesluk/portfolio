(this.webpackJsonpporfolio=this.webpackJsonpporfolio||[]).push([[0],{115:function(e,t,n){},116:function(e,t,n){},138:function(e,t,n){},139:function(e,t,n){},140:function(e,t,n){},141:function(e,t,n){},142:function(e,t,n){},143:function(e,t,n){},144:function(e,t,n){},145:function(e,t,n){},147:function(e,t,n){},148:function(e,t,n){},149:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(27),s=n.n(o),i=n(10);n(90),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=n(8),l=n(3),u=n(14),m=n(15),d=n(17),p=n(11),f=n(32),h=n(71),g=n.n(h),b=(n(97),n(98),n(72)),v=n.n(b).a.create({baseURL:"/portfolio"});console.log("".concat("//portfolio","/blogs")),console.log(333333333),v.get("http://172.105.93.9/api/v2/users/").then((function(e){return console.log(e)}));var E,_={endpoints:{auth:{login:"/account/api_token_auth/",me:"/account/users/me/",exists_fb:"/account/users/exist_fb_account/",register:"/account/users/"},blog:{authors:"/blogs/authors/",countries:"/blogs/countries/",base:"/blogs/"}},routes:{root:"/",blog:{dashboard:"/blog",authors:"/blog/authors",sites:"/blog/sites",addNew:"/blog/add",detail:(E="/blog/",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return e?"".concat(E).concat(e):"".concat(E,":id")})}}},y=n(5),O=(n(115),function(e){return{type:"success",msg:e}}),N=function(e){return{type:"error",msg:e}},j=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={elements:[{value:"",type:"paragraph"}]},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"addNewParagrapgh",value:function(e,t){this.addElement("paragraph",t)}},{key:"addNewImage",value:function(e,t){this.addElement("image",t)}},{key:"addElement",value:function(e,t){var n=Object(y.a)(this.state.elements);n.splice(t+1,0,{value:"",type:e}),this.setState({elements:Object(y.a)(n)})}},{key:"removeElement",value:function(e,t){var n=Object(y.a)(this.state.elements);n.splice(t,1),this.setState({elements:Object(y.a)(n)})}},{key:"getParagraph",value:function(e,t){var n=this;return r.a.createElement("div",{className:"form__paragraph",key:t},r.a.createElement("textarea",{key:t,id:t.toString(),className:"form__control form__textarea",name:"text-"+t.toString(),placeholder:"",rows:5,value:e,onChange:function(e){return n.onValueChange(e,t)}}))}},{key:"onValueChange",value:function(e,t){var n=Object(y.a)(this.state.elements);n[t].value=e.target.value,this.setState({elements:n})}},{key:"getImage",value:function(){var e=this;return r.a.createElement("input",{type:"file",name:"pic",accept:"image/*",onChange:function(t){return e.onFileChange(t)}})}},{key:"onFileChange",value:function(e){}},{key:"getPartForm",value:function(e,t){return r.a.createElement("div",{className:"form__part-form",key:t},"paragraph"===e.type?this.getParagraph(e.value,t):this.getImage(),this.toolAction(t))}},{key:"toolAction",value:function(e){var t=this,n=r.a.createElement("div",null);return 0===e&&this.state.elements.length>0||(n=r.a.createElement("button",{type:"button",className:"form__remove-p",onClick:function(n){return t.removeElement(n,e)}},"Remove")),r.a.createElement("div",{className:"form__tool-action"},r.a.createElement("button",{type:"button",className:"form__add-p",onClick:function(n){return t.addNewParagrapgh(n,e)}},"Add here p"),r.a.createElement("button",{type:"button",className:"form__add-p",onClick:function(n){return t.addNewImage(n,e)}},"Add here img"),n)}},{key:"setSettings",value:function(){return r.a.createElement("div",{className:"form__settings"},r.a.createElement("input",{placeholder:"Title"}),r.a.createElement("input",{placeholder:"Region"}))}},{key:"onSubmit",value:function(e){e.preventDefault(),this.props.notifySuccess("asd")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{className:"form",onSubmit:function(t){return e.onSubmit(t)}},this.setSettings(),this.state.elements.map((function(t,n){return e.getPartForm(t,n)})),r.a.createElement("button",{type:"submit",className:"form__submit"},"Submit")))}}]),t}(r.a.Component),k=Object(i.b)(null,(function(e){return{notifySuccess:function(t){return e(O(t))}}}))(j),S=(n(116),n(173)),w=n(172),C=n(169),T=n(168),D=n(170),A=n(75),L=n.n(A),R=function(){function e(){Object(c.a)(this,e)}return Object(l.a)(e,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return v.get(e,{params:t}).then((function(e){return e.data}))}},{key:"post",value:function(e,t){return v.post(e,t).then((function(e){return e.data}))}},{key:"delete",value:function(e,t){return v.delete(e).then((function(e){return e.data}))}},{key:"put",value:function(e,t){return v.put(e).then((function(e){return e.data}))}}]),e}(),I=n(26),x=n.n(I),B=n(73),U=n.n(B);function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function q(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var M={input:{width:"100%",fontSize:"2.5rem"}},F=function(e){function t(){return e.apply(this,arguments)||this}q(t,e);var n=t.prototype;return n.onChange=function(e){this.props.onChange&&this.props.onChange(e.target.value)},n.render=function(){var e=this;return x.a.createElement("input",{className:"widget-input",style:M.input,type:this.props.type,placeholder:this.props.placeholder,name:this.props.name,ref:this.props.refe,onChange:function(t){return e.onChange(t)}})},t}(x.a.Component),z=function(){function e(){}return e.prototype.get=function(e,t){return void 0===t&&(t={}),U.a.get(e,{params:t}).then((function(e){return e.data}))},e}(),G={select:{width:"100%",fontSize:"2rem",border:"0",borderBottom:"1px black solid",backgroundColor:"transparent",borderRadiusTop:"5px",outline:"none",fontFamily:"serif",paddingLeft:"3px","&:hover":{backgroundColor:"black"}}},V=function(e){function t(){var t;return(t=e.apply(this,arguments)||this)._httpService=new z,t.state={selected:-1,data:[]},t}q(t,e),t.getDerivedStateFromProps=function(e,t){return e.data===t.data||e.endpoint?null:{data:e.data}};var n=t.prototype;return n.componentDidMount=function(){var e=this.props.endpoint;e&&this.getData(e)},n.getData=function(e){var t=this;e&&this._httpService.get(e).then((function(e){t.setState({data:e||[]})}))},n.handleSelectChange=function(e){var t=Number(e.target.value);this.props.onChange&&this.props.onChange(t),this.setState({selected:t})},n.render=function(){var e=this;return x.a.createElement("select",{className:"widget-select",style:G.select,value:this.props.changeValue?this.state.selected:-1,onChange:function(t){return e.handleSelectChange(t)}},x.a.createElement("option",{value:-1,disabled:!0},this.props.placeholder||"Pick"),this.state.data.map((function(e){return x.a.createElement("option",{key:e.id,value:e.id},e.name)})))},t}(x.a.Component),K={color:"red",font_weight:"bold",fontSize:"1.5rem"},W=function(e){return x.a.createElement("div",{className:"widget-error",style:P(P({},K),e.customStyle)},e.text)},Y={button:{fontSize:"2rem",backgroundColor:"transparent",borderRadiusTop:"5px"}},J=(x.a.Component,function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._httpService=new R,n.state={subjects:[],selectedEntity:[],loading:!1},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0});var t=this.props.initData;t&&this.mapSubjects(t,this.props.selector).forEach((function(t){return e.getBlogs(t)}));this.getSubjects()}},{key:"getSubjects",value:function(){var e=this,t=this.props.endpoint,n=this.props.selector;this._httpService.get(t).then((function(t){var a=e.mapSubjects(t,n);e.setState({subjects:a,loading:!1})})).catch((function(e){}))}},{key:"mapSubjects",value:function(e,t){return e.map((function(e,n){return{id:e.id||n,name:t?e[t]:e}}))}},{key:"getBlogs",value:function(e){var t=this;if(!this.state.selectedEntity.map((function(e){return e.subject.id})).includes(e.id)){var n=_.endpoints.blog.base,a={};for(var r in this.props.filters)a[r]="id"===this.props.filters[r]?e.id:e.name;this._httpService.get(n,a).then((function(n){var a={subject:e,blogs:n},r=[].concat(Object(y.a)(t.state.selectedEntity),[a]);t.setState({selectedEntity:r}),console.log(t.state)})).catch((function(e){}))}this.setState({loading:!1})}},{key:"handleSubjectSelectChange",value:function(e){this.setState({loading:!0});var t=this.state.subjects.find((function(t){return e===t.id}))||{id:e};this.getBlogs(t)}},{key:"handleRemoveSubjectBlogs",value:function(e){var t=Object(y.a)(this.state.selectedEntity);t.splice(e,1),this.setState({selectedEntity:t})}},{key:"renderBlogsCard",value:function(e,t,n){var a=this;return r.a.createElement(w.a,{className:"blog-cards__card",key:e},r.a.createElement(T.a,null,r.a.createElement("header",{className:"blog-cards__blogs-header"},t.name||t.id),n.map((function(e){return r.a.createElement(p.b,{to:_.routes.blog.detail(e.id),className:"blog-cards__blogs-list-element",key:e.id},r.a.createElement(L.a,{fontSize:"inherit"}),r.a.createElement("div",{className:"blog-cards__blogs-list-element-text"},e.title))}))),r.a.createElement(C.a,null,r.a.createElement(D.a,{size:"large",onClick:function(){return a.handleRemoveSubjectBlogs(e)}},"Unpin")))}},{key:"renderMainCard",value:function(){var e=this;return r.a.createElement(w.a,{className:"blog-cards__card--header"},r.a.createElement(T.a,null,this.state.loading&&r.a.createElement(S.a,null),r.a.createElement(V,{data:this.state.subjects,onChange:function(t){return e.handleSubjectSelectChange(t)}})))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"blog-cards"},r.a.createElement("div",{className:"blog-cards__header"},this.renderMainCard()),r.a.createElement("div",{className:"blog-cards__list"},this.state.selectedEntity.map((function(t,n){return e.renderBlogsCard(n,t.subject,t.blogs)}))))}}]),t}(r.a.Component)),H=function(e){function t(e){var n,a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).endpoint=_.endpoints.blog.countries,a.filters={country:null},a.state={sites:[]},a.state={sites:(null===(n=a.props.location.state)||void 0===n?void 0:n.countries)||null},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(J,{endpoint:this.endpoint,filters:this.filters,initData:this.state.sites})}}]),t}(r.a.Component),X=Object(i.b)()(H),$=n(13),Q=(n(138),function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._httpService=new R,n.state={blog:{id:0,content:"",user_id:0,title:"",cooperators:null,photo_names:null,views:0,country:"Poland"}},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.id;this.getBlog(e)}},{key:"getBlog",value:function(e){var t=this,n="".concat(_.endpoints.blog.base).concat(e,"/");this._httpService.get(n).then((function(e){t.setState(Object($.a)({},t.state,{blog:e}))}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"entry"},this.state.blog.content)}}]),t}(r.a.Component)),Z=(n(139),function(e){function t(e){var n,a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).endpoint=_.endpoints.blog.authors,a.filters={user_id:"id"},a.selector="username",a.state={authors:[]},a.state={authors:(null===(n=a.props.location.state)||void 0===n?void 0:n.authors)||null},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(J,{endpoint:this.endpoint,selector:this.selector,filters:this.filters,initData:this.state.authors})}}]),t}(r.a.Component)),ee=(n(140),function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._httpService=new R,n.state={latestBlogs:[],mostSeenBlogs:[],topSeenAuthors:[],mostSeenCountries:[]},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getMostSeenBlogs(),this.getLatestBlogs(),this.getTopSeenAuthors(),this.getMostSeenCountries()}},{key:"getMostSeenBlogs",value:function(){var e=this,t=_.endpoints.blog.base;this._httpService.get(t,{limit:5,ordering:"-views"}).then((function(t){e.setState({mostSeenBlogs:t})})).catch((function(e){}))}},{key:"getLatestBlogs",value:function(){var e=this,t=_.endpoints.blog.base;this._httpService.get(t,{limit:5}).then((function(t){e.setState({latestBlogs:t})})).catch((function(e){}))}},{key:"getTopSeenAuthors",value:function(){var e=this,t=_.endpoints.blog.authors;this._httpService.get(t,{limit:5,ordering:"-views"}).then((function(t){e.setState({topSeenAuthors:t})})).catch((function(e){}))}},{key:"getMostSeenCountries",value:function(){var e=this,t=_.endpoints.blog.countries;this._httpService.get(t,{limit:5,ordering:"-views"}).then((function(t){e.setState({mostSeenCountries:t})})).catch((function(e){}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"blog-dashboard"},r.a.createElement("div",{className:"blog-dashboard__table blog-dashboard__most-seen-blogs"},r.a.createElement("header",null,"Most seen blogs"),this.state.mostSeenBlogs.map((function(e){return r.a.createElement(p.b,{to:_.routes.blog.detail(e.id),className:"blog-dashboard__list-elem-link",key:e.id},r.a.createElement("div",null,e.title))}))),r.a.createElement("div",{className:"blog-dashboard__table blog-dashboard__latest-blogs"},r.a.createElement("header",null,"Latest blogs"),this.state.latestBlogs.map((function(e){return r.a.createElement(p.b,{to:_.routes.blog.detail(e.id),className:"blog-dashboard__list-elem-link",key:e.id},r.a.createElement("div",null,e.title))}))),r.a.createElement("div",{className:"blog-dashboard__table blog-dashboard__top-seen-authors"},r.a.createElement("header",{className:"blog-dashboard__header-action"},r.a.createElement("div",null,"Top 5 seen authors"),r.a.createElement("div",null,r.a.createElement(p.b,{to:{pathname:_.routes.blog.authors,state:{authors:this.state.topSeenAuthors}}},"Go to"))),this.state.topSeenAuthors.map((function(e,t){return r.a.createElement("div",{key:t},e.username)}))),r.a.createElement("div",{className:"blog-dashboard__table blog-dashboard__most-seen-countries"},r.a.createElement("header",{className:"blog-dashboard__header-action"},r.a.createElement("div",null,"Most seen countries"),r.a.createElement(p.b,{to:{pathname:_.routes.blog.sites,state:{countries:this.state.mostSeenCountries}}},"Go to")),this.state.mostSeenCountries.map((function(e,t){return r.a.createElement("div",{key:t},e)}))))}}]),t}(r.a.Component));n(141);function te(e){return{type:"OPEN_LOGIN",value:e}}function ne(e){return{type:"SET_TOKEN",value:e}}function ae(e){return{type:"SET_USER_DATA",data:e}}var re,oe=Object(i.b)((function(e){return{user:e.user,token:e.token}}),(function(e){return{setOpenLoginDialog:function(t){return e(te(t))},notifySuccess:function(t){return e(O(t))},resetToken:function(){return e({type:"SET_TOKEN",value:""})},setUserData:function(t){return e(ae(t))}}}))((function(e){return r.a.createElement("div",{className:"blog"},r.a.createElement("div",{className:"blog__sidebar"},r.a.createElement("div",{className:"blog__top"},r.a.createElement(p.b,{to:"/",className:"blog__name"},"Blog"),r.a.createElement("div",{className:"blog__navs"},r.a.createElement(p.b,{to:_.routes.blog.dashboard,className:""},"Dashboard"),r.a.createElement(p.b,{to:_.routes.blog.authors,className:""},"Authors"),r.a.createElement(p.b,{to:_.routes.blog.sites,className:""},"Sites"),r.a.createElement(p.b,{to:_.routes.blog.addNew,className:""},"Add blog"))),r.a.createElement("div",{className:"blog__bottom"},r.a.createElement("div",{className:"blog__login",onClick:function(){e.token?(e.resetToken(),e.setUserData({}),e.notifySuccess("Logout confirmed")):e.setOpenLoginDialog(!0)}},e.token?"Logout":"Login"))),r.a.createElement("div",{className:"blog__main"},e.children))})),se=n(2),ie=Object(i.b)((function(e){return{user:e.user}}),(function(e){return{notifyError:function(t){return e(N(t))}}}))((function(e){var t=e.component,n=e.user,a=e.app,o=e.notifyError,s=Object(se.a)(e,["component","user","app","notifyError"]);return r.a.createElement(f.b,Object.assign({},s,{render:function(e){return(null===n||void 0===n?void 0:n.username)?r.a.createElement(t,e):(o("Please sign in to have full access!"),r.a.createElement(f.a,{to:{pathname:"/".concat(a)}}))}}))})),ce=Object(i.b)(null)((function(e){return r.a.createElement(oe,null,r.a.createElement(f.d,null,r.a.createElement(f.b,{path:_.routes.blog.dashboard,exact:!0,component:ee}),r.a.createElement(f.b,{path:_.routes.blog.authors,component:Z}),r.a.createElement(ie,{path:_.routes.blog.addNew,component:k,app:"blog"}),r.a.createElement(f.b,{path:_.routes.blog.sites,component:X}),r.a.createElement(f.b,{path:_.routes.blog.detail(),component:Q})))})),le=(n(142),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"for")}}]),t}(r.a.Component)),ue=(n(143),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"dashboard"},r.a.createElement("div",{className:"part part--1"},r.a.createElement(p.b,{to:"/blog",className:"part__link link"},r.a.createElement("div",{className:"part__quarter part__quarter--1"},r.a.createElement("div",{className:"part__name part__name--1"},"blog")))),r.a.createElement("div",{className:"part part--2"},r.a.createElement(p.b,{to:"/photos",className:"part__link link"},r.a.createElement("div",{className:"part__quarter part__quarter--2"},r.a.createElement("div",{className:"part__name part__name--2"},"photos")))),r.a.createElement("div",{className:"part part--3"},r.a.createElement(p.b,{to:"/forum",className:"part__link link"},r.a.createElement("div",{className:"part__quarter part__quarter--3"},r.a.createElement("div",{className:"part__name part__name--3"},"forum")))),r.a.createElement("div",{className:"part part--4"},r.a.createElement("div",{className:"part__bg-video"},r.a.createElement("video",{className:"part__bg-video--content",autoPlay:!0,muted:!0,loop:!0},r.a.createElement("source",{src:"movie-dashboard.mp4",type:"video/mp4"}),r.a.createElement("source",{src:"movie-dashboard-2.webm",type:"video/webm"}),"Sorry, your browser doesn't support embedded videos."),r.a.createElement("div",{className:"part__bg-video--gradient"})),r.a.createElement(p.b,{to:"/movies",className:"part__link link"},r.a.createElement("div",{className:"part__quarter part__quarter--4"},r.a.createElement("div",{className:"part__name part__name--4"},"movies")))))}}]),t}(r.a.Component)),me=function(e){return r.a.createElement("div",null,"heh")},de=function(e){return r.a.createElement("div",null)},pe=function(e){return r.a.createElement("div",null,"404")},fe=n(19),he=(n(144),n(76)),ge=n.n(he);!function(e){e[e.NONE=0]="NONE",e[e.FRAGMENTARY=1]="FRAGMENTARY",e[e.FULL=2]="FULL"}(re||(re={}));var be=Object(i.b)(null,(function(e){return{setToken:function(t){return e(ne(t))},notifySuccess:function(t){return e(O(t))}}}))((function(e){var t=new R,n=r.a.createElement(ge.a,{cssClass:e.fbCssClass,appId:"3136029376407498",autoLoad:!1,fields:"name,picture,email",onClick:function(){},callback:function(n){var a=_.endpoints.auth.exists_fb;t.get("".concat(a,"?fb_id=").concat(n.userID)).then((function(t){t.exists?(e.setToken(n.accessToken),e.notifySuccess("Now you are logged in!"),e.handleClose(!0)):e.setRegistration(re.FRAGMENTARY)})).catch((function(e){}))}});return r.a.createElement("div",null,n)})),ve=(n(145),Object(i.b)(null,(function(e){return{setToken:function(t){return e(ne(t))},notifySuccess:function(t){return e(O(t))}}}))((function(e){var t=new R,n=Object(a.useState)({username:"",password:""}),o=Object(fe.a)(n,2),s=o[0],i=o[1],c=Object(a.useState)({valid:!0,msg:"Username and password must be filled"}),l=Object(fe.a)(c,2),u=l[0],m=l[1],d=function(){m(Object($.a)({},u,{valid:!1})),setTimeout((function(){return m(Object($.a)({},u,{valid:!0}))}),4e3)};return r.a.createElement("div",{className:"login"},r.a.createElement(be,{fbCssClass:"login__fb-btn",handleClose:e.handleClose,setRegistration:e.setRegistration}),r.a.createElement("form",{className:"login__form",onSubmit:function(n){return function(n){if(n.preventDefault(),s.username&&s.password){var a=_.endpoints.auth.login;t.post(a,s).then((function(t){e.setToken(t.token),e.handleClose(!0),e.notifySuccess("Now you are logged in!")})).catch((function(e){}))}else d()}(n)}},r.a.createElement("div",{className:"form-field"},r.a.createElement(F,{placeholder:"Username",onChange:function(e){return function(e){i(Object($.a)({},s,{username:e}))}(e)}})),r.a.createElement("div",{className:"form-field"},r.a.createElement(F,{type:"password",placeholder:"Password",onChange:function(e){return function(e){i(Object($.a)({},s,{password:e}))}(e)}})),r.a.createElement(W,{text:u.valid?"":u.msg}),r.a.createElement("div",{className:"login__actions"},r.a.createElement("button",{className:"login__signup-btn",type:"button",onClick:function(t){return e.setRegistration(re.FULL)}},"Sign up"),r.a.createElement("button",{className:"login__signin-btn",type:"submit"},"Login"))))}))),Ee=n(77),_e=(n(147),Object(i.b)((function(e){return{user:e.user}}),(function(e){return{notifySuccess:function(t){return e(O(t))}}}))((function(e){var t=new R,n=Object(a.useState)({valid:!0,msg:"Passwords must be the same"}),o=Object(fe.a)(n,2),s=o[0],i=o[1],c=Object(Ee.a)(),l=c.register,u=(c.setValue,c.handleSubmit),m=c.errors,d=u((function(n){if(n.password!==n.passwordConfirmation)i(Object($.a)({},s,{valid:!1})),setTimeout((function(){return i(Object($.a)({},s,{valid:!0}))}),4e3);else{var a;delete n.passwordConfirmation,n=Object($.a)({},n,{profile:{facebook_id:null===(a=e.user.profile)||void 0===a?void 0:a.facebook_id}});var r=_.endpoints.auth.register;t.post(r,n).then((function(t){e.setRegistration(re.NONE),e.notifySuccess("Register successfully! Login again to authenticate yourself")})).catch((function(e){}))}}));return r.a.createElement("form",{className:"register-form",onSubmit:d},r.a.createElement("div",{className:"register-form__basic-fields"},r.a.createElement("div",{className:"form-field"},r.a.createElement(F,{placeholder:"Username",name:"username",refe:l({required:!0})})),r.a.createElement(W,{text:m.username?"Username is required!":""})),e.registerType===re.FULL?r.a.createElement("div",{className:"register-form__additional-fields"},r.a.createElement("div",{className:"form-field"},r.a.createElement(F,{type:"password",placeholder:"Password",name:"password",refe:l({required:!0})})),r.a.createElement(W,{text:m.password?"Password is required!":""}),r.a.createElement("div",{className:"form-field"},r.a.createElement(F,{type:"password",placeholder:"Password Confirmation",name:"passwordConfirmation",refe:l({required:!0})})),r.a.createElement(W,{text:m.passwordConfirmation?"Password confirmation is required!":""}),r.a.createElement(W,{text:s.valid?"":s.msg}),r.a.createElement("div",{className:"form-field"},r.a.createElement(F,{type:"email",placeholder:"Email",name:"email",refe:l({required:!0})})),r.a.createElement(W,{text:m.email?"Email is required!":""})):r.a.createElement(r.a.Fragment,null),r.a.createElement("div",{className:"register-form__actions"},r.a.createElement("button",{type:"button",onClick:function(t){return e.setRegistration(re.NONE)}},"Back"),r.a.createElement("button",{type:"submit"},"Register")))}))),ye=n(171),Oe=(n(148),function(e){return r.a.createElement("div",{className:"dialog ".concat(e.open?"dialog--show":""),onClick:function(t){var n;(n=t).target===n.currentTarget&&e.onClose()}},r.a.createElement("div",{className:"dialog__box"},r.a.createElement(ye.a,{className:"dialog__exit-icon",fontSize:"large",onClick:e.onClose}),r.a.createElement("h3",{className:"dialog__title"},e.title),e.children))}),Ne=Object(i.b)((function(e){return{isOpenLoginDialog:e.isOpenLoginDialog,user:e.user,token:e.token}}),(function(e){return{setOpenLoginDialog:function(t){return e(te(t))},setUserData:function(t){return e(ae(t))}}}))((function(e){var t=new R,n=Object(a.useState)(re.NONE),o=Object(fe.a)(n,2),s=o[0],i=o[1],c=function(){t.get(_.endpoints.auth.me).then((function(t){e.setUserData(t)}))},l=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];i(re.NONE),e.setOpenLoginDialog(!1),t&&c()};return r.a.createElement(Oe,{onClose:function(){return l()},open:e.isOpenLoginDialog,title:s?"Sign up":"Login"},s?r.a.createElement(_e,{setRegistration:i,registerType:s}):r.a.createElement(ve,{handleClose:l,setRegistration:i}))})),je=function(){function e(){Object(c.a)(this,e),this.staticMessages={504:"Problem with server connection",0:"Unrecognized error"}}return Object(l.a)(e,[{key:"initInterceptor",value:function(e){var t=this;v.interceptors.response.use((function(e){return e}),(function(n){var a,r,o=(null===(a=n.response)||void 0===a?void 0:a.status)||0,s=t.staticMessages[o],i=null===(r=n.response)||void 0===r?void 0:r.data;if(s=s||i.message||i.non_field_errors&&i.non_field_errors[0]||t.staticMessages[0],console.log(s),s.length)throw e(s),new Error(s)}))}}]),e}(),ke=function(){function e(){Object(c.a)(this,e)}return Object(l.a)(e,[{key:"initInterceptor",value:function(){v.interceptors.request.use((function(e){var t=localStorage.getItem("token"),n=Object($.a)({},e.headers);return t&&(n=Object($.a)({},n,{Authorization:"Token ".concat(t),"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"}),e=Object($.a)({},e,{headers:n})),e}))}}]),e}(),Se=function(){function e(){Object(c.a)(this,e),this._errInterceptor=new je,this._tokenInterceptor=new ke}return Object(l.a)(e,[{key:"initInterceptors",value:function(e){this._errInterceptor.initInterceptor(e),this._tokenInterceptor.initInterceptor()}}]),e}(),we=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e)))._httpService=new R,n._interceptor=new Se,n._notificationSystem=r.a.createRef(),n._notificationStyle={NotificationItem:{DefaultStyle:{fontSize:"2rem"}}},n.addNotification=function(e,t){n._notificationSystem.current.addNotification({message:e,level:t})},n._interceptor.initInterceptors(e.notifyError);var a=localStorage.getItem("token");return e.setToken(a||""),a&&n.getUserData(),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e,t,n){var a=this.props.notify;e.notify!==a&&this.addNotification(a.msg,a.type)}},{key:"getUserData",value:function(){var e=this;this._httpService.get(_.endpoints.auth.me).then((function(t){e.props.setUserData(t)})).catch((function(e){}))}},{key:"renderRouter",value:function(){return r.a.createElement(p.a,{basename:"/portfolio"},r.a.createElement(f.d,null,r.a.createElement(f.b,{path:"/",exact:!0,component:ue}),r.a.createElement(f.b,{path:"/blog",component:ce}),r.a.createElement(f.b,{path:"/photos",component:me}),r.a.createElement(f.b,{path:"/forum",component:le}),r.a.createElement(f.b,{path:"/movies",component:de}),r.a.createElement(f.b,{path:"*",component:pe})))}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.renderRouter(),r.a.createElement(g.a,{ref:this._notificationSystem,style:this._notificationStyle}),r.a.createElement(Ne,null))}}]),t}(r.a.Component),Ce=Object(i.b)((function(e){return{notify:e.notify}}),(function(e){return{notifyError:function(t){return e(N(t))},setToken:function(t){return e(ne(t))},setUserData:function(t){return e(ae(t))}}}))(we),Te=n(34),De=n(78),Ae={type:"INFO",msg:"INFO"},Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,t=arguments.length>1?arguments[1]:void 0;return["info","success","warning","error"].includes(t.type)&&(e=Object($.a)({},e,{type:t.type,msg:t.msg})),e},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TOKEN":localStorage.setItem("token",t.value?t.value:""),e=t.value}return e},Ie={username:"",profile:{location:"",facebook_id:"",facebook_name:""}},xe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER_DATA":e=Object($.a)({},t.data)}return e},Be=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"OPEN_LOGIN":e=t.value}return e},Ue=Object(Te.d)(Object(Te.c)({notify:Le,isOpenLoginDialog:Be,user:xe,token:Re}),{},Object(Te.a)(Object(De.createLogger)()));s.a.render(r.a.createElement(i.a,{store:Ue},r.a.createElement(Ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},81:function(e,t,n){e.exports=n(149)},90:function(e,t,n){},97:function(e,t,n){},98:function(e,t,n){}},[[81,1,2]]]);
//# sourceMappingURL=main.2b1cc204.chunk.js.map