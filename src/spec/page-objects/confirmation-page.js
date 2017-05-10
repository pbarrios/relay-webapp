class ConfirmationPage {
  constructor() {
    this._waitTimeout = 5000;
    this._url = '/#/signup/confirmation?activation=lzqqdc7dqn0qw7qxobdtji1oy0jxrf';
	  this._industrySelect =  element(by.id('confirmation-select-industry'));
	  this._countrySelect =  element(by.id('confirmation-select-country'));
  }

  get(params) {
    return browser.get(params ? this._url + '&' + params : this._url);
  }

  getFirstIndustryName() {
 	  return this.getFirstSelectOptionText(this._industrySelect);
  }

  getFirstCountryName() {
    return this.getFirstSelectOptionText(this._countrySelect);
  }

  getFirstSelectOptionText(parentElem)
  {
    parentElem.click();

    var firstOption = parentElem.all(by.css('span.select-option')).first();

    browser.wait(function() {
      return firstOption.getText() != ''
    }, this._waitTimeout);

    return firstOption.getText();
  }
}

exports.ConfirmationPage = ConfirmationPage;
