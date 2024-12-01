import React from 'react';

const FeaturedArticles = ({ title, articles }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 border border-solid border-gray-400 bg-blue-200">{title}</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index} className="mb-2">
            <h3 className="text-xl  ">
            {article.title}
            </h3>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedArticles;