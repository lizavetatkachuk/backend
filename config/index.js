require("dotenv").config();

const CONFIG = {};

CONFIG.app = process.env.APP || "dev";
CONFIG.jwt_encryption = "Golden Age Of Leather";
(CONFIG.port = process.env.PORT || 4000),
  (CONFIG.db_host = process.env.DB_HOST || "localhost");
CONFIG.db_port = process.env.DB_PORT || "27017";
CONFIG.db_name = process.env.DB_NAME || "FlightApp";

module.exports = CONFIG;
