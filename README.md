# Notes App

Save Your Notes, Customzie it with font size, colors, and note size.

# How To Use

Double click the empty space to create a new Note.

Double click the Note To delete it.

Strech The Note to change its size.

Change the font size using the arrows in the note.

Change the color of the note using the Color Palette.

# How to Run:
## Docker
Using Docker:
```
docker run -p 8000:8000 docker.io/randomg1/notes-app:1
```

## Local
```
mkdir Notes-App
cd Notes-App
git clone https://github.com/SunLaria/Notes-App.git
python -m pip install -r requirements.txt
python ./manage.py runserver
```

### After Setup:
Navigate to http://localhost:8000


# Additional Information

This Project Is Written in Python, ReactJS, HTML, CSS in Djnago FrameWork.
All Site Elements are Written in ReactJS
Added WhiteNoise for staticfiles to work with docker
