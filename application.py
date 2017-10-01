import gspread, json
from oauth2client.service_account import ServiceAccountCredentials

from flask import Flask
from flask import render_template, request, redirect, url_for

application = Flask(__name__)

@application.route('/thanks')
def thanks():
	return render_template('index.html')

@application.route('/')
def index():

	global sheet

	# Use credentials to create a client which interacts with the Google Spreadsheets API
	scope = ['https://spreadsheets.google.com/feeds']
	creds = ServiceAccountCredentials.from_json_keyfile_name('static/client-secrets.json', scope)
	client = gspread.authorize(creds)
	sheet = client.open("ECM Phone Log").sheet1

	return render_template('index.html', numEntries = (sheet.row_count - 1))

@application.route('/submit', methods = ['POST'])
def submitter():

	global sheet

	date = request.form.get("date")
	time = request.form.get("time")
	howFind = request.form.get("howFind")
	category = request.form.get("category")
	issue = request.form.get("issue")
	details = request.form.get("details")
	classs = request.form.get("class")
	room = request.form.get("room")
	name = request.form.get("name")
	ext = request.form.get("ext")
	person = request.form.get("person")
	how = request.form.get("how")
	length = request.form.get("length")
	comments = request.form.get("comments")

	row = [date, time, howFind, category, issue, details, classs, room, name, ext, person, how, length, comments]
	index = sheet.row_count + 1
	sheet.insert_row(row, index)

	return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

if __name__ == "__main__":
    application.debug = True
    application.run()