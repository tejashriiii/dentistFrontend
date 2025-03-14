import React, { useState, useEffect } from 'react';

function About() {
    // Get the current patient name from the parent component
    const getCurrentPatient = () => {
        const patientSelect = document.querySelector('select');
        return patientSelect ? patientSelect.value : '';
    };
    
    const currentPatient = getCurrentPatient();
    
    // Initialize states with patient-specific localStorage keys
    const [pastIllnesses, setPastIllnesses] = useState(() => {
        const saved = localStorage.getItem(`pastIllnesses_${currentPatient}`);
        return saved ? JSON.parse(saved) : [];
    });
    
    const [allergies, setAllergies] = useState(() => {
        const saved = localStorage.getItem(`allergies_${currentPatient}`);
        return saved ? JSON.parse(saved) : [];
    });
    
    const [smokes, setSmokes] = useState(() => 
        localStorage.getItem(`smokes_${currentPatient}`) || null
    );
    
    const [alcohol, setAlcohol] = useState(() => 
        localStorage.getItem(`alcohol_${currentPatient}`) || null
    );
    
    const [tobacco, setTobacco] = useState(() => 
        localStorage.getItem(`tobacco_${currentPatient}`) || null
    );
    
    const [patientHistory, setPatientHistory] = useState(null);
    const [patientName, setPatientName] = useState(currentPatient);
    
    // Watch for patient changes in the parent component
    useEffect(() => {
        const patientSelect = document.querySelector('select');
        
        if (patientSelect) {
            const handlePatientChange = () => {
                const newPatient = patientSelect.value;
                setPatientName(newPatient);
                
                // Load data for the new patient
                const savedPastIllnesses = localStorage.getItem(`pastIllnesses_${newPatient}`);
                setPastIllnesses(savedPastIllnesses ? JSON.parse(savedPastIllnesses) : []);
                
                const savedAllergies = localStorage.getItem(`allergies_${newPatient}`);
                setAllergies(savedAllergies ? JSON.parse(savedAllergies) : []);
                
                setSmokes(localStorage.getItem(`smokes_${newPatient}`) || null);
                setAlcohol(localStorage.getItem(`alcohol_${newPatient}`) || null);
                setTobacco(localStorage.getItem(`tobacco_${newPatient}`) || null);
                
                // Reset patient history
                setPatientHistory(null);
            };
            
            patientSelect.addEventListener('change', handlePatientChange);
            
            return () => {
                patientSelect.removeEventListener('change', handlePatientChange);
            };
        }
    }, []);
    
    // Update localStorage whenever states change - use patient-specific keys
    useEffect(() => {
        const patient = getCurrentPatient();
        localStorage.setItem(`pastIllnesses_${patient}`, JSON.stringify(pastIllnesses));
    }, [pastIllnesses]);
    
    useEffect(() => {
        const patient = getCurrentPatient();
        localStorage.setItem(`allergies_${patient}`, JSON.stringify(allergies));
    }, [allergies]);
    
    useEffect(() => {
        if (smokes !== null) {
            const patient = getCurrentPatient();
            localStorage.setItem(`smokes_${patient}`, smokes);
        }
    }, [smokes]);
    
    useEffect(() => {
        if (alcohol !== null) {
            const patient = getCurrentPatient();
            localStorage.setItem(`alcohol_${patient}`, alcohol);
        }
    }, [alcohol]);
    
    useEffect(() => {
        if (tobacco !== null) {
            const patient = getCurrentPatient();
            localStorage.setItem(`tobacco_${patient}`, tobacco);
        }
    }, [tobacco]);

    // Custom handlers for adding and removing items
    const handleAddItem = (setter, value, inputId) => {
        if (value && value.trim() !== '') {
            setter(prev => [...prev, value.trim()]);
            document.getElementById(inputId).value = '';
        }
    };

    const handleRemoveItem = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    // Simulated patient history lookup
    
      
    return (
        <div className="flex flex-col space-y-6">
            <div className="text-lg font-medium text-gray-700 mb-2">
                Patient: <span className="text-[#4a6d4a]">{getCurrentPatient()}</span>
            </div>
            
            {/* Past Illnesses and Allergies inputs */}
            <div className="mt-4 grid grid-cols-1 gap-6">
                {[
                    { label: 'Past Illnesses', state: pastIllnesses, setter: setPastIllnesses, id: 'illnessInput' },
                    { label: 'Allergies', state: allergies, setter: setAllergies, id: 'allergyInput' }
                ].map(({ label, state, setter, id }) => (
                    <div key={id} className="w-1/2">
                        <label className="block font-semibold text-gray-700">{label}</label>
                        <div className="flex mt-2">
                            <input 
                                id={id} 
                                type="text" 
                                className="border px-3 py-2 rounded-lg flex-grow" 
                                placeholder={`Add ${label.toLowerCase()}`} 
                            />
                            <button 
                                onClick={() => handleAddItem(setter, document.getElementById(id)?.value, id)} 
                                className="ml-2 bg-[#87AB87] text-white px-3 py-2 rounded-lg"
                            >
                                Add
                            </button>
                        </div>
                        
                        {/* Numbered list of items */}
                        {state.length > 0 && (
                            <div className="mt-3">
                                <div>
                                    {state.map((item, index) => (
                                        <div key={index} className="flex items-center py-1">
                                            <span className="mr-2 font-semibold">{index + 1}.</span>
                                            <span>{item}</span>
                                            <button 
                                                onClick={() => handleRemoveItem(setter, index)}
                                                className="ml-5 text-red-500 font-bold"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Yes/No questions */}
            <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                    { label: 'Smokes?', state: smokes, setter: setSmokes }, 
                    { label: 'Consumes Alcohol?', state: alcohol, setter: setAlcohol },
                    { label: 'Eats Tobacco?', state: tobacco, setter: setTobacco }
                ].map(({ label, state, setter }) => (
                    <div key={label} className="flex flex-col">
                        <label className="block font-semibold text-gray-700">{label}</label>
                        <div className="flex space-x-2">
                            {['Yes', 'No'].map((option) => (
                                <button 
                                    key={option} 
                                    className={`px-4 mr-5 mt-3 py-2 rounded-lg ${state === option ? 'bg-[#4a6d4a] text-white' : 'bg-gray-300'}`} 
                                    onClick={() => setter(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            
            
            {/* Health summary */}
            {(pastIllnesses.length > 0 || allergies.length > 0) && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold text-gray-700 mb-3">Patient Health Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium text-[#4a6d4a]">Past Illnesses</h4>
                            {pastIllnesses.length > 0 ? (
                                <div className="mt-2 pl-2">
                                    {pastIllnesses.map((illness, index) => (
                                        <div key={index} className="flex items-center py-1">
                                            <span className="mr-2 font-semibold">{index + 1}.</span>
                                            <span>{illness}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No past illnesses recorded</p>
                            )}
                        </div>
                        <div>
                            <h4 className="font-medium text-[#4a6d4a]">Allergies</h4>
                            {allergies.length > 0 ? (
                                <div className="mt-2 pl-2">
                                    {allergies.map((allergy, index) => (
                                        <div key={index} className="flex items-center py-1">
                                            <span className="mr-2 font-semibold">{index + 1}.</span>
                                            <span>{allergy}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No allergies recorded</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default About;