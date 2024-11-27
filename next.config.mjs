//@ts-check

import { composePlugins, withNx } from '@nx/next';

import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';
import { createColorSchemes } from '@arctic-kit/snow';

const theme = extendTheme(createColorSchemes());

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

const composedNextConfig = composePlugins(...plugins)(nextConfig);

export default withPigment(composedNextConfig, {
  theme,
});
