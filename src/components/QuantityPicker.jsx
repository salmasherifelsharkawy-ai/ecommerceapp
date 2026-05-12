export default function QuantityPicker({ value, onChange, min = 1, max = 99 }) {
  const n = Number(value);
  const safeValue = Number.isFinite(n) ? n : min;

  const dec = () => onChange(Math.max(min, safeValue - 1));
  const inc = () => onChange(Math.min(max, safeValue + 1));

  return (
    <div className="input-group" style={{ width: 150 }}>
      <button className="btn btn-outline-secondary" type="button" onClick={dec}>
        -
      </button>
      <input
        className="form-control text-center"
        value={safeValue}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
      />
      <button className="btn btn-outline-secondary" type="button" onClick={inc}>
        +
      </button>
    </div>
  );
}

