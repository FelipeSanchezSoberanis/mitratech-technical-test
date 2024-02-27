import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Widget, deleteWidget } from "../../lib/apiConnect";
import Button from "@mui/material/Button";

export interface DisplayWidgetProps {
  widget: Widget;
  onWidgetDeleted?: () => any;
}
const DisplayWidget = ({ widget, onWidgetDeleted }: DisplayWidgetProps): JSX.Element => {
  const { description, name, price } = widget;

  const handleDeleteClick = async () => {
    await deleteWidget(name);
    if (onWidgetDeleted) onWidgetDeleted();
  };

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            <Typography component="div" gutterBottom variant="h5">
              ${price}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
            <Button onClick={handleDeleteClick} variant="outlined" color="error">
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DisplayWidget;
