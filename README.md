# course-dapp
Course registration decentralized application created for the Build Your Own Dapp workshop

I created this project using the [react truffle box](https://github.com/truffle-box/react-box).

## Initialization

Make sure you have [yarn](https://yarnpkg.com) installed, and the [metamask](metamask.io) extension.

Clone this repository to your computer:
```
git clone https://github.com/bsaepfl/course-dapp
cd course-dapp
```

Install dependencies:
```
yarn
cd client
yarn
```

## Running the project

In one terminal, in the root directory, run:
```
yarn develop
# and inside the truffle console:
compile
migrate
```

In another terminal, in the `client` directory, run:
```
yarn start
```

In your browser, in metamask, make sure you click **import using account seed phrase**. Then, copy and paste the *mnemonic* from your first terminal into the box.

Also in metamask, use the custom RPC endpoint **http://localhost:9545**.
