"use strict";
class WebDevelopment {
    constructor(id, firstName, lastName, academy, classesTaken, hasPassedExams) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.academy = academy;
        this.classesTaken = classesTaken;
        this.hasPassedExams = hasPassedExams;
    }
    createStudent(id, firstName, lastName, academy, classesTaken, hasPassedExams) {
        const student = new WebDevelopment(id, firstName, lastName, academy, classesTaken, hasPassedExams);
        academyStudents.push(student);
        return student;
    }
    printStudent(student) {
        console.log(student);
    }
    updateStudent(studentId, updateData) {
        const foundStudent = academyStudents.find((student) => student.id === studentId);
        if (!foundStudent) {
            console.log("No student found!");
        }
        const updatedStudent = Object.assign(Object.assign({}, foundStudent), updateData);
        const updatedAcademyStudents = academyStudents.map((student) => student.id === updatedStudent.id ? updatedStudent : student);
        return updatedAcademyStudents;
    }
    deleteStudent(studentId) {
        const updatedAcademy = academyStudents.filter((student) => student.id !== studentId);
        return updatedAcademy;
    }
}
const studentOne = new WebDevelopment(12345, "Student", "Studentski", "Web Development", 5, true);
const studentTwo = new WebDevelopment(54321, "Miki", "Stojanovski", "Front End Development", 7, true);
const studentThree = new WebDevelopment(56789, "Deki", "Dejanovski", "DevOps", 5, false);
const academyStudents = [studentOne, studentTwo, studentThree];
const createStudent = (id, firstName, lastName, academy, classesTaken, hasPassedExams) => {
    const student = new WebDevelopment(id, firstName, lastName, academy, classesTaken, hasPassedExams);
    academyStudents.push(student);
    return student;
};
