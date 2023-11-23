# Core features

## UserPage (default for logged in)

- [x] show user name (3h)
- [x] render own ways table
  - [x] fix button create new way (new should be visible) (9h)
  - [] add ability to delete way (12h)
- [x] render mentoring ways table
- [x] render favorite ways table
- [] change format in cells lists (use ol li instead of css styles, put button "add item" to bottom of cell)

## WayPage

- [x] fix button create new day report (new should be visible without page reloading) (12h)
- [] show mentors (link to user page) in the mentor comments (12h)
- [] render goal (description), add ability to edit own way (goal) (12h) (9h)
- [x] render way name, add ability to edit own way (way name) (12h)
- [] add button "favorite" which put the way into your favorite ways (add field favorite to WayDTO) (24h)

## AllWaysPage (default for not logged in)

- [x] render all ways table
- [] add links to mentors (9h)

## AllUsersPage

- [x] all users table columns: name, email, number of own ways, number of mentoring ways, number of favorite (36h) 

## UserProfilePage

- [] description + ability to change it (12h)
- [] add name + ability to change it (12h)
- [] add email + ability to change it (12h)
- [] add attach custom link with resource description (12h) (for cv or video etc)
- [] add other user contacts (links) + ability to change them (12h)

## AboutProjectPage

- [] project description (12h)
- [x] FAQ accordion
- [] how to contribute (6h)
- [] donates

## Additional feature

- [] multi language interface 
- [] sent feedback (add lambda to netlify)
- [] UserProfilePage: attach resource (pdf for cv for example)
- [] AllWaysPage: search/filter panel
- [] AllUsersPage: search/filter panel
- [] UserPage: add visual notifications which favourite and mentoring ways changed
- [] attach files, images, videos to records
- [] chat with mentor
- [] public/private ways
- [] public/private users
- [] add link to records
- [] bold/italic format for record
- [] share result (with LinkedIn - way completed)
- [] Make AnalyticalReport (statistic)
- [] Analytics page
- [] Achievements
- [] WayPage: Add possibility to attach links on docs, video, audio, etc
- [] Possibility to add tags for each JobDone
- [] Investigation with coming soon tooltip (component)
- [] AllWaysPage: show number favorite (12h)
- [] WayPage: show number favorite (increased when somebody add the way to favorite and decreased when somebody remove the way from favorite) (9h)
- [] WayPage: add button "become a mentor" which put the way into your mentors ways (18h)
- Mentor could send request, user can send invite to mentor (do nothing), only user could accept 
- [] UserPage: add ability to remove way from mentoring ways (9h)
- [] UserPage: add ability to remove way from favorite ways (9h)
- [] Add property isReadOnly to checkbox component
- [] To each table:
  - [] add sum time for all table
  - [] full amount of days in way
  - [] amount of records
  - [] amount of work days
  - [] amount of days off
  - [] average time in working day
  - [] average time in real day
  - [] average time for job
  - [] medial time for job
- [] Add tags for way
- [] Delete LearnedForToday from Way model
- [] Combine Date and isDayOff cells
- [] Add status for Way (Done, notDone, inProgress)
- [] Add metrics for Goal on WayPage (checkbox + text)
- [] Optimization: load only last 5-10 DayReports (lazy loading)
- [] AllWaysPage: add pagination
- [] AllWaysPage: add checkbox in isCompleted cells
- [] AllWaysPage: add property lastDayReportAdded for Way (must auto update when click on button add dayReport)
- [] AllWaysPage: cell goal should contain short description (max 2 line) but by clicking modal window should be opened with full description and metrics(think about statistic info that could be shown)
- [] Add property dateOfCreatedWay (whe Way was created)
- [] Add tupe of user (optional) : 1) newbie - directive 2) frustrated novice 3) insecure professional 4) independent professional
- [] Add a page with a tree of paths (chain of goals) for visualization