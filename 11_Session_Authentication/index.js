import express from 'express'

const app = express();
const PORT = process.env.PORT ?? 800;
app.get('/', (req, res) => {
    return res.json({status: `Server is running up `})
})

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));