/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cf: {
          background: '#fcf8ff',
          surface: '#ffffff',
          surfaceLow: '#f5f2ff',
          surfaceMid: '#f0ecf9',
          surfaceHigh: '#eae6f4',
          line: '#c7c4d8',
          lineStrong: '#777587',
          text: '#1b1b24',
          muted: '#464555',
          primary: '#3525cd',
          primarySoft: '#e2dfff',
          primaryContainer: '#4f46e5',
          secondary: '#565e74',
          secondarySoft: '#dae2fd',
          accent: '#a44100',
          accentSoft: '#ffdbcc',
          success: '#0f766e',
          successSoft: '#ccfbf1',
          warning: '#9a3412',
          warningSoft: '#ffedd5',
          danger: '#ba1a1a',
          dangerSoft: '#ffdad6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        label: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        overlay: '0 20px 50px -24px rgba(27, 27, 36, 0.35)',
      },
      borderRadius: {
        cf: '0.5rem',
        panel: '0.75rem',
      },
      maxWidth: {
        shell: '1440px',
      },
    },
  },
  plugins: [],
};
