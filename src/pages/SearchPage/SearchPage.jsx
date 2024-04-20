// src/pages/SearchPage/SearchPage.jsx
import React from 'react';

// Importing components
import CompanyINN from './CompanyINN/CompanyINN';
import Tonality from './Tonality/Tonality';
import DocumentCount from './DocumentCount/DocumentCount';
import DateInput from './DateInput/DateInput';
import CheckboxBlock from './CheckboxBlock/CheckboxBlock';
import styles from './SearchPage.module.scss';

// Importing assets
import LargePicture from "../../assets/search_page_large_picture.svg"
import Folders from "../../assets/search_page_small_picture_folders.svg"
import Documents from "../../assets/search_page_small_picture_sheet.svg"
import {useSearchForm} from "../../hooks/useSearchForm";

/**
 * Component for the search page.
 * Allows users to input search parameters and perform searches.
 */
const SearchPage = () => {
  // Destructuring custom hook values
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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract checkbox state values
    const {
      maxCompleteness,
      mainRole,
      riskFactorsOnly,
      includeMarketNews,
      includeAnnouncements,
      includeNewsSummaries
    } = checkboxStates;

    // Map tonality value to API format
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

    // Construct search parameters object
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
      {/* Search title and images */}
      <div className={styles.searchTitleBlock}>
        <div >
          <h1 className={styles.h1SearchPage}>Найдите необходимые <br />данные в пару кликов.</h1>
          <p className={styles.pSearchPageTitleBlock}>Задайте параметры поиска. <br />Чем больше заполните, тем точнее поиск</p>
        </div>
        <img className={styles.searchPageSmallPictureSheet} src={Documents} alt="Paper image" />
        <img className={styles.searchPageSmallPictureFolders} src={Folders} alt="Folders image" />
      </div>

      {/* Search form */}
      <div className={styles.searchBlock}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.leftPartSearchForm}>
            {/* Search input components */}
            <CompanyINN companyINN={companyINN} setCompanyINN={setCompanyINN} />
            <Tonality tonality={tonality} setTonality={setTonality} />
            <DocumentCount documentCount={documentCount} setDocumentCount={setDocumentCount} />
            <DateInput startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>

          <div className={styles.rightPartSearchForm}>
            {/* Checkbox block */}
            <CheckboxBlock checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange} />
            {/* Submit button */}
            <div className={styles.rightPartSubmitButtonBlock}>
              <button className={styles.button} type="submit" disabled={!isFormValid}>Поиск</button>
              <p className={styles.starMessage}>* Обязательные к заполнению поля</p>
            </div>
          </div>
        </form>
        {/* Large picture */}
        <img className={styles.searchPageLargePicture} src={LargePicture} alt="SearchPage image" />
      </div>
    </div>
  );
};

export default SearchPage;
