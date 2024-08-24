console.log("Hello fellow programmers");
const scoreCard = document.querySelector('.scoreCard');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
let player = { speed: 5, score: 0 };
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

document.addEventListener('keyup', (e) => {  //here,keyup event  is for relasing the key
    e.preventDefault();
    keys[e.key] = false;
    console.log(e.key);
    // console.log("Ram ram bhiya");
});
document.addEventListener('keydown', (e) => {   //here,keydown event is for pressing the key
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key);
    //  console.log(keys[e.key]);
});

startScreen.addEventListener('click', () => {
    window.requestAnimationFrame(gamePlay);   //Refer to GFG Since gameplay is a callback function here aur repeatededy chalne k liye humein callback function k andar bhi request animation wale function ko call karna hoga joki predefined function hai
    player.start = true;
    player.score = 0;
    gameArea.innerHTML = "";  //Iski innerHTML ko humne empty isliye kiya bhai qki agli baar fir yhi andar wali html mitti nahi jo javascript s cars wagerah banai thi humne bhaiya
    startScreen.classList.add('hide');
    for (x = 0; x < 5; x++) {
        let line = document.createElement('line');
        line.setAttribute('class', 'line');
        gameArea.appendChild(line);
        line.y = x * 150;
        line.style.top = line.y + "px";
        // console.log(line);
    }
    for (x = 0; x < 3; x++) {
        let enemy = document.createElement('enemy');
        enemy.setAttribute('class', 'enemy');
        enemy.y = ((x + 1) * 350 * -1);
        enemy.style.top = enemy.y + "px";
        let rk = randomColourGenerator();
        console.log(rk);
        enemy.style.backgroundColor = rk;
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemy);
    }
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    //car.innerText = "Hey Myself the car";
    gameArea.appendChild(car);
    player.y = car.offsetTop;
    player.x = car.offsetLeft;
    // console.log("from top position" + car.offsetTop);
    // console.log("From left position" + car.offsetLeft);
    // console.log("Mein bahar hunn");
    // console.log(keys);
})
/*Request animation frame ka workflow aise hai ki woh jis function m called h wo execute
hone k baad hi wo andar k call back ko repeatedly call karta rahega*/


function gamePlay() {
    //console.log(keys);
    // console.log("Hi Secy mein andar hun");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    /*The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size
    of an element and its position relative to the viewport.*/
    //  console.log(road);
    //   console.log(player.y);
    if (player.start) {
        moveLines();
        moveEnemyCar(car);
        if (keys.Alt) {
            console.log("Blowing horn");
            let horn = new Audio("sounds/horn.mp3");
            horn.play();
        }

        if ((keys.ArrowUp) && (player.y > road.top + 120)) {
            player.y = player.y - (player.speed+2);
            console.log(player);
        }

        if ((keys.ArrowDown) && (player.y < road.height - 98)) {
            player.y = player.y + (player.speed+2);
            console.log(player);
        }
        if ((keys.ArrowRight) && (player.x <= road.width - 50)) {
            player.x = player.x + (player.speed+2);
            console.log(player);
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x = player.x - (player.speed+2);
            console.log(player);
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        player.score++;
        let ps = player.score - 1;
        scoreCard.innerText = "Score: " + ps;
        window.requestAnimationFrame(gamePlay);  //Yeh koi bhi content ko continuously animation m chalane k liye use hone wala predefined function hai
    }
}
function moveLines() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (items) {
        if (items.y > 700) {
            items.y -= 750;
        }

        items.y += player.speed;
        items.style.top = items.y + "px";
    })
}

function moveEnemyCar(car) {
    let enemyCars = document.querySelectorAll('.enemy');
    enemyCars.forEach(function (items) {
        if (isCollide(car, items)) {
            console.log("Boom Hit");
            endGame();
        }
        if (items.y > 700) {
            items.y = -200;
            items.style.left = Math.floor(Math.random() * 350) + "px";
        }

        items.y += player.speed;
        items.style.top = items.y + "px";
    })
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    // console.log(aRect);
    // console.log(bRect);
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over!!" + "<br>Your final score is " + player.score + "<br>Press here to restart the game";
    console.log("Your finale score is " + player.score);
}

function randomColourGenerator() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substring(2);

    }
    return "#" + c() + c() + c();
}
