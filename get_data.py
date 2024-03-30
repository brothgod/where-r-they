# python script to get images of legislative officials from wikipedia 

# https://en.wikipedia.org/w/api.php?action=query&titles=Joe_Biden&prop=pageimages&format=json&pithumbsize=100

import requests
import pandas as pd
from unidecode import unidecode
import os
import json

def download_image(image_url, folder_path="images"):
    # Create the folder if it doesn't exist
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Extracting the filename from the URL
    filename = os.path.join(folder_path, os.path.basename(image_url))

    # Sending a GET request to the image URL
    headers = {'User-Agent': 'adoro/1.0 (https://example.org/coolbot/; coolbot@example.org)'}
    response = requests.get(image_url, headers=headers)
    
    # Checking if the request was successful
    if response.status_code == 200:
        # Writing the image content to a file
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Image downloaded successfully: {filename}")
        return filename
    else:
        print(f"Failed to download image: {response.status_code}, {response.reason}")


csv_file = "legislators-current.csv"
df = pd.read_csv(csv_file)
#names = df.full_name
#name_df = df[["full_name", "wikipedia_id", "type", "first_name", "last_name"]]#you can also use df['column_name']

error_list = []
json_dict = {}

for index, row in df.iterrows():
    full_name = row["full_name"]
    wikipedia_id = row["wikipedia_id"]
    dep = row["type"]
    first_name = row["first_name"]
    last_name = row["last_name"]

    #print(full_name, wikipedia_id, type)
    sparql_query = """
            prefix schema: <http://schema.org/>
            SELECT ?genderLabel ?image
            WHERE {{
                <https://en.wikipedia.org/wiki/{0}> schema:about ?item .
                ?item wdt:P21 ?gender .
                ?item wdt:P18 ?image .
                SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en" }}
            }}
        """
    #normal_string = unidecode(wikipedia_id)
    sparql_query = sparql_query.format(wikipedia_id.replace(" ", "_"))
    
    url = 'https://query.wikidata.org/sparql'
    headers = {'User-Agent': 'adoro/1.0 (https://example.org/coolbot/; coolbot@example.org)'}

    r = requests.get(url, params={'format': 'json', 'query': sparql_query}, headers=headers)
    #print(r.status_code, r.reason)
    try:
        data = r.json()
        gender = data['results']['bindings'][0]['genderLabel']['value']
        url = data['results']['bindings'][0]['image']['value']
        filename = download_image(url)

        json_dict[full_name] = {"gender":gender, "image_path":filename, "department": dep}
    except:
        #print(r.json())
        print(wikipedia_id)
        error_list.append(row["wikipedia_id"])

print(error_list)
#print(data['results']['bindings'], gender)

json_object = json.dumps(json_dict, indent=4)
 
# Writing to sample.json
with open("congress_data.json", "w") as outfile:
    outfile.write(json_object)