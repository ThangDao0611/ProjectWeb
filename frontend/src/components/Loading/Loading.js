import React from "react";
import { Spin } from "antd";
import { SettingFilled } from "@ant-design/icons";

function Loading({state}) {
  const loadingIcon = <SettingFilled style={{ fontSize: 150 }} spin />;

  return (
    <div>
      <Spin spinning={state} indicator={loadingIcon} />
    </div>
  );
}

export default Loading;
