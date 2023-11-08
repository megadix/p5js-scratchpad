from datetime import datetime

AUTHOR = 'Dimitri De Franciscis'
SITENAME = 'P5.js Scratchpad'
SITEURL = ''
THEME = 'themes/megadix'

PATH = 'content'
ARTICLE_PATHS = ['sketches']
STATIC_PATHS = ['root', 'images', 'sketches']
EXTRA_PATH_METADATA = {
    'root': {'path': ''}
}

TIMEZONE = 'Europe/Rome'

DEFAULT_LANG = 'en'

PATH_METADATA = '(?P<path_no_ext>.*)\..*'
ARTICLE_SAVE_AS = PAGE_SAVE_AS = '{path_no_ext}.html'
ARTICLE_URL = PAGE_URL = '{path_no_ext}'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# Custom variables
CURRDATE = datetime.now().timestamp() * 1000
