# ER-assist

## Documentation
### Database

There are 4 collections in this app:
#### Startcases
*Startcases is the entry point of a path through the app*
```
Text: String
// Textual content of the entry point.
```

#### Laws
*Laws are the endpoint of a path through the app*
```
Law: String
// Which legislation does this law belong to. (straffeloven, passientrettighetsloven, etc.)
Paragraph: String
// The paragraph number and name of the law. (17. Nødrett, Kapittel 4A, etc.)
Text: String
// The content of the law
Summary: String
// A sentence that summarizes the law text
Example: String
// An example case where the law applies
```

#### Filters
*Filters is applied in between links*
```
Text: String
// Textual content of the filter
Number_of_outcomes: Number
// The number of outbound links from this filter
```

#### Links
*Links bind two objects together to form a path*
```
From: Object
// The object in the start of the link (startcase or filter)
Mark: String
// An optional mark over the link (YES, NO, etc.)
To: Object
// The object in the end of the link (filter or law)
```

#### Urls
*Relevant URLs for the application*
```
Link: String
// The external URL (http://www...)
```


## Workflow
#### Create branch
First off, create a new branch:
```bash
git pull
git checkout -b <branch-name> master
```
> Branch-name should be with the convention iss(issue-id-number)

Next, write your code, stage the files and commit:
```bash
git status
git add <some-file>
git commit -m "commit message"
```
Iterate the above for changes you make.

Before you end a session, push your work to git:
```bash
git push origin <branch-name> 
```
> Use _git push **-u** origin \<branch-name\>_ to set upstream to your branch. i.e. next time use just _git push_

#### Close branch

When you are ready to merge your branch to the master you should issue a Pullrequest on Github to let others review your code. You can manage the merge from Github, and delete the branch locally when you are done. 

If, however, Github can't automatically merge follow these steps:

When you are done with the branch.
First merge the master into your branch to check for mergconflicts:
```bash
git fetch origin
git checkout <branch-name>
git merge master
```
Fix any mergeconflicts, switch to master and merge it with your branch:
```bash
git checkout master
git merge --no-ff <branch-name>
```
Push master to git:
```bash
git push origin master
```
Delete your branch:
```bash
git branch -d <branch-name>
```

ALL DONE!
