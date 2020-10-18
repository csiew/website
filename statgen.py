import os, sys, json, uuid
from datetime import datetime

CONFIG_FILE_PATH = "statgen_config.json"


class Post:
    title = ""
    path = ""
    date_object = {
        'year': '',
        'month': '',
        'day': '',
        'hr': '',
        'mins': '',
        'sec': ''
    }

    def __init__(self, title, path, date_object=None):
        self.title = title
        self.path = path
        if date_object is None:
            timestamp = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
            timestamp_date = timestamp.split(" ")[0].split("-")
            timestamp_time = timestamp.split(" ")[1].split(":")
            self.date_object = {
                'year': timestamp_date[0],
                'month': timestamp_date[1],
                'day': timestamp_date[2],
                'hr': timestamp_time[0],
                'mins': timestamp_time[1],
                'sec': timestamp_time[2]
            }
            print(self.date_object)
        else:
            self.date_object = date_object


class StatGen:
    config_file_data = None

    def __init__(self):
        try:
            config_file = open(CONFIG_FILE_PATH)
            self.config_file_data = json.load(config_file)
        except:
            print("Unable to read config file")
            sys.exit(1)

        if len(sys.argv) == 2:
            self.post_path = sys.argv[1]
            if not self.check_file_exists():
                print("Cannot find post")
                sys.exit(1)
            else:
                print("Post found...")
                new_post = Post("Hello world", "blah")
                print(new_post.date_object)
                sys.exit(0)
        else:
            print("Use: statgen [new post path]")
    
    def check_file_exists(self):
        if len(self.post_path) > 0:
            if not os.path.exists(self.post_path):
                return False
            else:
                return True
        else:
            return False


if __name__ == "__main__":
    StatGen()