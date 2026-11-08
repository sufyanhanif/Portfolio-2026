import React, { useState, useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ActivityCalendar } from 'react-activity-calendar';

const PURPLE_THEME = {
  dark: [
    '#18181b',
    '#581c87',
    '#7e22ce',
    '#c026d3',
    '#f0abfc',
  ],
};

const YEAR_OPTIONS = [
  { value: 'last', label: 'Last Year' },
  { value: 2026, label: '2026' },
  { value: 2025, label: '2025' },
  { value: 2024, label: '2024' },
];

export default function GithubActivity({ contributionsByYear = null }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState('last');
  const [retryKey, setRetryKey] = useState(0);
  const [status, setStatus] = useState('loading');
  const sectionRef = useRef(null);

  const preloadedData = contributionsByYear?.[selectedYear];
  const preloadedTotal = Array.isArray(preloadedData)
    ? preloadedData.reduce((sum, item) => sum + item.count, 0)
    : 0;
  const effectiveStatus = Array.isArray(preloadedData)
    ? preloadedTotal === 0
      ? 'empty'
      : 'ready'
    : status;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleYearChange = (yearValue) => {
    if (yearValue === selectedYear) return;
    setStatus('loading');
    setSelectedYear(yearValue);
  };

  const handleRetry = () => {
    setStatus('loading');
    setRetryKey((prev) => prev + 1);
  };

  const handleTransformData = (contributions) => {
    const total = contributions.reduce((sum, item) => sum + item.count, 0);
    const nextStatus = total === 0 ? 'empty' : 'ready';
    queueMicrotask(() => {
      setStatus((prev) => (prev === nextStatus ? prev : nextStatus));
    });
    return contributions;
  };

  const errorStateNode = (
    <div
      role="alert"
      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 text-center"
    >
      <p className="text-sm font-semibold text-white">
        Unable to load GitHub contribution data for @sufyanhanif.
      </p>
      <p className="mt-1 text-xs text-zinc-300">
        The GitHub contributions service did not respond. Retry below or view the profile directly on GitHub.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleRetry}
          className="min-h-[44px] px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 active:bg-fuchsia-700 text-white text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
        >
          Retry loading calendar
        </button>
        <a
          href="https://github.com/sufyanhanif"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
        >
          Open @sufyanhanif on GitHub
        </a>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="github-activity"
      aria-labelledby="github-activity-heading"
      className="relative w-full bg-black text-white px-3 sm:px-8 md:px-12 py-10 sm:py-20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#7b008b]/20 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <h2
              id="github-activity-heading"
              className="text-2xl sm:text-4xl font-bold tracking-tight mt-0.5"
            >
              Contribution <span className="text-fuchsia-500">Activity</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xs md:text-right leading-relaxed">
            Public commit history and open-source contributions on GitHub.
          </p>
        </div>

        <div
          className={`relative w-full border-t border-dashed border-zinc-700 flex justify-between items-center my-4 sm:my-6 transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:transform-none transform ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-95'
          }`}
        >
          <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
          <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
        </div>

        <div
          className={`flex justify-center my-6 sm:my-8 transition-all duration-700 delay-150 ease-out motion-reduce:transition-none motion-reduce:transform-none transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            role="group"
            aria-label="Filter contributions by year"
            className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full"
          >
            {YEAR_OPTIONS.map((option) => {
              const isSelected = selectedYear === option.value;
              return (
                <button
                  key={String(option.value)}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleYearChange(option.value)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 ${
                    isSelected
                      ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800 active:bg-zinc-700'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`relative w-full bg-zinc-900/75 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl transition-all duration-700 delay-200 ease-out motion-reduce:transition-none motion-reduce:transform-none transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
                <img
                  src="/icons/github.svg"
                  alt=""
                  aria-hidden="true"
                  width="20"
                  height="20"
                  className="w-5 h-5 brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  @sufyanhanif
                </h3>
                <p
                  aria-live="polite"
                  className="text-xs text-zinc-300 font-mono"
                >
                  {effectiveStatus === 'loading'
                    ? 'Loading contribution calendar...'
                    : selectedYear === 'last'
                    ? 'Contributions in the last 12 months'
                    : `Contributions in ${selectedYear}`}
                </p>
              </div>
            </div>

            <a
              href="https://github.com/sufyanhanif"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-950 hover:bg-zinc-800 hover:border-fuchsia-500/60 active:bg-zinc-900 text-xs sm:text-sm text-white font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
            >
              <span>View GitHub Profile</span>
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-fuchsia-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {effectiveStatus === 'empty' && (
            <div
              role="status"
              className="mb-4 rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 text-xs sm:text-sm text-zinc-300"
            >
              No public contributions were recorded for this period. Select another year above or check repositories directly on GitHub.
            </div>
          )}

          <div
            role="region"
            aria-label="GitHub contribution heatmap"
            tabIndex={0}
            className="w-full overflow-x-auto pb-2 flex justify-start sm:justify-center [&>div]:mx-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 rounded-lg"
          >
            <div className="min-w-[650px] sm:min-w-0 flex justify-center">
              {Array.isArray(preloadedData) ? (
                <ActivityCalendar
                  key={`${selectedYear}-graphql`}
                  data={preloadedData}
                  colorScheme="dark"
                  theme={PURPLE_THEME}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  maxLevel={4}
                  labels={{
                    totalCount: `{{count}} contributions in ${
                      selectedYear === 'last' ? 'the last year' : `${selectedYear}`
                    }`,
                  }}
                />
              ) : (
                <GitHubCalendar
                  key={`${selectedYear}-${retryKey}`}
                  username="sufyanhanif"
                  year={selectedYear}
                  colorScheme="dark"
                  theme={PURPLE_THEME}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  transformData={handleTransformData}
                  errorMessage={errorStateNode}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
