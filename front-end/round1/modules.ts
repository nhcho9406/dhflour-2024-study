// app.ts 파일: shapes.ts 모듈에서 'Rectangle'과 'Circle' 클래스를 import하여 사용합니다.
import { Rectangle, Circle } from './shapes';

let rect = new Rectangle(10, 4);
console.log(rect.area()); // 사각형 면적 계산

let circ = new Circle(5);
console.log(circ.area()); // 원 면적 계산
