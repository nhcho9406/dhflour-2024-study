function add(a: number, b: number): number {
    return a + b;
}

add(5, 10); // 정상 작동
add('5', '10'); // 컴파일 에러
