// routes/dashboard.routes.js

import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.get(
  "/governor",
  verifyJWT,
  authorizeRoles("governor"),
  (req, res) => {
    res.send("Welcome Governor");
  }
);

router.get(
  "/ngo",
  verifyJWT,
  authorizeRoles("ngo", "governor"),
  (req, res) => {
    res.send("NGO Dashboard for NGO or Governor");
  }
);

router.get("/user", verifyJWT, authorizeRoles("user"), (req, res) => {
  res.send("Welcome User");
});

export default router;
