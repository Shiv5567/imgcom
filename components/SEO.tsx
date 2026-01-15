
import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
}

/**
 * In React 19, metadata tags (<title>, <meta>, <link>) are automatically hoisted to the <head>.
 * This replaces react-helmet-async and prevents Error #525 (Suspension conflicts).
 */
const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical = 'https://imgcom.com/', 
  ogType = 'website' 
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="imgcom" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Brand Specific Meta */}
      <meta name="application-name" content="imgcom" />
      <meta name="apple-mobile-web-app-title" content="imgcom" />
    </>
  );
};

export default SEO;
