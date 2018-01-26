from threading import Thread

import gspread, json
from oauth2client.service_account import ServiceAccountCredentials

from flask import Flask
from flask import render_template, request

application = Flask(__name__)

sheet = None

def getSheet():

	global sheet

	if (sheet is None):

		# Use credentials to create a client which interacts with the Google Spreadsheets API
		scope = ['https://spreadsheets.google.com/feeds']
		creds = ServiceAccountCredentials.from_json_keyfile_name('static/client-secrets.json', scope)
		client = gspread.authorize(creds)
		sheet = client.open("ECM Phone Log").sheet1

	return sheet

@application.route('/thanks')
def thanks():

	s = getSheet()
	return render_template('index.html', numEntries = (s.row_count - 1))

@application.route('/')
def index():

	s = getSheet()
	return render_template('index.html', numEntries = (s.row_count - 1))

@application.route('/submit', methods = ['POST'])
def submitter():

	def submitHelper(sh, form):

		date = form.get("date")
		time = form.get("time")
		howFind = form.get("howFind")
		category = form.get("category")
		issue = form.get("issue")
		details = form.get("details")
		classs = form.get("class")
		room = form.get("room")
		name = form.get("name")
		ext = form.get("ext")
		person = form.get("person")
		how = form.get("how")
		length = form.get("length")
		comments = form.get("comments")

		row = [date, time, howFind, category, issue, details, classs, room, name, ext, person, how, length, comments]
		index = sh.row_count + 1
		sh.insert_row(row, index)

	thread = Thread(target = submitHelper, args = (getSheet(), request.form))
	thread.start()

	return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

if __name__ == "__main__":

    application.debug = True
    application.run()



