const s = p => {
    let div;

    const NUM_STARS = 200;
    const MAX_TRAIL = 30;
    const MAX_DIST = 60;
    const STARS_WIDTH = 30000;
    const STARS_WIDTH_2 = STARS_WIDTH / 2;
    const MIN_SPEED = 0.1;
    const MAX_SPEED = 2;

    const stars = [];
    let trailNum = 1;
    let fpsSum = 0;
    let fpsNum = 0;
    let lastFps = null;

    let speed = MIN_SPEED;
    let direction = {
        x: 0,
        y: 0
    };

    let screenWidth_2;
    let screenHeight_2;

    function randomStar(z) {
        return {
            x: Math.random() * STARS_WIDTH - STARS_WIDTH_2,
            y: Math.random() * STARS_WIDTH - STARS_WIDTH_2,
            z: z || MAX_DIST,
            col: {
                r: Math.round(Math.random() * 155 + 140),
                g: Math.round(Math.random() * 155 + 140),
                b: Math.round(Math.random() * 155 + 140)
            }
        }
    }

    function update() {
        if (p.keyIsPressed === true && p.keyCode === p.CONTROL) {
            speed += 0.01;
            trailNum = trailNum + 0.2;
        }
        else {
            speed -= 0.02;
            trailNum = trailNum - 0.4;
        }

        speed = p.constrain(speed, MIN_SPEED, MAX_SPEED);
        trailNum = p.constrain(trailNum, 1, MAX_TRAIL);

        for (let i = 0; i < NUM_STARS; i++) {
            stars[i].z -= speed;
            if (stars[i].z < 1) {
                stars[i] = randomStar();
            }
        }

        screenWidth_2 = p.width / 2;
        screenHeight_2 = p.height / 2;

        if (fpsNum === 30) {
            lastFps = fpsSum / fpsNum;
            fpsSum = 0;
            fpsNum = 0;
        }
        else {
            fpsSum += p.frameRate();
            fpsNum++;
        }
    }

    function draw() {
        p.loadPixels();

        for (let i = 0; i < NUM_STARS; i++) {
            for (let j = 0; j < trailNum; j++) {
                const z = stars[i].z + j / 6;
                if (z < 0) {
                    return;
                }
                const x = Math.round(stars[i].x / z + screenWidth_2 + direction.x);
                const y = Math.round(stars[i].y / z + screenHeight_2 + direction.y);
                if (x < 0 || x >= p.width || y < 0 || y >= p.height) {
                    continue;
                }

                const base = (y * p.width + x) * 4;

                if (p.frameCount % 100 === 0) {
                    console.log(`base = ${base}`);
                }

                p.pixels[base] = stars[i].col.r;
                p.pixels[base + 1] = stars[i].col.g;
                p.pixels[base + 2] = stars[i].col.b;
                p.pixels[base + 3] = 255;
            }
        }

        p.updatePixels();

        p.stroke(128);
        p.fill(255);
        p.text('Press CTRL for warp', 10, 10);
        p.text('FPS: ' + (lastFps ? Math.round(lastFps): ''), 10, 30);
    }

    p.setup = () => {
        div = p.canvas.parentElement;
        p.createCanvas(div.clientWidth, div.clientHeight);
        p.pixelDensity(1);
        p.noCursor();

        for (let i = 0; i < NUM_STARS; i++) {
            const z = p.map(NUM_STARS - i, 0, NUM_STARS, 0, MAX_DIST);
            stars.push(randomStar(z));
        }
    };

    p.draw = () => {
        p.background(0);
        p.stroke(255);
        update();
        draw();
    };

    p.windowResized = function () {
        p.resizeCanvas(div.clientWidth, div.clientHeight);
    };

    p.mouseMoved = () => {
        const limitX = p.width / 10;
        const limitY = p.height / 10;
        direction.x = p.constrain(p.mouseX - screenWidth_2, -limitX, limitX);
        direction.y = p.constrain(p.mouseY - screenHeight_2, -limitY, limitY);
    }
};

let myp5 = new p5(s, 'canvas');
