import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const MicrocementForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    projectType: '',
    space: [],
    area: '',
    surface: [],
    name: '',
    email: '',
    phone: ''
  });

  const userTypes = [
    { label: 'Architect', image: '/images/mockups/architect.jpg' },
    { label: 'Interior Designer', image: '/images/mockups/interior-designer.jpg' },
    { label: 'Investor', image: '/images/mockups/investor.jpg' },
    { label: 'Contractor', image: '/images/mockups/contractor.jpg' }
  ];

  const projectTypes = [
    { label: 'For a client', image: '/images/mockups/for-a-client.jpg' },
    { label: 'For myself', image: '/images/mockups/for-myself.jpg' }
  ];

  const spaceOptions = [
    { label: 'Floor', image: '/images/mockups/floor.jpg' },
    { label: 'Wall', image: '/images/mockups/wall.jpg' },
    { label: 'Stairs', image: '/images/mockups/stairs.jpg' },
    { label: 'Bathroom', image: '/images/mockups/bathroom.jpg' },
    { label: 'Shower', image: '/images/mockups/shower.jpg' },
    { label: 'Kitchen Counter', image: '/images/mockups/kitchen.jpg' },
    { label: 'Pool', image: '/images/mockups/pool.jpg' },
    { label: 'Other', image: '/images/mockups/drugo.jpg' }
  ];

  const surfaceOptions = [
    { label: 'Ceramic', image: '/images/mockups/ceramic.jpg' },
    { label: 'Screed (cement)', image: '/images/mockups/screed.jpg' },
    { label: 'Wood', image: '/images/mockups/wood.jpg' },
    { label: 'Finished Concrete', image: '/images/mockups/concrete-finished.jpg' },
    { label: 'Raw Concrete', image: '/images/mockups/concrete-raw.jpg' },
    { label: 'OSB Boards', image: '/images/mockups/osb.jpg' },
    { label: 'Drywall', image: '/images/mockups/drywall.jpg' },
    { label: 'Fermacell', image: '/images/mockups/fermacell.jpg' },
    { label: 'Plaster', image: '/images/mockups/plaster.jpg' },
    { label: 'Other / Not sure', image: '/images/mockups/other.jpg' }
  ];

  const handleSelect = (field, value) => {
    if (Array.isArray(formData[field])) {
      const updated = formData[field].includes(value)
        ? formData[field].filter(item => item !== value)
        : [...formData[field], value];
      setFormData({ ...formData, [field]: updated });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">1. To better assist you, please tell us who you are?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {userTypes.map((type) => (
                <div
                  key={type.label}
                  className={`cursor-pointer border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md ${formData.userType === type.label ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                  onClick={() => handleSelect('userType', type.label)}
                >
                  <img src={type.image} alt={type.label} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center font-medium text-gray-800">{type.label}</div>
                </div>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">2. Are you working on this project for a client or for yourself?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projectTypes.map((type) => (
                <div
                  key={type.label}
                  className={`cursor-pointer border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md ${formData.projectType === type.label ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                  onClick={() => handleSelect('projectType', type.label)}
                >
                  <img src={type.image} alt={type.label} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center font-medium text-gray-800">{type.label}</div>
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">3. For which space are you planning microcement?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {spaceOptions.map((space) => (
                <div
                  key={space.label}
                  className={`cursor-pointer border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md ${formData.space.includes(space.label) ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                  onClick={() => handleSelect('space', space.label)}
                >
                  <img src={space.image} alt={space.label} className="w-full h-40 object-cover" />
                  <div className="p-4 text-center font-medium text-gray-800">{space.label}</div>
                </div>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">4. What is the approximate area you plan to treat (in m²)?</h3>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <input
                type="number"
                value={formData.area}
                onChange={(e) => handleSelect('area', e.target.value)}
                placeholder="Enter area in m²"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              {formData.area && (
                <div className="mt-4 text-center">
                  <span className="text-4xl font-bold text-blue-600">{formData.area}</span>
                  <span className="ml-2 text-xl text-gray-600">m²</span>
                </div>
              )}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">5. What is the current substrate on these surfaces?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {surfaceOptions.map((surface) => (
                <div
                  key={surface.label}
                  className={`cursor-pointer border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md ${formData.surface.includes(surface.label) ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                  onClick={() => handleSelect('surface', surface.label)}
                >
                  <img src={surface.image} alt={surface.label} className="w-full h-40 object-cover" />
                  <div className="p-4 text-center font-medium text-gray-800">{surface.label}</div>
                </div>
              ))}
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">6. Please enter your contact information:</h3>
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleSelect('name', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleSelect('email', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleSelect('phone', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const isNextEnabled = () => {
    switch (step) {
      case 1: return !!formData.userType;
      case 2: return !!formData.projectType;
      case 3: return formData.space.length > 0;
      case 4: return formData.area.trim() !== '';
      case 5: return formData.surface.length > 0;
      case 6: return formData.name && formData.email;
      default: return false;
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-600 p-4 text-white flex items-center gap-4">
        <img src="/images/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
        <div>
          <h2 className="text-xl font-bold leading-tight">Microcement Questionnaire</h2>
          <p className="text-sm">Fill out the form for a detailed offer</p>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200">
        <div className="bg-blue-600 h-2" style={{ width: `${(step / 6) * 100}%` }} />
      </div>

      <div className="flex items-start p-6">
        <img src="/images/avatar.jpg" alt="Assistant" className="w-12 h-12 rounded-full mr-4" />
        <div className="bg-gray-100 p-4 rounded-xl text-sm shadow relative">
          <div className="absolute left-0 top-4 w-3 h-3 bg-gray-100 transform rotate-45 -translate-x-1" />
          Welcome! I’m your virtual microcement assistant.
        </div>
      </div>

      <div className="px-6 pb-6">{renderStep()}</div>

      <div className="flex justify-between px-6 pb-6">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="px-4 py-2 text-blue-600 disabled:text-gray-400 flex items-center gap-1"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={() => step < 6 ? setStep(step + 1) : alert('Form submitted!')}
          disabled={!isNextEnabled()}
          className={`px-4 py-2 rounded flex items-center gap-2 text-white ${isNextEnabled() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {step < 6 ? 'Next' : 'Submit'} {step < 6 ? <ChevronRight size={16} /> : <Send size={16} />}
        </button>
      </div>
    </div>
  );
};

export default MicrocementForm;
