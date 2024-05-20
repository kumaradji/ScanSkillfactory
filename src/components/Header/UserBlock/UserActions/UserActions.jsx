// UserActions.jsx
/**
 * UserActions Component.
 * This component is responsible for fetching and displaying the user's company usage data.
 * It shows the number of companies used and the company limit for the user's account.
 * While the data is being fetched, a loading icon is displayed.
 *
 * @returns {JSX.Element} The UserActions component with company usage data or a loading state.
 */
import React, {useEffect, useState} from 'react';
import Loading from '../../../../assets/loading_icon.svg';
import styles from './UserActions.module.scss';

const UserActions = () => {
  // State for the count of used companies
  const [usedCompanyCount, setUsedCompanyCount] = useState(0);
  // State for the company limit
  const [companyLimit, setCompanyLimit] = useState(0);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // Function to fetch company information from the API
    const fetchCompanyInfo = async () => {
      setIsLoading(true);
      const url = 'https://gateway.scan-interfax.ru/api/v1/account/info';
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsedCompanyCount(data.eventFiltersInfo.usedCompanyCount);
        setCompanyLimit(data.eventFiltersInfo.companyLimit);
      } catch (error) {
        console.error("Ошибка при получении информации о компаниях:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch company information on component mount
    fetchCompanyInfo();
    // Set up an interval to refresh the company information
    const intervalId = setInterval(fetchCompanyInfo, 50000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Render the component with company usage data or a loading state
  return (
    <div className={styles.userActions__rectangle}>
      {isLoading ? (
        <img src={Loading} alt="Loading" className={styles.userActions__loading}/>
      ) : (
        <div className={styles.userActions__data}>
          <div className={styles.userActions__numberItem}>Использовано компаний</div>
          <div className={styles.userActions__usedCompaniesNumber}>{usedCompanyCount}</div>
          <div className={styles.userActions__numberItem}>Лимит по компаниям</div>
          <div className={styles.userActions__limitCompaniesNumber}>{companyLimit}</div>
        </div>
      )}
    </div>
  );
};

export default UserActions;
