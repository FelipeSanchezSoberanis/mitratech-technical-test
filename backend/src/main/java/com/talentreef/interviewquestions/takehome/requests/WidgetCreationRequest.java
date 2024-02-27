package com.talentreef.interviewquestions.takehome.requests;

import com.talentreef.interviewquestions.takehome.models.Widget;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class WidgetCreationRequest {
  @NotBlank
  @Length(min = 3, max = 100)
  private String name;

  @NotBlank
  @Length(min = 5, max = 1_000)
  private String description;

  @NotNull
  @Range(min = 1, max = 20_000)
  private Double price;

  public Widget toWidget() {
    return Widget.builder()
        .name(getName())
        .description(getDescription())
        .price(Math.round(getPrice() * 100.0) / 100.0)
        .build();
  }
}
