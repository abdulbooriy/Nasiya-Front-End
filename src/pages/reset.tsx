import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/config-global";

import { ResetView } from "src/sections/reset/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Reset - ${CONFIG.appName}`}</title>
      </Helmet>

      <ResetView />
    </>
  );
}
