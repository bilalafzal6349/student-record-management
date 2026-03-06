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
    <span className={`text-xs font-bold px-2 py-1 rounded-full ${colorMap[grade] ?? "bg-slate-100 text-slate-600"}`}>
      {grade}
    </span>
  );
}

const StudentTable = ({ students, onEdit, onDelete }) => {
  // when there is no student this runs
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
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-slate-800 font-bold text-lg">Student Records</h2>
        <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-full font-semibold">
          {students.length} {students.length === 1 ? "Student" : "Students"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
              {["#", "Name", "Roll No", "Subject", "Department", "Grade", "Actions"].map((h) => (
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
                <td className="px-6 py-4 text-slate-500">{student.subject}</td>
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
export default StudentTable;