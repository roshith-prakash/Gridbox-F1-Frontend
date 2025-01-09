import { Helmet } from "react-helmet-async";

const SecurityHeaders = () => {
  return (
    <Helmet>
      {/* Content Security Policy (CSP) */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="style-src 'self' 'unsafe-inline';"
      />

      {/* X-Content-Type-Options */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />

      {/* X-Frame-Options */}
      <meta httpEquiv="X-Frame-Options" content="DENY" />

      {/* X-XSS-Protection */}
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

      {/* Referrer Policy */}
      <meta name="referrer" content="no-referrer" />

      {/* Feature Policy */}
      <meta
        httpEquiv="Permissions-Policy"
        content="geolocation=(self), microphone=()"
      />

      {/* Strict-Transport-Security */}
      <meta
        httpEquiv="Strict-Transport-Security"
        content="max-age=31536000; includeSubDomains"
      />
    </Helmet>
  );
};

export default SecurityHeaders;
