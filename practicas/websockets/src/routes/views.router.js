import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {});   // renderizo la plantilla "index"
})


export default router;