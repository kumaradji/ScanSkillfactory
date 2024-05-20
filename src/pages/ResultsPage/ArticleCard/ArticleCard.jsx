// ArticleCard.jsx
/**
 * ArticleCard Component.
 * This component is designed to display an article card with relevant information.
 * It shows the article's date, source, title, content snippet, and an image if provided.
 * The card also displays a tag based on the article type and provides a link to read the full article.
 *
 * @param {string} date - The publication date of the article.
 * @param {string} url - The URL to the full article.
 * @param {string} sourceName - The name of the source of the article.
 * @param {boolean} isTechNews - Flag indicating if the article is technical news.
 * @param {boolean} isAnnouncement - Flag indicating if the article is an announcement.
 * @param {boolean} isDigest - Flag indicating if the article is a digest.
 * @param {string} title - The title of the article.
 * @param {string} content - The HTML content of the article.
 * @param {number} wordCount - The word count of the article.
 * @param {string} picture - The URL to the image associated with the article.
 * @returns {JSX.Element} The ArticleCard component with the article's information.
 */
import React, {useEffect, useState} from 'react';
import styles from './ArticleCard.module.scss';
import {cleanHtmlContent} from '../../../utils/utils';

const ArticleCard = ({ date, url, sourceName, isTechNews, isAnnouncement, isDigest, title, content, wordCount, picture }) => {
  const [cleanContent, setCleanContent] = useState('');

  // Effect to clean the HTML content for safe rendering
  useEffect(() => {
    setCleanContent(cleanHtmlContent(content));
  }, [content]);

  // Determine the label for the article type tag
  const tagLabel = isTechNews ? "Технические новости" : isAnnouncement ? "Анонсы и события" : "Сводки новостей";

  // Render the ArticleCard component
  return (
    <div className={styles.articleCard}>
      {/* Article information with date and source */}
      <div className={styles.articleInfo}>
        <span className={styles.articleDate}>{date}</span>
        <a href={url} className={styles.articleSource} target="_blank" rel="noopener noreferrer">
          {sourceName}
        </a>
      </div>
      {/* Article title */}
      <h3 className={styles.articleTitle}>{title}</h3>
      {/* Article type tag */}
      <div className={styles.tag}>{tagLabel}</div>
      {/* Article image */}
      <img src={picture} alt="Article" className={styles.articlePicture} />
      {/* Article content snippet */}
      <p className={styles.articleContent}>{cleanContent}</p>
      {/* Article footer with link to full article and word count */}
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