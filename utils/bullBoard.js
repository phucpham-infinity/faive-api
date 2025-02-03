import {ExpressAdapter} from '@bull-board/express'
import {createBullBoard} from '@bull-board/api'
import {BullMQAdapter} from '@bull-board/api/bullMQAdapter.js'

import {meiseSyncMq} from "../queue/index.js";
import {basicAuth} from "../middlewares/basicAuth.js";
import {setupElasticsearchSyncWorker} from "../queue/workers/elasticsearchSync.worker.js";


export const setupBullBoard =async (app) => {
    const serverAdapter = new ExpressAdapter()
    serverAdapter.setBasePath('/queues')
   await setupElasticsearchSyncWorker()
    createBullBoard({
        queues: [new BullMQAdapter(meiseSyncMq)],
        serverAdapter: serverAdapter,
    })
    app.use('/queues', basicAuth , serverAdapter.getRouter())
}