import React, { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Widget, saveWidget } from "../../lib/apiConnect";

const stringToNumber = (input: string): number => Number(input.replace(/[^\d]+/g, ""));

export type WidgetCreationCardProps = {
  onWidgetCreated?: () => any;
};
const WidgetCreationCard = ({ onWidgetCreated }: WidgetCreationCardProps): JSX.Element => {
  const [widget, setWidget] = useState<Widget>({
    name: "",
    description: "",
    price: 0
  });

  const handleCreateWidgetClick = async () => {
    await saveWidget(widget);
    if (onWidgetCreated) onWidgetCreated();
    setWidget({ name: "", description: "", price: 0 });
  };

  const widgetValidity = useMemo(() => {
    const nameIsInvalid = widget.name.length < 3 || widget.name.length > 100;
    const descriptionIsInvalid = widget.description.length < 5 || widget.description.length > 1000;
    const priceIsInvalid = widget.price < 1 || widget.price > 20000;
    const isInvalid = nameIsInvalid || descriptionIsInvalid || priceIsInvalid;
    return { isInvalid, nameIsInvalid, descriptionIsInvalid, priceIsInvalid };
  }, [widget]);

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
              onChange={(e) =>
                setWidget((widget) => ({ ...widget, price: stringToNumber(e.target.value) }))
              }
              value={widget.price}
              error={widget.price > 0 && widgetValidity.priceIsInvalid}
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
