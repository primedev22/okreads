import { $, $$, browser, ExpectedConditions, by } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  it('Then: I should be able to undo add to reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    let items = await $$('[data-testing="reading-list-item"]');
    const itemLengthBeforeAdd = items.length;

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('snack');
    await form.submit();
    await $('[data-testing="add-btn"]').click();

    items = await browser.driver.findElements(by.css('[data-testing="reading-list-item"]'));
    const itemLengthAfterAdd = items.length;
    expect(itemLengthAfterAdd).toEqual(itemLengthBeforeAdd+1);

    const snackBar = await browser.driver.findElement(by.tagName('simple-snack-bar'));
    const undoBtn = snackBar.findElement(by.css('.mat-focus-indicator.mat-button.mat-button-base'));
    await undoBtn.click();

    items = await browser.driver.findElements(by.css('[data-testing="reading-list-item"]'));
    expect(items.length).toEqual(itemLengthBeforeAdd);
  });
});
