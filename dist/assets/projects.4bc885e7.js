import{_ as j,o,l as s,k as t,d as p,e as k,D as w,j as d,f as $,g as y,t as u,F as h,A as _,n as f,p as P,c as m,B as Z,b,m as V}from"./app.46c5a96e.js";const C={},B={width:"1.3em",height:"1.3em",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg","fill-rule":"evenodd",fill:"currentColor"},M=t("path",{d:"M7.823 18.547a6.749 6.749 0 0 1-5.178-6.56l.001-.121V9.014l-.001-.059V5.379A2.896 2.896 0 0 1 5.54 2.484h.947v-.005h3.298c5.428.006 10.088 3.316 12.076 8.025a8.057 8.057 0 0 1 7.494 8.034c0 .155-.046.618-.205.818-.232.292-.604.305-.604.305h-6.301c-1.676 5.141-6.445 8.892-12.105 9.049-.57.505-1.32.811-2.14.811-.93 0-1.769-.394-2.359-1.024a.54.54 0 0 1-.073-.111c-.02-.042-.03-.085-.034-.102-.129-.523.204-1.085.913-1.061a.628.628 0 0 1 .357.154c.341.277.722.529 1.196.529a1.616 1.616 0 0 0 1.04-2.85.333.333 0 0 1-.072-.087.69.69 0 0 1-.054-.169c-.074-.809.436-1.064 1.04-.998a.437.437 0 0 1 .127.039.42.42 0 0 1 .059.041 3.221 3.221 0 0 1 1.013 3.112l.01-.005c1.805-.839 2.463-2.161 2.63-2.791.794-3.003-1.731-5.515-3.762-5.499l-.063.006-2.222 2.215a.814.814 0 1 1-1.179-1.121l.019-.018 1.237-1.234Zm1.68-7.184a7.956 7.956 0 0 1 8.145 7.948 7.93 7.93 0 0 1-2.442 5.731 5.855 5.855 0 0 0-5.451-7.985c-.185 0-.362-.019-.533-.054-2.779-.347-4.932-2.694-4.932-5.532l.001-.108h5.212Zm-.455-5.629a1.398 1.398 0 1 1-.002 2.796 1.398 1.398 0 0 1 .002-2.796Z"},null,-1),X=[M];function L(e,n){return o(),s("svg",B,X)}const N=j(C,[["render",L]]),O={width:"1.5em",height:"1.5em",viewBox:"0 0 176 176",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve","fill-rule":"evenodd",stroke:"currentColor","stroke-linecap":"round"},S=t("path",{d:"m77.909 45.28-53.96 86.405","stroke-width":"9.89px"},null,-1),D=t("path",{d:"m151.971 131.071-127.006 1.011","stroke-width":"9.37px"},null,-1),H=t("path",{d:"m110.528 64.766 42.13 65.933M110.528 64.766l-23.966 38.483M78.415 46.086l11.692 18.225","stroke-width":"9.89px"},null,-1),T=["stroke"],z=p({__name:"OhVueIcons",setup(e){const n=k(()=>w.value?"#ff6562":"#e1190e");return(a,c)=>(o(),s("svg",O,[S,D,H,t("path",{d:"M141.443 42.604c6.014 0 10.897 4.883 10.897 10.897 0 6.013-4.883 10.896-10.897 10.896-6.013 0-10.896-4.883-10.896-10.896 0-6.014 4.883-10.897 10.896-10.897Zm0 0c6.014 0 10.897 4.883 10.897 10.897 0 6.013-4.883 10.896-10.897 10.896-6.013 0-10.896-4.883-10.896-10.896 0-6.014 4.883-10.897 10.896-10.897Z","stroke-width":"7.89px",stroke:d(n)},null,8,T)]))}}),A=["href","title"],F={class:"flex-auto"},I={class:"text-normal hstack space-x-2"},E={"mr-1":""},R={key:0,hstack:"","space-x-1":""},W=t("span",{"i-noto-v1:star":"","text-xs":""},null,-1),q={class:"text-sm mt-0.5"},G=["innerHTML"],J={class:"pt-2 text-3xl opacity-50"},K=p({__name:"Project",props:{item:null},setup(e){const n=e,a="https://api.github.com/repos/"+n.item.repo,c=$(null),r=async()=>(await fetch(a).then(i=>i.json())).stargazers_count;return y(async()=>n.item.repo&&(c.value=await r())),(l,i)=>{const g=z,v=N;return o(),s("a",{class:"relative flex items-center space-x-5 p-4 !no-underline !text-c",border:"1 c hover:transparent",bg:"hover:gray-100 dark:hover:gray-600",href:e.item.link,title:e.item.name,rel:"noopener noreferrer",target:"_blank"},[t("div",F,[t("div",I,[t("span",E,u(e.item.name),1),(o(!0),s(h,null,_(e.item.tech,x=>(o(),s("span",{key:`${e.item.name}-${x}`,class:f(["text-xs",x])},null,2))),128)),d(c)?(o(),s("span",R,[W,t("span",q,u(d(c)),1)])):P("v-if",!0)]),t("div",{class:"text-sm opacity-50 font-normal mt-1",innerHTML:e.item.desc},null,8,G)]),t("div",J,[e.item.icon==="oh-vue-icons"?(o(),m(g,{key:0})):e.item.icon==="oh-cv"?(o(),m(v,{key:1})):(o(),s("div",{key:2,class:f(e.item.icon||"i-carbon-unknown")},null,2))])],8,A)}}}),Q={class:"grid grid-cols-1 sm:grid-cols-2 py-2 gap-2"},U=p({__name:"ProjectList",props:{projects:null},setup(e){return(n,a)=>{const c=K;return o(!0),s(h,null,_(Object.keys(e.projects),r=>(o(),s(h,{key:r},[t("h3",null,u(r),1),t("div",Q,[(o(!0),s(h,null,_(e.projects[r],(l,i)=>(o(),m(c,{key:i,item:l},null,8,["item"]))),128))])],64))),128)}}}),Y={class:"prose prose-lg m-auto text-left"},tt=t("h1",{id:"projects",tabindex:"-1"},[V("Projects "),t("a",{class:"header-anchor",href:"#projects","aria-hidden":"true"},"#")],-1),et=t("p",null,"Will be updated soon!!",-1),st="Projects - Xiaohan Zou",nt={"Coming Soon":null},ct=[{property:"og:title",content:"Projects - Xiaohan Zou"}],at={__name:"projects",setup(e,{expose:n}){const a={title:"Projects - Xiaohan Zou",projects:{"Coming Soon":null},meta:[{property:"og:title",content:"Projects - Xiaohan Zou"}]};return n({frontmatter:a}),Z({title:"Projects - Xiaohan Zou",meta:[{property:"og:title",content:"Projects - Xiaohan Zou"}]}),(r,l)=>{const i=U;return o(),s("div",Y,[tt,et,b(i,{projects:a.projects},null,8,["projects"])])}}};export{at as default,ct as meta,nt as projects,st as title};
