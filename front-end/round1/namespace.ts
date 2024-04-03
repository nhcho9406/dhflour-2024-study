// 'Shapes'라는 네임스페이스를 정의합니다. 이 안에 있는 클래스들은 모두 'Shapes' 네임스페이스 안에 속합니다.
namespace Shapes {
    // 'Rectangle' 클래스를 정의하고 'export' 키워드를 사용하여 네임스페이스 외부에서도 접근할 수 있게 합니다.
    export class Rectangle {
        // 생성자 함수에서는 너비와 높이를 받아 객체를 초기화합니다.
        constructor(public width: number, public height: number) { }
        // 'area' 메서드는 사각형의 면적을 계산하여 반환합니다.
        area() {
            return this.width * this.height;
        }
    }

    // 'Circle' 클래스 역시 마찬가지로 정의하고 'export' 키워드로 외부 접근을 허용합니다.
    export class Circle {
        constructor(public radius: number) { }
        area() {
            return Math.PI * this.radius * this.radius;
        }
    }
}

// 네임스페이스를 사용하여 클래스 인스턴스를 생성합니다.
let rect = new Shapes.Rectangle(10, 4);
console.log(rect.area()); // 출력: 사각형의 면적

let circ = new Shapes.Circle(5);
console.log(circ.area()); // 출력: 원의 면적
