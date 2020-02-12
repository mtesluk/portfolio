from app import app

@app.route('register')
def register():
   return "hello world!"

@app.route('login')
def login():
   return "hello world!"

@app.route('logout')
def logout():
   return "hello world!"

@app.route('get_user')
def get_user():
   return "hello world!"

@app.route('get_users')
def get_users():
   return "hello world!"
