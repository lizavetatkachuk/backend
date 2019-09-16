const mongoose = require("mongoose");
const CONFIG = require("../config/index");
const url = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = { mongoose };
