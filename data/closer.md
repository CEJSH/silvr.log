리액트의 클래스 컴포넌트에 대한 이해가 자바스크립트의 클래스, 프로토타입, this에 달려있다면, 함수컴포넌트에 대한 이해는 클로저에 달려 있다. 함수 컴포넌트의 구조와 작동 방식, 훅의 원리, 의존성 배열 등 함수 컴포넌트의 대부분의 기술이 모두 클로저에 의존하고 있기 때문에 함수 컴포넌트 작성을 위해서는 클로저에 대해 이해하는 것이 필수다.

## 1.4.1 클로저의 정의

먼저 클로저에 대한 정의를 MDN에서 찾아보면 **"클로저는 함수와 함수가 선언된 어휘적 환경(Lexical Scope)의 조합"** 이다.

리액트에서 함수 컴포넌트와 훅이 등장한 16.8 버전을 기점으로 이 클로저라는 개념이 리액트에서 적극적으로 사용되기 시작하면서 클로저를 빼놓고서는 리액트가 어떤 식으로 작동하는지 이해하기 어려워졌다.

클로저는 무엇이고, 어떻게 활용되는지 살펴보자.

먼저 "함수와 함수가 선언된 어휘적 환경의 조합"이라는 문장에서 가장 이해하기 어려운 부분은 바로 **"어휘적 환경"**일 것이다. 어휘적 환경을 이해하기 위해 다음 예제 코드를 살펴보자.

```jsx
function add() {
  const a = 10;
  function innerAdd() {
    const b = 20;
    consol.log(a + b);
  }
  innerAdd(); // 30
}

add();
```

위 예제 코드를 보면, add 함수 내부에 **innerAdd** 가 있고, **innerAdd** 함수는 내부에서 b 변수를 선언한 뒤, 자신의 함수 외부에 있는 a와 b를 더해서 정상적으로 30을 출력한 것을 볼 수 있다.

이 예시를 살펴보면 함수가 이처럼 중첩돼 있는 상황에서 변수의 범위가 어떻게 정의되는지 알 수 있을 것이다. a 변수의 유효 범위는 add 전체이고, b의 유효 범위는 innerAdd의 전체다. innerAdd는 add 내부에서 선언돼 있어 a를 사용할 수 있게 된 것이다.

즉 앞에서 말하는 **"선언된 어휘적 환경"** 이라는 것은, 변수가 코드 내부에서 어디서 선언됐는지를 말하는 것이다.

이는 앞서 이야기한, 호출되는 방식에 따라 동적으로 결정되는 this와는 다르게 코드가 작성된 순간에 정적으로 결정된다.

클로저는 이러한 어휘적 환경을 조합해 코딩하는 기법이다.

## 1.4.2 변수의 유효 범위, 스코프

앞서 클로저를 이해하기 위해서는 변수의 유효 범위에 따라서 어휘적 환경이 결정된다고 언급했다. 이러한 변수의 유효범위를 스코프(scope)라고 하는데, 자바스크립트에는 다양한 스코프가 있다.

**전역 스코프**

전역 레벨에 선언하는 것 -> 전역 스코프(global scope)

전역이라는 이름에서 알 수 있듯, 이 스코프에서 변수를 선언하면 어디서든 호출할 수 있게 된다.

브라우저 환경에서 전역 객체는 window, Node.js 환경에서는 global이 있는데, 바로 이 객체에 전역 레벨에서 선언한 스코프가 바인딩된다.

```jsx
var global = "global scope";

function hello() {
  console.log(global);
}

console.log(global); // global scope
hello(); // global scope
console.log(global === window.global); //true
```

위 코드에서 global이라는 변수를 var와 함께 선언했더니 전역 스코프와 hello 스코프 모두에서 global 변수에 접근할 수 있는 것을 확인할 수 있다.

**함수 스코프**

다른 언어와 달리 자바스크립트는 기본적으로 함수 레벨 스코프를 따른다. 즉, {} 블록이 스코프 범위를 결정하지 않는다. 다음 예제를 살펴보자.

```jsx
if (true) {
  var global = "global scope";
}

console.log(global); // 'global scope'
console.log(global === window.global); // true
```

var global은 분명 {} 내부에서 선언돼 있는데 , {} 밖에서도 접근이 가능한 것을 확인할 수 있다. 이는 앞서 이야기한 것처럼 기본적으로 자바스크립트는 함수 레벨 스코프를 가지고 있기 때문이다.

```jsx
function hello() {
  var local = "local variable";
  console.log(local); // local variaable
}

hello();
console.log(local); // Uncaught ReferenceError: local is not defined
```

단순한 if 블록과는 다르게 함수 블록 내부에서는 일반적으로 예측하는 것과 같이 스코프가 결정되는 것을 볼 수 있다.

만약 이러한 스코프가 중첩돼 있다면 어떻게 될까?

```jsx
var x = 10;

function foo() {
  var x = 100;
  console.log(x); // 100

  function bar() {
    var x = 1000;
    console.log(x); // 1000
  }
  bar();
}

console.log(x); // 10
foo();
```

자바스크립트에서 스코프는, 일단 가장 가까운 스코프에서 변수가 존재하는지를 먼저 확인해 보는데, 이러한 사실을 알고 있다면 위 예제에서 x가 어디에 선언돼 있는지에 따라 값이 달라질 수 있음을 쉽게 확인할 수 있을 것이다.

## 1.4.3 클로저의 활용

클로저의 정의인 "함수와 함수가 선언된 어휘적 환경의 조합"이 무엇인지 살펴보았다.

자바스크립트는 함수 레벨 스코프를 가지고 있으므로, 이렇게 선언된 함수 레벨 스코프를 활용해 어떤 작업을 할 수 있다는 개념이 바로 클로저라는 것을 어렴풋이 알게 됐다.

클로저에 대한 개념을 조금 더 정확히 이해하기 위해 다음 코드를 다시 한 번 살펴보자.

```jsx
function outerFunction() {
  var x = "hello";
  function innerFunction() {
    console.log(x);
  }

  return innerFunction;
}

const innerFunction = outerFunction();

innerFunction(); // "hello"
```

앞서 자바스크립트가 함수 레벨 스코프를 가지고 있다는 사실, 그리고 이러한 스코프는 동적으로 결정된다는 사실을 알기 때문에 위 예제에서 "hello"가 출력되는 것이 그다지 놀랍지 않을 것이다. 위 예제에서 outerFunction은 innerFunction을 반환하며 실행이 종료됐다. 여기에서 반환한 함수에는 x라는 변수가 존재하지 않지만, 해당 함수가 선언된 어휘적 환경, 즉 outerFunction에는 x라는 변수가 존재하며 접근할 수도 있다. 따라서 같은 환경에서 선언되고 반환된 innerFunction에서는 x라는 변수가 존재하던 환경을 기억하기 때문에 정상적으로 "hello"를 출력할 수 있는 것이다.

## 클로저의 활용

전역 스코프는 어디서든 원하는 값을 꺼내올 수 있다는 장점이 있지만, 반대로 이야기하면 누구든 접근할 수 있고 수정할 수 있다는 뜻도 된다. 다음 예제를 살펴보자.

```jsx
var counter = 0;

function handleClick() {
  counter++;
}
```

위 counter 변수는 큰 문제를 가지고 있다.

첫째, 전역 레벨에 선언돼 있어서 누구나 수정할 수 있다.

앞서 예제로 확인했던 것처럼 window.counter를 활용하면 쉽게 해당 변수에 접근할 수 있을 것이다.

만약 리액트의 useState의 변수가 전역 레벨에 저장돼 있으면 어떻게 될까? 자바스크립트를 조금만 아는 사람이라면

누구나 리액트 애플리케이션을 쉽게 망가뜨릴 것이다. 따라서 리액트가 관리하는 내부 상태 값은 리액트가 별도로 관리하는 클로저 내부에서만 접근할 수 있다. 이를 이제 클로저를 활용한 코드로 변경해 보자.

```jsx
function Counter() {
  var counter = 0;

  return {
    increase: function () {
      return ++counter;
    },
    decreate: function () {
      return --counter;
    },
    counter: function () {
      console.log("counter에 접근!");
      return counter;
    },
  };
}

var c = Counter();

console.log(c.increase()); // 1
console.log(c.increase()); // 2
console.log(c.increase()); // 3
console.log(c.decrease()); // 2
console.log(c.counter()); // 2
```

위와 같은 코드로 변경시 얻을 수 있는 이점

먼저 counter 변수를 직접적으로 노출시키지 않음으로써 사용자가 직접 수정하는 것을 막았음은 물론,
접근하는 경우를 제한해 로그를 남기는 등의 부차적인 작업도 수행할 수 있게 됐다. 또한 counter 변수의 업데이트를 increase와 decrease로 제한해 무분별하게 변경되는 것을 막았다.
이처럼 클로저를 활용하면 전역 스코프의 사용을 막고, 개발자가 원하는 정보만 개발자가 원하는 방향으로 노출시킬 수 있다는 장점이 있다.

**리액트에서의 클로저**

그렇다면 리액트 함수 컴포넌트의 훅에서 클로저는 어떻게 사용될까? 클로저의 원리를 사용하고 잇는 대표적인 것 중 하나가 바로 useState다.

```jsx
function Component() {
  const [state, setState] = useState();

  function handleClick() {
    // useState 호출은 위에서 끝났지만,
    // setState는 계속 내부의 최신값을(prev)을 알고 있다.
    // 이는 클로저를 활용했기 때문에 가능하다.
    setState((prev) => prev + 1);
  }

  // ....
}
```

**useState** 함수의 호출은 **Component** 내부 첫 줄에서 종료됐는데, **setState**는 **useState** 내부의 최신 값을 어떻게 계속해서 확인할 수 있을까? 그것은 바로 클로저가 **useState** 내부에서 활용됐기 때문이다. 외부 함수(useState)가 반환한 내부 함수(setState)는 외부 함수(useState)의 호출이 끝났음에도 자신이 선언된 외부 함수가 선언된 환경(state가 저장돼 있는 어딘가)을 기억하기 때문에 계속해서 state값을 사용할 수 있는 것이다. 구체적으로 어떤 식으로 활용되고 있는지는 3.1절 '리액트의 모든 훅 파헤치기'에서 다룬다.

## 1.4.4 주의할 점

클로저는 매우 어렵고 쉽지 않으므로 사용시 주의를 요한다.

```jsx
for(var i = 0; i < 5; i++){
setTimeout(function() {
console.log(i)
}, i \* 1000)
}
```

위 코드의 의도는 0부터 시작해 1초 간격으로 console.log로 0, 1, 2, 3, 4를 차례대로 출력하는 것이다. 그러나 실제로 위 코드를 실행하면 0, 1, 2, 3, 4초 뒤에 5만 출력된다. **_setTimeout_**의 익명 함수가 클로저로 i를 잘 따라갈 것같은데 모두 5가 되는 이유는 무엇?

그 이유는 i가 전역 변수로 작동하기 때문이다.

앞서 언급한 것처럼, 자스는 기본적으로 함수 레벨 스코프를 따르고 있기 때문에 var는 for문의 존재와 상관없이 해당 구문이 선언된 함수 레벨 스코프를 바라보고 있으므로 함수 내부 실행이 아니라면 전역 스코프에 var i가 등록돼 있을 것이다. for 문을 다 순회한 이후, 태스크 큐에 있는 setTimeout을 실행하려고 했을 때, 이미 전역 레벨에 있는 i 는 5로 업데이트가 완료돼 있다.

이를 올바르게 수정하는 방법은 첫째, 함수 레벨 스코프가 아닌 블록 레벨 스코프를 갖는 let으로 수정하는 것이다.

```jsx
for (let i = 0; i < 5; i ++){
setTimeout(function() {
console.log(i)
}, i \* 1000)
}
```

위 코드는 최초에 의도한 대로 잘 실행된다. let은 기본적으로 블록 레벨 스코프를 가지게 되므로 let i가 for 문을 순회하면서 각각의 스코프를 가지게 된다. 이는 setTimeout이 실행되는 시점에도 유효해서 각 콜백이 의도한 i 값을 바라보게 할 수 있다.

두 번째로는 클로저를 제대로 활용하는 것이다.

```jsx
for (var i = 0; i < 5; i ++) {
setTimeout(
(function (sec) {
return function () {
console.log(sec)
}
})(i),
i \* 1000,
)
}
```

위 함수는 for 문 내부에 즉시 실행 익명 함수를 선언했다. 이 즉시 실행 함수는 i를 인수로 받는데, 이 함수 내부에서는 이를 sec이라고 하는 인수에 저장해 두었다가 setTimeout의 콜백 함수에 넘기게 된다. 이렇게 되면 setTimeout의 콜백 함수가 바라보는 클로저는 즉시 실행 익명 함수가 되는데, 이 즉시 실행 익명 함수는 각 for 문마다 생성되고 실행되기를 반복한다. 그리고 각각의 함수는 고유한 스코프, 즉 고유한 sec을 가지게 되므로 올바르게 실행할 수 있게 된다.

이처럼 클로저의 기본 개념, '함수와 함수가 선언된 어휘적 환경의 조합'을 주의 깊게 살펴봐야 클로저를 제대로 활용할 수 있다.

클로저 사용시 주의점은, 클로저를 사용하는 데는 비용이 든다는 것이다. 클로저는 생성될 때마다 그 선언적 환경을 기억해야 하므로 추가로 비용이 발생한다. (다음 예제에서 살펴보자)

두 함수는 엄청나게 긴 작업(길이가 천만인 배열)을 동일하게 처리한다. 클로저 유무에 따라 자바스크립트 코드에 어떤 차이가 있는지 살펴보자.

**긴 작업을 일반적인 함수로 처리**

```jsx
// 일반적인 함수
const aButton = document.getElementById('a')

function heavyJob() {
const longArr = Array.from({ length: 10000000 }, (\_, i) => i + 1)
console.log(longArr.length)
}

aButton.addEventListener('click', heavyJob)
```

**긴 작업을 클로저로 처리**

```jsx
// 클로저라면?
function heavyJobWithClosure() {
const longArr = Array.from({ length: 10000000 }, (\_, i) => i + 1)
return function () {
console.log(longArr.length)
}
}

const innerFunc = heavyJobWithClosure()
bButton.addEventListener('click', function () {
innerFunc()
})
```

일반적인 함수와 클로저를 사용한 함수가 실제로 어떤 차이가 있는지 크롬 개발자 도구에서 직접 확인해 볼 수 있다(크롬 개발자 도구의 활용법은 6장과 12장에서 다룬다).

먼저 일반 함수를 사용한 코드를 확인해 보면 그림 1.5와 같이 나타난다.

다음으로 클로저를 활용하는 함수를 크롬 개발자 도구에서 확인해 보면 클로저를 활용하는 쪽이 압도적으로 부정적인 영향을 미치는 것을 알 수 있다. 클로저의 기본 원리에 따라, 클로저가 선언된 순간 내부 함수는 외부 함수의 선언적인 환경을 기억하고 있어야 하므로 이를 어디에서 사용하는지 여부에 관계없이 저장해 둔다. 실제로는 onClick 내부에서만 사용하고 있지만 이를 알 수 있는 방법이 없기 때문에 긴 배열을 저장해 두고 있는 모습이다. 반면 일반 함수의 경우에는 클릭 시 스크립트 실행이 조금 길지만 클릭과 동시에 선언, 그리고 길이를 구하는 작업이 모두 스코프 내부에서 끝났기 때문에 메모리 용량에 영향을 미치지 않았다.

클로저의 개념, 즉 외부 함수를 기억하고 이를 내부 함수에서 가져다 쓰는 메커니즘은 성능에 영향을 미친다.

클로저에 꼭 필요한 작업만 남겨두지 않는다면 메모리를 불필요하게 잡아먹는 결과를 야기할 수 있고, 마찬가지로 클로저 사용을 적절한 스코프로 가둬두지 않는다면 성능에 악영향을 미친다. 클로저는 공짜가 아니므로 클로저를 사용할 때는 주의가 필요하다.

[출처] 모던 리액트 Deep Dive
