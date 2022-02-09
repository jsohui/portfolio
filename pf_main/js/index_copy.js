
$(function(){

  const wt = $(window).width();

  //마우스 커서
  let cursor = document.querySelector('.cursor');
  let cursor2 = document.querySelector('.cursor2');
  let cursor3 = document.querySelector('.cursor3');
  let cursor4 = document.querySelector('.cursor4');
  document.addEventListener('mousemove',function(e){
      cursor.style.cssText = cursor2.style.cssText = cursor3.style.cssText = cursor4.style.cssText = 'left:' + e.clientX + 'px; top:' + e.clientY + 'px;';
  });

  $('ul.gnb li, .imgCard, .works a, .contact article').hover(function(){
      $('.cursor').addClass('on');
      $('.cursor2, .cursor3, .cursor4').addClass('on');
  },function(){
      $('.cursor').removeClass('on');
      $('.cursor2, .cursor3, .cursor4').removeClass('on');
  });


//section scroll event
if(wt >= 1080){
  $("section").on('wheel',function(e){
      e.preventDefault();
      if(e.originalEvent.wheelDelta>0 || e.originalEvent.detail<0){
          var prev = $(this).prev().offset().top;
          $("html,body").stop().animate({
              "scrollTop": prev
          },0);
      }else{
          var next = $(this).next().offset().top;
          $("html,body").stop().animate({
              "scrollTop": next
          },0);
      };
  });
};


//해당 영역으로 이동
$(".abt").click(function () {
let abtPosition = $(".main").offset().top;
$("html,body").animate({scrollTop:abtPosition},500);
console.log(abtPosition);
});

$(".cnt").click(function () {
let cntPosition = $(".contact").offset().top;
$("html,body").animate({scrollTop:cntPosition},500);
console.log(cntPosition);
});



  //menu-----------menu--------------
  $('.mn').click(function(){
    $(this).addClass('on');
    $('ul.gnb, .cl').addClass('on');
  });
  $('.cl').click(function(){
    $(this).removeClass('on');
    $('ul.gnb, .mn').removeClass('on');
  });



//main----------------------------------------------
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}


const phrases = [
  'HELLO! I\'M',
  'I\'M PUBLISHER',
  'MY NAME IS'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1000)
  })
  counter = (counter + 1) % phrases.length
}

next()



//main--------------------------------------------

$(window).scroll(function(){

  const scrollY = $(this).scrollTop();
  let scT = $(window).scrollTop();
  let meT = $('.img-zoom').offset().top;
  let ht = $('.main').height();
  let imgWt = $('.img-zoom').width();
  let imgHt = $('.img-zoom').height();

  $('.imgCard').css({'top': (meT-ht) + 'px'});
  $('.imgCard').css({'width': imgWt + 'px'});
  $('.imgCard').css({'height': imgHt + 'px'});


  if(wt > 1079) {
    $('.img-zoom').css({
      'width' : (400 + scT/20) + 'px'
    });
  }
  $('.first').css({
    'margin-left' : (0 + scT/2) + 'px'
  });
  $('.last').css({
    'margin-right' : (0 + scT/2) + 'px'
  });


if(wt > 799){
  if(scrollY >= 1400) {
    $('.scrIcon').fadeOut();
  }else {
    $('.scrIcon').fadeIn();
  };

  if(scrollY >= 900) {
    $('.img-zoom').css({'opacity':'0'});
    $('.imgCard').fadeIn(500);
  }else {
    $('.img-zoom').css({'opacity':'1'});
    $('.imgCard').fadeOut(10);
  }
}

});





//works------------------------------------------
$('.cardLeft').hover(function(){
    $('.design').addClass('on');
},function(){
    $('.design').removeClass('on');
});
$('.cardRight').hover(function(){
    $('.publ').addClass('on');
},function(){
    $('.publ').removeClass('on');
});

$('.works').on('mousemove', function(e){
  let posX = e.pageX;
  let posY = e.pageY;
  if($('.works').width( ) >= (1080)){
      $('.design').css({'left': 0-(posX/2), 'top':0-(posY/3)});
      $('.publ').css({'left': 0-(posX/2), 'top':500-(posY/3)});
  }
});

});

