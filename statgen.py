import os, sys, json, uuid
from datetime import datetime

CONFIG_FILE_PATH = "statgen_config.json"


class Post:
    id = ""
    title = ""
    path = ""
    date = ""

    def __init__(self, post_id=None, title="", path="", date=None):
        if post_id is None:
            self.id = str(uuid.uuid4())
        else:
            self.id = post_id
        self.title = title
        self.path = path
        if date is None:
            self.date = datetime.today().strftime('%Y-%m-%dT%H:%M:%S')
        else:
            self.date = date
    
    def __str__(self):
        return '''\
            id: {id}
            title: {title}
            path: {path}
            date: {date}\
        '''.format(id=self.id, title=self.title, path=self.path, date=self.date)
    
    def to_object(self):
        return {
            "id": self.id,
            "title": self.title,
            "path": self.path,
            "date": self.date
        }


class StatGen:
    config_file = None
    config_data = None
    manifest_file = None
    manifest_data = None

    def __init__(self):
        try:
            self.config_file = open(CONFIG_FILE_PATH)
            self.config_data = json.load(self.config_file)
        except:
            print("Unable to read config file")
            self.exit(1)
        
        try:
            self.manifest_file = open(self.config_data['post_store_manifest'], "r+")
            self.manifest_data = json.load(self.manifest_file)
            self.manifest_file.seek(0)
        except:
            print("Unable to read manifest file")
            self.exit(1)

        if len(sys.argv) == 4:
            if sys.argv[1] == "add":
                post_path = self.config_data['post_store'] + '/' + sys.argv[2]
                post_title = sys.argv[3]
                if not self.check_file_exists(post_path):
                    print("Cannot find post")
                    self.exit(1)
                else:
                    print("Post found...")
                    # post_path_formatted = "@" + self.remove_prefix(post_path, 'src')
                    post_path_formatted = self.remove_prefix(post_path, 'public')
                    new_post = Post(title=post_title, path=post_path_formatted)
                    self.manifest_data['posts'].append(new_post.to_object())
                    self.update_manifest()
                    self.exit()
        elif len(sys.argv) == 3:
            if sys.argv[1] == "remove":
                post_id = sys.argv[2]
                if self.remove_post(post_id) == True:
                    print("Removed post with ID: {post_id}".format(post_id=post_id))
                    self.exit()
                print("Unable to remove or find post with ID: {post_id}".format(post_id=post_id))
                self.exit(1)
        elif len(sys.argv) == 2:
            if sys.argv[1] == "list":
                for post in self.manifest_data['posts']:
                    print("{post_id}\t\t{post_title}".format(post_id=post['id'], post_title=post['title']))
            self.exit()
        else:
            print("Use: statgen [add/remove/list] [path] [title]")
            self.exit()
    
    def update_manifest(self):
        self.manifest_file.seek(0)
        self.manifest_file.write(json.dumps(self.manifest_data, indent=4))
        self.manifest_file.truncate()
    
    def check_file_exists(self, file_path=""):
        if len(file_path) > 0:
            if not os.path.exists(file_path):
                return False
            else:
                return True
        else:
            return False
    
    def find_post(self, id):
        i = 0
        for post in self.manifest_data['posts']:
            if post['id'] == id:
                return i
            i = i + 1
        return -1
    
    def check_post_exists(self, id):
        if self.find_post(id) >= 0:
            return True
        return False

    def remove_post(self, id):
        index_to_delete = self.find_post(id)
        if index_to_delete >= 0:
            del self.manifest_data['posts'][index_to_delete]
            self.update_manifest()
            return True
        return False

    def remove_prefix(self, text, prefix):
        # Adapted from: https://stackoverflow.com/a/16891418/8665013
        if text.startswith(prefix):
            return text[len(prefix):]
        return text
    
    def exit(self, status=0):
        self.config_file.close()
        self.manifest_file.close()
        sys.exit(status)


if __name__ == "__main__":
    StatGen()