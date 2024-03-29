package com.talentreef.interviewquestions.takehome.services;

import com.talentreef.interviewquestions.takehome.models.Widget;
import com.talentreef.interviewquestions.takehome.respositories.WidgetRepository;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Slf4j
@Service
public class WidgetService {
  private final WidgetRepository WidgetRepository;

  @Autowired
  private WidgetService(WidgetRepository WidgetRepository) {
    Assert.notNull(WidgetRepository, "WidgetRepository must not be null");
    this.WidgetRepository = WidgetRepository;
  }

  public List<Widget> getAllWidgets() {
    return WidgetRepository.findAll();
  }

  public Widget saveWidget(Widget widget) {
    return WidgetRepository.save(widget);
  }

  public void deleteWidget(String name) {
    WidgetRepository.deleteById(name);
  }
}
