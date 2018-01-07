// General Libs
let Math = artifacts.require("./math/Math.sol");
let SafeMath = artifacts.require("./math/SafeMath.sol");

// Ownership
let Ownable = artifacts.require("./ownership/Ownable.sol");

let EnduringPublication = artifacts.require("./EnduringPublication.sol");

module.exports = function(deployer, network, accounts) {
  // Contracts with no deps
  deployer.deploy(Math);
  deployer.deploy(SafeMath);

  // Link ownable
  deployer.deploy(Ownable);
  deployer.link(Ownable, [EnduringPublication]);

  // Link safemath contracts
  deployer.link(SafeMath, [EnduringPublication]);
  deployer.deploy(EnduringPublication);

  // deployer.deploy(EnduringPublication, 100000000000000000000, "0x3C4a4F32615c04Aa178926137745F5b005F37eaA");
};
