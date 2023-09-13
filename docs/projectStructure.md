# The folder structure
* component - a collection of UI components like button, link, input, etc., that can be used across various files in the project.
* converter - files that includes methods to convert data (for example convert firebase collections to business models).
* model - consists of a real time database collections and business models.
* pages - each file is corresponded with an existing route.
* router - all routes of the application.
* service - a layer for interacting with the database (in this layer we get, change or delete data from database).
* utils - some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like data formatting, event listeners etc.