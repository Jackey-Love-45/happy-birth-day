// Thay đổi dòng này nếu muốn đổi tên người nhận.
const birthdayGirlName = 'Hòa Trần';
const nhacCuaBan = new Audio('assets/music/Happy%20Birthday%20To%20You.mp3');
nhacCuaBan.loop = true;
nhacCuaBan.preload = 'auto';

const wishes = [
  'Thêm niềm vui','Thêm những buổi sáng bình yên','Thêm hoàng hôn thật đẹp','Thêm lý do để mỉm cười','Thêm những chuyến đi đáng nhớ','Thêm niềm tin vào chính mình','Thêm những tách cà phê ấm áp','Thêm những ngày thật dịu dàng','Thêm những tiếng cười bất chợt','Thêm ước mơ thành hiện thực','Thêm âm nhạc chạm đến trái tim','Thêm những bất ngờ đáng yêu','Thêm dũng khí để bắt đầu lại','Thêm thời gian dành cho mình','Thêm kỷ niệm lấp lánh','Thêm những người tử tế bên cạnh','Thêm những đêm đầy sao','Thêm những chiến thắng nho nhỏ','Thêm bình yên trong lòng','Thêm hoa cho những ngày bình thường','Thêm những điều truyền cảm hứng','Thêm những ngày em thấy tự hào','Thêm khoảng trời để trưởng thành','Thêm yêu thương, luôn luôn','Thêm phép màu trong điều bình dị','Thêm những điều khiến em thấy đúng','Thêm chính em, theo cách đẹp nhất'
];

document.title = `27 — Chương mới | ${birthdayGirlName}`;
document.querySelectorAll('.final-name').forEach(el => el.innerHTML = `Happy Birthday, ${birthdayGirlName} <span>♡</span>`);
const grid = document.getElementById('wishGrid');
wishes.forEach((wish, index) => { const card = document.createElement('article'); card.className = 'wish-card reveal'; card.innerHTML = `<b>${String(index + 1).padStart(2,'0')} —</b><span>${wish}</span>`; grid.appendChild(card); });

window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('done'), 750));

document.getElementById('openSurprise').addEventListener('click', () => {
  batDauNhac();
  document.getElementById('her').scrollIntoView({behavior:'smooth'});
  document.getElementById('intro').animate([{opacity:1},{opacity:.18}],{duration:750,fill:'forwards'});
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.15});
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 90}ms`; observer.observe(el); });

const photo = document.querySelector('.parallax-photo');
window.addEventListener('scroll', () => { if(photo && innerWidth > 720) photo.style.transform = `translateY(${Math.max(-28, (scrollY - photo.parentElement.offsetTop) * -.045)}px)`; }, {passive:true});

document.querySelectorAll('.card-tilt').forEach(card => { card.addEventListener('mousemove', e => { if(innerWidth < 720) return; const r = card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; card.style.transform=`rotate(${x*3}deg) translateY(-16px) perspective(500px) rotateX(${y*-5}deg) rotateY(${x*5}deg) scale(1.03)`; }); card.addEventListener('mouseleave',()=>card.style.transform=''); });

// Giai điệu Happy Birthday được tạo trực tiếp bằng Web Audio khi người xem bấm nút Nhạc.
const toggle = document.getElementById('musicToggle');
let nhacContext, nhacHenGio, dangPhatNhac = false;
const notNhac = {C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,H4:493.88,A4:440};
const giaiDieu = [['G4',.32],['G4',.32],['A4',.65],['G4',.65],['C4',.65],['H4',1],['G4',.32],['G4',.32],['A4',.65],['G4',.65],['D4',.65],['C4',1],['G4',.32],['G4',.32],['G4',.65],['E4',.65],['C4',.65],['H4',.65],['A4',.9],['F4',.32],['F4',.32],['E4',.65],['C4',.65],['D4',.65],['C4',1.15]];
function phatGiaiDieu() { let thoiDiem = nhacContext.currentTime + .08; giaiDieu.forEach(([not,doDai]) => { const am = nhacContext.createOscillator(), amLuong = nhacContext.createGain(); am.type = 'sine'; am.frequency.value = notNhac[not]; amLuong.gain.setValueAtTime(.0001,thoiDiem); amLuong.gain.exponentialRampToValueAtTime(.09,thoiDiem+.025); amLuong.gain.exponentialRampToValueAtTime(.0001,thoiDiem+doDai*.94); am.connect(amLuong).connect(nhacContext.destination); am.start(thoiDiem); am.stop(thoiDiem+doDai); thoiDiem += doDai; }); return (thoiDiem - nhacContext.currentTime) * 1000; }
function hienThiTrangThaiNhac() { dangPhatNhac = true; toggle.classList.add('playing'); toggle.querySelector('span').textContent='Đang phát'; }
async function batDauNhac() { if (dangPhatNhac) return; try { nhacCuaBan.volume = 0; await nhacCuaBan.play(); hienThiTrangThaiNhac(); let amLuong = 0; const tangAm = setInterval(() => { amLuong += .05; nhacCuaBan.volume = Math.min(amLuong, .48); if (amLuong >= .48) clearInterval(tangAm); }, 70); } catch { nhacContext ??= new (window.AudioContext || window.webkitAudioContext)(); nhacContext.resume(); hienThiTrangThaiNhac(); const lapLai = () => { const doDai = phatGiaiDieu(); nhacHenGio = setTimeout(() => { if(dangPhatNhac) lapLai(); }, doDai + 1800); }; lapLai(); } }
function dungNhac() { clearTimeout(nhacHenGio); nhacCuaBan.pause(); dangPhatNhac = false; toggle.classList.remove('playing'); toggle.querySelector('span').textContent='Nhạc'; }
toggle.addEventListener('click', () => { if(dangPhatNhac) dungNhac(); else batDauNhac(); });

document.getElementById('makeWish').addEventListener('click', e => { const cake = document.getElementById('cakeWrap'), magic = document.getElementById('wishMagic'); if(cake.classList.contains('blown')) return; cake.classList.add('blown'); magic.classList.add('active'); document.body.classList.add('celebrate'); document.getElementById('cakeResult').classList.add('show'); e.currentTarget.textContent='Điều ước đang lên đường'; for(let i=0;i<144;i++){ const spark=document.createElement('i'); spark.className=`wish-spark ${i%5===0?'wish-comet':''}`; spark.style.setProperty('--x',`${(Math.random()-.5)*118}vw`); spark.style.setProperty('--y',`${-12-Math.random()*82}vh`); spark.style.setProperty('--d',`${1.65+Math.random()*2.3}s`); spark.style.setProperty('--delay',`${Math.random()*.72}s`); spark.style.setProperty('--s',`${2+Math.random()*8}px`); spark.style.background=['#f7d99b','#fff5da','#ddabb0','#d9b77e','#f2bd83'][i%5]; magic.appendChild(spark); setTimeout(()=>spark.remove(),5200); } setTimeout(()=>document.body.classList.remove('celebrate'),5200); });
const overlay=document.getElementById('envelopeOverlay'); document.getElementById('oneMore').addEventListener('click',()=>{overlay.classList.add('open');overlay.setAttribute('aria-hidden','false')}); document.getElementById('closeEnvelope').addEventListener('click',()=>{overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}); document.getElementById('envelope').addEventListener('click',e=>e.currentTarget.classList.toggle('open'));

const glow=document.querySelector('.cursor-glow'); window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
const canvas=document.getElementById('sky'),ctx=canvas.getContext('2d'); let stars=[]; function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);stars=Array.from({length:Math.min(100,innerWidth/12)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.25,a:Math.random()}));} function paint(){ctx.clearRect(0,0,innerWidth,innerHeight);stars.forEach(s=>{ctx.fillStyle=`rgba(238,211,180,${s.a*.55})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fill();s.y-=.05;if(s.y<0)s.y=innerHeight;});requestAnimationFrame(paint);} resize();paint();addEventListener('resize',resize);
