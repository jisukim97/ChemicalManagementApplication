from flask import Flask, request, url_for, redirect, jsonify
from msds import search as sch


app = Flask(__name__)
@app.route("/search/<chemical>")
def search(chemical):
    chemical = chemical.replace("_"," ")
    result = sch(chemical)
    return jsonify(result)

@app.route('/silvi', methods=['POST'])
def crawl():
    chemi_name = request.form['chemi_name']
    return redirect(url_for('search', chemical = chemi_name))

if __name__ == "__main__":
    app.run()

