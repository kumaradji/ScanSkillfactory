// ArticleCards.jsx
import React, {useEffect, useState} from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';

import styles from "./ArticleCards.module.scss";
import MockArticle from '../../../assets/mock_1_picture.png';

function ArticleCards({ documentsData }) {
  const [articles, setArticles] = useState([]);

  const [displayedArticles, setDisplayedArticles] = useState(2);

  useEffect(() => {
    if (documentsData && Array.isArray(documentsData)) {
      const transformedArticles = documentsData.map(doc => ({
        date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
        url: doc.ok.url,
        sourceName: doc.ok.source.name,
        isTechNews: doc.ok.attributes.isTechNews,
        isAnnouncement: doc.ok.attributes.isAnnouncement,
        isDigest: doc.ok.attributes.isDigest,
        title: doc.ok.title.text,
        content: doc.ok.content.markup,
        wordCount: doc.ok.attributes.wordCount,
        picture: MockArticle,
      }));

      setArticles(transformedArticles);
    }
  }, [documentsData]);

  const showMoreArticles = () => {
    setDisplayedArticles(prev => prev + 2);
  };

  return (
    <div className={styles.articleCardsBlock}>
      <h2 className={styles.articleCards__h2}>Список документов</h2>
      <div className={styles.articleCards}>
        {articles.slice(0, displayedArticles).map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
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
