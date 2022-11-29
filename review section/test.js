document.addEventListener('click', clickHandler);
console.log('started execution');
waitThreeSeconds();
console.log('finished execution');

function waitThreeSeconds(){
    console.log('wait 3 seconds...');
    var ms = 3000 + new Date().getTime();
    while(new Date() < ms) {}
    console.log('finished function');
}
function clickHandler(){
    console.log('click event!');
}

var isMomHappy = true;
const momHappy = (phone) => {isMomHappy = true; return }
const momUnhappy = (reason) => {isMomHappy = false; return }

let willIGetNewPhone = new Promise((resolve, reject) => {
    if (isMomHappy) {
        const phone = getNewPhone();
        resolve(phone);
    } else{
        const reason = "mommy angry";
        reject(reason);
    }
}
);

(() => {
    willIGetNewPhone
    .then(() => {
        throw new Error('Something failed');
        console.log('Do this');
    })
    .catch(() => {
        console.log('Do that');
    })
    .then(() => {
        console.log('Do this whatever happened before');
    });
})()