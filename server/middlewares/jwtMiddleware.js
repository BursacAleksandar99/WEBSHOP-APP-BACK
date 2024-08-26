// import { verify } from "jsonwebtoken"; PROMENA nacina importovanja, ne radim sa import vec sa require!! Zbog toga sto 
// node.js koristi CommonJS sintaksu!
const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) {
        return res.status(403).json({error: "User not logged in!"});
    }
    try{
        const validateToken = verify(accessToken, "importantsecret");
        req.user = validateToken;
        return next();
    } catch (err){ 
        return res.status(401).json({ error: "Invalid token!"});
    }
}

module.exports = { validateToken };