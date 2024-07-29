**Array.prototype.map** , **Array.prototype.filter**, **Array.prototype.reduce** 는 모두 배열과 관련된 메서드다.

JSX 내부에서 배열을 조작해 바로 원하는 JSX를 반환하는 특성상 이 3개의 메서드가 굉장히 자주 쓰이는 편이다. 그리고 이 메서드는 기존 배열의 값을 건드리지 않고 새로운 값을 만들어 내기 때문에 기존 값이 변경될 염려 없이 안전하게 사용할 수 있다. 마지막으로, forEach까지 포함해 이제부터 소개할 4개의 메서드는 ES5에서부터 사용한 문법이기에 별도의 트랜스파일이나 폴리필이 없어도 부담 없이 사용할 수 있다.

## Array.prototype.map

Array.prototype.map은 인수로 전달받은 배열과 똑같은 길이의 새 배열을 반환하는 메서드다,

배열의 각 아이템을 순회하며 각 아이템을 콜백으로 연산한 결과로 구성된 새로운 배열을 만들 수 있다.

```jsx
const arr = [1, 2, 3, 4, 5]
const doubledArr = arr.map((item) => item \* 2)
// [2, 4, 6, 8, 10]
```

리액트에서는 주로 특정 배열을 기반으로 어떠한 리액트 요소를 반환하고자 할 때 많이 사용한다.

```jsx
const arr = [1, 2, 3, 4, 5];
const Elements = arr.map((item) => {
  return <Fragment key={item}>{item}</Fragment>;
});
```

## Array.prototype.filter

Array.prototype.filter은 인수로 전달받은 배열과 똑같은 길이의 새 배열을 반환하는 메서드다,

배열의 각 아이템을 순회하며 각 아이템을 콜백으로 연산한 결과로 구성된 새로운 배열을 만들 수 있다.

말 그대로 필터링하는 역할의 메서드이며, filter의 결과에 따라 원본 배열의 길이 이하의 새로운 배열이 변환된다. 즉, 앞선 map과 다르게 같은 크기의 배열이 나오지 않을 수도 있다. 주록 기존 배열에 대해 어떠한 조건을 만족하는 새로운 배열을 반환할 때 쓰인다.

```jsx
const arr = [1, 2, 3, 4, 5];
const evenArr = arr.filter((item) => item % 2 === 0);
// [2, 4]
```

## Array.prototype.reduce

Array.prototype.reduce는 앞선 두 메서드와 다르게 조금 복잡한 메서드다. 처음 자스를 접하는 초보 개발자들이 흔히 헷갈리는 메서드이기도 하다. 이 메서드는 콜백 함수와 함께 초깃값을 추가로 인수를 받는데, 이 초깃값에 따라 배열이나 객체, 또는 그 외의 다른 무언가를 반환할 수 있는 메서드다. 요약하자면 Array.prototype.reduce는 reducer 콜백 함수를 실행하고, 이를 초깃값에 누적해 결과를 반환한다. 아래 예제를 살펴보자

```jsx
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((result, item) => {
  return result + item;
}, 0);
// 15
```

먼저 0은 reduce의 결과를 누적할 초깃값이다. 그리고 reducer 콜백 함수의 첫 번째 인수는 앞서 선언한 초깃갑의 현재값을 의미,. 두 번째 인수는 현재 배열의 아이템을 의미한다. 즉 이 콜백의 반환값을 계속해서 초깃값에 누적하면서 새로운 값을 만든다고 볼 수 있다.

reduce는 단순히 합계를 구하는 것뿐만 아니라 배열을 원하는 하나의 객체로 변환하는 등 다양한 예제에서 사용된다. 그리고 filter와 map의 작동을 reduce 하나로도 구현할 수 있는데, reduce는 앞선 두 메서드에 비해 사용법이 복잡해 코드가 직관적이지 않다. 따라서 짧은 코드라면 filter와 map을 각각 활용해 구현하는 것도 때에 따라 나쁘지 않다.

**filter와 map의 조합과 reduce를 사용한 배열 처리 비교**

```jsx
// 짝수만 100을 곱해 반환하는 함수의 예제
const arr = [1, 2, 3, 4, 5]

// [200, 400]
const result1 = arr.filter((item) => item % 2 === 0).map((item) => item \* 100)

// [200, 400]
const result2 = arr.reduce((result, item) => {
if (item % 2 === 0) {
result.push(item \* 100)
}
return result
}, [])
```

같은 작업을 하는 코드를 각각 filter와 map을 이용한 방식과 reduce를 이용한 방식으로 구현했다.

filter와 map의 조합이 훨씬 가독성이 좋지만 같은 배열에 대해 두 번 순환하는 문제가 있으므로 상황에 맞게 선택하면 좋다

## Array.prototype.forEach

Array.prototype.forEach는 콜백 함수를 받아 배열을 순회하면서 단순히 그 콜백 함수를 실행하기만 하는 메서드다.

```jsx
const arr = [1, 2, 3];

arr.forEach((item) => console.log(item));
// 1, 2, 3
```

리액트 코드 내부에서 map, filter, reduce가 널리 사용되면서 forEach도 자주 사용되는 것을 볼 수 있다. 그러나 forEach는 사용할 때 주의가 필요한 메서드이다.

먼저 forEach는 아무런 반환값이 없다. 단순히 콜백함수를 실행할 뿐, map과 같이 결과를 반환하는 작업은 수행하지 않는다. 즉, 콜백 함수 내부에서 아무리 반환해도 모두 의미없는 값이 된다. forEach의 반환값은 undefined로 의미없다는 것을 알아두어야 한다.

또 한 가지 주의할 점은 forEach는 실행되는 순간 에러를 던지거나 프로세스를 종료하지 않는 이상 이를 멈출 수 없다는 것이다. break, return, 그 무엇을 이용해도 배열 순회를 멈출 수 없다. 다음 예제를 살펴보자.

```jsx
function run() {
  const arr = [1, 2, 3];
  arr.forEach((item) => {
    console.log(item);
    if (item === 1) {
      console.log("finished!");
      return;
    }
  });
}

// 이 함수를 실행하면 다음과 같은 결과를 볼 수 있다.
run();

// 1
// finished!
// 2
// 3
```

중간에 return이 존재해 함수 실행이 끝났음에도 불구하고 계속해서 forEach 콜백이 실행되는 것을 볼 수 있다. 이는 return이 함수의 return이 아닌 콜백 함수의 return으로 간주되기 때문이다. 따라서 forEach를 사용할 때는 절대 중간에 순회를 멈출 수 없다는 사실을 인지하고 있어야 한다.

forEach 내부 콜백함수는 무조건 0(n) 만큼 실행되므로 코드 작성과 실행시 반드시 최적화할 가능성이 있는지 검토해 보자.

​
[출처] 모던 React Deep Dive
