const express = require("express");
const Action = require("../helpers/actionModel");
const Project = require("../helpers/projectModel");
const router = express.Router();

//router.get to req to get all actions.  it request works display actions, if not give err 500

router.get("/", (req, res) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err retrieving actions",
      });
    });
});

//router.get to request to find specific action with id or specific project, if met display action
router.get("/:id/actions", (req, res) => {
  res.status(200).json(req.action);
});

//router.delete request for specific action for specific projeect with id. if/else for 200 if action found or 400 if not  or 500 if error deleting
router.delete("/projects/:id/actions/:id", (req, res) => {
  Action.remove(req.action.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(req.action);
      } else {
        res.status(404).json({ message: "The action could not be deleted" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "err removing action" });
    });
});

//router.put request to update specific action with id
//if/esle statement to req id and action body and what hppens if it does not work (500, 404)
/*router.put("/projects/:id/actions/:id", (req,res) => {
  Action.update(req.action.id, req.body)
    .then((count) => {
      Action.
    })
})*/

module.exports = router;
