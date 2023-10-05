# Development processes

## Implement feature
1. Open the issue in a new tab by clicking on the "Open in new tab" button located on the right side of the issue.

2. On the right side, in "Development" block, click on "Create a branch"

3. Create branch which contains issue number and short description. Example
```MW-25/create-docs`````

4. Implement the feature in the created branch.

5. Create commit which name contains issue type, issue number with "#" symbol and short issue description. Example
```docs: #25 Update UML diagram with firebase collections and business models```
```docs: #25 Create Readme.md with project's description```

6. Merge (or pull --rebase) changes from main and resolve any conflicts.

7. Create PR to main. PR name should contains issue number with "#" symbol and full issue name. Example
```docs: #25 add Readme.md with description of project scripts, and setup (what to copy etc)```

8. Assign reviewers from your team and share the PR link in the team chat.

9. Address all discussions in the PR (additional changes may be required) with your team members.

10. Obtain at least one approval from a team member.

11. Share the link to your PR in the "PRs" chat.

12. Continue to address any discussions in the PR until you receive a total of three approvals.
    
13. Squash and merge the PR into the main branch.
