# The folder structure
* component - reusable dummy UI components like button, link, input, etc. Components dont used any busines related models.
* converter - convert data (for example convert DTO models to business models). Why can't use encapsulation and put this converters near appropriate layer or model
* model - DTO and business models.
* pages - each directory is abstraction for web-page.
* router - route related data of the application.
* service - a layer for interacting with a network requests.
* utils - reusable framework-agnostic does not related to busines logic methods.
