# Core features

## UserPage (default for logged in)

- [x] show user name (3h)
- [x] render own ways table
  - [x] fix button create new way (new should be visible) (9h)
  - [ ] add ability to delete way (12h)
- [x] render mentoring ways table
- [x] render favorite ways table
- [x] change format in cells lists (use ol li instead of css styles, put button "add item" to bottom of cell)

## WayPage

- [x] fix button create new day report (new should be visible without page reloading) (12h)
- [x] show mentors (link to user page) in the mentor comments (12h)
- [x] render goal (description), add ability to edit own way (goal) (12h) (9h)
- [x] render way name, add ability to edit own way (way name) (12h)
- [x] add button "favorite" which put the way into your favorite ways (add field favorite to WayDTO) (24h)

## AllWaysPage (default for not logged in)

- [x] render all ways table
- [x] add links to mentors (9h)

## AllUsersPage

- [x] all users table columns: name, email, number of own ways, number of mentoring ways, number of favorite (36h) 

## UserProfilePage

- [x] description + ability to change it (12h)
- [x] add name + ability to change it (12h)
- [x] add email + ability to change it (12h)


## AboutProjectPage

- [x] project description (12h)
- [x] FAQ accordion
- [x] how to contribute (6h)
- [x] donates

## Additional feature

- [ ] multi language interface 
- [ ] sent feedback (add lambda to netlify)
- [ ] UserProfilePage: attach resource (pdf for cv for example)
- [ ] AllWaysPage: search/filter panel
- [ ] AllUsersPage: search/filter panel
- [ ] UserPage: add visual notifications which favorite and mentoring ways changed
- [ ] attach files, images, videos to records
- [ ] realtime chat with mentor
- [ ] public/private ways
- [ ] public/private users
- [x] add link to records (md format)
- [x] bold/italic format for record (md format)
- [ ] share result (with LinkedIn - way completed)
- [ ] Make AnalyticalReport (statistic)
- [ ] Analytics page
- [ ] Achievements
- [x] WayPage: Add possibility to attach links on docs, video, audio, etc (md format)
- [ ] Possibility to add tags for each JobDone
- [ ] Investigation with coming soon tooltip (component)
- [ ] AllWaysPage: show number favorite (12h)
- [x] WayPage: show number favorite (increased when somebody add the way to favorite and decreased when somebody remove the way from favorite) (9h)
- [x] WayPage: add button "become a mentor" which put the way into your mentors ways (18h)
- [x] Mentor could send request, user can send invite to mentor (do nothing), only user could accept 
- [x] UserPage: add ability to remove way from mentoring ways (9h)
- [x] WayPage: add ability to remove way from favorite ways (9h)
- [x] Add property isReadOnly to checkbox component
- [x] To each table:
  - [x] add sum time for each way
  - [x] full amount of days in way
  - [x] amount of records
  - [x] amount of work days
  - [x] amount of days off
  - [x] average time in working day
  - [x] average time in real day
  - [x] average time for job
- [ ] Add tags for way
- [x] Delete LearnedForToday from Way model
- [x] Combine Date and isDayOff cells 
- [ ] AllWaysPage: Add status for Way (finished, inProgress, abandoned) (colored)
- [x] Add metrics for Goal on WayPage (checkbox + text)
- [ ] Optimization: load only last 30 DayReports (lazy loading) (think about it)
- [ ] AllWaysPage: add pagination (think about it)
- [ ] AllWaysPage: request optimization, save users into hashmap and load each user once
- [ ] AllWaysPage: add property lastDayReportAdded for Way (must auto update when click on button add dayReport)
- [ ] AllWaysPage: cell goal should contain short description (max 2 line) but by clicking modal window should be opened with full description and metrics(think about statistic info that could be shown)
- [x] Add property createdAt to WayDTO model (when Way was created)
- [ ] Add type of user (optional) : 
  * newbie - directive
  * frustrated novice
  * insecure professional
  * independent professional
- [ ] Add a page with a tree of paths (chain of goals) for visualization
- [ ] Add MonthReportDTO and WeekReportDTO models (MonthReportDTO: uuid: string, date: string, jobDoneUuids: string[] @JobDone.uuid[], planForNextPeriodUuids: string[] @PlanForNextPeriod.uuid[], problemForCurrentPeriodUuids: string[] @CurrentProblem.uuid[], commentUuids: string[] @MentorComment.uuid[])
- [ ] Add description which jobs should be (CUS - complete, unique, specific)
- [ ] Add description which goals should be (SMART)
- [ ] Add types of Way:
  * repeatable jobDone - sport;
  * with no repeatable jobDone - programming, science, art, engineering, language, onboarding;
  * mixed type - music
- [ ] add settings page (language, modal with hints)
- [ ] put jobDone, problems etc into report to reduce firebase reads
- [ ] add to settings checkboxes for all available way statistic and allow user to adjust what to show
- [ ] hide of button create new day report if report for today already created
- [ ] AI analyze reports in a way
