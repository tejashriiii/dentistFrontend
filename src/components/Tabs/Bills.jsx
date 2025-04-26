import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Bills = ({ activeComplaint }) => {
  const [billEntries, setBillEntries] = useState({});
  const [consultationPresent, setConsulationPresent] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [finalCost, setFinalCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [fetchedDiscount, setFetchedDiscount] = useState(0);

  const fetchBill = async () => {
    try {
      const FETCH_BILL_URL = `${import.meta.env.VITE_API_URL}/p/diagnosis/${activeComplaint.id}/`;
      const response = await fetch(FETCH_BILL_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      let assortedBill = {};
      let cost = 0;
      const data = await response.json();
      data.diagnosis.forEach((element) => {
        cost += Number(element.price);
        if (Object.keys(assortedBill).indexOf(element.treatment_name) === -1) {
          assortedBill[element.treatment_name] = {
            tooth_number: [element.tooth_number],
            price: Number(element.price),
          };
        } else {
          assortedBill[element.treatment_name].tooth_number = [
            ...assortedBill[element.treatment_name].tooth_number,
            element.tooth_number,
          ];
          assortedBill[element.treatment_name].price += Number(element.price);
        }
      });

      // Checking if consultation has been set and removing it
      if (Object.keys(assortedBill).indexOf("Consultation") !== -1)
        setConsulationPresent(true);
      else setConsulationPresent(false);

      // Converting to array for dynamic rendering
      const billArray = Object.entries(assortedBill).map(([name, details]) => ({
        name,
        price: details.price,
        tooth_number: details.tooth_number,
      }));
      setBillEntries(billArray);
      setTotalCost(cost);

      if (!response.ok) throw new Error("Failed to fetch patient's bill");
    } catch (error) {
      console.log(error);
      if (error.error) toast.error(error.error);
      else toast.error(error);
    }
  };

  const fetchDiscount = async () => {
    try {
      const FETCH_DISCOUNT_URL = `${import.meta.env.VITE_API_URL}/p/bill/discount/${activeComplaint.id}/`;
      const response = await fetch(FETCH_DISCOUNT_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch patient's discount");
      const data = await response.json();
      if (Object.keys(data.discount).length === 0) {
        setDiscount(0);
        setFetchedDiscount(0);
      } else {
        setDiscount(data.discount.discount);
        setFetchedDiscount(data.discount.discount);
      }
    } catch (error) {
      console.log(error);
      if (error.error) toast.error(error.error);
      else toast.error(error);
    }
  };

  const addConsultationCharges = async () => {
    try {
      const ADD_CONSULTATION_URL = `${import.meta.env.VITE_API_URL}/p/bill/consultation/`;
      const response = await fetch(ADD_CONSULTATION_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ complaint: activeComplaint.id }),
      });

      const data = response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        fetchBill();
      }
    } catch (error) {
      console.log(error);
      if (error.error) toast.error(error.error);
      else toast.error(error);
    }
  };

  const saveDiscount = async () => {
    try {
      const SAVE_DISCOUNT_URL = `${import.meta.env.VITE_API_URL}/p/bill/discount/`;
      const response = await fetch(SAVE_DISCOUNT_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          complaint: activeComplaint.id,
          discount: discount,
        }),
      });

      const data = response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        fetchDiscount();
      }
    } catch (error) {
      console.log(error);
      if (error.error) toast.error(error.error);
      else toast.error(error);
    }
  };

  useEffect(() => {
    fetchBill();
    fetchDiscount();
  }, [activeComplaint]);

  useEffect(() => {
    setFinalCost(totalCost - discount);
  }, [fetchedDiscount, totalCost]);

  return Object.keys(activeComplaint).length > 0 ? (
    <div className="p-4">
      <h2 className="block text-2xl font-bold mb-4 text-[var(--txt)]">
        Billing Summary
      </h2>

      <div className="mb-2 md:mb-4">
        {billEntries.length > 0 ? (
          <div className="my-4 md:my-6 p-3 md:p-4 pb-4 md:pb-6 border-1 border-[var(--lightgreen)] rounded-lg bg-[var(--bg)]">
            <h3 className="text-[var(--darkergreen)] text-lg md:text-xl font-semibold">
              Treatments
            </h3>
            <ul className="mt-2">
              {billEntries.map((treatment, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b border-[var(--darkgreen)] py-2 md:py-4 text-sm md:text-base"
                >
                  <span>{treatment.name || "Unnamed Treatment"}</span>
                  <span>₹{treatment.price || 0}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="italic text-gray-600 text-sm md:text-base">
            No treatments selected
          </p>
        )}
      </div>

      <div className="mb-3 md:mb-4">
        {!consultationPresent && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
            <span className="text-red-700 text-base md:text-lg font-semibold">
              Consultation charges not added yet:
            </span>
            <button
              className="bg-[var(--darkgreen)] text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base hover:bg-[var(--darkergreen)] hover:cursor-pointer"
              onClick={addConsultationCharges}
            >
              Add Consultation Charges
            </button>
          </div>
        )}
      </div>
      <div className="mb-3 md:mb-4 flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
        <label className="block font-semibold mb-1 md:mb-2 text-[var(--darkergreen)] text-sm md:text-base">
          Discount
        </label>
        <div className="flex flex-1 space-x-2">
          <input
            type="number"
            className="w-full md:w-7/8 px-2 md:px-3 py-1 md:py-2 border rounded-md border-[var(--lightgreen)] text-sm md:text-base"
            value={discount}
            onChange={(e) =>
              setDiscount(Math.max(0, Number(e.target.value) || 0))
            }
            placeholder="Enter discount amount"
          />
          <button
            className="bg-[var(--darkgreen)] text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base hover:bg-[var(--darkergreen)] hover:cursor-pointer"
            onClick={saveDiscount}
          >
            Save
          </button>
        </div>
      </div>

      <div className="pt-2 md:pt-4 text-lg md:text-xl text-[var(--txt)] space-y-2 md:space-y-4">
        <div className="font-semibold">
          Total Cost:{" "}
          <span className="text-[var(--darkergreen)] float-right">
            ₹{totalCost}
          </span>
        </div>
        <div className="font-semibold">
          Final Cost:
          <span className="text-[var(--darkergreen)] float-right">
            ₹{finalCost}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4 flex justify-center items-center">
      <h2 className="text-3xl text-[var(--txt)] font-semibold mb-4">
        No Active complaint/followup
      </h2>
    </div>
  );
};
export default Bills;
