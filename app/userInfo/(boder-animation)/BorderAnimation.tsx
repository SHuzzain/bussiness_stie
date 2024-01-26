import React, { CSSProperties, StyleHTMLAttributes } from "react";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  mode: "tailwind" | "styles" | "classsName";
  classNames?: ClassNameValue;
  styles?: CSSProperties;
};

const FancyBorder = (props: Props) => {
  const { mode, classNames, styles } = props;
  return (
    <div
      style={styles}
      className={`[animation:_spin_20s_linear_infinite] ${
        mode === "tailwind" || mode === "classsName" ? `${classNames} ` : null
      } `}
    ></div>
  );
};

export default FancyBorder;
