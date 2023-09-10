# Development processes

## Implement feature
1. Create branch which contains issue number and short description. Example
```MW-25/create-docs`````

2. Implement feature in appropriate branch

3. Create commit which name contains issue type, issue number with "#" symbol and short issue description. Example
```docs: #25 Update UML diagram with firebase collections and business models```
```docs: #25 Create Readme.md with project's description```

3. Merge (or pull --rebase) changes from main and resolve conflicts

4. Push branch to remote repository

7. Create PR to main. PR name should contains issue number with "#" symbol and full issue name. Example
```docs: #25 add Readme.md with description of project scripts, and setup (what to copy etc)```

8. Wait for at least two approve from anyone

9. Resolve all conversations in PR (maybe additional changes required)

10. Squash to main
