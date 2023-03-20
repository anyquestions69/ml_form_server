from sklearn.model_selection import train_test_split
import pandas as pd
import joblib
import sys
import warnings
import json


warnings.filterwarnings("ignore")


path = sys.argv[1]
data_1 = pd.read_excel(path)
data = pd.read_excel('finally.xlsx')
model = joblib.load("model.joblib")

X = data.drop(['attack', 'ip', 'Unnamed: 0', 'Unnamed: 0.1'], axis=1)
y = data.attack

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
model.fit(X_train, y_train)
data_1 = data_1.drop(['Unnamed: 0'], axis=1)
a = model.predict(data_1.loc[ : , data_1.columns != 'ip'])
new = data_1
new['predict'] = a
ip_s = list(new[new['predict'] == 1]['ip'])[0]
print(ip_s)
with open('/Users/public_hysteria/jsAdmin/api_marker/log.json') as f:
    logs = json.load(f)
logs = pd.json_normalize(logs)
for ip in ip_s:
    print(logs.loc[0][['data.login']].to_list()[0])
    break

