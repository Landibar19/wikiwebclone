import React from 'react';

const News = ({ title, articles }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 border border-solid border-gray-400 bg-blue-200 ">
        {title}
      </h2>
      <ul>
        {articles.map((article, index) => (
          <ul key={index} className="mb-2">
            <p>
              {article.description.map((part, idx) => (
                part.link ? (
                  <a key={idx} href={part.link} className="text-blue-600 underline">
                    {part.text}
                  </a>
                ) : (
                  <span key={idx}>{part.text}</span>
                )
              ))}
            </p>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default News;