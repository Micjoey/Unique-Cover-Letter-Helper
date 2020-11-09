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
from .passwords import github_login, github_password

class FunctionalSubmitToInterviewDB(TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome()

    def test_submitting_to_interviewdb(self):
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/all-jobs/')
        wait = WebDriverWait(self.browser, 20)
        all_jobs = self.browser.find_elements_by_tag_name('a')
        date_created = datetime.now()
        date_difference_between_today_and_job = datetime.now() - date_created
        less_than_seven_days = True
        job_website_is_present = True
        multiple_skips = False
        skip_count = 0
        first_valid_a = 4
        i = first_valid_a
        while i <= 100 and less_than_seven_days and job_website_is_present and not multiple_skips:
            currentJob = all_jobs[i]
            currentJob.click()
            jobTitle = self.browser.find_element_by_id('position_title').text
            jobCompany = self.browser.find_element_by_id('company').text
            jobWebsite = self.browser.find_element_by_id(
                'job_posting_website').text
            if self.browser.find_element_by_id(
                'description'):
                jobDescription = self.browser.find_element_by_id(
                    'description')
            else:
                jobDescription = 'N/A'
            # checks to make sure the a website link is present
            if jobWebsite:
                job_website_is_present = True
            else:
                i += 2
                continue

            date_created = self.browser.find_element_by_id(
                'form_creation_date').text
            jobDetails = self.browser.find_element_by_id(
                'company').text+'- '+self.browser.find_element_by_id('position_title').text + ' ('+self.browser.find_element_by_id('job_posting_website').text+')'
            halfJobDetails = self.browser.find_element_by_id(
                'company').text+'- '+self.browser.find_element_by_id('position_title').text + ' ('
            # edits the date to be consistent
            if "-" in date_created:
                date_created = datetime.strptime(date_created, '%Y-%m-%d')
                todaysDate = datetime.now().strftime('%Y-%m-%d')
                date_difference_between_today_and_job = (datetime.strptime(
                    todaysDate, '%Y-%m-%d') - date_created).days
            else:
                todaysDate = datetime.now().strftime('%B %dth, %Y')
                date_created = datetime.strptime(date_created, '%B %dth, %Y')
                date_difference_between_today_and_job = (datetime.strptime(
                    todaysDate, '%B %dth, %Y') - date_created).days
            # 
            less_than_seven_days = date_difference_between_today_and_job < 14
            self.browser.get('https://www.interview-db.com/')
            signInText = None
            if i == first_valid_a:
                signInText = self.browser.find_element_by_link_text(
                    'Student Sign in with Github')
            if signInText:
                self.browser.find_element_by_link_text(
                    'Student Sign in with Github').click()
                self.browser.find_element_by_id(
                    'login_field').send_keys(github_login())
                self.browser.find_element_by_id(
                    'password').send_keys(github_password())
                self.browser.find_element_by_class_name(
                    'btn-block').click()
                wait.until(EC.url_changes(self.browser))
                self.browser.get('https://www.interview-db.com/profile')
                self.browser.find_element_by_css_selector(
                    '#root > section > div > nav > a:nth-child(1)').click()
                self.browser.find_element_by_css_selector('#react-tabs-2').click()
            self.browser.get('https://www.interview-db.com/profile')
            self.browser.find_element_by_xpath(
                '//*[@id="root"]/section/div/main/nav/nav/button[3]').click()
            wait.until(
                EC.element_to_be_clickable((By.TAG_NAME, 'li')))
            self.browser.find_element_by_tag_name('input').clear()
            self.browser.find_element_by_tag_name('input').send_keys('365', Keys.ENTER)
            self.browser.find_element_by_xpath(
                '//*[@id="react-tabs-1"]/div/div/div[1]/div/div/div[1]/div[2]/div/div[1]/select/option[7]').click()
            wait.until(EC.visibility_of_element_located(
                (By.XPATH, '//*[@id="react-tabs-1"]/div/div/div[1]/div/div/div[1]/div[3]/div[1]/div/div[2]/div')))
            time.sleep(2)
            fullTitleIsPresent = self.browser.page_source.find(
                jobDetails) != -1
            halfTitleIsPresent = halfJobDetails in self.browser.page_source
            if not halfTitleIsPresent or not fullTitleIsPresent:
                time.sleep(1)
                self.browser.find_element_by_xpath('//*[@id="root"]/section/div/nav/a[1]').click()
                wait.until(EC.invisibility_of_element((By.CLASS_NAME, 'sc-lcpuFF eOXROa')))
                if wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'btn-add'))):
                    self.browser.find_elements_by_class_name('btn-add')[5].click()
                    # find the job description field and select
                    # jobDescriptionInput = self.browser.find_element_by_id(
                    #     'root_applications_0_details')
                    # jobDescriptionInput.click()
                    # jobDescriptionInput.send_keys(jobDescription)
                    #
                    title = self.browser.find_element_by_id(
                        'root_applications_0_jobTitle')
                    title.click()
                    title.send_keys(
                        jobTitle)
                    actions = ActionChains(self.browser)
                    companyButton = self.browser.find_elements_by_class_name(
                        'css-1hwfws3')[0]
                    actions.click(companyButton)
                    actions.send_keys(
                        jobCompany)
                    actions.pause(2)
                    # actions.send_keys(Keys.UP)
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
                    actions.send_keys(Keys.ENTER)
                    actions.perform()
                    actions.reset_actions()
                    # 
                self.browser.find_elements_by_tag_name('button')[9].click()
                wait.until(EC.url_matches(
                    'https://www.interview-db.com/profile/job-search'))
                # time.sleep(10)
            else:
                skip_count += 1
                if skip_count > 40:
                    multiple_skips = True

            self.browser.get(
                'http://localhost:3000/cover-letter-generator/all-jobs/')
            all_jobs = self.browser.find_elements_by_tag_name('a')
            if halfTitleIsPresent or fullTitleIsPresent:
                print('Skipped Job #', i/2, ' skip count is -', skip_count)
            else:
                print('Finished Job #', (i/2))
            i += 2
                

    def tearDown(self):
        self.browser.quit()


