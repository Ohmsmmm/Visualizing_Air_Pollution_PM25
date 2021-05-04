module.exports = function (app) {

    var handle = require('../controller/operation')

    app.get('/QueryAll', async (req, res) => {
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

    

    app.get('/Query4A', async (req, res) => {
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

    app.get('/Query4B', async (req, res) => {
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

    app.get('/Query4C/:country', async (req, res) => {
        try {
            console.log(req.params)
            var result = (await new handle().Query4C(req.params))
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
    
    app.get('/Query4D/:year/:color_pm25', async (req, res) => {
        try {
            var result = (await new handle().Query4D(req.params))
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

    app.get('/Query5A/:year', async (req, res) => {
        try {
            var result = (await new handle().Query5A(req.params))
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

    app.get('/Query5B', async (req, res) => {
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

    app.get('/Query5C', async (req, res) => {
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

    app.get('/Query5D', async (req, res) => {
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

    app.get('/Query5E', async (req, res) => {
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

    app.get('/Query5F/:year', async (req, res) => {
        try {
            var result = (await new handle().Query5F(req.params))
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