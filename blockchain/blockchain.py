import os
import json
import dotenv
from web3 import Web3
from pydantic import BaseModel
from brownie.project import get_loaded_projects
from brownie.network.account import LocalAccount
from brownie import project, network, accounts, Contract
from fastapi import FastAPI
dotenv.load_dotenv()
app = FastAPI()

p = project.load('brown')
network.connect('polygon-amoy-testnet')

SimpleCollectible = p.SimpleCollectible
get_loaded_projects()[0].load_config()
print(get_loaded_projects()[0])


def get_account() -> LocalAccount:
    return accounts.add(os.environ.get('PRIVATE_KEY'))


account = get_account()
print(account)


def get_or_deploy_contract():
    # simple_collectible = SimpleCollectible.deploy({"from": account, "gas_price": Web3.to_wei("3", "gwei")})
    deploy_file = 'deployed_address.txt'
    if os.path.exists(deploy_file):
        with open(deploy_file, 'r') as f:
            contract_address = f.read().strip()
        print(f"Loading existing contract at {contract_address}")
        return Contract.from_abi("SimpleCollectible", contract_address, SimpleCollectible.abi)
    else:
        print("Deploying new contract")
        contract = SimpleCollectible.deploy({"from": account, "gas_price": Web3.to_wei("50", "gwei")})
        with open(deploy_file, 'w') as f:
            f.write(contract.address)
        return contract


simple_collectible = get_or_deploy_contract()
account = get_account()


class PostData(BaseModel):
    user_address: str
    nft_url: str


nft_url = "https://cardona-zkevm.polygonscan.com/nft/{}/{}"


@app.post('/mint_nft')
async def mint_nft(post_data: PostData):
    client_address = post_data.user_address
    nft_url = post_data.nft_url
    uri = {
        "name": f"Deep Fake Certification",
        "description": f"Deep Fake Certification",
        "image": nft_url,
        "attributes": [
            
        ]
    }
    json_uri = json.dumps(uri)
    tx = simple_collectible.createCollectible(json_uri, client_address,
                                              {"from": account, "gas_price": Web3.to_wei("50", "gwei")})

    tx.wait(1)
    token_id = simple_collectible.tokenCounter() - 1
    uri = simple_collectible.tokenURI(token_id)

    nft_url_formatted = nft_url.format(simple_collectible.address, token_id)

    return {
        "polygon_url": nft_url_formatted,
        'nft_url': nft_url,
        'token_id': token_id,
        'token_uri': f'https://testnets.opensea.io/assets/amoy/{simple_collectible.address}/{token_id}'
    }

import uvicorn 
uvicorn.run(app)