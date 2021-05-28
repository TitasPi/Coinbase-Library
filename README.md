# Coinbase-Library

## Installation
```bash
$ npm install Coinbase-Library
```

## Usage

```js
const CoinbaseLibrary = require('coinbase-library');
const Coinbase = new CoinbaseLibrary('apikey', 'apisecret');

async function main() {
  try {
    const balance = await Coinbase.getBalance('walletid', 'both');
    const rate = await Coinbase.getRate('ETH', 'EUR');
    console.log(balance);
    console.log(rate);
  }
  catch (error) {
    console.log(error);
  }
}

main();
```