// useSearchForm.js
/**
 * useSearchForm Hook.
 * This custom hook manages the state and validation of a search form.
 * It provides form state, change handlers, and validation status.
 *
 * @returns {Object} The state and handlers for the search form.
 */

import {useEffect, useState} from 'react'; // Import necessary hooks from React
import {useNavigate} from 'react-router-dom'; // Import navigation hook from react-router-dom
import {useAuth} from './AuthContext'; // Import authentication context hook

// Custom hook to manage search form state and validation
export const useSearchForm = () => {
  // State variables for form fields
  const [companyINN, setCompanyINN] = useState('');
  const [tonality, setTonality] = useState('Любая');
  const [documentCount, setDocumentCount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkboxStates, setCheckboxStates] = useState({
    maxCompleteness: false,
    businessMentions: false,
    mainRole: false,
    riskFactorsOnly: false,
    includeMarketNews: true,
    includeAnnouncements: true,
    includeNewsSummaries: true,
  });

  // Get authentication status from context
  const { isLoggedIn } = useAuth();
  // Get navigate function for programmatic navigation
  const navigate = useNavigate();

  // Redirect to auth page if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

  // State for form validation status
  const [isFormValid, setIsFormValid] = useState(false);

  // Effect to validate the form when dependencies change
  useEffect(() => {
    // Check if required fields are filled
    const isValid = companyINN && documentCount && startDate && endDate;
    // Update form validation status
    setIsFormValid(isValid);
  }, [companyINN, documentCount, startDate, endDate, checkboxStates]);

  // Handler for checkbox state changes
  const handleCheckboxChange = (event) => {
    // Get checkbox name and checked status
    const { name, checked } = event.target;
    setCheckboxStates(prevState => ({
      ...prevState,
      // Update checkbox state
      [name]: checked,
    }));
  };

  // Return form state and handlers
  return {
    companyINN,
    setCompanyINN,
    tonality,
    setTonality,
    documentCount,
    setDocumentCount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    checkboxStates,
    setCheckboxStates,
    handleCheckboxChange,
    isFormValid,
    navigate,
  };
};
