import {ExpressAdapter} from '@bull-board/express'
import {createBullBoard} from '@bull-board/api'
import {BullMQAdapter} from '@bull-board/api/bullMQAdapter.js'

import {meiseSyncMq} from "../queue/index.js";
import {basicAuth} from "../middlewares/basicAuth.js";
import {setupMeiseSyncWorker} from "../queue/workers/meiseSync.worker.js";


export const setupBullBoard =async (app) => {
    const serverAdapter = new ExpressAdapter()
    serverAdapter.setBasePath('/queues')
   await setupMeiseSyncWorker()
    createBullBoard({
        queues: [new BullMQAdapter(meiseSyncMq)],
        serverAdapter: serverAdapter,
    })
    app.use('/queues', basicAuth , serverAdapter.getRouter())
}