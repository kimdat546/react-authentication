const prefix = "/api/v1";

const auth = {
    path: `${prefix}/auth`,
    route: require("./authRoute"),
}

module.exports = [
    auth,
];
