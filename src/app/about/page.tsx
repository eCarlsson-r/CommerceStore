export default function About() {
  return (
    <div id="aboutUs" className="py-12">
      <div className="container mx-auto px-4">
        <h2
          className="text-2xl font-bold text-primary mb-6 uppercase font-roboto"
          data-i18n="about-us"
        >
          about-us
        </h2>
        <p
          className="mb-4 text-text-main leading-relaxed font-roboto font-light"
          data-i18n="brief-history"
        >
          brief-history
        </p>
        <p
          className="mb-4 text-gray-600 leading-relaxed"
          data-i18n="our-commitment"
        >
          our-commitment
        </p>
        <p>
          <br />
        </p>
      </div>
    </div>
  );
}
