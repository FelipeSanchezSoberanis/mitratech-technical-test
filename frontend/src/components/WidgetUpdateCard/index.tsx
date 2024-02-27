import React, { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Widget, saveWidget } from "../../lib/apiConnect";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export type WidgetUpdateCardProps = {
  widgets: Widget[];
  onWidgetUpdated?: () => any;
};
const WidgetUpdateCard = ({ widgets, onWidgetUpdated }: WidgetUpdateCardProps): JSX.Element => {
  const [widget, setWidget] = useState<Omit<Widget, "price"> & { price: string }>({
    name: "",
    description: "",
    price: ""
  });

  const handleUpdateWidgetClick = async () => {
    await saveWidget({ ...widget, price: Number(widget.price) });
    if (onWidgetUpdated) onWidgetUpdated();
    setWidget({ name: "", description: "", price: "" });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.value;
    const foundWidget = widgets.find((w) => w.name === name);
    if (foundWidget) setWidget({ ...foundWidget, price: foundWidget.price.toString() });
  };

  const widgetValidity = useMemo(() => {
    const nameIsInvalid = widget.name.length < 3 || widget.name.length > 100;
    const descriptionIsInvalid = widget.description.length < 5 || widget.description.length > 1000;
    const price = Number(widget.price);
    const priceIsInvalid = isNaN(price) || price < 1 || price > 20000;
    const isInvalid = nameIsInvalid || descriptionIsInvalid || priceIsInvalid;
    return { isInvalid, nameIsInvalid, descriptionIsInvalid, priceIsInvalid };
  }, [widget]);

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Select value={widget.name} onChange={handleSelectChange} label="Name">
              {widgets.map((w, i) => (
                <MenuItem key={i} value={w.name}>
                  {w.name}
                </MenuItem>
              ))}
            </Select>
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
              onClick={handleUpdateWidgetClick}
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

export default WidgetUpdateCard;
