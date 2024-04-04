// 'sealed' 데코레이터 함수를 정의합니다. 이 함수는 클래스의 생성자를 받아 클래스와 프로토타입을 봉인합니다.
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// 'Greeter' 클래스에 'sealed' 데코레이터를 적용합니다. 이로 인해 'Greeter' 클래스는 확장될 수 없게 됩니다.
// @ts-ignore
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    // 'greet' 메서드는 인사말을 반환합니다.
    greet() {
        return "Hello, " + this.greeting;
    }
}

// 'Greeter' 클래스의 인스턴스를 생성하고 'greet' 메서드를 호출하여 결과를 출력합니다.
let greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"
