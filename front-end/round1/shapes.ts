// shapes.ts 파일: 'Rectangle'과 'Circle' 클래스를 정의하고 외부에서 사용할 수 있도록 export 합니다.
export class Rectangle {
    constructor(public width: number, public height: number) { }
    area() {
        return this.width * this.height;
    }
}

export class Circle {
    constructor(public radius: number) { }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
