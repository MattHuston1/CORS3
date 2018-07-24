const express = require('express')
const cors = require('cors')
const data = require('./dataSet')
const port = parseInt(process.env.PORT || 8000)
const app = express()
app.use(cors())

function returnStudentId(data, id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      return data[i]
    }    
  }
  return null
}

app.get('/', (request, response) => {
  response.json({ data })
})

app.get('/:id', (request, response) => {
  let student = returnStudentId(data, request.params.id)
  if (!student) {
    response.status(404).json({
      error: {
        message: 'No result found'
      }
    })
  } else {
    response.json({
      data: student
    })
  }
})

app.listen(port, function () {
  console.log('Listening to port', port )
})