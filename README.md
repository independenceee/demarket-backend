# Installation Instructions

An open-source project to allow users to connect to the Demarket API. Here, we will guide you by using Docker:

* Make sure you have installed docker, nodejs, and others.

Installation Instructions Youtube Video: [youtube](https://www.youtube.com/watch?v=7GzWfim-iGk&ab_channel=BLOCKALPHAINNOVA)

To help users easily to connect to the our Demarket API, you can follow the video above or step by step with these instructions below:

### 1. Clone demarket-database source code

```ssh
git clone https://github.com/independenceee/demarket-database/
```

### 2. Build images before starting containers

```ssh
docker compose up --build
```

###  3. Clone demarket backend source code

In this project, NodeJS and ExpressJS is used as the main backend framework to perform construction and development. 

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

The command `npx prisma db push` is only used when you want to create a new database or want to reset the database, otherwise there is no need to run it.

Then install the project using `npm install` to get the necessary resources for the project

```sh
npm install
```

### 4. Set up .env file 

In the project you must create an .env file for getting all the resources and create the necessary environment to run project dependencies.

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

To get these resources you need to `https://blockfrost.io` and `https://www.koios.rest` to do a few operations to get all the dependencies for the project. For the database, I will use the portgreSQL database and on the local machine on your computer.

### 5. Run
After the installation is done successfully use npm run dev to run the project

```sh
$ npm run dev
> demarket-backend@1.0.0 dev
> ts-node src/index.ts
http://localhost:5000
```

The project is running on `PORT 5000` and now you will carry out development of our project
After the project is built successfully, execute `npm run build` to build and check the output


## Features:
Our Backend allows users to securely execute the following functions

-   You can retrieve the properties of the blockfrost or koios APIs to query the properties to retrieve the necessary information.
-   The backend has features that make the frontend more flexible and easy to develop

**Use Blockfrost and Koios APIs to query the resources needed for the project.**

The API is used by us so that the assets can have enough information:

- Get details UTXO block
- Get details transaction block
- Get transaction from account address
- Get transaction from assets
- Get amount asset from stake adress
- Get infomation assets from policyId and assetName
- Get asset minted from policyId
- Get stake key from address
- Get the current address holding the asset
- Get asset information from policyId and assetName
- Get the existing attribute in PolicyId
- Get the total transaction stake wallet unstake address from asset
- Get the existing attribute in PolicyId
- Retrieve the currently active stakeKey
- Get all assets from address

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

## Warning

The command `npx prisma db push` is only used when you want to create a new database or want to reset the database, otherwise there is no need to run it because the database is already available, clone [demarket-database](https://github.com/independenceee/demarket-database.git) and run the command `docker compose up --build` to initialize the environment.

## License

The Demarket backend is released under the MIT. See the LICENSE file for more details.

## Contact

For any questions or feedback, please contact the project maintainer at `nguyenkhanh17112003@gmail.com`.
