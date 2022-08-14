"use strict";(self.webpackChunkcomp_challenge=self.webpackChunkcomp_challenge||[]).push([[338],{9165:function(t,e,r){r.d(e,{Z:function(){return c}});var a=r(2982),n=r(885),s=r(2156),i=r(2791),l=r(184);function c(t){var e,r,c=t.margin,o=t.w,u=t.h,d=t.title,h=t.xLabel,p=t.yLabel,m=t.data,f=t.colours,x=null===(e=t.animated)||void 0===e||e,g=null===(r=t.legend)||void 0===r||r;g||(m={default:m},f={default:"black"});var j=i.useRef(null),v=Object.keys(m[Object.keys(m)[0]][0]),y=(0,n.Z)(v,2),b=y[0],O=y[1];return i.useEffect((function(){j.current.innerHTML="";var t=o-c.left-c.right,e=u-c.top-c.bottom,r=s.Ys(j.current).append("svg").attr("viewBox","0 0 ".concat(t+c.left+c.right," ").concat(e+c.top+c.bottom)).append("g").attr("transform","translate(".concat(c.left,", ").concat(c.top,")")),n=Object.values(m).flat().map((function(t){return Object.values(t)[0]})),i=s.BYU().domain([Math.min.apply(Math,(0,a.Z)(n)),Math.max.apply(Math,(0,a.Z)(n))]).range([0,t]);r.append("g").attr("transform","translate(0, ".concat(e,")")).call(s.LLu(i));var l=Object.values(m).flat().map((function(t){return Object.values(t)[1]})),v=s.BYU().domain([Math.min.apply(Math,(0,a.Z)(l)),Math.max.apply(Math,(0,a.Z)(l))]).range([e,0]);if(r.append("g").call(s.y4O(v)),r.append("g").style("opacity","0.15").attr("transform","translate(0, ".concat(e,")")).call(s.LLu(i).tickSize(-e).tickFormat("")),r.append("g").style("opacity","0.15").call(s.y4O(v).tickSize(-t).tickFormat("")),g){var y=r.append("g"),P=Object.keys(m).length,k=s.BYU().domain([0,P-1]).range([0,40*(P-1)]),w=s.y4O(k).ticks(P).tickFormat((function(t){return Object.keys(f)[t]}));y.selectAll("rect").data((0,a.Z)(Array(P).keys())).enter().append("rect").attr("class","legend-item").style("fill",(function(t){return Object.values(f)[t]})).attr("width",30).attr("height",30).attr("y",(function(t,e){return 40*e+10})).attr("x",t+c.right-30),y.append("g").call(w).attr("transform","translate(".concat(t+c.right-30,", 25)")),y._groups[0][0].lastChild.firstChild.style.opacity="0"}var C=s.jvg().x((function(t){return i(t[b])})).y((function(t){return v(t[O])}));x?(Object.keys(f).forEach((function(t){r.append("path").attr("class","line").datum(m[t]).style("stroke",f[t]).attr("stroke-width",3).style("fill","none").attr("d",s.jvg().x((function(t){return 0})).y((function(t){return e})))})),r.selectAll(".line").transition().duration(800).delay((function(t,e){return 100*e})).attr("d",C)):Object.keys(f).forEach((function(t){r.append("path").attr("class","line").datum(m[t]).style("stroke",f[t]).attr("stroke-width",3).style("fill","none").attr("d",C)})),r.append("text").attr("x",t/2).attr("y",0-c.top/2).attr("text-anchor","middle").style("font-size","1.2rem").style("text-decoration","underline").text(d),r.append("text").style("font-size","0.85rem").attr("transform","translate("+t/2+" ,"+(e+c.top+20)+")").style("text-anchor","middle").text(h),r.append("text").style("font-size","0.85rem").attr("transform","rotate(-90)").attr("y",0-c.left).attr("x",0-e/2).attr("dy","1em").style("text-anchor","middle").text(p)}),[m,c,o,u,d,h,p,f,b,O,x,g]),(0,l.jsx)("div",{ref:j})}},3338:function(t,e,r){r.r(e),r.d(e,{default:function(){return j}});var a=r(168),n=r(4942);function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){(0,n.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var l,c,o=r(885),u=r(2791),d="Extension_custom__RyPer",h="Extension_table__+4FMG",p="Extension_planetSelect__3GoNS",m=r(9165),f=r(6617),x=r(184),g={venus:{atmosphere:{CO2:.96,N2:.04},g:8.87,T0:460,P0:92e5},mars:{atmosphere:{CO2:.95,N2:.027,Ar:.023},g:3.711,T0:-55,P0:636},custom:{atmosphere:{CO2:.95,N2:.027,Ar:.023},g:3.711,T0:-55,P0:636}};function j(){var t=u.useState("mars"),e=(0,o.Z)(t,2),r=e[0],s=e[1],j={CO2:.844,N2:1.04,O2:.919,Ar:.52,H2:14.32,He:5.19},v=44.01,y=28.01,b=31.99,O=39.95,P=2.016,k=4.003;var w=u.useState(g.mars.atmosphere),C=(0,o.Z)(w,2),_=C[0],Z=C[1],L=u.useState(g.mars.T0),S=(0,o.Z)(L,2),A=S[0],M=S[1],T=u.useState(g.mars.g),N=(0,o.Z)(T,2),E=N[0],H=N[1],B=u.useState(g.mars.P0),F=(0,o.Z)(B,2),z=F[0],D=F[1];u.useEffect((function(){Z(g[r].atmosphere),M(g[r].T0),H(g[r].g),D(g[r].P0)}),[r]),u.useEffect((function(){"custom"===r&&(g.custom.atmosphere=_,g.custom.T0=A,g.custom.g=E,g.custom.P0=z)}),[_,A,E,z,r]);for(var I=function(t){var e=t.CO2,r=void 0===e?0:e,a=t.N2,n=void 0===a?0:a,s=t.O2,i=void 0===s?0:s,l=t.Ar,c=void 0===l?0:l,o=t.H2,u=void 0===o?0:o,d=t.He;return j.CO2*r+j.N2*n+j.O2*i+j.Ar*c+j.H2*u+j.He*(void 0===d?0:d)}(g[r].atmosphere),R=E/I,Y=function(t){return z*Math.pow(1-R*t/(A+273),function(t){var e=t.CO2,r=void 0===e?0:e,a=t.N2,n=void 0===a?0:a,s=t.O2,i=void 0===s?0:s,l=t.Ar,c=void 0===l?0:l,o=t.H2,u=void 0===o?0:o,d=t.He;return v*r+y*n+b*i+O*c+P*u+k*(void 0===d?0:d)}(g[r].atmosphere)*E/(8.314*R))},U=[],G=[],Q=A,q=z,V=0;V<=2e4;V+=500)q=Y(V/1e3),Q-=500*R/1e3,U.push({altitude:V,pressure:q}),G.push({altitude:V,temperature:Q});function J(t){var e=t.target,r=e.name,a=e.value;Z(i(i({},_),{},(0,n.Z)({},r,a)))}return(0,x.jsxs)("main",{children:[(0,x.jsx)("h1",{children:"Extension - Planets"}),(0,x.jsx)("p",{children:"I thought it might be interesting to apply the methods I learned in the tasks to different planets. I only included mars and venus as they are the only non-earth rocky planets with a somewhat stable surface temperature."}),(0,x.jsx)("p",{children:"I've also added an option to create a planet with a custom atmospheric composition, gravitational acceleration, surface temperature, and surface pressure."}),(0,x.jsx)("div",{className:p,children:(0,x.jsxs)("select",{value:r,onChangeCapture:function(t){return s(t.target.value)},children:[(0,x.jsx)("option",{value:"venus",children:"Venus"}),(0,x.jsx)("option",{value:"mars",children:"Mars"}),(0,x.jsx)("option",{value:"custom",children:"Custom"})]})}),"custom"===r&&(0,x.jsxs)("div",{className:d,children:[(0,x.jsx)("h2",{children:"Design your own planet"}),(0,x.jsxs)("table",{className:h,children:[(0,x.jsx)("tr",{children:(0,x.jsx)("td",{colSpan:2,children:(0,x.jsx)("b",{children:"Atmosphere composition (fractional):"})})}),Object.keys(j).map((function(t){return(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:(0,x.jsx)("label",{htmlFor:t,children:t})}),(0,x.jsx)("td",{children:(0,x.jsx)("input",{type:"text",name:t,id:t,value:_[t]||"",onChange:J},t)})]})})),(0,x.jsx)("br",{}),(0,x.jsx)("tr",{children:(0,x.jsx)("td",{colSpan:2,children:(0,x.jsx)("b",{children:"Surface constants:"})})}),(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:(0,x.jsxs)("label",{htmlFor:"T0",children:["T",(0,x.jsx)("sub",{children:"0"})," (\xbaC)"]})}),(0,x.jsx)("td",{children:(0,x.jsx)("input",{type:"text",name:"T0",id:"T0",value:A,onChange:function(t){return M(Number(t.target.value))}})})]}),(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:(0,x.jsxs)("label",{htmlFor:"g",children:["g (ms",(0,x.jsx)("sup",{children:"-2"}),")"]})}),(0,x.jsx)("td",{children:(0,x.jsx)("input",{type:"text",name:"g",id:"g",value:E,onChange:function(t){return H(Number(t.target.value))}})})]}),(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:(0,x.jsxs)("label",{htmlFor:"P0",children:["P",(0,x.jsx)("sub",{children:"0"})," (Pa)"]})}),(0,x.jsx)("td",{children:(0,x.jsx)("input",{type:"text",name:"P0",id:"P0",value:z,onChange:function(t){return D(Number(t.target.value))}})})]})]})]}),(0,x.jsx)(m.Z,{data:U,margin:{top:30,right:100,bottom:60,left:80},w:500,h:300,title:"Atmospheric Pressure vs Altitude",animated:!1,legend:!1,xLabel:"Altitude (m)",yLabel:"Pressure (Pa)"}),(0,x.jsx)(m.Z,{data:G,margin:{top:30,right:100,bottom:60,left:60},w:500,h:300,title:"Temperature vs Altitude",animated:!1,legend:!1,xLabel:"Altitude (m)",yLabel:"Temperature (\xbaC)"}),(0,x.jsxs)("section",{children:[(0,x.jsx)("h2",{style:{textAlign:"center"},children:"Method"}),(0,x.jsxs)("p",{children:[(0,x.jsx)("code",{children:(0,x.jsxs)("i",{children:["C",(0,x.jsx)("sub",{children:"p"})]})})," ","is calculated using a weighted average of the SHCs at constant pressure of the atmosphere's component gasses."]}),(0,x.jsxs)("p",{children:[(0,x.jsx)("code",{children:(0,x.jsx)("i",{children:"M"})})," ","is calculated using a weighted average of the molar masses of the atmosphere's component gasses."]}),(0,x.jsx)("p",{children:"The adiabatic lapse rate is assumed to be constant and equal to:"}),(0,x.jsx)(f.Q,{tex:String.raw(l||(l=(0,a.Z)(["L = \frac{g}{C_p}"],["L = \\frac{g}{C_p}"])))}),(0,x.jsx)("p",{children:"In each iteration, the altitude is increased by a constant amount, and the new pressure is calculated using:"}),(0,x.jsx)(f.Q,{tex:String.raw(c||(c=(0,a.Z)(["P = P_0Biggl(1-\frac{L(h-h_0)}{T_0}Biggr)^{\frac{Mg}{LR}}"],["P = P_0\\Biggl(1-\\frac{L(h-h_0)}{T_0}\\Biggr)^{\\frac{Mg}{LR}}"])))})]})]})}}}]);
//# sourceMappingURL=338.6362b29a.chunk.js.map