// useSearchResults.js
/**
 * useSearchResults Custom Hook.
 * This hook is used to fetch search results based on provided search parameters.
 * It manages the loading state, fetched data for histograms and documents, and any errors that occur during fetching.
 *
 * @param {Object} searchParams - The parameters used for the search query.
 * @returns {Object} An object containing the loading state, histogram data, document data, and any error.
 */
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
        // Fetch histogram and publication IDs data concurrently
        const [histogramResponse, publicationIdsResponse] = await Promise.all([
          // Histogram data fetch request
          fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(searchParams),
            credentials: 'omit',
          }),
          // Publication IDs fetch request
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

        // Handle potential errors in histogram data response
        if (!histogramResponse.ok) {
          throw new Error(`HTTP error fetching histogram data! status: ${histogramResponse.status}`);
        }

        // Parse histogram data
        const histogramData = await histogramResponse.json();

        // Handle potential errors in publication IDs response
        if (!publicationIdsResponse.ok) {
          throw new Error(`HTTP error fetching publication IDs! status: ${publicationIdsResponse.status}`);
        }

        // Parse publication IDs data
        const publicationIdsData = await publicationIdsResponse.json();
        const publicationIds = publicationIdsData.items.map(item => item.encodedId);

        // Fetch documents data using the publication IDs
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

        // Update state with fetched data
        setHistogramData(histogramData);
        setDocumentData(documentsData);
      } catch (error) {
        // Handle any errors that occurred during data fetching
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        // Set loading state to false once data fetching is complete or if an error occurred
        setIsLoading(false);
      }
    };
    // Fetch data only if search parameters are provided
    if (searchParams) {
      fetchData();
    }
  }, [searchParams]);

  return { isLoading, histogramData, documentData, error };
};

export default useSearchResults;