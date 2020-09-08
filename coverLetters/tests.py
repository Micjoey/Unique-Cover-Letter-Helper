from django.test import TestCase
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from .forms import CoverLetterForm, UserDetailForm
from .models import Job, UserDetail
from django.core.exceptions import ValidationError
from selenium.webdriver.common.keys import Keys
class FunctionalTestCase(TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome()


    def main_form_text_link(self):
        return 'http://localhost:3000/cover-letter-generator/forms/cover-letter-form'

    def home_page_form_text_link(self):
        return 'http://localhost:3000'

    def test_all_links_on_homepage(self):
        self.browser.get(self.home_page_form_text_link())
        allATags = self.browser.find_elements_by_tag_name('a')
        i = 0
        while i < len(allATags):
            self.browser.find_elements_by_tag_name('a')[i].click()
            self.browser.back()
            i+=1

        
    def test_there_is_homepage(self):
        self.browser.get(
            self.home_page_form_text_link())
        self.assertIn('Job Application Process', self.browser.page_source)
        

    def test_cover_letter_form_button(self):
        self.browser.get(self.home_page_form_text_link())
        self.browser.find_element_by_id(
            'homepage-cover-letter-template-button').click()

    def test_user_creation_form_button(self):
        self.browser.get(self.home_page_form_text_link())
        self.browser.find_element_by_id('homepage-user-template-button').click()
    
    def test_all_users_button(self):
        self.browser.get(self.home_page_form_text_link())
        self.browser.find_element_by_id('homepage-all-users-button').click()
    
    def test_all_jobs_button(self):
        self.browser.get(self.home_page_form_text_link())
        self.browser.find_element_by_id('homepage-all-jobs-button').click()
    
    def test_admin_button(self):
        self.browser.get(self.home_page_form_text_link())
        self.browser.find_element_by_id('homepage-admin-button').click()
    
    def test_cover_letter_back_button(self):
        self.browser.get(
            self.main_form_text_link())
        self.browser.find_element_by_link_text('Back').click()
    
    def test_triplebyte_back_button(self):
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/forms/triplebyte-form')
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

    # def test_filling_out_cover_letter_form(self):
    #     self.browser.get(self.main_form_text_link())
    #     all_template_choices = Select(self.browser.find_element_by_name('template_choices'))
    #     all_template_users = Select(self.browser.find_element_by_name('choice_of_user'))
    #     i = 1
    #     while i < len(all_template_choices.options):
    #         x = 1
    #         while x < len(all_template_users.options):
    #             all_template_choices.options[i].click()
    #             all_template_users.options[x].click()
    #             input_tags = self.browser.find_elements_by_tag_name('input')
    #             for tag in input_tags:
    #                 tag_id = tag.get_attribute('id')
    #                 if tag_id and not tag_id == 'submit-button':
    #                     self.browser.find_element_by_id(tag_id).send_keys('hello')
    #             self.browser.find_element_by_id("submit-button").click()
    #             self.browser.get(
    #                 self.main_form_text_link())
    #             staleness = WebDriverWait(self.browser, 10).until(
    #                 EC.staleness_of(input_tags[2]))
    #             if staleness:
    #                 all_template_choices = Select(
    #                     self.browser.find_element_by_name('template_choices'))
    #                 all_template_users = Select(
    #                     self.browser.find_element_by_name('choice_of_user'))
    #                 input_tags = self.browser.find_elements_by_tag_name(
    #                     'input')
    #             x += 1
    #         i += 1
        
        

    

    def tearDown(self):
       
        self.browser.quit()

class UnitTestCaste(TestCase):
    def test_home_homepage_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'homepage/homepage.html')

    def save_user_object(self):
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

    def test_standard_cover_letter_form(self):
        self.save_user_object()
        form = CoverLetterForm(data={
            'template_choices': 'Standard Job Template',
            'company':'Test - company1',
            'choice_of_user': UserDetail.objects.last(),
            'city':'Test-  santa barbara',
            'position_title':'Test - Jackie',
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

    def test_triplebyte_cover_letter_form(self):
        self.save_user_object()
        form = CoverLetterForm(data={
            'template_choices': 'Triplebyte (message-version)',
            'company':'Test - company1',
            'choice_of_user': UserDetail.objects.last(),
            'city':'Test-  santa barbara',
            'position_title':'Test - Jackie',
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

    def test_non_technical_cover_letter_form(self):
        self.save_user_object()
        form = CoverLetterForm(data={
            'template_choices': 'Non-technical Cover Letter',
            'company':'Test - company1',
            'choice_of_user': UserDetail.objects.last(),
            'city':'Test-  santa barbara',
            'position_title':'Test - Jackie',
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

    def test_fourth_cover_letter_form(self):
        self.save_user_object()
        form = CoverLetterForm(data={
            'template_choices': 'Template 4',
            'company': 'Test - company1',
            'choice_of_user': UserDetail.objects.last(),
            'city': 'Test-  santa barbara',
            'position_title': 'Test - Jackie',
            'link': 'Test - www.trialone.com',
            'recruiter': '',
            'description': 'Test - I love test cases',
            'pre_bullet_point_paragraph_one': 'Test - paragraphone',
            'pre_bullet_point_paragraph_two': 'Test - paragraphtwo',
            'top_skills': 'Test - Javascript, Banana',
            'bullet_point_one': 'Test - BP1',
            'bullet_point_two': 'Test - BP2',
            'bullet_point_three': 'Test - BP3',
            'bullet_point_four': 'Test - BP4',
            'bullet_point_five': 'Test - BP5',
            'bullet_point_six': 'Test - BP6',
            'bullet_point_seven': 'Test - BP7',
            'bullet_point_eight': 'Test - BP8',
            'post_bullet_point_paragraph_one': 'Test - paragraphpostone',
            'post_bullet_point_paragraph_two': 'Test - paragraphposttwo',
        })
        self.assertTrue(form.is_valid())

    def test_fifth_cover_letter_form(self):
        self.save_user_object()
        form = CoverLetterForm(data={
            'template_choices': 'Template 5',
            'company':'Test - company1',
            'choice_of_user': UserDetail.objects.last(),
            'city':'Test-  santa barbara',
            'position_title':'Test - Jackie',
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
    
    

    def save_cover_letter_object(self):
        test_job = Job()
        test_job.template_choices = 'Standard Job Template'
        test_job.company = 'Test - company1'
        test_job.choice_of_user = UserDetail.objects.last()
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
        test_job.template_choices = 'Template 1'
        test_job.save()
        return test_job

    def test_cover_letter_object(self):
        test_job = self.save_cover_letter_object()
        pulled_job = Job.objects.get(link='Test - www.trialone.com')
        self.assertEqual(test_job.link, pulled_job.link)
        
   

    def test_all_jobs_template(self):
        response = self.client.get('/cover-letter-generator/all-jobs')
        self.assertTemplateUsed(response, 'jobs/all-jobs.html')

    def test_all_users_template(self):
        response = self.client.get('/cover-letter-generator/all-users')
        self.assertTemplateUsed(response, 'users/all-users.html')
