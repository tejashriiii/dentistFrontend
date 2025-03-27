const FollowupForm = ({
  followup,
  setFollowup,
  onSubmit,
  isEdit,
  onCancel,
  onCheckSchedule,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFollowup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="title"
        className="block font-semibold mb-2 text-[var(--darkergreen)]"
      >
        Title:
      </label>
      <input
        type="text"
        name="title"
        value={followup.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="w-full px-3 py-2 border rounded-md border-[var(--lightgreen)]"
      />

      <label
        htmlFor="description"
        className="block font-semibold mb-2 text-[var(--darkergreen)]"
      >
        Description:
      </label>
      <textarea
        name="description"
        value={followup.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="w-full px-3 py-2 border rounded-md border-[var(--lightgreen)]"
      />

      <div className="flex justify-between gap-10">
        <div className={isEdit ? "w-2/5" : "w-1/2"}>
          <label
            htmlFor="date"
            className="block font-semibold mb-2 text-[var(--darkergreen)]"
          >
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={followup.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md border-[var(--lightgreen)]"
          />
        </div>
        <div className={isEdit ? "w-2/5" : "w-1/2"}>
          <label
            htmlFor="time"
            className="block font-semibold mb-2 text-[var(--darkergreen)]"
          >
            Time:
          </label>
          <input
            type="time"
            name="time"
            value={followup.time}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md border-[var(--lightgreen)]"
          />
        </div>
        {isEdit ? (
          <div className="w-1/6">
            <label className="block font-semibold mb-2 text-[var(--darkergreen)]">
              Completed:
            </label>
            <select
              name="completed"
              value={followup.completed}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[var(--lightgreen)] rounded-md"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        ) : null}
        <button
          className="bg-[var(--darkgreen)] text-white mt-5 py-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer self-end h-3/5 w-1/5"
          onClick={() => onCheckSchedule(followup.date)}
        >
          Check schedule
        </button>
      </div>

      <div className="flex justify-start gap-5 mt-7">
        <button
          onClick={onSubmit}
          className={`bg-[var(--darkgreen)] text-white mt-5 py-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer w-1/5`}
        >
          {isEdit ? "Edit Followup" : "Add Followup"}
        </button>
        {isEdit ? (
          <button
            onClick={onCancel}
            className="w-1/5 bg-gray-500 text-white mt-5 py-2 rounded-md hover:bg-gray-600 hover:cursor-pointer"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default FollowupForm;
