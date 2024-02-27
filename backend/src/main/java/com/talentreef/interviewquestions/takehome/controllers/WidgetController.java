package com.talentreef.interviewquestions.takehome.controllers;

import com.talentreef.interviewquestions.takehome.models.Widget;
import com.talentreef.interviewquestions.takehome.requests.WidgetCreationRequest;
import com.talentreef.interviewquestions.takehome.services.WidgetService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/widgets", produces = MediaType.APPLICATION_JSON_VALUE)
public class WidgetController {
  private final WidgetService WidgetService;

  public WidgetController(WidgetService WidgetService) {
    Assert.notNull(WidgetService, "widgetService must not be null");
    this.WidgetService = WidgetService;
  }

  @GetMapping
  public ResponseEntity<List<Widget>> getAllWidgets() {
    return ResponseEntity.ok(WidgetService.getAllWidgets());
  }

  @PostMapping
  public ResponseEntity<Widget> saveWidget(
      @Valid @RequestBody WidgetCreationRequest widgetCreationRequest) {
    return new ResponseEntity<>(
        WidgetService.saveWidget(widgetCreationRequest.toWidget()), HttpStatus.OK);
  }

  @DeleteMapping("/{name}")
  public ResponseEntity<Void> deleteWidget(@PathVariable String name) {
    WidgetService.deleteWidget(name);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
