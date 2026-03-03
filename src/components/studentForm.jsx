import Field from "../utils/field";
import { useEffect } from "react";
import { useState } from "react";

const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Mathematics",
];

const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];


const  StudentForm =({ onSubmit, editingStudent, onCancelEdit }) => {
    const EMPTY_FORM = { name: "", roll: "", department: "", grade: "" };

  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(editingStudent);

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
export default StudentForm;