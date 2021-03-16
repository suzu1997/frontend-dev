document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();

  // setTimeout(() => {
  //   hero.stop();
  // }, 5000);
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.sides = document.querySelectorAll('.side');
    this._observers = [];
    this._init();
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper-container');
    Pace.on('done', this._paceDone.bind(this));
  }

  _paceDone() {
    this._scrollInit();
  }

  _sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach((side) => side.classList.add('inview'));
    } else {
      this.sides.forEach((side) => side.classList.remove('inview'));
    }
  }

  _textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
  }

  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _scrollInit() {
    this._observers.push(
      new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {
        once: false,
      })
    );
    this._observers.push(
      new ScrollObserver('.cover-slide', this._inviewAnimation)
    );
    this._observers.push(
      new ScrollObserver('.tween-animate-title', this._textAnimation, { rootMargin: '-200px 0px' })
    );
    this._observers.push(
      new ScrollObserver(
        '.swiper-container',
        this._toggleSlideAnimation.bind(this),
        {
          once: false,
        }
      )
    );
    this._observers.push(new ScrollObserver('.appear', this._inviewAnimation));
    this._observers.push(
      new ScrollObserver('#main-content', this._sideAnimation.bind(this), {
        once: false,
        // 監視対象（#main-content）が下から300pxの位置まで入ってきてから発火
        rootMargin: '-300px 0px',
      })
    );
  }
}
