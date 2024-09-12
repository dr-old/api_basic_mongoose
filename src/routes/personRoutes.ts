import { Router } from "express";
import { personController } from "../controllers/personController";

const router = Router();

// Define routes for category management
router.post("/person", personController.addPerson);
router.get("/person", personController.getPersons);
router.get("/person/:id", personController.getPerson);
router.put("/person/:id", personController.updatePerson);
router.delete("/person/:id", personController.deletePerson);

const personRoutes = router;

export default personRoutes;
