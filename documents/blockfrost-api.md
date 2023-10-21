# Blockfrost

1. Assets

-   https://demarket-backend.vercel.app/api/v1/blockfrost/assets/information
    { policyId, assetName }
-   https://demarket-backend.vercel.app/api/v1/blockfrost/assets/mint
    { policyId }
-   https://demarket-backend.vercel.app/api/v1/blockfrost/assets/address
    { stakeAddress }

2. Transaction

-   https://demarket-backend.vercel.app/api/v1/blockfrost/transaction/utxos
    { transactionHash }
-   https://demarket-backend.vercel.app/api/v1/blockfrost/transaction/detail
    { transactionHash }
-   https://demarket-backend.vercel.app/api/v1/blockfrost/transaction/account
    { address }
-   https://demarket-backend.vercel.app/api/v1/blockfrost/transaction/asset
    { policyId, assetName }
