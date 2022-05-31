const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

// Coba olah data ini hehe :)
let cap = urlSearchParams.get('capacity')
let date = urlSearchParams.get('date')
console.log(params)
console.log(cap)
/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App()
app.init().then(app)
