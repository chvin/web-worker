(() => { // call js
  const jsRun = document.getElementById('jsRun');
  const jsResult = document.getElementById('jsResult');

  jsRun.onclick = () => { // js calculate
    jsResult.innerHTML = 'calculating...'; // can't render
    const startTime = Date.now();
    const arr = new Array(100000000);
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      arr[i] = i;
      sum += i;
    }
    jsResult.innerHTML = `${(Date.now() - startTime) / 1000} second<br />result ${sum}`;
  }
})();



(() => { // call web worker
  const blob = new Blob([document.querySelector('#worker').textContent]);
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);
  const webWorkerRun = document.getElementById('webWorkerRun');
  const webWorkerResult = document.getElementById('webWorkerResult');

  webWorkerRun.onclick = () => {
    webWorkerResult.innerHTML = 'calculating...';
    worker.postMessage('run'); // web worker calculate
  }

  worker.onmessage = function (e) {
    const { time, result } = e.data;
    webWorkerResult.innerHTML = `${time} second<br />result ${result}`;
  };
})();



(() => { // aminate
  const box = document.getElementById('box');
  const boxWidth = 200;
  const boxHeight = 200;
  box.style.width = `${boxWidth}px`;
  box.style.height = `${boxHeight}px`;

  let winWidth;
  let winHeight;
  const resize = () => {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
  }
  window.addEventListener('resize', resize, true);
  resize();
  const time = document.getElementById('time');
  let x, y, date, top = 0, left = 0;
  const color = () => Math.floor(Math.random() * 200);
  const setColor = () => box.style.backgroundColor = `rgba(${color()},${color()},${color()},1)`;
  const step = () => {
    if (left <= 0) {
      x = 1;
      left = 0
      setColor();
    } else if (left + boxWidth >= winWidth) {
      x = -1;
      left = winWidth - boxWidth;
      setColor();
    }
    left += x;
    box.style.left = left + 'px';

    if (top <= 0) {
      y = 1;
      top = 0
      setColor();
    } else if (top + boxHeight >= winHeight) {
      y = -1;
      top = winHeight - boxHeight;
      setColor();
    }
    top += y;
    box.style.top = top + 'px';

    date = new Date();
    let millseconds = date.getMilliseconds().toString();
    while (millseconds.length < 3) {
      millseconds = '0' + millseconds;
    }
    const t = (n) => n < 10 ? '0' + n : n;
    time.innerText = `${[
      t(date.getHours()),
      t(date.getMinutes()),
      t(date.getSeconds())].join(':')
      }.${millseconds}`

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
})();