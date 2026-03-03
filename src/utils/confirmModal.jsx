const ConfirmModal = ({ student, onConfirm, onCancel }) =>{
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
export default ConfirmModal