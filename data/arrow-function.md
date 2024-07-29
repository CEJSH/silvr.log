## 화살표 함수의 특징과 차이점

앞서 언급된 함수생성 방식과 몇 가지 큰 차이점이 있다. 이에 대해 하나씩 살펴보자.

1. 생성자 함수로 사용 불가능
   화살표 함수는 constructor를 사용할 수 없기 때문에 생성자 함수로 사용할 수 없습니다.

```jsx
const Car = (name) => {
  this.name = name;
};

// Uncaught TypeError: Car is not a constructor
const myCar = new Car("하이");
```

2. arguments 객체의 부재
   화살표 함수는 arguments 객체를 사용할 수 없습니다.

```jsx
function hello() {
  console.log(arguments);
}

// Arguments(3) [1, 2, 3, callee: f, Symbol(Symbol.iterator): f]
hello(1, 2, 3);

const hi = () => {
  console.log(arguments);
};

// Uncaught ReferenceError: arguments is not defined
hi(1, 2, 3);
```

3. this 바인딩
   화살표 함수와 일반 함수의 가장 큰 차이점은 this 바인딩 방식입니다. 일반 함수는 호출 방식에 따라 this가 동적으로 결정되지만, 화살표 함수는 함수가 정의된 위치의 상위 스코프의 this를 따릅니다.

```jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  functionCountUp() {
    console.log(this); // undefined
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  }

  ArrowFunctionCountUp = () => {
    console.log(this); // class Component
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  };

  render() {
    return (
      <div>
        {/* Cannot read properties of undefined (reading 'setState') */}
        <button onClick={this.functionCountUp}>일반 함수</button>
        {/* 정상적으로 작동한다. */}
        <button onClick={this.ArrowFunctionCountUp}>화살표 함수</button>
      </div>
    );
  }
}
```

위 예제에서 functionCountUp과 ArrowFunctionCountUp은 둘 다 state를 증가시키는 동일한 작업을 합니다. 하지만 일반 함수인 functionCountUp의 this는 undefined를 가리키고, 화살표 함수인 ArrowFunctionCountUp의 this는 클래스 인스턴스를 가리킵니다. 화살표 함수는 함수 정의 위치의 상위 스코프의 this를 그대로 사용하기 때문에 별도의 작업 없이도 원하는 this에 접근할 수 있습니다.

## 요약

**생성자 함수로 사용 불가** : 화살표 함수는 constructor를 사용할 수 없습니다.

**arguments 객체 부재** : 화살표 함수는 arguments 객체를 지원하지 않습니다.

**this 바인딩** : 화살표 함수는 상위 스코프의 this를 따르며, 일반 함수는 호출 방식에 따라 동적으로 this가 결정됩니다.

이러한 특징들은 화살표 함수가 특정 상황에서 유용하게 사용될 수 있도록 해줍니다. 특히 this 바인딩 문제를 해결하는 데 있어 화살표 함수는 큰 도움이 됩니다.

출처: 모던 React Deep Dive
