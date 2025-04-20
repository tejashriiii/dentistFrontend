"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CalendarCheck, FileText, Clock, AlertCircle } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PatientDashboard = () => {
  const [patientInfo, setPatientInfo] = useState({})
  const [medicalDetails, setMedicalDetails] = useState({
    allergies: [],
    illnesses: [],
    smoking: false,
    drinking: false,
    tobacco: false,
  })
  const [patientHistory, setPatientHistory] = useState([])
  const [upcomingFollowups, setUpcomingFollowups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true)
        const token = sessionStorage.getItem("jwt")

        // Fetch patient details
        const detailsResponse = await fetch(`${import.meta.env.VITE_API_URL}/p/details/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!detailsResponse.ok) throw new Error("Failed to fetch patient details")
        const detailsData = await detailsResponse.json()
        setPatientInfo(detailsData.details || {})

        // Fetch medical details
        const medicalResponse = await fetch(`${import.meta.env.VITE_API_URL}/p/medical_details/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (medicalResponse.ok) {
          const medicalData = await medicalResponse.json()
          setMedicalDetails(
            medicalData.medical_details || {
              allergies: [],
              illnesses: [],
              smoking: false,
              drinking: false,
              tobacco: false,
            },
          )
        }

        // Fetch patient history
        const historyResponse = await fetch(`${import.meta.env.VITE_API_URL}/p/history/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (historyResponse.ok) {
          const historyData = await historyResponse.json()
          setPatientHistory(historyData.history || [])
        }

        // Fetch upcoming followups
        const followupsResponse = await fetch(`${import.meta.env.VITE_API_URL}/p/upcoming_followups/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (followupsResponse.ok) {
          const followupsData = await followupsResponse.json()
          setUpcomingFollowups(followupsData.followups || [])
        }
      } catch (err) {
        console.error("Error fetching patient data:", err)
        setError(err.message)
        toast.error("Failed to load patient data")
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
  }, [])

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return "N/A"
    return timeString.split(".")[0].slice(0, 5)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--darkgreen)] mx-auto"></div>
          <p className="mt-4 text-[var(--txt)] font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-red-500 font-medium">Error: {error}</p>
          <Link to="/" className="mt-4 inline-block px-4 py-2 bg-[var(--darkgreen)] text-white rounded-md">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[var(--txt)] my-8">Patient Dashboard</h1>

        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--darkergreen)]">{patientInfo.name || "Patient"}</h2>
              <p className="text-gray-600">Phone: {patientInfo.phonenumber || "N/A"}</p>
              <p className="text-gray-600">DOB: {formatDate(patientInfo.date_of_birth)}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/appointment"
                className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded-md hover:bg-[var(--darkergreen)] transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/appointment"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--darkergreen)]">Book Appointment</h3>
                <p className="text-gray-600">Schedule your next visit</p>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--darkergreen)]">Next Follow-up</h3>
                <p className="text-gray-600">
                  {upcomingFollowups.length > 0 ? formatDate(upcomingFollowups[0].date) : "No upcoming follow-ups"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--darkergreen)]">Medical Records</h3>
                <p className="text-gray-600">{patientHistory.length} past visits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--darkergreen)] mb-4">Medical Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg text-[var(--darkergreen)]">Allergies</h3>
              {medicalDetails.allergies && medicalDetails.allergies.length > 0 ? (
                <ul className="mt-2 pl-2">
                  {medicalDetails.allergies.map((allergy, index) => (
                    <li key={index} className="flex items-center py-1">
                      <span className="mr-2 font-semibold">{index + 1}.</span>
                      <span>{allergy}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 py-2 italic">No allergies recorded</p>
              )}
            </div>

            <div>
              <h3 className="font-bold text-lg text-[var(--darkergreen)]">Past Illnesses</h3>
              {medicalDetails.illnesses && medicalDetails.illnesses.length > 0 ? (
                <ul className="mt-2 pl-2">
                  {medicalDetails.illnesses.map((illness, index) => (
                    <li key={index} className="flex items-center py-1">
                      <span className="mr-2 font-semibold">{index + 1}.</span>
                      <span>{illness}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 py-2 italic">No past illnesses recorded</p>
              )}
            </div>

            <div>
              <h3 className="font-bold text-lg text-[var(--darkergreen)]">Habits</h3>
              <div className="mt-2 pl-2">
                <p className="py-1">
                  <span className="font-semibold">Smoking:</span> {medicalDetails.smoking ? "Yes" : "No"}
                </p>
                <p className="py-1">
                  <span className="font-semibold">Alcohol:</span> {medicalDetails.drinking ? "Yes" : "No"}
                </p>
                <p className="py-1">
                  <span className="font-semibold">Tobacco:</span> {medicalDetails.tobacco ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Follow-ups Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--darkergreen)] mb-4">Upcoming Follow-ups</h2>
          {upcomingFollowups.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                  <tr>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Time</th>
                    <th className="border border-gray-300 p-2">Title</th>
                    <th className="border border-gray-300 p-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingFollowups.map((followup, index) => (
                    <tr key={index} className="even:bg-gray-100 odd:bg-white">
                      <td className="border border-gray-300 p-2">{formatDate(followup.date)}</td>
                      <td className="border border-gray-300 p-2">{formatTime(followup.time)}</td>
                      <td className="border border-gray-300 p-2">{followup.title || "N/A"}</td>
                      <td className="border border-gray-300 p-2">{followup.description || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No upcoming follow-ups scheduled</p>
          )}
        </div>

        {/* Treatment History Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[var(--darkergreen)] mb-4">Treatment History</h2>
          {patientHistory.length > 0 ? (
            <div className="space-y-4">
              {patientHistory.map((entry, index) => {
                const [id, data] = Object.entries(entry)[0]
                const { complaint_details, followups } = data

                return (
                  <div key={id} className="my-6 p-4 pb-6 border-1 border-[var(--lightgreen)] rounded-lg bg-[var(--bg)]">
                    <div>
                      <p className="font-semibold text-xl text-[var(--darkergreen)]">
                        {`${index + 1}. ${complaint_details.complaint}`}
                      </p>
                      <p className="pl-5 pt-1 text-sm text-gray-500">Date: {formatDate(complaint_details.date)}</p>
                      <p className="pl-5 pt-1 text-sm text-gray-700">
                        {complaint_details.description || "No description available"}
                      </p>
                    </div>

                    {followups.length > 0 && (
                      <div className="pl-5 mt-3">
                        <h3 className="text-md font-semibold text-gray-700">Follow-ups:</h3>
                        <ul className="mt-1 space-y-2">
                          {followups.map((followup) => (
                            <li
                              key={followup.number}
                              className="flex justify-between items-center border-b pb-2 last:border-b-0"
                            >
                              <div>
                                <p className="text-gray-800">{followup.title}</p>
                                <p className="text-sm text-gray-500">Date: {formatDate(followup.date)}</p>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  followup.completed === "Yes"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {followup.completed === "Yes" ? "Completed" : "Pending"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">No treatment history available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard

