// src/pages/SearchPage/SearchPage.jsx
import React from 'react';

import styles from './SearchPage.module.scss';
import CompanyINN from './CompanyINN/CompanyINN';
import Tonality from './Tonality/Tonality';
import DocumentCount from './DocumentCount/DocumentCount';
import DateInput from './DateInput/DateInput';
import CheckboxBlock from './CheckboxBlock/CheckboxBlock';

import LargePicture from "../../assets/search_page_large_picture.svg"
import Folders from "../../assets/search_page_small_picture_folders.svg"
import Documents from "../../assets/search_page_small_picture_sheet.svg"
import {useSearchForm} from "../../hooks/useSearchForm";

const SearchPage = () => {
  const {
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
    handleCheckboxChange,
    isFormValid,
    navigate,
  } = useSearchForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      maxCompleteness,
      mainRole,
      riskFactorsOnly,
      includeMarketNews,
      includeAnnouncements,
      includeNewsSummaries
    } = checkboxStates;

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
          endDate: `${endDate}T23:59:59+03:00`,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [{ type: "company", inn: companyINN, maxFullness: maxCompleteness }],
            onlyMainRole: mainRole,
            tonality: apiTonality,
            onlyWithRiskFactors: riskFactorsOnly,
          },
        },
        attributeFilters: {
          excludeTechNews: !includeMarketNews,
          excludeAnnouncements: !includeAnnouncements,
          excludeDigests: !includeNewsSummaries,
        },
        limit: Number(documentCount),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      };
      navigate('/results', { state: { searchParams } });
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