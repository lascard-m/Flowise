import express from 'express'
import apikeyRouter from './apikey'
import chatflowsRouter from './chatflows'
import variablesRouter from './variables'

const router = express.Router()

router.use('/apikey', apikeyRouter)
router.use('/chatflows', chatflowsRouter)
router.use('/variables', variablesRouter)

export default router
