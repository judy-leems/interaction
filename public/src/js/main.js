'use strict';
// 전역변수 선언을 피하려고 IIFE 방식으로 선언 전역변수, 선언을 해주는건 별로 좋은방식이 아님. 
(() => {

  let yOffset = 0; // winodw.pageYOffset 대신 쓸 변수 
  let prevScrollHeight = 0; // 현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이들의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 셋팅 > 스크롤할 높이가 너무 짧으면 애니메이션 구현이 짧게됨 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d')
      },
      values: {
        messageA_opacity: [0, 1],

      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 셋팅 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 셋팅 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 셋팅 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ]

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅 
    for(let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 새로고침 
    yOffset = window.pageYOffset
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function scrollLoop() {

    prevScrollHeight = 0; // 값이 누적되어 계속 커지기 때문에 초기화를 한번 해줘야함 
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { // 1번씬에서 2번씬으로 넘어갈 때는 1번씬이 모두 다 지나고 2번씬이 변해야 하기 때문에 
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if(yOffset < prevScrollHeight) { // 2번씬에서 1번씬으로 갈 경우에는 1번씩에 진입하자마자 변한다.
      if (currentScene === 0) return; //  ios 브라우저에서 종종 -1 나올 경우가 있어서 0 일때 return 
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    } 

   
    
  }


  window.addEventListener('load', () => {
    setLayout();
  })
  window.addEventListener('resize', () => {
    setLayout();
  })
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  })
  

})();