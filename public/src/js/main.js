'use strict';
// 전역변수 선언을 피하려고 IIFE 방식으로 선언 전역변수 선언을 해주는건 별로 좋은방식이 아님. 
(() => {

  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화되(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 셋팅 > 스크롤할 높이가 너무 짧으면 애니메이션 구현이 짧게됨 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
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
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);

  }


  function scrollLoop() {

    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if(yOffset < prevScrollHeight) {
      if (currentScene === 0 ) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일) > 간혹 브라우저 에서 -1 값을 찍을 때 있는데 이때는 return 해서 종료 시켜야함~ 
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    

  }

  window.addEventListener('load', setLayout);
  // load는 이미지 싹다 로딩된 후 로딩 DOMContentLoaded는 dom을 읽기만 해도 이미지 모두 로딩 
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  })

  

})();