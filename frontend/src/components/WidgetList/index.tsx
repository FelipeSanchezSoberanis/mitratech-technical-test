import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import WidgetDisplay from "../WidgetDisplay";
import { fetchAllWidgets, Widget } from "../../lib/apiConnect";
import WidgetCreationCard from "../WidgetCreationCard";
import WidgetUpdateCard from "../WidgetUpdateCard";

const WidgetList = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const updateWidgetList = () => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error("Error fetching widgets", error));
  };

  useEffect(() => {
    updateWidgetList();
  }, []);

  return (
    <Stack spacing={4} sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Update widget:
      </Typography>
      <Grid container justifyContent="center" spacing={4} sx={{ paddingRight: 4, width: "100%" }}>
        <WidgetUpdateCard widgets={widgets} onWidgetUpdated={updateWidgetList} />
      </Grid>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Create new widget:
      </Typography>
      <Grid container justifyContent="center" spacing={4} sx={{ paddingRight: 4, width: "100%" }}>
        <WidgetCreationCard onWidgetCreated={updateWidgetList} />
      </Grid>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        List of widgets:
      </Typography>
      <Grid container justifyContent="center" spacing={4} sx={{ paddingRight: 4, width: "100%" }}>
        {widgets.map((current, index) => (
          <WidgetDisplay onWidgetDeleted={updateWidgetList} key={index} widget={current} />
        ))}
      </Grid>
    </Stack>
  );
};

export default WidgetList;
