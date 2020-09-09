# cover-letter-template-generator
Generates a template cover letter for easy submitting of an application.

# **Make Sure All Commands For Below Are Done At The Root Level.**

## **Techonolgies needed:**
* `Python`: 
  * [Installing python on windows](https://www.ics.uci.edu/~pattis/common/handouts/pythoneclipsejava/python.html)
  * [Installing python on mac](https://docs.python.org/3/using/mac.html)
  * [Installing python using homebrew](https://docs.brew.sh/Homebrew-and-Python)
* `Python Virtual Environment`:
  * [Installing Virtual Environment](https://docs.python.org/3/library/venv.html)
* `Django`:
  * [Installing Django on windows](https://docs.djangoproject.com/en/1.8/howto/windows/#:~:text=Django%20can%20be%20installed%20easily,version%20in%20the%20command%20prompt.)
  * [Installing Django](https://docs.djangoproject.com/en/3.1/topics/install/)
* `Selenium` for testing:
  * [Installing Selenium](https://selenium-python.readthedocs.io/installation.html)


## **STARTING VIRTUAL ENVIRONMENT: `source venv/bin/activate`**
  It is important to start the virtual environment and doing the above code will do so. 

## Run: `Python3 manage.py runserver`
  This will start the server running on http://localhost:3000/. If you are having issues with running the above command using Python3, 
  try using `Python manage.py runserver`.
  
  If your preference for locally running the server is http://localhost:8000/, please run `Python3 manage.py runserver 8000` or `Python manage.py runserver 8000`

## **Creating a SuperUser**
  For this system it is important to create a superuser. To do so go click here ([documentation](https://docs.djangoproject.com/en/1.8/intro/tutorial02/)) or follow the below steps:
    * run `python manage.py createsuperuser` or `python3 manage.py createsuperuser` in your terminal that is at the top folder level (CoverLetterGenerator) of the        project.
    * Follow prompts in the terminal.
    **Access to SuperUser**
      To access the superuser you'll have to go to `http://localhost:3000/admin` or `http://localhost:8000/admin` and log in. At this point you can edit or delete any information that is in the system.

## **Create a User**
  On the homepage click the User Form to create.

  For simplicity the last user you create will be the one that the system uses for the cover-letter template. You have the option to change it on the form itself if you wish. 
      
## **Testing**
  * First make sure you are in the virtual environment to start the test. In your terminal it should show `(venv) YourNameHere:ProjectName`.
  * Next in your terminal make sure you are at the root level.
  * run: `python manage.py test`
  This will run through an assortment of tests such as making sure the back buttons are present on each back except for admin. Making sure that each form field is working, and the different templates are valid.
  <br>
  If you change the model, you will also need to change these tests. 
  
## **Editing Cover Letter**
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
    </br>
    </br>
    <ul>`Template choices:` - This is where you select which version of the template you wish to populate. This is pre-populated with `cover-letter.html` or otherwise known as "Standard Cover Letter".</ul>
    <ul>`Choice of user:` - ID 2 - Your User Info - date created: 2020-09-03 - This is whatever user information you provided that will populate the form. </ul>
    <ul>`Job posting website:` - Linkedin - Put here the website to which you gathered the information from.This is so that it can say "I saw your job posting from x" </ul>
    <ul>`Company:` - The name of the company you are applying to.</ul>
    <ul>`Position title:` - Title of the position you are applying to.</ul>
    <ul>`City:` - What city is the job in? This is really just for your records.</ul>
    <ul>`Link:` - This is the link of the job posting so that you can go back to it.</ul>
    <ul>`Recruiter:` - If you have a recruiters name, then put it here.The recruiters name will replace the generic greeting.</ul>
    <ul>`Description:` - Job description for your records.</ul>
    <ul>`Pre bullet point paragraph one:` - If you want to have a paragraph before the bullet points.</ul>
    <ul>`Pre bullet point paragraph two:` - If you want to have a second paragraph before the bullet points.</ul>
    <ul>`Top skills:` - These are your top skills that are relevant to the job.
        This is prefilled in with "Dynamic and accomplished Software Engineer with experience and expertise in x".</ul> 
    <ul>`Bullet point x:` - These are the additional reasons why you are good for this position. There are eight fields.</ul> 
    <ul>`Post bullet point paragraph one:` - If you want to have a paragraph post the bullet points.</ul>
    <ul>`Post bullet point paragraph two:` - If you want to have a second paragraph post the bullet points.</ul>
    </br>
    </br>

  ## Duplicates
  To resolve the issue of potentially putting duplicate information into the database. I used `unique_together` which is a meta class to `models`. See Below:
    `class Meta:
      unique_together = ('link', 'template_choices', 'position_title')`

   To explain what this little piece of code is doing, it is looking at each form submitted to make sure that there is a unique combination of link, template choice, and position title. 
   I choose these three for a specific reason:
  * The link generated by a job is typically unique to that single job, so therefore that alone should solve for uniqueness.
  * I added in template choices so that you can have multiple cover letters for one job as long as they are different templates. 
  * Position_title was added in to create one last uniqueness check. 
  
