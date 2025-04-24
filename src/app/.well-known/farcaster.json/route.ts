import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl =
    process.env.NEXT_PUBLIC_URL ||
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjg2OTk5OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc2ZDUwQjBFMTQ3OWE5QmEyYkQ5MzVGMUU5YTI3QzBjNjQ5QzhDMTIifQ",
      payload:
        "eyJkb21haW4iOiJoZWxsbm9ldGgtaGVsbG5vLXMtZmFyZXdlbGwudmVyY2VsLmFwcCJ9",
      signature:
        "MHg1MDcwZDY0MmNkMTY1NTJlODgxZjhhMGM3MjNkZWJlYmI3ODk4MzYzMmFjMWUyOGMxMmMxOGE4ZWY4MmE0OTUwNGFmNWNmOTZhYjQzMWQ2YjhhYzg0ZWIxMTViMWU4NDY1MmNiMWFlMzQ3YmFiOWRiNzY1ZTg2MTZlYTc5NTg4MzFj",
    },
    frame: {
      version: "1",
      name: PROJECT_TITLE,
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frames/hello/opengraph-image`,
      buttonTitle: "help hellno.eth",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
