import cors from 'cors'
import express from 'express'
import morgan from 'morgan';

import config from '../config.js'
import server from '../db.js'
import home from '../controllers/home.js'
import authRouter from '../routes/auth.js'
import userRouter from '../routes/user.js'
import shareRouter from '../routes/share.js'
import productRouter from '../routes/product.js'
import siteRouter from '../routes/site.js'
import faivelistRouter from '../routes/faivelist.js'
import submitReport from '../controllers/submitReport.js'
import globalErrorHandler from '../utils/errorHandler.js'
import taxonomyTermRouter from '../routes/taxonomyTerm.js'

export default class App {
  app

  /**
   * Helper method to instantiate the application.
   * A shorthand for `new App()`.
   *
   * @param args
   * @return {App}
   */
  static create(...args) {
    return new App(...args)
  }



  constructor() {

    this.app = express()
    this.app.use(express.json())
    this.app.use(express.static(config.paths.public))
    this.app.use(cors({ origin: '*' }))

    morgan.token('body', (req) => JSON.stringify(req.body));
    this.app.use(morgan(':method :url :status :response-time ms - :res[content-length] | Body: :body'))

    this.setRoutes()
    this.app.use(globalErrorHandler)
  }

  async boot() {
    await server.connect()
  }

  /**
   * Start the application.
   */
  async start() {
    /**
     * Boot the application
     */
    await this.boot()

    /**
     * Listen to HTTP requests.
     */
    const port = config.app.port
    const host = config.app.host
    this.app.listen(port, host, () => {
      console.log(`App running on http://${host}:${port}`)
    })
  }

  /**
   * Set the routes for the API.
   */
  setRoutes() {
    this.app.get('/', home)
    this.app.use('/api/v1/auth', authRouter)
    this.app.use('/api/v1/user', userRouter)
    this.app.use('/api/v1/sites', siteRouter)
    this.app.use('/api/v1/share', shareRouter)
    this.app.use('/api/v1/products', productRouter)
    this.app.use('/api/v1/faivelists', faivelistRouter)
    this.app.use('/api/v1/taxonomy-term', taxonomyTermRouter)
    this.app.post('/api/v1/submit-report', submitReport)
  }
}
