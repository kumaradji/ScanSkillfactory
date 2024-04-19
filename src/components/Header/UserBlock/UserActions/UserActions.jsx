// src/components/Header/UserBlock/UserActions/UserActions.jsx

import React, {useEffect, useState} from 'react';
import Loading from '../../../../assets/loading_icon.svg';
import styles from './UserActions.module.scss';

const UserActions = () => {
  const [usedCompanyCount, setUsedCompanyCount] = useState(0);
  const [companyLimit, setCompanyLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

    fetchCompanyInfo();

    const intervalId = setInterval(fetchCompanyInfo, 50000);


    return () => clearInterval(intervalId);
  }, []);

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
