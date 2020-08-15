const express = require("express");
const Action = require("../helpers/actionModel");
const Project = require("../helpers/projectModel");

const router = express.Router();

//router.get request to req projects, if req works display projects, if not give err 500
router.get("/projects", (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err retriving the projects",
      });
    });
});

//router.get request to request specific project with id
router.get("/projects/:id", (req, res) => {
  res.status(200).json(req.project);
});

//post request to add a project, if no error send 201 if err send 500
router.post("/projects/", (req, res) => {
  Project.insert(req.project)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err adding project",
      });
    });
});

//get specific projects actions with id, if not give 500 mess
router.get("/projects/:id/actions", (req, res) => {
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

//router.post request to add a project, if no err send 201, if err send 500
router.post("/projects/", (req, res) => {
  Project.insert(req.project)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err adding project",
      });
    });
});

//router.post request for actions, req projet id.
//if req met display actions of specific project, if not send err message
router.post("projects/:id/actions", (req, res) => {
  Action.insert(req.action)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err adding action",
      });
    });
});

//router to delete project with id given
router.delete("/projects/:id", (req, res) => {
  Project.remove(req.project.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(req.project);
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
router.put("/projects/:id", (req, res) => {
  Project.update(req.project.id, req.body)
    .then((count) => {
      if (count) {
        Project.getById(req.project.id)
          .then((project) => {
            res.status(200).json(project);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "err during  updating project",
            });
          });
      } else {
        res.status(404).json({ message: "the project could not be updated" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "err updating user",
      });
    });
});
