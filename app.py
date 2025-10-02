from flask import Flask, render_template

# Create the Flask application instance
app = Flask(__name__)

# --- ROUTES ---

# Route for the homepage (e.g., http://127.0.0.1:5000/)
@app.route('/')
def home():
    # Render the base.html file with 'index.html' content block
    return render_template('index.html')

#  About Page
@app.route('/about')
def about():
    return render_template('about.html')

# Projects Page
@app.route('/projects')
def projects():
    return render_template('projects.html') 

@app.route('/creative') 
def creative_corner():
    return render_template('creative.html')

@app.route('/creative/poetry') 
def poetry():
    return render_template('poetry.html')

@app.route('/creative/paintings') 
def paintings():
    return render_template('paintings.html')

# This allows you to run the app directly from the terminal
if __name__ == '__main__':
    # debug=True automatically reloads the server when you save changes
    app.run(debug=True)