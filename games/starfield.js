const s = p => {
    const SCREEN_W = 640;
    const SCREEN_H = 480;
    const NUM_STARS = 200;
    const MAX_DIST = 30;
    const SPEED = 0.2;
    const STARS_WIDTH = 10;
    const STARS_WIDTH_2 = STARS_WIDTH / 2;

    const stars = [];

    let SCREEN_W_2 = p.width / 2;
    let SCREEN_H_2 = p.height / 2;

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
            p.stroke(stars[i].col, 100, 255 - p.map(stars[i].z, 1, MAX_DIST, 0, 255));
            p.strokeWeight(p.map(MAX_DIST - stars[i].z, 1, MAX_DIST, 0, 4));
            p.point(
                stars[i].x / stars[i].z + SCREEN_W_2,
                stars[i].y / stars[i].z + SCREEN_H_2
            );
        }
    }

    p.setup = () => {
        p.createCanvas(SCREEN_W, SCREEN_H);
        for (let i = 0; i < NUM_STARS; i++) {
            stars.push(randomStar(Math.random() * MAX_DIST));
        }
        p.colorMode(p.HSB);
        p.noCursor();
        p.fullscreen(true);
    };

    p.draw = () => {
        p.background(0);
        p.stroke(255);
        update();
        draw();
    };
};

let myp5 = new p5(s);
