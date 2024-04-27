//Synchronous code
console.log("You woke up.");
console.log("You went downstairs.");
console.log("You went outside.");
console.log("You went back home.");

//Asynchronous code
setTimeout(() => { console.log("You took a wok."); }, 7000);
setTimeout(() => { console.log("Escaped from the bed."); }, 3000);
setTimeout(() => { console.log("You stumbled downstairs."); }, 4000);
setTimeout(() => { console.log("You ate breakfast."); }, 5000);

//XMLHttpRequest
const request = new XMLHttpRequest();
request.addEventListener('readystatechange', () => {
    if (request.readyState === 4) {
        console.log(request.responseText)
    };

});

request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
request.send();

//Callback

const getTodos = (callback) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            callback(undefined, request.responseText);
        } else if (request.readyState === 4) {
            callback('could not fetch data', undefined);
        }
    });

    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
    request.send();
}
getTodos((err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

//Promise

const getTodos2 = () => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else if (request.readyState === 4) {
                reject('Could Not fulfill promise');
            }
        });
        request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
        request.send();
    });
}
getTodos2().then(data => {
    console.log('promise resolved:', data);
}).catch(err => {
    console.log('promise rejected:', err);
});

//Fetch

fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => {
    console.log('resolved:', response);
    return data = response.json()
}).then(data => {
    console.log('data:', data);
}).catch(err => {
    console.log('Error', err)
});

//Async Await (Optional)

const getTodos3 = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (response.status !== 200) {
        throw new Error('cannot fetch the data');
    }
    const data = await response.json();
    return data;
    }
    getTodos3()
    .then(data => console.log('resolved:', data))
    .catch(err => console.log('rejected:', err.message));
