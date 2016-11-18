# A tutorial started for AngularJS
--- 
This template is a very simple starter for AngularJS, and is linked to the tutorial on https://successcallback.wordpress.com/2016/11/18/getting-started-wth-angularjs
It is suggested that you read the tutorial before forking/cloning this repo.

### Usage and requirements
It is assumed you're familiar with the terminal, javascript and have heard of NPM and Grunt. I am also assuming you are using a *ux system like Linux or Mac. This should work on windows, but I don't have Windows, so I can't test it. 

1. Download and install NPM - https://nodejs.org/en/#download
2. Open the terminal or command line and install Grunt

``` shell
npm install -g grunt-cli.
```

3. Get started with the repo
    a. Fork or clone the repo
    There is more detail on this in the tutorial (linked above). If you know what you're doing, Fork, then clone you're own repo. If not, read the tutorial!

``` shell
git clone https://github.com/path/to/my/forked/repo
```

4. Once the repo has cloned to your machine, cd into the directory

```shell
cd ~/angularjs-template
```

5. Install dependencies and Run Grunt
    Type the following:

```shell
npm install
```

    then:

``` shell
grunt
```

All things going to plan, it should run and start a watch cycle. Don't worry - it's not designed to quit. If you need to quit it later, just halt (Control+z) and quit the terminal. 

6. Open the browser
    Open your browser and navigate to localhost:8000
    The site will load with Hello, world!
    Go back to the tutorial and get started working through the steps, or you can watch the video breakdown on our YouTube channel, successCallback!.

7. Open (you may need to download) Textmate or Sublime text - check the tutorial for more details
8. Open the folder /source in either package - do not edit the 'build' folder
9. Edit away! The grunt command will watch for saved changes and update build files. Reload the browser for the latest changes! (You may need to clear the cache, if things don't look right). 

### Framework
This template is built using:

* AngularJS
* Bootstrap CSS, minified and a Bootswatch theme
