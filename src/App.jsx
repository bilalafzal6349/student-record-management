import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "./utils/confirmModal";
import StudentForm from "./components/studentForm";
import StudentTable from "./components/studentTable";
// Constants

const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Sara Ahmed",
    roll: "CS-101",
    subject: "Programming Fundamentals",
    department: "Computer Science",
    grade: "A",
  },
  {
    id: 2,
    name: "Ali Hassan",
    roll: "EE-202",
    subject: "Circuits and Electronics",
    department: "Electrical Engineering",
    grade: "B+",
  },
  {
    id: 3,
    name: "Zara Khan",
    roll: "ME-303",
    subject: "Engineering Mechanics",
    department: "Mechanical Engineering",
    grade: "A-",
  },
];


// Field Component


// GradeBadge Component



export default function App() {
  const [students, setStudents]             = useState(INITIAL_STUDENTS);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteTarget, setDeleteTarget]     = useState(null);

  const handleAdd = (formData) => {
    setStudents((prev) => [...prev, { ...formData, id: Date.now() }]);
    toast.success(`${formData.name} has been added successfully.`);
  };

  const handleUpdate = (formData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === editingStudent.id ? { ...formData, id: s.id } : s))
    );
    toast(`✏️ ${formData.name}'s record has been updated.`);
    setEditingStudent(null);
  };

  const handleDelete = (id) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.error(`${student.name} has been removed.`);
    setDeleteTarget(null);
  };

  const handleFormSubmit = (formData) =>
    editingStudent ? handleUpdate(formData) : handleAdd(formData);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      {/* react-hot-toast – single component renders all toasts */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { borderRadius: "12px", fontSize: "14px", fontWeight: 500 },
          success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
          error:   { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />

      <ConfirmModal
        student={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
            Assignment 4 · React CRUD
          </p>
          <h1 className="text-3xl font-bold text-slate-800">
            Student Record Management
          </h1>
        </div>

        <StudentForm
          onSubmit={handleFormSubmit}
          editingStudent={editingStudent}
          onCancelEdit={() => setEditingStudent(null)}
        />

        <StudentTable
          students={students}
          onEdit={setEditingStudent}
          onDelete={setDeleteTarget}
        />
      </div>
    </div>
  );
}
