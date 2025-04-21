import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Globe } from 'lucide-react';

const MicrocementForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    userType: [],
    projectType: '',
    space: [],
    area: '',
    surface: [],
    name: '',
    email: '',
    phone: ''
  });
  const [completed, setCompleted] = useState(false);

  const translations = {
    en: {
      title: "Microcement Questionnaire",
      subtitle: "Fill out the form for a detailed offer",
      greeting: "Welcome! I’m your virtual microcement assistant.",
      next: "Next",
      back: "Back",
      send: "Submit",
      step: "Step",
      of: "of",
      thankYou: "Thank you for completing our questionnaire!",
      dataReceived: "Your information has been successfully received. We will contact you soon with more information.",
      newForm: "Fill out a new questionnaire",
      selectOption: "Select an option"
    }
  };

  const formSteps = [
    {
      question: "To better assist you, please tell us who you are?",
      field: "userType",
      type: "checkbox",
      options: ["Architect", "Interior Designer", "Investor", "Contractor"]
    },
    {
      question: "Are you working on this project for a client or for yourself?",
      field: "projectType",
      type: "radio",
      options: ["For a client", "For myself"]
    },
    {
      question: "For which space are you planning microcement?",
      field: "space",
      type: "checkbox",
      options: ["Floor", "Wall", "Stairs", "Bathroom", "Shower", "Kitchen Counter", "Pool", "Other"]
    },
    {
      question: "What is the approximate area you plan to treat (in m²)?",
      field: "area",
      type: "number"
    },
    {
      question: "What is the current substrate on these surfaces?",
      field: "surface",
      type: "checkbox",
      options: ["Ceramic", "Screed", "Wood", "Finished Concrete", "Raw Concrete", "OSB", "Drywall", "Fermacell", "Plaster", "Other"]
    },
    {
      question: "Please enter your contact information:",
      field: "contact",
      type: "contact",
      fields: {
        name: "Full name",
        email: "Email",
        phone: "Phone number"
      }
    }
  ];

  const current = formSteps[currentStep];
  const isLast = currentStep === formSteps.length - 1;

  const isValid = () => {
    if (!current) return false;
    if (current.type === 'contact') return formData.name && formData.email;
    if (current.type === 'checkbox') return formData[current.field]?.length > 0;
    return !!formData[current.field];
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: updatedValues });
  };

  const handleNext = () => {
    if (isLast) return setCompleted(true);
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const getImagePath = (label) => {
    return `/images/mockups/${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`;
  };

  if (completed) {
    return (
      <div className="text-center p-8">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">{translations[language].thankYou}</h2>
        <p>{translations[language].dataReceived}</p>
        <button
          onClick={() => {
            setCompleted(false);
            setCurrentStep(0);
            setFormData({ userType: [], projectType: '', space: [], area: '', surface: [], name: '', email: '', phone: '' });
          }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {translations[language].newForm}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <img src="/images/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-xl font-bold">{translations[language].title}</h2>
            <p className="text-sm">{translations[language].subtitle}</p>
          </div>
        </div>
        <button onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} className="text-sm bg-white text-blue-600 rounded px-2 py-1 flex items-center">
          <Globe size={16} className="mr-1" /> {language.toUpperCase()}
        </button>
      </div>

      <div className="w-full bg-gray-200 h-2">
        <div className="bg-blue-600 h-2" style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}></div>
      </div>

      {isLanguageMenuOpen && (
        <div className="p-4 bg-gray-100 flex gap-2">
          {Object.keys(translations).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setIsLanguageMenuOpen(false); }}
              className={`px-3 py-1 rounded ${language === lang ? 'bg-blue-500 text-white' : 'bg-white border'}`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div className="p-6">
        {/* Assistant Greeting */}
        <div className="flex gap-4 mb-6">
          <img src="/images/avatar.jpg" alt="Avatar" className="w-12 h-12 rounded-full" />
          <div className="bg-gray-100 p-4 rounded-xl shadow text-sm">{translations[language].greeting}</div>
        </div>

        {/* Question */}
        <h3 className="text-xl font-semibold mb-4">{current.question}</h3>

        {/* Option Cards */}
        {(current.type === 'checkbox' || current.type === 'radio') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {current.options.map(option => (
              <div
                key={option}
                onClick={() => current.type === 'checkbox'
                  ? handleCheckboxChange(current.field, option)
                  : handleInputChange(current.field, option)}
                className={`cursor-pointer border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md ${
                  (current.type === 'checkbox' && formData[current.field]?.includes(option)) ||
                  (current.type === 'radio' && formData[current.field] === option)
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-gray-200'
                }`}
              >
                <img src={getImagePath(option)} alt={option} className="w-full h-48 object-cover" />
                <div className="p-4 text-center font-medium text-gray-800">{option}</div>
              </div>
            ))}
          </div>
        )}

        {current.type === 'number' && (
          <input
            type="number"
            value={formData[current.field] || ''}
            onChange={(e) => handleInputChange(current.field, e.target.value)}
            placeholder="Enter area in m²"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg"
          />
        )}

        {current.type === 'contact' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder={current.fields.name}
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder={current.fields.email}
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              placeholder={current.fields.phone}
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 text-blue-600 hover:underline disabled:text-gray-400"
          >
            <ChevronLeft size={16} className="inline mr-1" /> {translations[language].back}
          </button>

          <button
            onClick={handleNext}
            disabled={!isValid()}
            className={`px-4 py-2 rounded flex items-center gap-2 text-white ${
              isValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLast ? translations[language].send : translations[language].next} {isLast ? <Send size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Step Indicator */}
        <div className="text-center text-sm text-gray-500 mt-4">
          {translations[language].step} {currentStep + 1} {translations[language].of} {formSteps.length}
        </div>
      </div>
    </div>
  );
};

export default MicrocementForm;
