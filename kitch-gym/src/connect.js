const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kitchgym',
});

connection.connect(err => {
    if(err)
        return err;
    console.log('Connected!')
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server Status: running');
});

app.get('/get/users', (req, res) => {
    const SELECT_ALL = 'SELECT * FROM user';
    connection.query(SELECT_ALL, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('All Users retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/get/user', (req, res) => {
    const {u_id} = req.query;
    const SELECT_ONE = `SELECT * FROM user WHERE user_id=${u_id}`;
    connection.query(SELECT_ONE, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('One User retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/add/user', (req, res) => {
    const {name, username, password, weightCurr, weightGoal} = req.query;
    const ADD_USER  = `INSERT INTO user(name, username, password, curr_weight, goal_weight) VALUES (\'${name}\',\'${username}\',\'${password}\', ${weightCurr}, ${weightGoal})`;
    connection.query(ADD_USER, (err, results) => {
        if(err){
            console.log(err);
            return res.send(err);
        } else {
            console.log('User added')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/get/allexercises', (req, res) => {
    const {u_id} = req.query;
    const FIND_WORKOUTS  = `SELECT DISTINCT workout.workout_id, exercise.name FROM workout, exercise, we_table WHERE workout.user_id = ${u_id} AND workout.workout_id = we_table.workout_id AND we_table.exercise_id = exercise.exercise_id`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('All exercises for User retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/count', (req, res) => {
    const {u_id} = req.query;
    const FIND_WORKOUTS  = `SELECT COUNT(*) AS count FROM workout WHERE user_id = ${u_id}`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout count for User retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts', (req, res) => {
    const {u_id} = req.query;
    const FIND_WORKOUTS  = `SELECT * FROM workout WHERE user_id = ${u_id}`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workouts for User retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/delete', (req, res) => {
    const {w_id} = req.query;
    console.log(w_id);
    const DELETE  = `DELETE FROM workout WHERE workout_id = ${w_id}`;
    connection.query(DELETE, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout deleted')
            return res.json({
                data: results
            })
        }
    });
});



app.listen(4000, () => {
    console.log("Server listening on port 4000")
})
