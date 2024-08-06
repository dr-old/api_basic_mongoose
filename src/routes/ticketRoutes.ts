import { Router } from "express";
import authenticateJWT from "../middlewares/authMiddleware";
import { ticketController } from "../controllers/ticketController";

const router = Router();

router.post("/ticket", ticketController.addTicket, authenticateJWT);
router.get("/ticket", ticketController.getTickets, authenticateJWT);
router.get("/ticket/:id", ticketController.getTicket, authenticateJWT);
router.put("/ticket/:id", ticketController.updateTicket, authenticateJWT);
router.delete("/ticket/:id", ticketController.deleteTicket, authenticateJWT);

const ticketRoutes = router;

export default ticketRoutes;
