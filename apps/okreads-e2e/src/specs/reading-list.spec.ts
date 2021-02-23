import { $, $$, browser, ExpectedConditions } from 'protractor';

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

  it('Then: I should be able to mark a book as finished.', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('react');
    await form.submit();

    const bookBtn = await $$('[data-testing="book-btn"]').get(0);
    await bookBtn.click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    
    const markAsReadBtn = await $$('[data-testing="mark-as-read"]').get(0);
    await markAsReadBtn.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(bookBtn, 'Finished')
    );

    const removeFromListBtn = await $$('[data-testing="remove-from-list"]').get(0);
    await removeFromListBtn.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(bookBtn, 'Want to Read')
    );
  });
});
