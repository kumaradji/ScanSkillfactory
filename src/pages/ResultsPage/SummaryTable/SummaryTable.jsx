// SummaryTable.jsx
/**
 * SummaryTable Component.
 * This component displays a summary table of search results, including total counts and risk counts.
 * It allows users to scroll horizontally through the table if the content overflows.
 * The table displays a loading state when data is being fetched and an error message if there is an error.
 *
 * @param {Object} searchData - The search data to be summarized and displayed.
 * @param {boolean} isLoading - Flag indicating whether the search data is being loaded.
 * @param {boolean} isError - Flag indicating whether there was an error fetching the search data.
 * @returns {JSX.Element} The SummaryTable component with the summarized search data.
 */
import React, {useEffect, useRef, useState} from 'react';
import styles from './SummaryTable.module.scss';
import loading_icon from '../../../assets/loading_icon.svg';
import {combineDataByDate} from "../../../utils/helpers";

const SummaryTable = ({searchData, isLoading, isError}) => {
  const [combinedData, setCombinedData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const tableWrapperRef = useRef(null);

  // Effect to reset the horizontal scroll position when data changes
  useEffect(() => {
    if (tableWrapperRef.current) {
      tableWrapperRef.current.scrollLeft = 0;
    }
  }, [combinedData]);

  // Effect to combine data by date and calculate total counts
  useEffect(() => {
    if (searchData && !isError) {
      const totalDocuments = searchData.data.find(histogram => histogram.histogramType === 'totalDocuments');
      if (totalDocuments) {
        const total = totalDocuments.data.reduce((acc, item) => acc + item.value, 0);
        setTotalDataCount(total);
      }

      const combined = combineDataByDate(searchData.data);
      setCombinedData(combined);
    }
  }, [searchData, isError]);

  // Function to scroll the table horizontally
  const scrollTable = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    if (tableWrapperRef.current) {
      tableWrapperRef.current.scrollLeft += scrollAmount;
    }
  };

  // Render the SummaryTable component
  return (
    <div className={styles.summaryTable}>
      {/* Title for the summary table */}
      <h2 className={styles.summaryTable__h2}>Общая сводка</h2>
      {/* Total data count */}
      <div className={styles.summaryTable__titleBlock}>Найдено данных: {totalDataCount}</div>
      {/* Table with scroll buttons */}
      <div className={styles.summaryTable__tableAndArrows}>
        {/* Scroll left button */}
        <button className={styles.summaryTable__scrollBtn}
                onClick={() => scrollTable('left')}></button>
        {/* Table wrapper */}
        <div className={styles.summaryTable__wrapperMain}>
          {/* Table headers */}
          <div className={styles.summaryTable__headers}>
            <div className={styles.summaryTable__header_period}>Период</div>
            <div className={styles.summaryTable__header_total}>Всего</div>
            <div className={styles.summaryTable__header_risks}>Риски</div>
          </div>
          {/* Table data wrapper */}
          <div className={styles.summaryTable__wrapper} ref={tableWrapperRef}>
            {isLoading ? (
              // Loading state
              <div className={styles.summaryTable__loadingData}>
                <img src={loading_icon} alt="Loading" className={styles.summaryTable__loadingData_summary}/>
                <p className={styles.summaryTable__loadingData_sign}>Загружаем данные...</p>
              </div>
            ) : isError ? (
              // Error state
              <div className={styles.summaryTable__error}>
                <p className={styles.summaryTable__errorMessage}>Ошибка полученных данных</p>
              </div>
            ) : (

              // Data rows
              <div className={styles.summaryTable__data}>
                {combinedData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className={styles.summaryTable__data_row}>
                      <div className={styles.summaryTable__data_cell}>{item.period}</div>
                      <div className={styles.summaryTable__data_cell}>{item.total}</div>
                      <div className={styles.summaryTable__data_cell}>{item.risks}</div>
                    </div>
                    {/* Divider line between rows */}
                    {index < combinedData.length - 1 && <div className={styles.summaryTable__divider}></div>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Scroll right button */}
        <button className={styles.summaryTable__scrollBtn}
                onClick={() => scrollTable('right')}></button>
      </div>
    </div>
  );
};

export default SummaryTable;