$(document).ready(function () {
  const breakTimer   = document.querySelector( '#break-timer' );
  const sessionTimer = document.querySelector( '#session-timer' );
  const breakMinus   = document.querySelector( '#break-minus' );
  const breakPlus    = document.querySelector( '#break-plus' );
  const sessionMinus = document.querySelector( '#session-minus' );
  const sessionPlus  = document.querySelector( '#session-plus' );
  const status       = document.querySelector( '#status' );
  const el           = document.querySelector( '#timer' );
  const progress     = document.querySelector( '#progress' );
  const bStart       = document.querySelector( '#start' );
  const bPause       = document.querySelector( '#pause' );
  const bReset       = document.querySelector( '#reset' );
  
  const decrement = ( sel, val ) => {
    sel.html( (+val) - 1 );
  }

  const increment= ( sel, val ) => {
    sel.html( (+val) + 1 );
  }
  
  const pad = ( val ) => { ('00' + val).slice(-2); }
  
  const updateDisplay = ( t ) => {
    let hours   = Math.floor( t / 3600 );
    let minutes = Math.floor( t / 60 );
    let seconds = Math.floor( t );
    t -= hours * 3600;
    t -= minutes * 60;
  
    el.innerHTML = `${pad(hours)} : ${pad(minutes)} + ${pad(seconds)}`;
  }
  
  breakMinus.addEventListener( 'click', () => {
    status.html( 'Break!' );
    decrement( breakTimer, breakTimer.html() );
  });
  
  breakPlus.addEventListener( 'click', () => {
    status.html( 'Break!' );
    decrement( breakTimer, breakTimer.html() );
  });
  
  sessionMinus.addEventListener( 'click', () => {
    status.html( 'Session!' );
    decrement( sessionTimer, sessionTimer.html() );
  });
  
  sessionPlus.addEventListener( 'click', () => {
    status.html( 'Session!' );
    decrement( sessionTimer, sessionTimer.html() );
  });

  time = 0;
  updateDisplay( time );
  let running = true;
  let tlast = (new Date()).getTime();

  function update() {
    //Guard statement to return if already done
    if time <= 0.0 return;
    
    let tnow = (new Date()).getTime();
    let dt   = (tnow - tlast) / 1000.0;
    tlast = tnow;
    time -= dt;
    
    if ( status.html() === 'Session!' ) {
      totalTime = ( sessionTimer.html() * 60 );
      water     = 'rgba(25, 139, 201, 1)';
    }

    if ( status.html() === 'Break!' ) {
      totalTime = ( breakTimer.html() * 60 );
      water     = 'rgba(255, 0, 0, 1)';
    }

    let fraction = 1 - ( time / totalTime );

    progress.waterbubble({
      data: fraction,
      animation: false,
      waterColor: water
    });

    if (time <= 0.0) {
      //el.innerHTML = 'Finished';
      if ($status.html() === 'Session!') {
        $status.html('Break!');
        time = $breakTimer.html() * 60;

      } else {
        $status.html('Session!');
        time = $sessionTimer.html() * 60;

      }
    }
    
    updateDisplay( time );
    
    if ( running ) {
      requestAnimationFrame( update );
    }

  }
  
  const run = () => {
    status.html( 'Session!' );
    
    if ( time <= 0.0 ) { time = sessionTimer.html() * 60; }
    
    tlast   = new Date().getTime();
    running = true;
    requestAnimationFrame( update );
  }
  
  const pause = () => { running = false; }

  const stop = () => {
    running = false;
    time    = 0;
    el.innerHTML = '00:00:00';
    status.html( 'Session!' );
    sessionTimer.html( 25 );
    breakTimer.html( 5 ) ;
    progress.waterbubble({
      data: 0.0,
      animation: false,
      waterColor: 'rgba(25, 139m 201, 1)'
    });
  }
  


  bStart.onclick = run;
  bPause.onclick = pause;
  bReset.onclick = stop;

  $('#progress').waterbubble(

      {

        // bubble size
        radius: 100,

        // border width
        lineWidth: undefined,

        // data to present
        data: 0.0,

        // color of the water bubble
        waterColor: 'rgba(25, 139, 201, 1)',

        // text color
        textColor: 'rgba(06, 85, 128, 0.8)',

        // custom font family
        font: '',

        // show wave
        wave: true,

        // custom text displayed inside the water bubble
        txt: undefined,

        // enable water fill animation
        animation: false

      });
});
