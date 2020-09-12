from django.test import TestCase
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from .forms import CoverLetterForm, UserDetailForm
from .models import Job, UserDetail
from django.core.exceptions import ValidationError
from selenium.webdriver.common.keys import Keys
from random_word import RandomWords
from selenium.webdriver import ActionChains

class FunctionalTestCase(TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome()

    def test_submitting_to_interviewdb(self):
        self.browser.get('https://www.interview-db.com/')
        if self.browser.find_element_by_link_text('Student Sign in with Github'):
            self.browser.find_element_by_link_text(
                'Student Sign in with Github').click()
            self.browser.find_element_by_id(
                'login_field').send_keys('Micjoey')
            self.browser.find_element_by_id(
                'password').send_keys('1W@NT-coding')
            # self.browser.find_element_by_link_text('Sign in').click()
            self.browser.find_element_by_class_name(
                'btn-block').click()
            WebDriverWait(self.browser, 10).until(EC.url_changes(self.browser))
        self.browser.get('https://www.interview-db.com/')
        self.browser.find_element_by_id('react-tabs-2').click()
        if WebDriverWait(self.browser, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'btn'))):
            self.browser.find_elements_by_class_name('btn')[5].click()
            # find the Job Title input field
            title = self.browser.find_element_by_id(
                'root_applications_0_jobTitle')
            title.click()
            title.send_keys('test')
            #
            # find the company field and create it or select
            actions = ActionChains(self.browser)
            companyButton = self.browser.find_elements_by_class_name(
                'css-1hwfws3')[0]
            actions.click(companyButton)
            actions.send_keys('hello')
            actions.pause(2)
            actions.send_keys(Keys.UP)
            actions.send_keys(Keys.ENTER)
            actions.perform()
            #
            # find the source field and create or select
            sourceButton = self.browser.find_elements_by_class_name(
                'css-1hwfws3')[1]
            actions.reset_actions()
            actions.click(sourceButton)
            actions.send_keys('hello2')
            actions.pause(2)
            actions.send_keys(Keys.UP)
            actions.send_keys(Keys.ENTER)
            actions.perform()
            #
        self.browser.find_element_by_id('daily-report-submit').click()

    def tearDown(self):
        self.browser.quit()
