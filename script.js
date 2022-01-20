let swiper;
let selectedCorrea = '';
let selectedEsfera = '';
const setEsfera = (esferaContainer, esfera, idx) => {
  const img = document.createElement('img');
  const esferaName = document.querySelector('.esfera-name');
  esferaName.textContent = esfera.name;
  img.src = `assets/esferas/${esfera.fileName}`;
  img.alt = esfera.name;
  img.classList.add('esfera-img');
  esferaContainer.innerHTML = ''
  esferaContainer.appendChild(img);

  document.querySelectorAll('.esfera-item').forEach((item, i) => {
    if(idx === i) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });

  setBuyLink(null, esfera.id);
}

const setCorrea = (correa) => {
  const correaName = document.querySelector('.correa-name');
  correaName.textContent = correa.name;
  setBuyLink(correa.id);
}

const setBuyLink = (correa, esfera) => {
  const buyLink = document.querySelector('.buy-link');
  if(correa) {
    selectedCorrea = correa;
  }
  if(esfera) {
    selectedEsfera = esfera;
  }
  buyLink.href = `https://buy-link.com/product/${selectedCorrea}/${selectedEsfera}`;
}

const initialize = (data) => {
  const esferaContainer = document.querySelector('.esfera-container');
  const wrapper = document.querySelector('.swiper-wrapper');
  const selector = document.querySelector('.esfera-selector');
  data.correas.forEach((correa) => {
    const slide = document.createElement('div');
    const img = document.createElement('img');
    img.src = `assets/correas/${correa.fileName}`;
    img.alt = correa.name;
    slide.appendChild(img);
    slide.classList.add('swiper-slide');
    wrapper.appendChild(slide);
  })
  data.esferas.forEach((esfera, idx) => {
    const item = document.createElement('div');
    const img = document.createElement('img');
    img.src = `assets/esferas/${esfera.fileName}`;
    img.alt = esfera.name;
    item.appendChild(img);
    item.classList.add('esfera-item');
    item.addEventListener('click', () => {
      setEsfera(esferaContainer, data.esferas[idx], idx);
    })
    selector.appendChild(item);
  })
  setEsfera(esferaContainer, data.esferas[0], 0);
  setCorrea(data.correas[0]);
  setBuyLink(data.correas[0].id, data.esferas[0].id);
  swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  swiper.on('slideChange', (e) => {
    setCorrea(data.correas[e.realIndex])
  })
}

fetch('./assets/data.json')
.then((data) => data.json())
.then((data) => initialize(data))
.catch(error => console.log(error));

