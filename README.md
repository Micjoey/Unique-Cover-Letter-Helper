# cover-letter-template-generator
Generates a template cover letter for easy submitting of an application.

## Run: `Python3 manage.py runserver`
  This will start the server running on http://localhost:8000/. If you are having issues with running the above command using Python3, 
  try using `Python manage.py runserver`.
  
  If your preference for locally running the server is http://localhost:3000/, please run `Python3 manage.py runserver 3000` or `Python manage.py runserver 3000`

## **Creating a SuperUser**
  For this system it is important to create a superuser. To do so go click here ([documentation](https://docs.djangoproject.com/en/1.8/intro/tutorial02/)) or follow the below steps:
    * run `python manage.py createsuperuser` or `python3 manage.py createsuperuser` in your terminal that is at the top folder level (CoverLetterGenerator) of the        project.
    * Follow prompts in the terminal.
    **Access to SuperUser**
      To access the superuser you'll have to go to `http://localhost:3000/admin` or `http://localhost:8000/admin` and log in. At this point you can edit or delete any information that is in the system.

## **Create a User**
  On the homepage click the User Form to create.

  For simplicity the last user you create will be the one that the system uses for the cover-letter template. Eventually I will add in the option to select which user-info to be used, but for now it will just take whatever the last user was created.
      
## Editing Cover Letter
  ### `CoverLetterGenerator/coverLetters/templates/coverletters/cover-letter.html`

  ### Cover Letter Template
  If you want a different pre-filled sections (i.e Top Skills is filled with "Dynamic and accomplished Software Engineer with experience and expertise in") you can go to `coverLetters/models.py` and under that field in the `Job Model` you can either add or change the field `default="x"`.

  Currently the `top_skills` field has a default value of `"Dynamic and accomplished Software Engineer with experience and expertise in"`. Which is based off the template I have in there.

  Don't worry about the bullet_point_one, etc. They wont be added into the cover letter unless you wish it to be so.

## All Job Detail
  ### `CoverLetterGenerator/coverLetters/templates/jobs`
  This is the location of the code which holds the general information for the cover letter, and then the cover letter itself.
  
  ### `CoverLetterGenerator/coverLetters/templates/all-jobs`
  This is a simple for loop which shows all jobs that have templates and exist in your database.
  

