import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Globe } from 'lucide-react';

const MicrocementForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('hr');
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
    hr: {
      title: "Microcement upitnik",
      subtitle: "Ispunite upitnik za detaljnu ponudu",
      greeting: "Dobrodošli! Ja sam vaš virtualni asistent za microcement.",
      next: "Dalje",
      back: "Natrag",
      send: "Pošalji",
      step: "Korak",
      of: "od",
      thankYou: "Hvala vam što ste ispunili naš upitnik!",
      dataReceived: "Vaši podaci su uspješno zaprimljeni. Kontaktirat ćemo vas uskoro s više informacija.",
      newForm: "Ispunite novi upitnik",
      selectOption: "Odaberite opciju"
    },
    en: {
      title: "Microcement Questionnaire",
      subtitle: "Fill out the form for a detailed offer",
      greeting: "Welcome! I'm your virtual microcement assistant.",
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

  const getImagePath = (label) => {
    const slug = label.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `/images/mockups/${slug}.jpg`;
  };

  const formSteps = [
    {
      question: language === 'hr' ? "Tko ste vi?" : "Who are you?",
      field: "userType",
      type: "checkbox",
      options: language === 'hr'
        ? ["Arhitekt", "Dizajner interijera", "Investitor", "Izvođač"]
        : ["Architect", "Interior Designer", "Investor", "Contractor"]
    },
    {
      question: language === 'hr' ? "Radite li za klijenta ili sebe?" : "Are you working for a client or yourself?",
      field: "projectType",
      type: "radio",
      options: language === 'hr' ? ["Za klijenta", "Za sebe"] : ["For a client", "For myself"]
    },
    {
      question: language === 'hr' ? "Za koji prostor planirate microcement?" : "What area is microcement for?",
      field: "space",
      type: "checkbox",
      options: language === 'hr'
        ? ["Pod", "Zid", "Stepenice", "Kupaonica", "Tuš zona", "Kuhinjski pult", "Bazen", "Drugo"]
        : ["Floor", "Wall", "Stairs", "Bathroom", "Shower", "Kitchen Counter", "Pool", "Other"]
    },
    {
      question: language === 'hr' ? "Kolika je površina (m2)?" : "What is the surface area (m²)?",
      field: "area",
      type: "number"
    },
    {
      question: language === 'hr' ? "Koja je podloga?" : "What’s the current surface?",
      field: "surface",
      type: "checkbox",
      options: language === 'hr'
        ? ["Keramika", "Estrih", "Drvo", "Beton obrađen", "Beton sirov", "OSB", "Knauf", "Fermacell", "Žbuka", "Drugo"]
        : ["Ceramic", "Screed", "Wood", "Finished Concrete", "Raw Concrete", "OSB", "Drywall", "Fermacell", "Plaster", "Other"]
    },
    {
      question: language === 'hr' ? "Kontakt podaci" : "Contact Information",
      field: "contact",
      type: "contact",
      fields: {
        name: language === 'hr' ? "Ime i prezime" : "Full Name",
        email: "Email",
        phone: language === 'hr' ? "Telefon" : "Phone"
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{translations[language].title}</h2>
        <button onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} className="text-sm flex items-center gap-1">
          <Globe size={16} /> {language.toUpperCase()}
        </button>
      </div>

      {isLanguageMenuOpen && (
        <div className="mb-4 flex gap-2">
          {Object.keys(translations).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setIsLanguageMenuOpen(false); }}
              className={`px-3 py-1 rounded ${language === lang ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <h3 className="mb-4 text-lg font-medium">{current.question}</h3>

      <div className="space-y-4">
        {(current.type === 'checkbox' || current.type === 'radio') && current.options.map(option => (
          <div key={option} className="flex gap-4 items-center">
            {current.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={formData[current.field]?.includes(option)}
                onChange={() => handleCheckboxChange(current.field, option)}
              />
            ) : (
              <input
                type="radio"
                name={current.field}
                checked={formData[current.field] === option}
                onChange={() => handleInputChange(current.field, option)}
              />
            )}
            <span>{option}</span>
            <img src={getImagePath(option)} alt={option} className="h-20 object-cover rounded border" />
          </div>
        ))}

        {current.type === 'number' && (
          <input
            type="number"
            value={formData[current.field] || ''}
            onChange={(e) => handleInputChange(current.field, e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="0"
          />
        )}

        {current.type === 'contact' && (
          <>
            <input
              type="text"
              placeholder={current.fields.name}
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="email"
              placeholder={current.fields.email}
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="tel"
              placeholder={current.fields.phone}
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full border p-2 rounded"
            />
          </>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-1 text-blue-500 disabled:text-gray-300"
        >
          <ChevronLeft size={16} /> {translations[language].back}
        </button>
        <button
          onClick={handleNext}
          disabled={!isValid()}
          className={`px-4 py-2 flex items-center gap-1 rounded text-white ${isValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'}`}
        >
          {isLast ? translations[language].send : translations[language].next} {isLast ? <Send size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <p className="text-center text-sm mt-4 text-gray-500">
        {translations[language].step} {currentStep + 1} {translations[language].of} {formSteps.length}
      </p>
    </div>
  );
};

export default MicrocementForm;
