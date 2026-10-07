function SectionTitle({ label, title, highlightedText, description }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {label && (
        <span className="mb-3 inline-block text-lg font-bold text-primary-700">
          {label}
        </span>
      )}

      <h2 className="mb-5 text-3xl font-bold text-secondary-800 md:text-4xl">
        {title}
        {highlightedText && (
          <span className="text-primary-600"> {highlightedText}</span>
        )}
      </h2>

      {description && (
        <p className="text-lg leading-8 text-gray-600">{description}</p>
      )}
    </div>
  );
}

export default SectionTitle;
