const bcrypt = require('bcrypt')

async function ruller(){
    const salt  = await bcrypt.genSalt(6)
    const hashed = await bcrypt.hash('jayremedy', salt)
    console.log(salt)
    console.log(hashed)
}
ruller()
