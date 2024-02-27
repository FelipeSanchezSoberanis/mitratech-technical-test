import React, { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Widget, saveWidget } from "../../lib/apiConnect";

export type WidgetCreationCardProps = {
  onWidgetCreated?: () => any;
  widgets: Widget[];
};
const WidgetCreationCard = ({ onWidgetCreated, widgets }: WidgetCreationCardProps): JSX.Element => {
  const [widget, setWidget] = useState<Omit<Widget, "price"> & { price: string }>({
    name: "",
    description: "",
    price: ""
  });

  const handleCreateWidgetClick = async () => {
    await saveWidget({ ...widget, price: Number(widget.price) });
    if (onWidgetCreated) onWidgetCreated();
    setWidget({ name: "", description: "", price: "" });
  };

  const widgetValidity = useMemo(() => {
    const nameIsInvalid =
      widget.name.length < 3 ||
      widget.name.length > 100 ||
      widgets.find((w) => w.name === widget.name) !== undefined;
    const descriptionIsInvalid = widget.description.length < 5 || widget.description.length > 1000;
    const price = Number(widget.price);
    const priceIsInvalid = isNaN(price) || price < 1 || price > 20000;
    const isInvalid = nameIsInvalid || descriptionIsInvalid || priceIsInvalid;
    return { isInvalid, nameIsInvalid, descriptionIsInvalid, priceIsInvalid };
  }, [widget, widgets]);

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              onChange={(e) => setWidget((widget) => ({ ...widget, name: e.target.value }))}
              value={widget.name}
              error={widget.name.length > 0 && widgetValidity.nameIsInvalid}
              label="Name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setWidget((widget) => ({ ...widget, description: e.target.value }))}
              value={widget.description}
              error={widget.description.length > 0 && widgetValidity.descriptionIsInvalid}
              label="Description"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setWidget((widget) => ({ ...widget, price: e.target.value }))}
              value={widget.price}
              error={widget.price.length > 0 && widgetValidity.priceIsInvalid}
              label="Price"
              variant="outlined"
            />
            <Button
              disabled={widgetValidity.isInvalid}
              onClick={handleCreateWidgetClick}
              variant="outlined"
            >
              Create
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WidgetCreationCard;
