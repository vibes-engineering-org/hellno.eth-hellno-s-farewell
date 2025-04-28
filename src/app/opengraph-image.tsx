import { ImageResponse } from "next/og";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import { fetchUSDCBalance } from "~/lib/getBalance";
import { supportedBy } from "~/app/constants";

export const alt = PROJECT_TITLE;
export const contentType = "image/png";

// Create reusable options object
let imageOptions: any = null;

// Initialize fonts
async function initializeFonts() {
  if (imageOptions) return imageOptions;

  try {
    imageOptions = {
      width: 960,
      height: 640,
    };

    return imageOptions;
  } catch (error) {
    throw error;
  }
}

export default async function Image() {
  const options = await initializeFonts();
  const balance = await fetchUSDCBalance(
    "0x6210177c80FF902dbb58D1fDC3b47281AA4f2Ab9",
  );
  const progress = Math.min((balance / 2000) * 100, 100);

  const BACKGROUND_GRADIENT_START = "#c026d3";
  const BACKGROUND_GRADIENT_END = "#342942";
  const BACKGROUND_GRADIENT_STYLE = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundImage: `linear-gradient(to bottom, ${BACKGROUND_GRADIENT_START}, ${BACKGROUND_GRADIENT_END})`,
    color: "white",
  };

  /*
this Image is rendered using vercel/satori.

Satori supports a limited subset of HTML and CSS features, due to its special use cases. In general, only these static and visible elements and properties that are implemented.
For example, the <input> HTML element, the cursor CSS property are not in consideration. And you can't use <style> tags or external resources via <link> or <script>.
Also, Satori does not guarantee that the SVG will 100% match the browser-rendered HTML output since Satori implements its own layout engine based on the SVG 1.1 spec.
Please refer to Satori’s documentation for a list of supported HTML and CSS features. https://github.com/vercel/satori#css
*/
  const res = new ImageResponse(
    (
      <div tw="h-full w-full p-12 flex flex-col justify-between bg-zinc-200">
        <div tw="space-y-4 flex flex-col">
          <h1 tw="text-8xl font-bold">{PROJECT_TITLE}</h1>
        </div>
        {/* Supporters */}
        <div tw="flex flex-row flex-wrap justify-center">
          {supportedBy.map((user) => (
            <div
              key={user.username}
              tw="mr-5 mb-4 flex items-center bg-[#472A91] bg-opacity-50 rounded-full px-3 py-2"
            >
              <img
                src={user.pfpUrl}
                alt={user.username}
                tw="w-12 h-12 rounded-full m-2"
              />
              <span tw="text-2xl text-white">{user.username}</span>
            </div>
          ))}
        </div>
        <div tw="w-full flex flex-col">
          <div tw="flex justify-between items-center w-full">
            <p tw="text-5xl font-bold">{`${progress.toFixed(1)}% Funded`}</p>
            <p tw="text-5xl font-bold">{`$${balance.toFixed(2)} of $2,000`}</p>
          </div>
        </div>
      </div>
    ),
    options,
  );
  res.headers.set(
    "Cache-Control",
    "public, immutable, no-transform, max-age=300",
  );
  return res;
}
