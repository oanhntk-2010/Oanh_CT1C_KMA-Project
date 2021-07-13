describe('Check tracklist', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('trackTab')).tap();
  });

  beforeEach(async () => {
    // await device.reloadReactNative();
    // await element(by.id('trackTab')).tap();
  });

  // TC01
  it('should show track screen after tap', async () => {
    await expect(element(by.id('trackScreen'))).toBeVisible();
  });

  // TC04, TC05: check display when tap in any song
  it('should play track', async () => {
    const songElement = element(by.label('Nàng Thơ'));

    await expect(songElement).toBeVisible();
    await songElement.tap();

    await expect(element(by.id('playerFooter'))).toBeVisible();
    await expect(element(by.text('Nàng Thơ').withAncestor(by.id('playerFooter')))).toBeVisible()
    await expect(element(by.text('Hoàng Dũng').withAncestor(by.id('playerFooter')))).toBeVisible()

    // Mutil tap
    await device.reloadReactNative();
    await element(by.id('trackTab')).tap();
    await expect(songElement).toBeVisible();
    await songElement.multiTap(2);
    
    await expect(element(by.id('playerFooter'))).toBeVisible();
    await expect(element(by.text('Nàng Thơ').withAncestor(by.id('playerFooter')))).toBeVisible()
    await expect(element(by.text('Hoàng Dũng').withAncestor(by.id('playerFooter')))).toBeVisible()

  });

  // T06, TC07, TC13, TC14
  it('should able to show track options', async () => {
    const songElement = element(by.label('Track Option').withAncestor(by.label('Nàng Thơ')));
    await expect(songElement).toBeVisible();
    await songElement.tap();

    await expect(element(by.text('Add to Playlist').withAncestor(by.id('optionsModal')))).toBeVisible()
    await expect(element(by.text('Share').withAncestor(by.id('optionsModal')))).toBeVisible()
    await expect(element(by.text('Rename').withAncestor(by.id('optionsModal')))).toBeVisible()
    await expect(element(by.text('Delete').withAncestor(by.id('optionsModal')))).toBeVisible()
    await device.pressBack();

    // Mutil tap
    await songElement.multiTap(2);
    await expect(element(by.text('Add to Playlist').withAncestor(by.id('optionsModal')))).toBeVisible()
    await expect(element(by.text('Share').withAncestor(by.id('optionsModal')))).toBeVisible()
    await expect(element(by.text('Rename').withAncestor(by.id('optionsModal')))).toBeVisible()
    await expect(element(by.text('Delete').withAncestor(by.id('optionsModal')))).toBeVisible()
    await device.pressBack();
  });

  // TC08, TC09, TC10, TC11
  it('should able to play and pause', async () => {
    await device.reloadReactNative();
    await element(by.id('trackTab')).tap();

    const songElement = element(by.label('Nàng Thơ'));
    await expect(songElement).toBeVisible();
    await songElement.tap();

    await expect(element(by.id('playerFooter'))).toBeVisible();
    await expect(element(by.id('playIcon').withAncestor(by.id('playerFooter')))).toBeVisible()

    await element(by.id('playIcon').withAncestor(by.id('playerFooter'))).tap();
    await expect(element(by.id('pauseIcon').withAncestor(by.id('playerFooter')))).toBeVisible();

    // Mutil tap
    await element(by.id('pauseIcon').withAncestor(by.id('playerFooter'))).multiTap(3);
    await expect(element(by.id('playIcon').withAncestor(by.id('playerFooter')))).toBeVisible();
  });

  // TC12
  it('should show full player', async () => {
    const songElement = element(by.label('Nàng Thơ'));

    await expect(songElement).toBeVisible();
    await songElement.tap();

    await expect(element(by.id('playerFooter'))).toBeVisible();
    await expect(element(by.text('Nàng Thơ').withAncestor(by.id('playerFooter')))).toBeVisible()
    await element(by.text('Nàng Thơ').withAncestor(by.id('playerFooter'))).tap();
    await expect(element(by.id('playerScreen'))).toBeVisible();
    await device.pressBack();
  });

  // TC15, TC16, TC17
  it('should able to add track to playlist', async () => {
    const songElement = element(by.label('Track Option').withAncestor(by.label('Nàng Thơ')));
    await expect(songElement).toBeVisible();
    await songElement.tap();

    await expect(element(by.text('Add to Playlist').withAncestor(by.id('optionsModal')))).toBeVisible()
    await element(by.text('Add to Playlist').withAncestor(by.id('optionsModal'))).tap();
    await expect(element(by.id('addToPlaylistScreen'))).toBeVisible();
    await expect(element(by.text('Favourites'))).toBeVisible();
    await element(by.text('Favourites')).tap();
    await expect(element(by.id('trackScreen'))).toBeVisible();

    // Add exist track
    await songElement.tap();
    await expect(element(by.text('Add to Playlist').withAncestor(by.id('optionsModal')))).toBeVisible()
    await element(by.text('Add to Playlist').withAncestor(by.id('optionsModal'))).tap();
    await expect(element(by.text('Favourites'))).toBeVisible();
    await element(by.text('Favourites')).tap();
    await expect(element(by.id('addToPlaylistScreen'))).toBeVisible();
  });
});
