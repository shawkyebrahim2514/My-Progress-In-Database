const faker = require('faker')
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
})
connection.connect()
// -------------------------------------

var newStudent = {
    id: faker.random.number(),
    password: faker.random.number()
}

var newPersonalData = {
    studentID: newStudent.id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.past(),
    gender: 'male'
}

var newContactData = {
    studentID: newStudent.id,
    email: faker.internet.email(),
    phoneNumber: faker.random.number(11),
    address: faker.address.city()
}

var newAcademicData = {
    studentID: newStudent.id,
    collageYear: faker.random.number(4),
    GPA: faker.random.number(4)
}

var newCourse = {
    studentID: newStudent.id,
    id: faker.random.number(),
    name: faker.lorem.words(1),
    grade: faker.random.number(100)
}

var newCourseNote = {
    courseID: newCourse.id,
    title: faker.lorem.sentence(4),
    content: faker.lorem.paragraph(4)
}

for (i = 0; i < 200; i++) {
    connection.query('insert into students set ?', newStudent, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    })
    connection.query('insert into personalData set ?', newPersonalData, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    })
    connection.query('insert into contactData set ?', newContactData, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    })
    connection.query('insert into academicData set ?', newAcademicData, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    })
    connection.query('insert into courses set ?', newCourse, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    })
    connection.query('insert into coursesNotes set ?', newCourseNote, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    })

    newStudent.id = faker.random.number()
    newPersonalData.studentID = newStudent.id
    newContactData.studentID = newStudent.id
    newAcademicData.studentID = newStudent.id
    newCourse.studentID = newStudent.id
    newStudent.password = faker.random.number()
    newPersonalData.firstName = faker.name.firstName()
    newPersonalData.lastName = faker.name.lastName()
    newPersonalData.birthday = faker.date.past()
    if (newPersonalData.gender === 'male') newPersonalData.gender = 'female'
    else newPersonalData.gender = 'male'
    newContactData.email = faker.internet.email()
    newContactData.phoneNumber = faker.random.number(11)
    newContactData.address = faker.address.city()
    newAcademicData.collageYear = faker.random.number(4)
    newAcademicData.GPA = faker.random.number(4)
    newCourse.id = faker.random.number()
    newCourseNote.courseID = newCourse.id
    newCourse.name = faker.lorem.words(1)
    newCourse.grade = faker.random.number(100)
    newCourseNote.title = faker.lorem.sentence(4)
    newCourseNote.content = faker.lorem.paragraph(4)
}

//-----------------------------------------
connection.end()