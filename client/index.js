const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1666";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  let name = niceList[Math.floor(Math.random() * niceList.length)];
  //let name = "should fail";

  console.log(name);

  const tree = new MerkleTree(niceList);
  const index = niceList.findIndex((n) => n === name);
  const proof = tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof,
  });

  console.log({ gift });
}

main();
