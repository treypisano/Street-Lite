module.exports = {
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production',
    secretOrKey: process.env.SECRET_OR_KEY,
    // googleAPIKey: process.env.REACT_APP_GOOGLE_API_KEY,
    googleAPIKey: process.env.GOOGLE_API_KEY === "SDFSDF"
}
