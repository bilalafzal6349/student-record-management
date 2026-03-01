import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Mathematics",
];

const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];

const INITIAL_STUDENTS = [
  { id: 1, name: "Sara Ahmed",  roll: "CS-101", department: "Computer Science",       grade: "A"  },
  { id: 2, name: "Ali Hassan",  roll: "EE-202", department: "Electrical Engineering", grade: "B+" },
  { id: 3, name: "Zara Khan",   roll: "ME-303", department: "Mechanical Engineering", grade: "A-" },
];

const EMPTY_FORM = { name: "", roll: "", department: "", grade: "" };

// ─── react-hot-toast handles all toast rendering via <Toaster /> ──────────────
// No custom hook or Toast component needed.

// ─── Field Component ───────────────────────────────────────────────────────────

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500">⚠ {error}</p>
      )}
    </div>
  );
}

// ─── GradeBadge Component ──────────────────────────────────────────────────────

function GradeBadge({ grade }) {
  const colorMap = {
    "A+": "bg-emerald-100 text-emerald-700",
    "A":  "bg-emerald-100 text-emerald-700",
    "A-": "bg-emerald-100 text-emerald-700",
    "B+": "bg-blue-100 text-blue-700",
    "B":  "bg-blue-100 text-blue-700",
    "B-": "bg-blue-100 text-blue-700",
    "C+": "bg-amber-100 text-amber-700",
    "C":  "bg-amber-100 text-amber-700",
    "D":  "bg-orange-100 text-orange-700",
    "F":  "bg-red-100 text-red-700",
  };

  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorMap[grade] ?? "bg-slate-100 text-slate-600"}`}>
      {grade}
    </span>
  );
}

// ─── StudentForm Component ─────────────────────────────────────────────────────

function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEditing           = Boolean(editingStudent);

  useEffect(() => {
    setForm(editingStudent ?? EMPTY_FORM);
    setErrors({});
  }, [editingStudent]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name       = "Name is required";
    if (!form.roll.trim()) e.roll       = "Roll number is required";
    if (!form.department)  e.department = "Department is required";
    if (!form.grade)       e.grade      = "Grade is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleCancel = () => {
    onCancelEdit();
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const inputBase = (hasError) =>
    `w-full text-sm px-3.5 py-2.5 rounded-lg border outline-none transition-all bg-slate-50
     focus:bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
     ${hasError ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-slate-200 hover:border-slate-300"}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-indigo-500 rounded-full" />
          <h2 className="text-slate-800 font-bold text-lg">
            {isEditing ? "Edit Student" : "Add New Student"}
          </h2>
        </div>
        {isEditing && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-semibold">
            Editing Mode
          </span>
        )}
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Field label="Full Name" error={errors.name}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Ali Hassan"
            className={inputBase(errors.name)}
          />
        </Field>

        <Field label="Roll Number" error={errors.roll}>
          <input
            name="roll"
            value={form.roll}
            onChange={handleChange}
            placeholder="e.g. CS-101"
            className={inputBase(errors.roll)}
          />
        </Field>

        <Field label="Department" error={errors.department}>
          <select name="department" value={form.department} onChange={handleChange} className={inputBase(errors.department)}>
            <option value="">Select department</option>
            {DEPARTMENTS.map((dept) => <option key={dept}>{dept}</option>)}
          </select>
        </Field>

        <Field label="Grade" error={errors.grade}>
          <select name="grade" value={form.grade} onChange={handleChange} className={inputBase(errors.grade)}>
            <option value="">Select grade</option>
            {GRADES.map((grade) => <option key={grade}>{grade}</option>)}
          </select>
        </Field>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm"
        >
          {isEditing ? "Update Student" : "Add Student"}
        </button>
        {isEditing && (
          <button
            onClick={handleCancel}
            className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// ─── StudentTable Component ────────────────────────────────────────────────────

function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-20 text-center">
        <p className="text-4xl mb-3">🎓</p>
        <p className="text-slate-400 text-sm">No students yet. Add one above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-slate-800 font-bold text-lg">Student Records</h2>
        <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-full font-semibold">
          {students.length} {students.length === 1 ? "Student" : "Students"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
              {["#", "Name", "Roll No", "Department", "Grade", "Actions"].map((h) => (
                <th key={h} className="text-left px-6 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student, index) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-6 py-4 text-slate-800 font-semibold">{student.name}</td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    {student.roll}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{student.department}</td>
                <td className="px-6 py-4">
                  <GradeBadge grade={student.grade} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ConfirmModal Component ────────────────────────────────────────────────────

function ConfirmModal({ student, onConfirm, onCancel }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          🗑️
        </div>
        <h3 className="text-slate-800 font-bold text-center text-lg mb-1">Delete Student?</h3>
        <p className="text-slate-400 text-sm text-center mb-6">
          <span className="font-semibold text-slate-700">{student.name}</span> ({student.roll}) will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(student.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────

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
      {/* react-hot-toast – renders all toasts automatically */}
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
        {/* Page Header */}
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
