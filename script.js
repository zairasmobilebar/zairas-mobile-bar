
document.addEventListener('DOMContentLoaded', function(){
  var panels = Array.from(document.querySelectorAll('[data-tab-panel]'));
  var links = Array.from(document.querySelectorAll('[data-tab-link]'));
  var header = document.querySelector('.site-header');
  var menu = document.querySelector('.menu-toggle');

  function exists(name){
    return panels.some(function(p){return p.dataset.tabPanel === name;});
  }

  function show(name, changeHash){
    if(!exists(name)) name='home';
    panels.forEach(function(p){p.classList.toggle('active', p.dataset.tabPanel===name);});
    links.forEach(function(a){
      var active = a.dataset.tabLink===name;
      a.classList.toggle('active',active);
      if(active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    document.title = name.charAt(0).toUpperCase()+name.slice(1)+" | Zaira's Mobile Bar";
    if(changeHash && location.hash !== '#'+name) location.hash=name;
    if(header) header.classList.remove('menu-open');
    if(menu) menu.setAttribute('aria-expanded','false');
    window.scrollTo(0,0);
  }

  links.forEach(function(a){
    a.addEventListener('click', function(e){
      var tab=a.dataset.tabLink;
      if(!tab) return;
      e.preventDefault();
      show(tab,true);
    });
  });

  if(menu){
    menu.addEventListener('click',function(){
      var open=header.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded',String(open));
    });
  }

  window.addEventListener('hashchange',function(){
    show(location.hash.replace('#','')||'home',false);
  });
  show(location.hash.replace('#','')||'home',false);

  var form=document.getElementById('quote-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form);
      var subject=encodeURIComponent("Zaira's Mobile Bar Quote Request");
      var body=encodeURIComponent(
        "Name: "+(d.get('name')||'')+"\n"+
        "Email / phone: "+(d.get('contact')||'')+"\n"+
        "Event date: "+(d.get('date')||'')+"\n"+
        "Guest count: "+(d.get('guests')||'')+"\n"+
        "Event type: "+(d.get('event')||'')+"\n"+
        "Service hours: "+(d.get('hours')||'')+"\n"+
        "Venue / location: "+(d.get('location')||'')+"\n\n"+
        "Event / drink details:\n"+(d.get('details')||'')
      );
      location.href="mailto:zailizet@icloud.com?subject="+subject+"&body="+body;
      var note=form.querySelector('.form-note');
      if(note){
        note.style.display='block';
        note.textContent='Your email app should open with the quote details filled in. You can also call (564) 444-0535.';
      }
    });
  }

  var year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
});
