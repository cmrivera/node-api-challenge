const express = require("express");
const Action = require("../data/helpers/actionModel");
const Project = require("../data/helpers/projectModel");

const router = express.Router();

//router.get request to req projects, if req works display projects, if not give err 500
router.get("/projects", (req, res) => {
  Project.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err retriving the projects",
      });
    });
});

//router.get request to request specific project with id
router.get("/projects/:id", validateProjectId, (req, res) => {
  res.status(200).json(project);
});

//post request to add a project, if no error send 201 if err send 500
router.post("/projects/", validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//get specific projects actions with id, if not give 500 mess
router.get("/projects/:id/actions", validateProjectId, (req, res) => {
  Project.getProjectActions(req.action.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err retriving actions",
      });
    });
});

//router.post request for actions, req projet id.
//if req met display actions of specific project, if not send err message
router.post(
  "projects/:id/actions",
  validateProjectId,
  validateAction,
  (req, res, next) => {
    const { description, notes } = req.body;
    const { id: project_id } = req.params;

    Action.insert({ description, notes, project_id })
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);

//router to delete project with id given
router.delete("/projects/:id", validateProjectId, (req, res) => {
  Project.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(req.projects);
      } else {
        res.status(404).json({ message: " the project cound not be found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err deleting project",
      });
    });
});

//put request to update specific project with id
router.put("/projects/:id", validateProject, validateProjectId, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
      console.log("project updated");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the project",
      });
    });
});

//middleware
function validateProject(req, res, next) {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: "Missing Project Name" });
    } else if (!req.body.description) {
      return res.status(400).json({ message: "missing project description" });
    }
    next();
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

function validateProjectId(req, res, next) {
  return (req, res, next) => {
    projects
      .get(req.params.id)
      .then((project) => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ message: "Invalid Project ID" });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

//isEmpty function for req,body if no text added.
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = router;
