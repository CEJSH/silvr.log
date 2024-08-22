## 프로미스 패턴

프로미스는 자바스크립트에서 비동기 작업을 처리하는 최신 방법입니다. 프로미스는 비동기 작업의 결과를 나타내는 객체로, 대기, 완료, 거부의 세 가지 상태를 가질 수 있습니다. 작업이 성공적으로 완료되었거나 거부되었을 때 결과를 제공하는 일종의 계약서 같은 존재입니다.
프로미스는 Promise 생성자를 사용하여 만들 수 있으며, 이 생성자는 함수를 인수로 받습니다. 또 다시 이 함수는 resolve와 reject 두 개의 인수를 전달받습니다. resolve 함수는 비동기 작업이 성공적으로 완료되었을 떄 호출되고, reject 함수는 작업이 실패했을 때 호출됩니다.
다음은 네트워크 요청을 위해 프로미스를 사용하는 방법을 보여주는 예시입니다.

```jsx
function makeRequest(url){
return new Promise((resolve, reject)=>{
    fetch(url)
        .then(respone => response.json()
        .then(data => resolve(data))
        .catch(error => reject(error));
        });
}

makeRequest('http://example.com/')
	.then(data => console.log(data))
    .catch(error => console.error(error));
```

이번 예제에서 makeRequest 함수는 네트워크 요청의 결과를 나타내는 Promise 객체를 반환합니다. HTTP 요청을 수행하기 위해 함수 내부에서 Fetch 메서드를 사용합니다. 요청이 성공하면 Promise는 응답을 완료하여 데이터를 반환하고, 실패하면 에러와 함꼐 거부됩니다. 호출자는 반환된 Promise 객체의 .then 및 .catch 메서드를 통해 이러한 요청의 결과를 처리할 수 있습니다.
프로미스를 사용할 떄의 주요 장점 중 하나는 콜백보다 체계적이고 가독성이 높은 방법으로 비동기 작업을 처리할 수 있다는 것입니다. 이를 통해 '콜백 지옥'을 피하고, 이해하기 쉽고 유지보수성이 높은 코드를 작성할 수 있습니다.
다음은 자바스크립트에서 활용할 수 있는 다양한 프로미스 디자인 패턴을 이해하는 데 도움이 될 추가 예시들을 소개하겠습니다.

### 프로미스 체이닝

프로미스 체이닝 페턴을 사용하면 여러개의 프로미스를 함꼐 연결하여 보다 복잡한 비동기 로직을 만들 수 있습니다.

```jsx
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function processData(data) {
  // process data
  return processData;
}

makeRequest("http://example/com/")
  .then((data) => processData(data))
  .then((processedData) => console.log(processedData))
  .catch((error) => console.error(error));
```

### 프로미스 에러 처리

프로미스 에러 처리 패턴은 catch 메서드를 사용해 프로미스 체인의 실행 중에 발생할 수 있는 에러를 처리합니다.

```jsx
makeRequest("http://example.com/")
  .then((data) => processData(data))
  .then((processedData) => console.log(processedData))
  .catch((error) => console.error(error));
```

### 프로미스 병렬 처리

프로미스 병렬 처리 패턴은 Promise.all 메서드를 사용하여 여러 프로미스를 동시에 실행할 수 있게 해줍니다.

```jsx
Promise.all([
	makeRequest('http://example.com/1')
    makeRequest('http://example.com/2')
]).then([data1, data2]) => {
	console.log(data1, data2);
});
```

### 프로미스 순차 실행

프로미스 순차 실행 패턴은 Promise.resolve 메서드를 사용하여 프로미스를 순차적으로 실행할 수 있도록 해줍니다.

```jsx
Promise.resolve()
  .then(() => makeRequest1())
  .then(() => makeRequest2())
  .then(() => makeRequest3())
  .then(() => {
    // 모든 요청 완료
  });
```

### 프로미스 메모이제이션

프로미스 메모이제이션 피턴은 캐시를 사용하여 프로미스 함수 호출의 결과값을 저장합니다. 이를 통해 중복된 요청을 방지할 수 있습니다.

```jsx
const cache = new Map();

function memizedMakeRequest(url){
if(cache.has(url)){
	return cache.get(url)
}

	reteurn new Promise((resolve, reject)=>{
    	fetch(url)
        	.then(response -> response.json())
            .then(data => {
            	cache.set(url, data);
                resolve(data);
                })
                .catch(error => reject(error));
            });
}
```

위 예제에서 functionCountUp과 ArrowFunctionCountUp은 둘 다 state를 증가시키는 동일한 작업을 합니다. 하지만 일반 함수인 functionCountUp의 this는 undefined를 가리키고, 화살표 함수인 ArrowFunctionCountUp의 this는 클래스 인스턴스를 가리킵니다. 화살표 함수는 함수 정의 위치의 상위 스코프의 this를 그대로 사용하기 때문에 별도의 작업 없이도 원하는 this에 접근할 수 있습니다.

이번 예제에서는 memoizedMakeRequest 함수를 사용해 중복 요청을 방지하는 방법을 보여드리겠습니다.

```jsx
const button = document.querySelector("button");
button.addEventListener("click", () => {
  memoizedMakeRequest("http://example.com/")
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
```

### 프로미스 파이프라인

프로미스 파이프라인 패턴은 프로미스와 함수형 프로그래밍 기법을 황룡하여 비동기 처리의 파이프라인을 생성합니다.

```jsx
function trnasform1(data){
	// 데이터 변환
    return transforedData
}

function transform2(data){
	// 데이터 변환
    return transformedData;
}

makeRequest('http://example.com/')
	.then(data => pipeline(data)
    	.then(transform1)
        .then(transform2)
    .then(transformedData => console.log(transformedData))
    .catch(error => console.error(error));
    )
```

### 프로미스 재시도

프로미스 재시도 패턴을 사용하면 프로미스가 실패할 때 다시 시도할 수 있습니다.

```jsx
function makeRequestWithRetry(url) {
  let attempts = 0;

  const makeRequest = () =>
    new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((erro) => reject(error));
    });
  const retry = (erro) => {
    attempts++;
    if (attempts >= 3) {
      throw new Error("Request failed after 3 attempts.");
    }
    console.log(`Retrying request: attempt ${attempts}`);
    return makeRequest();
  };
  return makeRequest().catch(retry);
}
```

### 프로미스 경쟁

프로미스 경쟁 패턴은 여러 프로미스를 동시에 실행하고 가장 먼저 완료되는 프로미스의 결과를 반환합니다.

```jsx
Promise.race([
  makeRequest("http://example.com/1"),
  makeRequest("http://example.com/2"),
]).then((data) => {
  console.log(data);
});
```

출처: 자바스크립트 + 리액트 디자인 패턴
