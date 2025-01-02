// Full implementation of the Student Registration System in React with pre-filled data

import React, { useState } from "react";
import "./App.css"; // Add styling as needed

const App = () => {
  const [courseTypes, setCourseTypes] = useState(["Individual", "Group", "Special"]);
  const [courses, setCourses] = useState(["Hindi", "English", "Urdu"]);
  const [offerings, setOfferings] = useState([
    { course: "Hindi", type: "Individual" },
    { course: "English", type: "Group" },
    { course: "Urdu", type: "Special" },
  ]);
  const [registrations, setRegistrations] = useState([  ]);

  const [selectedCourseType, setSelectedCourseType] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterType, setFilterType] = useState("");

  const addCourseType = (name) => {
    if (!name || courseTypes.includes(name)) return;
    setCourseTypes([...courseTypes, name]);
  };

  const updateCourseType = (oldName, newName) => {
    if (!newName || courseTypes.includes(newName)) return;
    setCourseTypes(courseTypes.map((ct) => (ct === oldName ? newName : ct)));
  };

  const deleteCourseType = (name) => {
    setCourseTypes(courseTypes.filter((ct) => ct !== name));
    setOfferings(offerings.filter((o) => o.type !== name));
  };

  const addCourse = (name) => {
    if (!name || courses.includes(name)) return;
    setCourses([...courses, name]);
  };

  const updateCourse = (oldName, newName) => {
    if (!newName || courses.includes(newName)) return;
    setCourses(courses.map((c) => (c === oldName ? newName : c)));
  };

  const deleteCourse = (name) => {
    setCourses(courses.filter((c) => c !== name));
    setOfferings(offerings.filter((o) => o.course !== name));
  };

  const addOffering = (course, type) => {
    if (!course || !type || offerings.some((o) => o.course === course && o.type === type)) return;
    setOfferings([...offerings, { course, type }]);
  };

  const updateOffering = (oldOffering, newCourse, newType) => {
    if (!newCourse || !newType) return;
    setOfferings(
      offerings.map((o) =>
        o === oldOffering ? { course: newCourse, type: newType } : o
      )
    );
  };

  const deleteOffering = (offering) => {
    setOfferings(offerings.filter((o) => o !== offering));
  };

  const registerStudent = (student, offering) => {
    if (!student || !offering) return;
    setRegistrations([...registrations, { student, offering }]);
  };

  const filterOfferings = (type) => {
    setFilterType(type);
  };

  return (
    <div className="app">
      <h1>Student Registration System</h1>

      <section>
        <h2>Manage Course Types</h2>
        <input
          type="text"
          placeholder="New Course Type"
          onKeyDown={(e) => {
            if (e.key === "Enter") addCourseType(e.target.value);
          }}
        />
        <ul>
          {courseTypes.map((type) => (
            <li key={type}>
              {type}
              <button onClick={() => deleteCourseType(type)}>Delete</button>
              <button
                onClick={() => {
                  const newName = prompt("Enter new name:", type);
                  if (newName) updateCourseType(type, newName);
                }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Manage Courses</h2>
        <input
          type="text"
          placeholder="New Course"
          onKeyDown={(e) => {
            if (e.key === "Enter") addCourse(e.target.value);
          }}
        />
        <ul>
          {courses.map((course) => (
            <li key={course}>
              {course}
              <button onClick={() => deleteCourse(course)}>Delete</button>
              <button
                onClick={() => {
                  const newName = prompt("Enter new name:", course);
                  if (newName) updateCourse(course, newName);
                }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Manage Course Offerings</h2>
        <select onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedCourseType(e.target.value)}>
          <option value="">Select Course Type</option>
          {courseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button onClick={() => addOffering(selectedCourse, selectedCourseType)}>
          Add Offering
        </button>
        <ul>
          {offerings
            .filter((o) => !filterType || o.type === filterType)
            .map((offering, index) => (
              <li key={index}>
                {offering.type} - {offering.course}
                <button onClick={() => deleteOffering(offering)}>Delete</button>
                <button
                  onClick={() => {
                    const newCourse = prompt("Enter new course:", offering.course);
                    const newType = prompt("Enter new type:", offering.type);
                    updateOffering(offering, newCourse, newType);
                  }}
                >
                  Update
                </button>
              </li>
            ))}
        </ul>
      </section>

      <section>
        <h2>Student Registrations</h2>
        <input
          type="text"
          placeholder="Student Name"
          id="studentName"
        />
        <select id="offeringSelect">
          <option value="">Select Offering</option>
          {offerings.map((offering, index) => (
            <option key={index} value={index}>
              {offering.type} - {offering.course}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            const student = document.getElementById("studentName").value;
            const offeringIndex = document.getElementById("offeringSelect").value;
            if (offeringIndex) registerStudent(student, offerings[offeringIndex]);
          }}
        >
          Register
        </button>
        <ul>
          {registrations.map((r, index) => (
            <li key={index}>
              {r.student} registered for {r.offering.type} - {r.offering.course}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Filter Offerings</h2>
        <select onChange={(e) => filterOfferings(e.target.value)}>
          <option value="">All Types</option>
          {courseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
};

export default App;
