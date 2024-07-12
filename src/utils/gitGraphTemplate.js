import { templateExtend, TemplateName } from "@gitgraph/react";

export const withoutAuthor = templateExtend(TemplateName.Metro, {
  branch: {
    lineWidth: 4,
    label: {
      font: "normal 10pt Calibri"
    },
    spacing: 24
  },
  commit: {
    spacing: 44,
    dot: {
      size: 8
    },
    message: {
      displayAuthor: false,
      font: "normal 10pt Calibri",
      displayHash: false
    }
  }
});