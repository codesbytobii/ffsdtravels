import{r as c,j as t,z as r,w as x,G as m,a1 as d,E as p,A as h,x as j,a2 as f}from"./index-TwdfaXd4.js";const a="flight",o="hotel",g=()=>t.jsx(f,{}),u=()=>t.jsx("div",{children:"Hotel Component"}),l=({isActive:e,onClick:s,icon:i,label:n})=>t.jsxs("button",{className:`transition-colors flex gap-1 ${e?"text-primaryRed text-sm font-bold":"text-gray-500 text-sm font-medium"}`,onClick:s,children:[t.jsx(i,{size:20}),n]}),y=()=>{const[e,s]=c.useState(a),n={[a]:g,[o]:u}[e];return t.jsxs(r,{className:"w-full p-2 rounded-sm flex flex-col gap-3 shadow-sm",children:[t.jsxs(x,{className:"flex flex-row items-center px-2 py-1 justify-between",children:[t.jsx("h1",{className:"text-gray-800 font-bold capitalize leading-4 tracking-tight",children:"Search For Flight"}),t.jsxs("div",{className:"flex justify-between gap-6 font-medium",children:[t.jsx(l,{isActive:e===a,onClick:()=>s(a),icon:m,label:"Flight"}),t.jsx(l,{isActive:e===o,onClick:()=>s(o),icon:d,label:"Hotel"})]})]}),t.jsx(p,{className:"p-2",children:t.jsx(h,{mode:"wait",children:t.jsx(j.div,{initial:{opacity:0,x:-50},animate:{opacity:1,x:0},exit:{opacity:0,x:50},transition:{duration:.3},children:t.jsx(n,{})},e)})})]})};export{y as default};
