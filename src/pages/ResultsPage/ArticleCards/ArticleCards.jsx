// ArticleCards.jsx
/**
 * ArticleCards Component.
 * This component is responsible for displaying a list of ArticleCard components.
 * It receives an array of article data, transforms it into ArticleCard props,
 * and manages the number of displayed articles with a "Show More" button.
 *
 * @param {Array} documentsData - The array of article data to be displayed.
 * @returns {JSX.Element} The ArticleCards component with a list of articles.
 */
import React, {useEffect, useState} from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from "./ArticleCards.module.scss";
import MockArticle from '../../../assets/mock_1_picture.png';

function ArticleCards({documentsData}) {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState(2);

  // Effect to transform the incoming documents data into article cards
  useEffect(() => {
    if (documentsData && Array.isArray(documentsData)) {
      const transformedArticles = documentsData.map(doc => {
        const {issueDate, url, source, attributes, title, content} = doc.ok;
        const {name} = source;
        const {isTechNews, isAnnouncement, isDigest, wordCount} = attributes;
        return {
          date: new Date(issueDate).toLocaleDateString("ru-RU"),
          url,
          sourceName: name,
          isTechNews,
          isAnnouncement,
          isDigest,
          title: title.text,
          content: content.markup,
          wordCount,
          picture: MockArticle, // Placeholder image
        };
      });

      setArticles(transformedArticles);
    }
  }, [documentsData]);

  // Function to show more articles when the button is clicked
  const showMoreArticles = () => {
    setDisplayedArticles(prev => prev + 2);
  };

  // Render the ArticleCards component
  return (
    <div className={styles.articleCardsBlock}>
      {/* Title for the articles list */}
      <h2 className={styles.articleCards__h2}>Список документов</h2>
      {/* Container for article cards */}
      <div className={styles.articleCards}>
        {articles
          .slice(0, displayedArticles) // Show only a subset of articles based on displayedArticles state
          .map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
      </div>
      {/* "Show More" button to load more articles */}
      {displayedArticles < articles.length && (
        <div className={styles.buttonDiv}>
          <button className={styles.showMore} onClick={showMoreArticles}>
            Показать больше
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleCards;