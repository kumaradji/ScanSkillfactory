// ResultsPage.jsx
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

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.resultPage}>
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
          <GeneralSummaryTable
            searchData={histogramData}
            isLoading={isLoading}
          />
        </>
      )}

      {!isLoading && (
        <>
          <GeneralSummaryTable
            searchData={histogramData}
            isLoading={isLoading}
            isError={!!error}
          />

          {!error && documentData && Array.isArray(documentData) && documentData.length > 0 && (
            <ArticleCards documentsData={documentData} />
          )}
        </>
      )}
    </div>
  );
};

export default ResultsPage;