import { GlonassWebPage } from './app.po';

describe('glonass-web App', function() {
  let page: GlonassWebPage;

  beforeEach(() => {
    page = new GlonassWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
