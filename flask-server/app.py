from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        title = request.form['title']
        description = request.form['description']

        # Save the metadata to the database or a storage system
        # ...

        return jsonify({'message': 'File uploaded successfully'}), 200

    return jsonify({'error': 'Error uploading file'}), 500

if __name__ == '__main__':
    app.run(debug=True)