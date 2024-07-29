## 이벤트 루프와 큐의 종류

자바스크립트의 비동기 처리를 이해하기 위해서는 이벤트 루프, 태스크 큐, 마이크로 태스크 큐의 개념을 이해해야 합니다.

**태스크 큐 (Task Queue)**

대표적인 예: setTimeout, setInterval, setImmediate

일반적으로 비동기 함수의 콜백 함수를 처리합니다.
태스크 큐는 마이크로 태스크 큐보다 낮은 우선순위를 가집니다.
모든 태스크가 실행된 후에야 비로소 실행됩니다.
마이크로 태스크 큐 (Microtask Queue)

대표적인 예: Promise, process.nextTick, queueMicrotask, MutationObserver

이벤트 루프는 항상 먼저 마이크로 태스크 큐를 처리합니다.
따라서 setTimeout이나 setInterval보다 우선 실행됩니다.

**예제 코드 분석**

다음 예제 코드를 통해 태스크 큐와 마이크로 태스크 큐의 우선순위를 확인할 수 있습니다:

```jsx
function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

function baz() {
  console.log("baz");
}

setTimeout(foo, 0);

Promise.resolve().then(bar).then(baz);
```

위 코드를 실행하면 bar, baz, foo 순으로 출력됩니다. 이는 마이크로 태스크 큐의 작업이 태스크 큐의 작업보다 우선권을 가진다는 것을 보여줍니다.

렌더링과의 관계
브라우저의 렌더링은 마이크로 태스크 큐와 태스크 큐 사이에서 실행됩니다. 즉, 마이크로 태스크 큐를 모두 처리한 후에 렌더링이 일어나고, 그 후에 태스크 큐의 작업이 실행됩니다.

```html
<html>
  <body>
    <ul>
      <li>동기 코드: <button id="sync">0</button></li>
      <li>태스크: <button id="macrotask">0</button></li>
      <li>마이크로 태스크: <button id="microtask">0</button></li>
    </ul>
    <button id="macro_micro">모두 동시 실행</button>
  </body>
  <script>
    const sync = document.getElementById("sync");
    const macrotask = document.getElementById("macrotask");
    const microtask = document.getElementById("microtask");
    const macro_micro = document.getElementById("macro_micro");

    sync.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        sync.innerHTML = i;
      }
    });

    macrotask.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        setTimeout(() => {
          macrotask.innerHTML = i;
        }, 0);
      }
    });

    microtask.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        queueMicrotask(() => {
          microtask.innerHTML = i;
        });
      }
    });

    macro_micro.addEventListener("click", function () {
      for (let i = 0; i <= 100000; i++) {
        sync.innerHTML = i;

        setTimeout(() => {
          macrotask.innerHTML = i;
        }, 0);

        queueMicrotask(() => {
          microtask.innerHTML = i;
        });
      }
    });
  </script>
</html>
```

이 예제의 실행 결과를 통해 태스크 큐와 마이크로 태스크 큐, 동기 코드, 그리고 렌더링의 관계를 확인할 수 있습니다:

**동기 코드** : 동기 코드는 반복문이 끝나기 전까지 렌더링이 일어나지 않으며, 최종 값만 한 번에 렌더링됩니다.

**태스크 큐 (setTimeout)** : 모든 setTimeout 콜백이 큐에 들어간 후에 순차적으로 렌더링됩니다.

**마이크로 태스크 큐 (queueMicrotask)** : 동기 코드와 마찬가지로 반복문이 끝난 후 한 번에 렌더링됩니다.

**모두 동시 실행** : 동기 코드와 마이크로 태스크 큐는 한 번에 렌더링되지만, 태스크 큐는 순차적으로 렌더링됩니다.

**브라우저 렌더링과의 관계**

브라우저의 렌더링이 마이크로 태스크 큐와 태스크 큐 사이에서 일어나는 것을 확인하는 예제입니다:

```jsx
console.log("a");

setTimeout(() => {
  console.log("b");
}, 0);

Promise.resolve().then(() => {
  console.log("c");
});

window.requestAnimationFrame(() => {
  console.log("d");
});
```

이 코드를 실행하면 a, c, d, b 순서로 출력됩니다. 즉, 브라우저의 렌더링 작업은 마이크로 태스크 큐와 태스크 큐 사이에서 실행됩니다.

## 결론

자바스크립트의 비동기 처리는 이벤트 루프와 태스크 큐, 마이크로 태스크 큐를 통해 이루어집니다. 마이크로 태스크 큐는 태스크 큐보다 높은 우선순위를 가지며, 이러한 구조 덕분에 자바스크립트는 싱글 스레드 환경에서도 비동기 작업을 효율적으로 처리할 수 있습니다. 따라서 복잡한 비동기 작업과 렌더링 성능을 최적화하려면 이러한 개념을 잘 이해하는 것이 중요합니다.

출처: React Deep Dive
