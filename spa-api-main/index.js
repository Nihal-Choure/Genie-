const express = require('express')
const app = express()
const port = 3000

let data = require('./data.js')
app.use(express.json())

const addListing = (newItem) => {
    data = [...data, newItem]
}

const findListing = (id) => {
    return data.find(item => item.id === Number(id))
}

// GET /listings - return the full list of listings
// POST /listings - create a new listing

// GET /listings/id - return the specific listing matching the id
// PUT /listings/id - update the specific listing matching the id
// DELETE /listings/id - delete the listing matching the id from the list

app.get("/listings", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000")
    res.send(data)
})

app.post("/listings", (req, res) => {
    addListing(req.body)
    res.status(201).send(data)
})

app.get("/listings/:id", (req, res) => {
    const id = req.params.id
    const listing = findListing(id)

    if (listing) {
        return res.send(listing);
    }

    res.status(404).send("No listing found with that id")
})

app.put("/listings/:id", (req, res) => {
    const id = req.params.id
    const listing = findListing(id)

    if (listing) {
        const body = req.body;

        Object.keys(body).forEach(key => {
            listing[key] = body[key]
        })

        return res.send(listing);
    }
    res.status(404).send("No listing found with that id")
})

app.delete("/listings/:id", (req, res) => {
    const id = req.params.id
    const listing = findListing(id)

    if (listing) {
        const index = data.findIndex(item => item.id === Number(id))

        const item = data[index]
        const before = data.slice(0, index)
        const after = data.slice(index + 1)
        const newData = [...before, ...after]
        data = newData

        return res.send(item)
    }
    res.status(404).send("No listing found with that id")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})