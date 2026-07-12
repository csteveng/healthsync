export default function ComingSoon({ title }) {
  return (
    <div className="px-4 py-5 md:px-10 md:py-8 max-w-container mx-auto">
      <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">{title}</h1>
      <p className="text-body-md text-on-surface-variant">
        This section is being built next — check back soon.
      </p>
    </div>
  );
}
