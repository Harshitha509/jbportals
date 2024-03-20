// StudentForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentDob, setStudentDob] = useState('');
  const [branchId, setBranchId] = useState('');
  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateStudentId, setUpdateStudentId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdateMode) {
        // Update mode, perform update instead of create
        await axios.put(`http://127.0.0.1:5000/student/update/${updateStudentId}`, {
          name: studentName,
          dob: studentDob,
          branch_id: branchId,
        });
        console.log('Student updated successfully!');
      } else {
        // Create mode, perform create
        const response = await axios.post('http://127.0.0.1:5000/student/create', {
          id: studentId,
          name: studentName,
          dob: studentDob,
          branch_id: branchId,
        });

        if (response.status === 200) {
          console.log('Student created successfully!');
        } else {
          console.error('Failed to create student:', response.statusText);
        }
      }

      // Reset form and reload students
      resetForm();
      loadStudents();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleUpdate = (studentId) => {
    // Find the selected student from the list
    const selectedStudent = students.find((student) => student.student_id === studentId);

    // Set form fields with selected student data
    setStudentId(selectedStudent.student_id);
    setStudentName(selectedStudent.student_name);
    setStudentDob(selectedStudent.student_dob);
    setBranchId(selectedStudent.branch_id);

    // Enable update mode and store the student ID for update
    setIsUpdateMode(true);
    setUpdateStudentId(studentId);
  };
  
  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/student/delete/${studentId}`);
      console.log('Student deleted successfully!');
      // Reset form and reload students after deleting a student
      resetForm();
      loadStudents();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const resetForm = () => {
    // Reset form fields and disable update mode
    setStudentId('');
    setStudentName('');
    setStudentDob('');
    setBranchId('');
    setIsUpdateMode(false);
    setUpdateStudentId(null);
  };

  const loadStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/list/students');

      if (response.status === 200) {
        setStudents(response.data);
        setShowStudents(true);
      } else {
        console.error('Failed to fetch students:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Date of Birth:
          <input
            type="text"
            value={studentDob}
            onChange={(e) => setStudentDob(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Branch ID:
          <input
            type="text"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">{isUpdateMode ? 'Update' : 'Save'}</button>
      </form>

      {/* Button to toggle the visibility of the list of students */}
      <button onClick={() => setShowStudents(!showStudents)}>
        {showStudents ? 'Hide Students' : 'Show Students'}
      </button>

      {showStudents && (
        <div className="student-list">
          <h2>List of Students:</h2>
          <ul>
            {students.map((student) => (
              <li key={student.student_id}>
                <strong>ID:</strong> {student.student_id},{' '}<br />
                <strong>Name:</strong> {student.student_name},{' '}<br />
                <strong>DOB:</strong> {student.student_dob},{' '}<br />
                <strong>Branch ID:</strong> {student.branch_id},{' '}<br />
                <strong>Branch Name:</strong> {student.branch_name}<br />
                <button  onClick={() => handleUpdate(student.student_id)}>Update</button>
                <button onClick={() => handleDelete(student.student_id)}>Delete</button>
                <br />
                <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
