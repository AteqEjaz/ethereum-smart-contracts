module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkbey: {
      host: "localhost",
      port: 8545,
      network_id: 4 // rinkbey network id
    }
  }
};
