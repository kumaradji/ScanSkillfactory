// ArticleCard.jsx
import React, {useEffect, useState} from 'react';
import styles from './ArticleCard.module.scss';

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function cleanHtmlContent(htmlContent) {
  const decodedHtml = decodeHtml(htmlContent);
  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
}

const ArticleCard = (props) => {

  const [cleanContent, setCleanContent] = useState('');

  useEffect(() => {
    setCleanContent(cleanHtmlContent(props.content));
  }, [props.content]);

  const tagLabel = props.isTechNews ? "Технические новости" : props.isAnnouncement ? "Анонсы и события" : "Сводки новостей";

  return (
    <div className={styles.articleCard}>
      <div className={styles.articleInfo}>
        <span className={styles.articleDate}>{props.date}</span>
        <a href={props.url} className={styles.articleSource} target="_blank">
          {props.sourceName}
        </a>
      </div>
      <h3 className={styles.articleTitle}>{props.title}</h3>
      <div className={styles.tag}>{tagLabel}</div>
      <img src={props.picture} alt="Article" className={styles.articlePicture} />
      <p className={styles.articleContent}>{cleanContent}</p>
      <div className={styles.articleFooter}>
        <a
          href={props.url}
          className={styles.readMore}
          target="_blank"
          rel="noopener noreferrer"
        >
          Читать в источнике
        </a>
        <span className={styles.wordCount}>{props.wordCount} слова</span>
      </div>
    </div>
  );
};

export default ArticleCard;