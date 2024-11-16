import { Router } from "express";

const ROUTER = Router();

ROUTER.get("/", async (req, res) => {
  try {
    res.status(200).render("backoffice", {
      title: "Back Office",
    });
  } catch (err) {
    res.status(err.code || 500).send("asasas");
  }
});

export default ROUTER;
