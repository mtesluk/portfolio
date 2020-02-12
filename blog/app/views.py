from app import app

@app.route('set_blog')
def set_blog():
   return "hello world!"

@app.route('get_blog')
def get_blog():
   return "hello world!"

@app.route('get_blogs')
def get_blogs():
   return "hello world!"

@app.route('update_blog')
def update_blog():
   return "hello world!"
