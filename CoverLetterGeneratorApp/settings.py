import django_heroku
import os
import datetime
import dj_database_url
from dotenv import load_dotenv
load_dotenv()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["www.uniquecoverlettergenerator.com",
                 "uniquecoverlettergenerator.com"
                ]

CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000',
    'http://uniquecoverlettergenerator.herokuapp.com',
    'http://www.uniquecoverlettergenerator.com',
    "www.uniquecoverlettergenerator.com",
    "uniquecoverlettergenerator.com"
]

# CORS_ORIGIN_ALLOW_ALL = True
# ALLOWED_HOSTS = [
#     'uniquecoverlettergenerator.herokuapp.com',
#     '127.0.0.1',
#     'heroku.com',
#     'www.uniquecoverlettergenerator.com',
#     "localhost:3001",
#     "http://localhost:3001/",
#     "https://uniquecoverlettergenerator.herokuapp.com/"
# ]

# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    #rest Auth
    'allauth',
    'allauth.account',
    'rest_auth.registration',

    # # Social Authorization
    'allauth.socialaccount',

    'phone_field',
    'multiselectfield',
    'django_memcached',
    'django_filters',

    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',

   
    # 'allauth.socialaccount.providers.google',

    #apps
    'coverLetters',
    
]

SITE_ID = 1


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

]

ROOT_URLCONF = 'CoverLetterGeneratorApp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'CoverLetterGeneratorApp.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases


AUTH_USER_MODEL = 'coverLetters.User'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'uniquecoverlettergenerator',
        'USER': os.getenv("POSTGRES_DATABASE_USER"),
        'PASSWORD': os.getenv("POSTGRES_DATABASE_PASSWORD"),
        'HOST': '127.0.0.1',
        'PORT': '5432',
    },
   'test': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'uniquecoverlettergeneratorTest',
        'USER': os.getenv("POSTGRES_DATABASE_USER"),
        'PASSWORD': os.getenv("POSTGRES_DATABASE_PASSWORD"),
        'HOST': '127.0.0.1',
        'PORT': '5431',
   },
}
db_from_env = dj_database_url.config(conn_max_age=600)
DATABASES['default'].update(db_from_env)

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
    }
}



# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'US/Pacific'

USE_I18N = True

USE_L10N = True

USE_TZ = True





REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        # 'rest_framework.permissions.AllowAny'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
}



ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 3
ACCOUNT_EMAIL_REQUIRED = True

JWT_AUTH = {
    'JWT_LEEWAY': 10,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=1),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': False,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'JWT',
    'JWT_AUTH_COOKIE': None,

}

REST_USE_JWT = True


# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATIC_URL = "/static/"
# STATICFILES_DIRS = (
#     os.path.join(BASE_DIR, 'build/static'),
# )



STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Extra places for collectstatic to find static files.
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static')
]

# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
django_heroku.settings(locals())
