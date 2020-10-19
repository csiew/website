Welcome to my new blog! I haven't imported my [old blog posts](http://csiew.github.io/blog) to this new one. This new blog uses a successor to my static site generator script [md2magic](http://github.com/csiew/md2magic) to help with importing and indexing posts.

The new script is also written in Python. However I am now using JSON files for its configuration and post manifest. This was inspired by my work on [BiscuitWM](http://github.com/csiew/md2magic) which also uses a JSON file for configuration.

You can view the script in all its glory/horror on the [repository](http://github.com/csiew/website) of this site (under the name [*statgen.py*](https://github.com/csiew/website/blob/master/statgen.py) in the root directory). I will perhaps create a separate repository for this script once it has reached a point of maturity.

Unlike md2magic, it is not responsible for converting markdown files into HTML. Like I mentioned earlier, it's now more of an indexing tool that allows your site to have a readily-available list of your posts with some metadata.