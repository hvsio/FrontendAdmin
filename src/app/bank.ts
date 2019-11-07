export class Bank {
  name: string;
  country: string;
  pageurl: string;
  buyxpath: string;
  sellxpath: string;
  fromCurrency: string;
  toCurrencyXpath: string;
  unit: string;
  id: string;
  iscrossinverted: boolean;
  exchangeunitxpath: string;
    constructor(
    name: string,
    country: string,
    pageurl: string,
    buyxpath: string,
    sellxpath: string,
    fromCurrency: string,
    toCurrencyXpath: string,
    unit: string,
    iscrossinverted: boolean,
    exchangeunitxpath: string,
     ) {
        this.name = name;
        this.country = country;
        this.pageurl = pageurl;
        this.buyxpath = buyxpath;
        this.sellxpath = sellxpath;
        this.fromCurrency = fromCurrency;
        this.toCurrencyXpath = toCurrencyXpath;
        this.unit = unit;
        this.iscrossinverted = iscrossinverted;
        this.exchangeunitxpath = exchangeunitxpath;
    }

}
