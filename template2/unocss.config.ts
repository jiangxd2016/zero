import path from 'node:path';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerVariantGroup,
} from 'unocss';



export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'column': 'flex flex-col',
    'flex-s-0': 'flex-shrink-0',
    'icon-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',

  },
  theme: {
    colors: {
      dark: '#232324',
      primary: '#2179FF',
      title: '#1F2329',
      subtitle: '#4E5969',
      border: '#E1E4E8',
    },
    spacing: {
      base: '10px',
      sm: '8px',
      xs: '4px',
      md: '14px',
      lg: '16px',
    },
    fontSize: {
      base: '14px',
      sm: '12px',
      md: '16px',
      lg: '18px',
      xl: '22px',
      xxl: '36px',
    },
    borderRadius: {
      base: '4px',
      sm: '2px',
      md: '8px',
      lg: '10px',
      xl: '12px',
    },
    backgroundSize: {
      full: '100%',
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  include: ['./src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'].map(dir => path.resolve(__dirname, dir))
});
