# Installation Instructions

![snapedit_1695973681512](https://github.com/sonson0910/Demarket-Contract/assets/91943651/cd600320-99eb-49c0-96d2-0b20e6d5cf67)

## 1. First, please clone this source code

In this project, nodejs and expressjs is used as the main backend framework to perform construction and development. Backend is the backend so that the interface is completed simultaneously with the frontend of the dermaket. In this guide there will be some requirements to show you how to develop products using git to clone the project.

```sh
git clone https://github.com/independenceee/demarket-backend.git
```

then Use commands to go to the directory of the current demarket backend

```sh
cd demarket-backend
```

This tutorial requires you to have `nodejs`. If you don't have it yet, install `nodejs`. Along with nodejs, npm and npx need to check the existence of these two packages before going to the next part.

```sh
https://nodejs.org/en
```

Then install the project using `npm install` to get the necessary resources for the project

```sh
npm install
```

after the installation is done successfully use `npm run dev` to run the project

```sh
$ npm run dev
> demarket-backend@1.0.0 dev
> ts-node src/index.ts
http://localhost:5000
```

The project is running on `PORT 5000` and now you will carry out development of our project
After the project is built successfully, execute `npm run build` to build and check the output

### 2.Get all the resources and create the necessary environment to run the project

In the project you must create an .env file to run project dependencies

```env
DATABASE_URL="postgresql..."
PORT = 5000
BLOCKFROST_PROJECT_ID_SECRET_PREPROD = preprod...
BLOCKFROST_PROJECT_ID_SECRET_PREVIEW = preview...
BLOCKFROST_PROJECT_ID_SECRET_MAINNET = mainnet...
KOIOS_RPC_URL_PREPROD = https...
KOIOS_RPC_URL_PREVIEW = https...
KOIOS_RPC_URL_MAINNET = https...
```

To get these resources you need to `https://blockfrost.io` and `https://www.koios.rest` to do a few operations to get all the dependencies for the project. For the database, I will use the postgresql database and on the local machine on your computer.

### 3.Features: Our Backend allows users to securely execute the following functions

-   You can retrieve the properties of the blockfrost or koios APIs to query the properties to retrieve the necessary information.
-   The backend has features that make the frontend more flexible and easy to develop

### 4. Here, we use some Block Frost and Koios APIs to query the resources needed for the project.

The API is used by us so that the assets can have enough information

-   Get details utxo block
-   Get details transaction block
-   Get transaction from account address
-   Get transaction from assets
-   Get amount asset from stake adress
-   Get infomation assets from policyId and assetName
-   Get asset minted from policyId
-   Get stake key from address
-   Get the current address holding the asset
-   Get asset information from policyId and assetName
-   Get the existing attribute in PolicyId
-   Get the total transaction stake wallet unstake address from asset
-   Get the existing attribute in PolicyId
-   Retrieve the currently active stakeKey
-   Get all assets from address

Example

```ts
 /**
     * @method POST => DONE
     * @description Get details utxo block
     * @param request  body: { transactionHash : required}
     * @param response json: { description transaction}
     */
    async getUTXOsTransaction(request: Request, response: Response) {
        try {
            const { transactionHash } = request.body;

            if (!transactionHash) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Transaction hash has been required."));
            }
            const data = await apiBlockfrost.txsUtxos(transactionHash);
            return response.status(StatusCodes.OK).json(data);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get details transaction block
     * @param request body: { transactionHash : required}
     * @param response json: { description transaction}
     */
    async getDetailsTransactions(request: Request, response: Response) {
        try {
            const { transactionHash } = request.body;
            if (!transactionHash) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Transaction hash has been required."));
            }

            const data = await apiBlockfrost.txs(transactionHash);
            return response.status(StatusCodes.OK).json(data);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get transaction from account address
     * @param request body: {address: require}, , query: { page, pageSize }
     * @param response json: array[{ tx_hash }]
     */
    async getTransactionAccount(request: Request, response: Response) {
        try {
            const { address } = request.body;
            const { page, pageSize, type } = request.query;
            if (!address) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address has been required."));
            const data = await apiBlockfrost.addressesTransactions(address);
            console.log(data.length);
            if (type) return response.status(StatusCodes.OK).json(data);
            const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });
            return response.status(StatusCodes.OK).json(data);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }


    ....



    /**
     * @method POST => DONE
     * @description Get transaction from assets
     * @param request body: { policyId: required, assetName: required }, query: { page, pageSize }
     * @param response json: { firstTransaction, currentTransaction, array [allTracsaction]}
     * @returns
     */
    async getTransactionAsset(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;
            const { page, pageSize, type } = request.query;

            if (!policyId && !assetName) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("PolicyId and assetName has been required."));
            }

            const data = await apiBlockfrost.assetsTransactions(policyId + assetName);
            if (type) return response.status(StatusCodes.OK).json(data);
            const allTransaction = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });

            return response.status(StatusCodes.OK).json({
                firstTransaction: data[0],
                currentTransaction: data[data.length - 1],
                allTransaction: allTransaction,
            });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }

    ....
```

Currently, we are using APIs to retrieve returned products, you can see the details in the test case below.
https://docs.google.com/spreadsheets/d/1qVDBkyYdoU2QfA4NziCV9K_jsIhUxiQ4/edit?rtpof=true&sd=true#gid=1957770526

### 5. License

The Demarket backend is released under the MIT. See the LICENSE file for more details.

### 6. Contact

For any questions or feedback, please contact the project maintainer at `nguyenkhanh17112003@gmail.com`.
