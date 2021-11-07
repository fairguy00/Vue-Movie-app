const { setTimeout } = require("core-js/shim")

function a() {
    console.log('a')
}
function b() {
    console.log('b')
}
a()// a
b()// b
//동기방식

function c() {
    setTimeout(function () {
        console.log('c')
    },1000)
}
function d() {
    console.log('d')
}
c()
d()
//d
//c


function e(cb) {
    setTimeout(function () {
        console.log('e')
        cb()
    },1000)
}
function f() {
    console.log('b')
}
e(function () {
    f()
})
// e
// f 콜백으로 e f 순서대로 실행하는것을 보장


//콜백 지옥
function a(cb) {
    setTimeout(function () {
        console.log('a')
        cb()
    },1000)
}

function b(cb) {
    setTimeout(function () {
        console.log('b')
        cb()
    },1000)
}

function c(cb) {
    setTimeout(function () {
        console.log('c')
        cb()
    },1000)
}
function d(cb) {
    setTimeout(function () {
        console.log('d')
        cb()
    },1000)
}
a(function () {
    b(function () {
        c(function () {
            d()
        })
    })
})

//콜백지옥을 극복하기위한 promise

function a() {
    return new Promise((resolve) => {// resolve 라는 매개변수가 함수임
        setTimeout(function () {
            console.log('a')
            resolve()
        }, 1000);
    })
}

function b() {
    return new Promise((resolve) => {// resolve 라는 매개변수가 함수임
        setTimeout(function () {
            console.log('b')
            resolve()
        }, 1000);
    })
}

a().then(() => {
    return b() //b를 실행하는게 아니라 리턴하면 뒤에 then을 사용가능하다
}).then(() => {
    c()
})

// 위코드와 같다 return, {} 생략
a()
    .then(() => b())
    .then(() => c())
    .then(() => d())
// a b c d 순서대로 실행 보장

// ES8 버전의 await
// await 은 Promise를 반환해야 하므로
// then() 이 붙을수 있는 함수에 사용가능 => async function
//await a() //a() 수행을 기다리고 다음으로 넘어가겠습니다.
async function asyncFunc() {
    await a()
    await b()
    await c()
    await d()
    console.log('done')//제일 마지막에 done
}

function a() {
    return new Promise((resolve, reject) => {
        if (isError) {
            reject('error message')//구현해 놓은 isError일때 실행
            //reject 이후 코드들은 무시
        }
        setTimeout(() => {
            console.log('a')
            resolve('done')//로직이 마무리 되었을때 실행
        },1000)
    })
}

a()
    .then(() => {
        console.log(res)
    })//resolve
    .catch((errorMsg) => {
        console.log('error', errorMsg)// reject('error message') => errorMsg 받아올수있다 
    })// reject
    .finally(() => {
        
    })//로직이 마무리되면 무조건 실행

async function asyncFunc() {
    try {
        const res = await a()
        console.log(res)
    } catch (error){
        console.log(error)
        alert(error)
    } finally {
        console.log('done')
    }
}
asyncFunc()