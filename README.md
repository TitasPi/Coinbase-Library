# Coinbase-Library

## Installation
```bash
$ npm install Coinbase-Library
```

## Usage

Initialize CoinbaseAPI
```js
const CoinbaseLibrary = require('coinbase-library');
const Coinbase = new CoinbaseLibrary('ApiKeyHere', 'ApiSecretHere');
```

Get exchange rate
```js
await Coinbase.getRate('ETH', 'EUR');
await Coinbase.getRate('BTC', 'USD');
```

Get wallet balance (currently only supports 'eur' and 'eth' as second argument)
```js
// Returns wallet's crypto and normal currency as object -> { eth: '0.01234567', eur: '12.34' }
const balance = await Coinbase.getBalance('walletid', 'both');
// Returns wallet's normal currency -> 12.34
const balance = await Coinbase.getBalance('walletid', 'eur');
// Returns wallet's crypto currency -> 0.01234567
const balance = await Coinbase.getBalance('walletid', 'eth');
```

## Example

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