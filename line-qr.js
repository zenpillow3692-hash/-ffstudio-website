/* Desktop: LINE links open a QR popup (line.me/R/oaMessage only works inside the LINE mobile app). Mobile: links work as normal. */
(function(){
  var ua=navigator.userAgent||'';
  var mobile=/Android|iPhone|iPad|iPod|Mobile|Line\//i.test(ua)||(navigator.maxTouchPoints>1&&/Mac/.test(navigator.platform||''));
  var css='.lq-bg{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,8,6,.72);backdrop-filter:blur(4px);opacity:0;transition:opacity .2s}.lq-bg.on{opacity:1}'+
  '.lq{position:relative;width:min(400px,100%);padding:30px 28px 24px;border-radius:22px;background:#2A1814;border:1px solid rgba(232,170,140,.34);box-shadow:0 30px 80px rgba(0,0,0,.5);text-align:center;color:#EBD6CB;font-family:"Sarabun",system-ui,sans-serif}'+
  '.lq h3{margin:0;font-size:22px;font-weight:600;color:#FFF3EA}.lq .id{margin-top:2px;font-size:18px;font-weight:600;color:#F2A884}'+
  '.lq img{display:block;width:200px;height:200px;margin:18px auto 0;padding:10px;border-radius:14px;background:#fff}'+
  '.lq p{margin:14px 0 0;font-size:14px;color:#C9A898;line-height:1.5}'+
  '.lq .msg{margin-top:8px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.25);border:1px dashed rgba(232,170,140,.4);font-size:14.5px;color:#FFF3EA;text-align:left;white-space:pre-line}'+
  '.lq .row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px}'+
  '.lq .row a,.lq .row button{font:inherit;font-size:14.5px;padding:10px 18px;border-radius:999px;cursor:pointer;text-decoration:none;border:1px solid #F2B08E;background:transparent;color:#FBD5BD}'+
  '.lq .row .pri{background:#06C755;border-color:#06C755;color:#fff}'+
  '.lq .x{position:absolute;top:12px;right:14px;width:34px;height:34px;border:0;border-radius:50%;background:rgba(255,255,255,.06);color:#EBD6CB;font-size:20px;cursor:pointer}';
  var root=(document.currentScript&&document.currentScript.src)?document.currentScript.src.replace(/line-qr\.js.*$/,''):'/';
  function show(msg){
    if(!document.getElementById('lq-css')){var st=document.createElement('style');st.id='lq-css';st.textContent=css;document.head.appendChild(st);}
    var bg=document.createElement('div');bg.className='lq-bg';bg.setAttribute('role','dialog');bg.setAttribute('aria-modal','true');bg.setAttribute('aria-label','แอดไลน์ First Frame Studio');
    bg.innerHTML='<div class="lq"><button class="x" aria-label="ปิด">×</button><h3>สแกนเพื่อแอดไลน์</h3><div class="id">@101upgih</div><img src="'+root+'img/line-qr.png" alt="QR Code LINE @101upgih"><p>เปิดกล้องมือถือหรือแอป LINE แล้วสแกน QR นี้ได้เลย</p>'+
      (msg?'<p>แอดแล้วส่งข้อความนี้ในแชท เราจะตอบกลับโดยเร็ว</p><div class="msg"></div><div class="row"><button class="cp">คัดลอกข้อความ</button><a class="pri" href="https://lin.ee/onW5deI" target="_blank" rel="noopener">เปิด LINE</a></div>':'<div class="row"><a class="pri" href="https://lin.ee/onW5deI" target="_blank" rel="noopener">เปิด LINE</a></div>')+'</div>';
    if(msg)bg.querySelector('.msg').textContent=msg;
    document.body.appendChild(bg);requestAnimationFrame(function(){bg.classList.add('on')});
    function close(){bg.remove();document.removeEventListener('keydown',esc)}
    function esc(e){if(e.key==='Escape')close()}
    document.addEventListener('keydown',esc);
    bg.addEventListener('click',function(e){if(e.target===bg)close()});
    bg.querySelector('.x').addEventListener('click',close);
    var cp=bg.querySelector('.cp');
    if(cp)cp.addEventListener('click',function(){
      var done=function(){cp.textContent='คัดลอกแล้ว ✓'};
      if(navigator.clipboard)navigator.clipboard.writeText(msg).then(done,function(){});else done();
    });
    bg.querySelector('.x').focus();
  }
  window.ffLine=function(msg){
    if(mobile){window.open('https://line.me/R/oaMessage/@101upgih/?'+encodeURIComponent(msg||''),'_blank','noopener');return}
    show(msg);
  };
  if(mobile)return;
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="https://line.me/"]');
    if(!a)return;
    e.preventDefault();
    var h=a.getAttribute('href'),q=h.indexOf('/?'),msg='';
    if(h.indexOf('oaMessage')>-1&&q>-1){try{msg=decodeURIComponent(h.slice(q+2))}catch(_){}}
    show(msg);
  });
})();
