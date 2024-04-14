// hooks/useSearchResults.js
import {useEffect, useState} from 'react';

const useSearchResults = (searchParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [histogramData, setHistogramData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [histogramResponse, publicationIdsResponse] = await Promise.all([
          fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(searchParams),
            credentials: 'omit',
          }),
          fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(searchParams),
            credentials: 'omit',
          }),
        ]);

        if (!histogramResponse.ok) {
          throw new Error(`HTTP error fetching histogram data! status: ${histogramResponse.status}`);
        }

        const histogramData = await histogramResponse.json();

        if (!publicationIdsResponse.ok) {
          throw new Error(`HTTP error fetching publication IDs! status: ${publicationIdsResponse.status}`);
        }

        const publicationIdsData = await publicationIdsResponse.json();
        const publicationIds = publicationIdsData.items.map(item => item.encodedId);

        const [documentsData] = await Promise.all([
          fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ ids: publicationIds }),
            credentials: 'omit',
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error fetching document data! status: ${response.status}`);
              }
              return response.json();
            })
            .catch(error => {
              console.error('Error fetching document data:', error);
              throw error;
            }),
        ]);

        setHistogramData(histogramData);
        setDocumentData(documentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchParams) {
      fetchData();
    }
  }, [searchParams]);

  return { isLoading, histogramData, documentData, error };
};

export default useSearchResults;