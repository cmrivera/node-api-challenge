const express = require("express");
const Action = require("../data/helpers/actionModel");
const Project = require("../data/helpers/projectModel");
const router = express.Router();

//router.get to req to get all actions.  it request works display actions, if not give err 500

router.get("/", (req, res) => {
  console.log("req.query", req.query);
  Action.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err retrieving actions",
      });
    });
});

//router.get to request to find specific action with id or specific project, if met display action
router.get("/projects/:id/actions", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

//router.delete request for specific action for specific projeect with id. if/else for 200 if action found or 400 if not  or 500 if error deleting
router.delete("/projects/:id/actions/:id", validateActionId, (req, res) => {
  Action.remove() //or req.params.id or req.actions.id
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

router.put(
  "/projects/:id/actions/:id",
  validateActionId,
  validateAction,
  (req, res) => {
    console.log(actions);
    Action.update(req.action.id, req.body)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((error) => {
        next(error);
      });
  }
);

function validateActionId(req, res, next) {
  return (req, res, next) => {
    Action.get(req.params.id)
      .then((actions) => {
        if (actions) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ message: "Invalid Action ID" });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

function validateAction(req, res, next) {
  return (req, res, next) => {
    if (!req.body.description) {
      return res.status(400).json({ message: "Missing Action Description" });
    } else if (!req.body.notes) {
      return res
        .status(400)
        .json({ message: "Missing Required Actions Notes" });
    }
    next();
  };
}

module.exports = router;
