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
  
## Filling Out Form
  Each field of the form:
    `Template choices:` - This is where you select which version of the template you wish to populate. This is pre-populated with `cover-letter.html` or otherwise known as "Standard Cover Letter".
    `Choice of user:` - ID 2 - Your User Info - date created: 2020-09-03 - This is whatever user information you provided that will populate the form.
    `Job posting website:` - Linkedin - Put here the website to which you gathered the information from. This is so that it can say "I saw your job posting from x"
    `Company:` - The name of the company you are applying to.
    `Position title:` - Title of the position you are applying to.
    `City:` - What city is the job in? This is really just for your records.
    `Link:` - This is the link of the job posting so that you can go back to it.
    `Recruiter:` - If you have a recruiters name, then put it here. The recruiters name will replace the generic greeting.
    `Description:` - Job description for your records.
    `Pre bullet point paragraph one:` - If you want to have a paragraph before the bullet points.
    `Pre bullet point paragraph two:` - If you want to have a second paragraph before the bullet points.
    `Top skills:` - These are your top skills that are relevant to the job. This is prefilled in with "Dynamic and accomplished Software Engineer with experience and expertise in "
    `Bullet point x:` - These are the additional reasons why you are good for this position. There are eight fields. 
    `Post bullet point paragraph one:` - If you want to have a paragraph post the bullet points.
    `Post bullet point paragraph two:` - If you want to have a second paragraph post the bullet points.

