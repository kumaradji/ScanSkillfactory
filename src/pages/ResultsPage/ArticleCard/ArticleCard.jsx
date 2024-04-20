// ArticleCard.jsx
import React, {useEffect, useState} from 'react';
import styles from './ArticleCard.module.scss';
import {cleanHtmlContent} from '../../../utils/utils';

const ArticleCard = ({ date, url, sourceName, isTechNews, isAnnouncement, isDigest, title, content, wordCount, picture }) => {
  const [cleanContent, setCleanContent] = useState('');

  useEffect(() => {
    setCleanContent(cleanHtmlContent(content));
  }, [content]);

  const tagLabel = isTechNews ? "Технические новости" : isAnnouncement ? "Анонсы и события" : "Сводки новостей";

  return (
    <div className={styles.articleCard}>
      <div className={styles.articleInfo}>
        <span className={styles.articleDate}>{date}</span>
        <a href={url} className={styles.articleSource} target="_blank" rel="noopener noreferrer">
          {sourceName}
        </a>
      </div>
      <h3 className={styles.articleTitle}>{title}</h3>
      <div className={styles.tag}>{tagLabel}</div>
      <img src={picture} alt="Article" className={styles.articlePicture} />
      <p className={styles.articleContent}>{cleanContent}</p>
      <div className={styles.articleFooter}>
        <a href={url} className={styles.readMore} target="_blank" rel="noopener noreferrer">
          Читать в источнике
        </a>
        <span className={styles.wordCount}>{wordCount} слова</span>
      </div>
    </div>
  );
};

export default ArticleCard;