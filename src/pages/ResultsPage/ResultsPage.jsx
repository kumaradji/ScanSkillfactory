// ResultsPage.jsx
/**
 * ResultsPage Component.
 * This component is the main container for the search results page.
 * It displays a summary table and a list of articles based on the search results.
 * The component also handles redirection to the authentication page if the user is not logged in.
 * It shows a loading state while the search results are being fetched and an error message if there is an error.
 *
 * @returns {JSX.Element} The ResultsPage component with the search results or an error message.
 */
import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/AuthContext';
import useSearchResults from '../../hooks/useSearchResults';

import GeneralSummaryTable from './SummaryTable/SummaryTable';
import ArticleCards from './ArticleCards/ArticleCards';

import styles from './ResultsPage.module.scss';
import ResultsLargeImg from '../../assets/search_results_large_picture.svg';

const ResultsPage = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const searchParams = location.state?.searchParams;

  const { isLoading, histogramData, documentData, error } = useSearchResults(searchParams);

  // Redirect to authentication page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

  // Display error message if there is an error fetching data
  if (error || (!isLoading && (!documentData || !Array.isArray(documentData) || documentData.length === 0))) {
    return <div className={styles.error}>Ошибка полученных данных</div>;
  }

  // Render the ResultsPage component
  return (
    <div className={styles.resultPage}>
      {/* Loading state with title and image */}
      {isLoading && (
        <>
          <div className={styles.resultPage__titleBlock}>
            <div>
              <h1 className={styles.resultPage__titleBlock_h1}>
                Ищем. Скоро будут результаты
              </h1>
              <p className={styles.resultPage__titleBlock_p}>
                Поиск может занять некоторое время, просим сохранять терпение.
              </p>
            </div>
            <img
              className={styles.resultPage__largePicture}
              src={ResultsLargeImg}
              alt="Results Page img"
            />
          </div>
          {/* General summary table showing during loading */}
          <GeneralSummaryTable
            searchData={histogramData}
            isLoading={isLoading}
          />
        </>
      )}

      {/* Display summary table and article cards when not loading */}
      {!isLoading && (
        <>
          <GeneralSummaryTable
            searchData={histogramData}
            isLoading={isLoading}
          />

          {/* Article cards with search results */}
          {documentData && Array.isArray(documentData) && documentData.length > 0 && (
            <ArticleCards documentsData={documentData} />
          )}
        </>
      )}
    </div>
  );
};

export default ResultsPage;