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
      
## Editing Cover Letter
  ### `CoverLetterGenerator/coverLetters/templates/coverletters/cover-letter.html`

## All Job Detail
  ### `CoverLetterGenerator/coverLetters/templates/jobs`
  This is the location of the code which holds the general information for the cover letter, and then the cover letter itself.
  
  ### `CoverLetterGenerator/coverLetters/templates/all-jobs`
  This is a simple for loop which shows all jobs that have templates and exist in your database.
  

