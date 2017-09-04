(() => {
    let style = document.createElement('style');
    style.innerText = `
        .fps-panel {
            position: fixed;
            right: 0.6em;
            top: 2.6em;
            z-index: 9999;
            color: white;
            background: rgba(0,0,0,.8);
            padding: .5em .7em;
            font-size: 1.24em;
            line-height: 1.33em;
            max-width: 66%;
            word-wrap: break-word;
        }
        
        .fps-panel a {
            color: white;
            border-bottom: 1px dashed white;
            margin-right: 5px;
        }
        
        .fps-start {
            display: inline-block;
        }
        
        .fps-close {
            display: inline-block;
        }
        
        .fps-stop {
            display: none;
        }
    `;
    document.head.appendChild(style);

    let $fpsPanel = document.createElement('div');
    $fpsPanel.classList.add('fps-panel');
    document.body.appendChild($fpsPanel);

    let $memoryValue = document.createElement('div');
    $memoryValue.classList.add('memory-value');
    $memoryValue.innerText = '';

    let $fpsValue = document.createElement('div');
    $fpsValue.classList.add('fps-value');
    $fpsValue.innerText = 'FPS Meter';

    let $fpsAverage = document.createElement('div');
    $fpsAverage.classList.add('fps-average');

    let $fpsMin = document.createElement('div');
    $fpsMin.classList.add('fps-min');

    let $fpsMax = document.createElement('div');
    $fpsMax.classList.add('fps-max');

    let $fpsStart = document.createElement('a');
    $fpsStart.classList.add('fps-start');
    $fpsStart.innerText = 'start';
    $fpsStart.href = 'javascript://';
    $fpsStart.addEventListener('click', startFPS);

    let $fpsStop = document.createElement('a');
    $fpsStop.classList.add('fps-stop');
    $fpsStop.innerText = 'stop';
    $fpsStop.href = 'javascript://';
    $fpsStop.addEventListener('click', stopFPS);

    let $fpsClose = document.createElement('a');
    $fpsClose.classList.add('fps-close');
    $fpsClose.innerText = 'close';
    $fpsClose.href = 'javascript://';
    $fpsClose.addEventListener('click', closeFPS);

    $fpsPanel.appendChild($memoryValue);
    $fpsPanel.appendChild($fpsValue);
    $fpsPanel.appendChild($fpsAverage);
    $fpsPanel.appendChild($fpsMin);
    $fpsPanel.appendChild($fpsMax);
    $fpsPanel.appendChild($fpsStart);
    $fpsPanel.appendChild($fpsStop);
    $fpsPanel.appendChild($fpsClose);


    let isEnabledFPS = false;
    let fpsHistory = [];

    function frameCount(startTime) {
        if (!isEnabledFPS) {
            return;
        }
        let now = performance.now();
        let duration = now - startTime;

        if (duration < 1000) {
            frameCount.counter++;
        } else {
            frameCount.FPS = frameCount.counter;
            frameCount.counter = 0;
            startTime = now;

            $fpsValue.innerText = 'FPS: ' + frameCount.FPS;
            fpsHistory.push(frameCount.FPS);
        }
        let memory = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
        $memoryValue.innerText = `RAM: ${memory} MB`;
        window.requestAnimationFrame(() => frameCount(startTime));
    }

    function startFPS() {
        fpsHistory = [];
        $fpsValue.innerText = 'FPS: -';
        $fpsAverage.innerText = '';
        $fpsMin.innerText = '';
        $fpsMax.innerText = '';
        $fpsStart.style.display = 'none';
        $fpsStop.style.display = 'inline-block';
        isEnabledFPS = true;
        frameCount.counter = 0;
        frameCount.FPS = 0;
        frameCount(performance.now());
    }

    function stopFPS() {
        $fpsValue.innerText = '';
        $fpsStart.style.display = 'inline-block';
        $fpsStop.style.display = 'none';
        isEnabledFPS = false;

        if (fpsHistory.length) {
            let sumFPS = 0;
            let minFPS = 0;
            let maxFPS = 0;
            for (let i = 0; i < fpsHistory.length; i++) {
                sumFPS += fpsHistory[i];

                if (!minFPS || minFPS > fpsHistory[i]) {
                    minFPS = fpsHistory[i];
                }

                if (!maxFPS || maxFPS < fpsHistory[i]) {
                    maxFPS = fpsHistory[i];
                }
            }

            const averageFPS = Math.floor(sumFPS / fpsHistory.length);
            $fpsAverage.innerText = 'Average FPS = ' + averageFPS;
            $fpsMin.innerText = 'Min FPS = ' + minFPS;
            $fpsMax.innerText = 'Max FPS = ' + maxFPS;
        }
    }

    function closeFPS() {
        isEnabledFPS = false;
        document.body.removeChild($fpsPanel);
    }
})();
