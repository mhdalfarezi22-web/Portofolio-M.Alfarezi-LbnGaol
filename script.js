/* NAVBAR */
const nav=document.getElementById('nav'),bg=document.getElementById('burger'),menu=document.getElementById('menu');
addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>20),{passive:true});
const close=()=>{menu.classList.remove('open');bg.setAttribute('aria-expanded','false')};
bg.onclick=()=>bg.setAttribute('aria-expanded',menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.onclick=close);
addEventListener('keydown',e=>e.key==='Escape'&&close());
/* REVEAL + MENU AKTIF */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');ro.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>ro.observe(e));
const ls=[...menu.querySelectorAll('a')];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)ls.forEach(l=>l.classList.toggle('on',l.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>so.observe(s));
/* BACKGROUND MATEMATIKA: grid + simbol melayang + garis antar node */
const cv=document.getElementById('bg'),c=cv.getContext('2d'),S=['∑','π','√','∫','x²','f(x)','∞','Δ','∂','θ'];
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;let W,H,it=[],m={x:-999,y:-999};
function rs(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);
it=Array.from({length:W<600?10:18},(_,i)=>({s:S[i%S.length],x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,z:16+Math.random()*22}))}
function dr(){c.clearRect(0,0,W,H);c.strokeStyle='rgba(148,163,184,.05)';
for(let x=0;x<W;x+=80){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke()}
for(let y=0;y<H;y+=80){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}
it.forEach((a,i)=>{a.x+=a.vx;a.y+=a.vy;if(a.x<-40)a.x=W+40;if(a.x>W+40)a.x=-40;if(a.y<-40)a.y=H+40;if(a.y>H+40)a.y=-40;
c.fillStyle=Math.hypot(a.x-m.x,a.y-m.y)<160?'rgba(56,189,248,.4)':'rgba(56,189,248,.1)';c.font=`500 ${a.z}px "Space Grotesk",sans-serif`;c.fillText(a.s,a.x,a.y);
for(let j=i+1;j<it.length;j++){const b=it[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<220){c.strokeStyle=`rgba(56,189,248,${.07*(1-d/220)})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke()}}});
if(!rm)requestAnimationFrame(dr)}
addEventListener('resize',()=>{rs();rm&&dr()});addEventListener('mousemove',e=>{m.x=e.clientX;m.y=e.clientY},{passive:true});rs();dr();
