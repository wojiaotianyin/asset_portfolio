from flask import Flask, render_template, redirect, url_for, request
from flask_cors import CORS
from pos_mapper import PostgreConnect
import json
from visualize import visualize

psql = PostgreConnect()
app = Flask(__name__, static_folder="../src", template_folder="../src")
CORS(app)
table_name = 'portfolio'
base_columns = 'id, quota'
print("hello")
saved_data = psql.execute("SELECT * FROM {0}".format(table_name))
print(saved_data)
# datas = psql.execute_query("select * from {0}".format(table_name))
# print(datas)


@app.route("/home", methods=["POST", "GET"])
def home():
    # psql.execute("insert into {0} values(default, TIMESTAMP '{1}', '{2}', '{3}', now(), now())".format(table_name, data['date'], data['expense'], data['detail']))
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        print(data)
        saved_data = psql.execute("SELECT * FROM {0}".format(table_name))
        print(saved_data)

    return "hello"


@app.route("/post_visualization", methods=["POST", "GET"])
def postVisualization():
    """ POST """
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        str_data = json.dumps(data['tasks'])
        str_data = str_data.replace('[', '{').replace(']', '}').replace(
            '"assets_name": ', '').replace('"assets_amount": ', '')
        psql.execute("INSERT INTO {0} VALUES(default, '{1}', now(), now())".format(
            table_name, str_data))
    return "OK"


@app.route("/get_past_dates", methods=["POST", "GET"])
def getFromDate():
    """ GET """
    data = psql.execute_query("SELECT * FROM {0}".format(table_name))
    dates = {"date":[]}
    for i in data:
        element = {"portfolio":[i[0], i[3]]}
        dates["date"].append(element)
    return dates

@app.route("/get_past_data", methods=["POST", "GET"])
def getDataFromDate():
    """ POST """
    if request.method == "POST":
        data = request.get_data()
        encoding = 'utf-8'
        data = str(data, encoding)# convert byte into string
        past_data = psql.execute_query("SELECT * FROM {0} WHERE SUBSTRING(CAST(create_date AS VARCHAR(11)), 1, 10) = '{1}'".format(table_name, data))
        send_data = {"portfolio":past_data[0][1]}
    return send_data



@app.route("/edit_data", methods=["POST", "GET"])
def editData():
    """ UPDATE """
    data = psql.execute_query("SELECT * FROM {0}".format(table_name))
    print("getting data from DB")
    print(data)
    print(len(data))
    return "OK"

@app.route("/delete", methods=["POST", "GET"])
def deleteData():
    """ DELETE """
    data = request.get_data()
    data = json.loads(data)
    psql.execute("DELETE FROM {0} WHERE id = '{1}'".format(table_name, data))
    return "OK"


if __name__ == "__main__":
    app.run(debug=True)
