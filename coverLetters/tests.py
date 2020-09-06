from django.test import TestCase
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from .forms import CoverLetterForm, UserDetailForm
from .models import Job, UserDetail
from django.core.exceptions import ValidationError


class FunctionalTestCase(TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome()


    def test_all_links_on_homepage(self):
        self.browser.get('http://localhost:3000')
        allATags = self.browser.find_elements_by_tag_name('a')
        i = 0
        while i < len(allATags):
            self.browser.find_elements_by_tag_name('a')[i].click()
            self.browser.back()
            i+=1
    
    # def test_all_back_buttons(self):
    #     self.browser.get('http://localhost:3000')
    #     allATags = self.browser.find_elements_by_tag_name('a')
    #     i = 0
    #     while i < len(allATags):
    #         currentLink = self.browser.find_elements_by_tag_name('a')[i]
    #         self.browser.find_elements_by_tag_name('a')[i].click()
    #         backButton = self.browser.find_element_by_link_text('Back')
    #         print(currentLink.text)
    #         backButton.click()
    #         i += 1
        
    def test_there_is_homepage(self):
        self.browser.get('http://localhost:3000')
        self.assertIn('Job Application Process', self.browser.page_source)
        

    def test_cover_letter_form_button(self):
        self.browser.get('http://localhost:3000')
        self.browser.find_element_by_id(
            'homepage-cover-letter-template-button').click()

    def test_user_creation_form_button(self):
        self.browser.get('http://localhost:3000')
        self.browser.find_element_by_id('homepage-user-template-button').click()
    
    def test_all_users_button(self):
        self.browser.get('http://localhost:3000')
        self.browser.find_element_by_id('homepage-all-users-button').click()
    
    def test_all_jobs_button(self):
        self.browser.get('http://localhost:3000')
        self.browser.find_element_by_id('homepage-all-jobs-button').click()
    
    def test_admin_button(self):
        self.browser.get('http://localhost:3000')
        self.browser.find_element_by_id('homepage-admin-button').click()
        
    
    def test_cover_letter_back_button(self):
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/cover-letter-form')
        self.browser.find_element_by_link_text('Back').click()
    
    def test_user_form_back_button(self):
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/user-form')
        self.browser.find_element_by_link_text('Back').click()
    
    def test_all_users_back_button(self):
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/all-users')
        self.browser.find_element_by_link_text('Back').click()
    
    def test_all_jobs_back_button(self):
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/all-jobs')
        self.browser.find_element_by_link_text('Back').click()

    def tearDown(self):
        self.browser.quit()

class UnitTestCaste(TestCase):
    def test_home_homepage_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'homepage/homepage.html')

    def test_cover_letter_form(self):
        form = CoverLetterForm(data={
            'template_choices': 'Template 1',
            'company':'Test - company1',
            'city':'Test-  santa barbara',
            'title':'Test - Jackie',
            'link':'Test - www.trialone.com',
            'recruiter':'',
            'description':'Test - I love test cases',
            'pre_bullet_point_paragraph_one':'Test - paragraphone',
            'pre_bullet_point_paragraph_two':'Test - paragraphtwo',
            'top_skills':'Test - Javascript, Banana',
            'bullet_point_one':'Test - BP1',
            'bullet_point_two':'Test - BP2',
            'bullet_point_three':'Test - BP3',
            'bullet_point_four':'Test - BP4',
            'bullet_point_five':'Test - BP5',
            'bullet_point_six':'Test - BP6',
            'bullet_point_seven':'Test - BP7',
            'bullet_point_eight':'Test - BP8',
            'post_bullet_point_paragraph_one':'Test - paragraphpostone',
            'post_bullet_point_paragraph_two': 'Test - paragraphposttwo',
        })
        self.assertTrue(form.is_valid())
    
    def saveCoverLetterObject(self):
        test_job = Job()
        test_job.template_choices = 'Template 1'
        test_job.company = 'Test - company1'
        test_job.city = 'Test-  santa barbara'
        test_job.position_title = 'Test - Jackie'
        test_job.link = 'Test - www.trialone.com'
        test_job.recruiter = ''
        test_job.description = 'Test - I love test cases'
        test_job.pre_bullet_point_paragraph_one = 'Test - paragraphone'
        test_job.pre_bullet_point_paragraph_two = 'Test - paragraphtwo'
        test_job.top_skills = 'Test - Javascript Banana'
        test_job.bullet_point_one = 'Test - BP1'
        test_job.bullet_point_two = 'Test - BP2'
        test_job.bullet_point_three = 'Test - BP3'
        test_job.bullet_point_four = 'Test - BP4'
        test_job.bullet_point_five = 'Test - BP5'
        test_job.bullet_point_six = 'Test - BP6'
        test_job.bullet_point_seven = 'Test - BP7'
        test_job.bullet_point_eight = 'Test - BP8'
        test_job.post_bullet_point_paragraph_one = 'Test - paragraphpostone'
        test_job.post_bullet_point_paragraph_two = 'Test - paragraphposttwo'
        test_job.save()
        return test_job

    def saveUserObject(self):
        test_user = UserDetail()
        test_user.first_name = 'test-first-name'
        test_user.middle_name = 'test-middle-name'
        test_user.last_name = 'test-last-name'
        test_user.preferred_name = 'test'
        test_user.phone_number = '805-451-0363'
        test_user.email = 'test@gmail.com'
        test_user.linkedin = 'test-linkedin.com'
        test_user.github = 'test-github.com'
        test_user.portfolio_website = 'test.space'
        test_user.street_address = 'test 123'
        test_user.city_address = 'test-city'
        test_user.state_address = 'test-state'
        test_user.zip_code = '1234'
        test_user.save()
        return test_user
        
    def test_cover_letter_object(self):
        test_job = self.saveCoverLetterObject()
        pulled_job = Job.objects.get(title='Test - Jackie')
        self.assertEqual(test_job.id, pulled_job.id)
    
    def test_user_form(self):
        user_form = UserDetailForm(data={
            'first_name':'test-first-name',
            'middle_name':'test-middle-name',
            'last_name':'test-last-name',
            'preferred_name':'test',
            'phone_number':'805-451-0363',
            'email':'test@gmail.com',
            'linkedin':'test-linkedin.com',
            'github':'test-github.com',
            'portfolio_website':'test.space',
            'street_address':'test 123',
            'city_address':'test-city',
            'state_address':'test-state',
            'zip_code':'1234',
        })
        self.assertTrue(user_form.is_valid())

    def test_all_jobs_template(self):
        response = self.client.get('/cover-letter-generator/all-jobs')
        self.assertTemplateUsed(response, 'jobs/all-jobs.html')

    def test_all_users_template(self):
        response = self.client.get('/cover-letter-generator/all-users')
        self.assertTemplateUsed(response, 'users/all-users.html')
