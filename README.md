# p5js-scratchpad

A collection of [P5.js](https://p5js.org/) scripts: exercises, experiments... fun!

Please don't take these examples too seriously, as I am by no means a P5.js expert.

See demos at:
https://p5js-scratchpad.web.app/

## Screenshots

### Physics

![Physics example](docs/gravity_ropes.png)

### Games

![Startfield](docs/starfield.png)

![Thrust](docs/thrust.png)

### Chaos

Logistic map:

![Logistic Map](docs/logistic.png)

Mandelbrot Set:

![Logistic Map](docs/mandelbrot.png)

Mandelbrot Set Orbits Explorer:

![Logistic Map](docs/mandelbrot-orbit-explorer-1.png)

![Logistic Map](docs/mandelbrot-orbit-explorer-2.png)

---

# Developer notes (Skip if you're not interested in deploying this website)

## Project setup

Activate Virtualenv (Windows Powershell):

```
cd [PROJECT FOLDER]
.\venv\Scripts\Activate.ps1
```


```
pip install -r requirements.txt
```

## Deploy to PROD

1) Generate pages in `/output` folder
2) Deploy to Firebase

```
pelican -s publishconf.py
firebase deploy --only hosting:p5js-scratchpad
```
