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
  xit('Then: I should be able to undo add to reading list', async () => {
    // Issue: MatSnackBar makes it hard to implement e2e test
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    let items = await $$('[data-testing="reading-list-item"]');
    const itemLengthBeforeAdd = items.length;
    expect(itemLengthBeforeAdd).toBe(1);

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    await $('[data-testing="add-btn"]').click();
    
    items = await $$('[data-testing="reading-list-item"]');
    const itemLengthAfterAdd = items.length
    expect(itemLengthAfterAdd).toBe(itemLengthBeforeAdd+1);
  });
});
