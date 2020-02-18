const s = p => {
    const SCREEN_W = 640;
    const SCREEN_H = 480;
    const NUM_STARS = 200;
    const MAX_DIST = 30;
    const SPEED = 0.2;
    const STARS_WIDTH = 10;
    const STARS_WIDTH_2 = STARS_WIDTH / 2;
    const MAX_RADIUS = 5;

    const stars = [];

    let SCREEN_W_2 = p.width / 2;
    let SCREEN_H_2 = p.height / 2;

    let direction = {
        x: 0,
        y: 0
    };

    function randomStar(z) {
        return {
            x: Math.random() * SCREEN_W * STARS_WIDTH - SCREEN_W * STARS_WIDTH_2,
            y: Math.random() * SCREEN_H * STARS_WIDTH - SCREEN_H * STARS_WIDTH_2,
            z: z || MAX_DIST,
            col: Math.random() * 255
        }
    }

    function update() {
        SCREEN_W_2 = p.width / 2;
        SCREEN_H_2 = p.height / 2;
        for (let i = 0; i < NUM_STARS; i++) {
            stars[i].z -= SPEED;
            if (stars[i].z < 1) {
                stars[i] = randomStar();
            }
        }
    }

    function draw() {
        for (let i = 0; i < NUM_STARS; i++) {
            const x = stars[i].x / stars[i].z + SCREEN_W_2 + direction.x;
            const y = stars[i].y / stars[i].z + SCREEN_H_2 + direction.y;
            if (x < 0 || x > SCREEN_W || y < 0 || y > SCREEN_H) {
                continue;
            }

            const bright = 255 - p.map(stars[i].z, 1, MAX_DIST, 0, 255);
            p.stroke(stars[i].col, 50, bright);
            p.point(x, y);
        }
    }

    p.setup = () => {
        p.createCanvas(SCREEN_W, SCREEN_H);
        for (let i = 0; i < NUM_STARS; i++) {
            const z = p.map(NUM_STARS - i, 0, NUM_STARS, 0, MAX_DIST);
            stars.push(randomStar(z));
        }
        p.colorMode(p.HSB);
        p.noCursor();
    };

    p.draw = () => {
        p.background(0);
        p.stroke(255);
        update();
        draw();
    };

    p.mouseMoved = () => {
        const limitX = SCREEN_W / 10;
        const limitY = SCREEN_H / 10;
        direction.x = p.constrain(p.mouseX - SCREEN_W_2, -limitX, limitX);
        direction.y = p.constrain(p.mouseY - SCREEN_H_2, -limitY, limitY);
    }
};

let myp5 = new p5(s);
