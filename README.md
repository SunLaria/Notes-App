# Notes App

Save Your Notes, Customzie it with font size, colors, and note size.

# How To Use

- Double click the empty space to create a new Note.

- Double click the Note To delete it.

- Strech The Note to change its size.

- Change the font size using the arrows in the note.

- Change the color of the note using the Color Palette.

# How to Setup:
Docker:
```
docker run -p 8000:8000 docker.io/randomg1/notes-app:1
```

Locally:
```
git clone https://github.com/SunLaria/Notes-App.git
cd Notes-App
python -m pip install -r requirements.txt
python ./manage.py runserver
```

# How To Run:
Navigate to http://localhost:8000/ or http://127.0.0.1:8000/


# Additional Information

- This Project Is Written in Python, ReactJS, HTML, CSS in Djnago FrameWork.

- All Site Elements are Written in ReactJS

- Note Crud API Operations are Request by Axios 

- Added WhiteNoise module for staticfiles to work with Docker
