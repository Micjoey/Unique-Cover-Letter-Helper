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
        # todaysDate = datetime.now().strftime('%B %dth, %Y')
        allJobs = self.browser.find_elements_by_tag_name('a')
        i = 2
        while i < len(allJobs):
            print("current index -", i)
            currentJob = allJobs[i]
            currentJob.click()
            time.sleep(2)
            jobTitle = self.browser.find_element_by_id('job-title').text
            jobCompany = self.browser.find_element_by_id('job-company').text
            jobWebsite = self.browser.find_element_by_id('job-website').text
            jobDetails = self.browser.find_element_by_id(
                'job-company').text+'- '+self.browser.find_element_by_id('job-title').text + ' ('+self.browser.find_element_by_id('job-website').text+')'
            self.browser.get('https://www.interview-db.com/')
            signInText = None
            if i == 2:
                signInText = self.browser.find_element_by_link_text(
                    'Student Sign in with Github')
            if signInText:
                self.browser.find_element_by_link_text(
                    'Student Sign in with Github').click()
                self.browser.find_element_by_id(
                    'login_field').send_keys('Micjoey')
                self.browser.find_element_by_id(
                    'password').send_keys('v2CAMjBdOf1lQ09DoIXuQ')
                self.browser.find_element_by_class_name(
                    'btn-block').click()
                WebDriverWait(self.browser, 10).until(EC.url_changes(self.browser))
                print('signed in')
            self.browser.get('https://www.interview-db.com/profile/job-search')
            WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.TAG_NAME, 'li')))
            self.browser.find_element_by_tag_name('li').click()
            self.browser.find_element_by_tag_name('input').send_keys('365')
            self.browser.find_elements_by_tag_name('button')[4].click()
            time.sleep(10)
            # WebDriverWait(self.browser, 10).until(EC.staleness_of(self.browser.find_element_by_class_name('rt-tb')))
            isPresent = self.browser.page_source.find(
                jobDetails) != -1
            print(isPresent," -", jobDetails)
            if not isPresent:
                print('in NOT present if clause')
                self.browser.get('https://www.interview-db.com/')
                self.browser.find_element_by_id('react-tabs-2').click()
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
                print('submit job')
                WebDriverWait(self.browser, 10).until(
                    EC.element_to_be_clickable((By.CLASS_NAME, 'btn')))
                print('just submitted')
                self.browser.get(
                    'http://localhost:3000/cover-letter-generator/all-jobs/')
                time.sleep(10)
            print('break from if clause')
            self.browser.get(
                'http://localhost:3000/cover-letter-generator/all-jobs/')
            allJobs = self.browser.find_elements_by_tag_name('a')
            i += 2
                

    def tearDown(self):
#         # time.sleep(20)
        self.browser.quit()


# staleness = WebDriverWait(self.browser, 10).until(
    #         EC.staleness_of(allJobs[i]))
                #     if staleness:
                #         time.sleep(10)
                #         i += 2
                #         # print(i)
                #         self.browser.get(
                #             'http://localhost:3000/cover-letter-generator/all-jobs/')
                #         print('changed website back to start')
                #         WebDriverWait(self.browser, 10).until(
                #             EC.url_changes(self.browser))
                #         allJobs = self.browser.find_elements_by_tag_name(
                #             'a')
                #         print(len(allJobs), 'length of all jobs')
                #         WebDriverWait(self.browser, 5).until(EC.element_to_be_clickable(self.browser.find_elements_by_tag_name('a')[2]))
                #         allJobs[i].click()
                #         time.sleep(10)
                #         jobTitle = self.browser.find_element_by_id(
                #             'job-title').text
                #         jobCompany = self.browser.find_element_by_id('job-company').text
                #         jobWebsite = self.browser.find_element_by_id('job-website').text
                #         jobDetails = self.browser.find_element_by_id(
                #             'job-company').text+'- '+self.browser.find_element_by_id('job-title').text + ' ('+self.browser.find_element_by_id('job-website').text+')'
                # else:
                #     self.browser.get(
                #         'http://localhost:3000/cover-letter-generator/all-jobs/')
                #     WebDriverWait(self.browser, 10).until(
                #         EC.url_changes(self.browser))
                #     time.sleep(5)
                #     i += 2
                #     print('reached this point')
                #     staleness = WebDriverWait(self.browser, 20).until(
                #         EC.staleness_of(allJobs[2]))
                #     print('last-pring')
                #     if staleness:
                #         self.browser.quit()
                #         self.browser = webdriver.Chrome()
                #         self.browser.get(
                #             'http://localhost:3000/cover-letter-generator/all-jobs/')
                #         allJobs = self.browser.find_elements_by_tag_name(
                #             'a')
                #         staleness = WebDriverWait(self.browser, 20).until_not(
                #             EC.staleness_of(allJobs[i]))
                #         print('not stale')
                #         currentJob = allJobs[i]
                #         currentJob.click()
