import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import FollowupForm from "../FollowupForm";
import { OctagonX, PencilRuler } from "lucide-react";
import Modal from "../Modal";

const Followup = ({ activeComplaint }) => {
  const [newFollowup, setNewFollowup] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const [editFollowup, setEditFollowup] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [pastFollowups, setPastFollowups] = useState([]);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduledFollowups, setScheduledFollowups] = useState([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [followupToDelete, setFollowupToDelete] = useState({});
  const formRef = useRef(null);

  const fetchPastFollowups = async () => {
    try {
      if (Object.keys(activeComplaint) == 0) return;
      const PAST_FOLLOWUPS_URL = `${import.meta.env.VITE_API_URL}/p/followup/${activeComplaint.id}/`;
      const response = await fetch(PAST_FOLLOWUPS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      let sortedFollowups = data.followups;
      sortedFollowups.sort((a, b) => a.number - b.number);
      setPastFollowups(data.followups);
    } catch (error) {
      console.error(error.error);
      toast.error("Coundn't fetch previous followups");
    }
  };

  const fetchScheduledFollowups = async (date) => {
    try {
      const SCHEDULED_FOLLOWUPS_URL = `${import.meta.env.VITE_API_URL}/p/followup/${date}/`;
      const response = await fetch(SCHEDULED_FOLLOWUPS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      setScheduledFollowups(data.followups);
      console.log(data.followups);
    } catch (error) {
      console.error(error.error);
      toast.error("Coundn't fetch previous followups");
    }
  };

  const createNewFollowup = async (followup) => {
    try {
      const CREATE_FOLLOWUP_URL = `${import.meta.env.VITE_API_URL}/p/followup/`;
      const followupToCreate = {
        complaint_id: activeComplaint.id,
        followup: {
          title: followup.title,
          description: followup.description,
          date: followup.date,
          time: followup.time,
          completed: false,
          number: pastFollowups.length + 1,
        },
      };
      console.log(followupToCreate);
      const response = await fetch(CREATE_FOLLOWUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(followupToCreate),
      });
      const verdict = await response.json();
      toast.success(verdict.success);
      clearFields();
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
    return false;
  };

  const updatePastFollowup = async (updatedFollowup) => {
    try {
      const UPDATE_FOLLOWUP_URL = `${import.meta.env.VITE_API_URL}/p/followup/`;
      const formattedUpdatedFollowup = {
        id: updatedFollowup.id,
        title: updatedFollowup.title,
        description: updatedFollowup.description,
        date: updatedFollowup.date,
        time: updatedFollowup.time,
        completed: updatedFollowup.completed,
      };
      const response = await fetch(UPDATE_FOLLOWUP_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(formattedUpdatedFollowup),
      });
      const verdict = await response.json();
      toast.success(verdict.success);
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
    return false;
  };

  const deleteFollowup = async (followupToDeleteId) => {
    try {
      const DELETE_FOLLOWUP_URL = `${import.meta.env.VITE_API_URL}/p/followup/delete/${followupToDeleteId}/`;
      const response = await fetch(DELETE_FOLLOWUP_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.success);
        setIsDeleteModalOpen(false);
        fetchPastFollowups();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleDeleteFollowup = (deleteFollowup) => {
    setIsDeleteModalOpen(true);
    setFollowupToDelete(deleteFollowup);
  };

  const fetchPDF = async () => {
    const complaint_id = activeComplaint.id;
    const sitting = activeComplaint.sitting || 0;
    console.log("sitting: ", 0);
    try {
      const GENERATE_PDF_URL = `${import.meta.env.VITE_API_URL}/p/prescription/pdf/${complaint_id}/${sitting}/`;
      const response = await fetch(GENERATE_PDF_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      const prescriptionPDF = await response.blob();
      const pdfUrl = URL.createObjectURL(prescriptionPDF);
      window.open(pdfUrl, `_blank`, "noopener, noreferrer");
      toast.success("PDF opened in new tab");
    } catch (error) {
      console.error(error);
      toast.error("Coundn't generate pdf");
    }
  };

  useEffect(() => {
    console.log("activeComplaint", activeComplaint);
    fetchPastFollowups();
  }, [activeComplaint]);

  const handleAddFollowup = async () => {
    if (!newFollowup.title || !newFollowup.date || !newFollowup.time) {
      toast.warning("Please fill all fields");
      return;
    }
    const createSuccess = await createNewFollowup(newFollowup);
    if (createSuccess) {
      fetchPastFollowups();
    }
  };

  const handleEditFollowup = async () => {
    if (
      !editFollowup.title ||
      !editFollowup.description ||
      !editFollowup.date ||
      !editFollowup.time ||
      editFollowup.completed === ""
    ) {
      toast.warning("Please fill all fields");
      return;
    }
    const updateSuccess = await updatePastFollowup(editFollowup);
    if (updateSuccess) {
      fetchPastFollowups();
    }
    setEditMode(!updateSuccess);
  };

  const displayEditFollowup = (followup) => {
    toast.info(`Editing Sitting No. ${followup.number}`);
    formRef.current?.scrollIntoView({ behaviour: "smooth" });
    setEditFollowup({
      id: followup.id,
      title: followup.title,
      description: followup.description,
      date: followup.date,
      time: followup.time,
      completed: followup.completed,
      number: followup.number,
    });
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  const clearFields = () => {
    setNewFollowup({
      title: "",
      description: "",
      date: "",
      time: "",
    });
  };

  const checkSchedule = async (date) => {
    if (!date) {
      toast.warning("Enter a date to check schedule");
      return;
    }
    await fetchScheduledFollowups(date);
    setScheduleDate(new Date(date).toDateString());
    setIsScheduleOpen(true);
  };

  return Object.keys(activeComplaint).length > 0 ? (
    <div className="p-4 mx-auto">
      <h2
        className="text-2xl font-semibold mb-4 text-[var(--txt)]"
        ref={formRef}
      >
        {editMode ? `Edit Sitting No. ${editFollowup.number}` : "New follow-up"}
      </h2>
      {editMode ? (
        <FollowupForm
          followup={editFollowup}
          setFollowup={setEditFollowup}
          onSubmit={handleEditFollowup}
          isEdit={true}
          onCancel={cancelEdit}
          onCheckSchedule={checkSchedule}
        />
      ) : (
        <FollowupForm
          followup={newFollowup}
          setFollowup={setNewFollowup}
          onSubmit={handleAddFollowup}
          isEdit={false}
          onCancel={null}
          onCheckSchedule={checkSchedule}
        />
      )}

      <Modal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        title={`Schedule on ${new Date(scheduleDate).toLocaleDateString()}`}
      >
        {scheduledFollowups.length != 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 py-5 my-5">
              <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                <tr>
                  <th className="border border-gray-300 p-2">Patient</th>
                  <th className="border border-gray-300 p-2">Followup</th>
                  <th className="border border-gray-300 p-2">Complaint</th>
                  <th className="border border-gray-300 p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {scheduledFollowups.map((followup, index) => (
                  <tr key={index} className="even:bg-gray-100 odd:bg-white">
                    <td className="border border-gray-300 p-2">
                      {followup.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {followup.followup || "To be filled"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {followup.complaint_object?.complaint || "To be filled"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {followup.time
                        ? followup.time.split(".")[0].slice(0, 5)
                        : "Not set"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span className="text-xl font-semibold text-[var(--txt)]">
            No followups scheduled
          </span>
        )}
      </Modal>

      <h2 className="text-2xl font-semibold mt-14 mb-4 text-[var(--txt)]">
        Sittings History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 py-5 my-5 mb-10">
          <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
            <tr>
              <th className="border border-gray-300 p-2">No.</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Edit</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr key={-1} className="even:bg-gray-100 odd:bg-white">
              <td className="border border-gray-300 p-2">0</td>
              <td className="border border-gray-300 p-2">
                {activeComplaint.complaint_object
                  ? `Complaint: ${activeComplaint.complaint_object.complaint}`
                  : `Complaint: ${activeComplaint.complaint}`}
              </td>
              <td className="border border-gray-300 p-2">
                {activeComplaint.complaint_object
                  ? activeComplaint.complaint_object.description ||
                    "To be filled"
                  : activeComplaint.description || "To be filled"}
              </td>
              <td className="border border-gray-300 p-2">
                {activeComplaint.complaint_object
                  ? new Date(
                      activeComplaint.complaint_object.date,
                    ).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                {activeComplaint.complaint_object
                  ? activeComplaint.complaint_object.time
                    ? activeComplaint.complaint_object.time
                        .split(".")[0]
                        .slice(0, 5)
                    : "Not set"
                  : activeComplaint.time
                    ? activeComplaint.time.split(".")[0].slice(0, 5)
                    : "Not set"}
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold">
                -
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold">
                -
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold">
                -
              </td>
            </tr>
            {pastFollowups.map((followup, index) => (
              <tr
                key={index}
                className="even:bg-gray-100 odd:bg-white hover:cursor-pointer hover:bg-gray-300"
              >
                <td className="border border-gray-300 p-2">
                  {followup.number || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {followup.title || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {followup.description || "To be filled"}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(followup.date).toLocaleDateString() || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {followup.time
                    ? followup.time.split(".")[0].slice(0, 5)
                    : "Not set"}
                </td>
                <td className="border border-gray-300 p-2">
                  {followup.completed ? "Completed" : "Pending"}
                </td>
                <td
                  className="border border-[var(--lightgreen)] border-b-gray-500 text-[var(--txt)] bg-[var(--lightgreen)] hover:border-[var(--darkergreen)] hover:bg-[var(--darkergreen)] hover:cursor-pointer hover:text-white font-bold p-1 sm:p-2 text-center"
                  onClick={() => displayEditFollowup(followup)}
                >
                  <PencilRuler className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
                <td
                  className="border border-red-700 border-b-red-900 bg-red-700 hover:bg-red-800 hover:cursor-pointer text-white font-bold p-1 sm:p-2 text-center"
                  onClick={() =>
                    handleDeleteFollowup({
                      id: followup.id,
                      number: followup.number,
                    })
                  }
                >
                  <OctagonX className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="bg-[var(--darkgreen)] mt-10 text-white py-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer w-full md:w-1/2 lg:w-1/6"
        onClick={fetchPDF}
      >
        Generate PDF
      </button>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Delete sitting number ${followupToDelete.number}?`}
      >
        <div>
          Are you sure you want to delete {followupToDelete.number} sitting for
          this complaint?
        </div>
        <button
          className="bg-red-700 text-white font-semibold p-2 rounded rounded-md mt-5 hover:cursor-pointer hover:bg-red-800"
          onClick={() => deleteFollowup(followupToDelete.id)}
        >
          Delete
        </button>
      </Modal>
    </div>
  ) : (
    <div className="p-4 flex justify-center items-center">
      <h2 className="text-3xl text-[var(--txt)] font-semibold mb-4">
        No Active complaint/followup
      </h2>
    </div>
  );
};

export default Followup;
