// Session Based Authentication Architecture
import express from 'express';

const app = express()
const PORT = 8000

app.use(express.json());

const DIARY = {};
const EMAILS = new Set();

// Hey, Here is my car -> please park it and give me back a token
// Email => Unique Car Number

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if(EMAILS.has(email)) {
        return res.status(400).json({error: 'Email already taken'});
    }

    // create a token for user
    const token = `${Date.now()}`;

    // Do a entry in diary 
    DIARY[token] = {name, email, password};
    EMAILS.add(email);

    return res.json({status: 'success', token});
});

// take back your car
app.post('/me', (req, res) => {
    const {token} = req.body;
    if(!token){
        return res.status(404).json({ Error: `Missing Token`});
    }

    if( !(token in DIARY)) {
        return res.status(404).json({ Error: `Invalid Token`});
    }

    const entry = DIARY[token];

    return res.json({data: entry});

});

// Private Data
app.post('/private-data', (req, res) => {
    const {token} = req.body;

    if(!token){
        return res.status(404).json({ Error: `Missing Token`});
    }

    if( !(token in DIARY) ) {
        return res.status(404).json({ Error: `Invalid Token`});
    }

    const entry = DIARY[token];
    return res.json({data: { privateData: 'Access granted'} });

});



app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
