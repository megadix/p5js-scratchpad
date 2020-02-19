const s = p => {
    let div;

    const NUM_STARS = 200;
    const MAX_DIST = 30;
    const SPEED = 0.2;
    const STARS_WIDTH = 10000;
    const STARS_WIDTH_2 = STARS_WIDTH / 2;

    const stars = [];

    let screenWidth_2;
    let screenHeight_2;

    let direction = {
        x: 0,
        y: 0
    };

    function randomStar(z) {
        return {
            x: Math.random() * STARS_WIDTH - STARS_WIDTH_2,
            y: Math.random() * STARS_WIDTH - STARS_WIDTH_2,
            z: z || MAX_DIST,
            col: Math.random() * 255
        }
    }

    function update() {
        screenWidth_2 = p.width / 2;
        screenHeight_2 = p.height / 2;
        for (let i = 0; i < NUM_STARS; i++) {
            stars[i].z -= SPEED;
            if (stars[i].z < 1) {
                stars[i] = randomStar();
            }
        }
    }

    function draw() {
        for (let i = 0; i < NUM_STARS; i++) {
            const x = stars[i].x / stars[i].z + screenWidth_2 + direction.x;
            const y = stars[i].y / stars[i].z + screenHeight_2 + direction.y;
            if (x < 0 || x > p.width || y < 0 || y > p.height) {
                continue;
            }

            const bright = 255 - p.map(stars[i].z, 1, MAX_DIST, 0, 255);
            p.stroke(stars[i].col, 50, bright);
            p.point(x, y);
        }
    }

    p.setup = () => {
        div = p.canvas.parentElement;
        p.createCanvas(div.clientWidth, div.clientHeight);
        p.colorMode(p.HSB);
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

    p.windowResized = function() {
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
