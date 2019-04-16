const route = require('express').Router();

route.get('/', (res, req) => {
    let page = req.query.page //capture page number and do something with pagenumber
    res.set('Link', '<static/MyPage/?p=2>; rel=next');
    req.db.collection('tasks')
        .find({ status: 0 })
        .sort({ created_date: -1 })
        .limit(10)
        .toArray((err, data) => {
            res.json(data)
        })
})

route.post('/', (res, req) => {
    let newInfo = req.body.data
    req.db.collection('tasks')
        .insert(newInfo, (errinsert, resinsert) => {
            res.json({ Message: "Insert ok" })
        })
})

route.patch('/:task_id', (res, req) => {
    let newInfo = req.body.data
    req.db.collection('tasks')
        .update({ _id: 'task_id' }, { '$set': { 'status': 0 } }, (errUpdate, resUpdate) => {
            res.json({ Message: "Update ok" })
        })
})

route.delete('/:task_id', (res, req) => {
    req.db.collection('tasks')
        .remove({ _id: 'task_id' }, (errDel, resDel) => {
            res.json({ Message: "Delete ok" })
        })
})

route.get('/completed', (res, req) => {
    req.db.collection('tasks')
        .find({ status: 1 })
        .toArray((err, data) => {
            res.json(data)
        })
})

module.exports = route