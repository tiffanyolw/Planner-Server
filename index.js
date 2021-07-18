const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./configurations/config");
const Task = require("./models/task");
const Goal = require("./models/goal");
const Note = require("./models/note");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8100",
    optionsSuccessStatus: 200
}));

const port = 3000;

config.authenticate().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

config.sync({force:false}).then(() => {
    console.log("Sync successful");
}).catch((err) => {
    console.log(err);
});

// ----- TASKS ----- //
app.get("/tasks", (req, res) => {
    let data = {};
    if (req.query.orderby) {
        const order = req.query.order ? req.query.order : "DESC";
        data.order = [[req.query.orderby, order]];
    }

    Task.findAll(data).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not get tasks");
    });
});

app.get("/tasks/filter", (req, res) => {
    let queries = {};

    if (req.query.status) {
        queries.status = req.query.status;
    }

    let data = {};
    data.where = queries;

    Task.findAll(data).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not get tasks");
    });
});

app.post("/tasks/create", (req, res) => {
    Task.create(req.body).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not create task");
    });
});

app.put("/tasks/update/id/:id", (req, res) => {
    Task.findByPk(req.params.id).then((result) => {
        result.name = req.body.name;
        result.description = req.body.description;
        result.startDate = req.body.startDate;
        result.endDate = req.body.endDate;
        result.status = req.body.status;

        result.save().then(() => {
            res.send(result);
        }).catch(() => {
            res.status(500).send("Could not update task");
        });
    }).catch(() => {
        res.status(500).send("Could not update task");
    });
});

// ----- GOALS ----- //
app.get("/goals", (req, res) => {
    let data = {};
    if (req.query.orderby) {
        const order = req.query.order ? req.query.order : "DESC";
        data.order = [[req.query.orderby, order]];
    }

    Goal.findAll(data).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not get goals");
    });
});

app.get("/goals/filter", (req, res) => {
    let queries = {};

    if (req.query.status) {
        queries.status = req.query.status;
    }

    let data = {};
    data.where = queries;

    Goal.findAll(data).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not get goals");
    });
});

app.post("/goals/create", (req, res) => {
    Goal.create(req.body).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not create goal");
    });
});

app.put("/goals/update/id/:id", (req, res) => {
    Goal.findByPk(req.params.id).then((result) => {
        result.name = req.body.name;
        result.description = req.body.description;
        result.startDate = req.body.startDate;
        result.endDate = req.body.endDate;
        result.status = req.body.status;

        result.save().then(() => {
            res.send(result);
        }).catch(() => {
            res.status(500).send("Could not update goal");
        });
    }).catch(() => {
        res.status(500).send("Could not update goal");
    });
});

// ----- NOTES ----- //
app.get("/notes", (req, res) => {
    let data = {};
    if (req.query.orderby) {
        const order = req.query.order ? req.query.order : "DESC";
        data.order = [[req.query.orderby, order]];
    }

    Note.findAll(data).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not get notes");
    });
});

app.get("/notes/filter", (req, res) => {
    let queries = {};

    if (req.query.status) {
        queries.status = req.query.status;
    }

    let data = {};
    data.where = queries;

    Note.findAll(data).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not get notes");
    });
});

app.post("/notes/create", (req, res) => {
    Note.create(req.body).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(500).send("Could not create note");
    });
});

app.put("/notes/update/id/:id", (req, res) => {
    Note.findByPk(req.params.id).then((result) => {
        result.name = req.body.name;
        result.header = req.body.header;
        result.details = req.body.details;
        result.importance = req.body.importance;

        result.save().then(() => {
            res.send(result);
        }).catch(() => {
            res.status(500).send("Could not update note");
        });
    }).catch(() => {
        res.status(500).send("Could not update note");
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
