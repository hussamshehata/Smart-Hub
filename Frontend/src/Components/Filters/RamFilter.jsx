export default function RamFilter({ ramOptions, selectedRam, toggleRam }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-700 mb-3">RAM</h3>
      {ramOptions.map(ram => (
        <label key={ram} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedRam.includes(ram)}
            onChange={() => toggleRam(ram)}
          />
          {ram}
        </label>
      ))}
    </div>
  );
}
