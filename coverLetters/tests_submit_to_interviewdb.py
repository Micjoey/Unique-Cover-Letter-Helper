from selenium.webdriver.common.action_chains import ActionChains
from django.test import TestCase
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from .models import Job, UserDetail
from django.core.exceptions import ValidationError
from selenium.webdriver.common.keys import Keys
from random_word import RandomWords
import time
from datetime import datetime


class FunctionalSubmitToInterviewDB(TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome()

       

    def test_submitting_to_interviewdb(self):
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/all-jobs/')
        # todaysDate = datetime.now().strftime(" %B %d, %Y ")
        todaysDate = datetime.now().strftime('%B %dth, %Y')
        allJobs = self.browser.find_elements_by_tag_name('a')
        i = 2
        while i < len(allJobs):
            self.browser.get(
                'http://localhost:3000/cover-letter-generator/all-jobs/')
            allJobs = self.browser.find_elements_by_tag_name('a')
            currentJob = allJobs[i]
            currentJob.click()
            time.sleep(2)
            jobTitle = self.browser.find_element_by_id('job-title').text
            jobCompany = self.browser.find_element_by_id('job-company').text
            jobWebsite = self.browser.find_element_by_id('job-website').text
            jobDetails = self.browser.find_element_by_id(
                'job-company').text+'- '+self.browser.find_element_by_id('job-title').text + ' ('+self.browser.find_element_by_id('job-website').text+')'
            self.browser.get('https://www.interview-db.com/')
            if self.browser.find_element_by_link_text('Student Sign in with Github'):
                self.browser.find_element_by_link_text(
                    'Student Sign in with Github').click()
                self.browser.find_element_by_id(
                    'login_field').send_keys('Micjoey')
                self.browser.find_element_by_id(
                    'password').send_keys('v2CAMjBdOf1lQ09DoIXuQ')
                self.browser.find_element_by_class_name(
                    'btn-block').click()
                WebDriverWait(self.browser, 10).until(EC.url_changes(self.browser))
                self.browser.get('https://www.interview-db.com/profile/job-search')
                # WebDriverWait(self.browser, 10).until(
                #     EC.element_to_be_clickable((By.TAG_NAME, 'button')))
                # self.browser.find_elements_by_tag_name('button')[2].click()
                WebDriverWait(self.browser, 10).until(
                    EC.element_to_be_clickable((By.TAG_NAME, 'li')))
                self.browser.find_element_by_tag_name('li').click()
                time.sleep(10)
                # WebDriverWait(self.browser, 10).until(EC.staleness_of(self.browser.find_element_by_class_name('rt-tb')))
                isPresent = self.browser.page_source.find(
                    jobDetails) != -1
                print(isPresent)
                if not isPresent:
                    self.browser.get('https://www.interview-db.com/')
                    time.sleep(5)
                    self.browser.find_element_by_id('react-tabs-2').click()
                    time.sleep(4)
                    if WebDriverWait(self.browser, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'btn'))):
                        self.browser.find_elements_by_class_name('btn')[5].click()
                        # find the Job Title input field
                        title = self.browser.find_element_by_id(
                            'root_applications_0_jobTitle')
                        title.click()
                        title.send_keys(
                            jobTitle)
                        #
                        # find the company field and create it or select
                        actions = ActionChains(self.browser)
                        companyButton = self.browser.find_elements_by_class_name(
                            'css-1hwfws3')[0]
                        actions.click(companyButton)
                        actions.send_keys(
                            jobCompany)
                        actions.pause(2)
                        actions.send_keys(Keys.UP)
                        actions.send_keys(Keys.ENTER)
                        # actions.send_keys(Keys.TAB)
                        actions.perform()
                        actions.reset_actions()
                        #
                        # find the link
                        # find the source field and create or select
                        sourceButton = self.browser.find_elements_by_class_name(
                            'css-1hwfws3')[1]
                        actions = ActionChains(self.browser)    
                        actions.reset_actions()
                        actions.click(sourceButton)
                        actions.send_keys(
                            jobWebsite)
                        actions.pause(2)
                        actions.send_keys(Keys.UP)
                        actions.send_keys(Keys.ENTER)
                        actions.perform()
                        actions.reset_actions()
                        #
                    self.browser.find_elements_by_tag_name('button')[9].click()
                    self.browser.get(
                        'http://localhost:3000/cover-letter-generator/all-jobs/')
            i += 1
            #     
                

    def tearDown(self):
        # time.sleep(20)
        self.browser.quit()
