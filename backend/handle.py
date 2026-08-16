"""
Serverless handler for Django on Vercel.
This file allows Vercel to import the Django WSGI application.
"""
import os
from config.wsgi import application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# For Django setup on serverless
os.environ.setdefault('DJANGO_ALLOW_ASYNC_UNSAFE', 'true')

app = application
