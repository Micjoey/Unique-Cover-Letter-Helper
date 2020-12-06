"""
WSGI config for CoverLetterGeneratorApp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CoverLetterGeneratorApp.settings')

project_folder = os.path.expanduser(
    '/Users/macallansavett/Desktop/Software_engineering/FSP/CoverLetterGenerator/')
load_dotenv(os.path.join(project_folder, '.env'))



application = get_wsgi_application()


