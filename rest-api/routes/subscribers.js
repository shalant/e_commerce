const express = require('express')
const { update } = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting one
router.get('/:id', getSubscriber, (req, res) => {
    //:id means it can get req.params.id
    res.send(res.subscriber.name)
})

//creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel:
        req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
        //when using a post route, you always want to send a 201
    } catch (err) {
        res.status(400).json({ message: err.message })
        //whenever the user gives bad data, you send 400 error
    }
})

//updating one
router.patch('/', getSubscriber, async (req, res) => {
    //put would update all the fields,
    //patch only updates the fields the user specifies
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'cannot find subscriber' })
            //404 means you couldn't find anything
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
        //500 means there's a problem with our server
    }
    res.subscriber = subscriber
    next()
}

module.exports = router