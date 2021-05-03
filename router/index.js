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
            var result = (await new handle().ImportExcel())
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
            var result = (await new handle().AddGeom())
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
            var result = (await new handle().DeleteAll())
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
            var result = (await new handle().Query4A())
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

    app.post('/Query4B', async (req, res) => {
        try {
            var result = (await new handle().Query4B())
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

    app.post('/Query4C', async (req, res) => {
        try {
            var result = (await new handle().Query4C(req.body))
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

    app.post('/Query4D', async (req, res) => {
        try {
            var result = (await new handle().Query4D(req.body))
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

    app.post('/Query5A', async (req, res) => {
        try {
            var result = (await new handle().Query5A(req.body))
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

    app.post('/Query5B', async (req, res) => {
        try {
            var result = (await new handle().Query5B())
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

    app.post('/Query5C', async (req, res) => {
        try {
            var result = (await new handle().Query5C())
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

    app.post('/Query5D', async (req, res) => {
        try {
            var result = (await new handle().Query5D())
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

    app.post('/Query5E', async (req, res) => {
        try {
            var result = (await new handle().Query5E())
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

    app.post('/Query5F', async (req, res) => {
        try {
            var result = (await new handle().Query5F(req.body))
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