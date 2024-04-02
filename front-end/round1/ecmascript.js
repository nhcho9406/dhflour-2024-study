/** 1. 비동기 프로그래밍의 강화 (async/await) **/
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData('');





/** 2. 코딩 편의성과 가독성 향상 **/
// 템플릿 리터럴과 스프레드 연산자
const name = "World";
console.log(`Hello, ${name}!`);

const first = {a: 1, b: 2};
const second = {c: 3, d: 4};
const combined = {...first, ...second};
console.log(combined);

// 옵셔널 체이닝과 널 병합 연산자
const obj = {a: {b: {c: 1}}};
const value = obj?.a?.b?.c ?? "default value";
console.log(value);





/** 3. 데이터 처리와 표현의 개선 **/
// BigInt
const largeNumber = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
console.log(largeNumber);

// 동적 임포트 (Dynamic Import)
(async () => {
    if (condition) {
        const module = await import('/modules/my-module.js');
        module.doSomething();
    }
})();





/** 4. 모던 웹 개발 요구사항 충족 **/
// 모듈 사용 예시 (가정)
// export from my-module.js
export const add = (x, y) => x + y;

// import in main.js
import { add } from './my-module.js';
console.log(add(1, 2));





/** 5. 국제화와 지역화 지원 **/
const number = 123456.789;
console.log(new Intl.NumberFormat('de-DE').format(number)); // 독일 포맷
console.log(new Intl.NumberFormat('en-US').format(number)); // 미국 포맷






/** 6. 새로운 데이터 구조와 알고리즘 지원 **/
// Set
const mySet = new Set([1, 2, 3, 4, 4]);
console.log(mySet);

// Map
const myMap = new Map([['a', 1], ['b', 2]]);
console.log(myMap);

