// SummaryTable.jsx
import React, {useEffect, useRef, useState} from 'react';
import styles from './SummaryTable.module.scss';
import loading_icon from '../../../assets/loading_icon.svg';
import {combineDataByDate} from "../../../utils/helpers";

const SummaryTable = ({searchData, isLoading, isError}) => {
  const [combinedData, setCombinedData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const tableWrapperRef = useRef(null);

  useEffect(() => {
    if (tableWrapperRef.current) {
      tableWrapperRef.current.scrollLeft = 0;
    }
  }, [combinedData]);

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

  const scrollTable = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    if (tableWrapperRef.current) {
      tableWrapperRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className={styles.summaryTable}>
      <h2 className={styles.summaryTable__h2}>Общая сводка</h2>
      <div className={styles.summaryTable__titleBlock}>Найдено данных: {totalDataCount}</div>
      <div className={styles.summaryTable__tableAndArrows}>
        <button className={styles.summaryTable__scrollBtn}
                onClick={() => scrollTable('left')}></button>
        <div className={styles.summaryTable__wrapperMain}>
          <div className={styles.summaryTable__headers}>
            <div className={styles.summaryTable__header_period}>Период</div>
            <div className={styles.summaryTable__header_total}>Всего</div>
            <div className={styles.summaryTable__header_risks}>Риски</div>
          </div>
          <div className={styles.summaryTable__wrapper} ref={tableWrapperRef}>
            {isLoading ? (
              <div className={styles.summaryTable__loadingData}>
                <img src={loading_icon} alt="Loading" className={styles.summaryTable__loadingData_summary}/>
                <p className={styles.summaryTable__loadingData_sign}>Загружаем данные...</p>
              </div>
            ) : isError ? (
              <div >
                <p className={styles.summaryTable__error500}>Ошибка сервера. Попробуйте чуть позже или проверьте свой тариф.</p>
              </div>
            ) : (
              <div className={styles.summaryTable__data}>
                {combinedData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className={styles.summaryTable__data_row}>
                      <div className={styles.summaryTable__data_cell}>{item.period}</div>
                      <div className={styles.summaryTable__data_cell}>{item.total}</div>
                      <div className={styles.summaryTable__data_cell}>{item.risks}</div>
                    </div>
                    {index < combinedData.length - 1 && <div className={styles.summaryTable__divider}></div>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className={styles.summaryTable__scrollBtn}
                onClick={() => scrollTable('right')}></button>
      </div>
    </div>
  );
};

export default SummaryTable;


