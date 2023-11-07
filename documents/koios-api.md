# Koios

1. Assets

-   https://demarket-backend.vercel.app/api/v1/koios/assets/nft-address
    { policyId, assetName }

```json
{
    "address": "addr_test1wpsqeugnmmtk3cdf3fsly998458eavua8rhg4jdtgcva26sqnylmx"
}
```

-   https://demarket-backend.vercel.app/api/v1/koios/assets/information
    { policyId, assetName }
    
```json
[
    {
        "policy_id": "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
        "asset_name": "486f736b794b69636b333133",
        "asset_name_ascii": "HoskyKick313",
        "fingerprint": "asset1lzmpk9hsuhuna90srpjmda6cpvr6hpppyesrud",
        "minting_tx_hash": "24c0dbff490ceac4463c8113a4496118d6926b4514e948823a34452d6bec5947",
        "total_supply": "1",
        "mint_cnt": 1,
        "burn_cnt": 0,
        "creation_time": 1670716800,
        "minting_tx_metadata": {
            "721": {
                "version": "1.0",
                "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae": {
                    "HoskyKick313": {
                        "name": "HoskyKick313",
                        "files": [
                            {
                                "src": "ipfs://QmWNuJdv26xe9HguV94A5GLnctryXb8wxc1pvYvSWAhkJy",
                                "name": "HoskyKick313",
                                "mediaType": "image/jpeg"
                            }
                        ],
                        "image": "ipfs://QmWNuJdv26xe9HguV94A5GLnctryXb8wxc1pvYvSWAhkJy",
                        "mediaType": "image/jpeg",
                        "description": ""
                    }
                }
            }
        },
        "token_registry_metadata": null
    }
]
```
-   https://demarket-backend.vercel.app/api/v1/koios/assets/policy-assets-information
    { policyId }
-   https://demarket-backend.vercel.app/api/v1/koios/assets/assets-policy-information
    { policyId }
-   https://demarket-backend.vercel.app/api/v1/koios/assets/summary
    { policyId, assetName }
-   https://demarket-backend.vercel.app/api/v1/koios/assets/policy-list
    { policyId }
