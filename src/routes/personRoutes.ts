import { Router } from "express";
import { personController } from "../controllers/personController";
import authenticateJWT from "../middlewares/authMiddleware";

const router = Router();

router.post("/person", personController.addPerson, authenticateJWT);
router.get("/person", personController.getPersons, authenticateJWT);
router.get("/person/:id", personController.getPerson, authenticateJWT);
router.put("/person/:id", personController.updatePerson, authenticateJWT);
router.delete("/person/:id", personController.deletePerson, authenticateJWT);

const personRoutes = router;

export default personRoutes;
