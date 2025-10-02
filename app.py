from flask import Flask, render_template

# Create the Flask application instance
app = Flask(__name__)

# --- ROUTES ---

# Route for the homepage (e.g., http://127.0.0.1:5000/)
@app.route('/')
def home():
    # Render the base.html file with 'index.html' content block
    return render_template('index.html')

# This allows you to run the app directly from the terminal
if __name__ == '__main__':
    # debug=True automatically reloads the server when you save changes
    app.run(debug=True)