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

app.get('/get/workout', (req, res) => {
    const GET_WORKOUT = `SELECT AUTO_INCREMENT AS last_id FROM information_schema.TABLES WHERE TABLE_SCHEMA = "kitchgym" AND TABLE_NAME = "workout";`;
    connection.query(GET_WORKOUT, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout ID retrieved');
            return res.json({
                data: results
            })
        }
    })
});

app.get('/add/workout', (req, res) => {
    const {name, u_id} = req.query;
    const ADD_WORKOUT = `INSERT INTO workout(name, user_id) VALUES (\'${name}\', ${u_id})`;
    connection.query(ADD_WORKOUT, (err, results) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log("Workout Name added");
        }
    });

    const GET_WORKOUT = `SELECT workout_id AS last_id FROM workout ORDER BY workout_id DESC LIMIT 1;`;
    connection.query(GET_WORKOUT, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout ID retrieved');
            return res.json({
                data: results
            })
        }
    })
});

app.get('/workouts/fill', (req, res) => {
    const {muscle, total, w_id} = req.query;
    const GET_EX = `CREATE OR REPLACE VIEW temp_exercises AS SELECT exercise_id FROM exercise WHERE exercise.muscle= ${muscle} ORDER BY RAND() LIMIT ${total}`;
    connection.query(GET_EX, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Target exercises retrieved')
        }
    })

    const PUT_EX = `INSERT INTO we_table(workout_id, exercise_id) SELECT ${w_id}, exercise_id FROM temp_exercises`;
    connection.query(PUT_EX, (err, results) => {
            if(err){
                console.log(err)
                return res.send(err);
            } else {
            console.log('Target exercises placed')
            return res.json({
                data: results
            })
        }
    })
});

app.get('/update/current', (req, res) => {
    const {cur_weight, u_id} = req.query;
    const UPDATE_CURR  = `UPDATE user SET curr_weight=${cur_weight} WHERE user_id=${u_id}`;
    connection.query(UPDATE_CURR, (err, results) => {
        if(err){
            console.log(err)
            return res.send(err);
        } else {
            console.log('user current weight updated')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/update/goal', (req, res) => {
    const {goal_weight, u_id} = req.query;
    const UPDATE_GOAL  = `UPDATE user SET goal_weight=${goal_weight} WHERE user_id=${u_id}`;
    connection.query(UPDATE_GOAL, (err, results) => {
        if(err){
            console.log(err)
            return res.send(err);
        }else {
            console.log('user goal weight updated')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/update/calories', (req, res) => {
    const {cals, u_id} = req.query;
    const UPDATE_CALS  = `UPDATE user SET daily_cals=${cals} WHERE user_id=${u_id}`;
    connection.query(UPDATE_CALS, (err, results) => {
        if(err){
            console.log(err)
            return res.send(err);
        }else {
            console.log('user calories updated')
            return res.json({
                data: results
            })
        }
    });
});



app.listen(4000, () => {
    console.log("Server listening on port 4000")
})
