interface Student {
  id: number;
  firstName: string;
  lastName: string;
  academy: string;
  classesTaken: number;
  hasPassedExams: boolean;
}
class WebDevelopment implements Student {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public academy: string,
    public classesTaken: number,
    public hasPassedExams: boolean
  ) {}

  createStudent(
    id: number,
    firstName: string,
    lastName: string,
    academy: string,
    classesTaken: number,
    hasPassedExams: boolean
  ) {
    const student = new WebDevelopment(
      id,
      firstName,
      lastName,
      academy,
      classesTaken,
      hasPassedExams
    );
    academyStudents.push(student);
    return student;
  }

  printStudent(student: Student): void {
    console.log(student);
  }

  updateStudent(studentId: number, updateData: Student) {
    const foundStudent = academyStudents.find(
      (student) => student.id === studentId
    );
    if (!foundStudent) {
      console.log("No student found!");
    }
    const updatedStudent = {
      ...foundStudent,
      ...updateData,
    };
    const updatedAcademyStudents: Student[] = academyStudents.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    return updatedAcademyStudents;
  }

  deleteStudent(studentId: number) {
    const updatedAcademy = academyStudents.filter(
      (student) => student.id !== studentId
    );
    return updatedAcademy;
  }
}

const studentOne = new WebDevelopment(
  12345,
  "Student",
  "Studentski",
  "Web Development",
  5,
  true
);
const studentTwo = new WebDevelopment(
  54321,
  "Miki",
  "Stojanovski",
  "Front End Development",
  7,
  true
);
const studentThree = new WebDevelopment(
  56789,
  "Deki",
  "Dejanovski",
  "DevOps",
  5,
  false
);

const academyStudents: Student[] = [studentOne, studentTwo, studentThree];

const createStudent = (
  id: number,
  firstName: string,
  lastName: string,
  academy: string,
  classesTaken: number,
  hasPassedExams: boolean
) => {
  const student = new WebDevelopment(
    id,
    firstName,
    lastName,
    academy,
    classesTaken,
    hasPassedExams
  );
  academyStudents.push(student);
  return student;
};
