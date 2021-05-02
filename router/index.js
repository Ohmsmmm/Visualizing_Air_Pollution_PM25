module.exports = function (app) {

    var handle = require('../controller/operation')

    app.post('/QueryAll', async (req, res) => {
        try {
            var result = (await new handle().QueryAll(req.body))
            res.status(200)
            res.json(result)
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                message: error.message || error
            }

            res.status(messageError.statusCode)
            res.json(messageError)
        }
    })

    app.post('/ImportExcel', async (req, res) => {
        try {
            var result = (await new handle().ImportExcel(req.body))
            res.status(200)
            res.json(result)
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                message: error.message || error
            }

            res.status(messageError.statusCode)
            res.json(messageError)
        }
    })

    app.post('/AddGeom', async (req, res) => {
        try {
            var result = (await new handle().AddGeom(req.body))
            res.status(200)
            res.json(result)
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                message: error.message || error
            }

            res.status(messageError.statusCode)
            res.json(messageError)
        }
    })

    app.post('/DeleteAll', async (req, res) => {
        try {
            var result = (await new handle().DeleteAll(req.body))
            res.status(200)
            res.json(result)
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                message: error.message || error
            }

            res.status(messageError.statusCode)
            res.json(messageError)
        }
    })

    

    app.post('/Query4A', async (req, res) => {
        try {
            var result = (await new handle().Query4A(req.body))
            res.status(200)
            res.json(result)
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                message: error.message || error
            }

            res.status(messageError.statusCode)
            res.json(messageError)
        }
    })

}