export default function StorageFilter({ storageOptions, selectedStorage, toggleStorage }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-700 mb-3">Storage</h3>
      {storageOptions.map(storage => (
        <label key={storage} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedStorage.includes(storage)}
            onChange={() => toggleStorage(storage)}
          />
          {storage}
        </label>
      ))}
    </div>
  );
}
