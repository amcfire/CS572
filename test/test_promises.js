let promise1 = new Promise((respond, reject) => {
    if (true) {
        respond("todo bien")
    } else {
        respond("fallo")
    }
})

promise1
    .then((respond) => {
        console.log("resultado:" + respond)
    })
    .catch((err) => {
        console.log("error:" + err)
    })