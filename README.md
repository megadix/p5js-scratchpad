# Project setup

Activate Virtualenv (Windows Powershell):

```
cd [PROJECT FOLDER]
.\venv\Scripts\Activate.ps1
```


```
pip install -r requirements.txt
```

# Deploy to PROD

1) Generate pages in `/output` folder
2) Deploy to Firebase

```
pelican -s publishconf.py
firebase deploy --only hosting:p5js-scratchpad
```
