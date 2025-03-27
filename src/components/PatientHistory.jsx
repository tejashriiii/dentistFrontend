import React from "react";

const PatientHistory = ({ history, currentComplaint }) => {
  return history.length > 0 ? (
    <div className="space-y-4">
      {history.map((entry, index) => {
        const [id, data] = Object.entries(entry)[0];
        const { complaint_details, followups } = data;

        return id != currentComplaint ? (
          <div
            key={id}
            className="my-6 p-4 pb-6 border-1 border-[var(--lightgreen)] rounded-lg bg-[var(--bg)]"
          >
            <div>
              <p className="font-semibold text-xl text-[var(--darkergreen)]">
                {`${index + 1}. ${complaint_details.complaint}`}
              </p>
              <p className="pl-5 pt-1 text-sm text-gray-500">
                Date: {new Date(complaint_details.date).toLocaleDateString()}
              </p>
            </div>

            {followups.length > 0 && (
              <div className="pl-5 mt-3">
                <h3 className="text-md font-semibold text-gray-700">
                  Followups:
                </h3>
                <ul className="mt-1 space-y-2">
                  {followups.map((followup) => (
                    <li
                      key={followup.number}
                      className="flex justify-between items-center border-b pb-2 last:border-b-0"
                    >
                      <div>
                        <p className="text-gray-800">{followup.title}</p>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(followup.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${followup.completed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                      >
                        {followup.completed ? "Completed" : "Pending"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null;
      })}
    </div>
  ) : (
    <span className="italic text-gray-500">
      There are no previous visits for this patient
    </span>
  );
};

export default PatientHistory;
