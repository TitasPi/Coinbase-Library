const crypto = require('crypto');
const axios = require('axios');

class Coinbase {
  /**
   * Coinbase API constructor
   * @param {String} apiKey Coinbase api key
   * @param {String} apiSecret Coinbase api secret
   */
  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }
  /**
   * Returns wallet's balance
   * @param {String} walletID Wallet ID
   * @param {('both'|'eth'|'eur')} type Type to return [both, eth, eur]
   * @returns Coinbase wallet balance
   */
  async getBalance(walletID, type) {
    const path = '/v2/accounts';
    const timestamp = Math.floor(Date.now() / 1000);
    const message = timestamp + 'GET' + path + '';
    const signature = crypto.createHmac('sha256', this.apiSecret).update(message).digest('hex');

    const returnedData = await axios.get(`https://api.coinbase.com${path}`, {
      headers: {
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-KEY': this.apiKey,
        'CB-VERSION': '2015-07-22',
      },
    });

    const data = returnedData.data.data;

    let match = false;
    // console.log('🔎 searching for wallet');
    let rWallet;
    data.forEach(wallet => {
      if(wallet.id === walletID) {
        match = true;
        // console.log('💡 found it -> ' + wallet.balance.amount);
        rWallet = wallet;
      }
    });
    if(!match) {
      throw 'Wallet not found';
    }
    if(type === 'both') {
      return { eth: rWallet.balance.amount, eur: rWallet.native_balance.amount };
    }
    else if(type === 'eth') {
      return rWallet.balance.amount;
    }
    else if(type === 'eur') {
      return rWallet.native_balance.amount;
    }
    else {
      throw 'Used wrong type in function \'getBalance\'. Valid types: both, eth, eur';
    }

  }
  /**
   * Returns crypto's exchange rate
   * @param {('ETH'|'BTC')} crypto Crypto currency code
   * @param {('EUR'|'USD')} currency Currency code
   * @returns Coinbase exchange rate
   */
  async getRate(cryptoCurrency, currency) {
    const path = `/v2/exchange-rates?currency=${cryptoCurrency}`;

    const returnedData = await axios.get(`https://api.coinbase.com${path}`, {
    });

    return returnedData.data.data.rates[currency];

  }
}

module.exports = Coinbase;