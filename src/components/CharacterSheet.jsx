function CharacterSheet({ formData }) {
  return (
    <div className="card p-4 shadow-sm">
      <h5 className="card-title mb-3">Generated Character Sheet</h5>

      <p>
        <strong>Name:</strong> [Character Name]
      </p>
      <p>
        <strong>Race:</strong> [Selected Race]
      </p>
      <p>
        <strong>Class:</strong> [Selected Class]
      </p>

      <div className="mt-4">
        <button className="btn btn-outline-secondary me-2">Edit</button>
        <button className="btn btn-outline-success me-2">Save as PDF</button>
        <button className="btn btn-outline-primary">Print</button>
      </div>
    </div>
  );
}

export default CharacterSheet;
