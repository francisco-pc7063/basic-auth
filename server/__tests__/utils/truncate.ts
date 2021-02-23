import knex from '../../src/database/connection'

const truncate = async () => { 
    const data = await knex.raw(`
        SELECT * FROM information_schema.tables 
        WHERE table_schema = 'linuxadmin'
    `)
    data.rows.forEach((table) => {
        let result = knex.raw("DELETE", table.table_name)
        console.log(result)
    })
}

export default truncate