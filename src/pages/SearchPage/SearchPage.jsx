// src/pages/SearchPage/SearchPage.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/AuthContext';

import styles from './SearchPage.module.scss';
import CompanyINN from './CompanyINN/CompanyINN';
import Tonality from './Tonality/Tonality';
import DocumentCount from './DocumentCount/DocumentCount';
import DateInput from './DateInput/DateInput';
import CheckboxBlock from './CheckboxBlock/CheckboxBlock';

import LargePicture from "../../assets/search_page_large_picture.svg"
import Folders from "../../assets/search_page_small_picture_folders.svg"
import Documents from "../../assets/search_page_small_picture_sheet.svg"

const SearchPage = () => {
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

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {

    const isValid = companyINN && documentCount && startDate && endDate;
    setIsFormValid(isValid);
  }, [companyINN, documentCount, startDate, endDate, checkboxStates]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let apiTonality;
    switch (tonality) {
      case 'Любая':
        apiTonality = 'any';
        break;
      case 'Позитивная':
        apiTonality = 'positive';
        break;
      case 'Негативная':
        apiTonality = 'negative';
        break;
      default:
        apiTonality = 'any';
    }

    if (isFormValid) {
      const searchParams = {
        issueDateInterval: {
          startDate: `${startDate}T00:00:00+03:00`,
          endDate: `${endDate}T23:59:59+03:00`
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [{
              type: "company",
              inn: companyINN,
              maxFullness: checkboxStates.maxCompleteness,
            }],
            onlyMainRole: checkboxStates.mainRole,
            tonality: apiTonality,
            onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
          }
        },
        attributeFilters: {
          excludeTechNews: !checkboxStates.includeMarketNews,
          excludeAnnouncements: !checkboxStates.includeAnnouncements,
          excludeDigests: !checkboxStates.includeNewsSummaries,
        },
        limit: Number(documentCount),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"]
      };
      navigate('/results', { state: { searchParams: searchParams } });
    } else {
      console.log('Форма не валидна.');
    }
  };
  
  return (
    <div className={styles.searchContent}>
      <div className={styles.searchTitleBlock}>
        <div >
          <h1 className={styles.h1SearchPage}>Найдите необходимые <br />данные в пару кликов.</h1>
          <p className={styles.pSearchPageTitleBlock}>Задайте параметры поиска. <br />Чем больше заполните, тем точнее поиск</p>
        </div>
        <img className={styles.searchPageSmallPictureSheet} src={Documents} alt="Paper image" />
        <img className={styles.searchPageSmallPictureFolders} src={Folders} alt="Folders image" />
      </div>

      <div className={styles.searchBlock}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.leftPartSearchForm}>
            <CompanyINN companyINN={companyINN} setCompanyINN={setCompanyINN} />
            <Tonality tonality={tonality} setTonality={setTonality} />
            <DocumentCount documentCount={documentCount} setDocumentCount={setDocumentCount} />
            <DateInput startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>

          <div className={styles.rightPartSearchForm}>
            <CheckboxBlock checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange} />
            <div className={styles.rightPartSubmitButtonBlock}>
              <button className={styles.button} type="submit" disabled={!isFormValid}>Поиск</button>
              <p className={styles.starMessage}>* Обязательные к заполнению поля</p>
            </div>
          </div>
        </form>
        <img className={styles.searchPageLargePicture} src={LargePicture} alt="SearchPage image" />
      </div>
    </div>
  );
};

export default SearchPage;