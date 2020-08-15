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
router.get("/:id/actions", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

//router.delete request for specific action for specific projeect with id. if/else for 200 if action found or 400 if not  or 500 if error deleting
router.delete("/projects/:id/actions/:id", validateActionId, (req, res) => {
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

router.put("/projects/:id/actions/:id", validateActionId, (req, res) => {
  Posts.update(req.post.id, req.body)
    .then((count) => {
      if (count) {
        Posts.getById(req.post.id)
          .then((post) => {
            res.status(200).json(post);
          })
          .catch((err) => {
            req
              .status(500)
              .json({ message: "An error occured during getting post" });
          });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the post",
      });
    });
});

function validateActionId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Action.getById(id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: " invalid action request" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "did not work", err });
    });
}

module.exports = router;
