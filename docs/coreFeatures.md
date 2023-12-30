# Core features (round 1)

## UserPage (default for logged in)
- [x] description + ability to change it (12h)
- [x] add name + ability to change it (12h)
- [x] add email + ability to change it (12h)
- [x] show user name (3h)
- [x] render own ways table
  - [x] fix button create new way (new should be visible) (9h)
  - [x] add ability to delete way (12h)
- [x] render mentoring ways table
- [x] render favorite ways table
- [x] change format in cells lists (use ol li instead of css styles, put button "add item" to bottom of cell)
- [x] UserPage: add ability to remove way from mentoring ways (9h)

## WayPage
- [x] fix button create new day report (new should be visible without page reloading) (12h)
- [x] show mentors (link to user page) in the mentor comments (12h)
- [x] render goal (description), add ability to edit own way (goal) (12h) (9h)
- [x] render way name, add ability to edit own way (way name) (12h)
- [x] add button "favorite" which put the way into your favorite ways (add field favorite to WayDTO) (24h)
- [x] WayPage: Add possibility to attach links on docs, video, audio, etc (md format)
- [x] WayPage: show number favorite (increased when somebody add the way to favorite and decreased when somebody remove the way from favorite) (9h)
- [x] WayPage: add button "become a mentor" which put the way into your mentors ways (18h)
- [x] WayPage: Mentor could send request, user can send invite to mentor (do nothing), only user could accept 
- [x] WayPage: add ability to remove way from favorite ways (9h)
- [x] WayPage: add statistics to each table:
  - [x] add sum time for each way
  - [x] full amount of days in way
  - [x] amount of records
  - [x] amount of work days
  - [x] amount of days off
  - [x] average time in working day
  - [x] average time in real day
  - [x] average time for job
- [x] Add metrics for Goal on WayPage (checkbox + text)
- [x] WayPage: hide button "create new day report" if report for today already created

## AllWaysPage (default for not logged in)
- [x] render all ways table
- [x] add links to mentors (9h)
- [x] Add property createdAt to WayDTO model (when Way was created). Show it the tables 

## AllUsersPage
- [x] all users table columns: name, email, number of own ways, number of mentoring ways, number of favorite (36h) 

## AboutProjectPage
- [x] project description (12h)
- [x] FAQ accordion
- [x] how to contribute (6h)
- [x] donates

## Additional feature
- [x] add link to all records (md format)
- [x] bold/italic format for all record (md format)
- [x] Add property isReadOnly to checkbox component

---

# Core features (round 2)

## UserPage (default for logged in)
- [ ] add visual notifications when favorite or mentoring ways changed (or just show last update)
- [ ] add push notifications when favorite or mentoring ways changed
- [ ] add ability to archive the way (add filter hide archived)
- [ ] create/delete composite way - readonly

## WayPage
- [ ] WayPage: realtime chat with mentor
- [ ] WayPage: AI analyze reports in a way
- [ ] Add type of user (way specific data) (describe the sense optional) :
  * newbie - directive
  * frustrated novice
  * insecure professional
  * independent professional
- [ ] Add MonthReportDTO and WeekReportDTO models (example for MonthReportDTO): 
    * uuid: string,
    * date: string,
    * jobDoneUuids: string[] @JobDone.uuid[],
    * planForNextPeriodUuids: string[] @PlanForNextPeriod.uuid[],
    * problemForCurrentPeriodUuids: string[] @CurrentProblem.uuid[],
    * commentUuids: string[] @MentorComment.uuid[]
- [ ] Add description which jobs should be (CUS - complete, unique, specific)
- [ ] Add description which goals should be (SMART)
- [ ] Add types of Way:
  * repeatable jobDone - sport;
  * with no repeatable jobDone - programming, science, art, engineering, language, onboarding;
  * mixed type - music
- [ ] show progress (and compare percentage of completed tasks, worked time, time period)
- [ ] Add tags for way
- [ ] complete plan feature icon (copy to jobDone for today)
- [ ] Possibility to add tags for each JobDone, plan
- [ ] export way data to csv
- [ ] export way to pdf
- [ ] add to way statistics settings checkboxes for all available way statistic and allow user to adjust what to show
- [ ] Optimization: load only last 30 DayReports (lazy loading) 
- [ ] share result (with LinkedIn - way completed)

## AllWaysPage (default for not logged in)
- [ ] AllWaysPage: search/filter panel
- [ ] AllWaysPage: show number favorite (12h)
- [ ] AllWaysPage: Add status for Way (finished, inProgress, abandoned) (colored)
- [ ] AllWaysPage: add pagination (think about it)
- [ ] AllWaysPage: request optimization, save users into hashmap and load each user once
- [ ] AllWaysPage: add property lastDayReportAdded for Way (must auto update when click on button add dayReport)
- [ ] AllWaysPage: cell goal should contain short description (max 2 line) but by clicking modal window should be opened with full description and metrics(think about statistic info that could be shown)

## AllUsersPage
- [ ] AllUsersPage: search/filter panel

## AboutProjectPage

## Additional feature
- [x] put jobDone, problems etc into report to reduce firebase reads
- [ ] multi language interface 
- [ ] sent feedback (add lambda to netlify)
- [ ] attach files, images, videos to records
- [ ] public/private ways
- [ ] public/private users
- [ ] Make AnalyticalReport (statistic)
- [ ] Analytics page
- [ ] Achievements
- [ ] Investigation with coming soon tooltip (component)
- [ ] Add a page with a tree of ways (chain of goals) for visualization
- [ ] add settings page (language, modal with hints)
