from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from datetime import datetime

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

# Database mock-up (replace this with a real database)
uploaded_content = []

@app.route('/api/upload', methods=['POST'])
def upload_content():
    title = request.form['title']
    description = request.form['description']
    price = float(request.form['price'])

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Save the thumbnail
        if 'thumbnail' in request.files:
            thumbnail_file = request.files['thumbnail']
            thumbnail_filename = secure_filename(thumbnail_file.filename)
            thumbnail_file.save(os.path.join(app.config['UPLOAD_FOLDER'], thumbnail_filename))
        else:
            thumbnail_filename = None

        # Add the content to the database mock-up
        content = {
            'title': title,
            'description': description,
            'price': price,
            'filename': filename,
            'thumbnail': thumbnail_filename,
            'uploaded_at': datetime.now().isoformat()
        }
        uploaded_content.append(content)

        return jsonify({'message': 'Content uploaded successfully'}), 200

    return jsonify({'error': 'Error uploading content'}), 500

@app.route('/api/content', methods=['GET'])
def get_uploaded_content():
    return jsonify(uploaded_content)

# Route to retrieve the list of uploaded content for the marketplace
@app.route('/api/marketplace', methods=['GET'])
def get_marketplace_content():
    # Prepare the content data for the marketplace
    marketplace_content = []
    for content in uploaded_content:
        thumbnail_path = None
        if content['thumbnail']:
            thumbnail_path = os.path.join('/uploads', content['thumbnail'])
        file_path = os.path.join('/uploads', content['filename'])
        marketplace_content.append({
            'title': content['title'],
            'description': content['description'],
            'price': content['price'],
            'thumbnail': thumbnail_path,
            'file': file_path,
            'uploaded_at': content['uploaded_at']
        })

    return jsonify(marketplace_content)

if __name__ == '__main__':
    app.run(debug=True)