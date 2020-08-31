from django.test import TestCase
from selenium import webdriver

# class FunctionalTestCase(TestCase):
#     def setUp(self):
#         self.browser = webdriver.Chrome()


#     def test_there_is_homepage(self):
#         self.browser.get('http://localhost:3000')
#         self.assertIn('install', self.browser.page_source)


#     def tearDown(self):
#         self.browser.quit()


class UnitTestCaste(TestCase):

    def test_home_homepage_template(self):
        response = self.client.get('')
        self.assertTemplateUsed(response, 'cover-letter-generator/homepage.html')
    
    # def test_all_jobs_template(self):
    #     response = self.client.get('cover-letter-generator/all-jobs')
    #     self.assertTemplateUsed(response, 'all-jobs')
    
    # def test_all_users_template(self):
    #     response = self.client.get('cover-letter-generator/all-users')
    #     self.assertTemplateUsed(response, 'all-users')
    
    # def test_job_detail_template(self):
    #     response = self.client.get('cover-letter-generator/job-detail/1')
    #     self.assertTemplateUsed(response, 'job-detail/1')
    
    
