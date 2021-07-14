# microplane-example
This repository shows how to use the microplane [service](https://github.com/Clever/microplane/) to make multiple operations in multiple repos


## Executing the example
First, you need to install microplane by running the following command (check original repo for alternatives):
```
brew install microplane
```

Since the only way microplane allows the gihub token to be passed, is by env variables, you need to follow the next steps:
- first generate a token by going into: `Settings -> Developer settings -> Personal access tokens`
- copy the token and save it for later
- on the terminal, execute the following: `export GITHUB_API_TOKEN=YourTokenHere`
- you can add it to your .zsh config file if is something that you use regularly


After setting up the GH token, you just need to add you repositories (one per line) to the `repos.txt` file and run the following:
```
sh run.sh GithubUsername BranchName
```
Both arguments are mandatory, being the first your github username and the second the name you want to give to the branch that will be created.


## Explaining how the script works:
For executing microplane we have 4 stages (5, being the last one not used on this example):
- init: which initializes the service with the desired repositories
- clone: clones the previous initialized repositories into a new `mp` folder
- plan: run the given script against all the repos and creates a new `plan` folder inside `mp`
- push: which push the changes to all the repos - and opens the PRs needed

Other than the `plan` step, there's not much to configure here. But if you want to check all the option that each instruction gives, you can do it [here](https://github.com/Clever/microplane/blob/master/docs/mp.md)


For the `plan` instruction, there is a specific limitation that usually makes the use of scripts with multiple actions hard. You cannot make multiple `plan` instructions and then `push` them, since the plan always overrides the last one, only the last `plan` would be pushed to the github.

For my specific use-case I wanted to:
- run a script to change a `json` file
- conditionally run another script to change a `yaml` file
- conditionally run a terminal instruction (`helm` instruction)

The workaround I found for this use-case was:
- make a shell script that runs all the `microplan` instructions
- conditionally run another shell file (which runs the 3 instructions)
- otherwise, just run the script that changes the `json` file

