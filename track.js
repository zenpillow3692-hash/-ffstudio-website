/* Conversion tracking for First Frame Studio.
   Fill in the IDs below once the Google Ads / GA4 accounts exist; until then events only go to dataLayer. */
(function(){
  var CFG={
    ga4:'',          // e.g. 'G-XXXXXXXXXX'
    ads:'',          // e.g. 'AW-123456789'
    adsLineLabel:''  // conversion label for "LINE click", e.g. 'AbCdEfGhIjk'
  };
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments)}
  window.gtag=window.gtag||gtag;
  var id=CFG.ga4||CFG.ads;
  if(id){
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);
    gtag('js',new Date());
    if(CFG.ga4)gtag('config',CFG.ga4);
    if(CFG.ads)gtag('config',CFG.ads);
  }
  function where(el){
    var sec=el.closest('section,[id],.mbar,.line-float,footer,header');
    if(el.closest('.mbar'))return 'mobile_bar';
    if(el.closest('.line-float'))return 'floating_button';
    return sec&&sec.id?sec.id:(sec?sec.className.split(' ')[0]:'page');
  }
  function track(name,params){
    params=params||{};
    dataLayer.push(Object.assign({event:name},params));
    if(id)window.gtag('event',name,params);
    if(name==='line_click'&&CFG.ads&&CFG.adsLineLabel)window.gtag('event','conversion',{send_to:CFG.ads+'/'+CFG.adsLineLabel});
  }
  window.ffTrack=track;
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a,button');if(!a)return;
    var h=a.getAttribute('href')||'';
    var page=location.pathname.indexOf('/hub')===0?'hub':'home';
    if(/line\.me|lin\.ee/.test(h)){
      var msg='';var q=h.indexOf('/?');if(h.indexOf('oaMessage')>-1&&q>-1){try{msg=decodeURIComponent(h.slice(q+2)).slice(0,80)}catch(_){}}
      track('line_click',{page:page,location:where(a),intent:/เดโม/.test(msg)?'brand_hub_demo':(msg?'package':'general'),message:msg});
    }else if(/facebook\.com/.test(h)){track('facebook_click',{page:page,location:where(a)})}
    else if(/^mailto:/.test(h)){track('email_click',{page:page,location:where(a)})}
    else if(/rate-card/.test(h)){track('rate_card_download',{page:page})}
    else if(a.closest('#qform')&&a.type==='submit'){track('line_click',{page:page,location:'quote_form',intent:'brand_hub_demo'})}
  },true);
})();
