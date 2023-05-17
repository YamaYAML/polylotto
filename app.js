// app.js
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        await ethereum.enable();
        updateUI();
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        updateUI();
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

async function updateUI() {
    const accounts = await web3.eth.getAccounts();
    const manager = await contract.methods.manager().call();
    const playersCount = await contract.methods.getPlayers().call().length;
    const totalPot = await web3.utils.fromWei(await web3.eth.getBalance(contractAddress));

    document.getElementById("manager").innerText = manager;
    document.getElementById("playersCount").innerText = playersCount;
    document.getElementById("totalPot").innerText = totalPot;
}

document.getElementById("enter").addEventListener("click", enterLottery);
document.getElementById("pickWinner").addEventListener("click", pickWinner);

async function enterLottery() {
    const accounts = await web3.eth.getAccounts();

    await contract.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.01', 'ether')
    });

    updateUI();
}

async function pickWinner() {
    const accounts = await web3.eth.getAccounts();

    await contract.methods.pickWinner().send({
        from: accounts[0]
    });

    updateUI();
}
