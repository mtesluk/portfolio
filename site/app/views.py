from app import app

@app.route('set_site')
def set_site():
   return "hello world!"

@app.route('get_site')
def get_site():
   return "hello world!"

@app.route('get_sites')
def get_sites():
   return [
      {
         'username': 'Mateusz',
         'sites': [
            {
               'country': 'Anglia',
               'site': 'Londyn',
            }
         ]
      },
      {
         'username': 'Jan',
         'sites': [
            {
               'country': 'Anglia',
               'site': 'Liverpool',
            }
         ]
      },
      {
         'username': 'Kazik',
         'sites': [
            {
               'country': 'Anglia',
               'site': 'Birmingham',
            }
         ]
      },
   ]

@app.route('get_countries')
def get_countries():
   return [
      {
         'name': 'Mongolia',
         'sites': [
            {
            'name': 'Klucz napoka'
            'longitude': '2',
            'latitude': '3'
            }
         ]
      },
      {
         'name': 'Rosja',
         'sites': [
            {
            'name': 'Moskwa'
            'longitude': '2',
            'latitude': '3'
            },
            {
            'name': 'Petersburg'
            'longitude': '2',
            'latitude': '3'
            },
         ]
      },
      {
         'name': 'Anglia',
         'sites': [
            {
            'name': 'Londyn'
            'longitude': '2',
            'latitude': '3'
            }
         ]
      },
   ]

@app.route('update_site')
def update_site():
   return "hello world!"
