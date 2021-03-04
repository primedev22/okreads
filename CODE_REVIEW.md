1. Code Review

- Code smells

  - Use of innerHTML can cause a potential security risk
  - Use button tag instead of anchor tag when handling click event only
  - The subscription started in ngOnInit of BookSearchCompoent is never unsubscribed - possible memory leak

- App improvement ideas
  - The UI is not mobile-responsive.
  - Poor accessibility
  - +state folder in books-data-access lib is already getting large. Would be better to split it into books and reading-list subfolders to make it easier to manage
  - By extracting API data conversion to internal data model it could be more open to expansion
  - Error handling when server doesn't work and Validating data coming from API would also be useful

2. Accessibility

- Buttons do not have an accessible name
- Background and foreground colors do not have a sufficient contrast ratio.
- Alt Text for Images are missing
- Keyboard Input Accessibility(TabIndex is missing) is missing
